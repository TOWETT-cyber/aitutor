import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { Pool } = pg

// In-memory database simulation (for quick setup)
// Replace with actual PostgreSQL connection in production
class InMemoryDB {
  constructor() {
    this.users = []
    this.subjects = []
    this.lessons = []
    this.quizzes = []
    this.questions = []
    this.progress = []
    this.chatConversations = []
    this.chatMessages = []
    this.quizAttempts = []
    this.initialized = false
  }

  async initialize() {
    if (this.initialized) return
    
    // Seed initial data
    this.subjects = [
      { id: 1, name: 'Mathematics', icon: '🔢', description: 'Master mathematical concepts from basics to advanced' },
      { id: 2, name: 'Science', icon: '🔬', description: 'Explore the wonders of physics, chemistry, and biology' },
      { id: 3, name: 'History', icon: '📚', description: 'Learn about world history and significant events' },
      { id: 4, name: 'Languages', icon: '🌍', description: 'Learn new languages and improve communication skills' }
    ]

    this.lessons = [
      { id: 1, subject_id: 1, title: 'Introduction to Algebra', content: 'Learn the basics of algebraic expressions and equations.', difficulty: 'beginner', order_position: 1, completed_count: 0 },
      { id: 2, subject_id: 1, title: 'Linear Equations', content: 'Solve linear equations and understand their graphs.', difficulty: 'intermediate', order_position: 2, completed_count: 0 },
      { id: 3, subject_id: 2, title: 'Basics of Photosynthesis', content: 'Understand how plants convert sunlight into energy.', difficulty: 'beginner', order_position: 1, completed_count: 0 },
      { id: 4, subject_id: 2, title: 'Cell Structure', content: 'Explore the components and functions of cells.', difficulty: 'intermediate', order_position: 2, completed_count: 0 },
      { id: 5, subject_id: 3, title: 'Ancient Civilizations', content: 'Study the early civilizations and their contributions.', difficulty: 'beginner', order_position: 1, completed_count: 0 }
    ]

    this.quizzes = [
      { id: 1, lesson_id: 1, title: 'Algebra Basics Quiz', description: 'Test your knowledge of basic algebra', difficulty: 'beginner' },
      { id: 2, lesson_id: 3, title: 'Photosynthesis Quiz', description: 'Test your understanding of photosynthesis', difficulty: 'beginner' }
    ]

    this.questions = [
      { id: 1, quiz_id: 1, question_text: 'What is 2x + 5 = 15?', question_type: 'multiple_choice', options: JSON.stringify(['x = 5', 'x = 10', 'x = 7.5', 'x = 15']), correct_answer: 'x = 5', order_position: 1 },
      { id: 2, quiz_id: 1, question_text: 'Solve for y: 3y - 6 = 9', question_type: 'multiple_choice', options: JSON.stringify(['y = 3', 'y = 5', 'y = 7', 'y = 9']), correct_answer: 'y = 5', order_position: 2 },
      { id: 3, quiz_id: 2, question_text: 'What gas do plants absorb during photosynthesis?', question_type: 'multiple_choice', options: JSON.stringify(['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen']), correct_answer: 'Carbon Dioxide', order_position: 1 }
    ]

    this.initialized = true
  }

  // Helper methods
  findUserByEmail(email) {
    return this.users.find(u => u.email === email)
  }

  findUserById(id) {
    return this.users.find(u => u.id === id)
  }

  createUser(user) {
    const newUser = { ...user, id: this.users.length + 1, created_at: new Date() }
    this.users.push(newUser)
    return newUser
  }

  getSubjects() {
    return this.subjects
  }

  getSubjectById(id) {
    return this.subjects.find(s => s.id === parseInt(id))
  }

  getLessonsBySubjectId(subjectId) {
    return this.lessons.filter(l => l.subject_id === parseInt(subjectId))
  }

  getLessonById(id) {
    return this.lessons.find(l => l.id === parseInt(id))
  }

  getQuizzesByLessonId(lessonId) {
    return this.quizzes.filter(q => q.lesson_id === parseInt(lessonId))
  }

  getQuizById(id) {
    return this.quizzes.find(q => q.id === parseInt(id))
  }

  getQuestionsByQuizId(quizId) {
    return this.questions.filter(q => q.quiz_id === parseInt(quizId))
  }

  getUserProgress(userId) {
    return this.progress.filter(p => p.user_id === userId)
  }

  createProgress(progressData) {
    const newProgress = { ...progressData, id: this.progress.length + 1, created_at: new Date() }
    this.progress.push(newProgress)
    return newProgress
  }

  createChatConversation(data) {
    const conversation = { ...data, id: this.chatConversations.length + 1, created_at: new Date() }
    this.chatConversations.push(conversation)
    return conversation
  }

  createChatMessage(data) {
    const message = { ...data, id: this.chatMessages.length + 1, created_at: new Date() }
    this.chatMessages.push(message)
    return message
  }

  getChatMessages(conversationId) {
    return this.chatMessages.filter(m => m.conversation_id === conversationId)
  }
}

export const db = new InMemoryDB()
await db.initialize()

export default db
