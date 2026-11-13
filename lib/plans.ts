/* Step 2 of 2 (payment). Copy and details verbatim from the reference page's
   offers screen (_intake/SuperMe_Black_Friday_Landing_Page.html, renderOffers),
   minus its Black Friday labels and prototype notes. */

export type Currency = 'USD' | 'EUR' | 'GBP' | 'CHF';
export const CURRENCIES: { code: Currency; label: string }[] = [
  { code: 'USD', label: 'USD ($)' },
  { code: 'EUR', label: 'EUR (€)' },
  { code: 'GBP', label: 'GBP (£)' },
  { code: 'CHF', label: 'CHF' },
];
export const SYMBOL: Record<Currency, string> = { USD: '$', EUR: '€', GBP: '£', CHF: 'CHF ' };

export type PlanKey = 'free' | 'kickstart';

export const PAY_HEADING = 'Choose how you’d like to start';
export const PAY_SUB = 'The same trusted first step. Two ways to make it your own.';

export function plans(sym: string) {
  return [
    {
      key: 'free' as PlanKey,
      title: 'Your first session',
      sub: 'Experience what an expert can do for you.',
      price: `${sym}1`,
      priceNote: 'refunded when you attend',
      features: [
        { t: '1 × 45-minute main-expert session' },
        { t: 'Short written summary' },
        { t: `${sym}1 refunded on attendance` },
        { t: 'Personalized expert match' },
        { t: 'Cross-path expert session', off: true },
        { t: '14-day follow-up', off: true },
      ],
      notes: `The ${sym}1 reserves your expert’s time. If you attend, you get it back.`,
      cta: `Continue with my ${sym}1 session`,
    },
    {
      key: 'kickstart' as PlanKey,
      label: 'RECOMMENDED FOR MORE SUPPORT',
      title: 'Mind & Body Kickstart',
      sub: 'A personalized 14-day start, with two expert perspectives.',
      price: `${sym}9`,
      priceNote: 'one-time introductory offer',
      features: [
        { t: '2 sessions with your main expert (day 1 & day 14)' },
        { t: '1 × 30-minute complementary expert session' },
        { t: '14 days of messaging & up to 3 check-ins' },
        { t: 'Full personal mind & body plan' },
        { t: 'Session recordings' },
        { t: '30 days of classes & live groups' },
        { t: 'Full refund or free rematch if session one is not right' },
        { t: `Your ${sym}9 credited fully toward a later package` },
      ],
      notes: `Your ${sym}9 Kickstart payment can be credited in full toward a package if you choose to continue. First-session refund/rematch policy subject to final terms.`,
      cta: `Continue with my ${sym}9 Kickstart`,
    },
  ];
}

export const trust = (sym: string) => [
  {
    t: 'Clear refund terms',
    b: `First-session ${sym}1 refunded after attendance. Kickstart session-one remedy: refund or rematch.`,
  },
  {
    t: 'Make it personal',
    b: 'Your expert pairing and plan are informed by your answers, not a generic class catalogue.',
  },
];

/* Where the pay button sends the visitor. No processor supplied yet. */
export const PAYMENT_URL: Record<PlanKey, string> = { free: '', kickstart: '' };
