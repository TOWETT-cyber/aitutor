import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Dashboard from './pages/Dashboard'
import SubjectsPage from './pages/SubjectsPage'
import SubjectDetailPage from './pages/SubjectDetailPage'
import LessonPage from './pages/LessonPage'
import QuizPage from './pages/QuizPage'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" replace />
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            
            {/* Protected Routes */}
            <Route path="dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="subjects" element={
              <ProtectedRoute>
                <SubjectsPage />
              </ProtectedRoute>
            } />
            <Route path="subjects/:id" element={
              <ProtectedRoute>
                <SubjectDetailPage />
              </ProtectedRoute>
            } />
            <Route path="lessons/:id" element={
              <ProtectedRoute>
                <LessonPage />
              </ProtectedRoute>
            } />
            <Route path="quizzes/:id" element={
              <ProtectedRoute>
                <QuizPage />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
