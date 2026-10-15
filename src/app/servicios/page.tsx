import type { Metadata } from "next";
import Link from "next/link";
import { Frame } from "@/components/Frame";
import { FinalCta } from "@/components/home/FinalCta";
import { ArrowRightIcon } from "@/components/icons";
import { PageHead } from "@/components/PageHead";
import { ProjectGrid } from "@/components/ProjectCard";
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
        title="Qué reformamos"
        kicker="Servicios"
        photo={photos.banoLaton}
        crumbs={[{ name: "Servicios", path: "/servicios" }]}
        lead={
          <p>
            Reformas completas y trabajos sueltos en la Comunidad de Madrid. Sin precios cerrados: cada obra se
            presupuesta con sus datos.
          </p>
        }
      />

      {services.map((service, i) => {
        const related = projects.filter((p) => p.service === service.slug).slice(0, 3);
        return (
          <section
            key={service.slug}
            className={`sec${i % 2 === 0 ? " sec--alt" : ""}`}
            aria-labelledby={`srv-${service.slug}`}
          >
            <div className="wrap">
              <div className="split" style={{ alignItems: "center", marginBottom: related.length ? 48 : 0 }} data-reveal>
                <Frame photo={service.photo} fill sizes="(max-width: 899px) 100vw, 40vw" className="media-43" decorative />
                <div>
                  <p className="kicker">{service.short}</p>
                  <h2 id={`srv-${service.slug}`} className="h2 accent-bar">
                    {service.name}
                  </h2>
                  <p style={{ marginTop: 22, maxWidth: "60ch" }}>{service.intro}</p>
                  <ul className="works works--cols">
                    {service.includes.map((item) => (
                      <li key={item.title}>{item.title}</li>
                    ))}
                  </ul>
                  <div className="btn-row" style={{ marginTop: 28 }}>
                    <Link href={`/servicios/${service.slug}`} className="btn btn--primary btn--sm">
                      Ver {service.name.toLowerCase()} <ArrowRightIcon />
                    </Link>
                  </div>
                </div>
              </div>
              {related.length ? <ProjectGrid projects={related} /> : null}
            </div>
          </section>
        );
      })}

      <section className="sec sec--pale on-pale" aria-labelledby="otros-trabajos-title" id="otros-trabajos">
        <div className="wrap">
          <div className="sec-head" data-reveal>
            <div className="sec-head__text">
              <p className="kicker">Trabajos sueltos</p>
              <h2 id="otros-trabajos-title" className="h2 accent-bar">
                Otros trabajos
              </h2>
              <p className="muted">
                También como trabajo independiente, sin reformar toda la vivienda. No publicamos precios cerrados ni
                plazos fijos: dependen de cada obra y se dan en el presupuesto.
              </p>
            </div>
          </div>
          <div className="cards cards--3" data-reveal>
            <div className="card">
              <h3>También hacemos</h3>
              <ul className="works">
                {otherWorks.map((work) => (
                  <li key={work}>{work}</li>
                ))}
              </ul>
            </div>
            <div className="card">
              <h3>Obras publicadas</h3>
              <ul className="works">
                <li>
                  <Link href="/proyectos/filtraciones-villaverde" className="link">
                    Filtraciones y poyetes, Villaverde
                  </Link>
                </li>
                <li>
                  <Link href="/proyectos/ducha-lucero" className="link">
                    Plato de ducha, Lucero
                  </Link>
                </li>
                <li>
                  <Link href="/proyectos/local-techo-led" className="link">
                    Local con techo de luz
                  </Link>
                </li>
              </ul>
            </div>
            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
              <Frame photo={photos.localLed} fill sizes="(max-width: 1023px) 100vw, 33vw" className="card-photo" />
            </div>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
