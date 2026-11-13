import type { ReactNode } from 'react';

const face = (slug: string, cls: string) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img className={cls} src={`/experts/${slug}.webp`} alt="" width={480} height={480} loading="lazy" decoding="async" />
);

const Check = () => (
  <svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden>
    <path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function Checklist() {
  return (
    <div className="jn-ill jn-list" aria-hidden>
      <div className="jn-sheet">
        {[0, 1, 2].map((i) => (
          <div className={i === 2 ? 'jn-row is-faint' : 'jn-row'} key={i}>
            <span className="jn-tick">
              <Check />
            </span>
            <span className="jn-bars">
              <i />
              <i />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Matches() {
  return (
    <div className="jn-ill jn-matches" aria-hidden>
      <div className="jn-prof side l">
        {face('elie-ghattas', 'jn-prof-face')}
        <i />
      </div>
      <div className="jn-prof side r">
        {face('amy-weihmuller', 'jn-prof-face')}
        <i />
      </div>
      <div className="jn-prof main">
        {face('sara-camerata', 'jn-prof-face')}
        <span className="jn-prof-check">
          <Check />
        </span>
      </div>
    </div>
  );
}

function Calendar() {
  return (
    <div className="jn-ill jn-cal" aria-hidden>
      <div className="jn-cal-body">
        <div className="jn-cal-head">
          {[0, 1, 2, 3].map((i) => (
            <span className="jn-ring" key={i} />
          ))}
        </div>
        <div className="jn-cal-grid">
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i} className={i === 7 ? 'is-on' : ''}>
              {i === 7 ? <Check /> : null}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function VideoCall() {
  return (
    <div className="jn-ill jn-video" aria-hidden>
      <div className="jn-screen">
        {face('ayelet-magen', 'jn-video-face')}
        <div className="jn-controls">
          <span>
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <rect x="9" y="3" width="6" height="11" rx="3" />
              <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" />
            </svg>
          </span>
          <span>
            <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
              <rect x="3" y="7" width="12" height="10" rx="2" />
              <path d="M15 11l6-3.5v9L15 13z" />
            </svg>
          </span>
          <span className="end">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M3.5 13.5c4.7-4 12.3-4 17 0l-2 2.3-3-1.3v-2.2a10 10 0 0 0-7 0v2.2l-3 1.3z" />
            </svg>
          </span>
        </div>
      </div>
      <div className="jn-base" />
    </div>
  );
}

const STEPS: { ill: ReactNode; t: string; b: string }[] = [
  {
    ill: <Checklist />,
    t: 'Answer 5 questions',
    b: 'About 2 minutes. What’s going on, how long it’s been, and how you like to work. No card needed.',
  },
  {
    ill: <Matches />,
    t: 'See your 3 matches, and why',
    b: 'We show you 3 experts picked for your answers, with the reasons each one fits. You choose the one who feels right.',
  },
  {
    ill: <Calendar />,
    t: 'Book your first session for $1',
    b: 'Add your details, then reserve your expert’s time for $1. If you attend, you get it back.',
  },
  {
    ill: <VideoCall />,
    t: 'Meet your expert, 1:1 online',
    b: '45 private minutes on your situation, with someone chosen for it. You leave with a short summary and one practical next step. No subscription, ever.',
  },
];

export function Joining() {
  return (
    <section className="section jn" id="how">
      <div className="container">
        <div className="section-heading">
          <span className="overline">HOW IT WORKS</span>
          <h2>
            From “where do I even start” to <em>your first session, in 4 steps.</em>
          </h2>
        </div>

        <ol className="jn-steps">
          {STEPS.map((s, i) => (
            <li className="jn-step" key={s.t}>
              {s.ill}
              <span className="jn-no">{String(i + 1).padStart(2, '0')}</span>
              <h3>{s.t}</h3>
              <p>{s.b}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
