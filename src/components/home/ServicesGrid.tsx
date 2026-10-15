import Link from "next/link";
import { Frame } from "@/components/Frame";
import { ArrowRightIcon } from "@/components/icons";
import { SectionHead } from "@/components/SectionHead";
import { photos } from "@/content/images";
import { services } from "@/content/services";

const service = (slug: string) => services.find((s) => s.slug === slug)!;

// Order alternates wide and narrow cards; the low-resolution photo goes in a narrow one.
const cards = [
  {
    href: "/servicios/reformas-de-banos",
    tag: "Baños",
    title: service("reformas-de-banos").name,
    text: "Baño completo o por partes: fontanería, alicatado, plato de ducha, mampara, muebles y luz.",
    photo: photos.banoMarmol,
    cta: "Ver servicio",
  },
  {
    href: "/servicios/reformas-de-cocinas",
    tag: "Cocinas",
    title: service("reformas-de-cocinas").name,
    text: "Muebles, encimera, electrodomésticos integrados y cocinas abiertas al comedor.",
    photo: photos.cocinaDespues,
    cta: "Ver servicio",
  },
  {
    href: "/servicios#otros-trabajos",
    tag: "Trabajos sueltos",
    title: "Reparaciones y oficios",
    text: "Pintura, pladur, alicatados, solados, filtraciones, poyetes, armarios y locales.",
    photo: photos.villaverdeDespues,
    cta: "Ver otros trabajos",
  },
  {
    href: "/servicios/reformas-integrales",
    tag: "Pisos",
    title: service("reformas-integrales").name,
    text: "El piso entero o varias estancias: suelos, pladur, pintura, iluminación y remates.",
    photo: photos.salon1,
    cta: "Ver servicio",
  },
];

export function ServicesGrid() {
  return (
    <section className="sec sec--alt" aria-labelledby="servicios-title">
      <div className="wrap">
        <SectionHead
          id="servicios-title"
          kicker="Servicios"
          title="Qué reformamos"
          action={
            <Link href="/servicios" className="btn btn--ghost btn--sm">
              Todos los servicios <ArrowRightIcon />
            </Link>
          }
        />
        <div className="svc-grid" data-reveal>
          {cards.map((card, i) => (
            <Link key={card.href} href={card.href} className="pcard" data-track="service_open" data-track-place="home">
              <Frame
                photo={card.photo}
                fill
                sizes={i === 0 || i === 3 ? "(max-width: 767px) 100vw, 58vw" : "(max-width: 767px) 100vw, 42vw"}
                decorative
              />
              <span className="tag">{card.tag}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              <span className="arrow-link">
                {card.cta} <ArrowRightIcon />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
