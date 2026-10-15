import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Frame } from "@/components/Frame";
import { FinalCta } from "@/components/home/FinalCta";
import { ArrowRightIcon, WhatsAppIcon } from "@/components/icons";
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

// Params are known at build time (generateStaticParams); the boundary keeps the App Shell URL-free.
export default function ProjectPage({ params }: PageProps<"/proyectos/[slug]">) {
  return (
    <Suspense fallback={<p className="wrap sec muted">Cargando la obra…</p>}>
      <ProjectContent params={params} />
    </Suspense>
  );
}

const stageText = { antes: "Antes", "en obra": "En obra", después: "Después" } as const;

async function ProjectContent({ params }: { params: PageProps<"/proyectos/[slug]">["params"] }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const service = project.service ? getService(project.service) : undefined;
  const message = `Hola, he visto la obra «${project.title}» en vuestra web y quiero pedir presupuesto para algo parecido.`;
  const sources = Array.from(new Set(project.frames.map((f) => sourceLabel[f.photo.source])));
  const cover = project.frames[project.frames.length - 1].photo;
  const pairPhotos = project.pair ? [project.pair.before, project.pair.after] : [];
  const extraFrames = project.frames.filter((frame) => !pairPhotos.includes(frame.photo));
  const wide = project.pair ? project.pair.after.width > project.pair.after.height : false;

  return (
    <>
      <PageHead
        title={project.title}
        kicker={project.neighbourhood ? `${kindLabel[project.kind]} · ${project.neighbourhood}` : kindLabel[project.kind]}
        crumbs={[
          { name: "Obras", path: "/proyectos" },
          { name: project.title, path: `/proyectos/${project.slug}` },
        ]}
        lead={<p>{project.summary}</p>}
        photo={cover}
        actions={
          <a
            href={whatsappUrl(message)}
            className="btn btn--primary"
            target="_blank"
            rel="noopener"
            data-track="cta_whatsapp"
            data-track-place="project-head"
          >
            <WhatsAppIcon /> Quiero algo parecido
          </a>
        }
      />

      {project.pair ? (
        <section className="sec sec--alt" aria-labelledby="pareja-title">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <div className="sec-head__text">
                <p className="kicker">Transformación</p>
                <h2 id="pareja-title" className="h2 accent-bar">
                  Antes y después
                </h2>
              </div>
            </div>
            <div className={`ba__pair${wide ? " ba__pair--wide" : ""}`} style={{ maxWidth: wide ? 1200 : 820 }} data-reveal>
              <figure>
                <Frame photo={project.pair.before} fill sizes="(max-width: 767px) 50vw, 600px" />
                <figcaption className="tag tag--dark">Antes</figcaption>
              </figure>
              <figure>
                <Frame photo={project.pair.after} fill sizes="(max-width: 767px) 50vw, 600px" />
                <figcaption className="tag">Después</figcaption>
              </figure>
            </div>
          </div>
        </section>
      ) : null}

      <section className="sec" aria-labelledby="hecho-title">
        <div className="wrap split">
          <dl className="facts" data-reveal>
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
                <a href={project.source.url} className="link" target="_blank" rel="noopener">
                  {project.source.label}
                </a>
              </dd>
            </div>
          </dl>
          <div data-reveal>
            <p className="kicker">El trabajo</p>
            <h2 id="hecho-title" className="h2 accent-bar">
              Qué se hizo
            </h2>
            {project.works ? (
              <ul className="works works--cols" style={{ marginTop: 28 }}>
                {project.works.map((work) => (
                  <li key={work}>{work}</li>
                ))}
              </ul>
            ) : (
              <p className="lead" style={{ marginTop: 28, maxWidth: "58ch" }}>
                {project.visible}
              </p>
            )}
            <p className="small muted" style={{ marginTop: 20 }}>
              {project.works
                ? "Lista tal como la publicó DecorMG."
                : "DecorMG no publicó descripción de esta obra: el texto describe solo lo que se ve en las fotos."}
            </p>
          </div>
        </div>
      </section>

      {extraFrames.length ? (
        <section className="sec sec--alt" aria-labelledby="fotos-title">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <div className="sec-head__text">
                <p className="kicker">Galería</p>
                <h2 id="fotos-title" className="h2 accent-bar">
                  Fotos de la obra
                </h2>
              </div>
            </div>
            <div className="gallery" data-reveal>
              {extraFrames.map((frame, i) => (
                <figure key={i}>
                  <Frame photo={frame.photo} fill sizes="(max-width: 899px) 50vw, 25vw" />
                  <figcaption className={`tag${frame.stage === "después" ? "" : " tag--dark"}`}>
                    {stageText[frame.stage]}
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className="small muted" style={{ marginTop: 24, maxWidth: "62ch" }}>
              Fotos de la {sources.join(" y del ")}. Algunas son de baja resolución porque así están publicadas; uso
              pendiente de autorización de DecorMG.
            </p>
          </div>
        </section>
      ) : null}

      <section className="sec" aria-label="Más obras">
        <div className="wrap">
          <div className="btn-row">
            {service ? (
              <Link href={`/servicios/${service.slug}`} className="btn btn--ghost btn--sm">
                {service.name} <ArrowRightIcon />
              </Link>
            ) : null}
            <Link href="/proyectos" className="btn btn--ghost btn--sm">
              Todas las obras <ArrowRightIcon />
            </Link>
          </div>
          <nav aria-label="Otras obras" className="next-prev">
            <Link href={`/proyectos/${prev.slug}`} className="link">
              Anterior: {prev.title}
            </Link>
            <Link href={`/proyectos/${next.slug}`} className="link">
              Siguiente: {next.title}
            </Link>
          </nav>
        </div>
      </section>

      <FinalCta title="¿Quieres algo parecido?" message={message} />
    </>
  );
}
