'use client';

import type { ReactNode } from 'react';
import { FOCUS_EVENT, type FocusKey } from '@/lib/quiz';
import { Arch, Heart, Mountain, Stones } from './BentoArt';

const svg = (d: ReactNode) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    {d}
  </svg>
);

const ICONS = {
  career: svg(
    <>
      <rect x="3" y="7" width="18" height="13" rx="2.5" />
      <path d="M8.5 7V5.5A1.5 1.5 0 0 1 10 4h4a1.5 1.5 0 0 1 1.5 1.5V7M3 12.5h18" />
    </>,
  ),
  stress: svg(
    <>
      <path d="M12 20c-3.5-1.6-5.5-4.6-5.5-8.5 2.6.3 4.5 1.6 5.5 3.6 1-2 2.9-3.3 5.5-3.6 0 3.9-2 6.9-5.5 8.5z" />
      <path d="M12 15.1c-.9-2.6-.8-5.4.3-8.6 1.3 2.4 1.6 5 .9 8" />
      <path d="M6.5 11.5C4.6 11.6 3.3 12.6 2.5 14c1.5 2.5 4.6 4.6 9.5 6M17.5 11.5c1.9.1 3.2 1.1 4 2.5-1.5 2.5-4.6 4.6-9.5 6" />
    </>,
  ),
  relationships: svg(<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20z" />),
  confidence: svg(<path d="M13 3L5 13.5h6L10 21l8-10.5h-6L13 3z" />),
  more: svg(
    <>
      <rect x="4" y="4" width="6.5" height="6.5" rx="1.8" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.8" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.8" />
      <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.8" />
    </>,
  ),
};

type Card = {
  key: keyof typeof ICONS;
  tag: string;
  quote: string;
  match: string;
  focus?: FocusKey;
  art?: ReactNode;
  faces?: string[];
};

const CARDS: Card[] = [
  {
    key: 'career',
    tag: 'CAREER & DIRECTION',
    quote: 'I know I want something different. I just don’t know what.',
    match: 'Life or career coach',
    focus: 'career',
    art: <Mountain />,
    faces: ['ayelet-magen', 'elie-ghattas', 'amy-weihmuller'],
  },
  {
    key: 'stress',
    tag: 'STRESS & BURNOUT',
    quote: 'I’m running on empty.',
    match: 'Therapist or wellness coach',
    focus: 'stress',
    art: <Stones />,
  },
  {
    key: 'relationships',
    tag: 'RELATIONSHIPS',
    quote: 'I want to feel understood.',
    match: 'Relationship expert',
    focus: 'relationships',
    art: <Heart />,
  },
  {
    key: 'confidence',
    tag: 'CONFIDENCE & MINDSET',
    quote: 'I keep second-guessing myself.',
    match: 'Mindset or confidence coach',
    art: <Arch />,
  },
];

const MORE: { label: string; focus: FocusKey }[] = [
  { label: 'Anxiety & low mood', focus: 'anxiety' },
  { label: 'Parenting', focus: 'parenting' },
  { label: 'Leadership & work pressure', focus: 'leadership' },
  { label: 'Focus & how your brain works', focus: 'focus' },
  { label: 'Back, neck & posture', focus: 'body' },
  { label: 'Sleep & switching off', focus: 'sleep' },
];

function pick(focus?: FocusKey) {
  if (focus) window.dispatchEvent(new CustomEvent<FocusKey>(FOCUS_EVENT, { detail: focus }));
}

export function Problems() {
  return (
    <section className="section probs" id="problems">
      <div className="container">
        <div className="section-heading">
          <span className="overline">WHATEVER YOU’RE WORKING THROUGH</span>
          <h2>
            <span>Different problems need different experts.</span> <em>That’s the part no one does for you.</em>
          </h2>
          <p>Tell us what you’re going through. We’ll match you with the right kind of expert.</p>
        </div>

        <div className="bento">
          {CARDS.map((c) => (
            <a
              key={c.key}
              href="#quiz"
              className={`bento-card t-${c.key}`}
              onClick={() => pick(c.focus)}
              aria-label={`${c.tag}: ${c.quote} Your match: ${c.match}`}
            >
              {c.art}
              <span className="bento-tag">
                {ICONS[c.key]}
                {c.tag}
              </span>
              <p className="bento-quote">“{c.quote}”</p>
              <div className="bento-foot">
                {c.faces ? (
                  <span className="bento-faces" aria-hidden>
                    {c.faces.map((f) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img key={f} src={`/experts/${f}.webp`} alt="" width={240} height={240} />
                    ))}
                  </span>
                ) : null}
                <span className="bento-match">
                  <small>Your match</small>
                  {c.match}
                </span>
                <span className="bento-go" aria-hidden>
                  →
                </span>
              </div>
            </a>
          ))}

          <div className="bento-card t-more">
            <span className="bento-tag">
              {ICONS.more}
              AND MORE
            </span>
            <p className="bento-title">Explore all areas we support.</p>
            <ul className="bento-chips">
              {MORE.map((m) => (
                <li key={m.focus}>
                  <a href="#quiz" onClick={() => pick(m.focus)}>
                    {m.label}
                    <span aria-hidden>→</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
