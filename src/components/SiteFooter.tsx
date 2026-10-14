import Link from "next/link";
import { nav, site } from "@/content/site";
import { telUrl, whatsappUrl } from "@/lib/contact";
import { ArrowIcon } from "./icons";

export function SiteFooter() {
  const { address } = site;
  return (
    <footer className="footer" aria-label="Pie de página">
      <div className="tile tile--statement">
        <p className="t-lead">Reformas integrales y parciales en la {site.area}.</p>
        <p className="t-small t-muted">
          Propuesta de web preparada para DecorMG con sus fotos y datos públicos. Pendiente de su aprobación: no es
          la web oficial.
        </p>
      </div>

      <nav className="tile tile--nav" aria-label="Pie">
        <ul>
          <li>
            <Link href="/" className="plain-link">
              Inicio
            </Link>
          </li>
          {nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="plain-link">
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <a href={site.links.instagram} className="plain-link" target="_blank" rel="noopener">
              Instagram
            </a>
          </li>
        </ul>
      </nav>

      <div className="tile tile--place">
        <p className="t-small t-muted">Dirección de la ficha de Google</p>
        <address style={{ fontStyle: "normal" }}>
          {address.street}
          <br />
          {address.district}, {address.postalCode} {address.city}
        </address>
      </div>

      <div className="tile tile--phone" style={{ justifyContent: "flex-end" }}>
        <p className="t-small t-muted">Teléfono y WhatsApp</p>
        <a href={telUrl} className="plain-link t-lead" style={{ fontWeight: 600 }} data-track="cta_phone" data-track-place="footer">
          {site.phoneDisplay}
        </a>
      </div>

      <div className="tile tile--brand" aria-hidden>
        <span>DecorMG</span>
      </div>

      <a
        href={whatsappUrl()}
        className="tile tile--cta"
        target="_blank"
        rel="noopener"
        data-track="cta_whatsapp"
        data-track-place="footer"
      >
        <span className="t-h2">Pide presupuesto</span>
        <ArrowIcon />
      </a>

      <div className="tile tile--full t-small">
        <ul style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px" }}>
          <li>
            <Link href="/aviso-legal" className="plain-link">
              Aviso legal
            </Link>
          </li>
          <li>
            <Link href="/privacidad" className="plain-link">
              Privacidad
            </Link>
          </li>
          <li>
            <Link href="/cookies" className="plain-link">
              Cookies
            </Link>
          </li>
          <li className="t-muted">
            Fotos: Instagram, ficha de Google y perfil de Cronoshare de DecorMG. Uso pendiente de autorización.
          </li>
        </ul>
      </div>
    </footer>
  );
}
