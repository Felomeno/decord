import Link from "next/link";
import { Frame } from "@/components/Frame";
import { getProject } from "@/content/projects";

// Real pairs of the same space. Framing differs between shots, so they sit side by side
// instead of in a slider (a slider would imply aligned shots that do not exist).
const pairs = ["cocina-antes-despues", "bano-las-aguilas", "ducha-lucero", "filtraciones-villaverde"];

export function BeforeAfter() {
  const items = pairs.flatMap((slug) => {
    const project = getProject(slug)!;
    const where = project.neighbourhood ?? "Cocina";
    return [
      { project, photo: project.pair!.before, label: where, fact: "Antes", lifted: false },
      { project, photo: project.pair!.after, label: where, fact: "Después", lifted: slug === "cocina-antes-despues" },
    ];
  });

  return (
    <section className="section bg-ice" aria-labelledby="antes-title">
      <div className="wrap grid-12 showcase">
        <div className="showcase__side" data-reveal>
          <div>
            <h2 id="antes-title" className="t-h2">
              Antes y después
            </h2>
            <p style={{ marginTop: 16 }}>
              <Link href="/proyectos" className="prose-link">
                Ver cada obra con su lista de trabajos
              </Link>
            </p>
          </div>
          <p className="t-small t-muted" style={{ maxWidth: "30ch" }}>
            Mismo espacio, fotos de DecorMG sin retocar. Las de Instagram conservan el rótulo original del vídeo.
          </p>
        </div>

        <div className="showcase__run shutter" role="region" aria-label="Parejas de antes y después" tabIndex={0}>
          {items.map(({ project, photo, label, fact, lifted }, i) => {
            const h = lifted ? 620 : 300;
            const w = Math.round((photo.width / photo.height) * h);
            return (
              <Link
                key={`${project.slug}-${i}`}
                href={`/proyectos/${project.slug}`}
                className={`showcase__item${lifted ? " showcase__item--lifted" : ""}`}
                data-track="project_open"
                data-track-place="before-after"
              >
                <Frame photo={photo} height={h} sizes={`${w}px`} />
                <span className="showcase__meta">
                  <span>{label}</span>
                  <span>{fact}</span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
