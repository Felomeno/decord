// Verified business facts. Source and status for each value: docs/decormg/01-research.md.
// Values marked PENDING are unknown and must not be invented.

export const site = {
  name: "DecorMG",
  legalName: null as string | null, // PENDING: razón social
  taxId: null as string | null, // PENDING: CIF
  email: null as string | null, // PENDING: email de contacto
  descriptor: "Reformas integrales",
  phoneDisplay: "665 84 28 64",
  phoneE164: "+34665842864",
  whatsappNumber: "34665842864",
  address: {
    street: "C. de Quero, 55",
    district: "Latina",
    postalCode: "28024",
    city: "Madrid",
    region: "Comunidad de Madrid",
    country: "ES",
  },
  geo: { lat: 40.3904822, lng: -3.76063 },
  area: "Comunidad de Madrid",
  neighbourhoods: ["Aluche", "Las Águilas", "Lucero", "Villaverde"],
  links: {
    instagram: "https://www.instagram.com/decormg.reformas/",
    instagramHandle: "@decormg.reformas",
    googleMaps:
      "https://www.google.com/maps/place/DecorMG+%7C+Reformas+Integrales+Madrid/@40.3904822,-3.76063,17z/data=!4m6!3m5!1s0xd41893aa779d897:0x4b0a936280087dd6!8m2!3d40.3904822!4d-3.76063!16s%2Fg%2F11zbsjxdyv",
    cronoshare: "https://www.cronoshare.com/croner-5519111-decormg-reformas-integrales",
  },
  google: {
    rating: "4,8",
    reviewCount: 26,
    checkedOn: "15 de octubre de 2026",
  },
  // Demo deployments stay out of search engines. Set NEXT_PUBLIC_SITE_INDEXABLE=true only on the
  // approved production domain (see README).
  indexable: process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

export const nav = [
  { href: "/proyectos", label: "Obras" },
  { href: "/servicios", label: "Servicios" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
] as const;
