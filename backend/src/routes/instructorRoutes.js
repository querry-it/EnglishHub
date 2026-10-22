import express from 'express';
import { getMyCourses, getCourseStudents } from '../controllers/instructorController.js';
import { verifyToken, isInstructor } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(verifyToken, isInstructor);

// Lấy danh sách khóa học của tôi
router.get('/my-courses', getMyCourses);

// Lấy danh sách học viên trong 1 khóa học
router.get('/courses/:courseId/students', getCourseStudents);

export default router;
