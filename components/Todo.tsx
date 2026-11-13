/** A visible marker for a fact nobody has supplied yet. Never ship with one on the page. */
export function Todo({ children }: { children: React.ReactNode }) {
  return <span className="todo">[TODO: {children}]</span>;
}
