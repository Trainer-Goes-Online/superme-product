'use client';

import { FOCUSES, FOCUS_EVENT, type FocusKey } from '@/lib/quiz';
import { Brand } from './Brand';
import { FOCUS_ICONS } from './FocusIcons';

const pick = (focus: FocusKey) => window.dispatchEvent(new CustomEvent<FocusKey>(FOCUS_EVENT, { detail: focus }));

export function Header() {
  return (
    <header className="container header">
      <Brand />
      <nav className="nav" aria-label="Main">
        <a href="#how">How it works</a>
        <a href="https://www.mysuperme.com/experts" target="_blank" rel="noopener noreferrer">
          Our experts
        </a>
        <div className="nav-drop">
          <button type="button" className="nav-drop-btn" aria-haspopup="true">
            Areas we support
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          <ul className="nav-menu">
            {FOCUSES.filter((f) => f.key !== 'unsure').map((f) => (
              <li key={f.key}>
                <a href="#quiz" onClick={() => pick(f.key)}>
                  <span aria-hidden>{FOCUS_ICONS[f.key]}</span>
                  {f.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <a href="#offer">Pricing</a>
      </nav>
      <div className="header-acts">
        <a className="nav-login" href="https://www.mysuperme.com/sign-up" target="_blank" rel="noopener noreferrer">
          Log in
        </a>
        <a className="btn small header-cta" href="#quiz">
          Find my expert <span className="arrow">→</span>
        </a>
      </div>
    </header>
  );
}
