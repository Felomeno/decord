import Link from "next/link";
import { WhatsAppIcon } from "@/components/icons";
import { LitStrip, type StripItem } from "@/components/home/LitStrip";
import { getProject, type Stage } from "@/content/projects";
import { site } from "@/content/site";
import { telUrl, whatsappUrl } from "@/lib/contact";

// Order of the lit strip: the sharpest finished rooms first, then before/after pairs and work in progress.
const strip: [slug: string, index: number][] = [
  ["bano-laton-y-roble", 3],
  ["cocina-abierta", 0],
  ["bano-las-aguilas", 0],
  ["bano-las-aguilas", 1],
  ["salon-papel-pintado", 0],
  ["bano-marmol-y-madera", 0],
  ["ducha-lucero", 0],
  ["ducha-lucero", 1],
  ["bano-laton-y-roble", 1],
  ["cocina-antes-despues", 0],
  ["cocina-antes-despues", 1],
  ["bano-gris-espejo-led", 2],
  ["local-techo-led", 0],
  ["filtraciones-villaverde", 0],
  ["filtraciones-villaverde", 1],
  ["reforma-parcial-aluche", 0],
];

const stageLabel: Record<Stage, string> = { antes: "Antes", "en obra": "En obra", después: "Después" };

export function Hero() {
  const items: StripItem[] = strip.map(([slug, i]) => {
    const project = getProject(slug)!;
    const frame = project.frames[i];
    return {
      href: `/proyectos/${project.slug}`,
      photo: frame.photo,
      place: project.neighbourhood ?? project.title,
      stage: stageLabel[frame.stage],
    };
  });

  return (
    <section className="hero on-dark" aria-labelledby="hero-title">
      <div className="wrap hero__top">
        <p>Reformas integrales y parciales, con base en Latina (Madrid)</p>
        <a href={telUrl} className="plain-link" data-track="cta_phone" data-track-place="hero">
          Tel. {site.phoneDisplay}
        </a>
      </div>

      <div className="wrap grid-12 hero__bottom">
        <h1 id="hero-title" className="t-display hero__title" data-rise style={{ ["--i" as string]: 0 }}>
          Baños, cocinas y pisos en Madrid
        </h1>
        <div className="hero__aside">
          <p className="t-lead" data-rise style={{ ["--i" as string]: 1 }}>
            Reformamos desde Latina y publicamos cada obra con su antes.
          </p>
          <div className="hero__actions" data-rise style={{ ["--i" as string]: 2 }}>
            <a
              href={whatsappUrl()}
              className="btn btn-primary"
              target="_blank"
              rel="noopener"
              data-track="cta_whatsapp"
              data-track-place="hero"
            >
              <WhatsAppIcon /> Pedir presupuesto
            </a>
            <Link href="/proyectos" className="btn btn-secondary">
              Ver obras
            </Link>
          </div>
        </div>
      </div>

      <LitStrip items={items} />
    </section>
  );
}
