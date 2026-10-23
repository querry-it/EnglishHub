import prisma from '../config/prisma.js';

/**
 * Làm sạch tag HTML, Anki tags và ký tự đặc biệt
 */
const cleanAnkiHtml = (text) => {
  if (!text) return "";

  // Xóa tag HTML
  let cleaned = text.replace(/<[^>]*>?/gm, '');

  // Giải mã các thực thể HTML phổ biến
  const entities = {
    '&nbsp;': ' ',
    '&lt;': '<',
    '&gt;': '>',
    '&amp;': '&',
    '&quot;': '"',
    '&#39;': "'",
    '&rdquo;': '"',
    '&ldquo;': '"'
  };

  cleaned = cleaned.replace(/&nbsp;|&lt;|&gt;|&amp;|&quot;|&#39;|&rdquo;|&ldquo;/g, (match) => entities[match] || match);

  // Xóa Anki tags: {{c1::word}} -> word, [sound:...] -> ""
  cleaned = cleaned.replace(/{{c\d::(.*?)}}/g, '$1');
  cleaned = cleaned.replace(/\[sound:.*?\]/g, '');

  // Xóa khoảng trắng thừa
  return cleaned.replace(/\s+/g, ' ').trim();
};

/**
 * Parse CSV/TSV
 */
const parseCSVLine = (line, delimiter = ',') => {
  const result = [];
  let curVal = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        curVal += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === delimiter && !inQuotes) {
      result.push(curVal);
      curVal = "";
    } else {
      curVal += char;
    }
  }
  result.push(curVal);
  return result;
};

// Lấy Audio từ Dictionary API
const getAudioUrl = async (word) => {
  if (!word) return "";
  const cleanWord = word.trim().toLowerCase().replace(/[^a-z0-9\s-]/g, '');
  if (!cleanWord) return "";

  try {
    // Thử lấy từ Free Dictionary API
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(cleanWord)}`);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        for (const entry of data) {
          if (entry.phonetics && Array.isArray(entry.phonetics)) {
            for (const phonetic of entry.phonetics) {
              if (phonetic.audio && phonetic.audio.length > 0) {
                let audio = phonetic.audio;
                if (audio.startsWith('//')) audio = 'https:' + audio;
                if (audio.startsWith('http:')) audio = audio.replace('http:', 'https:');
                return audio;
              }
            }
          }
        }
      }
    }
  } catch (e) {
    // Fallback bên dưới
  }

  // Fallback Youdao TTS
  return `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(cleanWord)}&type=2`;
};

export const previewVocabCSV = async (req, res) => {
  try {
    const { csvData } = req.body;
    if (!csvData) return res.status(400).json({ message: "Không có dữ liệu CSV" });

    const allLines = csvData.split(/\r?\n/).filter(l => l.trim() !== "");
    if (allLines.length === 0) return res.json([]);

    // Tự động nhận diện Delimiter
    const firstLine = allLines[0];
    const tabCount = (firstLine.match(/\t/g) || []).length;
    const commaCount = (firstLine.match(/,/g) || []).length;
    const delimiter = tabCount >= commaCount ? '\t' : ',';

    const results = [];

    for (let i = 0; i < allLines.length; i++) {
      const line = allLines[i].trim();
      if (!line) continue;

      const rawCols = parseCSVLine(line, delimiter);
      const cols = rawCols.map(c => cleanAnkiHtml(c));

      // Bỏ qua Header
      const isHeader = i === 0 && (
        cols[2]?.toLowerCase().includes('word') ||
        cols[2]?.toLowerCase().includes('keyword') ||
        cols[0]?.toLowerCase().includes('keyword')
      );
      if (isHeader) continue;

      const word = cols[2] || cols[0];
      if (!word || word.length > 50 || word.includes(' ') || word.toLowerCase() === 'keyword') continue;

      const phonetic = cols[7] || cols[3] || "";
      const meaning = cols[4] || cols[5] || "";
      const rawExp = rawCols[8] || "";

      let definition = "";
      let example = "";

      // Tách Definition và Example
      const separators = ['→', '->', ':', '\n'];
      let foundSeparator = false;

      for (const sep of separators) {
        if (rawExp.includes(sep)) {
          const parts = rawExp.split(sep);
          definition = cleanAnkiHtml(parts[0]);
          example = cleanAnkiHtml(parts[1]);
          foundSeparator = true;
          break;
        }
      }

      if (!foundSeparator || !example) {
        definition = definition || cleanAnkiHtml(rawExp);
        example = example || cleanAnkiHtml(rawCols[5] !== word ? rawCols[5] : rawCols[6]);
      }

      // Xử lý ảnh
      const imageUrl = `https://picsum.photos/300/200?random=${i}`;

      results.push({
        word,
        phonetic,
        meaning,
        definition,
        example,
        imageUrl,
      });

      if (results.length >= 200) break;
    }

    // Lấy Audio đồng thời
    const finalResults = await Promise.all(results.map(async (item) => {
      const audioUrl = await getAudioUrl(item.word);
      return { ...item, audioUrl };
    }));

    res.json(finalResults);
  } catch (error) {
    console.error("Lỗi Preview:", error);
    res.status(500).json({ message: "Lỗi xử lý file", error: error.message });
  }
};

