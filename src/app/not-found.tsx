import Link from "next/link";

export default function NotFound() {
  return (
    <section className="sec">
      <div className="wrap" style={{ maxWidth: 820, marginInline: 0 }}>
        <p className="kicker">Error 404</p>
        <h1 className="h1 accent-bar">Esta página no existe</h1>
        <p className="lead muted" style={{ marginTop: 24 }}>
          Puede que el enlace esté mal escrito o que la obra ya no esté publicada.
        </p>
        <p className="btn-row" style={{ marginTop: 32 }}>
          <Link href="/proyectos" className="btn btn--primary">
            Ver las obras
          </Link>
          <Link href="/" className="btn btn--ghost">
            Ir al inicio
          </Link>
        </p>
      </div>
    </section>
  );
}
