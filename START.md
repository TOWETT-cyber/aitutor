# 🚀 AI Tutor - Quick Start Guide

## ✅ Current Status

Both servers are **RUNNING** successfully:

- **Frontend (React + Vite)**: http://localhost:3000
- **Backend (Express API)**: http://localhost:3001
- **WebSocket (AI Chat)**: ws://localhost:3001/ws/chat

## 🎯 Access the Application

Open your browser and visit:
```
http://localhost:3000
```

## 🔐 Getting Started

1. **Sign Up**: Create a new account at http://localhost:3000/signup
2. **Login**: Sign in with your credentials
3. **Explore**: Browse subjects, complete lessons, and take quizzes

## 📋 Available Features

### ✅ Working Features
- User authentication (signup/login/logout)
- Subject browsing (Mathematics, Science, History, Languages)
- Lesson viewing with completion tracking
- Interactive quizzes with instant grading
- Dashboard with progress statistics
- Responsive design with dark mode support

### 🔧 Setup Required
- AI Chat: Requires OpenAI API key in `.env` file
  - Edit `.env` and set `OPENAI_API_KEY=your-real-key-here`
  - Restart servers: `npm run dev`

## 🛠️ Development Commands

```bash
# Start both frontend and backend
npm run dev

# Start only frontend
npm run dev:client

# Start only backend
npm run dev:server

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔄 Restart Servers

If you need to restart:

```bash
# Kill all node processes
pkill -f node

# Start again
npm run dev
```

## 📦 Test API Endpoints

```bash
# Health check
curl http://localhost:3001/api/health

# Get subjects (requires authentication)
curl http://localhost:3001/api/subjects \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 🎨 Project Structure

```
├── src/                   # React frontend
│   ├── pages/            # Page components
│   ├── components/       # Reusable components
│   └── context/          # React context (Auth)
├── server/               # Node.js backend
│   ├── routes/          # API endpoints
│   ├── middleware/      # Auth middleware
│   └── websocket/       # WebSocket handlers
└── public/              # Static assets
```

## 🐛 Troubleshooting

**Port already in use:**
```bash
pkill -f node
npm run dev
```

**Dependencies missing:**
```bash
npm install
```

**Environment variables not loaded:**
```bash
# Make sure .env file exists
cp .env.example .env
# Edit .env and add your keys
npm run dev
```

## 📚 Sample Data

The app comes with pre-seeded data:
- 4 subjects (Math, Science, History, Languages)
- 5 lessons across subjects
- 2 quizzes with 3+ questions each

## 🎉 You're All Set!

The application is ready to use. Open http://localhost:3000 in your browser!
