import Link from "next/link";
import { nav, site } from "@/content/site";
import { services } from "@/content/services";
import { telUrl, whatsappUrl } from "@/lib/contact";
import { Brand } from "./Brand";
import { InstagramIcon, PhoneIcon, PinIcon, StarIcon, WhatsAppIcon } from "./icons";

export function SiteFooter() {
  const { address } = site;
  return (
    <footer className="ftr" aria-label="Pie de página">
      <div className="wrap">
        <div className="ftr__grid">
          <div className="ftr__brand">
            <Link href="/" className="brand">
              <Brand />
            </Link>
            <p>Reformas integrales y parciales en la {site.area}: baños, cocinas, pisos y locales.</p>
            <a href={site.links.googleMaps} className="ftr__rating" target="_blank" rel="noopener">
              <StarIcon /> {site.google.rating} de 5 en Google ({site.google.reviewCount} opiniones)
            </a>
            <div className="ftr__social">
              <a href={site.links.instagram} className="icon-btn" target="_blank" rel="noopener" aria-label="Instagram de DecorMG">
                <InstagramIcon />
              </a>
              <a href={whatsappUrl()} className="icon-btn" target="_blank" rel="noopener" aria-label="WhatsApp de DecorMG" data-track="cta_whatsapp" data-track-place="footer">
                <WhatsAppIcon />
              </a>
            </div>
          </div>

          <nav aria-labelledby="ftr-pages">
            <h2 id="ftr-pages">Páginas</h2>
            <ul>
              <li>
                <Link href="/">Inicio</Link>
              </li>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={`/servicios/${service.slug}`}>{service.name}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2>Contacto</h2>
            <ul className="ftr__contact">
              <li>
                <PinIcon />
                <address>
                  {address.street}
                  <br />
                  {address.postalCode} {address.city} ({address.district})
                </address>
              </li>
              <li>
                <PhoneIcon />
                <a href={telUrl} data-track="cta_phone" data-track-place="footer">
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <WhatsAppIcon />
                <a href={whatsappUrl()} target="_blank" rel="noopener" data-track="cta_whatsapp" data-track-place="footer">
                  WhatsApp
                </a>
              </li>
              <li>
                <InstagramIcon />
                <a href={site.links.instagram} target="_blank" rel="noopener">
                  {site.links.instagramHandle}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2>Zona de trabajo</h2>
            <p className="muted">{site.area}. Últimas obras publicadas en:</p>
            <ul style={{ marginTop: 12 }}>
              {site.neighbourhoods.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="ftr__bottom">
          <p>
            Propuesta de web para DecorMG con sus fotos y datos públicos, pendiente de su aprobación. No es la web
            oficial.
          </p>
          <ul>
            <li>
              <Link href="/aviso-legal">Aviso legal</Link>
            </li>
            <li>
              <Link href="/privacidad">Privacidad</Link>
            </li>
            <li>
              <Link href="/cookies">Cookies</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
