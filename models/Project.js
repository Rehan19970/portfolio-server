import mongoose from 'mongoose'

const projectSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    image: {
      type: String,
      default: '',
    },
    tech: {
      type: [String],
      default: [],
    },
    github: {
      type: String,
      default: '',
    },
    live: {
      type: String,
      default: '',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },

    // ═══════════ CASE STUDY FIELDS ═══════════
    problem: {
      type: String,
      default: '',
    },
    solution: {
      type: String,
      default: '',
    },
    challenges: [
      {
        title: String,
        description: String,
      },
    ],
    learnings: {
      type: [String],
      default: [],
    },
    designDecisions: {
      type: String,
      default: '',
    },
    results: {
      type: [String],
      default: [],
    },
    duration: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      default: '',
    },
    year: {
      type: String,
      default: '',
    },
    screenshots: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
)

const Project = mongoose.model('Project', projectSchema)

export default Project