import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/api/subjects')
      .then(res => setSubjects(res.data))
      .catch(err => console.error('Failed to fetch subjects:', err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 py-8">Loading subjects...</div>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[hsl(var(--color-foreground))]">
          Explore Subjects
        </h1>
        <p className="text-[hsl(var(--color-muted))] mt-2">
          Choose a subject to start learning
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject) => (
          <Link
            key={subject.id}
            to={`/subjects/${subject.id}`}
            className="card hover:shadow-xl transition-all hover:scale-105 cursor-pointer"
          >
            <div className="text-5xl mb-4">{subject.icon}</div>
            <h2 className="text-2xl font-bold text-[hsl(var(--color-foreground))] mb-3">
              {subject.name}
            </h2>
            <p className="text-[hsl(var(--color-muted))]">
              {subject.description}
            </p>
            <div className="mt-4 flex items-center text-[hsl(var(--color-primary))]">
              <span className="font-medium">Explore lessons</span>
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
