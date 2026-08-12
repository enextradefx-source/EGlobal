import { useState } from 'react'
import { CONTACT_EMAIL, SOCIAL_LINKS, TELEGRAM_LINK } from '../config'
import {
  CheckIcon,
  SendIcon,
  TelegramIcon,
  UploadIcon,
} from './icons'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in your name, email, and message.')
      return
    }
    setError('')
    setSent(true)
  }

  const mailtoHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    subject.trim() || 'Message from the website',
  )}&body=${encodeURIComponent(
    `${message.trim()}\n\n— ${name.trim()} (${email.trim()})`,
  )}`

  return (
    <section id="contact">
      <div className="container">
        <div className="section-head center">
          <p className="eyebrow">Contact</p>
          <h2 className="section-title">Get in touch</h2>
          <p className="section-sub">
            Questions about a track, a payment, or your account? We usually
            reply within one business day.
          </p>
        </div>

        <div className="contact-grid">
          <div className="card contact-card">
            {sent ? (
              <div className="contact-success">
                <span className="contact-success-icon">
                  <CheckIcon width={28} height={28} />
                </span>
                <h3>Message ready, {name.split(' ')[0]}</h3>
                <p>
                  Your message is filled in — now send it through your email
                  app, or reach us instantly on Telegram.
                </p>
                <div className="cta-actions">
                  <a className="btn btn-primary" href={mailtoHref}>
                    <SendIcon width={16} height={16} />
                    Open in email app
                  </a>
                  {TELEGRAM_LINK && (
                    <a
                      className="btn btn-outline"
                      href={TELEGRAM_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <TelegramIcon width={16} height={16} />
                      Message us on Telegram
                    </a>
                  )}
                </div>
                <button
                  className="btn btn-ghost contact-reset"
                  type="button"
                  onClick={() => {
                    setSent(false)
                    setMessage('')
                    setSubject('')
                  }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="login-form" onSubmit={submit} noValidate>
                <label className="login-field">
                  <span>Your name</span>
                  <input
                    type="text"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>
                <label className="login-field">
                  <span>Your email</span>
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                <label className="login-field">
                  <span>Subject</span>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Question about the 3-Month track"
                  />
                </label>
                <label className="login-field">
                  <span>Message</span>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </label>
                {error && <p className="login-error">{error}</p>}
                <button className="btn btn-primary login-submit" type="submit">
                  <UploadIcon width={16} height={16} />
                  Send message
                </button>
              </form>
            )}
          </div>

          <aside className="contact-side">
            <div className="card contact-info">
              <h3>Other ways to reach us</h3>
              <ul>
                <li>
                  <a href={mailtoHref}>
                    <span className="contact-info-label">Email</span>
                    {CONTACT_EMAIL}
                  </a>
                </li>
                {TELEGRAM_LINK && (
                  <li>
                    <a
                      href={TELEGRAM_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="contact-info-label">Telegram</span>
                      {TELEGRAM_LINK}
                    </a>
                  </li>
                )}
                {SOCIAL_LINKS.filter((s) => s.href).map((s) => (
                  <li key={s.key}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="contact-info-label">{s.label}</span>
                      {s.href}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
