'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { EMPTY_ANSWERS, saveAnswers, takeResume, type Answers } from '@/lib/answers';
import {
  DURATIONS,
  FOCUSES,
  FOCUS_EVENT,
  LANGUAGES,
  LONG_DURATIONS,
  LONG_DURATION_NOTE,
  NOTHING_YET,
  PRIVACY_HELPER,
  SOMETHING_ELSE,
  STYLES,
  TRIED,
  TRIED_BEFORE,
  TRIED_NOTES,
  type FocusKey,
} from '@/lib/quiz';
import { FOCUS_ICONS } from './FocusIcons';
import { Option } from './Option';

/* 'match' is the hand-off: once state has settled, the answers are saved and
   the visitor moves to /match for the loader, the matches, details and payment. */
type Step = 'q1' | 'q2' | 'q3' | 'q4' | 'q5' | 'safety-body' | 'safety-crisis' | 'halt' | 'match';

const QUESTION_NO: Partial<Record<Step, number>> = { q1: 1, q2: 2, q3: 3, q4: 4, q5: 5 };

const CRISIS = [
  {
    country: 'UK',
    lines: [
      { label: '999', tel: '999', note: 'in an emergency' },
      { label: 'Samaritans 116 123', tel: '116123', note: '(24/7, free)' },
      { label: 'NHS 111', tel: '111', note: 'option 2' },
    ],
  },
  {
    country: 'France',
    lines: [
      { label: '15', tel: '15', note: 'or' },
      { label: '112', tel: '112', note: 'in an emergency' },
      { label: '3114', tel: '3114', note: 'national suicide prevention line (24/7, free)' },
    ],
  },
  {
    country: 'Switzerland',
    lines: [
      { label: '144', tel: '144', note: 'or' },
      { label: '112', tel: '112', note: 'in an emergency' },
      { label: '143', tel: '143', note: 'La Main Tendue / Die Dargebotene Hand (24/7)' },
    ],
  },
];

