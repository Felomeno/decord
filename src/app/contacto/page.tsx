import type { Metadata } from "next";
import { Frame } from "@/components/Frame";
import { PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { BusinessJsonLd } from "@/components/JsonLd";
import { MessageBuilder } from "@/components/MessageBuilder";
import { PageHead } from "@/components/PageHead";
import { photos } from "@/content/images";
import { site } from "@/content/site";
import { telUrl, whatsappUrl } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Pide presupuesto",
  description:
    "Pide presupuesto sin compromiso a DecorMG por WhatsApp o teléfono (665 84 28 64). Reformas de baño, cocina, integrales y trabajos sueltos en Madrid.",
  alternates: { canonical: "/contacto" },
};

export default function ContactPage() {
  const { address } = site;
  return (
    <>
      <BusinessJsonLd />
      <PageHead
        title="Pide presupuesto"
        kicker="Contacto"
        photo={photos.salon2}
        photoDesktopOnly
        crumbs={[{ name: "Contacto", path: "/contacto" }]}
        lead={<p>Rellena lo básico y se abre WhatsApp con tu mensaje escrito. Si prefieres, llama directamente.</p>}
        actions={
          <>
            <a href={telUrl} className="btn btn--ghost" data-track="cta_phone" data-track-place="contact-head">
              <PhoneIcon /> {site.phoneDisplay}
            </a>
            <a
              href={whatsappUrl()}
              className="btn btn--whatsapp"
              target="_blank"
              rel="noopener"
              data-track="cta_whatsapp"
              data-track-place="contact-head"
            >
              <WhatsAppIcon /> WhatsApp sin formulario
            </a>
          </>
        }
      />

      <section className="sec" aria-label="Formulario de presupuesto" style={{ paddingTop: 56 }}>
        <div className="wrap contact-grid">
          <div className="panel">
            <h2 className="h3" style={{ marginBottom: 24 }}>
              Cuéntanos tu obra
            </h2>
            <MessageBuilder variant="full" />
          </div>

          <aside aria-labelledby="despues-title" style={{ display: "grid", gap: 24, alignContent: "start" }}>
            <div className="panel">
              <h2 id="despues-title" className="h3">
                Qué pasa después
              </h2>
              <ol className="steps-list">
                <li>Se abre WhatsApp con tu mensaje. Lo revisas y lo envías tú.</li>
                <li>DecorMG te contesta por ese chat o te llama, según hayas elegido.</li>
                <li>Con los datos de tu obra te preparan un presupuesto sin compromiso.</li>
              </ol>
              <p className="small muted" style={{ marginTop: 20 }}>
                Esta web no guarda lo que escribes: el mensaje viaja solo por tu WhatsApp. No te pedimos la dirección
                completa en este primer contacto.
              </p>
            </div>

            <figure style={{ margin: 0, display: "grid", gridTemplateColumns: "120px 1fr", gap: 16, alignItems: "end" }}>
              <Frame photo={photos.equipo} height={213} sizes="120px" className="media-round" />
              <figcaption className="small muted">Equipo de DecorMG en obra (foto de su Instagram).</figcaption>
            </figure>

            <dl className="facts">
              <div>
                <dt>Dirección de la ficha de Google</dt>
                <dd>
                  {address.street}, {address.district}, {address.postalCode} {address.city}
                </dd>
              </div>
              <div>
                <dt>Zona de trabajo</dt>
                <dd>{site.area}</dd>
              </div>
              <div>
                <dt>Instagram</dt>
                <dd>
                  <a href={site.links.instagram} className="link" target="_blank" rel="noopener">
                    {site.links.instagramHandle}
                  </a>
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>
    </>
  );
}
