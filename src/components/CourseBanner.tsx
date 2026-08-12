import { ArrowRightIcon, CheckIcon, PlayIcon } from './icons'

const PERKS = ['Self-paced lessons', 'No experience required', 'Foundations of risk']

export default function CourseBanner() {
  return (
    <section id="free-course">
      <div className="container">
        <div className="card course-banner">
          <p className="eyebrow" style={{ justifyContent: 'center' }}>
            Free Course
          </p>
          <h2 className="course-title">
            Can't afford paid mentorship yet? Start free.
          </h2>
          <p className="course-copy">
            Our free starter course covers chart basics, trading psychology, and
            risk fundamentals — everything you need to begin safely, at no cost.
          </p>
          <div className="course-meta">
            {PERKS.map((p) => (
              <span className="pill" key={p}>
                <CheckIcon width={13} height={13} />
                {p}
              </span>
            ))}
          </div>
          <a className="btn btn-primary" href="#mentorship">
            <PlayIcon width={16} height={16} />
            Enroll for Free
            <ArrowRightIcon width={16} height={16} />
          </a>
        </div>
      </div>
    </section>
  )
}
