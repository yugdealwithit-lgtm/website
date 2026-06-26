import { useEffect, useState, type ReactNode } from "react";
import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { C } from "@/lib/site";
import { SiteShell } from "@/components/site-shell";

// 301 redirects from deduped/malformed legacy slugs to their canonical post.
// Keeps already-crawled duplicate URLs consolidated instead of 404-ing.
const SLUG_REDIRECTS: Record<string, string> = {
  "dholeraplotprice-2026": "dholera-plot-price-2026",
  "dholera-updates-june-2026": "dholera-smart-city-update-2026",
  "blogsafe-invest-dholera": "is-it-safe-to-invest-in-dholera",
};

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const canonical = SLUG_REDIRECTS[params.slug];
    if (canonical) {
      throw redirect({ to: "/blog/$slug", params: { slug: canonical }, statusCode: 301 });
    }
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
        { property: "og:url", content: `https://dealwithit.org.in/blog/${params.slug}` },
        ...(p?.cover_image_url ? [{ property: "og:image", content: p.cover_image_url }] : []),
      ],
      links: [{ rel: "canonical", href: `https://dealwithit.org.in/blog/${params.slug}` }],
    };
  },
  notFoundComponent: () => (
    <SiteShell>
      <div style={pageCtr}>
        <h1 className="serif" style={{ fontSize: 38, fontWeight: 300, marginBottom: 12 }}>Post not found</h1>
        <Link to="/blogs" style={{ color: C.goldL, fontSize: 12, letterSpacing: 2, textTransform: "uppercase" }}>← Back to all blogs</Link>
      </div>
    </SiteShell>
  ),
  errorComponent: ({ error }) => (
    <SiteShell>
      <div style={pageCtr}><p style={{ color: C.muted }}>Could not load post: {error.message}</p></div>
    </SiteShell>
  ),
  component: BlogPostRoute,
});

function BlogPostRoute() {
  return (
    <SiteShell>
      <BlogPostPage />
    </SiteShell>
  );
}

