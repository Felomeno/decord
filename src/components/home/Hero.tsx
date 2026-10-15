import Link from "next/link";
import { getImageProps } from "next/image";
import { StarIcon } from "@/components/icons";
import { hero } from "@/content/hero";
import { site } from "@/content/site";
import { HeroVideo } from "./HeroVideo";

/**
 * Full-screen hero: a real job behind the promise. The poster photo (landscape on desktop,
 * portrait on phones) is the LCP image; the background loop plays over it once DecorMG footage
 * is listed in content/hero.ts.
 */
export function Hero() {
  const { poster, caption, video } = hero;
  const {
    props: { srcSet: desktopSet },
  } = getImageProps({ src: poster.desktop.src, width: poster.desktop.width, height: poster.desktop.height, alt: "", sizes: "100vw" });
  const {
    props: { srcSet: mobileSet, ...img },
  } = getImageProps({
    src: poster.mobile.src,
    width: poster.mobile.width,
    height: poster.mobile.height,
    alt: poster.alt,
    sizes: "100vw",
    preload: true,
  });

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__media">
        <picture>
          <source media="(min-width: 768px)" srcSet={desktopSet} />
          <img {...img} srcSet={mobileSet} alt={poster.alt} fetchPriority="high" />
        </picture>
        {video.length ? <HeroVideo sources={video} /> : null}
      </div>
      <Link href={caption.desktop.href} className="hero__caption hero__caption--desk tag tag--dark">
        {caption.desktop.text}
      </Link>
      <Link href={caption.mobile.href} className="hero__caption hero__caption--mob tag tag--dark">
        {caption.mobile.text}
      </Link>
      <div className="wrap hero__inner">
        <div className="hero__copy">
          <p className="kicker">Reformas integrales en Madrid</p>
          <h1 id="hero-title" className="h-hero hero__title">
            Reformas que transforman espacios
          </h1>
          <p className="lead hero__text">
            Reformas integrales y parciales de baños, cocinas y pisos en Madrid. Mira nuestros trabajos y cuéntanos
            qué quieres renovar.
          </p>
          <div className="btn-row hero__ctas">
            <Link href="/contacto" className="btn btn--primary" data-track="cta_quote" data-track-place="hero">
              Pedir presupuesto
            </Link>
            <Link href="/proyectos" className="btn btn--ghost" data-track="projects_open" data-track-place="hero">
              Ver nuestros trabajos
            </Link>
          </div>
          <p className="hero__proof">
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
