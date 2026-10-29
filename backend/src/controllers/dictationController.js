import prisma from '../config/prisma.js';
import { addExperience } from '../services/levelService.js';
import { extractVideoId } from '../services/youtubeService.js';
import { logAction } from '../services/auditService.js';

/**
 * Nộp bài tập Dictation
 * Logic: Lưu tiến độ -> Cộng Exp -> Kiểm tra thăng cấp
 */
export const submitDictation = async (req, res) => {
  const { lessonId, score } = req.body;
  const userId = req.user.id;
  const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  if (!lessonId || score === undefined) {
    return res.status(400).json({ success: false, message: 'Thiếu thông tin nộp bài!' });
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      // 1. Ghi nhận tiến độ học tập and atomically claim the one-time EXP reward.
      const progress = await tx.userProgress.upsert({
        where: {
          userId_lessonId: {
            userId,
            lessonId
          }
        },
        update: {
          score: Math.round(score),
          completed: true
        },
        create: {
          userId,
          lessonId,
          score: Math.round(score),
          completed: true,
          expAwarded: false
        }
      });
      const rewardClaim = await tx.userProgress.updateMany({
        where: { id: progress.id, expAwarded: false },
        data: { expAwarded: true }
      });

      // 2. Lấy thông tin bài học để biết độ dài (số từ)
      const lesson = await tx.lesson.findUnique({
        where: { id: lessonId },
        select: { contentText: true }
      });

      let wordCount = 0;
      if (lesson?.contentText) {
        try {
          const segments = JSON.parse(lesson.contentText);
          wordCount = segments.reduce((acc, seg) => {
            const text = seg.text || seg.fullText || "";
            return acc + (text.split(/\s+/).filter(Boolean).length || 0);
          }, 0);
        } catch (e) {
          wordCount = 50;
        }
      }

      // 3. CÔNG THỨC MỚI: Công bằng hơn giữa bài ngắn và bài dài
      // EXP = (Tỷ lệ đúng * Hệ số cơ bản) + (Số lượng từ * EXP mỗi từ)
      const baseExp = 100;
      const expPerWord = 5;
      const potentialExp = baseExp + (wordCount * expPerWord);
      const expGained = Math.round(potentialExp * (score / 100));

      // 4. Sử dụng LevelService để cộng Exp và tính Level
      const levelResult = rewardClaim.count > 0
        ? await addExperience(tx, userId, expGained, 'COMPLETED_LEARNING')
        : await tx.user.findUnique({
            where: { id: userId },
            select: { totalExp: true, level: true }
          }).then(user => ({
            totalExp: user.totalExp,
            level: user.level,
            levelUp: false,
            expGained: 0
          }));

      // 5. Ghi Log Audit
      await logAction({
        userId,
        action: 'SUBMIT_LESSON',
        targetId: lessonId,
        details: `Nộp bài tập Dictation đạt ${Math.round(score)}%`,
        ipAddress
      });

      return {
        score: progress.score,
        ...levelResult
      };
    });

    return res.status(200).json({
      success: true,
      message: result.levelUp ? 'Chúc mừng! Bạn đã thăng cấp!' : 'Nộp bài thành công!',
      data: result
    });

  } catch (error) {
    console.error('Lỗi Submit Dictation:', error);

    if (error.code === 'P2002') {
      return res.status(409).json({
        success: false,
        message: 'Bạn đã hoàn thành bài luyện tập này trước đó.'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Lỗi hệ thống khi xử lý kết quả!'
    });
  }
};

/**
 * Lấy nội dung bài Dictation từ Database
 */
export const getDictationById = async (req, res) => {
  const { id } = req.params;

  try {
    const lesson = await prisma.lesson.findUnique({
      where: { id },
      include: {
        module: {
          select: {
            course: {
              select: { title: true }
            }
          }
        }
      }
    });

    if (!lesson) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy bài học!' });
    }

    // Trả về cấu trúc mà Frontend mong đợi
    res.json({
      success: true,
      data: {
        id: lesson.id,
        title: lesson.title,
        videoUrl: extractVideoId(lesson.videoUrl) || lesson.videoUrl,
        courseTitle: lesson.module.course.title,
        // Sau này contentText có thể chứa subtitle JSON
        subtitles: lesson.contentText ? JSON.parse(lesson.contentText) : []
      }
    });
  } catch (error) {
    console.error('Get Lesson Error:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi tải bài học!' });
  }
};
