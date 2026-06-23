import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { C, waMsg } from "@/lib/site";
import { PROJECT_SUMMARIES } from "@/lib/projects";
import { SiteShell } from "@/components/site-shell";
import { WaIcon } from "@/components/icons";
import { DholeraCorridor } from "@/components/dholera-corridor";
import { useReveal } from "@/hooks/use-reveal";
import { useMagnetic } from "@/hooks/use-magnetic";

interface Stat {
  n: string;
  suffix?: string;
  l: string;
}

const STATS: Stat[] = [
  { n: "15+", l: "Projects Delivered" },
  { n: "920", suffix: "km²", l: "Smart City Master Plan" },
  { n: "100", suffix: "%", l: "Title Clear" },
  { n: "2010", l: "Pioneers Since" },
];

/** Animates a number from 0 to its target when scrolled into view. */
function StatCounter({ n, suffix, l }: Stat) {
  const ref = useRef<HTMLDivElement>(null);
  const [val, setVal] = useState(0);
  const target = parseInt(n.replace(/[^\d]/g, ""), 10) || 0;
  // Any non-digit chars baked into `n` (e.g. the "+" in "15+") plus the suffix field.
  const tail = n.replace(/[\d]/g, "") + (suffix ?? "");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let started = false;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            started = true;
            obs.unobserve(e.target);
            const dur = 1800;
            const t0 = performance.now();
            const tick = (now: number) => {
              const p = Math.min((now - t0) / dur, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              setVal(Math.round(eased * target));
              if (p < 1) raf = requestAnimationFrame(tick);
            };
            raf = requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target]);

  return (
    <div ref={ref}>
      <div className="serif gold-text" style={{ fontWeight: 600, fontSize: "clamp(26px,3vw,40px)" }}>
        {val}
        {tail}
      </div>
      <div style={{ fontSize: 11, color: C.muted, letterSpacing: 1.2, marginTop: 6, textTransform: "uppercase" }}>{l}</div>
    </div>
  );
}

const TICKER = [
  "RSC Group Dholera",
  "Dholera Triangle Infra",
  "RERA Registered",
  "NA | NOC | Title Clear",
  "EMI Available",
  "365-Day Site Visits",
];


function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{ borderBottom: `1px solid ${C.border}`, transition: "background .25s" }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = `${C.gold}06`)}
      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        style={{ width: "100%", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 4px", gap: 16, textAlign: "left" }}
      >
        <span style={{ fontSize: "clamp(13px,1.3vw,15px)", fontWeight: 500, color: C.white, lineHeight: 1.4 }}>{q}</span>
        <span style={{ color: C.goldL, fontSize: 20, flexShrink: 0, transform: open ? "rotate(45deg)" : "none", transition: "transform .25s" }}>+</span>
      </button>
      {open && (
        <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.85, padding: "0 4px 20px", maxWidth: 740 }}>{a}</p>
      )}
    </div>
  );
}

