import asyncHandler from 'express-async-handler'
import Skill from '../models/Skill.js'

export const getSkills = asyncHandler(async (req, res) => {
  const skills = await Skill.find().sort({ order: 1, createdAt: 1 })
  res.json(skills)
})

export const createSkill = asyncHandler(async (req, res) => {
  const { name, subtitle, image, level, order } = req.body

  if (!name) {
    res.status(400)
    throw new Error('Please add skill name')
  }

  const skill = await Skill.create({
    name,
    subtitle: subtitle || 'Developer',
    image: image || '',
    level: level || 80,
    order: order || 0,
  })

  res.status(201).json(skill)
})

export const updateSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findById(req.params.id)

  if (!skill) {
    res.status(404)
    throw new Error('Skill not found')
  }

  const updated = await Skill.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.json(updated)
})

export const deleteSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findById(req.params.id)

  if (!skill) {
    res.status(404)
    throw new Error('Skill not found')
  }

  await skill.deleteOne()
  res.json({ message: 'Skill removed' })
})