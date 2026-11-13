import type { FocusKey } from './quiz';

export type Answers = {
  focus: FocusKey | '';
  moment: string;
  momentOwn: string;
  duration: string;
  tried: string[];
  style: string;
  language: string;
};

export const EMPTY_ANSWERS: Answers = {
  focus: '',
  moment: '',
  momentOwn: '',
  duration: '',
  tried: [],
  style: '',
  language: '',
};

/* The quiz on / hands its answers to /match through sessionStorage. RESUME is
   set on the way out so that coming back to / reopens the last question
   instead of question 1. */
const KEY = 'superme_answers';
const RESUME = 'superme_resume';

type Saved = { answers: Answers; step: string; history: string[] };

export function saveAnswers(saved: Saved) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(saved));
    sessionStorage.setItem(RESUME, '1');
  } catch {
    /* private mode: /match falls back to sending the visitor back to the quiz */
  }
}

export function loadAnswers(): Saved | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    const saved = JSON.parse(raw) as Saved;
    return saved?.answers?.focus ? saved : null;
  } catch {
    return null;
  }
}

/** Returns the saved quiz once, when the visitor has come back from /match. */
export function takeResume(): Saved | null {
  try {
    if (sessionStorage.getItem(RESUME) !== '1') return null;
    sessionStorage.removeItem(RESUME);
    return loadAnswers();
  } catch {
    return null;
  }
}

export function markResume() {
  try {
    sessionStorage.setItem(RESUME, '1');
  } catch {
    /* ignore */
  }
}
