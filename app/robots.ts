import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/cora", "/motora", "/vertice", "/web", "/site-por-assinatura"],
    },
    sitemap: "https://www.avancini.me/sitemap.xml",
  };
}
