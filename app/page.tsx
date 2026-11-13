import './landing.css';

import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { Joining } from '@/components/Joining';
import { Offer } from '@/components/Offer';
import { Problems } from '@/components/Problems';
import { Trust } from '@/components/Trust';

export default function Page() {
  return (
    <>
      <main>
        <Hero />
        <Offer />
        <Problems />
        <Joining />
        <Trust />
      </main>
      <Footer />
    </>
  );
}
