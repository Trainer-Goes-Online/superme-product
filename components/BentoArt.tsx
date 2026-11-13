/* Vector redraws of the 3D shapes in "Different Problems, Right Experts.png",
   so they stay sharp at any pixel density. */

export function Mountain() {
  return (
    <svg className="bento-art" viewBox="0 0 400 320" style={{ aspectRatio: '400 / 320' }} aria-hidden>
      <defs>
        <linearGradient id="mt-back" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#eef5fe" />
          <stop offset=".55" stopColor="#c9ddf8" />
          <stop offset="1" stopColor="#a9c6f1" />
        </linearGradient>
        <linearGradient id="mt-front" x1="0" y1="0" x2=".8" y2="1">
          <stop offset="0" stopColor="#e3eefc" />
          <stop offset=".5" stopColor="#a9c7f3" />
          <stop offset="1" stopColor="#7fa6e6" />
        </linearGradient>
        <linearGradient id="mt-edge" x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".95" />
          <stop offset="1" stopColor="#fff" stopOpacity=".2" />
        </linearGradient>
      </defs>
      <path d="M0 300 C70 250 120 150 175 95 C200 70 225 62 250 78 C300 110 340 150 400 170 L400 320 L0 320 Z" fill="url(#mt-back)" />
      <path d="M175 95 C200 70 225 62 250 78" stroke="url(#mt-edge)" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M40 320 C110 280 170 210 230 160 C255 140 280 132 305 146 C340 165 370 190 400 196 L400 320 Z" fill="url(#mt-front)" />
      <path d="M230 160 C255 140 280 132 305 146 C340 165 370 190 400 196" stroke="url(#mt-edge)" strokeWidth="2.5" fill="none" />
      <path d="M0 320 C120 300 250 290 400 300 L400 320 Z" fill="#dce9fb" opacity=".7" />
    </svg>
  );
}

function Stone({ cx, cy, rx, ry, id }: { cx: number; cy: number; rx: number; ry: number; id: string }) {
  return (
    <g>
      <ellipse cx={cx} cy={cy + ry * 0.55} rx={rx * 0.92} ry={ry * 0.45} fill="#7fa7ab" opacity=".22" />
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={`url(#${id})`} />
      <ellipse cx={cx - rx * 0.2} cy={cy - ry * 0.45} rx={rx * 0.5} ry={ry * 0.22} fill="#fff" opacity=".55" />
    </g>
  );
}

export function Stones() {
  const grad = (id: string) => (
    <radialGradient id={id} cx=".42" cy=".3" r=".85">
      <stop offset="0" stopColor="#fbfefe" />
      <stop offset=".55" stopColor="#dcecee" />
      <stop offset="1" stopColor="#a9c9cc" />
    </radialGradient>
  );
  return (
    <svg className="bento-art" viewBox="0 0 260 230" style={{ aspectRatio: '260 / 230' }} aria-hidden>
      <defs>
        {grad('st-a')}
        {grad('st-b')}
        {grad('st-c')}
      </defs>
      <ellipse cx="135" cy="208" rx="110" ry="12" fill="#8fb5b8" opacity=".18" />
      <Stone cx={135} cy={176} rx={98} ry={32} id="st-a" />
      <Stone cx={133} cy={122} rx={72} ry={25} id="st-b" />
      <Stone cx={136} cy={76} rx={48} ry={19} id="st-c" />
    </svg>
  );
}

export function Heart() {
  return (
    <svg className="bento-art" viewBox="0 0 300 300" style={{ aspectRatio: '1' }} aria-hidden>
      <defs>
        <linearGradient id="ht-a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#dfe4fd" />
          <stop offset="1" stopColor="#aeb9f3" />
        </linearGradient>
        <linearGradient id="ht-b" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#eef0fe" />
          <stop offset="1" stopColor="#bcc6f6" />
        </linearGradient>
      </defs>
      <rect x="60" y="40" width="130" height="250" rx="65" transform="rotate(-45 125 165)" fill="url(#ht-a)" opacity=".85" />
      <rect x="140" y="20" width="130" height="250" rx="65" transform="rotate(45 205 145)" fill="url(#ht-b)" opacity=".8" />
      <rect x="140" y="20" width="130" height="250" rx="65" transform="rotate(45 205 145)" fill="none" stroke="#fff" strokeOpacity=".85" strokeWidth="2" />
      <rect x="60" y="40" width="130" height="250" rx="65" transform="rotate(-45 125 165)" fill="none" stroke="#fff" strokeOpacity=".6" strokeWidth="1.5" />
    </svg>
  );
}

export function Arch() {
  return (
    <svg className="bento-art" viewBox="0 0 280 300" style={{ aspectRatio: '280 / 300' }} aria-hidden>
      <defs>
        <linearGradient id="ar-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbeedd" />
          <stop offset="1" stopColor="#f5dfc4" />
        </linearGradient>
        <radialGradient id="ar-glow" cx=".72" cy=".55" r=".7">
          <stop offset="0" stopColor="#fff6dc" />
          <stop offset=".6" stopColor="#f6dcb8" />
          <stop offset="1" stopColor="#ecc89d" />
        </radialGradient>
        <linearGradient id="ar-step" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fffaf2" />
          <stop offset="1" stopColor="#f3e2cb" />
        </linearGradient>
      </defs>
      <path d="M60 300 V120 A90 90 0 0 1 240 120 V300 Z" fill="url(#ar-wall)" />
      <path d="M85 300 V128 A65 65 0 0 1 215 128 V300 Z" fill="url(#ar-glow)" />
      <path d="M85 128 A65 65 0 0 1 215 128" stroke="#fff" strokeOpacity=".7" strokeWidth="2" fill="none" />
      <rect x="150" y="196" width="130" height="26" fill="url(#ar-step)" />
      <rect x="110" y="222" width="170" height="26" fill="url(#ar-step)" />
      <rect x="70" y="248" width="210" height="26" fill="url(#ar-step)" />
      <rect x="30" y="274" width="250" height="26" fill="url(#ar-step)" />
      <path d="M150 196 H280 M110 222 H280 M70 248 H280 M30 274 H280" stroke="#fff" strokeWidth="1.5" />
    </svg>
  );
}
