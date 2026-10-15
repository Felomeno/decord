import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { ProjectGrid } from "@/components/ProjectCard";
import { SectionHead } from "@/components/SectionHead";
import { getProject } from "@/content/projects";

// A mix of finished photos in good resolution and the Instagram jobs that carry neighbourhood
// and work lists.
const featured = [
  "bano-las-aguilas",
  "salon-papel-pintado",
  "bano-laton-y-roble",
  "cocina-antes-despues",
  "bano-gris-espejo-led",
  "reforma-parcial-aluche",
];

export function FeaturedProjects() {
  return (
    <section className="sec" aria-labelledby="obras-title" id="obras">
      <div className="wrap">
        <SectionHead
          id="obras-title"
          kicker="Obras reales"
          title="Nuestros trabajos"
          action={
            <Link href="/proyectos" className="btn btn--ghost btn--sm">
              Ver todas las obras <ArrowRightIcon />
            </Link>
          }
        >
          <p className="muted">
            Fotos publicadas por DecorMG en Instagram, Google y Cronoshare, y fotos que sus clientes subieron a su ficha de
            Google. Cada obra indica si hay foto del antes, de la obra y del resultado.
          </p>
        </SectionHead>
        <ProjectGrid projects={featured.map((slug) => getProject(slug)!)} />
      </div>
    </section>
  );
}
