import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [subjects, setSubjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, subjectsRes] = await Promise.all([
          axios.get('/api/progress'),
          axios.get('/api/subjects')
        ])
        setStats(statsRes.data)
        setSubjects(subjectsRes.data)
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 py-8">Loading...</div>
  }

  const completionPercentage = stats ? Math.round((stats.totalLessonsCompleted / stats.totalLessons) * 100) : 0

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[hsl(var(--color-foreground))]">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-[hsl(var(--color-muted))] mt-2">
          Continue your learning journey where you left off
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[hsl(var(--color-muted))]">Lessons Completed</p>
              <p className="text-3xl font-bold text-[hsl(var(--color-foreground))]">
                {stats?.totalLessonsCompleted || 0}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-[hsl(var(--color-primary)/0.1)] flex items-center justify-center">
              <span className="text-2xl">📚</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[hsl(var(--color-muted))]">Quizzes Taken</p>
              <p className="text-3xl font-bold text-[hsl(var(--color-foreground))]">
                {stats?.totalQuizzesTaken || 0}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-[hsl(var(--color-secondary)/0.1)] flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[hsl(var(--color-muted))]">Progress</p>
              <p className="text-3xl font-bold text-[hsl(var(--color-foreground))]">
                {completionPercentage}%
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-[hsl(var(--color-primary)/0.1)] flex items-center justify-center">
              <span className="text-2xl">📊</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[hsl(var(--color-muted))]">Subjects</p>
              <p className="text-3xl font-bold text-[hsl(var(--color-foreground))]">
                {subjects.length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-[hsl(var(--color-secondary)/0.1)] flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
          </div>
        </div>
      </div>

      {/* Subjects Grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[hsl(var(--color-foreground))] mb-4">Your Subjects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {subjects.map((subject) => (
            <Link
              key={subject.id}
              to={`/subjects/${subject.id}`}
              className="card hover:shadow-lg transition-all hover:scale-105"
            >
              <div className="text-4xl mb-3">{subject.icon}</div>
              <h3 className="text-lg font-semibold text-[hsl(var(--color-foreground))] mb-2">
                {subject.name}
              </h3>
              <p className="text-sm text-[hsl(var(--color-muted))]">
                {subject.description}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-xl font-bold text-[hsl(var(--color-foreground))] mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link to="/subjects" className="btn-primary">
            Browse Subjects
          </Link>
          <button className="btn-secondary">
            Continue Learning
          </button>
        </div>
      </div>
    </div>
  )
}
