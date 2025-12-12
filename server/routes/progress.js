import express from 'express'
import db from '../db.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// Get user progress/stats
router.get('/', authenticateToken, (req, res) => {
  const userProgress = db.getUserProgress(req.user.id)
  
  const stats = {
    totalLessonsCompleted: userProgress.filter(p => p.status === 'completed').length,
    totalLessons: db.lessons.length,
    totalQuizzesTaken: db.quizAttempts.filter(a => a.user_id === req.user.id).length,
    recentActivity: userProgress.slice(-5).reverse()
  }

  res.json(stats)
})

export default router
