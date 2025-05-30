import express from 'express';
import {
  addReview,
  updateReview,
  deleteReview
} from '../controllers/reviewController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/books/:id/reviews', requireAuth, addReview);
router.put('/reviews/:id', requireAuth, updateReview);
router.delete('/reviews/:id', requireAuth, deleteReview);

export default router;
