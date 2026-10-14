import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Frame } from "@/components/Frame";
import { WhatsAppIcon } from "@/components/icons";
import { PageHead } from "@/components/PageHead";
import { sourceLabel } from "@/content/images";
import { getProject, kindLabel, projects } from "@/content/projects";
import { getService } from "@/content/services";
import { whatsappUrl } from "@/lib/contact";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/proyectos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const where = project.neighbourhood ? ` en ${project.neighbourhood}, Madrid` : " en Madrid";
  return {
    title: project.title,
    description: `${project.summary} Obra de DecorMG${where}.`,
    alternates: { canonical: `/proyectos/${project.slug}` },
    openGraph: { images: [{ url: project.frames[project.frames.length - 1].photo.src }] },
  };
}

export default async function ProjectPage({ params }: PageProps<"/proyectos/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const service = project.service ? getService(project.service) : undefined;
  const message = `Hola, he visto la obra «${project.title}» en vuestra web y quiero pedir presupuesto para algo parecido.`;
  const sources = Array.from(new Set(project.frames.map((f) => sourceLabel[f.photo.source])));
  const wide = project.pair ? project.pair.after.width > project.pair.after.height : false;

  return (
    <>
      <PageHead
        title={project.title}
        crumbs={[
          { name: "Obras", path: "/proyectos" },
          { name: project.title, path: `/proyectos/${project.slug}` },
        ]}
        lead={<p>{project.summary}</p>}
      />

      <section className="bg-paper" aria-labelledby="hecho-title" style={{ paddingBottom: 96 }}>
        <div className="wrap about__row">
          <dl className="facts">
            <div>
              <dt>Tipo</dt>
              <dd>{kindLabel[project.kind]}</dd>
            </div>
            <div>
              <dt>Barrio</dt>
              <dd>{project.neighbourhood ?? "No publicado"}</dd>
            </div>
            <div>
              <dt>Publicada</dt>
              <dd>{project.published ?? "Sin fecha publicada"}</dd>
            </div>
            <div>
              <dt>Fuente</dt>
              <dd>
                <a href={project.source.url} className="prose-link" target="_blank" rel="noopener">
                  {project.source.label}
                </a>
              </dd>
            </div>
          </dl>
          <div>
            <h2 id="hecho-title" className="t-h2" style={{ marginBottom: 24 }}>
              Qué se hizo
            </h2>
            {project.works ? (
              <ul className="works">
                {project.works.map((work) => (
                  <li key={work}>{work}</li>
                ))}
              </ul>
            ) : (
              <p className="t-lead" style={{ maxWidth: "52ch" }}>
                {project.visible}
              </p>
            )}
            {project.works ? (
              <p className="t-small t-muted" style={{ marginTop: 20 }}>
                Lista tal como la publicó DecorMG.
              </p>
            ) : (
              <p className="t-small t-muted" style={{ marginTop: 20 }}>
                DecorMG no publicó descripción de esta obra: el texto describe solo lo que se ve en las fotos.
              </p>
            )}
          </div>
        </div>
      </section>

      {project.pair ? (
        <section className="bg-ice section" aria-labelledby="pareja-title">
          <div className="wrap">
            <h2 id="pareja-title" className="t-h2" style={{ marginBottom: 32 }}>
              Antes y después
            </h2>
            <div className={`pair shutter${wide ? " pair--wide" : ""}`} style={{ maxWidth: wide ? 1200 : 760 }}>
              <figure>
                <Frame photo={project.pair.before} fill sizes="(max-width: 767px) 50vw, 600px" />
                <figcaption>
                  <span>Antes</span>
                  <span className="t-muted">{sourceLabel[project.pair.before.source]}</span>
                </figcaption>
              </figure>
              <figure>
                <Frame photo={project.pair.after} fill sizes="(max-width: 767px) 50vw, 600px" />
                <figcaption>
                  <span>Después</span>
                  <span className="t-muted">{sourceLabel[project.pair.after.source]}</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>
      ) : null}

      <section className="section bg-paper" aria-labelledby="fotos-title">
        <div className="wrap">
          <h2 id="fotos-title" className="t-h2" style={{ marginBottom: 32 }}>
            Fotos
          </h2>
          <div className="gallery">
            {project.frames.map((frame, i) => (
              <figure key={i} style={{ margin: 0 }}>
                <Frame photo={frame.photo} fill sizes="(max-width: 767px) 50vw, 33vw" priority={i === 0 && !project.pair} />
                <figcaption className="t-small" style={{ marginTop: 8 }}>
                  {frame.stage.charAt(0).toUpperCase() + frame.stage.slice(1)}
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="t-small t-muted" style={{ marginTop: 24, maxWidth: "62ch" }}>
            Fotos de la {sources.join(" y del ")}. Algunas son de baja resolución porque así están publicadas; uso
            pendiente de autorización de DecorMG.
          </p>
        </div>
      </section>

      <section className="section bg-navy on-dark" aria-labelledby="pedir-title">
        <div className="wrap grid-12" data-reveal>
          <h2 id="pedir-title" className="t-h2" style={{ gridColumn: "1 / -1", maxWidth: "18ch" }}>
            ¿Quieres algo parecido?
          </h2>
          <div style={{ gridColumn: "1 / -1", marginTop: 24, display: "flex", flexWrap: "wrap", gap: 12 }}>
            <a
              href={whatsappUrl(message)}
              className="btn btn-primary"
              target="_blank"
              rel="noopener"
              data-track="cta_whatsapp"
              data-track-place="project"
            >
              <WhatsAppIcon /> Escribir citando esta obra
            </a>
            {service ? (
              <Link href={`/servicios/${service.slug}`} className="btn btn-secondary">
                {service.name}
              </Link>
            ) : null}
          </div>
          <nav aria-label="Otras obras" className="t-small" style={{ gridColumn: "1 / -1", marginTop: 64, display: "flex", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
            <Link href={`/proyectos/${prev.slug}`} className="prose-link">
              Anterior: {prev.title}
            </Link>
            <Link href={`/proyectos/${next.slug}`} className="prose-link">
              Siguiente: {next.title}
            </Link>
          </nav>
        </div>
      </section>
    </>
  );
}
