import asyncHandler from 'express-async-handler'
import Project from '../models/Project.js'

export const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find().sort({ order: 1, createdAt: -1 })
  res.json(projects)
})

export const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id)

  if (!project) {
    res.status(404)
    throw new Error('Project not found')
  }

  res.json(project)
})

export const createProject = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    image,
    tech,
    github,
    live,
    featured,
    order,
    problem,
    solution,
    challenges,
    learnings,
    designDecisions,
    results,
    duration,
    role,
    year,
    screenshots,
  } = req.body

  if (!title || !description) {
    res.status(400)
    throw new Error('Please add title and description')
  }

  const project = await Project.create({
    title,
    description,
    image: image || '',
    tech: tech || [],
    github: github || '',
    live: live || '',
    featured: featured || false,
    order: order || 0,
    problem: problem || '',
    solution: solution || '',
    challenges: challenges || [],
    learnings: learnings || [],
    designDecisions: designDecisions || '',
    results: results || [],
    duration: duration || '',
    role: role || '',
    year: year || '',
    screenshots: screenshots || [],
  })

  res.status(201).json(project)
})

export const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id)

  if (!project) {
    res.status(404)
    throw new Error('Project not found')
  }

  const updated = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.json(updated)
})

export const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id)

  if (!project) {
    res.status(404)
    throw new Error('Project not found')
  }

  await project.deleteOne()
  res.json({ message: 'Project removed' })
})