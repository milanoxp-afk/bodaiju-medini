import type { MetadataRoute } from "next";

const SITE_URL = "https://www.bodaijumedini.my";

/**
 * sitemap.xml — auto-generated. Add new routes here when pages are added.
 * lastModified is set at build time so each deploy refreshes freshness signals.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  // Only routes that actually exist — a sitemap pointing at 404s hurts SEO.
  const routes: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1.0, freq: "weekly" },
    { path: "/units", priority: 0.9, freq: "weekly" },
    { path: "/calculator", priority: 0.9, freq: "monthly" },
    { path: "/location", priority: 0.8, freq: "monthly" },
    { path: "/tenure", priority: 0.7, freq: "monthly" },
    { path: "/faq", priority: 0.7, freq: "monthly" },
    { path: "/contact", priority: 0.7, freq: "monthly" },
    { path: "/legal", priority: 0.3, freq: "yearly" },
  ];
  return routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified,
    changeFrequency: r.freq,
    priority: r.priority,
  }));
}
