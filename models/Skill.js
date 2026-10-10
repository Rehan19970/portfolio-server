import mongoose from 'mongoose'

const skillSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a skill name'],
      trim: true,
    },
    subtitle: {
      type: String,
      default: 'Developer',
      trim: true,
    },
    image: {
      type: String,
      default: '',
    },
    level: {
      type: Number,
      min: 0,
      max: 100,
      default: 80,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)

const Skill = mongoose.model('Skill', skillSchema)

export default Skill