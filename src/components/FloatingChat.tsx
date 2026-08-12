import { useEffect, useRef, useState } from 'react'
import { ChatIcon, CloseIcon, SendIcon } from './icons'

interface Message {
  from: 'bot' | 'user'
  text: string
}

const QUICK_REPLIES = [
  'Mentorship prices',
  'Signal room',
  'Copy trading',
  'Free course',
]

const BOT_REPLY =
  'Thanks for reaching out! For details, contact us on Telegram or check the FAQs on the homepage.'

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
    window.setTimeout(() => pushBot(BOT_REPLY), 450)
  }

  const handleQuick = (reply: string) => {
    setMessages((prev) => [...prev, { from: 'user', text: reply }])
    window.setTimeout(() => pushBot(BOT_REPLY), 450)
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
