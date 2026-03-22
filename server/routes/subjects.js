import express from 'express'
import db from '../db.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

router.get('/', authenticateToken, async (req, res) => {
  try {
    const subjects = await db.getSubjects()
    res.json(subjects)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const subject = await db.getSubjectById(req.params.id)
    if (!subject) return res.status(404).json({ error: 'Subject not found' })
    const lessons = await db.getLessonsBySubjectId(req.params.id)
    res.json({ ...subject, lessons })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

export default router