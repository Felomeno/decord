import { StarIcon } from "@/components/icons";
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
          <span className="trust__label">Base en Latina, trabaja en la Comunidad de Madrid</span>
        </li>
        <li className="trust__item">
          <span className="trust__value">Obras reales</span>
          <span className="trust__label">Fotos de DecorMG y de sus clientes</span>
        </li>
        <li className="trust__item">
          <span className="trust__value">Sin compromiso</span>
          <span className="trust__label">Presupuesto por WhatsApp o teléfono</span>
        </li>
      </ul>
    </section>
  );
}
