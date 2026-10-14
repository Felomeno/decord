import type { Metadata } from "next";
import Link from "next/link";
import { ContactSheet } from "@/components/ContactSheet";
import { ContactBand } from "@/components/home/ContactBand";
import { PageHead } from "@/components/PageHead";
import { photos } from "@/content/images";
import { projects } from "@/content/projects";
import { otherWorks, services } from "@/content/services";

export const metadata: Metadata = {
  title: "Servicios de reforma en Madrid",
  description:
    "Reformas de baño, de cocina e integrales en Madrid, y trabajos sueltos: pintura, pladur, alicatados, solados, bañera por plato de ducha, filtraciones, poyetes y locales.",
  alternates: { canonical: "/servicios" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHead
        title="Servicios"
        large
        photo={photos.banoLaton}
        crumbs={[{ name: "Servicios", path: "/servicios" }]}
        lead={<p>Reformas completas y trabajos sueltos en la Comunidad de Madrid. Sin precios cerrados: cada obra se presupuesta con sus datos.</p>}
      />

      {services.map((service, i) => {
        const related = projects.filter((p) => p.service === service.slug).slice(0, 3);
        return (
          <section
            key={service.slug}
            className={i % 2 === 0 ? "bg-ice" : "bg-paper"}
            aria-labelledby={`srv-${service.slug}`}
            style={{ paddingBlock: 96 }}
          >
            <div className="wrap grid-12 head-row" data-reveal>
              <h2 id={`srv-${service.slug}`} className="t-h2 head-row__title">
                <Link href={`/servicios/${service.slug}`} className="plain-link">
                  {service.name}
                </Link>
              </h2>
              <div className="head-row__note">
                <p>{service.intro}</p>
                <p style={{ marginTop: 16 }}>
                  <Link href={`/servicios/${service.slug}`} className="prose-link">
                    Qué incluye, obras y preguntas
                  </Link>
                </p>
              </div>
            </div>
            {related.length ? <ContactSheet projects={related} /> : null}
          </section>
        );
      })}

      <section className="section bg-paper" aria-labelledby="otros-trabajos-title" id="otros-trabajos">
        <div className="wrap grid-12" data-reveal>
          <h2 id="otros-trabajos-title" className="t-h2 essentials__title">
            Otros trabajos
          </h2>
          <div className="essentials__cols">
            <ul>
              <li>También hacemos</li>
              {otherWorks.map((work) => (
                <li key={work}>{work}</li>
              ))}
            </ul>
            <ul>
              <li>Obras publicadas</li>
              <li>
                <Link href="/proyectos/filtraciones-villaverde" className="prose-link">
                  Filtraciones y poyetes, Villaverde
                </Link>
              </li>
              <li>
                <Link href="/proyectos/ducha-lucero" className="prose-link">
                  Plato de ducha, Lucero
                </Link>
              </li>
              <li>
                <Link href="/proyectos/local-techo-led" className="prose-link">
                  Local con techo de luz
                </Link>
              </li>
            </ul>
            <ul>
              <li>Lo que no publicamos</li>
              <li>Precios cerrados ni plazos fijos: dependen de cada obra y se dan en el presupuesto.</li>
            </ul>
          </div>
        </div>
      </section>

      <ContactBand />
    </>
  );
}