function BlogPostPage() {
  const { post } = Route.useLoaderData();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? Math.min(100, (h.scrollTop / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })
    : "";

  const blogLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.meta_title || post.title,
    description: post.meta_description || post.excerpt || "",
    ...(post.published_at ? { datePublished: post.published_at } : {}),
    ...(post.updated_at || post.published_at ? { dateModified: post.updated_at || post.published_at } : {}),
    ...(post.cover_image_url ? { image: post.cover_image_url } : {}),
    url: `https://dealwithit.org.in/blog/${post.slug}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://dealwithit.org.in/blog/${post.slug}` },
    author: { "@type": "Organization", name: "DealWithIt Realty", url: "https://dealwithit.org.in/" },
    publisher: {
      "@type": "Organization",
      name: "DealWithIt Realty",
      url: "https://dealwithit.org.in/",
      logo: { "@type": "ImageObject", url: "https://dealwithit.org.in/logo.jpg" },
    },
  };

  return (
    <div style={{ background: C.black }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogLd) }} />
      <BlogStyles />
      <div className="scroll-progress" style={{ width: `${progress}%` }} />

      {/* ── Hero ── */}
      {post.cover_image_url ? (
        <header className="blog-hero">
          <img src={post.cover_image_url} alt={post.title} className="blog-hero-img" />
          <div className="blog-hero-veil" />
          <div className="blog-hero-inner">
            {post.category && <div className="sl" style={{ color: C.goldL, marginBottom: 16 }}>{post.category}</div>}
            <h1 className="serif blog-title">{post.title}</h1>
            <BlogMeta date={date} readTime={post.read_time} />
          </div>
        </header>
      ) : (
        <header className="blog-hero blog-hero--plain">
          <div className="hero-dot-grid" />
          <div className="blog-hero-inner">
            {post.category && <div className="sl" style={{ color: C.goldL, marginBottom: 16 }}>{post.category}</div>}
            <h1 className="serif blog-title">{post.title}</h1>
            <BlogMeta date={date} readTime={post.read_time} />
          </div>
        </header>
      )}

      {/* ── Article ── */}
      <article className="blog-article">
        {post.excerpt && <p className="blog-lead">{post.excerpt}</p>}
        <div className="blog-body">{renderMarkdown(post.content || "")}</div>
      </article>

      {/* ── Closing CTA ── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(18px,5vw,40px) clamp(56px,9vw,96px)" }}>
        <div className="blog-cta">
          <div className="sl" style={{ marginBottom: 12, color: C.goldL }}>Ready to invest?</div>
          <h2 className="serif" style={{ fontSize: "clamp(24px,3.5vw,34px)", fontWeight: 300, marginBottom: 16 }}>
            Talk to a Dholera <em className="gold-text">specialist</em>
          </h2>
          <p style={{ fontSize: 13, color: C.muted, marginBottom: 24, maxWidth: 520, marginLeft: "auto", marginRight: "auto", lineHeight: 1.8 }}>
            Get a personalised site visit, plot availability and pricing for Pride, Aerox, Regalia 5 and Elanza 2.
          </p>
          <Link to="/contact" className="btn-gold">Enquire Now</Link>
          <div style={{ marginTop: 26 }}>
            <Link to="/blogs" style={{ color: C.muted, fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>← Back to all blogs</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function BlogMeta({ date, readTime }: { date: string; readTime: string | null }) {
  return (
    <div className="blog-meta">
      {date && <span>{date}</span>}
      {readTime && (
        <>
          <span className="blog-meta-dot" />
          <span>{readTime}</span>
        </>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Minimal Markdown → React renderer.
   Supports: # / ## / ### headings, paragraphs, **bold**, *italic* / _italic_,
   `code`, [links](url), ![images](url), - / * bullet lists, 1. ordered lists,
   > blockquotes, and --- horizontal rules. Falls back gracefully to clean
   paragraphs for plain text (blank-line separated).
   ────────────────────────────────────────────────────────────────────────── */
function renderMarkdown(src: string): ReactNode[] {
  const lines = src.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;
  let key = 0;
  const k = () => `b${key++}`;

  while (i < lines.length) {
    let line = lines[i];

    // blank line
    if (!line.trim()) { i++; continue; }

    // horizontal rule
    if (/^\s*(-{3,}|\*{3,}|_{3,})\s*$/.test(line)) {
      blocks.push(<hr key={k()} />);
      i++;
      continue;
    }

    // heading
    const h = /^(#{1,3})\s+(.*)$/.exec(line);
    if (h) {
      const text = h[2].trim();
      const lvl = h[1].length;
      if (lvl === 1) blocks.push(<h2 key={k()}>{parseInline(text)}</h2>);
      else if (lvl === 2) blocks.push(<h2 key={k()}>{parseInline(text)}</h2>);
      else blocks.push(<h3 key={k()}>{parseInline(text)}</h3>);
      i++;
      continue;
    }

    // standalone image → figure
    const img = /^!\[([^\]]*)\]\(([^)\s]+)\)\s*$/.exec(line.trim());
    if (img) {
      blocks.push(
        <figure key={k()}>
          <img src={img[2]} alt={img[1]} />
          {img[1] && <figcaption>{img[1]}</figcaption>}
        </figure>,
      );
      i++;
      continue;
    }

    // blockquote
    if (/^\s*>\s?/.test(line)) {
      const quote: string[] = [];
      while (i < lines.length && /^\s*>\s?/.test(lines[i])) {
        quote.push(lines[i].replace(/^\s*>\s?/, ""));
        i++;
      }
      blocks.push(<blockquote key={k()}>{parseInline(quote.join(" "))}</blockquote>);
      continue;
    }

    // unordered list
    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*]\s+/, ""));
        i++;
      }
      blocks.push(
        <ul key={k()}>
          {items.map((it, idx) => <li key={idx}>{parseInline(it)}</li>)}
        </ul>,
      );
      continue;
    }

    // ordered list
    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*\d+\.\s+/, ""));
        i++;
      }
      blocks.push(
        <ol key={k()}>
          {items.map((it, idx) => <li key={idx}>{parseInline(it)}</li>)}
        </ol>,
      );
      continue;
    }

    // paragraph — gather consecutive non-blank, non-special lines
    const para: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^(#{1,3})\s+/.test(lines[i]) &&
      !/^\s*(-{3,}|\*{3,}|_{3,})\s*$/.test(lines[i]) &&
      !/^\s*>\s?/.test(lines[i]) &&
      !/^\s*[-*]\s+/.test(lines[i]) &&
      !/^\s*\d+\.\s+/.test(lines[i])
    ) {
      para.push(lines[i]);
      i++;
    }
    if (para.length) blocks.push(<p key={k()}>{parseInline(para.join(" "))}</p>);
  }

  return blocks;
}

