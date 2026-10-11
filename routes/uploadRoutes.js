import express from 'express'
import multer from 'multer'
import cloudinary from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

// ✅ Cloudinary configuration (SAHI)
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// ✅ Image storage
const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: 'portfolio/images',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
  },
})

const uploadImage = multer({ storage: imageStorage })

// ✅ PDF storage (raw files)
const pdfStorage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: 'portfolio/documents',
    resource_type: 'raw',
    allowed_formats: ['pdf'],
  },
})

const uploadPdf = multer({ storage: pdfStorage })

// Image upload
router.post('/image', protect, admin, uploadImage.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file' })
  res.json({
    success: true,
    imageUrl: req.file.path,
  })
})

// PDF upload
router.post('/pdf', protect, admin, uploadPdf.single('pdf'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file' })
  res.json({
    success: true,
    pdfUrl: req.file.path,
  })
})

export default router