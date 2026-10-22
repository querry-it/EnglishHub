import express from 'express';
import { verifyToken, authorize } from '../middlewares/authMiddleware.js';
import {
  createLesson,
  getAllLessonsForAdmin,
  getLessonsForStudent,
  updateLesson,
  deleteLesson,
  getLessonDetail,
  getUserProgress,
  extractTranscript
} from '../controllers/lessonController.js';

const router = express.Router();

// Route lay danh sach bai hoc cho Student (Cong khai de hien thi o trang chu)
router.get('/', getLessonsForStudent);

// Route lay danh sach tat ca khoa hoc cho Admin
router.get('/admin/all', verifyToken, authorize('ADMIN'), getAllLessonsForAdmin);

// Route lấy tiến độ học tập của User
router.get('/my-progress', verifyToken, getUserProgress);

// Route lay chi tiet mot bai hoc
router.get('/:id', verifyToken, getLessonDetail);

// Route lay thu phu de de xem truoc
router.post('/extract-transcript', verifyToken, authorize('ADMIN'), extractTranscript);

// Chỉ ADMIN mới có quyền tạo, sửa, xóa Khóa học và Bài học Dictation gốc
router.post('/', verifyToken, authorize('ADMIN'), createLesson);
router.put('/:id', verifyToken, authorize('ADMIN'), updateLesson);
router.delete('/:id', verifyToken, authorize('ADMIN'), deleteLesson);

export default router;
