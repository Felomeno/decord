import type { Metadata } from "next";
import { ContactSheet } from "@/components/ContactSheet";
import { ContactBand } from "@/components/home/ContactBand";
import { PageHead } from "@/components/PageHead";
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
        title="Obras"
        large
        photo={photos.cocinaAbierta}
        crumbs={[{ name: "Obras", path: "/proyectos" }]}
        lead={
          <p>
            {projects.length} obras con fotos de DecorMG, agrupadas por tipo. Las que tienen barrio y lista de trabajos
            vienen de sus publicaciones; en el resto describimos solo lo que se ve en las fotos.
          </p>
        }
      />
      {groups.map((group) => (
        <section key={group.kind} className="bg-paper" aria-labelledby={`grupo-${group.kind}`} style={{ paddingBottom: 96 }}>
          <div className="wrap">
            <h2 id={`grupo-${group.kind}`} className="t-h2">
              {kindLabel[group.kind]}
            </h2>
          </div>
          <ContactSheet projects={group.items} />
        </section>
      ))}
      <ContactBand title="¿Tienes una obra parecida?" />
    </>
  );
}
