// Service kết nối API trực tiếp để lấy đề thi IELTS và TOEIC thật từ Open Source Dataset

const IELTS_READING_BAND8_URL =
  'https://raw.githubusercontent.com/LuchoBazz/ielts-ai-dataset/main/datasets/practice-drills/reading/ielts-reading-academic-band-8.0-test-001.json';

const IELTS_READING_BAND7_URL =
  'https://raw.githubusercontent.com/LuchoBazz/ielts-ai-dataset/main/datasets/practice-drills/reading/ielts-reading-academic-band-7.0-test-001.json';

const IELTS_LISTENING_URL =
  'https://raw.githubusercontent.com/LuchoBazz/ielts-ai-dataset/main/datasets/synthetic-official-mocks/listening/ielts-listening-test-001/manifest.json';

const IELTS_WRITING_URL =
  'https://raw.githubusercontent.com/LuchoBazz/ielts-ai-dataset/main/datasets/synthetic-official-mocks/writing/ielts-writing-academic-001.json';

const TOEIC_TEST_DATA_URL =
  'https://raw.githubusercontent.com/tmd22121999/thi_toeic/master/src/test/dataTest.json';

// Bộ nhớ cache tạm thời trong phiên làm việc
const cache = {
  toeic: null,
  ieltsBand8: null,
  ieltsBand7: null,
  ieltsListening: null,
  ieltsWriting: null,
};

/**
 * Lấy danh sách câu hỏi TOEIC thật (Part 5 Incomplete Sentences, Part 7 Reading, Part 1 Listening)
 */
export async function fetchToeicExamData() {
  if (cache.toeic) return cache.toeic;

  try {
    const res = await fetch(TOEIC_TEST_DATA_URL);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const raw = await res.json();

    // 1. Part 5 (Incomplete Sentences)
    const part5 = raw
      .filter((item) => (!item.childCards || item.childCards.length === 0) && item.question?.text)
      .slice(0, 15)
      .map((item, idx) => {
        const correctChoice = item.answer?.texts?.[0] || '';
        const choices = item.answer?.choices || [];
        const all = [correctChoice, ...choices].sort();
        const correctLetter = correctChoice.replace(/[()]/g, '').trim().charAt(0) || 'A';

        return {
          id: item._id || `toeic-p5-${idx}`,
          part: 5,
          question: item.question.text,
          options: all,
          correct: correctLetter,
          correctFull: correctChoice,
          explanation: item.answer?.hint || 'Không có giải thích chi tiết cho câu hỏi này.',
        };
      });

    // 2. Part 7 (Đọc hiểu văn bản)
    const part7Groups = raw
      .filter((item) => item.childCards && item.childCards.length > 0 && item.question?.text)
      .slice(0, 3)
      .map((item, gIdx) => {
        return {
          id: item._id || `toeic-p7-${gIdx}`,
          passage: item.question.text,
          questions: item.childCards.map((c, cIdx) => {
            const correctChoice = c.answer?.texts?.[0] || '';
            const all = [correctChoice, ...(c.answer?.choices || [])].sort();
            const correctLetter = correctChoice.replace(/[()]/g, '').trim().charAt(0) || 'A';
            return {
              id: c._id || `toeic-p7-c-${gIdx}-${cIdx}`,
              part: 7,
              question: c.question.text,
              options: all,
              correct: correctLetter,
              correctFull: correctChoice,
              explanation: c.answer?.hint || 'Tham khảo dẫn chứng trong đoạn văn trên.',
            };
          }),
        };
      });

    // 3. Part 1 (Listening có audio)
    const listening = raw
      .filter((item) => item.question?.sound && item.question.sound.startsWith('http'))
      .slice(0, 5)
      .map((item, idx) => {
        const correctChoice = item.answer?.texts?.[0] || '';
        const all = [correctChoice, ...(item.answer?.choices || [])].sort();
        const correctLetter = correctChoice.replace(/[()]/g, '').trim().charAt(0) || 'A';
        return {
          id: item._id || `toeic-lis-${idx}`,
          part: 1,
          soundUrl: item.question.sound,
          imageUrl: item.question.image,
          question: 'Listen to the audio recording and choose the best statement describing the picture/situation:',
          options: all,
          correct: correctLetter,
          correctFull: correctChoice,
          explanation: item.answer?.hint || '',
        };
      });

    const parsed = {
      title: 'Đề thi thử TOEIC chuẩn ETS (Live API)',
      part5Questions: part5,
      part7Groups: part7Groups,
      listeningQuestions: listening,
      totalQuestions: part5.length + part7Groups.reduce((acc, g) => acc + g.questions.length, 0),
    };

    cache.toeic = parsed;
    return parsed;
  } catch (error) {
    console.error('Lỗi khi fetch TOEIC API:', error);
    throw error;
  }
}

/**
 * Lấy toàn bộ đề thi IELTS 4 Kỹ năng (Reading, Listening, Writing, Speaking) từ API
 */
