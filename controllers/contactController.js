import asyncHandler from 'express-async-handler'
import Message from '../models/Message.js'
import sendEmail from '../utils/sendEmail.js'

// @desc    Create new message
// @route   POST /api/contact
// @access  Public
export const createMessage = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body

  if (!name || !email || !message) {
    res.status(400)
    throw new Error('Please fill all fields')
  }

  // Save to database
  const newMessage = await Message.create({ name, email, message })

  // Send email (don't fail if email fails)
  try {
    await sendEmail({ name, email, message })
  } catch (error) {
    console.error('Email notification failed:', error.message)
  }

  res.status(201).json({
    success: true,
    message: 'Message sent successfully!',
    data: newMessage,
  })
})

// @desc    Get all messages
// @route   GET /api/contact
// @access  Private (Admin)
export const getMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 })
  res.json(messages)
})

// @desc    Mark message as read
// @route   PUT /api/contact/:id/read
// @access  Private (Admin)
export const markAsRead = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id)

  if (!message) {
    res.status(404)
    throw new Error('Message not found')
  }

  message.read = true
  await message.save()

  res.json(message)
})

// @desc    Delete message
// @route   DELETE /api/contact/:id
// @access  Private (Admin)
export const deleteMessage = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id)

  if (!message) {
    res.status(404)
    throw new Error('Message not found')
  }

  await message.deleteOne()
  res.json({ message: 'Message removed' })
})