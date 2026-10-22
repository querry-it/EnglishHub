import express from 'express';
import {
  getAuditLogs,
  updateCourseInstructor,
  getUsers,
  updateUserStatus,
  deleteCourse
} from '../controllers/adminController.js';
import { previewVocabCSV, commitVocabImport, deleteDeck } from '../controllers/vocabController.js';
import { verifyToken, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Tất cả các route ở đây đều yêu cầu quyền ADMIN
router.use(verifyToken, isAdmin);

// Quản lý người dùng
router.get('/users', getUsers);
router.patch('/users/:id/status', updateUserStatus);

// Lấy danh sách nhật ký hoạt động
router.get('/audit-logs', getAuditLogs);

// Thay đổi giảng viên cho khóa học
router.post('/courses/change-instructor', updateCourseInstructor);

// Xóa khóa học
router.delete('/courses/:id', deleteCourse);

// Vocabulary Import & Management
router.post('/vocab/preview', previewVocabCSV);
router.post('/vocab/commit', commitVocabImport);
router.delete('/vocab/decks/:id', deleteDeck);

export default router;