export async function fetchIeltsExamData(band = 8) {
  const readingUrl = band === 7 ? IELTS_READING_BAND7_URL : IELTS_READING_BAND8_URL;

  try {
    const [readingRes, listeningRes, writingRes] = await Promise.all([
      fetch(readingUrl),
      cache.ieltsListening ? Promise.resolve(null) : fetch(IELTS_LISTENING_URL).catch(() => null),
      cache.ieltsWriting ? Promise.resolve(null) : fetch(IELTS_WRITING_URL).catch(() => null),
    ]);

    if (!readingRes.ok) throw new Error(`HTTP error reading: ${readingRes.status}`);
    const readingData = await readingRes.json();

    // 1. Listening Data (4 Sections chuẩn IELTS)
    let listeningData = cache.ieltsListening;
    if (!listeningData && listeningRes && listeningRes.ok) {
      listeningData = await listeningRes.json();
      cache.ieltsListening = listeningData;
    }

    // 2. Writing Data (Task 1 & Task 2)
    let writingData = cache.ieltsWriting;
    if (!writingData && writingRes && writingRes.ok) {
      writingData = await writingRes.json();
      cache.ieltsWriting = writingData;
    }

    // Chuẩn hóa Reading Passages
    const passages = (readingData.passages || []).map((p, pIdx) => {
      const allQuestions = [];

      (p.question_groups || []).forEach((g) => {
        const type = g.question_type;
        const instructions = g.instructions || '';

        (g.questions || []).forEach((q) => {
          let options = [];
          if (type === 'true-false-not-given') {
            options = ['TRUE', 'FALSE', 'NOT GIVEN'];
          } else if (q.options && Array.isArray(q.options)) {
            options = q.options;
          } else {
            options = ['A', 'B', 'C', 'D'];
          }

          allQuestions.push({
            id: q.id || `ielts-p${pIdx}-q-${allQuestions.length}`,
            type: type,
            order: q.question_order,
            instruction: instructions,
            question: q.text,
            options: options,
            correct: q.answer,
            acceptedAnswers: q.accepted_answers || [q.answer],
            explanation: `Dẫn chứng & căn cứ từ đoạn văn: "${q.answer}". Xem kỹ nội dung đoạn tương ứng trong bài đọc.`,
          });
        });
      });

      return {
        id: p.id || `passage-${pIdx}`,
        title: p.title || `Passage ${pIdx + 1}`,
        content: p.content,
        questions: allQuestions,
      };
    });

    // Chuẩn hóa Listening Sections
    const listeningSections = (listeningData?.sections || []).map((sec) => {
      const questions = [];
      (sec.question_groups || []).forEach((g) => {
        (g.questions || []).forEach((q) => {
          questions.push({
            id: q.id,
            order: q.question_order,
            text: q.text,
            answer: q.answer,
            acceptedAnswers: q.accepted_answers || [q.answer],
            instruction: g.instructions,
          });
        });
      });

      return {
        id: sec.id,
        number: sec.section_number,
        title: sec.title,
        transcript: sec.transcript,
        questions: questions,
      };
    });

    // IELTS Speaking Bộ đề mẫu chuẩn 3 Parts
    const speakingData = {
      part1: {
        title: 'Part 1: Introduction & Interview (4 - 5 mins)',
        topic: 'Hometown, Work & Daily Routine',
        questions: [
          'Can you tell me a little bit about your hometown?',
          'What do you like most about living in your city?',
          'Do you prefer working or studying in the morning or in the evening?',
          'How do you usually spend your weekends?'
        ],
        sampleTips: 'Giữ câu trả lời tự nhiên từ 2-3 câu. Tránh chỉ trả lời Yes/No, hãy mở rộng bằng lý do hoặc ví dụ ngắn.'
      },
      part2: {
        title: 'Part 2: Long Turn / Cue Card (3 - 4 mins)',
        cueCard: `Describe a technological innovation that has dramatically changed your daily life.
You should say:
• What the technology is
• When and how you first started using it
• How frequently you interact with it
And explain whether you believe its overall impact has been positive or negative.`,
        sampleAnswer: `I would like to talk about cloud-based collaborative software, specifically platforms like Google Workspace. I first adopted this during my university studies around four years ago when group assignments transitioned online. It enables real-time document co-editing and automated synchronization across multiple devices. In my opinion, its impact has been overwhelmingly positive as it dismantled geographic barriers and streamlined project workflows.`,
        keyVocabulary: [
          { word: 'cloud-based synchronization', meaning: 'đồng bộ hóa dữ liệu trên nền tảng đám mây' },
          { word: 'dismantled geographic barriers', meaning: 'xóa bỏ các rào cản về mặt địa lý' },
          { word: 'streamlined project workflows', meaning: 'tối ưu hóa quy trình làm việc của dự án' }
        ]
      },
      part3: {
        title: 'Part 3: Two-way Discussion (4 - 5 mins)',
        topic: 'Automation, AI & Future Workforce',
        questions: [
          'Do you think artificial intelligence will replace human teachers in the near future?',
          'How can older generations adapt to rapidly emerging digital platforms?',
          'What responsibilities should tech corporations bear regarding personal data security?'
        ]
      }
    };

    return {
      title: readingData.title || `IELTS Academic Test (Band ${band}.0)`,
      difficulty: readingData.difficulty || `${band}.0`,
      passages: passages,
      listeningSections: listeningSections,
      writingTasks: writingData?.tasks || [],
      speaking: speakingData
    };
  } catch (error) {
    console.error('Lỗi khi fetch IELTS API:', error);
    throw error;
  }
}
