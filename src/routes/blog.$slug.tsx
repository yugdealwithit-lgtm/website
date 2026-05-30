import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("slug", params.slug)
      .eq("status", "published")
      .maybeSingle();
    if (error || !data) throw notFound();
    return { post: data };
  },
  head: ({ loaderData, params }) => {
    const p = loaderData?.post;
    const title = p?.meta_title || p?.title || "Blog";
    const desc = p?.meta_description || p?.excerpt || "";
    return {
      meta: [
        { title: `${title} — DealWithIt` },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${params.slug}` },
        ...(p?.cover_image_url ? [{ property: "og:image", content: p.cover_image_url }] : []),
      ],
      links: [{ rel: "canonical", href: `/blog/${params.slug}` }],
    };
  },
  notFoundComponent: () => (
    <div style={pageCtr}>
      <h1 style={{ fontSize: 28, marginBottom: 10 }}>Post not found</h1>
      <Link to="/" style={{ color: "#c9a84c" }}>← Back home</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div style={pageCtr}><p>Could not load post: {error.message}</p></div>
  ),
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post } = Route.useLoaderData();
  const date = post.published_at ? new Date(post.published_at).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }) : "";
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#f5f0e0", fontFamily: "system-ui, sans-serif" }}>
      <header style={{ borderBottom: "1px solid #2a2a2a", padding: "18px 28px" }}>
        <Link to="/" style={{ color: "#c9a84c", fontSize: 11, letterSpacing: 2, textDecoration: "none" }}>← DEALWITHIT</Link>
      </header>
      {post.cover_image_url && (
        <div style={{ width: "100%", maxHeight: 460, overflow: "hidden", borderBottom: "1px solid #2a2a2a" }}>
          <img src={post.cover_image_url} alt={post.title} style={{ width: "100%", maxHeight: 460, objectFit: "cover", display: "block" }} />
        </div>
      )}
      <article style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px 96px" }}>
        {post.category && <div style={{ fontSize: 11, letterSpacing: 2, color: "#c9a84c", marginBottom: 14 }}>{post.category.toUpperCase()}</div>}
        <h1 style={{ fontSize: 40, fontWeight: 300, lineHeight: 1.2, marginBottom: 18, fontFamily: "Georgia, serif" }}>{post.title}</h1>
        <div style={{ fontSize: 12, color: "#888", marginBottom: 36, display: "flex", gap: 14 }}>
          {date && <span>{date}</span>}
          {post.read_time && <><span>•</span><span>{post.read_time}</span></>}
        </div>
        {post.excerpt && <p style={{ fontSize: 17, color: "#bbb", lineHeight: 1.7, marginBottom: 32, fontStyle: "italic" }}>{post.excerpt}</p>}
        <div style={{ fontSize: 16, lineHeight: 1.85, color: "#d8d2c2", whiteSpace: "pre-wrap" }}>{post.content}</div>
      </article>
    </div>
  );
}

const pageCtr: React.CSSProperties = { minHeight: "100vh", background: "#0a0a0a", color: "#f5f0e0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "system-ui, sans-serif" };