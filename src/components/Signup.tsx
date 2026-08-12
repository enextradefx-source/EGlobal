import { useState, type FormEvent } from 'react'
import { useTheme } from '../theme/ThemeContext'
import { useAuth } from '../auth/AuthContext'
import { HERO_IMAGE, LOGIN_LINK } from '../config'
import { ArrowRightIcon, MoonIcon, SunIcon } from './icons'

function AuthLogo() {
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

function AuthThemeToggle() {
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

export default function Signup() {
  const { signup } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Please fill in your name, email, and password.')
      return
    }
    setError('')
    signup({ name, email, phone, password })
    setSubmitted(true)
  }

  return (
    <div
      className="login-page"
      style={{ backgroundImage: `url(${HERO_IMAGE})` }}
    >
      <header className="login-header">
        <AuthLogo />
        <AuthThemeToggle />
      </header>

      <main className="login-main">
        <div className="card login-card">
          <p className="eyebrow">Create Account</p>
          <h1 className="login-title">Join EnexTrade</h1>
          <p className="login-sub">
            Sign up to access the signal room, mentorship tracks, and your
            trading dashboard.
          </p>

          {submitted ? (
            <div className="login-success">
              <strong>Account created!</strong>
              <p>
                Your free community membership is active. Head to your
                dashboard to access it and unlock paid mentorship when you are
                ready.
              </p>
              <a className="btn btn-primary" href="#/dashboard">
                Go to Dashboard
                <ArrowRightIcon width={16} height={16} />
              </a>
              <a className="btn btn-ghost" href={LOGIN_LINK}>
                Go to Log In
              </a>
            </div>
          ) : (
            <form className="login-form" onSubmit={handleSubmit} noValidate>
              <label className="login-field">
                <span>Full name</span>
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>

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
                <span>Phone (WhatsApp)</span>
                <input
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  placeholder="+234 800 000 0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </label>

              <label className="login-field">
                <span>Password</span>
                <input
                  type="password"
                  name="password"
                  autoComplete="new-password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>

              {error && <p className="login-error">{error}</p>}

              <button className="btn btn-primary login-submit" type="submit">
                Create Account
              </button>

              <p className="login-alt">
                Already have an account?{' '}
                <a href={LOGIN_LINK}>Log in</a>
              </p>
            </form>
          )}
        </div>
      </main>
    </div>
  )
}
