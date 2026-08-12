import { GET_STARTED_LINK } from '../config'

export default function CtaBand() {
  return (
    <section className="cta-band" id="get-started">
      <div className="container">
        <div className="card cta-card">
          <h2 className="cta-title">
            Your next trade could be your best one yet.
          </h2>
          <p className="cta-copy">
            Join EnexTrade Global Markets today — create your free account,
            pick a track, and start trading, copying, or learning in minutes.
          </p>
          <div className="cta-actions">
            <a className="btn btn-primary" href={GET_STARTED_LINK}>
              Get Started Free
            </a>
            <a className="btn btn-ghost" href="#how-it-works">
              See How It Works
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
