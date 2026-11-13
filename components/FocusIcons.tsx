import type { ReactNode } from 'react';
import type { FocusKey } from '@/lib/quiz';

const svg = (d: ReactNode) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    {d}
  </svg>
);

export const FOCUS_ICONS: Record<FocusKey, ReactNode> = {
  career: svg(
    <>
      <rect x="3" y="7" width="18" height="13" rx="2.5" />
      <path d="M8.5 7V5.5A1.5 1.5 0 0 1 10 4h4a1.5 1.5 0 0 1 1.5 1.5V7M3 12.5h18M11 12.5v2h2v-2" />
    </>,
  ),
  stress: svg(
    <>
      <path d="M5 19c0-8 5-13 15-14-1 10-6 15-14 15" />
      <path d="M5 19l8-8" />
    </>,
  ),
  anxiety: svg(
    <>
      <path d="M9 4.5a3 3 0 0 0-3 3 3 3 0 0 0-2 5.2A3 3 0 0 0 7 17.5a2.5 2.5 0 0 0 5 .5V6a2 2 0 0 0-3-1.5z" />
      <path d="M15 4.5a3 3 0 0 1 3 3 3 3 0 0 1 2 5.2 3 3 0 0 1-3 4.8 2.5 2.5 0 0 1-5 .5" />
      <path d="M8 10h1.5M14.5 13H16" />
    </>,
  ),
  relationships: svg(<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20z" />),
  parenting: svg(
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19c.5-3.3 2.7-5.5 5.5-5.5s5 2.2 5.5 5.5" />
      <circle cx="17" cy="10" r="2.2" />
      <path d="M15.5 14.2c2.4-.3 4.4 1.3 5 4.8" />
    </>,
  ),
  leadership: svg(<path d="M13 3L5 13.5h6L10 21l8-10.5h-6L13 3z" />),
  focus: svg(
    <>
      <path d="M12 19c-3-1.5-4.5-4-4.5-7 2 .2 3.6 1.3 4.5 3 .9-1.7 2.5-2.8 4.5-3 0 3-1.5 5.5-4.5 7z" />
      <path d="M12 14c-.8-2.4-.6-4.8.5-7.5 1.1 2.2 1.2 4.5.3 6.8" />
      <path d="M7.5 12C5.6 12 4 13 3 14.5 4.5 17 8 19 12 19M16.5 12c1.9 0 3.5 1 4.5 2.5C19.5 17 16 19 12 19" />
    </>,
  ),
  body: svg(
    <>
      <rect x="9" y="3" width="6" height="4" rx="2" />
      <rect x="9" y="10" width="6" height="4" rx="2" />
      <rect x="9" y="17" width="6" height="4" rx="2" />
      <path d="M12 7v3M12 14v3" />
    </>,
  ),
  sleep: svg(<path d="M19.5 14.5A8 8 0 0 1 9.5 4.5a8 8 0 1 0 10 10z" />),
  unsure: svg(
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" />
    </>,
  ),
};
