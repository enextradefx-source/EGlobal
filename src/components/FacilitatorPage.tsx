import { useAuth } from '../auth/AuthContext'
import { useTheme } from '../theme/ThemeContext'
import { findFacilitator } from '../facilitators'
import { SIGNUP_LINK } from '../config'
import { SOCIAL_ICONS } from '../socialIcons'
import { ArrowRightIcon, CheckIcon, MoonIcon, SunIcon } from './icons'

function FacLogo() {
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

function FacThemeToggle() {
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

export default function FacilitatorPage({ facId }: { facId: string }) {
  const { user } = useAuth()
  const fac = findFacilitator(facId)

  if (!fac) {
    return (
      <div className="login-page">
        <div className="card login-card" style={{ margin: '10vh auto 0' }}>
          <h1 className="login-title">Facilitator not found</h1>
          <p className="login-sub">That facilitator page does not exist.</p>
          <a className="btn btn-primary" href="#team">
            Back to Team
          </a>
        </div>
      </div>
    )
  }

  const href = user ? '#/dashboard' : SIGNUP_LINK
  const cta = user ? 'Go to Dashboard' : 'Start with a Free Account'

  return (
    <div className="login-page fac-page">
      <header className="login-header">
        <FacLogo />
        <FacThemeToggle />
      </header>

      <main className="container fac-main">
        <section className="card fac-hero">
          <div className="fac-avatar" aria-hidden="true">
            {fac.initials}
          </div>
          <div className="fac-hero-info">
            <p className="eyebrow">Facilitator</p>
            <h1 className="fac-name">{fac.name}</h1>
            <p className="fac-role">{fac.role}</p>
            <p className="fac-bio">{fac.bio}</p>
            <div className="fac-socials">
              {Object.entries(fac.socials).map(([key, link]) => {
                const icon = SOCIAL_ICONS[key as keyof typeof SOCIAL_ICONS]
                if (!icon) return null
                const disabled = link === '#'
                return (
                  <a
                    key={key}
                    className={`social-btn${disabled ? ' social-btn--placeholder' : ''}`}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${fac.name} on ${key}`}
                    title={key}
                    onClick={disabled ? (e) => e.preventDefault() : undefined}
                  >
                    {icon}
                  </a>
                )
              })}
            </div>
          </div>
          <a className="btn btn-primary fac-cta" href={href}>
            {cta}
            <ArrowRightIcon width={16} height={16} />
          </a>
        </section>

        <section className="fac-sections">
          {fac.sections.map((s, i) => (
            <article className="card fac-section" key={s.title}>
              <span className="fac-section-num">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h2 className="fac-section-title">{s.title}</h2>
              <p className="fac-section-body">{s.body}</p>
              {s.points && (
                <ul className="fac-section-points">
                  {s.points.map((p) => (
                    <li key={p}>
                      <CheckIcon width={15} height={15} />
                      {p}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </section>

        <div className="fac-footer-cta">
          <a className="btn btn-primary" href={href}>
            {cta}
            <ArrowRightIcon width={16} height={16} />
          </a>
          <a className="btn btn-ghost" href="#mentorship">
            View Mentorship Tracks
          </a>
        </div>
      </main>
    </div>
  )
}
