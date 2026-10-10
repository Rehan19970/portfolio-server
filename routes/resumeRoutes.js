import express from 'express'
import asyncHandler from 'express-async-handler'
import Resume from '../models/Resume.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

// @desc    Get current resume
// @route   GET /api/resume
// @access  Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const resume = await Resume.findOne().sort({ createdAt: -1 })

    if (!resume) {
      return res.json({ pdfUrl: null })
    }

    res.json({
      pdfUrl: resume.pdfUrl,
      filename: resume.filename,
      updatedAt: resume.updatedAt,
    })
  })
)

// @desc    Save new resume
// @route   POST /api/resume
// @access  Private (Admin)
router.post(
  '/',
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { pdfUrl, filename } = req.body

    if (!pdfUrl) {
      res.status(400)
      throw new Error('PDF URL required')
    }

    // Delete old resumes
    await Resume.deleteMany({})

    // Save new
    const resume = await Resume.create({ pdfUrl, filename })

    res.status(201).json(resume)
  })
)

export default router