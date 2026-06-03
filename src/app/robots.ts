import type { MetadataRoute } from "next";

const SITE_URL = "https://www.bodaijumedini.my";

/**
 * robots.txt — allow all reputable crawlers INCLUDING AI search bots.
 * The 2026 SEO/GEO brief is explicit: do NOT block GPTBot, OAI-SearchBot,
 * PerplexityBot, ClaudeBot, etc., or you lose AI-citation eligibility.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // Named AI crawlers, explicitly welcomed.
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
