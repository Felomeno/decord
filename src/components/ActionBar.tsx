import { telUrl, whatsappUrl } from "@/lib/contact";
import { PhoneIcon, WhatsAppIcon } from "./icons";

/** Phone-only bar: the two contact channels one thumb away on every page. */
export function ActionBar() {
  return (
    <nav className="action-bar" aria-label="Contacto rápido">
      <a href={telUrl} data-track="cta_phone" data-track-place="action-bar">
        <PhoneIcon /> Llamar
      </a>
      <a href={whatsappUrl()} target="_blank" rel="noopener" data-track="cta_whatsapp" data-track-place="action-bar">
        <WhatsAppIcon /> WhatsApp
      </a>
    </nav>
  );
}
