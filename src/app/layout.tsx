import type { Metadata, Viewport } from "next";
import { Manrope, Newsreader } from "next/font/google";
import { ActionBar } from "@/components/ActionBar";
import { ClickTracking } from "@/components/ClickTracking";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/content/site";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: "Reformas de baños, cocinas y pisos en Madrid | DecorMG",
    template: "%s | DecorMG Reformas Integrales",
  },
  description:
    "DecorMG hace reformas integrales y parciales en Madrid: baños, cocinas, pisos y locales. Obras reales en Aluche, Las Águilas, Lucero y Villaverde. Presupuesto sin compromiso por WhatsApp.",
  applicationName: "DecorMG Reformas Integrales",
  robots: site.indexable
    ? { index: true, follow: true }
    : { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "DecorMG Reformas Integrales",
    images: [{ url: "/images/cocina-abierta-1.jpg", width: 1200, height: 1600, alt: "Cocina reformada por DecorMG" }],
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#102A43",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${newsreader.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a href="#contenido" className="skip-link">
          Saltar al contenido
        </a>
        <p className="demo-notice">
          <span className="wrap" style={{ display: "block" }}>
            Propuesta de web para DecorMG, pendiente de su aprobación. No es la web oficial.
          </span>
        </p>
        <SiteHeader />
        <main id="contenido" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        <ActionBar />
        <ClickTracking />
      </body>
    </html>
  );
}
