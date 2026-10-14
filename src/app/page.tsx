import type { Metadata } from "next";
import Link from "next/link";
import { ContactSheet } from "@/components/ContactSheet";
import { About } from "@/components/home/About";
import { BeforeAfter } from "@/components/home/BeforeAfter";
import { ContactBand } from "@/components/home/ContactBand";
import { Essentials } from "@/components/home/Essentials";
import { FaqText } from "@/components/home/FaqText";
import { Hero } from "@/components/home/Hero";
import { Letter } from "@/components/home/Letter";
import { ProcessRow } from "@/components/home/ProcessRow";
import { ServiceShelf } from "@/components/home/ServiceShelf";
import { BusinessJsonLd } from "@/components/JsonLd";
import { projects } from "@/content/projects";
import { faq } from "@/content/voice";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <BusinessJsonLd />
      <Hero />
      <Essentials />

      <section className="bg-paper" aria-labelledby="obras-title" style={{ paddingBottom: "var(--section)" }}>
        <div className="wrap grid-12 head-row" data-reveal>
          <h2 id="obras-title" className="t-h2 head-row__title">
            Obras publicadas
          </h2>
          <p className="head-row__note">
            Cada obra es una tira de fotos en orden: antes, en obra, después. Son fotos de DecorMG en su Instagram, su
            ficha de Google y su perfil de Cronoshare.{" "}
            <Link href="/proyectos" className="prose-link">
              Ver todas con detalle
            </Link>
          </p>
        </div>
        <ContactSheet projects={projects} bigSlug="cocina-abierta" />
      </section>

      <BeforeAfter />
      <ServiceShelf />
      <ProcessRow />
      <About />
      <Letter flushTop />
      <FaqText items={faq} />
      <ContactBand />
    </>
  );
}
