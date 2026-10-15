import Link from "next/link";
import { getImageProps } from "next/image";
import { StarIcon } from "@/components/icons";
import { heroSlides } from "@/content/hero";
import { site } from "@/content/site";
import { HeroSlideImage } from "./HeroSlideImage";

const SLIDE_SECONDS = 6;

/**
 * Full-screen hero: finished DecorMG jobs crossfade behind the promise, each with a slow push-in
 * (pure CSS, no JS). The first slide is art-directed (landscape kitchen on desktop, portrait on
 * phones) and preloaded as the LCP image; with reduced motion it is the only one shown.
 */
export function Hero() {
  const [first, ...rest] = heroSlides;
  const desktop = first.desktop ?? first.photo;
  const {
    props: { srcSet: desktopSet },
  } = getImageProps({ src: desktop.src, width: desktop.width, height: desktop.height, alt: "", sizes: "100vw" });
  const {
    props: { srcSet: mobileSet, ...img },
  } = getImageProps({
    src: first.photo.src,
    width: first.photo.width,
    height: first.photo.height,
    alt: first.photo.alt,
    sizes: "100vw",
    preload: true,
  });
  const slideStyle = (i: number) =>
    ({
      ["--slide-delay" as string]: `${i * SLIDE_SECONDS - 1.2}s`,
      ["--slide-cycle" as string]: `${heroSlides.length * SLIDE_SECONDS}s`,
      zIndex: i,
    }) as React.CSSProperties;

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__media">
        <div className="hero__slide" style={slideStyle(0)}>
          <picture>
            <source media="(min-width: 768px)" srcSet={desktopSet} />
            <img {...img} srcSet={mobileSet} alt={first.photo.alt} fetchPriority="high" />
          </picture>
          <span className="hero__label tag tag--dark" aria-hidden="true">
            Obra real: {first.label}
          </span>
        </div>
        {rest.map((slide, i) => (
          <div key={slide.photo.src} className="hero__slide" style={slideStyle(i + 1)}>
            <HeroSlideImage photo={slide.photo} />
            <span className="hero__label tag tag--dark" aria-hidden="true">
              Obra real: {slide.label}
            </span>
          </div>
        ))}
      </div>
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
