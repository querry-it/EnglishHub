import prisma from '../config/prisma.js';
import { logAction } from '../services/auditService.js';

// Thêm Flashcard mới
export const addFlashcard = async (req, res) => {
  try {
    const { word, phonetic, meaning, definition, example, imageUrl, audioUrl } = req.body;
    const userId = req.user.id;
    const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    if (typeof word !== 'string' || !word.trim() || typeof meaning !== 'string' || !meaning.trim()) {
      return res.status(400).json({ success: false, message: 'Từ vựng và nghĩa là bắt buộc.' });
    }

    const existing = await prisma.flashcardReview.findFirst({
      where: { userId, word: { equals: word.trim(), mode: 'insensitive' } }
    });
    if (existing) {
      return res.json({ success: true, data: existing, alreadyExists: true });
    }

    const flashcard = await prisma.flashcardReview.create({
      data: {
        userId,
        word: word.trim(),
        phonetic,
        meaning,
        definition,
        example,
        imageUrl,
        audioUrl
      }
    });

    // Log Audit
    await logAction({
      userId,
      action: 'ADD_FLASHCARD',
      targetId: flashcard.id,
      details: `Thêm từ mới vào Flashcards: ${word}`,
      ipAddress
    });

    res.status(201).json({ success: true, data: flashcard });
  } catch (error) {
    console.error('Lỗi khi thêm Flashcard:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi thêm Flashcard' });
  }
};

// Lấy danh sách Flashcard của tôi
export const getMyFlashcards = async (req, res) => {
  try {
    const userId = req.user.id;
    const flashcards = await prisma.flashcardReview.findMany({
      where: { userId },
      orderBy: { nextReviewAt: 'asc' }
    });
    res.json({ success: true, data: flashcards });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi khi tải Flashcards' });
  }
};

// Cập nhật tiến độ học theo thuật toán SM-2
export const reviewFlashcard = async (req, res) => {
  try {
    const { word, quality, vocabularyId } = req.body; // quality: 0 (Again) to 5 (Easy)
    const userId = req.user.id;

    if (typeof word !== 'string' || !word.trim() || !Number.isInteger(quality) || quality < 0 || quality > 5) {
      return res.status(400).json({ success: false, message: 'Từ vựng hoặc mức độ ôn tập không hợp lệ.' });
    }

    const masterWord = vocabularyId
      ? await prisma.masterVocabulary.findUnique({ where: { id: vocabularyId } })
      : await prisma.masterVocabulary.findFirst({ where: { word } });
    if (vocabularyId && (!masterWord || masterWord.word.toLowerCase() !== word.trim().toLowerCase())) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy từ trong bộ từ vựng.' });
    }

    let review = await prisma.flashcardReview.findFirst({
      where: { userId, word: word.trim() }
    });

    if (!review) {
      // Nếu chưa có trong danh sách ôn tập, tạo mới (từ MasterVocabulary)
      review = await prisma.flashcardReview.create({
        data: {
          userId,
          word: word.trim(),
          phonetic: masterWord?.phonetic || "",
          meaning: masterWord?.meaning || "",
          definition: masterWord?.definition || "",
          example: masterWord?.example || "",
          imageUrl: masterWord?.imageUrl || "",
          audioUrl: masterWord?.audioUrl || "",
          intervalDays: 0,
          repetitionCount: 0,
          easeFactor: 2.5
        }
      });
    }

    let { intervalDays, repetitionCount, easeFactor } = review;
    const q = quality;

    // SM-2 Algorithm logic
    if (q >= 3) {
      if (repetitionCount === 0) {
        intervalDays = 1;
      } else if (repetitionCount === 1) {
        intervalDays = 6;
      } else {
        intervalDays = Math.round(intervalDays * Number(easeFactor));
      }
      repetitionCount += 1;
    } else {
      repetitionCount = 0;
      intervalDays = 1;
    }

    // Update ease factor: EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
    easeFactor = Number(easeFactor) + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
    if (easeFactor < 1.3) easeFactor = 1.3;

    const nextReviewAt = new Date();
    nextReviewAt.setDate(nextReviewAt.getDate() + intervalDays);

    const updatedReview = await prisma.flashcardReview.update({
      where: { id: review.id },
      data: {
        intervalDays,
        repetitionCount,
        easeFactor,
        nextReviewAt
      }
    });

    if (masterWord) {
      await prisma.vocabularyProgress.upsert({
        where: {
          userId_vocabularyId: {
            userId,
            vocabularyId: masterWord.id
          }
        },
        update: {
          reviewCount: { increment: 1 },
          lastReviewedAt: new Date(),
          isCorrect: q >= 3
        },
        create: {
          userId,
          vocabularyId: masterWord.id,
          isCorrect: q >= 3
        }
      });
    }

    res.json({ success: true, data: updatedReview });
  } catch (error) {
    console.error("SM-2 Error:", error);
    res.status(500).json({ success: false, message: 'Lỗi khi cập nhật SM-2' });
  }
};

// Xóa Flashcard
export const deleteFlashcard = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const flashcard = await prisma.flashcardReview.findUnique({
      where: { id }
    });

    if (!flashcard || flashcard.userId !== userId) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy thẻ từ vựng' });
    }

    await prisma.flashcardReview.delete({
      where: { id }
    });

    res.json({ success: true, message: 'Đã xóa từ vựng' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi khi xóa Flashcard' });
  }
};
