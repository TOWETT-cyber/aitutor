import express from 'express'
import db from '../db.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// Get all subjects
router.get('/', authenticateToken, (req, res) => {
  const subjects = db.getSubjects()
  res.json(subjects)
})

// Get single subject with lessons
router.get('/:id', authenticateToken, (req, res) => {
  const subject = db.getSubjectById(req.params.id)
  if (!subject) {
    return res.status(404).json({ error: 'Subject not found' })
  }

  const lessons = db.getLessonsBySubjectId(req.params.id)
  res.json({ ...subject, lessons })
})

export default router
