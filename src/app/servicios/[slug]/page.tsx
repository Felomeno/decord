import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Faq } from "@/components/home/Faq";
import { FinalCta } from "@/components/home/FinalCta";
import { ArrowRightIcon, WhatsAppIcon } from "@/components/icons";
import { PageHead } from "@/components/PageHead";
import { ProjectGrid } from "@/components/ProjectCard";
import { projects } from "@/content/projects";
import { getService, services } from "@/content/services";
import { whatsappUrl } from "@/lib/contact";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps<"/servicios/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/servicios/${service.slug}` },
  };
}

// Params are known at build time (generateStaticParams); the boundary keeps the App Shell URL-free.
export default function ServicePage({ params }: PageProps<"/servicios/[slug]">) {
  return (
    <Suspense fallback={<p className="wrap sec muted">Cargando el servicio…</p>}>
      <ServiceContent params={params} />
    </Suspense>
  );
}

async function ServiceContent({ params }: { params: PageProps<"/servicios/[slug]">["params"] }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = projects.filter((p) => p.service === service.slug);
  const others = services.filter((s) => s.slug !== service.slug);
  const message = `Hola, quiero pedir presupuesto para una ${service.builderType.toLowerCase()}.`;

  return (
    <>
      <PageHead
        title={service.metaTitle}
        kicker="Servicio"
        crumbs={[
          { name: "Servicios", path: "/servicios" },
          { name: service.name, path: `/servicios/${service.slug}` },
        ]}
        lead={<p>{service.intro}</p>}
        photo={service.photo}
        actions={
          <>
            <Link href="/contacto" className="btn btn--primary" data-track="cta_quote" data-track-place="service-head">
              Pedir presupuesto
            </Link>
            <a
              href={whatsappUrl(message)}
              className="btn btn--ghost"
              target="_blank"
              rel="noopener"
              data-track="cta_whatsapp"
              data-track-place="service-head"
            >
              <WhatsAppIcon /> WhatsApp
            </a>
          </>
        }
      />

      <section className="sec" aria-labelledby="incluye-title">
        <div className="wrap">
          <div className="sec-head" data-reveal>
            <div className="sec-head__text">
              <p className="kicker">Qué incluye</p>
              <h2 id="incluye-title" className="h2 accent-bar">
                Trabajos de esta reforma
              </h2>
            </div>
          </div>
          <div className="cards cards--3" data-reveal>
            {service.includes.map((item, i) => (
              <div key={item.title} className="card">
                <span className="card__num" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {related.length ? (
        <section className="sec sec--alt" aria-labelledby="obras-tipo-title">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <div className="sec-head__text">
                <p className="kicker">Obras reales</p>
                <h2 id="obras-tipo-title" className="h2 accent-bar">
                  Obras de este tipo
                </h2>
              </div>
              <Link href="/proyectos" className="btn btn--ghost btn--sm">
                Ver todas las obras <ArrowRightIcon />
              </Link>
            </div>
            <ProjectGrid projects={related} />
          </div>
        </section>
      ) : null}

      <section className="sec sec--pale on-pale" aria-labelledby="antes-de-pedir-title">
        <div className="wrap split">
          <div data-reveal>
            <p className="kicker">Presupuesto</p>
            <h2 id="antes-de-pedir-title" className="h2 accent-bar">
              Para pedir presupuesto
            </h2>
          </div>
          <div className="card" data-reveal>
            <p>Con tres datos basta para empezar:</p>
            <ul className="works">
              {service.before.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <p style={{ marginTop: 20 }}>
              El presupuesto es sin compromiso. Si quieres, puedes mandar fotos del estado actual por el mismo chat.
            </p>
          </div>
        </div>
      </section>

      <Faq items={service.faq} title="Preguntas" id="preguntas-servicio" pale={false} />

      <nav className="wrap" aria-label="Otros servicios" style={{ paddingBottom: 72 }}>
        <div className="btn-row">
          {others.map((s) => (
            <Link key={s.slug} href={`/servicios/${s.slug}`} className="btn btn--ghost btn--sm">
              {s.name} <ArrowRightIcon />
            </Link>
          ))}
        </div>
      </nav>

      <FinalCta title={`¿Pensando en una ${service.builderType.toLowerCase()}?`} message={message} />
    </>
  );
}
