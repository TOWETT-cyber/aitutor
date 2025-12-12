import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function QuizPage() {
  const { id } = useParams()
  const [quiz, setQuiz] = useState(null)
  const [loading, setLoading] = useState(true)
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [result, setResult] = useState(null)

  useEffect(() => {
    axios.get(`/api/quizzes/${id}`)
      .then(res => {
        setQuiz(res.data)
        // Parse options for each question
        const parsedQuiz = {
          ...res.data,
          questions: res.data.questions.map(q => ({
            ...q,
            options: typeof q.options === 'string' ? JSON.parse(q.options) : q.options
          }))
        }
        setQuiz(parsedQuiz)
      })
      .catch(err => console.error('Failed to fetch quiz:', err))
      .finally(() => setLoading(false))
  }, [id])

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const answersArray = Object.entries(answers).map(([questionId, userAnswer]) => ({
      questionId: parseInt(questionId),
      userAnswer
    }))

    try {
      const response = await axios.post(`/api/quizzes/${id}/submit`, { answers: answersArray })
      setResult(response.data)
      setSubmitted(true)
    } catch (error) {
      console.error('Failed to submit quiz:', error)
      alert('Failed to submit quiz. Please try again.')
    }
  }

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 py-8">Loading quiz...</div>
  }

  if (!quiz) {
    return <div className="max-w-7xl mx-auto px-4 py-8">Quiz not found</div>
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="card mb-6">
        <h1 className="text-3xl font-bold text-[hsl(var(--color-foreground))] mb-2">
          {quiz.title}
        </h1>
        <p className="text-[hsl(var(--color-muted))]">{quiz.description}</p>
        <div className="mt-4">
          <span className={`badge badge-${quiz.difficulty === 'beginner' ? 'success' : quiz.difficulty === 'intermediate' ? 'info' : 'warning'}`}>
            {quiz.difficulty}
          </span>
        </div>
      </div>

      {submitted && result ? (
        <div className="card">
          <div className={`p-6 rounded-lg mb-6 ${result.passed ? 'bg-green-100 border-2 border-green-300' : 'bg-yellow-100 border-2 border-yellow-300'}`}>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {result.passed ? '🎉 Great Job!' : '📚 Keep Practicing!'}
            </h2>
            <p className="text-4xl font-bold text-gray-900 mb-2">{result.score}%</p>
            <p className="text-gray-700">
              You got {result.correctCount} out of {result.totalQuestions} questions correct.
            </p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Retake Quiz
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {quiz.questions?.map((question, index) => (
            <div key={question.id} className="card">
              <h3 className="font-semibold text-[hsl(var(--color-foreground))] mb-4">
                Question {index + 1}: {question.question_text}
              </h3>
              
              <div className="space-y-2">
                {question.options?.map((option, optIndex) => (
                  <label
                    key={optIndex}
                    className="flex items-center p-3 rounded-lg border border-[hsl(var(--color-border))] hover:border-[hsl(var(--color-primary))] cursor-pointer transition-colors"
                  >
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={option}
                      checked={answers[question.id] === option}
                      onChange={() => handleAnswerChange(question.id, option)}
                      className="mr-3"
                      required
                    />
                    <span className="text-[hsl(var(--color-foreground))]">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <button type="submit" className="btn-primary w-full text-lg">
            Submit Quiz
          </button>
        </form>
      )}
    </div>
  )
}
