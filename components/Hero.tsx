import { Header } from './Header';
import { Quiz } from './Quiz';

const Laurel = ({ flip = false }: { flip?: boolean }) => (
  <svg className={flip ? 'laurel flip' : 'laurel'} viewBox="0 0 24 48" width="20" height="40" aria-hidden>
    <path d="M18 46C8 40 4 30 6 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    {[
      [6.2, 18, -35],
      [6.6, 25, -30],
      [8, 32, -25],
      [10.5, 38, -15],
    ].map(([x, y, r], i) => (
      <g key={i}>
        <ellipse cx={x - 3} cy={y - 2} rx="1.8" ry="4" transform={`rotate(${r} ${x - 3} ${y - 2})`} fill="currentColor" />
        <ellipse cx={x + 3} cy={y - 1} rx="1.8" ry="4" transform={`rotate(${-r} ${x + 3} ${y - 1})`} fill="currentColor" />
      </g>
    ))}
    <ellipse cx="6" cy="11" rx="1.8" ry="4.2" fill="currentColor" />
  </svg>
);

const Star = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden>
    <path d="M12 3.2l2.7 5.5 6 .9-4.4 4.2 1 6-5.3-2.8-5.3 2.8 1-6-4.4-4.2 6-.9L12 3.2z" fill="currentColor" />
  </svg>
);

export function Hero() {
  return (
    <section className="hero-wrap" id="top">
      <Header />

      <div className="container hero">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="dot" aria-hidden />
            YOGA · COACHING · THERAPY · 1:1 ONLINE
          </span>
          <h1>
            You’re not stuck. <em>You just haven’t met the right coach yet.</em>
          </h1>
          <p className="hero-body">
            Stuck at work? Running on empty? A back that aches by 3 p.m.? Tell us what’s going on, and we’ll match you with
            the right expert.
          </p>

          {/* ⚠️ Numbers from Atul's design; source unconfirmed (PENDING.md item 0). */}
          <div className="hero-proof">
            <span className="hero-faces" aria-hidden>
              {[1, 2, 3].map((n) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={n} src={`/trust/face-${n}.webp`} alt="" width={128} height={128} />
              ))}
            </span>
            <span className="hero-stat">
              <b>12,000+</b>
              <small>
                people have already
                <br />
                taken their first session
              </small>
            </span>
            <span className="hero-rating">
              <span className="hero-rating-top">
                <Laurel />
                <span>
                  <span className="hero-score">
                    <b>4.8</b> / 5
                  </span>
                  <span className="hero-stars">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star key={i} />
                    ))}
                  </span>
                </span>
                <Laurel flip />
              </span>
              <small>from verified sessions</small>
            </span>
          </div>
        </div>

        <div className="hero-quiz">
          <Quiz />
        </div>
      </div>
    </section>
  );
}
