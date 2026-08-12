import { FACILITATORS } from '../facilitators'
import { SOCIAL_ICONS } from '../socialIcons'
import { ArrowRightIcon } from './icons'

export default function Team() {
  return (
    <section id="team" style={{ background: 'var(--surface-2)' }}>
      <div className="container">
        <div className="section-head center">
          <p className="eyebrow">Meet the Team</p>
          <h2 className="section-title">Learn from EnexTrade facilitators</h2>
          <p className="section-sub">
            Four experienced facilitators mentor, analyse, and support you at
            every stage of your trading journey.
          </p>
        </div>

        <div className="team-grid">
          {FACILITATORS.map((f) => (
            <article className="card team-card" key={f.id}>
              <div className="team-avatar" aria-hidden="true">
                {f.initials}
              </div>
              <h3 className="team-name">{f.name}</h3>
              <p className="team-role">{f.role}</p>
              <p className="team-bio">{f.bio}</p>
              <div className="team-socials">
                {Object.entries(f.socials).map(([key, href]) => {
                  const icon = SOCIAL_ICONS[key as keyof typeof SOCIAL_ICONS]
                  if (!icon) return null
                  const disabled = href === '#'
                  return (
                    <a
                      key={key}
                      className={`social-btn${disabled ? ' social-btn--placeholder' : ''}`}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${f.name} on ${key}`}
                      title={key}
                      onClick={disabled ? (e) => e.preventDefault() : undefined}
                    >
                      {icon}
                    </a>
                  )
                })}
              </div>
              <a
                className="btn btn-outline btn-sm team-view"
                href={`#/facilitator/${f.id}`}
              >
                View Profile
                <ArrowRightIcon width={14} height={14} />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
