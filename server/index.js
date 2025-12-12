import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { createServer } from 'http'
import { WebSocketServer } from 'ws'
import authRoutes from './routes/auth.js'
import subjectRoutes from './routes/subjects.js'
import lessonRoutes from './routes/lessons.js'
import quizRoutes from './routes/quizzes.js'
import progressRoutes from './routes/progress.js'
import chatRoutes from './routes/chat.js'
import { handleChatWebSocket } from './websocket/chatHandler.js'

dotenv.config()

const app = express()
const server = createServer(app)
const wss = new WebSocketServer({ server, path: '/ws/chat' })

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/subjects', subjectRoutes)
app.use('/api/lessons', lessonRoutes)
app.use('/api/quizzes', quizRoutes)
app.use('/api/progress', progressRoutes)
app.use('/api/chat', chatRoutes)

// WebSocket handling
wss.on('connection', handleChatWebSocket)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'AI Tutor API is running' })
})

const PORT = process.env.PORT || 3001

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`🔌 WebSocket server running on ws://localhost:${PORT}/ws/chat`)
})
