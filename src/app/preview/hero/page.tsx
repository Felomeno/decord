import type { Metadata } from "next";
import Link from "next/link";
import { Frame } from "@/components/Frame";
import { Hero } from "@/components/home/Hero";
import { WhatsAppIcon } from "@/components/icons";
import { photos } from "@/content/images";
import { getProject } from "@/content/projects";
import { whatsappUrl } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Variantes de hero (interno)",
  robots: { index: false, follow: false },
};

function Label({ id, title, verdict }: { id: string; title: string; verdict: string }) {
  return (
    <div className="wrap" style={{ paddingBlock: 40 }} id={id}>
      <h2 className="t-h2">{title}</h2>
      <p style={{ marginTop: 12, maxWidth: "70ch" }}>{verdict}</p>
    </div>
  );
}

/** Variant B: one full-height photograph beside a navy text panel. */
function HeroPhotoSplit() {
  return (
    <section className="on-dark" style={{ display: "grid", gridTemplateColumns: "minmax(0,5fr) minmax(0,7fr)", minHeight: "85svh", background: "var(--navy)" }}>
      <div style={{ padding: "var(--margin)", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 24 }}>
        <h1 className="t-display" style={{ fontSize: "clamp(2.5rem, 1rem + 4.2vw, 5.25rem)" }}>
          Baños, cocinas y pisos en Madrid
        </h1>
        <p className="t-lead">Reformamos desde Latina y publicamos cada obra con su antes.</p>
        <div className="hero__actions">
          <a href={whatsappUrl()} className="btn btn-primary" target="_blank" rel="noopener">
            <WhatsAppIcon /> Pedir presupuesto
          </a>
          <Link href="/proyectos" className="btn btn-secondary">
            Ver obras
          </Link>
        </div>
      </div>
      <div className="frame" style={{ minHeight: 480 }}>
        <Frame photo={photos.banoLaton} fill sizes="58vw" className="preview-fill" />
      </div>
    </section>
  );
}

/** Variant C: the neighbourhoods as the index, each with its job. */
function HeroNeighbourhoods() {
  const rows = ["bano-las-aguilas", "ducha-lucero", "reforma-parcial-aluche", "filtraciones-villaverde"].map((s) => getProject(s)!);
  return (
    <section className="bg-paper" style={{ paddingBlock: 64 }}>
      <div className="wrap grid-12" style={{ rowGap: 32 }}>
        <div style={{ gridColumn: "1 / span 6" }}>
          <h1 className="t-display" style={{ fontSize: "clamp(2.5rem, 1rem + 4.2vw, 5.25rem)" }}>
            Reformas en tu barrio
          </h1>
          <p className="t-lead" style={{ marginTop: 24, maxWidth: "36ch" }}>
            Baños, cocinas y pisos en Madrid. Estas son las últimas obras que hemos publicado.
          </p>
          <div className="hero__actions" style={{ marginTop: 24 }}>
            <a href={whatsappUrl()} className="btn btn-primary" target="_blank" rel="noopener">
              <WhatsAppIcon /> Pedir presupuesto
            </a>
          </div>
        </div>
        <ul style={{ gridColumn: "7 / span 6", listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>
          {rows.map((p) => (
            <li key={p.slug}>
              <Link href={`/proyectos/${p.slug}`} style={{ display: "grid", gridTemplateColumns: "96px 1fr", gap: 16, alignItems: "center", textDecoration: "none", background: "var(--ice)", padding: 8 }}>
                <Frame photo={p.frames[p.frames.length - 1].photo} height={128} sizes="96px" />
                <span>
                  <span className="t-h2" style={{ display: "block" }}>
                    {p.neighbourhood}
                  </span>
                  <span className="t-small t-muted">{p.title}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function HeroPreviewPage() {
  return (
    <>
      <div className="wrap" style={{ paddingTop: 40 }}>
        <p className="t-small t-muted">Ruta interna de trabajo. No forma parte de la web ni del sitemap.</p>
        <h1 className="t-h2" style={{ marginTop: 8 }}>
          Tres composiciones de hero
        </h1>
      </div>

      <Label
        id="a"
        title="A · Tira iluminada (elegida)"
        verdict="Titular y acciones arriba, debajo una tira de 16 fotogramas reales que se desliza. Responde en el primer pantallazo a «¿puedo ver obra parecida?», usa las fotos pequeñas sin que se note su resolución y lleva el navy de marca al primer golpe de vista. En móvil el botón queda visible sin scroll."
      />
      <Hero />

      <Label
        id="b"
        title="B · Foto a sangre y panel"
        verdict="La más clásica: una sola foto grande (el baño del espejo dorado) junto al titular. Buen LCP y mucha calidad percibida, pero depende de una única foto y muestra una sola obra; se parece a cualquier web de reformas con una buena foto. Descartada como hero, su principio se usa en el fotograma ampliado de la hoja de obras."
      />
      <HeroPhotoSplit />

      <Label
        id="c"
        title="C · Índice de barrios"
        verdict="Lleva la proximidad al titular y lista las obras por barrio. Muy específica, pero el titular pierde el qué (baños, cocinas, pisos), las miniaturas quedan pequeñas y deja fuera las obras sin barrio publicado. Descartada; los barrios pasan al bloque «Dónde y qué»."
      />
      <HeroNeighbourhoods />
    </>
  );
}
