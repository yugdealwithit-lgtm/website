import { useEffect, useRef, useState, type ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { C, waMsg } from "@/lib/site";
import { PROJECT_SUMMARIES } from "@/lib/projects";
import { SiteShell } from "@/components/site-shell";
import { WaIcon } from "@/components/icons";
import { useReveal } from "@/hooks/use-reveal";

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
      <div style={{ fontSize: 9, color: C.muted, letterSpacing: 1.5, marginTop: 4, textTransform: "uppercase" }}>{l}</div>
    </div>
  );
}

/** Mouse-tracking 3D tilt handlers shared by project cards. */
const onTiltMove = (e: React.MouseEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect();
  const x = ((e.clientX - r.left) / r.width - 0.5) * 12;
  const y = ((e.clientY - r.top) / r.height - 0.5) * -12;
  e.currentTarget.style.transform = `perspective(700px) rotateY(${x}deg) rotateX(${y}deg) scale(1.03)`;
};
const onTiltLeave = (e: React.MouseEvent<HTMLElement>) => {
  e.currentTarget.style.transform = "";
  e.currentTarget.style.transition = "transform 0.6s cubic-bezier(.2,.7,.2,1)";
};

const TICKER = [
  "RSC Group Dholera",
  "Dholera Triangle Infra",
  "RERA Registered",
  "NA | NOC | Title Clear",
  "EMI Available",
  "365-Day Site Visits",
];

const iconSvg = (children: ReactNode): ReactNode => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.goldL} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

interface WhyItem {
  icon: ReactNode;
  t: string;
  d: string;
}

