import express from 'express';
import {
  addBook,
  getBooks,
  getBookById,
  searchBooks,
} from '../controllers/bookController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/search', searchBooks);
router.get('/', getBooks);
router.post('/add', requireAuth, addBook);

router.get('/:id', getBookById);

export default router;
