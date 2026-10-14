import Link from "next/link";
import { otherWorks, services } from "@/content/services";

/** Book-spine index: the three services with a page lead, the smaller works follow. */
export function ServiceShelf() {
  return (
    <section className="section bg-paper" aria-labelledby="servicios-title">
      <div className="wrap">
        <div className="grid-12 head-row" data-reveal>
          <h2 id="servicios-title" className="t-h2 head-row__title">
            Qué reformamos
          </h2>
          <p className="head-row__note">
            Las tres primeras tienen su página con obras y preguntas. Lo demás también lo hacemos, como parte de una
            reforma o como trabajo suelto.
          </p>
        </div>

        <div className="shelf" data-reveal>
          {services.map((service) => (
            <Link key={service.slug} href={`/servicios/${service.slug}`} className="spine spine--main">
              <span>{service.name}</span>
              <span className="spine__kind">Ver página</span>
            </Link>
          ))}
          {otherWorks.map((work) => (
            <Link key={work} href="/servicios#otros-trabajos" className="spine">
              <span>{work}</span>
              <span className="spine__kind">Trabajo</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
