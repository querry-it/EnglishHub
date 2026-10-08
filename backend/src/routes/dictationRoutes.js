import express from 'express';
import { verifyToken, authorize } from '../middlewares/authMiddleware.js';
import { submitDictation, getDictationById } from '../controllers/dictationController.js';
import { validateDictationSession } from '../middlewares/dictationMiddleware.js';

const router = express.Router();

// Yêu cầu xác thực token cho tất cả các API dictation
router.use(verifyToken);

// Lấy nội dung bài học (có validate ID bài học)
router.get('/:id', validateDictationSession, getDictationById);

// Nộp bài: Chỉ Student/Admin và phải qua validate nghiệp vụ Dictation
router.post('/submit', authorize('STUDENT', 'ADMIN'), validateDictationSession, submitDictation);

export default router;
