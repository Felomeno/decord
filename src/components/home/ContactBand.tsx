import { Frame } from "@/components/Frame";
import { MessageBuilder } from "@/components/MessageBuilder";
import { photos } from "@/content/images";
import { site } from "@/content/site";
import { telUrl } from "@/lib/contact";

const strip = [
  photos.banoLaton,
  photos.cocinaDespues,
  photos.aguilasDespues,
  photos.salon1,
  photos.luceroDespues,
  photos.banoMarmol,
  photos.cocinaAbierta,
  photos.villaverdeDespues,
  photos.banoGris,
  photos.aluche,
  photos.localLed,
];

/** Saturated field with a slow photo strip and the three-cell message builder. */
export function ContactBand({ defaultType, title = "Cuéntanos tu obra" }: { defaultType?: string; title?: string }) {
  return (
    <section className="contact-band on-dark" aria-labelledby="contacto-band-title" id="presupuesto">
      <div aria-hidden>
        <div className="marquee">
          {[...strip, ...strip].map((photo, i) => (
            <Frame key={i} photo={photo} height={150} sizes="120px" decorative />
          ))}
        </div>
      </div>
      <div className="wrap" style={{ marginTop: 72 }}>
        <div data-reveal>
          <h2 id="contacto-band-title" className="t-h2">
            {title}
          </h2>
          <p className="t-lead" style={{ marginTop: 16, maxWidth: "40ch", color: "var(--on-dark-muted)" }}>
            Dos datos y se abre WhatsApp con tu mensaje listo. Si prefieres hablar, llama al{" "}
            <a href={telUrl} className="prose-link" data-track="cta_phone" data-track-place="contact-band">
              {site.phoneDisplay}
            </a>
            .
          </p>
        </div>
        <MessageBuilder variant="band" defaultType={defaultType} />
      </div>
    </section>
  );
}
