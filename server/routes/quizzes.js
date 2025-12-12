import express from 'express'
import db from '../db.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// Get quiz with questions
router.get('/:id', authenticateToken, (req, res) => {
  const quiz = db.getQuizById(req.params.id)
  if (!quiz) {
    return res.status(404).json({ error: 'Quiz not found' })
  }

  const questions = db.getQuestionsByQuizId(req.params.id)
  res.json({ ...quiz, questions })
})

// Submit quiz answer
router.post('/:id/submit', authenticateToken, (req, res) => {
  const { answers } = req.body // answers: [{ questionId, userAnswer }]
  const quiz = db.getQuizById(req.params.id)
  
  if (!quiz) {
    return res.status(404).json({ error: 'Quiz not found' })
  }

  const questions = db.getQuestionsByQuizId(req.params.id)
  let correctCount = 0

  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId)
    if (question && question.correct_answer === answer.userAnswer) {
      correctCount++
    }
  })

  const score = Math.round((correctCount / questions.length) * 100)

  res.json({
    score,
    correctCount,
    totalQuestions: questions.length,
    passed: score >= 70
  })
})

export default router
