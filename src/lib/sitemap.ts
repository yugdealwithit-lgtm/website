// Dynamic sitemap generator.
//
// Blog posts live in the `blogs` Supabase table and are published from the
// admin panel WITHOUT a redeploy, so a static public/sitemap.xml goes stale
// immediately. This module builds the sitemap on each request from the live
// DB. It is invoked by the Cloudflare Worker entry (src/server.ts) for the
// GET /sitemap.xml route.
//
// Published blogs are readable by `anon` via RLS, so the public anon client
// is sufficient — no service-role key required.
import { supabase } from "@/integrations/supabase/client";

const SITE_ORIGIN = "https://dealwithit.org.in";

type UrlEntry = {
  loc: string;
  changefreq: string;
  priority: string;
  lastmod?: string;
};

// Static routes that don't change without a redeploy. Project slugs come from
// src/components/nav.tsx (pride, aerox, regalia, paradise).
const STATIC_ROUTES: UrlEntry[] = [
  { loc: "/", changefreq: "weekly", priority: "1.0" },
  { loc: "/projects", changefreq: "weekly", priority: "0.9" },
  { loc: "/projects/pride", changefreq: "monthly", priority: "0.8" },
  { loc: "/projects/aerox", changefreq: "monthly", priority: "0.8" },
  { loc: "/projects/regalia", changefreq: "monthly", priority: "0.8" },
  { loc: "/projects/paradise", changefreq: "monthly", priority: "0.8" },
  { loc: "/blogs", changefreq: "daily", priority: "0.7" },
  { loc: "/contact", changefreq: "monthly", priority: "0.6" },
];

function toIsoDate(value: string | null | undefined): string | undefined {
  if (!value) return undefined;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toISOString().slice(0, 10);
}

function xmlEscape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function renderUrl(e: UrlEntry): string {
  return [
    "  <url>",
    `    <loc>${xmlEscape(`${SITE_ORIGIN}${e.loc}`)}</loc>`,
    e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
    `    <changefreq>${e.changefreq}</changefreq>`,
    `    <priority>${e.priority}</priority>`,
    "  </url>",
  ]
    .filter((line): line is string => line !== null)
    .join("\n");
}

export async function buildSitemapXml(): Promise<string> {
  const entries: UrlEntry[] = [...STATIC_ROUTES];

  try {
    const { data, error } = await supabase
      .from("blogs")
      .select("slug,updated_at,published_at")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (!error && data) {
      for (const row of data as Array<{
        slug: string | null;
        updated_at: string | null;
        published_at: string | null;
      }>) {
        if (!row.slug) continue;
        entries.push({
          loc: `/blog/${row.slug}`,
          changefreq: "monthly",
          priority: "0.6",
          lastmod: toIsoDate(row.updated_at ?? row.published_at),
        });
      }
    }
  } catch {
    // Never let a DB hiccup break the sitemap — fall back to static routes.
  }

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries
    .map(renderUrl)
    .join("\n")}\n</urlset>\n`;
}

export async function handleSitemapRequest(): Promise<Response> {
  const xml = await buildSitemapXml();
  return new Response(xml, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      // Cache for an hour at the edge/browser; new posts appear within 1h.
      "cache-control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