export const commitVocabImport = async (req, res) => {
  try {
    const { deckTitle, category, words } = req.body;

    if (!deckTitle?.trim() || !Array.isArray(words) || words.length === 0) {
      return res.status(400).json({ message: 'Tên bộ từ và danh sách từ vựng là bắt buộc.' });
    }

    if (words.length > 200) {
      return res.status(400).json({ message: 'Mỗi lần chỉ có thể nhập tối đa 200 từ.' });
    }

    if (words.some(word => !word?.word?.trim() || !word?.meaning?.trim())) {
      return res.status(400).json({ message: 'Mỗi từ vựng cần có từ và nghĩa.' });
    }

    const preparedWords = await Promise.all(words.map(async word => ({
      word: word.word.trim(),
      phonetic: word.phonetic || null,
      meaning: word.meaning,
      definition: word.definition || null,
      example: word.example || null,
      imageUrl: word.imageUrl || null,
      audioUrl: word.audioUrl || await getAudioUrl(word.word)
    })));

    const deckId = await prisma.$transaction(async (tx) => {
      const deck = await tx.vocabDeck.create({
        data: {
          title: deckTitle.trim(),
          category: category || null,
          description: `Bộ từ vựng ${deckTitle.trim()} - Thể loại ${category || 'General'}`,
          thumbnail: words[0]?.imageUrl || 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&q=80'
        }
      });

      await tx.masterVocabulary.createMany({
        data: preparedWords.map(word => ({ ...word, deckId: deck.id }))
      });

      return deck.id;
    });

    res.json({ success: true, message: `Đã nhập thành công ${words.length} từ vào bộ ${deckTitle}!`, deckId });
  } catch (error) {
    console.error("Lỗi Commit Import:", error);
    res.status(500).json({ message: "Lỗi khi lưu dữ liệu vào Database", error: error.message });
  }
};

export const getDecks = async (req, res) => {
  try {
    const { category } = req.query;
    const where = category && category !== 'Tất cả' ? { category } : {};

    const decks = await prisma.vocabDeck.findMany({
      where,
      include: {
        _count: {
          select: { words: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    const formattedDecks = decks.map(d => ({
      id: d.id,
      title: d.title,
      category: d.category,
      description: d.description,
      thumbnail: d.thumbnail,
      cardsCount: d._count.words,
      learners: Math.floor(Math.random() * 1000) + 100,
      isPro: false,
      color: 'bg-indigo-600'
    }));

    res.json(formattedDecks);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách bộ từ", error: error.message });
  }
};

export const getDeckDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const deck = await prisma.vocabDeck.findUnique({
      where: { id },
      include: {
        words: true
      }
    });

    if (!deck) return res.status(404).json({ message: "Không tìm thấy bộ từ" });

    res.json(deck);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy chi tiết bộ từ", error: error.message });
  }
};

export const getDeckProgress = async (req, res) => {
  try {
    const { id: deckId } = req.params;
    const deck = await prisma.vocabDeck.findUnique({
      where: { id: deckId },
      select: { words: { select: { id: true, word: true } } }
    });

    if (!deck) return res.status(404).json({ success: false, message: 'Không tìm thấy bộ từ.' });

    const wordIds = deck.words.map(word => word.id);
    const words = deck.words.map(word => word.word);
    const [reviewedWords, existingFlashcards] = await Promise.all([
      wordIds.length
        ? prisma.vocabularyProgress.findMany({
          where: { userId: req.user.id, vocabularyId: { in: wordIds } },
          select: { vocabularyId: true }
        })
        : [],
      words.length
        ? prisma.flashcardReview.findMany({
          where: { userId: req.user.id, word: { in: words } },
          select: { word: true }
        })
        : []
    ]);
    const reviewedWordIds = new Set(reviewedWords.map(word => word.vocabularyId));
    const reviewedWordsSet = new Set(existingFlashcards.map(card => card.word.toLowerCase()));
    deck.words.forEach(word => {
      if (reviewedWordsSet.has(word.word.toLowerCase())) reviewedWordIds.add(word.id);
    });

    res.json({
      success: true,
      total: wordIds.length,
      reviewedCount: reviewedWordIds.size,
      percent: wordIds.length ? Math.round((reviewedWordIds.size / wordIds.length) * 100) : 0,
      reviewedWordIds: [...reviewedWordIds]
    });
  } catch (error) {
    console.error('Lỗi khi tải tiến độ từ vựng:', error);
    res.status(500).json({ success: false, message: 'Không thể tải tiến độ từ vựng.' });
  }
};

export const deleteDeck = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.masterVocabulary.deleteMany({ where: { deckId: id } });
    await prisma.vocabDeck.delete({ where: { id } });
    res.json({ success: true, message: "Đã xóa bộ từ vựng thành công!" });
  } catch (error) {
    console.error("Lỗi khi xóa bộ từ:", error);
    res.status(500).json({ message: "Lỗi khi xóa bộ từ", error: error.message });
  }
};
