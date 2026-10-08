import prisma from '../config/prisma.js';
import { addExperience } from '../services/levelService.js';

/**
 * Nộp bài tập Dictation
 * Logic: Lưu tiến độ -> Cộng Exp -> Kiểm tra thăng cấp
 */
export const submitDictation = async (req, res) => {
  const { lessonId, score } = req.body;
  const userId = req.user.id;

  if (!lessonId || score === undefined) {
    return res.status(400).json({ success: false, message: 'Thiếu thông tin nộp bài!' });
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      // Ghi nhận tiến độ học tập
      const progress = await tx.userProgress.create({
        data: {
          userId,
          lessonId,
          score: Math.round(score),
          completed: true
        }
      });

      // Tính toán Exp nhận được (100 điểm = 1000 Exp)
      const expGained = Math.round(score * 10);

      // Sử dụng LevelService để cộng Exp và tính Level
      const levelResult = await addExperience(tx, userId, expGained);

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
        videoUrl: lesson.videoUrl,
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
