import { SectionHead } from "@/components/SectionHead";
import { getProject } from "@/content/projects";
import { BeforeAfterViewer } from "./BeforeAfterViewer";

const pairs = [
  { slug: "bano-las-aguilas", label: "Baño en Las Águilas" },
  { slug: "cocina-antes-despues", label: "Cocina" },
  { slug: "ducha-lucero", label: "Ducha en Lucero" },
  { slug: "filtraciones-villaverde", label: "Poyetes en Villaverde" },
];

export function BeforeAfter() {
  return (
    <section className="sec sec--alt" aria-labelledby="antes-title">
      <div className="wrap">
        <SectionHead id="antes-title" kicker="Transformación" title="Antes y después">
          <p className="muted">Cuatro obras con foto del antes y del resultado en el mismo espacio.</p>
        </SectionHead>
        <div className="ba-track" data-reveal>
          <BeforeAfterViewer projects={pairs.map((p) => getProject(p.slug)!)} labels={pairs.map((p) => p.label)} />
        </div>
      </div>
    </section>
  );
}
