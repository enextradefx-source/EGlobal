import { useAuth } from '../auth/AuthContext'
import { isTrackUnlocked } from '../lib/auth'
import { TRACKS } from '../mentorshipData'
import { useTheme } from '../theme/ThemeContext'
import { LOGIN_LINK, SIGNUP_LINK } from '../config'
import {
  ArrowRightIcon,
  GridIcon,
  LockIcon,
  LogoutIcon,
  MoonIcon,
  SunIcon,
  UnlockIcon,
} from './icons'

function DashLogo() {
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

function DashThemeToggle() {
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

export default function Dashboard() {
  const { user, logout } = useAuth()

  if (!user) {
    return (
      <div className="dashboard-page">
        <div className="card login-card dashboard-gate">
          <p className="eyebrow">Member Area</p>
          <h1 className="login-title">Log in to view your dashboard</h1>
          <p className="login-sub">
            Your mentorship tracks, free community access, and order history
            live here.
          </p>
          <div className="cta-actions">
            <a className="btn btn-primary" href={LOGIN_LINK}>
              Log In
            </a>
            <a className="btn btn-outline" href={SIGNUP_LINK}>
              Create Account
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <DashLogo />
        <div className="dashboard-header-actions">
          <DashThemeToggle />
          <a className="btn btn-ghost btn-sm" href="#/">
            Back to Site
          </a>
          <button
            className="btn btn-outline btn-sm dashboard-logout"
            type="button"
            onClick={logout}
          >
            <LogoutIcon width={15} height={15} />
            Logout
          </button>
        </div>
      </header>

      <main className="container dashboard-main">
        <div className="dashboard-hello">
          <div>
            <p className="eyebrow">Dashboard</p>
            <h1 className="dashboard-title">
              Welcome back, {user.name.split(' ')[0] || 'Trader'}
            </h1>
            <p className="login-sub">
              {user.email} ·{' '}
              <span className={`dash-plan dash-plan--${user.plan}`}>
                {user.plan === 'paid'
                  ? 'Paid membership'
                  : user.plan === 'standard'
                    ? 'Community Standard'
                    : 'Free community'}
              </span>
            </p>
          </div>
          <div className="dash-free-tag">
            <UnlockIcon width={18} height={18} />
            Free Community unlocked
          </div>
        </div>

        <section className="dash-section">
          <div className="dash-section-head">
            <h2 className="dash-section-title">
              <GridIcon width={20} height={20} />
              Mentorship tracks
            </h2>
            <p className="dash-section-sub">
              {user.plan === 'paid'
                ? 'Your purchased tracks are unlocked.'
                : 'Free community is included. Upgrade to unlock the rest.'}
            </p>
          </div>

          <div className="dashboard-grid">
            {TRACKS.map((t) => {
              const unlocked = isTrackUnlocked(user, t.id)
              return (
                <article
                  className={`card dash-track${unlocked ? '' : ' dash-track--locked'}`}
                  key={t.id}
                >
                  <div className="dash-track-top">
                    <span className="mentor-track">{t.track}</span>
                    <span className="dash-track-lock">
                      {unlocked ? (
                        <UnlockIcon width={16} height={16} />
                      ) : (
                        <LockIcon width={16} height={16} />
                      )}
                    </span>
                  </div>
                  <h3 className="mentor-title">{t.title}</h3>
                  <p className="mentor-desc">{t.desc}</p>
                  <div className="dash-track-price">
                    {t.price ?? t.levels?.[0]?.price ?? ''}
                  </div>
                  {unlocked ? (
                    <a
                      className="btn btn-primary"
                      href={t.id === 'community' ? '#/dashboard' : '#/'}
                    >
                      <UnlockIcon width={15} height={15} />
                      {t.id === 'community' ? 'Open Community' : 'Start Learning'}
                    </a>
                  ) : (
                    <a className="btn btn-outline" href={`#/checkout/${t.id}`}>
                      <LockIcon width={15} height={15} />
                      Upgrade
                      <ArrowRightIcon width={15} height={15} />
                    </a>
                  )}
                </article>
              )
            })}
          </div>
        </section>
      </main>
    </div>
  )
}
