import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { C } from "@/lib/site";
import { IMGS } from "@/lib/images";
import { SiteShell } from "@/components/site-shell";

interface PublishedPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  category: string | null;
  read_time: string | null;
  published_at: string | null;
  cover_image_url: string | null;
}

function BlogsPage() {
  const [posts, setPosts] = useState<PublishedPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data } = await supabase
        .from("blogs")
        .select("id,title,slug,excerpt,category,read_time,published_at,cover_image_url")
        .eq("status", "published")
        .order("published_at", { ascending: false });
      if (active) {
        setPosts((data as PublishedPost[] | null) ?? []);
        setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div>
      {/* Hero */}
      <div
        style={{
          background: `linear-gradient(135deg,${C.black},${C.card})`,
          display: "flex",
          alignItems: "flex-end",
          minHeight: "clamp(280px,40vh,360px)",
          paddingTop: 130,
          paddingBottom: 48,
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <div className="reveal" style={{ maxWidth: 1200, margin: "0 auto", width: "100%", padding: "0 clamp(18px,5vw,40px)" }}>
          <div className="sl" style={{ marginBottom: 12 }}>Insights & Updates</div>
          <h1 className="serif" style={{ fontWeight: 300, fontSize: "clamp(40px,7vw,84px)", lineHeight: 1 }}>
            DealWithIt <em className="gold-text">Blogs</em>
          </h1>
          <p style={{ fontSize: 14, color: C.muted, marginTop: 16, maxWidth: 620, lineHeight: 1.8 }}>
            Market insights, buying guides and project updates from the RSC Group Dholera team.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "clamp(36px,5vw,56px) clamp(18px,5vw,40px) clamp(56px,8vw,80px)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))",
          gap: 24,
        }}
      >
        {loading ? (
          <div style={{ color: C.muted, fontSize: 13, padding: "40px 0" }}>Loading posts…</div>
        ) : posts.length === 0 ? (
          <div style={{ color: C.muted, fontSize: 13, padding: "40px 0", gridColumn: "1/-1", textAlign: "center" }}>
            No posts yet. Check back soon.
          </div>
        ) : (
          posts.map((b) => (
            <Link key={b.id} to="/blog/$slug" params={{ slug: b.slug }} style={{ display: "block" }}>
              <article
                className="proj-card"
                style={{ background: C.card, border: `1px solid ${C.border}`, overflow: "hidden", display: "flex", flexDirection: "column", height: "100%", borderRadius: 2 }}
              >
                <div className="proj-card-img" style={{ position: "relative", overflow: "hidden", aspectRatio: "16/9" }}>
                  <img src={b.cover_image_url || IMGS.paradise_cover} alt={b.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top,${C.black}aa 0%,transparent 60%)` }} />
                  {b.category && (
                    <div style={{ position: "absolute", top: 12, left: 12, background: `${C.gold}22`, border: `1px solid ${C.gold}55`, padding: "4px 10px", fontSize: 11, letterSpacing: 1.5, color: C.goldL }}>{b.category}</div>
                  )}
                </div>
                <div style={{ padding: "22px 24px 26px", display: "flex", flexDirection: "column", flex: 1 }}>
                  <div style={{ display: "flex", gap: 14, fontSize: 10, color: C.muted, letterSpacing: 1, marginBottom: 12 }}>
                    <span>{b.published_at ? new Date(b.published_at).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : ""}</span>
                    {b.read_time && (
                      <>
                        <span>•</span>
                        <span>{b.read_time}</span>
                      </>
                    )}
                  </div>
                  <h3 className="serif" style={{ fontSize: 22, fontWeight: 500, lineHeight: 1.3, marginBottom: 12, color: C.white }}>{b.title}</h3>
                  <p style={{ fontSize: 12.5, color: C.muted, lineHeight: 1.8, marginBottom: 18, flex: 1 }}>{b.excerpt || ""}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: C.goldL, fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>
                    <span>Read More</span>
                    <span>→</span>
                  </div>
                </div>
              </article>
            </Link>
          ))
        )}
      </div>

      {/* CTA */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(18px,5vw,40px) clamp(56px,9vw,96px)" }}>
        <div style={{ background: `linear-gradient(135deg,${C.gold}1a,${C.card})`, border: `1px solid ${C.gold}44`, padding: "clamp(28px,5vw,44px)", textAlign: "center", borderRadius: 2 }}>
          <div className="sl" style={{ marginBottom: 12, color: C.goldL }}>Ready to invest?</div>
          <h2 className="serif" style={{ fontSize: "clamp(24px,3.5vw,34px)", fontWeight: 300, marginBottom: 16 }}>
            Talk to a Dholera <em className="gold-text">specialist</em>
          </h2>
          <p style={{ fontSize: 13, color: C.muted, marginBottom: 24, maxWidth: 520, marginLeft: "auto", marginRight: "auto", lineHeight: 1.8 }}>
            Get a personalised site visit and plot availability for Pride, Aerox, Regalia 5 and Elanza 2.
          </p>
          <Link to="/contact" className="btn-gold">Enquire Now</Link>
        </div>
      </div>
    </div>
  );
}

function BlogsRoute() {
  return (
    <SiteShell>
      <BlogsPage />
    </SiteShell>
  );
}

export const Route = createFileRoute("/blogs/")({
  head: () => ({
    meta: [
      { title: "Dholera Investment Blog | Real Estate Insights | DealWithIt" },
      { name: "description", content: "Expert articles on Dholera SIR investment opportunities, plot buying guides, market analysis, and project spotlights by RSC Group Dholera — India's first greenfield smart city." },
      { name: "keywords", content: "dholera investment blog, dholera real estate news, dholera sir 2026, dholera plot buying guide, dholera smart city updates" },
      { property: "og:title", content: "Dholera Investment Blog | Real Estate Insights | DealWithIt" },
      { property: "og:description", content: "Expert articles on Dholera SIR investment, plot buying guides, and project spotlights." },
      { property: "og:url", content: "https://dealwithit.org.in/blogs" },
      { name: "twitter:title", content: "Dholera Investment Blog | Real Estate Insights | DealWithIt" },
      { name: "twitter:description", content: "Expert articles on Dholera SIR investment, plot buying guides, and project spotlights." },
    ],
    links: [
      { rel: "canonical", href: "https://dealwithit.org.in/blogs" },
    ],
  }),
  component: BlogsRoute,
});
