import { EXPERTS, type Expert } from './experts-data';
import { FOCUSES, type FocusKey } from './quiz';

/* Front-end matching for the UI only: scores the roster against the quiz
   answers. Specialty names are the directory's own labels. */
const WANTS: Record<FocusKey, string[]> = {
  career: ['Life coaching', 'Executive coaching'],
  stress: ['Stress or burnout', 'Wellness coaching', 'Restorative Yoga', 'Pranayama (Breathing)', 'Gentle Yoga'],
  anxiety: ['Improving general mental health wellbeing', 'Self-esteem and confidence', 'Stress or burnout', 'Wellness coaching'],
  relationships: ['Romantic relationship issues', 'Communication skills', 'Life transitions', 'Life coaching'],
  parenting: ['Life coaching', 'Wellness coaching'],
  leadership: ['Executive coaching', 'Communication skills'],
  focus: ['Neuro-Atypical', 'Life coaching'],
  body: ['Yoga Therapy', 'Gentle Yoga', 'Restorative Yoga', 'Office Yoga', 'Hatha Yoga'],
  sleep: ['Restorative Yoga', 'Pranayama (Breathing)', 'Wellness coaching', 'Stress or burnout'],
  unsure: ['Life coaching', 'Wellness coaching', 'Improving general mental health wellbeing', 'Hatha Yoga'],
};

export type Match = { expert: Expert; fits: string[] };

function speaks(e: Expert, language: string) {
  if (language === 'English' || language === 'French') return e.languages.includes(language);
  return e.languages.includes('English') || e.languages.includes('French');
}

export function matchExperts(focusKey: FocusKey, language: string, exclude: string[] = []): Match[] {
  const focus = FOCUSES.find((f) => f.key === focusKey);
  if (!focus) return [];
  const wants = WANTS[focusKey];

  /* Every expert is a candidate so a thin service (one therapist today) still
     yields three; the +10 keeps in-service experts ahead of the fillers. */
  const scored = EXPERTS.filter((e) => !exclude.includes(e.slug)).map((e) => {
    const fits = e.specialties.filter((s) => wants.includes(s));
    const at = focus.services.indexOf(e.service);
    const serviceWeight = at < 0 ? -10 : 10 + (focus.services.length - at);
    const score =
      serviceWeight + fits.length * 2 + (speaks(e, language) ? 6 : 0) + (e.rating ?? 4.5) + Math.min(e.sessions ?? 0, 40) / 40;
    return { expert: e, fits, score };
  });
  scored.sort((x, y) => y.score - x.score);

  /* When the focus spans several services, show more than one kind of expert. */
  const picked: typeof scored = [];
  if (focus.services.length > 1) {
    for (const s of focus.services) {
      const best = scored.find((c) => c.expert.service === s && !picked.includes(c));
      if (best && picked.length < 3) picked.push(best);
    }
  }
  for (const c of scored) {
    if (picked.length >= 3) break;
    if (!picked.includes(c)) picked.push(c);
  }
  return picked.slice(0, 3).map(({ expert, fits }) => ({ expert, fits }));
}
