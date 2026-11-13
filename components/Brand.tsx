export function Brand({ small = false }: { small?: boolean }) {
  return (
    <a className={small ? 'brand small' : 'brand'} href="/#top" aria-label="SuperMe home">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="brand-image" src="/logo.png" alt="" width={180} height={198} />
    </a>
  );
}
