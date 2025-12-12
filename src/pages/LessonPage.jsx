import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

export default function LessonPage() {
  const { id } = useParams()
  const [lesson, setLesson] = useState(null)
  const [loading, setLoading] = useState(true)
  const [completing, setCompleting] = useState(false)

  useEffect(() => {
    axios.get(`/api/lessons/${id}`)
      .then(res => setLesson(res.data))
      .catch(err => console.error('Failed to fetch lesson:', err))
      .finally(() => setLoading(false))
  }, [id])

  const handleComplete = async () => {
    setCompleting(true)
    try {
      await axios.post(`/api/lessons/${id}/complete`)
      alert('Lesson marked as completed!')
    } catch (error) {
      console.error('Failed to complete lesson:', error)
    } finally {
      setCompleting(false)
    }
  }

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 py-8">Loading lesson...</div>
  }

  if (!lesson) {
    return <div className="max-w-7xl mx-auto px-4 py-8">Lesson not found</div>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="card mb-6">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-3xl font-bold text-[hsl(var(--color-foreground))]">
                {lesson.title}
              </h1>
              <span className={`badge badge-${lesson.difficulty === 'beginner' ? 'success' : lesson.difficulty === 'intermediate' ? 'info' : 'warning'}`}>
                {lesson.difficulty}
              </span>
            </div>

            <div className="prose max-w-none text-[hsl(var(--color-foreground))]">
              <p className="text-lg leading-relaxed">{lesson.content}</p>
            </div>

            <div className="mt-6 pt-6 border-t border-[hsl(var(--color-border))]">
              <button
                onClick={handleComplete}
                disabled={completing}
                className="btn-primary"
              >
                {completing ? 'Marking Complete...' : 'Mark as Complete'}
              </button>
            </div>
          </div>

          {/* Quizzes */}
          {lesson.quizzes && lesson.quizzes.length > 0 && (
            <div className="card">
              <h2 className="text-2xl font-bold text-[hsl(var(--color-foreground))] mb-4">
                Practice Quizzes
              </h2>
              <div className="space-y-3">
                {lesson.quizzes.map((quiz) => (
                  <Link
                    key={quiz.id}
                    to={`/quizzes/${quiz.id}`}
                    className="block p-4 bg-[hsl(var(--color-surface-elevated))] rounded-lg border border-[hsl(var(--color-border))] hover:border-[hsl(var(--color-primary))] transition-colors"
                  >
                    <h3 className="font-semibold text-[hsl(var(--color-foreground))] mb-1">
                      {quiz.title}
                    </h3>
                    <p className="text-sm text-[hsl(var(--color-muted))]">
                      {quiz.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="card sticky top-8">
            <h3 className="font-semibold text-[hsl(var(--color-foreground))] mb-4">
              Lesson Progress
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[hsl(var(--color-muted))]">Difficulty</span>
                <span className="font-medium text-[hsl(var(--color-foreground))]">
                  {lesson.difficulty}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[hsl(var(--color-muted))]">Completed by</span>
                <span className="font-medium text-[hsl(var(--color-foreground))]">
                  {lesson.completed_count} students
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[hsl(var(--color-muted))]">Available quizzes</span>
                <span className="font-medium text-[hsl(var(--color-foreground))]">
                  {lesson.quizzes?.length || 0}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
