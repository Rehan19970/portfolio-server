import express from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

// Ensure folders exist
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}
ensureDir('uploads/images')
ensureDir('uploads/documents')

// === Image Upload ===
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/images'),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, `${unique}${path.extname(file.originalname)}`)
  },
})

const imageFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif|webp/
  const ok =
    allowed.test(path.extname(file.originalname).toLowerCase()) &&
    allowed.test(file.mimetype)
  ok ? cb(null, true) : cb(new Error('Only images allowed'))
}

const uploadImage = multer({
  storage: imageStorage,
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
})

// === PDF Upload ===
const pdfStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/documents'),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, `${unique}${path.extname(file.originalname)}`)
  },
})

const pdfFilter = (req, file, cb) => {
  const ok =
    path.extname(file.originalname).toLowerCase() === '.pdf' &&
    file.mimetype === 'application/pdf'
  ok ? cb(null, true) : cb(new Error('Only PDF files allowed'))
}

const uploadPdf = multer({
  storage: pdfStorage,
  fileFilter: pdfFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
})

// === Routes ===

// Image upload
router.post('/image', protect, admin, uploadImage.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file' })
  res.json({
    success: true,
    imageUrl: `http://localhost:5000/uploads/images/${req.file.filename}`,
  })
})

// PDF upload
router.post('/pdf', protect, admin, uploadPdf.single('pdf'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file' })
  res.json({
    success: true,
    pdfUrl: `http://localhost:5000/uploads/documents/${req.file.filename}`,
  })
})

export default router