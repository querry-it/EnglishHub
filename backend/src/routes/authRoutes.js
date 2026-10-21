import express from 'express';
import { register, login, logout, refreshToken } from '../controllers/authController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// @route   POST api/auth/register
router.post('/register', register);

// @route   POST api/auth/login
router.post('/login', login);

// @route   POST api/auth/refresh
router.post('/refresh', refreshToken);

// @route   POST api/auth/logout
router.post('/logout', verifyToken, logout);

// @route   GET api/auth/me
router.get('/me', verifyToken, (req, res) => {
  res.json({ success: true, user: req.user });
});

// Route kiểm thử truy cập chéo (IDOR) - Anh_09.png
router.get('/profile/:id', verifyToken, (req, res) => {
  // Nếu ID trong URL khác với ID của người đang đăng nhập
  if (req.user.id !== req.params.id) {
    return res.status(403).json({
      success: false,
      message: 'Truy cập trái phép: Bạn không thể xem hồ sơ của người khác!'
    });
  }
  res.json({ success: true, user: req.user });
});

export default router;