/** Inline Markdown: bold, italic, code, links, images. */
function parseInline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  let buf = "";
  let i = 0;
  let key = 0;
  const flush = () => { if (buf) { out.push(buf); buf = ""; } };

  while (i < text.length) {
    const rest = text.slice(i);
    let m: RegExpExecArray | null;

    if ((m = /^!\[([^\]]*)\]\(([^)\s]+)\)/.exec(rest))) {
      flush();
      out.push(<img key={key++} src={m[2]} alt={m[1]} className="blog-inline-img" />);
      i += m[0].length;
    } else if ((m = /^\[([^\]]+)\]\(([^)\s]+)\)/.exec(rest))) {
      flush();
      const href = m[2];
      const external = /^https?:\/\//.test(href);
      out.push(
        <a key={key++} href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {parseInline(m[1])}
        </a>,
      );
      i += m[0].length;
    } else if ((m = /^\*\*([^*]+)\*\*/.exec(rest)) || (m = /^__([^_]+)__/.exec(rest))) {
      flush();
      out.push(<strong key={key++}>{parseInline(m[1])}</strong>);
      i += m[0].length;
    } else if ((m = /^\*([^*\s][^*]*?)\*/.exec(rest)) || (m = /^_([^_\s][^_]*?)_/.exec(rest))) {
      flush();
      out.push(<em key={key++}>{parseInline(m[1])}</em>);
      i += m[0].length;
    } else if ((m = /^`([^`]+)`/.exec(rest))) {
      flush();
      out.push(<code key={key++}>{m[1]}</code>);
      i += m[0].length;
    } else {
      buf += text[i];
      i++;
    }
  }
  flush();
  return out;
}

function BlogStyles() {
  return (
    <style>{`
      /* ── Hero ── */
      .blog-hero{position:relative;display:flex;align-items:flex-end;min-height:clamp(420px,62vh,580px);overflow:hidden;border-bottom:1px solid ${C.border};}
      .blog-hero-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:saturate(1.02) brightness(.8);}
      .blog-hero-veil{position:absolute;inset:0;background:linear-gradient(to top,${C.black} 0%,${C.black}f2 18%,${C.black}b3 42%,${C.black}66 70%,${C.black}cc 100%);}
      .blog-hero-veil::after{content:"";position:absolute;inset:0;background:linear-gradient(to top,${C.black}cc 0%,transparent 38%);}
      .blog-hero--plain{background:linear-gradient(135deg,${C.black},${C.card});}
      .blog-hero-inner{position:relative;z-index:2;max-width:880px;width:100%;margin:0 auto;padding:0 clamp(18px,5vw,40px) clamp(40px,6vw,64px);}
      .blog-hero--plain .blog-hero-inner{padding-top:150px;}
      .blog-title{font-weight:300;font-size:clamp(34px,6vw,64px);line-height:1.08;color:${C.white};letter-spacing:.3px;margin:0;max-width:18ch;}

      /* ── Meta row ── */
      .blog-meta{display:flex;align-items:center;gap:14px;margin-top:24px;font-family:'Inter',sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${C.muted};}
      .blog-meta-dot{width:4px;height:4px;border-radius:50%;background:${C.gold};}

      /* ── Article wrapper ── */
      .blog-article{max-width:720px;margin:0 auto;padding:clamp(40px,6vw,64px) clamp(20px,5vw,28px) clamp(48px,7vw,72px);}
      .blog-lead{font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(21px,2.6vw,26px);font-style:italic;line-height:1.55;color:#d8d2c2;margin:0 0 40px;padding-bottom:36px;border-bottom:1px solid ${C.border};}

      /* ── Reading body ── */
      .blog-body{font-family:'Inter',system-ui,sans-serif;font-weight:300;font-size:18px;line-height:1.85;color:#cfc9ba;}
      .blog-body p{margin:0 0 26px;}
      .blog-body > p:first-of-type::first-letter{font-family:'Cormorant Garamond',Georgia,serif;float:left;font-size:68px;line-height:.78;padding:8px 14px 0 0;color:${C.goldL};font-weight:500;}
      .blog-body h2{font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:clamp(27px,3.6vw,34px);line-height:1.22;color:${C.white};margin:52px 0 18px;letter-spacing:.2px;}
      .blog-body h3{font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:clamp(22px,2.7vw,27px);line-height:1.3;color:${C.white};margin:40px 0 14px;}
      .blog-body a{color:${C.goldL};text-decoration:none;border-bottom:1px solid rgba(201,168,76,.4);transition:color .2s,border-color .2s;}
      .blog-body a:hover{color:${C.goldB};border-bottom-color:${C.goldB};}
      .blog-body strong{color:${C.white};font-weight:600;}
      .blog-body em{font-style:italic;}
      .blog-body ul,.blog-body ol{margin:0 0 28px;padding:0;list-style:none;}
      .blog-body li{position:relative;padding-left:28px;margin-bottom:13px;}
      .blog-body ul li::before{content:"";position:absolute;left:3px;top:13px;width:6px;height:6px;background:${C.gold};transform:rotate(45deg);}
      .blog-body ol{counter-reset:li;}
      .blog-body ol li::before{counter-increment:li;content:counter(li);position:absolute;left:0;top:-2px;color:${C.goldL};font-family:'Cormorant Garamond',serif;font-size:19px;font-weight:600;}
      .blog-body blockquote{margin:36px 0;padding:4px 0 4px 30px;border-left:2px solid ${C.gold};font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(22px,2.6vw,26px);font-style:italic;line-height:1.5;color:#e8e3d6;}
      .blog-body code{font-family:ui-monospace,SFMono-Regular,monospace;font-size:.85em;background:${C.card};border:1px solid ${C.border};padding:2px 7px;border-radius:3px;color:${C.goldB};}
      .blog-body figure{margin:40px 0;}
      .blog-body figure img{width:100%;border-radius:4px;border:1px solid ${C.border};display:block;}
      .blog-body figcaption{font-size:12px;color:${C.muted};text-align:center;margin-top:11px;letter-spacing:.3px;font-style:italic;}
      .blog-body .blog-inline-img{max-width:100%;border-radius:3px;}
      .blog-body hr{border:none;height:1px;background:linear-gradient(90deg,transparent,${C.gold},transparent);margin:52px auto;width:60%;}

      /* ── Closing CTA ── */
      .blog-cta{background:linear-gradient(135deg,${C.gold}1a,${C.card});border:1px solid ${C.gold}44;padding:clamp(30px,5vw,48px);text-align:center;border-radius:2px;}

      @media(max-width:600px){
        .blog-body{font-size:16.5px;line-height:1.8;}
        .blog-body > p:first-of-type::first-letter{font-size:56px;padding-right:11px;}
      }
    `}</style>
  );
}

const pageCtr: React.CSSProperties = {
  minHeight: "70vh",
  background: C.black,
  color: C.white,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: 24,
  textAlign: "center",
};
