import multer from 'multer'
import path from 'path'
import fs from 'fs'

// Ensure uploads folder exists
const uploadDir = 'uploads'
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`)
  },
})

// File filter — only images
const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif|webp/
  const extname = allowed.test(path.extname(file.originalname).toLowerCase())
  const mimetype = allowed.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb(new Error('Only images are allowed (jpg, png, gif, webp)'))
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
})

export default upload