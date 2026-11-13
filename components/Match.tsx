'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState, type ReactNode } from 'react';

import { EMPTY_ANSWERS, loadAnswers, markResume, type Answers } from '@/lib/answers';
import type { Expert } from '@/lib/experts-data';
import { matchExperts, type Match as MatchT } from '@/lib/match';
import { CURRENCIES, PAYMENT_URL, PAY_HEADING, PAY_SUB, SYMBOL, plans, trust, type Currency, type PlanKey } from '@/lib/plans';
import { FOCUSES, PRICES, priceRange } from '@/lib/quiz';
import { Brand } from './Brand';
import { FOCUS_ICONS } from './FocusIcons';
import { Todo } from './Todo';

const icon = (d: ReactNode, size = 18) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    {d}
  </svg>
);
const IC = {
  calendar: icon(
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>,
  ),
  globe: icon(
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.4 2.4 3.5 5.2 3.5 8.5s-1.1 6.1-3.5 8.5c-2.4-2.4-3.5-5.2-3.5-8.5s1.1-6.1 3.5-8.5z" />
    </>,
  ),
  person: icon(
    <>
      <circle cx="10" cy="8" r="3.5" />
      <path d="M3.5 19.5c.6-3.4 3.2-5.5 6.5-5.5 1.3 0 2.5.3 3.5.9M16 16.5l1.8 1.8 3.2-3.6" />
    </>,
  ),
  stack: icon(<path d="M12 3.5l8.5 4.5-8.5 4.5L3.5 8 12 3.5zM3.5 12l8.5 4.5 8.5-4.5M3.5 16l8.5 4.5 8.5-4.5" />),
  shield: icon(
    <>
      <path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.2-7.5 9.5-4.3-1.3-7.5-4.9-7.5-9.5V6L12 3z" />
      <path d="M8.8 12.2l2.2 2.2 4.2-4.4" />
    </>,
    20,
  ),
  check: icon(<path d="M5 12.5l4.5 4.5L19 7.5" />, 20),
  spark: (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden>
      <path d="M10 2l1.8 5.7L17.5 9.5l-5.7 1.8L10 17l-1.8-5.7L2.5 9.5l5.7-1.8L10 2zM18.5 13l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9.9-2.6z" />
    </svg>
  ),
};

type Step = 'loader' | 'matches' | 'details' | 'pay' | 'done';
type Contact = { first: string; email: string; phone: string; terms: boolean; health: boolean };

const LOADER_MS = 1050;
const STAGES: { key: Step[]; label: string }[] = [
  { key: ['loader', 'matches'], label: 'Your match' },
  { key: ['details'], label: 'Your details' },
  { key: ['pay', 'done'], label: 'Payment' },
];

const firstName = (e: Expert) => e.name.split(' ')[0];
const photo = (e: Expert) => `/experts/${e.slug}.webp`;

function reasons(m: MatchT, language: string): string[] {
  const out: string[] = [];
  if (m.fits.length) out.push(`Works on ${m.fits[0].toLowerCase()}, which is what’s weighing on you most.`);
  const l = m.expert.languages;
  if ((language === 'English' || language === 'French') && l.includes(language)) {
    out.push(`Speaks ${language}, the language you chose.`);
  } else if (language === 'Either' && l.includes('English') && l.includes('French')) {
    out.push('Works in English and French, so you can use either.');
  }
  if (m.expert.sessions) out.push(`${m.expert.sessions} sessions completed.`);
  else if (m.expert.years) out.push(`${m.expert.years} years of experience.`);
  return out;
}

