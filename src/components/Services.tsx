import { ArrowRightIcon, CopyIcon, MentorIcon, SignalIcon } from './icons'

interface Service {
  id?: string
  icon: JSX.Element
  title: string
  desc: string
  cta: { href: string; label: string }
  meta: string[]
}

const SERVICES: Service[] = [
  {
    icon: <CopyIcon />,
    title: 'Copy Trading',
    desc: 'Share your link, and our team manually connects your account to a proven managed strategy. You watch your portfolio grow while the pros handle execution.',
    cta: { href: '#get-started', label: 'Start Copying' },
    meta: ['Manual account link', 'Managed strategies'],
  },
  {
    icon: <MentorIcon />,
    title: 'Mentorship',
    desc: 'Structured, one-on-one and group education that takes you from zero to independent trader — with practical lessons, live charting, and weekly reviews.',
    cta: { href: '#mentorship', label: 'See Tracks' },
    meta: ['Beginner → Advanced', 'Live sessions'],
  },
  {
    icon: <SignalIcon />,
    id: 'signals',
    title: 'Signal Room',
    desc: 'Premium, curated trade signals delivered straight to a private Telegram channel after payment. Clear entry, stop-loss, and take-profit on every call.',
    cta: { href: '#signals', label: 'Join Signal Room' },
    meta: ['Private Telegram', 'Entry · SL · TP'],
  },
]

export default function Services() {
  return (
    <section id="services">
      <div className="container">
        <div className="section-head center">
          <p className="eyebrow">Our Services</p>
          <h2 className="section-title">Three ways to trade, one platform</h2>
          <p className="section-sub">
            Whether you want to copy, learn, or follow signals — there is a
            track built around how you prefer to trade.
          </p>
        </div>

        <div className="services-grid">
          {SERVICES.map((s) => (
            <article className="card service-card" key={s.title} id={s.id}>
              <div className="service-icon" aria-hidden="true">
                {s.icon}
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <div className="service-meta">
                {s.meta.map((m) => (
                  <span className="pill" key={m}>
                    {m}
                  </span>
                ))}
              </div>
              <a
                className="btn btn-outline"
                style={{ marginTop: 18 }}
                href={s.cta.href}
              >
                {s.cta.label}
                <ArrowRightIcon width={16} height={16} />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
