import prisma from '../config/prisma.js';

/**
 * Middleware kiểm tra tính hợp lệ của bài tập Dictation
 */
export const validateDictationSession = async (req, res, next) => {
  const { lessonId } = req.body;
  const idFromParam = req.params.id;
  const targetId = lessonId || idFromParam;

  // Kiểm tra định dạng UUID
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (targetId && !uuidRegex.test(targetId)) {
    return res.status(400).json({ success: false, message: 'ID bài học không hợp lệ!' });
  }

  try {
    if (targetId) {
      const lesson = await prisma.lesson.findUnique({
        where: { id: targetId },
        select: { lessonType: true }
      });

      if (!lesson) {
        return res.status(404).json({ success: false, message: 'Bài học không tồn tại!' });
      }

      // Đảm bảo đúng loại bài PRACTICE mới cho nộp điểm vào đây
      if (lesson.lessonType !== 'PRACTICE') {
        return res.status(400).json({ success: false, message: 'Đây không phải là bài luyện tập Dictation!' });
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};
