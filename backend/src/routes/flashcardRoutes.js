import express from 'express';
import { addFlashcard, getMyFlashcards, reviewFlashcard, deleteFlashcard } from '../controllers/flashcardController.js';
import { verifyToken, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Tất cả các hành động Flashcard đều yêu cầu đăng nhập và vai trò STUDENT
router.use(verifyToken);

router.post('/', addFlashcard);
router.get('/', getMyFlashcards);
router.post('/review', reviewFlashcard);
router.delete('/:id', deleteFlashcard);

export default router;
