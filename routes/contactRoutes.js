import express from 'express'
import {
  createMessage,
  getMessages,
  markAsRead,
  deleteMessage,
} from '../controllers/contactController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

// Public + Private
router
  .route('/')
  .post(createMessage)                // Public
  .get(protect, admin, getMessages)   // Admin only

// Admin routes
router.route('/:id/read').put(protect, admin, markAsRead)
router.route('/:id').delete(protect, admin, deleteMessage)

export default router