const WHY: WhyItem[] = [
  { icon: iconSvg(<path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />), t: "Dholera Int'l Airport", d: "Greenfield airport on 1700 acres in Navagam Village" },
  { icon: iconSvg(<path d="M1.5 8S3 6 6 6s6 2 9 2 6-2 9-2 4.5 2 4.5 2M1.5 16s1.5-2 4.5-2 6 2 9 2 6-2 9-2 4.5 2 4.5 2" />), t: "6-Lane Expressway", d: "109 km Ahmedabad-Dholera Expressway (NH-751)" },
  { icon: iconSvg(<><rect x="7" y="7" width="10" height="10" rx="1" /><path d="M9 3v4M12 3v4M15 3v4M9 17v4M12 17v4M15 17v4M3 9h4M3 12h4M3 15h4M17 9h4M17 12h4M17 15h4" /></>), t: "Semicon City", d: "Tata Electronics — India's first semiconductor FAB plant" },
  { icon: iconSvg(<><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></>), t: "5000 MW Solar Park", d: "World's largest solar tracking system by Tata Power" },
  { icon: iconSvg(<><rect x="5" y="2" width="14" height="20" rx="5" /><path d="M12 6v4M8 18h8" /><circle cx="9" cy="14" r="1" /><circle cx="15" cy="14" r="1" /></>), t: "Metro Rail", d: "Gandhinagar to Dholera Smart City connectivity" },
  { icon: iconSvg(<path d="M2 20V8l6 4V8l6 4V4l8 4v12H2z" />), t: "Industrial Park", d: "DMIC — global manufacturing & trading hub" },
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
          background: `radial-gradient(ellipse at 18% 40%,rgba(154,123,46,.12) 0%,transparent 55%),radial-gradient(ellipse at 90% 80%,rgba(201,168,76,.06) 0%,transparent 50%),${C.black}`,
        }}
      >
        {/* Animated dot-grid + scan line */}
        <div className="hero-dot-grid" />
        <div className="scan-line" />

        {/* Decorative diagonal lines */}
        <div style={{ position: "absolute", top: 0, right: "26%", width: 1, height: "100%", background: `linear-gradient(to bottom,transparent,${C.gold}33,transparent)` }} />
        <div style={{ position: "absolute", top: 0, right: "12%", width: 1, height: "100%", background: `linear-gradient(to bottom,transparent,${C.gold}1a,transparent)` }} />

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

          {/* 2x2 project card grid — desktop only */}
          <div
            className="hide-mob"
            style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12, alignSelf: "center" }}
          >
            {PROJECT_SUMMARIES.map((p, i) => (
              <Link
                key={p.id}
                to="/projects/$id"
                params={{ id: p.id }}
                className="reveal"
                onMouseMove={onTiltMove}
                onMouseLeave={onTiltLeave}
                style={{ position: "relative", overflow: "hidden", border: `1px solid ${C.border}`, borderRadius: 2, display: "block", animationDelay: `${0.1 * i + 0.2}s`, transition: "transform 0.15s ease" }}
              >
                <img src={p.img} alt={p.name} style={{ width: "100%", height: 180, objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top,${C.black}f2 0%,transparent 55%)` }} />
                <div style={{ position: "absolute", bottom: 0, padding: 14 }}>
                  <div className="serif" style={{ fontSize: 19, fontWeight: 500 }}>{p.name}</div>
                  <div style={{ fontSize: 9, color: p.color, letterSpacing: 1.4, marginTop: 2 }}>{p.loc}</div>
                </div>
                <div style={{ position: "absolute", top: 0, left: 0, width: 3, height: "100%", background: p.color }} />
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
              <span style={{ fontSize: 11, color: C.muted, letterSpacing: 1.5, whiteSpace: "nowrap", textTransform: "uppercase" }}>{t}</span>
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
          <div className="reveal-on-scroll" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16 }}>
            {WHY.map((m) => (
              <div
                key={m.t}
                className="why-card"
                style={{ padding: "30px 24px", border: `1px solid ${C.border}`, background: C.black, borderRadius: 2, transition: "border-color .35s, transform .35s, box-shadow .35s, background .3s", cursor: "default" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${C.gold}88`;
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = `0 18px 44px -20px ${C.gold}55`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = C.border;
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div className="icon-circle">{m.icon}</div>
                <div className="serif" style={{ fontSize: 21, fontWeight: 500, marginBottom: 8 }}>{m.t}</div>
                <div style={{ fontSize: 12.5, color: C.muted, lineHeight: 1.8 }}>{m.d}</div>
              </div>
            ))}
          </div>
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
              onMouseMove={onTiltMove}
              onMouseLeave={onTiltLeave}
              style={{ position: "relative", background: C.card, border: `1px solid ${C.border}`, overflow: "hidden", display: "block", borderRadius: 2, borderLeft: `3px solid ${p.color}`, transition: "transform 0.15s ease" }}
            >
              {/* Glowing corner accent */}
              <div style={{ position: "absolute", top: 0, right: 0, width: 60, height: 60, background: `radial-gradient(circle at top right, ${p.color}33, transparent 70%)`, pointerEvents: "none", zIndex: 1 }} />
              <div className="proj-card-img" style={{ position: "relative", height: 260 }}>
                <img src={p.img} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top,${C.black}dd 0%,transparent 60%)` }} />
                <div style={{ position: "absolute", top: 14, left: 14, fontSize: 9, letterSpacing: 1.5, color: p.color, border: `1px solid ${p.color}`, padding: "4px 10px", background: `${C.black}99`, textTransform: "uppercase" }}>{p.sub}</div>
              </div>
              <div style={{ padding: 26 }}>
                <h3 className="serif" style={{ fontSize: 28, fontWeight: 400, marginBottom: 6 }}>{p.name}</h3>
                <div style={{ fontSize: 10, color: C.gold, letterSpacing: 1.5, marginBottom: 10 }}>📍 {p.loc}</div>
                <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.75, marginBottom: 16 }}>{p.desc}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: p.color, fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>
                  <span>Explore</span>
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
      name: "What is the price of plots in Dholera?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Plot prices in Dholera SIR vary by project and location. RSC Pride (Kasindra) starts from competitive rates with preferred plot premiums of ₹250/sq.yd. RSC Aerox (Pipli) and Regalia 3 (Cher) have premiums from ₹500/sq.yd. Contact us for the latest pricing and available inventory.",
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
        text: "Yes. All RSC Group Dholera plots — Pride, Aerox, Regalia 3, and Paradise — are NA (Non-Agricultural), NOC certified, and 100% title clear with Plan Pass approval. This makes them legally safe for investment and construction.",
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
        text: "RSC Group Dholera offers plots across multiple projects: RSC Pride has 400+ plots of 150–400 sq.yd in Kasindra; Aerox has 350+ plots of 144–430 sq.yd in Pipli; Regalia 3 has 22 exclusive plots of 444.76 sq.yd in Cher; Paradise has 200+ plots of 150–500 sq.yd in Gamph, Dholera.",
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
      { name: "description", content: "DealWithIt Realty offers RERA-approved residential & commercial plots in Dholera SIR, Gujarat — including RSC Pride and Aerox. Clear-title plots, transparent pricing, and end-to-end investment support." },
      { name: "keywords", content: "dholera plots, dholera smart city, residential plots dholera, dholera sir investment, rsc pride dholera, aerox dholera, buy plot dholera, dealwithit realty" },
      { property: "og:title", content: "DealWithIt Realty | RERA-Approved Plots in Dholera SIR – RSC Pride & Aerox" },
      { property: "og:description", content: "RERA-approved residential & commercial plots in Dholera SIR, Gujarat — including RSC Pride and Aerox. Clear-title plots, transparent pricing, and end-to-end investment support." },
      { property: "og:url", content: "https://dealwithit.org.in/" },
      { name: "twitter:title", content: "DealWithIt Realty | RERA-Approved Plots in Dholera SIR – RSC Pride & Aerox" },
      { name: "twitter:description", content: "RERA-approved residential & commercial plots in Dholera SIR, Gujarat — including RSC Pride and Aerox. Clear-title plots, transparent pricing." },
    ],
    links: [
      { rel: "canonical", href: "https://dealwithit.org.in/" },
    ],
  }),
  component: HomeRoute,
});
