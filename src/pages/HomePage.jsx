import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--color-primary)/0.05)] via-[hsl(var(--color-secondary)/0.05)] to-[hsl(var(--color-primary)/0.05)]">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-[hsl(var(--color-foreground))] mb-6">
            Welcome to <span className="text-gradient">AI Tutor</span>
          </h1>
          <p className="text-xl text-[hsl(var(--color-muted))] mb-8 leading-relaxed">
            Your personalized learning companion powered by artificial intelligence. 
            Master new subjects, take interactive quizzes, and track your progress.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="btn-primary text-lg px-8 py-3">
              Get Started
            </Link>
            <Link to="/login" className="btn-outline text-lg px-8 py-3">
              Sign In
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="card hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-[hsl(var(--color-primary)/0.1)] flex items-center justify-center mb-4">
              <span className="text-2xl">💡</span>
            </div>
            <h3 className="text-xl font-semibold text-[hsl(var(--color-foreground))] mb-2">AI-Powered Learning</h3>
            <p className="text-[hsl(var(--color-muted))]">
              Get personalized explanations and answers to your questions in natural language.
            </p>
          </div>

          <div className="card hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-[hsl(var(--color-secondary)/0.1)] flex items-center justify-center mb-4">
              <span className="text-2xl">📝</span>
            </div>
            <h3 className="text-xl font-semibold text-[hsl(var(--color-foreground))] mb-2">Interactive Quizzes</h3>
            <p className="text-[hsl(var(--color-muted))]">
              Test your knowledge with auto-generated quizzes and get instant feedback.
            </p>
          </div>

          <div className="card hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-[hsl(var(--color-primary)/0.1)] flex items-center justify-center mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-xl font-semibold text-[hsl(var(--color-foreground))] mb-2">Progress Tracking</h3>
            <p className="text-[hsl(var(--color-muted))]">
              Monitor your learning journey with detailed statistics and visual charts.
            </p>
          </div>
        </div>

        {/* Subjects Preview */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-[hsl(var(--color-foreground))] mb-8">Explore Subjects</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['🔢 Mathematics', '🔬 Science', '📚 History', '🌍 Languages'].map((subject, i) => (
              <div key={i} className="card text-center hover:shadow-lg transition-shadow cursor-pointer">
                <div className="text-4xl mb-3">{subject.split(' ')[0]}</div>
                <h4 className="font-semibold text-[hsl(var(--color-foreground))]">{subject.split(' ')[1]}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
