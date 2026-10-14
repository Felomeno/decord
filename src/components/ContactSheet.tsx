import Link from "next/link";
import { Frame } from "@/components/Frame";
import type { Project } from "@/content/projects";

type Props = {
  projects: Project[];
  /** Slug shown once, enlarged, interrupting the sheet with its own text beside it. */
  bigSlug?: string;
};

const FRAME_H = 168;
const BIG_H = 560;

/**
 * The contact sheet: every job as a run of frames in reading order (before, during, after),
 * titled above and summarised below. Hovering or focusing a run dims the others (CSS only).
 */
export function ContactSheet({ projects, bigSlug }: Props) {
  return (
    <div className="sheet">
      {projects.map((project) => {
        const big = project.slug === bigSlug;
        const h = big ? BIG_H : FRAME_H;
        return (
          <Link
            key={project.slug}
            href={`/proyectos/${project.slug}`}
            className={`run${big ? " run--big" : ""}`}
            data-track="project_open"
            data-track-place="sheet"
          >
            <span className="run__title">
              {project.title}
              {project.published ? <span>{project.published}</span> : null}
            </span>
            <div className="run__frames">
              {project.frames.map((frame, i) => {
                const w = Math.round((frame.photo.width / frame.photo.height) * h);
                return <Frame key={i} photo={frame.photo} height={h} sizes={`${w}px`} decorative={i > 0} />;
              })}
            </div>
            <span className="run__summary">{project.summary}</span>
          </Link>
        );
      })}
    </div>
  );
}
