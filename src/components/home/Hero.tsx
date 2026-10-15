import Link from "next/link";
import { Frame } from "@/components/Frame";
import { StarIcon } from "@/components/icons";
import { photos } from "@/content/images";
import { site } from "@/content/site";

/** One finished job, bright and large, with the promise and the two actions beside it. */
export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__media">
        <Frame photo={photos.cocinaAbierta} fill sizes="(max-width: 899px) 100vw, 50vw" priority />
      </div>
      <Link href="/proyectos/cocina-abierta" className="hero__caption tag tag--dark">
        Obra real: cocina abierta
      </Link>
      <div className="wrap hero__inner">
        <div className="hero__copy">
          <p className="kicker" style={{ ["--i" as string]: 0 }}>
            Reformas integrales en Madrid
          </p>
          <h1 id="hero-title" className="h-hero hero__title">
            Reformas que transforman espacios
          </h1>
          <p className="lead hero__text" style={{ ["--i" as string]: 1 }}>
            Reformas integrales y parciales de baños, cocinas y pisos en Madrid. Mira nuestros trabajos y cuéntanos
            qué quieres renovar.
          </p>
          <div className="btn-row hero__ctas" style={{ ["--i" as string]: 2 }}>
            <Link href="/contacto" className="btn btn--primary" data-track="cta_quote" data-track-place="hero">
              Pedir presupuesto
            </Link>
            <Link href="/proyectos" className="btn btn--ghost" data-track="projects_open" data-track-place="hero">
              Ver nuestros trabajos
            </Link>
          </div>
          <p className="hero__proof" style={{ ["--i" as string]: 3 }}>
            <a href={site.links.googleMaps} target="_blank" rel="noopener">
              <StarIcon /> {site.google.rating} de 5 en Google · {site.google.reviewCount} opiniones
            </a>
            <span>Presupuesto sin compromiso</span>
          </p>
        </div>
      </div>
    </section>
  );
}
