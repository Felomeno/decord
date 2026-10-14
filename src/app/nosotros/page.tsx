import type { Metadata } from "next";
import { Frame } from "@/components/Frame";
import { ContactBand } from "@/components/home/ContactBand";
import { Letter } from "@/components/home/Letter";
import { ProcessRow } from "@/components/home/ProcessRow";
import { PageHead } from "@/components/PageHead";
import { photos } from "@/content/images";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "DecorMG es una empresa de reformas de Madrid con base en Latina. Reformas integrales y parciales, con cada obra publicada con su antes.",
  alternates: { canonical: "/nosotros" },
};

const team = [photos.equipo, photos.banoLatonObra1, photos.cocinaObra, photos.banoGrisObra1, photos.localLed];

export default function AboutPage() {
  return (
    <>
      <PageHead
        title="Nosotros"
        crumbs={[{ name: "Nosotros", path: "/nosotros" }]}
        lead={
          <p>
            Empresa de reformas de Madrid con base en Latina. Hacemos la reforma completa y el trabajo pequeño, y
            enseñamos cada obra con su antes.
          </p>
        }
      />

      <section className="bg-paper" aria-labelledby="equipo-title" style={{ paddingBottom: "var(--section)" }}>
        <div className="wrap grid-12 head-row">
          <h2 id="equipo-title" className="t-h2 head-row__title">
            Quién entra en tu casa
          </h2>
          <p className="head-row__note">
            Las fotos son del equipo de DecorMG trabajando, tal como las publica la empresa. Los nombres del equipo se
            añadirán cuando DecorMG los confirme.
          </p>
        </div>
        <div className="wrap" style={{ marginTop: 48 }}>
          <div className="team-strip scroller" role="region" aria-label="Fotos del equipo en obra" tabIndex={0}>
            {team.map((photo) => {
              const h = 360;
              const w = Math.round((photo.width / photo.height) * h);
              return <Frame key={photo.src} photo={photo} height={h} sizes={`${w}px`} />;
            })}
          </div>
        </div>
      </section>

      <section className="section bg-ice" aria-labelledby="como-title">
        <div className="wrap about__row" data-reveal>
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
              <dt>Presupuesto</dt>
              <dd>Sin compromiso</dd>
            </div>
          </dl>
          <div className="about__para">
            <h2 id="como-title" className="t-h2" style={{ marginBottom: 24 }}>
              Cómo trabajamos
            </h2>
            <div className="letter" style={{ maxWidth: "62ch" }}>
              <p>
                Publicamos cada obra con su antes, el barrio y la lista de lo que hicimos. Es nuestra forma de enseñar
                el trabajo: en Las Águilas, Lucero, Aluche o Villaverde, el vecino puede ver qué se hizo cerca de su casa.
              </p>
              <p>
                En sus opiniones de Google, nuestros clientes destacan el trato, el cuidado del detalle, las ideas de
                decoración y que dejamos la casa limpia al terminar.
              </p>
              <p>
                No publicamos precios cerrados ni plazos fijos porque cada obra cambia. Se hablan al preparar el presupuesto, con
                tu caso delante.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ProcessRow />
      <Letter />
      <ContactBand />
    </>
  );
}
