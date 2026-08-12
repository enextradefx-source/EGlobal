import { useState, type FormEvent } from 'react'
import { useTheme } from '../theme/ThemeContext'
import { useAuth } from '../auth/AuthContext'
import { HERO_IMAGE, SIGNUP_LINK } from '../config'
import { ArrowRightIcon, MoonIcon, SunIcon } from './icons'

function LoginLogo() {
  return (
    <a href="#/" className="logo" aria-label="EnexTrade home">
      <span className="logo-badge" aria-hidden="true">
        e
      </span>
      <span className="logo-name">
        EnexTrade
        <span className="logo-tag">Global Markets</span>
      </span>
    </a>
  )
}

function LoginThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}

export default function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !password.trim()) {
      setError('Please enter both your email and password.')
      return
    }
    const ok = login(email)
    if (!ok) {
      setError('No account found for that email. Please create an account first.')
      return
    }
    setError('')
    setSubmitted(true)
  }

  return (
    <div
      className="login-page"
      style={{ backgroundImage: `url(${HERO_IMAGE})` }}
    >
      <header className="login-header">
        <LoginLogo />
        <LoginThemeToggle />
      </header>

      <main className="login-main">
        <div className="card login-card">
          <p className="eyebrow">Member Access</p>
          <h1 className="login-title">Welcome back</h1>
          <p className="login-sub">
            Log in to access your dashboard, signal room, and mentorship
            resources.
          </p>

          {submitted ? (
            <div className="login-success">
              <strong>Signed in!</strong>
              <p>You are now logged in. Head to your dashboard.</p>
              <a className="btn btn-primary" href="#/dashboard">
                Go to Dashboard
                <ArrowRightIcon width={16} height={16} />
              </a>
            </div>
          ) : (
            <form className="login-form" onSubmit={handleSubmit} noValidate>
              <label className="login-field">
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>

              <label className="login-field">
                <span>Password</span>
                <input
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>

              {error && <p className="login-error">{error}</p>}

              <button className="btn btn-primary login-submit" type="submit">
                Log In
              </button>

              <p className="login-alt">
                New to EnexTrade?{' '}
                <a href={SIGNUP_LINK}>Create an account</a>
              </p>
            </form>
          )}
        </div>
      </main>
    </div>
  )
}
