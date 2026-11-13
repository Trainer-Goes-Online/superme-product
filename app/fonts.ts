import { DM_Sans, Manrope } from 'next/font/google';

const dmSans = DM_Sans({ subsets: ['latin'], weight: ['400', '500', '700', '800'], variable: '--font-dm-sans', display: 'swap' });
const manrope = Manrope({ subsets: ['latin'], weight: ['600', '700', '800'], variable: '--font-manrope', display: 'swap' });

export const fontVariables = `${dmSans.variable} ${manrope.variable}`;
