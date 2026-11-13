import type { Metadata } from 'next';

import './globals.css';
import { fontVariables } from './fonts';

export const metadata: Metadata = {
  title: 'SuperMe · Find the right expert for you',
  description: 'Take the 2-minute assessment and get matched with a hand-picked yoga, coaching or therapy expert.',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
