import dotenv from 'dotenv'
import Skill from './models/Skill.js'
import connectDB from './config/db.js'

dotenv.config()

const skills = [
  {
    name: 'React.Js',
    subtitle: 'Developer',
    image: '/crystal-react.png',
    level: 90,
    order: 1,
  },
  {
    name: 'Next.Js',
    subtitle: 'Developer',
    image: '/crystal-next.png',
    level: 85,
    order: 2,
  },
  {
    name: 'Node',
    subtitle: 'Developer',
    image: '/crystal-node.png',
    level: 85,
    order: 3,
  },
  {
    name: 'Three.Js',
    subtitle: 'Developer',
    image: '/crystal-three.png',
    level: 75,
    order: 4,
  },
]

const seedSkills = async () => {
  try {
    await connectDB()

    // ✅ Delete existing (fresh start)
    await Skill.deleteMany({})
    console.log('🗑️  Old skills cleared')

    // ✅ Insert exactly 4
    const created = await Skill.insertMany(skills)
    console.log(`✅ ${created.length} skills added successfully!`)

    process.exit(0)
  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

seedSkills()