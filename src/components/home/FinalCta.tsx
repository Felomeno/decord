import Link from "next/link";
import { Frame } from "@/components/Frame";
import { WhatsAppIcon } from "@/components/icons";
import { photos } from "@/content/images";
import { site } from "@/content/site";
import { telUrl, whatsappUrl } from "@/lib/contact";

type Props = {
  title?: string;
  text?: string;
  /** Prefilled WhatsApp message, e.g. quoting the job the visitor was looking at. */
  message?: string;
};

export function FinalCta({
  title = "¿Tienes una reforma en mente?",
  text = "Cuéntanos qué quieres renovar y en qué barrio. Te preparamos un presupuesto sin compromiso.",
  message,
}: Props) {
  return (
    <section className="cta-final" aria-labelledby="cta-final-title">
      <Frame photo={photos.localLed} fill sizes="100vw" decorative />
      <div className="wrap" data-reveal>
        <h2 id="cta-final-title" className="h2 accent-bar center">
          {title}
        </h2>
        <p className="lead">{text}</p>
        <div className="btn-row">
          <Link href="/contacto" className="btn btn--primary" data-track="cta_quote" data-track-place="final-cta">
            Pedir presupuesto
          </Link>
          <a
            href={whatsappUrl(message)}
            className="btn btn--whatsapp"
            target="_blank"
            rel="noopener"
            data-track="cta_whatsapp"
            data-track-place="final-cta"
          >
            <WhatsAppIcon /> Escribir por WhatsApp
          </a>
        </div>
        <p className="cta-final__phone">
          O llama al{" "}
          <a href={telUrl} data-track="cta_phone" data-track-place="final-cta">
            {site.phoneDisplay}
          </a>
        </p>
      </div>
    </section>
  );
}
