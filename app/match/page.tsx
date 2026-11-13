import type { Metadata } from 'next';

import '../landing.css';

import { Footer } from '@/components/Footer';
import { Match } from '@/components/Match';

export const metadata: Metadata = {
  title: 'Your matches · SuperMe',
  description: 'Your 3 matched SuperMe experts, then book your first session.',
  robots: { index: false, follow: false },
};

export default function MatchPage() {
  return (
    <>
      <Match />
      <Footer />
    </>
  );
}
