import { useState, type FormEvent } from 'react'
import { useTheme } from '../theme/ThemeContext'
import { useAuth } from '../auth/AuthContext'
import { usePaystack } from '../lib/usePaystack'
import { findTrack, type MentorshipLevel } from '../mentorshipData'
import {
  ArrowRightIcon,
  CheckIcon,
  MoonIcon,
  SunIcon,
  UnlockIcon,
} from './icons'

type Step = 'plan' | 'details' | 'payment' | 'done'

const STEPS: { id: Step; label: string }[] = [
  { id: 'plan', label: 'Plan' },
  { id: 'details', label: 'Details' },
  { id: 'payment', label: 'Payment' },
  { id: 'done', label: 'Done' },
]

function CheckoutLogo() {
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

function CheckoutThemeToggle() {
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

function formatAmount(n: number): string {
  return '₦' + n.toLocaleString('en-NG')
}

export default function Checkout({ trackId }: { trackId: string }) {
  const { user, signup, unlock } = useAuth()
  const { pay: payWithPaystack, loading: paystackLoading, hasKey } =
    usePaystack()
  const track = findTrack(trackId)

  const [step, setStep] = useState<Step>(track?.levels ? 'plan' : 'details')
  const [level, setLevel] = useState<MentorshipLevel | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [card, setCard] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [error, setError] = useState('')
  const [processing, setProcessing] = useState(false)

  if (!track) {
    return (
      <div className="login-page checkout-page">
        <div className="card login-card">
          <h1 className="login-title">Plan not found</h1>
          <p className="login-sub">
            That mentorship track does not exist.
          </p>
          <a className="btn btn-primary" href="#mentorship">
            Back to Mentorship
          </a>
        </div>
      </div>
    )
  }

  const payableLevels = track.levels?.filter((l) => l.price !== '₦0') ?? []
  const isFree = Boolean(track.levels?.length) && payableLevels.length === 0
  const selectedPrice = level?.price ?? track.price
  const selectedAmount = level
    ? level.price === '₦10,000'
      ? 10000
      : 0
    : (track.amount ?? 0)

  const goDetails = () => {
    if (track.levels && !level) {
      setError('Please choose a plan to continue.')
      return
    }
    setError('')
    setStep('details')
  }

  const goPayment = () => {
    if (!name.trim() || !email.trim()) {
      setError('Please fill in your name and email.')
      return
    }
    setError('')
    setStep('payment')
  }

  const completePayment = () => {
    if (!user) {
      signup({
        name: name || 'Trader',
        email: email || 'trader@enex.com',
        phone: phone || '',
        password: 'enex-default',
      })
    }
    unlock(track.id)
    setStep('done')
  }

  const handlePaystack = () => {
    if (!hasKey) {
      setError(
        'Paystack is not configured. Add your public key (VITE_PAYSTACK_PUBLIC_KEY) to .env',
      )
      return
    }
    setError('')
    payWithPaystack({
      email: email || 'trader@enex.com',
      amountKobo: selectedAmount * 100,
      onSuccess: completePayment,
    })
  }

  const handlePayment = (e: FormEvent) => {
    e.preventDefault()
    if (isFree) {
      setStep('done')
      return
    }
    if (!card.trim() || !expiry.trim() || !cvv.trim()) {
      setError('Please fill in your card details.')
      return
    }
    setError('')
    setProcessing(true)
    window.setTimeout(() => {
      setProcessing(false)
      completePayment()
    }, 1400)
  }

  const stepIndex = STEPS.findIndex((s) => s.id === step)

  return (
    <div className="login-page checkout-page">
      <header className="login-header">
        <CheckoutLogo />
        <CheckoutThemeToggle />
      </header>

      <main className="login-main checkout-main">
        <div className="checkout-steps">
          {STEPS.map((s, i) => {
            const active = i === stepIndex
            const complete = i < stepIndex
            return (
              <div
                className={`checkout-step${active ? ' is-active' : ''}${complete ? ' is-complete' : ''}`}
                key={s.id}
              >
                <span className="checkout-step-dot">
                  {complete ? (
                    <CheckIcon width={12} height={12} />
                  ) : (
                    i + 1
                  )}
                </span>
                <span className="checkout-step-label">{s.label}</span>
              </div>
            )
          })}
        </div>

        <div className="checkout-layout">
          <div className="card checkout-card">
            {step === 'plan' && (
              <>
                <p className="eyebrow">Choose your plan</p>
                <h2 className="login-title">{track.title}</h2>
                <p className="login-sub">{track.desc}</p>

                <div className="checkout-plans">
                  {track.levels!.map((l) => (
                    <button
                      type="button"
                      key={l.name}
                      className={`checkout-plan${level?.name === l.name ? ' is-selected' : ''}`}
                      onClick={() => setLevel(l)}
                    >
                      <span className="checkout-plan-name">{l.name}</span>
                      <span className="checkout-plan-price">{l.price}</span>
                    </button>
                  ))}
                </div>

                {error && <p className="login-error">{error}</p>}

                <button className="btn btn-primary checkout-next" onClick={goDetails}>
                  Continue
                  <ArrowRightIcon width={16} height={16} />
                </button>
              </>
            )}

            {step === 'details' && (
              <>
                <p className="eyebrow">Your details</p>
                <h2 className="login-title">Where do we reach you?</h2>
                <p className="login-sub">
                  We will confirm your application and send payment instructions.
                </p>

                <form className="login-form" onSubmit={goPayment}>
                  <label className="login-field">
                    <span>Full name</span>
                    <input
                      type="text"
                      name="name"
                      autoComplete="name"
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </label>

                  <label className="login-field">
                    <span>Email</span>
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </label>

                  <label className="login-field">
                    <span>Phone (WhatsApp)</span>
                    <input
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      placeholder="+234 800 000 0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </label>

                  {error && <p className="login-error">{error}</p>}

                  <button className="btn btn-primary checkout-next" type="submit">
                    Continue to Payment
                    <ArrowRightIcon width={16} height={16} />
                  </button>
                </form>
              </>
            )}

            {step === 'payment' && (
              <>
                <p className="eyebrow">Payment</p>
                <h2 className="login-title">Pay securely</h2>
                <p className="login-sub">
                  {selectedAmount > 0
                    ? `You are paying ${formatAmount(selectedAmount)} for the ${level?.name ?? track.title} plan.`
                    : `The ${level?.name ?? track.title} plan is free — confirm to continue.`}
                </p>

                {selectedAmount > 0 && (
                  <>
                    <button
                      className="btn btn-primary checkout-next checkout-paystack"
                      type="button"
                      onClick={handlePaystack}
                      disabled={paystackLoading}
                    >
                      {paystackLoading ? 'Opening Paystack…' : 'Pay with Paystack'}
                      <ArrowRightIcon width={16} height={16} />
                    </button>

                    <div className="checkout-divider">
                      <span>or pay by card below</span>
                    </div>

                    <form className="login-form" onSubmit={handlePayment}>
                      <label className="login-field">
                        <span>Card number</span>
                        <input
                          type="text"
                          name="card"
                          inputMode="numeric"
                          placeholder="1234 5678 9012 3456"
                          value={card}
                          onChange={(e) => setCard(e.target.value)}
                        />
                      </label>

                      <div className="checkout-row">
                        <label className="login-field">
                          <span>Expiry</span>
                          <input
                            type="text"
                            name="expiry"
                            placeholder="MM / YY"
                            value={expiry}
                            onChange={(e) => setExpiry(e.target.value)}
                          />
                        </label>
                        <label className="login-field">
                          <span>CVV</span>
                          <input
                            type="text"
                            name="cvv"
                            inputMode="numeric"
                            placeholder="123"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                          />
                        </label>
                      </div>

                      {error && <p className="login-error">{error}</p>}

                      <button
                        className="btn btn-outline checkout-next"
                        type="submit"
                        disabled={processing}
                      >
                        {processing
                          ? 'Processing…'
                          : `Pay ${formatAmount(selectedAmount)}`}
                        <ArrowRightIcon width={16} height={16} />
                      </button>

                      <p className="checkout-note">
                        Card form is a demo. Paystack popup is the real payment
                        path.
                      </p>
                    </form>
                  </>
                )}

                {selectedAmount === 0 && (
                  <>
                    <button
                      className="btn btn-primary checkout-next"
                      onClick={handlePayment}
                    >
                      Confirm Free Plan
                    </button>
                    <p className="checkout-note">
                      No payment required for this plan.
                    </p>
                  </>
                )}
              </>
            )}

            {step === 'done' && (
              <div className="login-success">
                <strong>
                  {selectedAmount > 0 ? (
                    <>
                      <UnlockIcon width={18} height={18} />
                      Track unlocked
                    </>
                  ) : (
                    'Application received'
                  )}
                </strong>
                <p>
                  Thanks {name || 'trader'}! Your{' '}
                  <strong>{level?.name ?? track.title}</strong> plan
                  {selectedAmount > 0
                    ? ` (${formatAmount(selectedAmount)})`
                    : ' (Free)'}{' '}
                  {selectedAmount > 0
                    ? 'has been unlocked on your dashboard.'
                    : 'has been recorded. We will contact you on WhatsApp shortly.'}
                </p>
                <a className="btn btn-primary" href="#/dashboard">
                  Go to Dashboard
                  <ArrowRightIcon width={16} height={16} />
                </a>
                <a className="btn btn-ghost" href="#/">
                  Back to Home
                </a>
              </div>
            )}
          </div>

          <aside className="card checkout-summary">
            <p className="eyebrow">Order summary</p>
            <div className="summary-row">
              <span>{track.title}</span>
              <span>{track.price ?? 'From ' + (track.levels?.[0]?.price ?? '')}</span>
            </div>
            {level && (
              <div className="summary-row">
                <span>Plan</span>
                <span>{level.name}</span>
              </div>
            )}
            <div className="summary-row summary-total">
              <span>Total</span>
              <span>
                {selectedAmount > 0
                  ? formatAmount(selectedAmount)
                  : selectedPrice ?? 'Free'}
              </span>
            </div>
            <p className="summary-note">
              Secure checkout via Paystack. You will receive a receipt by email.
            </p>
          </aside>
        </div>
      </main>
    </div>
  )
}
