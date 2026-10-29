import express from 'express';
import { getDecks, getDeckDetail, getDeckProgress, recordDeckAnswer } from '../controllers/vocabController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public routes for vocabulary catalog
router.get('/decks', getDecks);
router.get('/decks/:id/progress', verifyToken, getDeckProgress);
router.put('/decks/:id/words/:wordId/progress', verifyToken, recordDeckAnswer);
router.get('/decks/:id', getDeckDetail);

export default router;
