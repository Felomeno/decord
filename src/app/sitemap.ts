import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { site } from "@/content/site";

// Only meaningful once the site is approved and has its own domain (site.indexable).
export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.indexable) return [];
  const paths = [
    "/",
    "/proyectos",
    "/servicios",
    "/nosotros",
    "/contacto",
    ...services.map((s) => `/servicios/${s.slug}`),
    ...projects.map((p) => `/proyectos/${p.slug}`),
  ];
  return paths.map((path) => ({ url: `${site.siteUrl}${path}` }));
}
