import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

export default function SubjectDetailPage() {
  const { id } = useParams()
  const [subject, setSubject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`/api/subjects/${id}`)
      .then(res => setSubject(res.data))
      .catch(err => console.error('Failed to fetch subject:', err))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 py-8">Loading...</div>
  }

  if (!subject) {
    return <div className="max-w-7xl mx-auto px-4 py-8">Subject not found</div>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Subject Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <span className="text-6xl">{subject.icon}</span>
          <div>
            <h1 className="text-4xl font-bold text-[hsl(var(--color-foreground))]">
              {subject.name}
            </h1>
            <p className="text-[hsl(var(--color-muted))] mt-2">
              {subject.description}
            </p>
          </div>
        </div>
      </div>

      {/* Lessons List */}
      <div>
        <h2 className="text-2xl font-bold text-[hsl(var(--color-foreground))] mb-4">
          Lessons
        </h2>
        
        {subject.lessons && subject.lessons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {subject.lessons.map((lesson) => (
              <Link
                key={lesson.id}
                to={`/lessons/${lesson.id}`}
                className="card hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold text-[hsl(var(--color-foreground))]">
                    {lesson.title}
                  </h3>
                  <span className={`badge badge-${lesson.difficulty === 'beginner' ? 'success' : lesson.difficulty === 'intermediate' ? 'info' : 'warning'}`}>
                    {lesson.difficulty}
                  </span>
                </div>
                
                <p className="text-[hsl(var(--color-muted))] mb-4 line-clamp-2">
                  {lesson.content}
                </p>

                <div className="flex items-center space-x-4 text-sm text-[hsl(var(--color-muted))]">
                  <span>
                    📝 {lesson.quizzes?.length || 0} quizzes
                  </span>
                  <span>
                    ✅ {lesson.completed_count} completed
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="card text-center py-12">
            <p className="text-[hsl(var(--color-muted))]">
              No lessons available yet for this subject.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
