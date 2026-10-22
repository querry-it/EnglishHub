import prisma from '../config/prisma.js';
import { logAction } from '../services/auditService.js';

// Học sinh nộp bài (Speaking/Writing)
export const createSubmission = async (req, res) => {
  try {
    const { lessonId, submissionType, contentText, audioUrl } = req.body;
    const userId = req.user.id;
    const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    const submission = await prisma.submission.create({
      data: {
        userId,
        lessonId,
        submissionType,
        contentText,
        audioUrl,
        status: 'PENDING'
      }
    });

    // Log Audit
    await logAction({
      userId,
      action: 'SUBMIT_LESSON',
      targetId: lessonId,
      details: `Học sinh nộp bài loại ${submissionType}`,
      ipAddress
    });

    res.status(201).json({ success: true, submission });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi khi nộp bài' });
  }
};

// Giảng viên chấm điểm
export const gradeSubmission = async (req, res) => {
  try {
    const { submissionId, rubricScores, feedbackText, audioFeedbackUrl, score } = req.body;
    const instructorId = req.user.id;
    const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    const result = await prisma.$transaction(async (tx) => {
      // 1. Tạo feedback
      const feedback = await tx.submissionFeedback.create({
        data: {
          submissionId,
          instructorId,
          rubricScores,
          feedbackText,
          audioFeedbackUrl
        }
      });

      // 2. Cập nhật trạng thái và điểm số cho bài nộp
      const updatedSubmission = await tx.submission.update({
        where: { id: submissionId },
        data: {
          status: 'GRADED',
          score: score
        }
      });

      return { feedback, updatedSubmission };
    });

    // Log Audit
    await logAction({
      userId: instructorId,
      action: 'GRADE_SUBMISSION',
      targetId: submissionId,
      details: `Giảng viên chấm điểm bài nộp: ${score}đ`,
      ipAddress
    });

    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Lỗi chấm điểm:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi lưu điểm' });
  }
};