export function Quiz() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('q1');
  const [history, setHistory] = useState<Step[]>([]);
  const [a, setA] = useState<Answers>(EMPTY_ANSWERS);
  const card = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  const focus = FOCUSES.find((f) => f.key === a.focus);

  /* Back from /match: reopen the last question with the answers kept. */
  useEffect(() => {
    const saved = takeResume();
    if (!saved) return;
    setA(saved.answers);
    setStep(saved.step as Step);
    setHistory(saved.history as Step[]);
  }, []);

  const handedOff = useRef(false);
  useEffect(() => {
    if (step !== 'match') {
      handedOff.current = false;
      return;
    }
    if (handedOff.current) return;
    handedOff.current = true;
    const last = history[history.length - 1] ?? 'q5';
    saveAnswers({ answers: a, step: last, history: history.slice(0, -1) });
    router.push('/match');
  }, [step, a, history, router]);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const el = card.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top;
    if (top < 0 || top > window.innerHeight * 0.4) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [step]);

  /* A problem card further down the page starts the quiz with Q1 answered. */
  useEffect(() => {
    const onFocus = (e: Event) => {
      const key = (e as CustomEvent<FocusKey>).detail;
      if (!FOCUSES.some((f) => f.key === key)) return;
      setA({ ...EMPTY_ANSWERS, focus: key });
      setHistory(['q1']);
      setStep('q2');
    };
    window.addEventListener(FOCUS_EVENT, onFocus);
    return () => window.removeEventListener(FOCUS_EVENT, onFocus);
  }, []);

  const go = (next: Step) => {
    setHistory((h) => [...h, step]);
    setStep(next);
  };
  /* Single-choice answers move on by themselves, after a beat so the tick shows. */
  const pending = useRef<number | undefined>(undefined);
  const advance = (next: Step) => {
    window.clearTimeout(pending.current);
    pending.current = window.setTimeout(() => go(next), 260);
  };
  useEffect(() => () => window.clearTimeout(pending.current), []);

  const back = () => {
    window.clearTimeout(pending.current);
    const prev = history[history.length - 1];
    if (!prev) return;
    setHistory(history.slice(0, -1));
    setStep(prev);
  };

  const afterQ5 = (): Step => {
    if (a.focus === 'body') return 'safety-body';
    if (a.focus === 'anxiety' || a.focus === 'stress') return 'safety-crisis';
    return 'match';
  };

  const toggleTried = (v: string) =>
    setA((s) => {
      if (v === NOTHING_YET) return { ...s, tried: s.tried.includes(v) ? [] : [v] };
      const rest = s.tried.filter((t) => t !== NOTHING_YET);
      return { ...s, tried: rest.includes(v) ? rest.filter((t) => t !== v) : [...rest, v] };
    });

  const triedNote = a.tried.includes(NOTHING_YET)
    ? TRIED_NOTES.nothing
    : a.tried.includes(TRIED_BEFORE)
      ? TRIED_NOTES.before
      : a.tried.length
        ? TRIED_NOTES.any
        : '';

  const no = QUESTION_NO[step];
  const showBack = history.length > 0 && step !== 'match';

  return (
    <div className="qz" id="quiz" ref={card}>
      <div className="qz-top">
        {showBack ? (
          <button type="button" className="qz-back" onClick={back}>
            ← Back
          </button>
        ) : (
          <span className="qz-frame">Let’s find your expert.</span>
        )}
        {no ? <span className="qz-count">Question {no} of 5</span> : null}
      </div>
      {no ? (
        <>
          <div className="qz-track" aria-hidden>
            <span style={{ width: `${(no / 5) * 100}%` }} />
          </div>
          <p className="qz-helper">{step === 'q1' ? '2 minutes · 5 questions · No card needed to get matched.' : PRIVACY_HELPER}</p>
        </>
      ) : null}

      <div className="qz-body" key={step}>
        {step === 'q1' && (
          <>
            <h2 className="qz-q">What’s weighing on you most right now?</h2>
            <p className="qz-sub">Pick the one that matters most today. You can tell your expert about the rest.</p>
            <div className="qz-opts two">
              {FOCUSES.map((f, i) => (
                <Option
                  key={f.key}
                  label={f.label}
                  index={i}
                  icon={FOCUS_ICONS[f.key]}
                  selected={a.focus === f.key}
                  onClick={() => {
                    setA((s) => ({ ...s, focus: f.key, moment: s.focus === f.key ? s.moment : '', momentOwn: '' }));
                    advance('q2');
                  }}
                />
              ))}
            </div>
          </>
        )}

        {step === 'q2' && focus && (
          <>
            <h2 className="qz-q">Which of these sounds most like you?</h2>
            <div className="qz-opts">
              {[...focus.moments, SOMETHING_ELSE].map((m, i) => (
                <Option
                  key={m}
                  label={m}
                  index={i}
                  selected={a.moment === m}
                  onClick={() => {
                    setA((s) => ({ ...s, moment: m }));
                    if (m !== SOMETHING_ELSE) advance('q3');
                  }}
                />
              ))}
            </div>
            {a.moment === SOMETHING_ELSE && (
              <div className="qz-own">
                <label className="qz-label" htmlFor="qz-own">
                  Tell us in your own words (optional)
                </label>
                <textarea
                  id="qz-own"
                  className="qz-field area"
                  maxLength={400}
                  value={a.momentOwn}
                  onChange={(e) => setA((s) => ({ ...s, momentOwn: e.target.value }))}
                />
                <div className="qz-actions">
                  <button type="button" className="btn" onClick={() => go('q3')}>
                    Continue <span className="arrow">→</span>
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {step === 'q3' && (
          <>
            <h2 className="qz-q">How long has this been going on?</h2>
            <div className="qz-opts">
              {DURATIONS.map((d, i) => (
                <Option
                  key={d}
                  label={d}
                  index={i}
                  selected={a.duration === d}
                  onClick={() => {
                    setA((s) => ({ ...s, duration: d }));
                    advance('q4');
                  }}
                />
              ))}
            </div>
          </>
        )}

        {step === 'q4' && (
          <>
            {LONG_DURATIONS.includes(a.duration) && <p className="qz-note lead">{LONG_DURATION_NOTE}</p>}
            <h2 className="qz-q">What have you tried so far?</h2>
            <p className="qz-sub">Pick all that apply</p>
            <div className="qz-opts">
              {TRIED.map((t, i) => (
                <Option key={t} label={t} index={i} multi selected={a.tried.includes(t)} onClick={() => toggleTried(t)} />
              ))}
            </div>
            {triedNote && <p className="qz-note">{triedNote}</p>}
            <div className="qz-actions">
              <button type="button" className="btn" disabled={!a.tried.length} onClick={() => go('q5')}>
                Continue <span className="arrow">→</span>
              </button>
            </div>
          </>
        )}

        {step === 'q5' && (
          <>
            <h2 className="qz-q">How would you like your expert to work with you?</h2>
            <p className="qz-group">Style</p>
            <div className="qz-opts">
              {STYLES.map((s, i) => (
                <Option
                  key={s}
                  label={s}
                  index={i}
                  selected={a.style === s}
                  onClick={() => {
                    setA((x) => ({ ...x, style: s }));
                    if (a.language) advance(afterQ5());
                  }}
                />
              ))}
            </div>
            <p className="qz-group">Language</p>
            <div className="qz-opts three">
              {LANGUAGES.map((l, i) => (
                <Option
                  key={l}
                  label={l}
                  index={i}
                  selected={a.language === l}
                  onClick={() => {
                    setA((x) => ({ ...x, language: l }));
                    if (a.style) advance(afterQ5());
                  }}
                />
              ))}
            </div>
          </>
        )}

        {step === 'safety-body' && (
          <>
            <h2 className="qz-q">One quick check before we match you.</h2>
            <p className="qz-sub">
              Do you have a recent injury, recent surgery, numbness, or pain that’s getting worse quickly?
            </p>
            <div className="qz-opts">
              <Option label="No, none of these" index={0} selected={false} onClick={() => go('match')} />
              <Option label="Yes" index={1} selected={false} onClick={() => go('halt')} />
            </div>
          </>
        )}

        {step === 'halt' && (
          <div className="qz-warn">
            Please see a healthcare professional first. Yoga with SuperMe is not a substitute for medical diagnosis or
            treatment. Once you’ve been checked, we’d be glad to match you.
          </div>
        )}

        {step === 'safety-crisis' && (
          <>
            <h2 className="qz-q">Before we match you</h2>
            <p className="qz-sub">
              If you’re in crisis or thinking about harming yourself, please don’t wait for a session. Talk to someone now:
            </p>
            <ul className="qz-crisis">
              {CRISIS.map((c) => (
                <li key={c.country}>
                  <b>{c.country}:</b>{' '}
                  {c.lines.map((l, i) => (
                    <span key={l.label + i}>
                      <a href={`tel:${l.tel}`}>{l.label}</a> {l.note}
                      {i < c.lines.length - 1 && l.note !== 'or' ? ' · ' : ' '}
                    </span>
                  ))}
                </li>
              ))}
            </ul>
            <div className="qz-actions">
              <button type="button" className="btn" onClick={() => go('match')}>
                Continue to my matches <span className="arrow">→</span>
              </button>
            </div>
          </>
        )}

        {step === 'match' && (
          <div className="qz-handoff" role="status">
            <span className="qz-loader-dot is-spin" aria-hidden />
            Finding your best matches…
          </div>
        )}
      </div>
    </div>
  );
}
