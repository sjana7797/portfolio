import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site"

/**
 * Served at /robots.txt.
 *
 * AI crawlers are listed explicitly and allowed. That's the deliberate
 * choice for a portfolio: being quotable by answer engines is the point,
 * so GPTBot / ClaudeBot / PerplexityBot / Google-Extended get the same
 * access as Googlebot. Flip any of these to `disallow: "/"` if you ever
 * want the opposite.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-User",
          "Claude-SearchBot",
          "anthropic-ai",
          "PerplexityBot",
          "Perplexity-User",
          "Google-Extended",
          "Applebot",
          "Applebot-Extended",
          "Bingbot",
          "DuckDuckBot",
          "CCBot",
          "meta-externalagent",
          "cohere-ai",
        ],
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
