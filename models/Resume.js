import mongoose from 'mongoose'

const resumeSchema = mongoose.Schema(
  {
    pdfUrl: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
)

const Resume = mongoose.model('Resume', resumeSchema)

export default Resume