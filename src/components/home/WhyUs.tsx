import { Frame } from "@/components/Frame";
import { SectionHead } from "@/components/SectionHead";
import { photos } from "@/content/images";

// Three reasons taken from DecorMG's own material: the range of its published jobs, the way it
// documents them, and what its Google reviewers repeat. No promises of time, price or guarantee.
const reasons = [
  {
    tag: "Obra grande y pequeña",
    title: "Del piso entero al plato de ducha",
    text: "Reformas integrales, baños y cocinas completos, y también el trabajo suelto: una filtración, un poyete, una encimera o una mampara.",
    photo: photos.banoLaton,
    sizes: "(max-width: 899px) 100vw, 58vw",
  },
  {
    tag: "Obra documentada",
    title: "Cada obra, con su antes",
    text: "Publicamos el antes, la obra y el resultado, con el barrio y la lista de trabajos.",
    photo: photos.cocinaObra,
    sizes: "(max-width: 899px) 100vw, 42vw",
  },
  {
    tag: "Lo dicen los clientes",
    title: "Ideas, detalle y casa limpia",
    text: "En Google destacan las ideas de decoración, el cuidado del detalle y que el piso queda limpio al acabar.",
    photo: photos.salon2,
    sizes: "(max-width: 899px) 100vw, 42vw",
  },
];

export function WhyUs() {
  return (
    <section className="sec" aria-labelledby="por-que-title">
      <div className="wrap">
        <SectionHead id="por-que-title" kicker="Por qué elegirnos" title="¿Por qué DecorMG?" />
        <div className="why-grid" data-reveal>
          {reasons.map((reason) => (
            <article key={reason.title} className="pcard">
              <Frame photo={reason.photo} fill sizes={reason.sizes} decorative />
              <span className="tag">{reason.tag}</span>
              <h3>{reason.title}</h3>
              <p>{reason.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