export function Match() {
  const router = useRouter();
  const [a, setA] = useState<Answers>(EMPTY_ANSWERS);
  const [ready, setReady] = useState(false);
  const [step, setStep] = useState<Step>('loader');
  const [tick, setTick] = useState(0);
  const [chosen, setChosen] = useState<Expert | null>(null);
  const [c, setC] = useState<Contact>({ first: '', email: '', phone: '', terms: false, health: false });
  const [error, setError] = useState('');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [plan, setPlan] = useState<PlanKey>('free');

  /* No quiz answers (a direct visit, a new tab, private mode): back to the quiz. */
  useEffect(() => {
    const saved = loadAnswers();
    if (!saved) {
      router.replace('/#quiz');
      return;
    }
    setA(saved.answers);
    setReady(true);
  }, [router]);

  useEffect(() => {
    if (!ready || step !== 'loader') return;
    setTick(0);
    const id = window.setInterval(() => setTick((t) => t + 1), LOADER_MS);
    const done = window.setTimeout(() => setStep('matches'), LOADER_MS * 4 + 250);
    return () => {
      window.clearInterval(id);
      window.clearTimeout(done);
    };
  }, [ready, step]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const focus = FOCUSES.find((f) => f.key === a.focus);
  const [seen, setSeen] = useState<string[]>([]);
  const matches = useMemo(() => (a.focus ? matchExperts(a.focus, a.language, seen) : []), [a.focus, a.language, seen]);

  /* "Show me 3 more" walks down the ranking; once fewer than 3 are left it starts over. */
  const showMore = () => {
    if (!a.focus) return;
    const next = [...seen, ...matches.map((m) => m.expert.slug)];
    setSeen(matchExperts(a.focus, a.language, next).length < 3 ? [] : next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toQuiz = () => {
    markResume();
    router.push('/#quiz');
  };

  const back = () => {
    setError('');
    if (step === 'pay') setStep('details');
    else if (step === 'details') setStep('matches');
    else toQuiz();
  };

  const submitDetails = () => {
    if (!c.first.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email.trim()) || c.phone.replace(/\D/g, '').length < 7) {
      setError('Please enter a first name, valid email and mobile number.');
      return;
    }
    if (!c.terms || !c.health) {
      setError('Please tick both boxes to continue.');
      return;
    }
    setError('');
    setStep('pay');
  };

  const sym = SYMBOL[currency];
  const offers = plans(sym);
  const selectedPlan = offers.find((p) => p.key === plan) ?? offers[0];

  const matchServices = Array.from(new Set(matches.map((m) => m.expert.service)));
  const anchor =
    matchServices.length > 1
      ? 'Sessions on SuperMe normally cost CHF 65 to 150.'
      : matchServices.length === 1
        ? `${PRICES[matchServices[0]].label} sessions on SuperMe normally cost ${priceRange(matchServices).range}.`
        : '';

  const loaderLines = [
    'Reading your answers…',
    `Looking for experts who work on ${focus?.label.toLowerCase() ?? 'your answers'}…`,
    a.language === 'Either' ? 'Checking languages…' : `Checking who works in ${a.language}…`,
    'Picking your 3 closest matches…',
  ];

  const stage = STAGES.findIndex((s) => s.key.includes(step));

  return (
    <div className="mt">
      <header className="container mt-head">
        <Brand />
        <ol className="mt-steps" aria-label="Booking steps">
          {STAGES.map((s, i) => (
            <li key={s.label} className={i < stage ? 'is-done' : i === stage ? 'is-on' : ''} aria-current={i === stage ? 'step' : undefined}>
              <span className="mt-step-no">{i < stage ? '✓' : i + 1}</span>
              {s.label}
            </li>
          ))}
        </ol>
        <span className="mt-trust">✓ Verified by SuperMe · No subscription</span>
      </header>

      <main className="container mt-main">
        {!ready ? null : (
          <div className={`qz mt-card${step === 'matches' ? ' is-bare' : step === 'pay' ? ' is-wide' : ''}`}>
            {step !== 'loader' && step !== 'done' ? (
              <div className="qz-top">
                <button type="button" className="qz-back" onClick={back}>
                  ← {step === 'matches' ? 'Edit my answers' : 'Back'}
                </button>
              </div>
            ) : null}

            <div className="qz-body" key={step}>
              {step === 'loader' && (
                <div className="qz-loader" role="status" aria-live="polite">
                  <div className="qz-orbit" aria-hidden>
                    <span className="qz-orbit-core" />
                    {matches.map((m, i) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img key={m.expert.slug} className={`qz-orbit-face f${i}`} src={photo(m.expert)} alt="" width={240} height={240} />
                    ))}
                  </div>
                  <h2 className="qz-q center">Finding your best matches</h2>
                  <p className="qz-sub center">Our AI system is matching your answers against SuperMe’s verified experts.</p>
                  <ol className="qz-loader-lines">
                    {loaderLines.map((l, i) => (
                      <li key={l} className={i < tick ? 'is-done' : i === tick ? 'is-on' : ''}>
                        <span className="qz-loader-dot" aria-hidden />
                        {l}
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {step === 'matches' && focus && (
                <div className="qz-result">
                  <span className="qz-eyebrow">YOUR 3 MATCHES ARE READY</span>
                  <h1 className="qz-q">3 experts who fit what you told us.</h1>
                  <p className="qz-sub">
                    We narrowed it down so you don’t have to search. The last call is yours: pick the one you’d feel most
                    at ease talking to.
                  </p>
                  <ul className="mt-chips" aria-label="Your answers">
                    <li>
                      {FOCUS_ICONS[focus.key]}
                      {focus.label}
                    </li>
                    <li>
                      {IC.calendar}
                      {a.duration}
                    </li>
                    <li>
                      {IC.globe}
                      {a.language === 'Either' ? 'English or French' : a.language}
                    </li>
                    {a.style && a.style !== 'No preference' ? (
                      <li>
                        {IC.person}
                        {a.style.split(':')[0]}
                      </li>
                    ) : null}
                  </ul>

                  <div className="qz-matches">
                    {matches.map((m, i) => {
                      const e = m.expert;
                      const top = i === 0 && seen.length === 0;
                      const stat = e.sessions
                        ? `${e.sessions} sessions completed`
                        : e.years
                          ? `${e.years} years of experience`
                          : '';
                      return (
                        <article className={top ? 'qz-xp is-top' : 'qz-xp'} key={e.slug}>
                          {top && (
                            <span className="qz-xp-badge">
                              {IC.spark}
                              Closest to your answers
                            </span>
                          )}
                          <div className="qz-xp-head">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img className="qz-xp-photo" src={photo(e)} alt={e.name} width={240} height={240} />
                            <div>
                              <p className="qz-xp-name">{e.name}</p>
                              <span className="qz-verified">✓ Verified</span>
                            </div>
                          </div>
                          <ul className="qz-xp-tags">
                            {e.specialties.slice(0, 3).map((s) => (
                              <li key={s} className={m.fits.includes(s) ? 'is-fit' : ''}>
                                {s}
                              </li>
                            ))}
                          </ul>
                          <div className="qz-xp-meta">
                            {stat ? (
                              <span>
                                {IC.stack}
                                <b>{stat}</b>
                              </span>
                            ) : null}
                            <span>
                              {IC.globe}
                              Speaks {e.languages.join(', ')}
                            </span>
                          </div>
                          <p className="qz-why">Why they fit your answers</p>
                          <ul className="qz-why-list">
                            {reasons(m, a.language).map((r) => (
                              <li key={r}>{r}</li>
                            ))}
                          </ul>
                          <button
                            type="button"
                            className={top ? 'btn qz-xp-btn' : 'btn qz-xp-btn ghost'}
                            onClick={() => {
                              setChosen(e);
                              setStep('details');
                            }}
                          >
                            Choose {firstName(e)} <span className="arrow">→</span>
                          </button>
                        </article>
                      );
                    })}
                  </div>
                  <p className="mt-assure">
                    {IC.shield}
                    <span>
                      Your first session is $1, and you get it back when you attend · No subscription · No card needed
                      until step 2
                    </span>
                  </p>

                  <div className="qz-offer">
                    <p className="qz-offer-h">Your first session with whichever expert you choose is on us.</p>
                    <ul>
                      {[
                        '45 minutes, 1:1 and private, online from wherever you are',
                        'A short written summary and one practical next step',
                        'No subscription afterwards. Continue per session only if it helped.',
                      ].map((t) => (
                        <li key={t}>
                          {IC.check}
                          {t}
                        </li>
                      ))}
                    </ul>
                    <p className="qz-anchor">
                      {anchor} Your first one: <b className="lit">$1</b>. If you attend, you get it back.{' '}
                      <Todo>currency shown per market</Todo>
                    </p>
                  </div>

                  <div className="qz-alt">
                    None of these feel right?
                    <button type="button" className="mt-more" onClick={showMore}>
                      Show me 3 more <span className="arrow">→</span>
                    </button>
                  </div>
                  <p className="qz-foot">SuperMe’s coaching and wellbeing sessions do not replace medical diagnosis or treatment.</p>
                </div>
              )}

              {step === 'details' && chosen && (
                <>
                  <div className="qz-chosen">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photo(chosen)} alt="" width={240} height={240} />
                    <span>
                      <b>{chosen.name}</b> · Your first session
                    </span>
                    <button type="button" className="qz-change" onClick={back}>
                      Change
                    </button>
                  </div>
                  <span className="qz-eyebrow">STEP 1 OF 2 · YOUR DETAILS</span>
                  <h1 className="qz-q">Save your match with {firstName(chosen)}.</h1>
                  <p className="qz-sub">
                    Create your SuperMe login so we can hold your session and send you the details. Takes 30 seconds.
                  </p>
                  <label className="qz-label" htmlFor="qz-first">
                    First name
                  </label>
                  <input
                    id="qz-first"
                    className="qz-field"
                    autoComplete="given-name"
                    value={c.first}
                    onChange={(e) => setC((s) => ({ ...s, first: e.target.value }))}
                  />
                  <label className="qz-label" htmlFor="qz-email">
                    Email address
                  </label>
                  <input
                    id="qz-email"
                    className="qz-field"
                    type="email"
                    autoComplete="email"
                    value={c.email}
                    onChange={(e) => setC((s) => ({ ...s, email: e.target.value }))}
                  />
                  <label className="qz-label" htmlFor="qz-phone">
                    Mobile number (include country code)
                  </label>
                  <input
                    id="qz-phone"
                    className="qz-field"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+44 7000 000000"
                    value={c.phone}
                    onChange={(e) => setC((s) => ({ ...s, phone: e.target.value }))}
                  />
                  <label className="qz-consent">
                    <input type="checkbox" checked={c.terms} onChange={(e) => setC((s) => ({ ...s, terms: e.target.checked }))} />
                    <span>
                      I agree to SuperMe’s{' '}
                      <a href="https://www.mysuperme.com/terms" target="_blank" rel="noopener noreferrer">
                        Terms
                      </a>{' '}
                      and{' '}
                      <a href="https://www.mysuperme.com/privacy" target="_blank" rel="noopener noreferrer">
                        Privacy Policy
                      </a>
                      , and that SuperMe may contact me by email, phone or WhatsApp about my match and booking.
                    </span>
                  </label>
                  <label className="qz-consent">
                    <input type="checkbox" checked={c.health} onChange={(e) => setC((s) => ({ ...s, health: e.target.checked }))} />
                    <span>
                      I consent to SuperMe using my quiz answers, including anything about my health, to match me and
                      arrange my session.
                    </span>
                  </label>
                  <p className="qz-legal">
                    <Todo>confirm both consent wordings with SuperMe’s legal adviser</Todo>
                  </p>
                  <p className="qz-error" role="alert">
                    {error}
                  </p>
                  <div className="qz-actions">
                    <span className="qz-micro">Next: your first session for $1, refunded when you attend.</span>
                    <button type="button" className="btn" onClick={submitDetails}>
                      Continue to step 2 <span className="arrow">→</span>
                    </button>
                  </div>
                  <p className="qz-login">
                    Already on SuperMe? Log in <Todo>login method: password, email code or magic link, per the product</Todo>
                  </p>
                </>
              )}

              {step === 'pay' && (
                <>
                  <span className="qz-eyebrow">STEP 2 OF 2</span>
                  <div className="qz-pay-head">
                    <div>
                      <h1 className="qz-q">{PAY_HEADING}</h1>
                      <p className="qz-sub">{PAY_SUB}</p>
                    </div>
                    <label className="qz-currency">
                      <span>Currency</span>
                      <select className="qz-field" value={currency} onChange={(e) => setCurrency(e.target.value as Currency)}>
                        {CURRENCIES.map((x) => (
                          <option key={x.code} value={x.code}>
                            {x.label}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div className="qz-plans">
                    {offers.map((p) => (
                      <div
                        key={p.key}
                        className={`qz-plan${p.key === 'kickstart' ? ' is-rec' : ''}${plan === p.key ? ' is-on' : ''}`}
                        role="button"
                        tabIndex={0}
                        aria-pressed={plan === p.key}
                        onClick={() => setPlan(p.key)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setPlan(p.key);
                          }
                        }}
                      >
                        {'label' in p && p.label ? <div className="qz-plan-label">{p.label}</div> : null}
                        <div className="qz-plan-top">
                          <span className="qz-plan-radio" aria-hidden />
                          <div className="qz-plan-t">
                            <div className="qz-plan-title">{p.title}</div>
                            <div className="qz-plan-sub">{p.sub}</div>
                          </div>
                          <div className="qz-plan-price">
                            <strong>{p.price}</strong>
                            <small>{p.priceNote}</small>
                          </div>
                        </div>
                        <div className="qz-plan-grid">
                          {p.features.map((f) => (
                            <div key={f.t} className={'off' in f && f.off ? 'qz-feat off' : 'qz-feat'}>
                              <span aria-hidden>{'off' in f && f.off ? '−' : '✓'}</span>
                              <span>{f.t}</span>
                            </div>
                          ))}
                        </div>
                        <div className="qz-plan-notes">{p.notes}</div>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="btn lg qz-pay-btn"
                    onClick={() => {
                      const url = PAYMENT_URL[plan];
                      if (url) window.location.href = url;
                      else setStep('done');
                    }}
                  >
                    {selectedPlan.cta} <span className="arrow">→</span>
                  </button>

                  <div className="qz-trust">
                    {trust(sym).map((t) => (
                      <div key={t.t}>
                        <strong>{t.t}</strong>
                        <span>{t.b}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {step === 'done' && chosen && focus && (
                <div className="qz-done">
                  <span className="qz-eyebrow">YOUR NEXT STEP</span>
                  <h1 className="qz-q center">
                    Ready to book your {plan === 'free' ? `${sym}1 first session` : 'Mind & Body Kickstart'}.
                  </h1>
                  <p className="qz-sub center">
                    You selected support for <b>{focus.label.toLowerCase()}</b>, starting with <b>{chosen.name}</b>.{' '}
                    {plan === 'free' ? `Your session is ${sym}1, refunded when you attend.` : `The introductory payment is ${sym}9.`}
                  </p>
                  <p className="qz-legal center">
                    <Todo>payment processor and session booking are not connected yet (PAYMENT_URL in lib/plans.ts)</Todo>
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
