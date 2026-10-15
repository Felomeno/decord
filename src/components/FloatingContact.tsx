import { site } from "@/content/site";
import { telUrl, whatsappUrl } from "@/lib/contact";
import { PhoneIcon, WhatsAppIcon } from "./icons";

/** Round call (phones only) and WhatsApp buttons, one thumb away on every page. */
export function FloatingContact() {
  return (
    <>
      <a
        href={telUrl}
        className="float float--tel"
        aria-label={`Llamar al ${site.phoneDisplay}`}
        data-track="cta_phone"
        data-track-place="floating"
      >
        <PhoneIcon />
      </a>
      <a
        href={whatsappUrl()}
        className="float float--wa"
        aria-label="Escribir por WhatsApp"
        target="_blank"
        rel="noopener"
        data-track="cta_whatsapp"
        data-track-place="floating"
      >
        <WhatsAppIcon />
      </a>
    </>
  );
}
