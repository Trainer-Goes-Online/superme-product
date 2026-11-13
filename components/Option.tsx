import type { ReactNode } from 'react';

const LETTERS = 'ABCDEFGHIJ';

export function Option({
  label,
  index,
  selected,
  multi = false,
  icon,
  onClick,
}: {
  label: string;
  index: number;
  selected: boolean;
  multi?: boolean;
  icon?: ReactNode;
  onClick: () => void;
}) {
  return (
    <button type="button" className={selected ? 'qz-opt is-on' : 'qz-opt'} aria-pressed={selected} onClick={onClick}>
      <span className={icon ? 'qz-key is-ic' : 'qz-key'} aria-hidden>
        {icon ?? LETTERS[index]}
      </span>
      <span className="qz-opt-t">{label}</span>
      <span className={multi ? 'qz-mark sq' : 'qz-mark'} aria-hidden />
    </button>
  );
}
