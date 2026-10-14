import { site } from "@/content/site";
import { telUrl, whatsappUrl } from "@/lib/contact";

const works = [
  "Fontanería",
  "Electricidad",
  "Alicatados y solados",
  "Pladur y pintura",
  "Bañera por plato de ducha",
  "Mamparas y muebles de baño",
  "Encimeras y cocinas",
  "Iluminación LED",
  "Filtraciones y poyetes",
  "Armarios y puertas correderas",
];

/** "Plain names in columns": where, what and how to reach them, with no boxes. */
export function Essentials() {
  return (
    <section className="section bg-paper" aria-labelledby="esencial-title">
      <div className="wrap grid-12" data-reveal>
        <h2 id="esencial-title" className="t-h2 essentials__title">
          Dónde y qué
        </h2>
        <div className="essentials__cols">
          <ul>
            <li>Obras publicadas en</li>
            {site.neighbourhoods.map((n) => (
              <li key={n}>{n}</li>
            ))}
            <li>y el resto de la {site.area}</li>
          </ul>
          <ul>
            <li>Trabajos que hacemos</li>
            {works.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
          <ul>
            <li>Contacto</li>
            <li>
              <a href={whatsappUrl()} className="prose-link" target="_blank" rel="noopener" data-track="cta_whatsapp" data-track-place="essentials">
                WhatsApp
              </a>
            </li>
            <li>
              <a href={telUrl} className="prose-link" data-track="cta_phone" data-track-place="essentials">
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={site.links.instagram} className="prose-link" target="_blank" rel="noopener">
                {site.links.instagramHandle}
              </a>
            </li>
          </ul>
          <ul>
            <li>Opiniones en Google</li>
            <li>
              <a href={site.links.googleMaps} className="prose-link" target="_blank" rel="noopener">
                {site.google.rating} de 5, {site.google.reviewCount} opiniones
              </a>
            </li>
            <li className="t-small t-muted" style={{ color: "var(--muted)" }}>
              Consultado el {site.google.checkedOn}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
