import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-[hsl(var(--color-surface-elevated))] border-b border-[hsl(var(--color-border))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to={user ? '/dashboard' : '/'} className="flex items-center space-x-2 text-xl font-bold text-[hsl(var(--color-primary))] hover:text-[hsl(var(--color-primary-dark))] transition-colors">
            <span className="text-2xl">🎓</span>
            <span className="hidden sm:inline">AI Tutor</span>
          </Link>

          {/* Desktop Navigation */}
          {user && (
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/dashboard" className="text-[hsl(var(--color-foreground))] hover:text-[hsl(var(--color-primary))] transition-colors">
                Dashboard
              </Link>
              <Link to="/subjects" className="text-[hsl(var(--color-foreground))] hover:text-[hsl(var(--color-primary))] transition-colors">
                Subjects
              </Link>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-[hsl(var(--color-surface))] transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-[hsl(var(--color-primary))] flex items-center justify-center text-white text-sm font-medium">
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="hidden md:block text-sm font-medium text-[hsl(var(--color-foreground))]">
                    {user.name || user.email}
                  </span>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[hsl(var(--color-surface))] rounded-lg shadow-lg border border-[hsl(var(--color-border))] z-50">
                    <div className="py-1">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-[hsl(var(--color-surface-elevated))] transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="btn-outline hidden sm:inline-flex">
                  Sign In
                </Link>
                <Link to="/signup" className="btn-primary">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
