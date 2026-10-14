import { site } from "@/content/site";

const recent = [
  ["Armario recibidor, Las Águilas", "oct 2026"],
  ["Baño completo, Las Águilas", "oct 2026"],
  ["Filtraciones y poyetes, Villaverde", "sep 2026"],
  ["Plato de ducha y mampara, Lucero", "sep 2026"],
  ["Reforma parcial, Aluche", "sep 2026"],
];

/** Side facts and a wide paragraph: who comes into your home. */
export function About() {
  return (
    <section className="section bg-paper" aria-labelledby="nosotros-title">
      <h2 id="nosotros-title" className="sr-only">
        Quién entra en tu casa
      </h2>
      <div className="wrap" style={{ display: "grid", gap: 120 }}>
        <div className="about__row" data-reveal>
          <dl className="facts">
            <div>
              <dt>Base</dt>
              <dd>Latina, Madrid</dd>
            </div>
            <div>
              <dt>Zona</dt>
              <dd>{site.area}</dd>
            </div>
            <div>
              <dt>Contacto</dt>
              <dd>WhatsApp y teléfono</dd>
            </div>
          </dl>
          <p className="t-lead about__para">
            DecorMG es una empresa de reformas de Madrid con base en Latina. Reformamos pisos, baños, cocinas y locales,
            y también hacemos el trabajo pequeño: un plato de ducha, una filtración, un poyete. Las fotos de esta página
            son nuestras, de obras reales, muchas con el operario todavía dentro.
          </p>
        </div>

        <div className="about__row" data-reveal>
          <p className="t-small" style={{ fontWeight: 700 }}>
            Registro
          </p>
          <div className="record">
            <div>
              <h3>Obras publicadas este otoño</h3>
              <ul>
                {recent.map(([what, when]) => (
                  <li key={what}>
                    <span>{what}</span>
                    <span>{when}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Dónde comprobarlo</h3>
              <ul>
                <li>
                  <a href={site.links.instagram} className="prose-link" target="_blank" rel="noopener">
                    Instagram
                  </a>
                  <span>cada obra con su antes</span>
                </li>
                <li>
                  <a href={site.links.googleMaps} className="prose-link" target="_blank" rel="noopener">
                    Google
                  </a>
                  <span>
                    {site.google.rating} de 5, {site.google.reviewCount} opiniones
                  </span>
                </li>
                <li>
                  <a href={site.links.cronoshare} className="prose-link" target="_blank" rel="noopener">
                    Cronoshare
                  </a>
                  <span>perfil y fotos</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
