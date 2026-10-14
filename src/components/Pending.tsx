/** Marks a legal datum that DecorMG has not supplied yet. Never replace with an invented value. */
export function Pending({ children }: { children: string }) {
  return <mark className="pending">[PENDIENTE: {children}]</mark>;
}
