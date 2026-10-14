import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section bg-paper">
      <div className="wrap" style={{ maxWidth: 720, marginInline: 0 }}>
        <h1 className="t-h2">Esta página no existe</h1>
        <p className="t-lead" style={{ marginTop: 16 }}>
          Puede que el enlace esté mal escrito o que la obra ya no esté publicada.
        </p>
        <p style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/proyectos" className="btn btn-primary">
            Ver las obras
          </Link>
          <Link href="/" className="btn btn-secondary">
            Ir al inicio
          </Link>
        </p>
      </div>
    </section>
  );
}