function HomePage() {
  useReveal();
  const magnetic = useMagnetic();
  return (
    <div>
      {/* ── HERO ── */}
      <section
        style={{
          position: "relative",
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          padding: "120px clamp(18px,5vw,40px) 60px",
          background: `radial-gradient(ellipse 70% 60% at 72% 32%,rgba(201,168,76,.16) 0%,transparent 60%),radial-gradient(ellipse 50% 50% at 8% 88%,rgba(240,212,121,.07) 0%,transparent 55%),${C.black}`,
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr", gap: 48 }} className="hero-grid">
          <div className="reveal" style={{ maxWidth: 620 }}>
            <div className="sl" style={{ marginBottom: 18 }}>Dholera Smart City — India's Future</div>
            <h1
              className="serif"
              style={{ fontWeight: 300, lineHeight: 1.02, letterSpacing: "-1px", marginBottom: 24, fontSize: "clamp(44px,7vw,92px)" }}
            >
              Invest in India's
              <br />
              <em className="gold-shimmer" style={{ fontWeight: 500, fontStyle: "italic" }}>First Greenfield</em>
              <br />
              Smart City
            </h1>
            <p style={{ color: C.muted, lineHeight: 1.9, marginBottom: 32, maxWidth: 460, fontSize: "clamp(13px,1.4vw,16px)" }}>
              Premium residential, commercial & industrial plots in Dholera SIR — along the Delhi-Mumbai Industrial Corridor.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link to="/projects" className="btn-gold">Explore Projects</Link>
              <a href={waMsg("Hi! I'd like to know more about your Dholera real estate projects.")} target="_blank" rel="noreferrer">
                <button className="btn-wa"><WaIcon size={15} />WhatsApp Us</button>
              </a>
            </div>

            {/* Stat counters */}
            <div style={{ display: "flex", gap: "clamp(22px,4vw,40px)", marginTop: 48, paddingTop: 28, borderTop: `1px solid ${C.border}`, flexWrap: "wrap" }}>
              {STATS.map((s) => (
                <StatCounter key={s.l} {...s} />
              ))}
            </div>
          </div>

          {/* 2x2 project card grid — desktop only (4 active projects; sold-out excluded) */}
          <div
            className="hide-mob"
            style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12, alignSelf: "center" }}
          >
            {PROJECT_SUMMARIES.filter((p) => !p.soldOut).slice(0, 4).map((p, i) => (
              <Link
                key={p.id}
                to="/projects/$id"
                params={{ id: p.id }}
                className="reveal mini-card"
                style={{ position: "relative", overflow: "hidden", border: `1px solid ${C.border}`, borderRadius: 4, display: "block", animationDelay: `${0.1 * i + 0.2}s` }}
              >
                <img src={p.img} alt={p.name} style={{ width: "100%", height: 180, objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top,${C.black}f2 0%,transparent 55%)` }} />
                {/* Glowing corner accent (replaces the side-stripe border) */}
                <div style={{ position: "absolute", top: 0, right: 0, width: 48, height: 48, background: `radial-gradient(circle at top right, ${p.color}40, transparent 70%)`, pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: 0, padding: 14 }}>
                  <div className="serif" style={{ fontSize: 20, fontWeight: 500 }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: p.color, letterSpacing: 1.2, marginTop: 3 }}>{p.loc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "15px 0", overflow: "hidden" }}>
        <div className="ticker-track">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="ticker-item">
              <span className="ticker-dot" />
              <span style={{ fontSize: 12, color: C.muted, letterSpacing: 1.3, whiteSpace: "nowrap", textTransform: "uppercase" }}>{t}</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(60px,9vw,100px) clamp(18px,5vw,40px)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "clamp(32px,5vw,64px)", alignItems: "center" }} className="about-grid">
          <div className="reveal-on-scroll">
            <div className="sl" style={{ marginBottom: 10 }}>Who We Are</div>
            <div className="divl" />
            <h2 className="serif" style={{ fontWeight: 400, lineHeight: 1.12, marginBottom: 20, fontSize: "clamp(30px,4.5vw,58px)" }}>
              Building Trust,
              <br />
              <em className="gold-text">Creating Future</em>
            </h2>
            <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.95, marginBottom: 14 }}>
              DealWithIt Real Estate partners with RSC Group Dholera — founded in 2010, pioneers in Dholera SIR. Led by Mr. Ramrajsinh Chudasama (Director, Rtd. Army).
            </p>
            <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.95, marginBottom: 28 }}>
              We offer Residential, Commercial and Industrial land projects — safe investments with high returns in India's most ambitious urban project.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link to="/contact" className="btn-gold">Schedule Site Visit</Link>
              <a href={waMsg("Hi! I'd like to schedule a site visit.")} target="_blank" rel="noreferrer">
                <button className="btn-wa"><WaIcon size={15} />WhatsApp</button>
              </a>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", inset: "-12px -12px auto auto", width: 90, height: 90, borderTop: `1px solid ${C.gold}`, borderRight: `1px solid ${C.gold}` }} />
            <img src={PROJECT_SUMMARIES[0].img} alt="Dholera Mega Projects" style={{ width: "100%", height: "clamp(240px,38vw,420px)", objectFit: "cover", border: `1px solid ${C.border}`, borderRadius: 2 }} />
          </div>
        </div>
      </section>

      {/* ── WHY DHOLERA ── */}
      <section style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(60px,9vw,100px) clamp(18px,5vw,40px)" }}>
          <div className="reveal-on-scroll" style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="sl" style={{ marginBottom: 10 }}>The Opportunity</div>
            <div className="divl divc" style={{ width: 54, height: 1 }} />
            <h2 className="serif" style={{ fontWeight: 400, fontSize: "clamp(30px,4.5vw,58px)" }}>
              Why Invest in <em className="gold-text">Dholera?</em>
            </h2>
          </div>
          <DholeraCorridor />
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(60px,9vw,100px) clamp(18px,5vw,40px)" }}>
        <div className="reveal-on-scroll" style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="sl" style={{ marginBottom: 10 }}>Our Portfolio</div>
          <div className="divl divc" style={{ width: 54, height: 1 }} />
          <h2 className="serif" style={{ fontWeight: 400, fontSize: "clamp(30px,4.5vw,58px)" }}>
            Featured <em className="gold-text">Projects</em>
          </h2>
        </div>
        <div className="grid-2 reveal-on-scroll">
          {PROJECT_SUMMARIES.map((p) => (
            <Link
              key={p.id}
              to="/projects/$id"
              params={{ id: p.id }}
              className="proj-card"
              {...magnetic}
              style={{ position: "relative", background: C.card, border: `1px solid ${C.border}`, overflow: "hidden", display: "block", borderRadius: 4 }}
            >
              {/* Glowing corner accent (carries the project colour without a side-stripe) */}
              <div style={{ position: "absolute", top: 0, right: 0, width: 72, height: 72, background: `radial-gradient(circle at top right, ${p.color}3d, transparent 70%)`, pointerEvents: "none", zIndex: 1 }} />
              <div className="proj-card-img" style={{ position: "relative", height: 260 }}>
                <img src={p.img} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", filter: p.soldOut ? "grayscale(.65) brightness(.7)" : undefined }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top,${C.black}dd 0%,transparent 60%)` }} />
                <div style={{ position: "absolute", top: 14, left: 14, fontSize: 10.5, letterSpacing: 1.3, color: p.color, border: `1px solid ${p.color}`, padding: "5px 11px", background: `${C.black}99`, textTransform: "uppercase", borderRadius: 3 }}>{p.sub}</div>
                {p.soldOut && (
                  <div style={{ position: "absolute", top: 14, right: 14, zIndex: 2, fontSize: 10.5, fontWeight: 600, letterSpacing: 1.6, color: C.white, border: `1px solid ${C.white}88`, padding: "5px 11px", background: `${C.black}cc`, textTransform: "uppercase", borderRadius: 3 }}>Sold Out</div>
                )}
              </div>
              <div style={{ padding: 26 }}>
                <h3 className="serif" style={{ fontSize: 28, fontWeight: 400, marginBottom: 6 }}>{p.name}</h3>
                <div style={{ fontSize: 11, color: C.goldL, letterSpacing: 1.3, marginBottom: 10, display: "flex", alignItems: "center", gap: 7 }}><span style={{ width: 5, height: 5, borderRadius: 2, background: p.color, display: "inline-block" }} />{p.loc}</div>
                <p style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.75, marginBottom: 16 }}>{p.desc}</p>
                <div className="magnetic-btn" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: p.soldOut ? C.muted : p.color, fontSize: 11, letterSpacing: 1.8, textTransform: "uppercase" }}>
                  <span>{p.soldOut ? "View Details" : "Explore"}</span>
                  <span>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 44 }}>
          <Link to="/projects" className="btn-out">View All Projects</Link>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ background: `linear-gradient(135deg,${C.gold}26 0%,${C.black} 48%,${C.goldL}14 100%)`, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "clamp(60px,9vw,100px) clamp(18px,5vw,40px)", textAlign: "center" }}>
          <div className="sl" style={{ marginBottom: 14 }}>Limited Opportunity</div>
          <h2 className="serif" style={{ fontWeight: 300, marginBottom: 18, fontSize: "clamp(30px,4.5vw,56px)", lineHeight: 1.1 }}>
            Think Now, Invest Today
            <br />
            <em className="gold-text">Secure Your Future</em>
          </h2>
          <p style={{ color: C.muted, fontSize: 14, maxWidth: 480, margin: "0 auto 32px", lineHeight: 1.85 }}>
            Early investors in Dholera SIR gain first-mover advantage in India's most ambitious urban project.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/contact" className="btn-gold">Book Free Consultation</Link>
            <a href={waMsg("Hi! I want to book a free consultation for Dholera investment.")} target="_blank" rel="noreferrer">
              <button className="btn-wa"><WaIcon size={15} />Chat on WhatsApp</button>
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ maxWidth: 860, margin: "0 auto", padding: "clamp(60px,9vw,100px) clamp(18px,5vw,40px)" }}>
        <div className="reveal-on-scroll" style={{ textAlign: "center", marginBottom: 52 }}>
          <div className="sl" style={{ marginBottom: 10 }}>Got Questions?</div>
          <div className="divl divc" />
          <h2 className="serif" style={{ fontWeight: 400, fontSize: "clamp(28px,4vw,52px)" }}>
            Frequently Asked <em className="gold-text">Questions</em>
          </h2>
        </div>
        <div className="reveal-on-scroll" style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {FAQ_LD.mainEntity.map((q, i) => (
            <FaqItem key={i} q={q.name} a={q.acceptedAnswer.text} />
          ))}
        </div>
      </section>

      {/* Responsive: 2-column layouts at desktop */}
      <style>{`
        @media(min-width:900px){
          .hero-grid{grid-template-columns:1.1fr .9fr!important;}
          .about-grid{grid-template-columns:1fr 1fr!important;}
        }
      `}</style>
    </div>
  );
}

