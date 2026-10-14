import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactSheet } from "@/components/ContactSheet";
import { ContactBand } from "@/components/home/ContactBand";
import { FaqText } from "@/components/home/FaqText";
import { PageHead } from "@/components/PageHead";
import { projects } from "@/content/projects";
import { getService, services } from "@/content/services";

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
    <Suspense fallback={<p className="wrap section t-muted">Cargando el servicio…</p>}>
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

  return (
    <>
      <PageHead
        title={service.metaTitle}
        crumbs={[
          { name: "Servicios", path: "/servicios" },
          { name: service.name, path: `/servicios/${service.slug}` },
        ]}
        lead={<p>{service.intro}</p>}
        photo={service.photo}
      />

      <section className="bg-paper" aria-labelledby="incluye-title" style={{ paddingBottom: "var(--section)" }}>
        <div className="wrap grid-12">
          <h2 id="incluye-title" className="t-h2 essentials__title">
            Qué incluye
          </h2>
          <div className="includes col-main" data-reveal>
            {service.includes.map((item) => (
              <div key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {related.length ? (
        <section className="bg-ice section" aria-labelledby="obras-tipo-title">
          <div className="wrap grid-12 head-row">
            <h2 id="obras-tipo-title" className="t-h2 head-row__title">
              Obras de este tipo
            </h2>
            <p className="head-row__note">
              Fotos de obras reales de DecorMG.{" "}
              <Link href="/proyectos" className="prose-link">
                Ver todas las obras
              </Link>
            </p>
          </div>
          <ContactSheet projects={related} />
        </section>
      ) : null}

      <section className="section bg-paper" aria-labelledby="antes-de-pedir-title">
        <div className="wrap grid-12" data-reveal>
          <h2 id="antes-de-pedir-title" className="t-h2 essentials__title">
            Para pedir presupuesto
          </h2>
          <div className="col-main" style={{ maxWidth: "62ch" }}>
            <p>Con tres datos basta para empezar:</p>
            <ul className="works" style={{ marginTop: 16 }}>
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

      <FaqText items={service.faq} title="Preguntas" id="preguntas-servicio" />

      <ContactBand defaultType={service.builderType} title={`Pide presupuesto: ${service.short.toLowerCase()}`} />

      <nav className="wrap t-small" aria-label="Otros servicios" style={{ display: "flex", gap: 24, flexWrap: "wrap", paddingBlock: 48 }}>
        <span className="t-muted">Otros servicios:</span>
        {others.map((s) => (
          <Link key={s.slug} href={`/servicios/${s.slug}`} className="prose-link">
            {s.name}
          </Link>
        ))}
      </nav>
    </>
  );
}
