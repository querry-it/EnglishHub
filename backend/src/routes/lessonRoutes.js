import express from 'express';
import { verifyToken, authorize } from '../middlewares/authMiddleware.js';
import { createLesson, getAllLessonsForAdmin, getLessonsForStudent } from '../controllers/lessonController.js';
import { getYoutubeTranscript, extractVideoId } from '../services/youtubeService.js';

const router = express.Router();

// Route lay danh sach bai hoc cho Student
router.get('/', verifyToken, getLessonsForStudent);

// Route lay danh sach tat ca khoa hoc cho Admin
router.get('/all-admin', verifyToken, authorize('ADMIN'), getAllLessonsForAdmin);

// Route lay thu phu de de xem truoc
router.post('/extract-transcript', verifyToken, authorize('ADMIN'), async (req, res) => {
  try {
    const { videoUrl } = req.body;
    if (!videoUrl) return res.status(400).json({ success: false, message: 'Thieu Link YouTube' });

    const videoId = extractVideoId(videoUrl);
    const transcript = await getYoutubeTranscript(videoId);

    if (transcript && transcript.length > 0) {
      return res.json({ success: true, transcript });
    }
    res.status(404).json({ success: false, message: 'Khong tim thay phu de cho video nay!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Chỉ ADMIN mới có quyền tạo Khóa học và Bài học Dictation gốc
router.post('/', verifyToken, authorize('ADMIN'), createLesson);

export default router;
