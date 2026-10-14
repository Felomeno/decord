import type { Metadata } from "next";
import { WhatsAppIcon, PhoneIcon } from "@/components/icons";
import { BusinessJsonLd } from "@/components/JsonLd";
import { MessageBuilder } from "@/components/MessageBuilder";
import { PageHead } from "@/components/PageHead";
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
        crumbs={[{ name: "Contacto", path: "/contacto" }]}
        lead={<p>Rellena lo básico y se abre WhatsApp con tu mensaje escrito. Si prefieres, llama directamente.</p>}
      />

      <section className="bg-paper" aria-label="Formulario de presupuesto" style={{ paddingBottom: "var(--section)" }}>
        <div className="wrap grid-12" style={{ rowGap: 64 }}>
          <div className="contact-form-col">
            <MessageBuilder variant="full" />
          </div>

          <aside className="contact-aside" aria-labelledby="despues-title">
            <h2 id="despues-title" className="t-lead" style={{ fontFamily: "var(--font-serif)", fontWeight: 500 }}>
              Qué pasa después
            </h2>
            <ol className="steps">
              <li>Se abre WhatsApp con tu mensaje. Lo revisas y lo envías tú.</li>
              <li>DecorMG te contesta por ese chat o te llama, según hayas elegido.</li>
              <li>Con los datos de tu obra te preparan un presupuesto sin compromiso.</li>
            </ol>
            <p className="t-small t-muted">
              Esta web no guarda lo que escribes: el mensaje viaja solo por tu WhatsApp. No te pedimos la dirección
              completa en este primer contacto.
            </p>

            <h2 className="t-lead" style={{ fontFamily: "var(--font-serif)", fontWeight: 500, marginTop: 40 }}>
              Otras formas
            </h2>
            <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
              <a href={telUrl} className="btn btn-secondary" data-track="cta_phone" data-track-place="contact-page">
                <PhoneIcon /> Llamar al {site.phoneDisplay}
              </a>
              <a
                href={whatsappUrl()}
                className="btn btn-secondary"
                target="_blank"
                rel="noopener"
                data-track="cta_whatsapp"
                data-track-place="contact-page"
              >
                <WhatsAppIcon /> WhatsApp sin formulario
              </a>
            </div>
            <dl className="facts" style={{ marginTop: 32, gridTemplateColumns: "1fr" }}>
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
                  <a href={site.links.instagram} className="prose-link" target="_blank" rel="noopener">
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
