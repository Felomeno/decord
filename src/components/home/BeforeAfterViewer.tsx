"use client";

import Link from "next/link";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { Frame } from "@/components/Frame";
import { ArrowRightIcon } from "@/components/icons";
import type { Project } from "@/content/projects";

type Props = { projects: Project[]; labels: string[] };

/**
 * Tabs over the jobs that have a real before and after of the same space. The two shots are
 * framed differently, so they sit side by side and labelled, never in a slider that would
 * imply aligned photos.
 */
export function BeforeAfterViewer({ projects, labels }: Props) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const base = useId();
  const project = projects[active];
  const pair = project.pair!;
  const wide = pair.after.width > pair.after.height;

  const onKey = (event: KeyboardEvent<HTMLDivElement>) => {
    const last = projects.length - 1;
    const keys: Record<string, number> = {
      ArrowRight: active === last ? 0 : active + 1,
      ArrowLeft: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    };
    if (!(event.key in keys)) return;
    event.preventDefault();
    const next = keys[event.key];
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="ba">
      <div className="ba__tabs" role="tablist" aria-label="Elige una obra" onKeyDown={onKey}>
        {projects.map((p, i) => (
          <button
            key={p.slug}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${base}-tab-${i}`}
            aria-selected={i === active}
            aria-controls={`${base}-panel`}
            tabIndex={i === active ? 0 : -1}
            className="ba__tab"
            onClick={() => setActive(i)}
          >
            {labels[i]}
          </button>
        ))}
      </div>

      <div
        key={project.slug}
        className="ba__panel"
        role="tabpanel"
        id={`${base}-panel`}
        aria-labelledby={`${base}-tab-${active}`}
      >
        <div className={`ba__pair${wide ? " ba__pair--wide" : ""}`}>
          <figure>
            <Frame photo={pair.before} fill sizes="(max-width: 899px) 50vw, 30vw" />
            <figcaption className="tag tag--dark">Antes</figcaption>
          </figure>
          <figure>
            <Frame photo={pair.after} fill sizes="(max-width: 899px) 50vw, 30vw" />
            <figcaption className="tag">Después</figcaption>
          </figure>
        </div>
        <div className="ba__info">
          <h3>{project.title}</h3>
          <p>{project.summary}</p>
          {project.works ? (
            <ul className="works">
              {project.works.slice(0, 5).map((work) => (
                <li key={work}>{work}</li>
              ))}
            </ul>
          ) : null}
          <div className="btn-row">
            <Link
              href={`/proyectos/${project.slug}`}
              className="btn btn--ghost btn--sm"
              data-track="project_open"
              data-track-place="before-after"
            >
              Ver la obra completa <ArrowRightIcon />
            </Link>
          </div>
          <p className="small muted" style={{ marginTop: 18 }}>
            Mismo espacio, fotos sin retocar. Las de Instagram conservan el rótulo original del vídeo.
          </p>
        </div>
      </div>
    </div>
  );
}
