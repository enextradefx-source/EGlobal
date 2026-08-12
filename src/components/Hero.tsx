import { GET_STARTED_LINK, HERO_IMAGE } from '../config'

const STATS = [
  { value: '18+', label: 'Major pairs & CFDs' },
  { value: '1.2k+', label: 'Active members' },
  { value: '24/7', label: 'Markets & support' },
]

export default function Hero() {
  return (
    <section
      className="hero"
      id="top"
      style={{ backgroundImage: `url(${HERO_IMAGE})` }}
    >
      <div className="container hero-inner">
        <p className="eyebrow">Trade · Learn · Copy</p>
        <h1 className="hero-title">
          Master the markets, <span className="accent">copy</span> proven
          traders, and trade with confidence.
        </h1>
        <p className="hero-sub">
          EnexTrade Global Markets pairs education, premium signals, and
          managed copy-trading strategies — so you can grow as a trader at
          every level, from first candle to full-time.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href={GET_STARTED_LINK}>
            Get Started
          </a>
          <a className="btn btn-outline" href="#services">
            Explore Services
          </a>
        </div>
        <div className="hero-stats">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
