import { useEffect, useRef, useState } from 'react'
import { SOCIAL_LINKS } from '../config'
import { ChatIcon, CloseIcon, SendIcon, TelegramIcon } from './icons'

interface Message {
  from: 'bot' | 'user'
  text: string
}

const TELEGRAM = SOCIAL_LINKS.find((s) => s.key === 'telegram')?.href

const QUICK_REPLIES = [
  'Mentorship prices',
  'Signal room',
  'Copy trading',
  'Free course',
]

const BOT_REPLY =
  'For details, contact us on Telegram or check the FAQs on the homepage.'

const KEYWORD_REPLIES: { match: RegExp; reply: string }[] = [
  {
    match: /price|cost|fee|pay|nair|mentorship/i,
    reply:
      'Mentorship pricing:\n\n• One-on-One — ₦500,000\n• 3-Month — ₦200,000\n• Community Standard — ₦10,000 (Free tier available)\n• 6-Month — ₦500,000\n\nUpgrade from the Mentorship section or your Dashboard.',
  },
  {
    match: /signal/i,
    reply:
      'The Signal Room shares trade setups with clear entries, stops, and targets. It is included with your mentorship track — unlock it from your Dashboard.',
  },
  {
    match: /copy|trade/i,
    reply:
      'We teach price action and risk management. You can copy the trades you learn in the Signal Room with your own broker. We do not execute trades on your behalf.',
  },
  {
    match: /course|free|learn/i,
    reply:
      'The Free Community track is unlocked as soon as you create an account — head to your Dashboard to get started.',
  },
  {
    match: /tutor|coach|1-1|one-on-one/i,
    reply:
      'One-on-One mentorship is ₦500,000 and gives you dedicated private sessions tailored to your pace and goals.',
  },
]

function botAnswer(text: string): string {
  for (const rule of KEYWORD_REPLIES) {
    if (rule.match.test(text)) return rule.reply
  }
  return BOT_REPLY
}

export default function FloatingChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      from: 'bot',
      text: 'Hi! How can we help you today?',
    },
  ])
  const [input, setInput] = useState('')
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) bodyRef.current?.scrollTo(0, bodyRef.current.scrollHeight)
  }, [messages, open])

  const pushBot = (text: string) =>
    setMessages((prev) => [...prev, { from: 'bot', text }])

  const send = (text: string) => {
    const value = text.trim()
    if (!value) return
    setMessages((prev) => [...prev, { from: 'user', text: value }])
    setInput('')
    window.setTimeout(() => pushBot(botAnswer(value)), 450)
  }

  const handleQuick = (reply: string) => {
    setMessages((prev) => [...prev, { from: 'user', text: reply }])
    window.setTimeout(() => pushBot(botAnswer(reply)), 450)
  }

  return (
    <div className="floating-chat">
      {open && (
        <div className="chat-panel" role="dialog" aria-label="Chat support">
          <div className="chat-header">
            <div className="chat-header-title">
              <span className="chat-dot" aria-hidden="true" />
              EnexTrade Support
            </div>
            {TELEGRAM && (
              <a
                className="chat-telegram"
                href={TELEGRAM}
                target="_blank"
                rel="noopener noreferrer"
                title="Chat with us on Telegram"
                aria-label="Chat with us on Telegram"
              >
                <TelegramIcon width={18} height={18} />
              </a>
            )}
            <button
              className="chat-close"
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              <CloseIcon width={16} height={16} />
            </button>
          </div>

          <div className="chat-body" ref={bodyRef}>
            {messages.map((m, i) => (
              <div className={`chat-msg chat-msg--${m.from}`} key={i}>
                {m.text}
              </div>
            ))}
          </div>

          <div className="chat-quick">
            {QUICK_REPLIES.map((r) => (
              <button key={r} type="button" onClick={() => handleQuick(r)}>
                {r}
              </button>
            ))}
          </div>

          {TELEGRAM && (
            <a
              className="chat-human"
              href={TELEGRAM}
              target="_blank"
              rel="noopener noreferrer"
            >
              Prefer a human? Chat with us on Telegram →
            </a>
          )}

          <form
            className="chat-input"
            onSubmit={(e) => {
              e.preventDefault()
              send(input)
            }}
          >
            <input
              type="text"
              placeholder="Type a message…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              aria-label="Chat message"
            />
            <button type="submit" aria-label="Send message">
              <SendIcon width={16} height={16} />
            </button>
          </form>
        </div>
      )}

      <button
        className={`chat-fab${open ? ' chat-fab--open' : ''}`}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chat' : 'Open chat'}
        aria-expanded={open}
      >
        {open ? (
          <CloseIcon width={22} height={22} />
        ) : (
          <ChatIcon width={22} height={22} />
        )}
      </button>
    </div>
  )
}
