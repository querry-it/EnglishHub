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

export default router;
