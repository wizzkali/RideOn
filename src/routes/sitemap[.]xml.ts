import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { fetchProducts } from "@/lib/shopify";
import { LOCALES } from "@/i18n/config";
import { SITE_URL } from "@/lib/seo";

const BASE_URL = SITE_URL;

interface SitemapEntry {
  path: string; // path WITHOUT language prefix, starting with "" for home or "/sub"
  changefreq?: "daily" | "weekly" | "monthly";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const products = await fetchProducts(50).catch(() => []);
        const entries: SitemapEntry[] = [
          { path: "", changefreq: "weekly", priority: "1.0" },
          { path: "/motos", changefreq: "weekly", priority: "0.9" },
          { path: "/pieces", changefreq: "weekly", priority: "0.8" },
          { path: "/location", changefreq: "monthly", priority: "0.7" },
          { path: "/mecanique", changefreq: "monthly", priority: "0.7" },
          { path: "/sav", changefreq: "monthly", priority: "0.6" },
          { path: "/videos", changefreq: "weekly", priority: "0.6" },
          { path: "/b2b", changefreq: "monthly", priority: "0.7" },
          { path: "/a-propos", changefreq: "monthly", priority: "0.5" },
          { path: "/toulouse", changefreq: "monthly", priority: "0.6" },
          { path: "/barcelone", changefreq: "monthly", priority: "0.6" },
          { path: "/leucate", changefreq: "monthly", priority: "0.6" },
          ...products.map((p) => ({
            path: `/product/${p.node.handle}`,
            changefreq: "weekly" as const,
            priority: "0.9",
          })),
        ];

        const urls: string[] = [];
        for (const e of entries) {
          for (const lang of LOCALES) {
            const loc = `${BASE_URL}/${lang}${e.path}`;
            const alternates = LOCALES.map(
              (l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${BASE_URL}/${l}${e.path}"/>`,
            ).join("\n");
            urls.push(
              [
                `  <url>`,
                `    <loc>${loc}</loc>`,
                alternates,
                `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/fr${e.path}"/>`,
                e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
                e.priority ? `    <priority>${e.priority}</priority>` : null,
                `  </url>`,
              ]
                .filter(Boolean)
                .join("\n"),
            );
          }
        }

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});

