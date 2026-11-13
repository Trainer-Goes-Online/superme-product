/* Quiz copy, verbatim from funnel-copy/01-landing.md (NO-BRAINER). */

export type Service = 'yoga' | 'coaching' | 'therapy';

/* Site prices (mysuperme.com /yoga, /coaching, /therapy), in CHF. Therapy is
   "from CHF 70" with no upper bound published. */
export const PRICES: Record<Service, { label: string; from: number; to?: number }> = {
  yoga: { label: 'Yoga', from: 65, to: 85 },
  coaching: { label: 'Coaching', from: 125, to: 150 },
  therapy: { label: 'Therapy', from: 70 },
};

export type FocusKey =
  | 'career'
  | 'stress'
  | 'anxiety'
  | 'relationships'
  | 'parenting'
  | 'leadership'
  | 'focus'
  | 'body'
  | 'sleep'
  | 'unsure';

export type Focus = {
  key: FocusKey;
  label: string;
  services: Service[];
  moments: string[];
};

export const FOCUSES: Focus[] = [
  {
    key: 'career',
    label: 'Career & work direction',
    services: ['coaching'],
    moments: [
      'Sunday evenings feel heavy before the week has even started.',
      'I know I want out. I just don’t know out to what.',
      'I’ve outgrown my role but can’t see the next step.',
    ],
  },
  {
    key: 'stress',
    label: 'Stress & burnout',
    services: ['therapy', 'coaching', 'yoga'],
    moments: [
      'I’m tired even after a full weekend off.',
      'My to-do list follows me into bed.',
      'I keep saying I’ll rest after this week. It never is after this week.',
    ],
  },
  {
    key: 'anxiety',
    label: 'Anxiety, overthinking or low mood',
    services: ['therapy'],
    moments: [
      'My mind replays conversations long after they’re over.',
      'Things I used to enjoy feel flat.',
      'I worry about things I know are unlikely, and still can’t stop.',
    ],
  },
  {
    key: 'relationships',
    label: 'Relationships & family',
    services: ['therapy', 'coaching'],
    moments: [
      'We keep having the same argument, word for word.',
      'I feel lonely even with people around me.',
      'A big change (a move, a breakup, a loss) has knocked me off balance.',
    ],
  },
  {
    key: 'parenting',
    label: 'Parenting',
    services: ['coaching'],
    moments: [
      'Bedtime turns into a battle most nights.',
      'I’m stretched between work and home and it doesn’t feel like enough for either.',
      'Co-parenting or a family change is hard on all of us.',
      'My child is going through something and I’m not sure how to help.',
    ],
  },
  {
    key: 'leadership',
    label: 'Leadership & work pressure',
    services: ['coaching'],
    moments: [
      'New role, bigger team, and nobody showed me how.',
      'Everyone brings their problems to me and I’m running low.',
      'The hard conversations keep getting pushed to next week.',
    ],
  },
  {
    key: 'focus',
    label: 'Focus & how my brain works',
    services: ['coaching'],
    moments: [
      'Standard productivity advice was never built for a brain like mine.',
      'Hours disappear and I can’t say where they went.',
      'I think I may be wired differently (ADHD, high potential, hypersensitive) and want support that fits.',
    ],
  },
  {
    key: 'body',
    label: 'Back, neck or knee discomfort',
    services: ['yoga'],
    moments: [
      'My back aches by mid-afternoon at the desk.',
      'My neck and shoulders are tight most of the time.',
      'My knees complain on stairs or after exercise.',
    ],
  },
  {
    key: 'sleep',
    label: 'Sleep & switching off',
    services: ['yoga', 'coaching', 'therapy'],
    moments: [
      'My body’s tired. My head won’t stop.',
      'I scroll in bed because it’s the only quiet time I get.',
      'I wake up already tired.',
    ],
  },
  {
    key: 'unsure',
    label: 'Not sure where to begin',
    services: ['yoga', 'coaching', 'therapy'],
    moments: [
      'Something feels off, but I can’t name it.',
      'A few things at once, and I don’t know which to start with.',
      'I’d just like to talk it through with someone who knows what they’re doing.',
    ],
  },
];

export const SOMETHING_ELSE = 'Something else';

export const DURATIONS = ['A few weeks', 'A few months', 'Over a year', 'On and off for years'];
export const LONG_DURATIONS = ['Over a year', 'On and off for years'];
export const LONG_DURATION_NOTE =
  'That’s a long time to carry something. When there are a thousand options and no way to tell which one fits, long searches are normal. This is what the match is for.';

export const NOTHING_YET = 'Nothing yet. This is my first step.';
export const TRIED_BEFORE = 'A coach, therapist or teacher before';
export const TRIED = [
  NOTHING_YET,
  'Apps, videos or online classes',
  'Books, podcasts or articles',
  'Talking it through with friends or family',
  TRIED_BEFORE,
  'Something else',
];
export const TRIED_NOTES = {
  any: 'None of that counts against you. Most help is built for everyone at once. Your expert starts from your answers.',
  before: 'Fit matters as much as skill. This time, the match starts from your situation, not from a list.',
  nothing: 'Good place to start. You won’t have to work out who to see. We do that part.',
};

export const STYLES = [
  'Practical: give me steps I can try this week',
  'Gentle: help me understand what’s going on first',
  'A mix of both',
  'No preference',
];
export const LANGUAGES = ['English', 'French', 'Either'];

export const PRIVACY_HELPER = 'Your answers are private and only used to match you.';

export function priceRange(services: Service[]) {
  const names = services.map((s, i) => (i === 0 ? PRICES[s].label : PRICES[s].label.toLowerCase()));
  const label = names.length > 1 ? `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}` : names[0];
  const froms = services.map((s) => PRICES[s].from);
  const tos = services.map((s) => PRICES[s].to);
  const min = Math.min(...froms);
  const max = tos.every((t) => t !== undefined) ? Math.max(...(tos as number[])) : undefined;
  return { label, range: max ? `CHF ${min} to ${max}` : `from CHF ${min}` };
}

/** Fired by the problem cards to start the quiz with Q1 answered. */
export const FOCUS_EVENT = 'superme:focus';
