import express from 'express';
import { getDecks, getDeckDetail } from '../controllers/vocabController.js';

const router = express.Router();

// Public routes for vocabulary catalog
router.get('/decks', getDecks);
router.get('/decks/:id', getDeckDetail);

export default router;