const ORG_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "RealEstateAgent",
      "@id": "https://dealwithit.org.in/#organization",
      name: "DealWithIt Real Estate",
      url: "https://dealwithit.org.in",

      description: "Premium residential, commercial & industrial plots in Dholera SIR by RSC Group. NA/NOC certified, 100% title clear.",
      telephone: "+919319319501",
      email: "info@dealwithit.org.in",
      foundingDate: "2010",
      areaServed: { "@type": "Place", name: "Dholera, Gujarat, India" },
      address: { "@type": "PostalAddress", addressLocality: "Dholera", addressRegion: "GJ", addressCountry: "IN" },
      sameAs: ["https://instagram.com/dealwithit.realty"],
    },
    {
      "@type": "WebSite",
      "@id": "https://dealwithit.org.in/#website",
      url: "https://dealwithit.org.in",
      name: "DealWithIt Real Estate",
      publisher: { "@id": "https://dealwithit.org.in/#organization" },
      potentialAction: { "@type": "SearchAction", target: { "@type": "EntryPoint", urlTemplate: "https://dealwithit.org.in/blogs?q={search_term_string}" }, "query-input": "required name=search_term_string" },
    },
  ],
};

const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How can I buy plots in Dholera Smart City?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can buy plots in Dholera SIR through DealWithIt Real Estate — an authorised partner of RSC Group Dholera. Contact us via WhatsApp at +91 93193 19501 or book a free site visit through our website. All our plots are NA/NOC certified and 100% title clear.",
      },
    },
    {
      "@type": "Question",
      name: "How can I get pricing for Dholera plots?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Plot pricing in Dholera SIR depends on the project, plot size and exact location. For the latest availability and a current quote across RSC Pride, Aerox, Regalia 5 and Elanza 2, contact DealWithIt on WhatsApp at +91 93193 19501 or book a free site visit.",
      },
    },
    {
      "@type": "Question",
      name: "Is Dholera SIR a good investment in 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Dholera SIR is India's first greenfield smart city and part of the Delhi-Mumbai Industrial Corridor. With the Tata Semiconductor FAB plant, Dholera International Airport, 6-lane NH-751 expressway, and 5000 MW Tata Solar Park all under development, early investors are seeing exceptional appreciation. Plots are 100% title clear with NA/NOC approval.",
      },
    },
    {
      "@type": "Question",
      name: "Are the plots in Dholera NA and NOC certified?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All RSC Group Dholera plots — Pride, Aerox, Regalia 5, Elanza 2, and Paradise — are NA (Non-Agricultural), NOC certified, and 100% title clear with Plan Pass approval. This makes them legally safe for investment and construction.",
      },
    },
    {
      "@type": "Question",
      name: "How far is Dholera from Ahmedabad?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dholera SIR is approximately 100 km south of Ahmedabad, connected via the 109 km six-lane Ahmedabad-Dholera Expressway (NH-751). The drive takes under 90 minutes. Future metro connectivity from Gandhinagar to Dholera will further reduce travel time.",
      },
    },
    {
      "@type": "Question",
      name: "Is EMI available for Dholera plots?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, EMI options are available on RSC Group Dholera plots. Contact DealWithIt Real Estate at +91 93193 19501 to discuss flexible payment plans tailored to your budget.",
      },
    },
    {
      "@type": "Question",
      name: "What plot sizes are available in Dholera?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "RSC Group Dholera offers plots across multiple projects: RSC Pride has 400+ plots of 150–400 sq.yd in Kasindra; Aerox has 350+ plots of 144–430 sq.yd in Pipli; Regalia 5 has 22 exclusive plots of 444.76 sq.yd in Cher; plus the newly launched Elanza 2 in Dholera SIR.",
      },
    },
    {
      "@type": "Question",
      name: "Who is RSC Group Dholera?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "RSC Group Dholera is a pioneer real estate developer in Dholera SIR, founded in 2010 and led by Mr. Ramrajsinh Chudasama (Director, Rtd. Army). With 15+ successful projects in Dholera, RSC Group is one of the most trusted names in Dholera Smart City real estate.",
      },
    },
  ],
};

