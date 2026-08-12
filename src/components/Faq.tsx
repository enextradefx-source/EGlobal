import { useState } from 'react'
import { ChevronDownIcon } from './icons'

const FAQS = [
  {
    q: 'Do I need trading experience to join?',
    a: 'No. Our mentorship tracks include a dedicated Beginner level, and the free course is built for complete newcomers. You will learn the foundations before you ever risk real money.',
  },
  {
    q: 'How does Copy Trading work?',
    a: 'After you fill in the copy-trading form, our team manually links your account to a managed strategy. You keep control of your funds and can review performance from your dashboard.',
  },
  {
    q: 'How do I get access to the Signal Room?',
    a: 'Pay for the Signal Room via Paystack, and within the same day you will be added to our private Telegram channel with full entry, stop-loss, and take-profit levels for every signal.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We process all payments securely through Paystack, which supports cards, bank transfers, and other local payment options.',
  },
  {
    q: 'Is trading risk-free?',
    a: 'No. Forex and CFDs carry significant risk and you can lose money, including more than your initial deposit. Always trade with capital you can afford to lose. We provide education and signals — not financial advice.',
  },
  {
    q: 'Can I get a refund?',
    a: 'Contact us before or within 24 hours of purchase if you have a problem with your payment, and our team will review your case. Course and signal-room access are provided as digital services.',
  },
]

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-head center">
          <p className="eyebrow">FAQ</p>
          <h2 className="section-title">Frequently asked questions</h2>
          <p className="section-sub">
            Everything you need to know before you start trading with EnexTrade.
          </p>
        </div>

        <div className="faq-list">
          {FAQS.map((item, i) => {
            const isOpen = open === i
            return (
              <div
                className={`card faq-item${isOpen ? ' faq-item--open' : ''}`}
                key={item.q}
              >
                <button
                  className="faq-question"
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  <ChevronDownIcon width={20} height={20} />
                </button>
                <div className="faq-answer">
                  <p>{item.a}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
