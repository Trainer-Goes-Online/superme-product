import type { ReactNode } from 'react';

const ic = (d: ReactNode) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    {d}
  </svg>
);

const VALUE = [
  {
    icon: ic(
      <>
        <rect x="3" y="6" width="13" height="12" rx="2.5" />
        <path d="M16 10.5l5-3v9l-5-3" />
      </>,
    ),
    b: 'A 1:1 session',
    s: 'Private, online, with your matched expert.',
  },
  {
    icon: ic(
      <>
        <circle cx="12" cy="12" r="8.5" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
      </>,
    ),
    b: 'Chosen for your answers',
    s: 'We match you to the right expert, not a directory to browse.',
  },
  {
    icon: ic(
      <>
        <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" />
        <path d="M9 12l2 2 4-4" />
      </>,
    ),
    b: 'Properly vetted',
    s: 'We accept fewer than 1 in 3 experts who apply.',
  },
  {
    icon: ic(
      <>
        <path d="M12 3l9 5-9 5-9-5 9-5z" />
        <path d="M3 13l9 5 9-5" />
      </>,
    ),
    b: 'No subscription',
    s: 'Continue only if you want to. Pay per session.',
  },
];

export function Offer() {
  return (
    <section className="section" id="offer">
      <div className="container">
        <div className="offer-wrap">
          <div className="offer-copy">
            <span className="overline light">WHY THE FIRST SESSION IS ON US</span>
            <h2>We’re new to you. So we’ll let the first session do the talking.</h2>
            <p>Meet your matched expert, experience a real 1:1 session, and decide for yourself.</p>

            <div className="offer-price">
              <p className="offer-anchor">A regular 60-minute session on SuperMe costs CHF 65 to 150, depending on the expert.</p>
              <p className="offer-first">
                <span>Your first one:</span> <b className="offer-glyph">$1</b>
              </p>
              <div className="offer-why">
                <span className="offer-info" aria-hidden>
                  i
                </span>
                <p>The $1 reserves your expert’s time. If you attend, you get it back.</p>
              </div>
            </div>

            <a className="btn white lg" href="#quiz">
              Find my expert <span className="arrow">→</span>
            </a>
            <p className="micro on-dark">2 minutes · 5 questions · No card needed to get matched</p>
          </div>

          <ul className="offer-list">
            {VALUE.map((v) => (
              <li key={v.b}>
                <span className="offer-ic">{v.icon}</span>
                <b>{v.b}</b>
                <small>{v.s}</small>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
