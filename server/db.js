import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { Pool } = pg

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
})

export const db = {
  async initialize() {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255),
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS subjects (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        icon VARCHAR(10),
        description TEXT
      );

      CREATE TABLE IF NOT EXISTS lessons (
        id SERIAL PRIMARY KEY,
        subject_id INTEGER REFERENCES subjects(id),
        title VARCHAR(255) NOT NULL,
        content TEXT,
        difficulty VARCHAR(50),
        order_position INTEGER,
        completed_count INTEGER DEFAULT 0
      );

      CREATE TABLE IF NOT EXISTS quizzes (
        id SERIAL PRIMARY KEY,
        lesson_id INTEGER REFERENCES lessons(id),
        title VARCHAR(255),
        description TEXT,
        difficulty VARCHAR(50)
      );

      CREATE TABLE IF NOT EXISTS questions (
        id SERIAL PRIMARY KEY,
        quiz_id INTEGER REFERENCES quizzes(id),
        question_text TEXT,
        question_type VARCHAR(50),
        options TEXT,
        correct_answer TEXT,
        order_position INTEGER
      );

      CREATE TABLE IF NOT EXISTS progress (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        lesson_id INTEGER REFERENCES lessons(id),
        completed BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS chat_conversations (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        subject_id INTEGER,
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS chat_messages (
        id SERIAL PRIMARY KEY,
        conversation_id INTEGER REFERENCES chat_conversations(id),
        role VARCHAR(20),
        content TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS quiz_attempts (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        quiz_id INTEGER REFERENCES quizzes(id),
        score INTEGER,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `)

    // Seed subjects if empty
    const { rows } = await pool.query('SELECT COUNT(*) FROM subjects')
    if (parseInt(rows[0].count) === 0) {
      await pool.query(`
        INSERT INTO subjects (name, icon, description) VALUES
        ('Mathematics', '📢', 'Master mathematical concepts from basics to advanced'),
        ('Science', '📬', 'Explore the wonders of physics, chemistry, and biology'),
        ('History', '📚', 'Learn about world history and significant events'),
        ('Languages', '🌍', 'Learn new languages and improve communication skills');

        INSERT INTO lessons (subject_id, title, content, difficulty, order_position) VALUES
        (1, 'Introduction to Algebra', 'Learn the basics of algebraic expressions and equations.', 'beginner', 1),
        (1, 'Linear Equations', 'Solve linear equations and understand their graphs.', 'intermediate', 2),
        (2, 'Basics of Photosynthesis', 'Understand how plants convert sunlight into energy.', 'beginner', 1),
        (2, 'Cell Structure', 'Explore the components and functions of cells.', 'intermediate', 2),
        (3, 'Ancient Civilizations', 'Study the early civilizations and their contributions.', 'beginner', 1);

        INSERT INTO quizzes (lesson_id, title, description, difficulty) VALUES
        (1, 'Algebra Basics Quiz', 'Test your knowledge of basic algebra', 'beginner'),
        (3, 'Photosynthesis Quiz', 'Test your understanding of photosynthesis', 'beginner');

        INSERT INTO questions (quiz_id, question_text, question_type, options, correct_answer, order_position) VALUES
        (1, 'What is 2x + 5 = 15?', 'multiple_choice', '["x = 5","x = 10","x = 7.5","x = 15"]', 'x = 5', 1),
        (1, 'Solve for y: 3y - 6 = 9', 'multiple_choice', '["y = 3","y = 5","y = 7","y = 9"]', 'y = 5', 2),
        (2, 'What gas do plants absorb during photosynthesis?', 'multiple_choice', '["Oxygen","Nitrogen","Carbon Dioxide","Hydrogen"]', 'Carbon Dioxide', 1);
      `)
    }

    console.log('✅ Database initialized')
  },

  async findUserByEmail(email) {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email])
    return rows[0]
  },

  async findUserById(id) {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id])
    return rows[0]
  },

  async createUser(user) {
    const { rows } = await pool.query(
      'INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING *',
      [user.email, user.password, user.name]
    )
    return rows[0]
  },

  async getSubjects() {
    const { rows } = await pool.query('SELECT * FROM subjects')
    return rows
  },

  async getSubjectById(id) {
    const { rows } = await pool.query('SELECT * FROM subjects WHERE id = $1', [id])
    return rows[0]
  },

  async getLessonsBySubjectId(subjectId) {
    const { rows } = await pool.query('SELECT * FROM lessons WHERE subject_id = $1 ORDER BY order_position', [subjectId])
    return rows
  },

  async getLessonById(id) {
    const { rows } = await pool.query('SELECT * FROM lessons WHERE id = $1', [id])
    return rows[0]
  },

  async getQuizzesByLessonId(lessonId) {
    const { rows } = await pool.query('SELECT * FROM quizzes WHERE lesson_id = $1', [lessonId])
    return rows
  },

  async getQuizById(id) {
    const { rows } = await pool.query('SELECT * FROM quizzes WHERE id = $1', [id])
    return rows[0]
  },

  async getQuestionsByQuizId(quizId) {
    const { rows } = await pool.query('SELECT * FROM questions WHERE quiz_id = $1 ORDER BY order_position', [quizId])
    return rows
  },

  async getUserProgress(userId) {
    const { rows } = await pool.query('SELECT * FROM progress WHERE user_id = $1', [userId])
    return rows
  },

  async createProgress(data) {
    const { rows } = await pool.query(
      'INSERT INTO progress (user_id, lesson_id, completed) VALUES ($1, $2, $3) RETURNING *',
      [data.user_id, data.lesson_id, data.completed]
    )
    return rows[0]
  },

  async createChatConversation(data) {
    const { rows } = await pool.query(
      'INSERT INTO chat_conversations (user_id, subject_id) VALUES ($1, $2) RETURNING *',
      [data.user_id, data.subject_id]
    )
    return rows[0]
  },

  async createChatMessage(data) {
    const { rows } = await pool.query(
      'INSERT INTO chat_messages (conversation_id, role, content) VALUES ($1, $2, $3) RETURNING *',
      [data.conversation_id, data.role, data.content]
    )
    return rows[0]
  },

  async getChatMessages(conversationId) {
    const { rows } = await pool.query(
      'SELECT * FROM chat_messages WHERE conversation_id = $1 ORDER BY created_at',
      [conversationId]
    )
    return rows
  }
}

await db.initialize()
export default db