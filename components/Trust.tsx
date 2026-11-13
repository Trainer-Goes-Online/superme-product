import type { ReactNode } from 'react';

const svg = (d: ReactNode) => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    {d}
  </svg>
);

/* ⚠️ From Atul's design "Trusted by Thousands_ Find Your Expert.png". Source for
   each number is unconfirmed (see PENDING.md); verify before launch. */
const STATS: { icon: ReactNode; big?: string; small?: string; text?: string }[] = [
  {
    icon: svg(
      <>
        <circle cx="12" cy="8" r="3.2" />
        <path d="M5.5 19.5c.6-3.3 3.3-5.5 6.5-5.5s5.9 2.2 6.5 5.5" />
        <circle cx="5.5" cy="9.5" r="2.2" />
        <circle cx="18.5" cy="9.5" r="2.2" />
        <path d="M2 17.5c.3-1.9 1.7-3.2 3.5-3.4M22 17.5c-.3-1.9-1.7-3.2-3.5-3.4" />
      </>,
    ),
    big: '12,000+',
    small: 'matched sessions',
  },
  {
    icon: svg(<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8L3.5 9.7l5.9-.9L12 3.5z" />),
    big: '4.9/5',
    small: 'average rating',
  },
  {
    icon: svg(
      <>
        <path d="M20 12a8 8 0 1 1-2.3-5.6" />
        <path d="M20 4v4.5h-4.5" />
      </>,
    ),
    big: '88%',
    small: 'would book again',
  },
  {
    icon: svg(<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20z" />),
    text: 'Career, burnout, relationships, confidence and more',
  },
];

export function Trust() {
  return (
    <section className="section trust-sec" id="trust">
      <div className="container">
        <div className="trust">
          <div className="section-heading">
            <span className="overline">TRUSTED BY PEOPLE TAKING THE FIRST STEP</span>
            <h2>
              Take the step <em>thousands have already taken.</em>
            </h2>
            <p>People come to SuperMe when they want clarity, support, and the right expert for what they’re going through.</p>
          </div>

          <ul className="trust-stats">
            {STATS.map((s, i) => (
              <li key={i}>
                <span className="trust-ic">{s.icon}</span>
                {s.big ? (
                  <span className="trust-num">
                    <b>{s.big}</b>
                    <small>{s.small}</small>
                  </span>
                ) : (
                  <span className="trust-txt">{s.text}</span>
                )}
              </li>
            ))}
          </ul>

          <div className="trust-proof">
            <div className="trust-people">
              <span className="trust-faces" aria-hidden>
                {[1, 2, 3].map((n) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={n} src={`/trust/face-${n}.webp`} alt="" width={128} height={128} loading="lazy" decoding="async" />
                ))}
              </span>
              <p>Thousands have already booked their first session.</p>
            </div>
          </div>

          <div className="trust-cta">
            <a className="btn lg" href="#quiz">
              Find my expert <span className="arrow">→</span>
            </a>
            <p className="micro">2 minutes · 5 questions · No card needed to get matched</p>
          </div>
        </div>
      </div>
    </section>
  );
}
