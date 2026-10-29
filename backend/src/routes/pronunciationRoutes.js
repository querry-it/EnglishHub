import express from 'express';
import { assessPronunciation } from '../controllers/pronunciationController.js';
import { authorize, verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/assess', verifyToken, authorize('STUDENT', 'ADMIN'), assessPronunciation);

export default router;
