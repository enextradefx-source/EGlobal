import { ArrowRightIcon, CardIcon, DashboardIcon, RocketIcon, UserIcon } from './icons'

const STEPS = [
  {
    icon: <UserIcon />,
    title: 'Create account',
    desc: 'Sign up in under a minute with just your email.',
  },
  {
    icon: <CardIcon />,
    title: 'Pay via Paystack',
    desc: 'Secure payments processed through Paystack.',
  },
  {
    icon: <DashboardIcon />,
    title: 'Get dashboard access',
    desc: 'Your dashboard, strategy, and signal links go live.',
  },
  {
    icon: <RocketIcon />,
    title: 'Trade & learn',
    desc: 'Follow signals, copy strategies, and level up.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works">
      <div className="container">
        <div className="section-head center">
          <p className="eyebrow">How It Works</p>
          <h2 className="section-title">Live in four simple steps</h2>
          <p className="section-sub">
            From signup to your first trade in minutes — no complex onboarding.
          </p>
        </div>

        <div className="steps-grid">
          {STEPS.map((s, i) => (
            <div key={s.title}>
              <div className="card step">
                <div className="step-icon" aria-hidden="true">
                  {s.icon}
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
              {i < STEPS.length - 1 && (
                <span className="step-arrow" aria-hidden="true">
                  <ArrowRightIcon />
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
