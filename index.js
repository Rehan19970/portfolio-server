import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cloudinary from 'cloudinary'
import connectDB from './config/db.js'
import contactRoutes from './routes/contactRoutes.js'
import projectRoutes from './routes/projectRoutes.js'
import authRoutes from './routes/authRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import resumeRoutes from './routes/resumeRoutes.js'
import skillRoutes from './routes/skillRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

dotenv.config()

const app = express()

// ✅ CORS — multiple origins
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://portfolio-client-iota-ten.vercel.app',
]

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true)
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        console.log('Blocked by CORS:', origin)
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true,
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// MongoDB connect
app.use(async (req, res, next) => {
  try {
    await connectDB()
    next()
  } catch (error) {
    res.status(500).json({ message: 'Database connection failed' })
  }
})

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Portfolio API is running 🚀' })
})

// ═══════════ CLOUDINARY TEST ROUTE ═══════════
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

app.get('/api/test-cloudinary', async (req, res) => {
  try {
    console.log('═══════ CLOUDINARY TEST ═══════')
    console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME)
    console.log('API Key:', process.env.CLOUDINARY_API_KEY)
    console.log(
      'API Secret:',
      process.env.CLOUDINARY_API_SECRET
        ? process.env.CLOUDINARY_API_SECRET.substring(0, 10) + '...'
        : 'UNDEFINED'
    )

    const result = await cloudinary.v2.uploader.upload(
      'https://res.cloudinary.com/demo/image/upload/sample.jpg',
      { folder: 'portfolio/test' }
    )

    console.log('✅ SUCCESS:', result.secure_url)

    res.json({
      success: true,
      url: result.secure_url,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    })
  } catch (error) {
    console.error('❌ Cloudinary Test Error:', error)
    res.status(500).json({
      success: false,
      error: error.message,
      details: error.toString(),
    })
  }
})

// ═══════════ API ROUTES ═══════════
app.use('/api/auth', authRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/resume', resumeRoutes)
app.use('/api/skills', skillRoutes)

// Error Middleware
app.use(notFound)
app.use(errorHandler)

// Server start
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`🌐 http://localhost:${PORT}`)
})

export default app