function HomeRoute() {
  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />
      <HomePage />
    </SiteShell>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DealWithIt Realty | RERA-Approved Plots in Dholera SIR – RSC Pride & Aerox" },
      { name: "description", content: "DealWithIt Realty offers RERA-approved residential & commercial plots in Dholera SIR, Gujarat — including RSC Pride and Aerox. Clear-title plots, transparent process, and end-to-end investment support." },
      { name: "keywords", content: "dholera plots, dholera smart city, residential plots dholera, dholera sir investment, rsc pride dholera, aerox dholera, buy plot dholera, dealwithit realty" },
      { property: "og:title", content: "DealWithIt Realty | RERA-Approved Plots in Dholera SIR – RSC Pride & Aerox" },
      { property: "og:description", content: "RERA-approved residential & commercial plots in Dholera SIR, Gujarat — including RSC Pride and Aerox. Clear-title plots, transparent process, and end-to-end investment support." },
      { property: "og:url", content: "https://dealwithit.org.in/" },
      { name: "twitter:title", content: "DealWithIt Realty | RERA-Approved Plots in Dholera SIR – RSC Pride & Aerox" },
      { name: "twitter:description", content: "RERA-approved residential & commercial plots in Dholera SIR, Gujarat — including RSC Pride and Aerox. Clear-title plots, transparent process." },
    ],
    links: [
      { rel: "canonical", href: "https://dealwithit.org.in/" },
    ],
  }),
  component: HomeRoute,
});
