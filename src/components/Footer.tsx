import { CONTACT_LINK, PRIVACY_LINK, SOCIAL_LINKS, TERMS_LINK } from '../config'
import { SOCIAL_ICONS } from '../socialIcons'

const LEGAL = [
  { label: 'Terms', href: TERMS_LINK },
  { label: 'Privacy', href: PRIVACY_LINK },
  { label: 'Contact', href: CONTACT_LINK },
]

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#top" className="logo" aria-label="EnexTrade home">
              <span className="logo-badge" aria-hidden="true">
                e
              </span>
              <span className="logo-name">
                EnexTrade
                <span className="logo-tag">Global Markets</span>
              </span>
            </a>
            <p className="footer-tagline">
              Learn, copy, and trade global markets — built for traders at every
              level.
            </p>
            <div className="footer-socials">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.key}
                  className="social-btn"
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                >
                  {SOCIAL_ICONS[s.key]}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <h4>Platform</h4>
            <ul>
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#mentorship">Mentorship</a>
              </li>
              <li>
                <a href="#signals">Signal Room</a>
              </li>
              <li>
                <a href="#how-it-works">How It Works</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li>
                <a href="#team">Meet the Team</a>
              </li>
              <li>
                <a href="#faq">FAQ</a>
              </li>
              {LEGAL.map((l) => (
                <li key={l.label}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-risk">
          <p>
            <strong>Risk Disclaimer:</strong> Trading foreign exchange, CFDs, and
            other leveraged products carries a high level of risk and may not be
            suitable for all investors. Past performance is not indicative of
            future results. You could lose more than your initial deposit. Never
            trade money you cannot afford to lose, and seek independent advice if
            you are unsure. EnexTrade Global Markets provides education and
            signals only — it is not a licensed broker and does not execute
            trades on your behalf.
          </p>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} EnexTrade Global Markets. All rights reserved.</p>
          <div className="footer-legal">
            {LEGAL.map((l) => (
              <a key={l.label} href={l.href}>
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
