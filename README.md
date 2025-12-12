# AI Tutor - React & Node.js

A modern, AI-powered learning platform built with React, Node.js/Express, and OpenAI.

## 🚀 Features

- **AI-Powered Chat Tutor**: Get personalized explanations using OpenAI's GPT models
- **Interactive Lessons**: Browse subjects and complete lessons at your own pace
- **Quizzes**: Test your knowledge with auto-graded quizzes
- **Progress Tracking**: Monitor your learning journey with detailed statistics
- **Real-time Chat**: Stream AI responses in real-time via WebSocket
- **Modern UI**: Beautiful, responsive design with Tailwind CSS
- **JWT Authentication**: Secure user authentication and session management

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Vite
- React Router 6
- Axios
- Tailwind CSS 3

**Backend:**
- Node.js
- Express
- WebSocket (ws)
- JWT (jsonwebtoken)
- bcryptjs
- OpenAI API

## 📦 Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your-api-key-here
   ```

3. **Run the application:**
   ```bash
   npm run dev
   ```

   This will start:
   - Frontend dev server on `http://localhost:3000`
   - Backend API server on `http://localhost:3001`

## 🎯 Available Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run dev:client` - Start only the frontend dev server
- `npm run dev:server` - Start only the backend API server
- `npm run build` - Build frontend for production
- `npm run preview` - Preview production build

## 📁 Project Structure

```
├── src/                    # React frontend
│   ├── components/        # Reusable components
│   ├── pages/            # Page components
│   ├── context/          # React context (Auth)
│   ├── App.jsx           # Main app component
│   └── main.jsx          # Entry point
├── server/                # Node.js backend
│   ├── routes/           # API routes
│   ├── middleware/       # Express middleware
│   ├── websocket/        # WebSocket handlers
│   ├── db.js            # In-memory database
│   └── index.js         # Server entry point
├── public/              # Static assets
└── index.html          # HTML entry point
```

## 🔐 Authentication

The app uses JWT-based authentication:
- Users sign up with email and password
- Password is hashed using bcryptjs
- JWT token is stored in localStorage
- Protected routes require valid authentication

## 📚 Subjects Available

1. **Mathematics** 🔢 - Algebra, equations, and more
2. **Science** 🔬 - Photosynthesis, cell structure, physics
3. **History** 📚 - Ancient civilizations and world events
4. **Languages** 🌍 - Communication and language learning

## 🤖 AI Chat Feature

The AI chat uses OpenAI's API to provide real-time, streaming responses:
- WebSocket connection for real-time communication
- Context-aware responses based on subject
- Streaming text for immediate feedback
- Fallback responses if API is unavailable

## 🎨 Design System

Educational theme with calming colors:
- **Primary**: Ocean Blue (HSL 199° 89% 48%)
- **Secondary**: Sage Green (HSL 158° 64% 52%)
- **Clean typography** and **accessible UI**

## 📝 License

MIT License - feel free to use this project for learning and development.

## 🙏 Acknowledgments

- OpenAI for the GPT API
- React and Vite teams
- Express.js community
