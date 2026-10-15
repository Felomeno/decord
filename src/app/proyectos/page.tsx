import type { Metadata } from "next";
import { FinalCta } from "@/components/home/FinalCta";
import { PageHead } from "@/components/PageHead";
import { ProjectGrid } from "@/components/ProjectCard";
import { photos } from "@/content/images";
import { kindLabel, kindOrder, projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Obras de reforma en Madrid",
  description:
    "Obras reales de DecorMG en Madrid: baños en Las Águilas y Lucero, cocinas renovadas, reforma parcial en Aluche y filtraciones en Villaverde. Con su antes y su lista de trabajos.",
  alternates: { canonical: "/proyectos" },
};

export default function ProjectsPage() {
  const groups = kindOrder
    .map((kind) => ({ kind, items: projects.filter((p) => p.kind === kind) }))
    .filter((group) => group.items.length > 0);

  return (
    <>
      <PageHead
        title="Nuestros trabajos"
        kicker="Obras reales"
        photo={photos.banoMarmol}
        crumbs={[{ name: "Obras", path: "/proyectos" }]}
        lead={
          <p>
            Fotos publicadas por DecorMG o subidas por sus clientes a su ficha de Google, agrupadas por tipo. Las obras
            con barrio y lista de trabajos vienen de sus publicaciones; en el resto, la agrupación de fotos es nuestra y
            describimos solo lo que se ve.
          </p>
        }
      />
      {groups.map((group, i) => (
        <section
          key={group.kind}
          className={`sec${i % 2 === 1 ? " sec--alt" : ""}`}
          aria-labelledby={`grupo-${group.kind}`}
        >
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <div className="sec-head__text">
                <p className="kicker">
                  {group.items.length} {group.items.length === 1 ? "obra" : "obras"}
                </p>
                <h2 id={`grupo-${group.kind}`} className="h2 accent-bar">
                  {kindLabel[group.kind]}
                </h2>
              </div>
            </div>
            <ProjectGrid projects={group.items} />
          </div>
        </section>
      ))}
      <FinalCta title="¿Tienes una obra parecida?" />
    </>
  );
}
