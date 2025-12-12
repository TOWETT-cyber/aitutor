import express from 'express'
import db from '../db.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// Get lesson by ID
router.get('/:id', authenticateToken, (req, res) => {
  const lesson = db.getLessonById(req.params.id)
  if (!lesson) {
    return res.status(404).json({ error: 'Lesson not found' })
  }

  const quizzes = db.getQuizzesByLessonId(req.params.id)
  res.json({ ...lesson, quizzes })
})

// Mark lesson as completed
router.post('/:id/complete', authenticateToken, (req, res) => {
  const lesson = db.getLessonById(req.params.id)
  if (!lesson) {
    return res.status(404).json({ error: 'Lesson not found' })
  }

  const progress = db.createProgress({
    user_id: req.user.id,
    lesson_id: parseInt(req.params.id),
    status: 'completed',
    progress_percentage: 100,
    completed_at: new Date()
  })

  lesson.completed_count++
  res.json({ success: true, progress })
})

export default router
