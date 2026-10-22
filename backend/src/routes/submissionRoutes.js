import express from 'express';
import { createSubmission, gradeSubmission } from '../controllers/submissionController.js';
import { verifyToken, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Học sinh nộp bài
router.post('/', verifyToken, authorize('STUDENT'), createSubmission);

// Giảng viên hoặc Admin chấm điểm
router.post('/grade', verifyToken, authorize('INSTRUCTOR', 'ADMIN'), gradeSubmission);

export default router;
