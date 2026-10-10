import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from './models/User.js'
import connectDB from './config/db.js'

dotenv.config()

const seedAdmin = async () => {
  try {
    await connectDB()

    const email = 'rashidalih291@gmail.com'
    const password = 'Password1234!@#$'

    // ✅ Delete existing (agar hai)
    const deleted = await User.deleteMany({ email })
    if (deleted.deletedCount > 0) {
      console.log(`🗑️  Deleted ${deleted.deletedCount} old user(s)`)
    }

    // ✅ Create fresh
    const admin = await User.create({
      email,
      password,
      isAdmin: true,
    })

    console.log('✅ Admin created successfully!')
    console.log('   Email:', admin.email)
    console.log('   Password:', password)
    console.log('   ID:', admin._id)
    console.log('   Hashed Password:', admin.password.substring(0, 30) + '...')

    // ✅ Verify
    const isMatch = await admin.matchPassword(password)
    console.log('   Password Match Test:', isMatch ? '✅ PASS' : '❌ FAIL')

    process.exit(0)
  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

seedAdmin()