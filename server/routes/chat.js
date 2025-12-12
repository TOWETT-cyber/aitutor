import express from 'express'
import db from '../db.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// Create chat conversation
router.post('/conversations', authenticateToken, (req, res) => {
  const { subject_id } = req.body
  
  const conversation = db.createChatConversation({
    user_id: req.user.id,
    subject_id: subject_id || null
  })

  res.json(conversation)
})

// Get conversation messages
router.get('/conversations/:id/messages', authenticateToken, (req, res) => {
  const messages = db.getChatMessages(parseInt(req.params.id))
  res.json(messages)
})

export default router
