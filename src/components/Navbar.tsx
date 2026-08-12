import { useEffect, useState } from 'react'
import { useTheme } from '../theme/ThemeContext'
import { useAuth } from '../auth/AuthContext'
import { LOGIN_LINK, SIGNUP_LINK } from '../config'
import {
  CloseIcon,
  GridIcon,
  LogoutIcon,
  MenuIcon,
  MoonIcon,
  SunIcon,
} from './icons'

const LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#mentorship', label: 'Mentorship' },
  { href: '#signals', label: 'Signal Room' },
  { href: '#how-it-works', label: 'How It Works' },
]

function Logo() {
  return (
    <a href="#top" className="logo" aria-label="EnexTrade home">
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

function ThemeToggle() {
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

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const closeMenu = () => setOpen(false)

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Logo />

        <nav aria-label="Primary">
          <ul className={`nav-links${open ? ' mobile-open' : ''}`}>
            {LINKS.map((link) => (
              <li key={link.href}>
                <a className="nav-link" href={link.href} onClick={closeMenu}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-actions">
          <ThemeToggle />
          {user ? (
            <>
              <a className="btn btn-ghost btn-sm btn-login" href="#/dashboard">
                <GridIcon width={15} height={15} />
                Dashboard
              </a>
              <button
                className="btn btn-outline btn-sm nav-desktop-cta"
                type="button"
                onClick={logout}
              >
                <LogoutIcon width={15} height={15} />
                Logout
              </button>
            </>
          ) : (
            <>
              <a className="btn btn-ghost btn-sm btn-login" href={LOGIN_LINK}>
                Log In
              </a>
              <a
                className="btn btn-primary btn-sm nav-desktop-cta"
                href={SIGNUP_LINK}
              >
                Get Started
              </a>
            </>
          )}
          <button
            className="hamburger"
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
    </header>
  )
}
