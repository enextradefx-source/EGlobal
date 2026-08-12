import { TRACKS } from '../mentorshipData'

export default function Mentorship() {
  return (
    <section id="mentorship" style={{ background: 'var(--surface-2)' }}>
      <div className="container">
        <div className="section-head center">
          <p className="eyebrow">Mentorship</p>
          <h2 className="section-title">Education tracks for every stage</h2>
          <p className="section-sub">
            Clear, flat pricing in Naira — pick the stage you are at and
            upgrade as you grow.
          </p>
        </div>

        <div className="mentorship-grid">
          {TRACKS.map((t) => (
            <article className="card mentor-card" key={t.id}>
              <span className="mentor-track">{t.track}</span>
              <h3 className="mentor-title">{t.title}</h3>
              <p className="mentor-desc">{t.desc}</p>
              {t.levels ? (
                <div className="mentor-levels">
                  {t.levels.map((l) => (
                    <div className="level-row" key={l.name}>
                      <span className="level-name">
                        <span className="pill pill--accent" style={{ marginRight: 8 }}>
                          {l.name}
                        </span>
                      </span>
                      <span className="level-price">{l.price}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mentor-price">{t.price}</div>
              )}
              <a
                className="btn btn-primary"
                href={`#/checkout/${t.id}`}
              >
                Apply Now
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
