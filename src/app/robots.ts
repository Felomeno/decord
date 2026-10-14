import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// Demo deployments block all crawlers. Flip site.indexable only for the approved production domain.
export default function robots(): MetadataRoute.Robots {
  if (!site.indexable) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/preview/" },
    sitemap: `${site.siteUrl}/sitemap.xml`,
  };
}
