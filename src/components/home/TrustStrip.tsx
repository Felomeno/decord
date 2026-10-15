import { StarIcon } from "@/components/icons";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

/** The four answers a visitor looks for before scrolling: proof, area, work and how to ask. */
export function TrustStrip() {
  return (
    <section className="trust" aria-label="Datos de confianza">
      <ul className="wrap trust__list">
        <li className="trust__item">
          <span className="trust__value">
            <StarIcon />
            {site.google.rating} de 5
          </span>
          <span className="trust__label">
            <a href={site.links.googleMaps} target="_blank" rel="noopener">
              {site.google.reviewCount} opiniones en Google
            </a>
          </span>
        </li>
        <li className="trust__item">
          <span className="trust__value">Madrid</span>
          <span className="trust__label">Base en Latina, obras en toda la Comunidad</span>
        </li>
        <li className="trust__item">
          <span className="trust__value">{projects.length} obras</span>
          <span className="trust__label">Con fotos reales en esta web</span>
        </li>
        <li className="trust__item">
          <span className="trust__value">Sin compromiso</span>
          <span className="trust__label">Presupuesto por WhatsApp o teléfono</span>
        </li>
      </ul>
    </section>
  );
}
