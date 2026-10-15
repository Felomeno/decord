import type { Metadata } from "next";
import { Frame } from "@/components/Frame";
import { FinalCta } from "@/components/home/FinalCta";
import { Process } from "@/components/home/Process";
import { Reviews } from "@/components/home/Reviews";
import { PageHead } from "@/components/PageHead";
import { photos } from "@/content/images";
import { site } from "@/content/site";
import { moments } from "@/content/voice";

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
        title="Quién entra en tu casa"
        kicker="Nosotros"
        photo={photos.cocinaObra}
        crumbs={[{ name: "Nosotros", path: "/nosotros" }]}
        lead={
          <p>
            Empresa de reformas de Madrid con base en Latina. Hacemos la reforma completa y el trabajo pequeño, y
            enseñamos cada obra con su antes.
          </p>
        }
      />

      <section className="sec" aria-labelledby="como-title">
        <div className="wrap split">
          <dl className="facts" data-reveal>
            <div>
              <dt>Base</dt>
              <dd>Latina, Madrid</dd>
            </div>
            <div>
              <dt>Zona</dt>
              <dd>{site.area}</dd>
            </div>
            <div>
              <dt>Últimas obras</dt>
              <dd>{site.neighbourhoods.join(", ")}</dd>
            </div>
            <div>
              <dt>Presupuesto</dt>
              <dd>Sin compromiso</dd>
            </div>
          </dl>
          <div data-reveal>
            <p className="kicker">Cómo trabajamos</p>
            <h2 id="como-title" className="h2 accent-bar">
              Obra a la vista
            </h2>
            <div style={{ display: "grid", gap: 16, marginTop: 28, maxWidth: "62ch" }}>
              <p>
                Publicamos cada obra con su antes, el barrio y la lista de lo que hicimos. Es nuestra forma de enseñar
                el trabajo: en Las Águilas, Lucero, Aluche o Villaverde, el vecino puede ver qué se hizo cerca de su
                casa.
              </p>
              <p className="muted">
                En sus opiniones de Google, nuestros clientes destacan el trato, el cuidado del detalle, las ideas de
                decoración y que dejamos la casa limpia al terminar.
              </p>
              <p className="muted">
                No publicamos precios cerrados ni plazos fijos porque cada obra cambia. Se hablan al preparar el
                presupuesto, con tu caso delante.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec sec--alt" aria-labelledby="equipo-title">
        <div className="wrap">
          <div className="sec-head" data-reveal>
            <div className="sec-head__text">
              <p className="kicker">Equipo</p>
              <h2 id="equipo-title" className="h2 accent-bar">
                En obra
              </h2>
              <p className="muted">
                Fotos del equipo de DecorMG trabajando, tal como las publica la empresa. Los nombres se añadirán cuando
                DecorMG los confirme.
              </p>
            </div>
          </div>
          <div className="team-strip scroller" role="region" aria-label="Fotos del equipo en obra" tabIndex={0}>
            {team.map((photo) => {
              const w = Math.round((photo.width / photo.height) * 360);
              return <Frame key={photo.src} photo={photo} height={360} sizes={`${w}px`} />;
            })}
          </div>
        </div>
      </section>

      <Process
        items={moments}
        id="fases-title"
        kicker="Paso a paso"
        title="Cómo avanza una obra"
        intro="Contado con fotos de obras de DecorMG, desde el primer mensaje hasta la entrega."
      />
      <Reviews />
      <FinalCta />
    </>
  );
}
