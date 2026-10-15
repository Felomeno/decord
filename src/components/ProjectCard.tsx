import Link from "next/link";
import { Frame } from "@/components/Frame";
import { kindLabel, type Project } from "@/content/projects";

const stageOrder = ["antes", "en obra", "después"] as const;
const stageText = { antes: "Antes", "en obra": "Obra", después: "Después" } as const;

/** A job: its finished photo, where it is, one line on what changed and which stages have photos. */
export function ProjectCard({ project }: { project: Project }) {
  const cover = project.frames[project.frames.length - 1];
  const stages = stageOrder.filter((stage) => project.frames.some((frame) => frame.stage === stage));
  return (
    <Link href={`/proyectos/${project.slug}`} className="proj" data-track="project_open" data-track-place="card">
      <div className="proj__media">
        <Frame photo={cover.photo} fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw" decorative />
        <span className="tag tag--dark">{kindLabel[project.kind]}</span>
      </div>
      <div className="proj__body">
        <span className="proj__where">{project.neighbourhood ?? "Madrid"}</span>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <ul className="stages" aria-label="Fotos disponibles">
          {stages.map((stage) => (
            <li key={stage} data-stage={stage}>
              {stageText[stage]}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="proj-grid" data-reveal>
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
