import { createFileRoute, Link } from "@tanstack/react-router";
import { C, waMsg } from "@/lib/site";
import { PROJECT_SUMMARIES } from "@/lib/projects";
import { SiteShell } from "@/components/site-shell";
import { WaIcon } from "@/components/icons";

const STATS = [
  { n: "15+", l: "Projects Delivered" },
  { n: "920km²", l: "Smart City Master Plan" },
  { n: "100%", l: "Title Clear" },
  { n: "2010", l: "Pioneers Since" },
];

const TICKER = [
  "RSC Group Dholera",
  "Dholera Triangle Infra",
  "RERA Registered",
  "NA | NOC | Title Clear",
  "EMI Available",
  "365-Day Site Visits",
];

const WHY = [
  { icon: "✈️", t: "Dholera Int'l Airport", d: "Greenfield airport on 1700 acres in Navagam Village" },
  { icon: "🛣️", t: "6-Lane Expressway", d: "109 km Ahmedabad-Dholera Expressway (NH-751)" },
  { icon: "🔬", t: "Semicon City", d: "Tata Electronics — India's first semiconductor FAB plant" },
  { icon: "☀️", t: "5000 MW Solar Park", d: "World's largest solar tracking system by Tata Power" },
  { icon: "🚇", t: "Metro Rail", d: "Gandhinagar to Dholera Smart City connectivity" },
  { icon: "🏭", t: "Industrial Park", d: "DMIC — global manufacturing & trading hub" },
];

function HomePage() {
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
              {STATS.map((s, i) => (
                <div key={s.l} className="stat-anim" style={{ animationDelay: `${0.15 * i + 0.3}s` }}>
                  <div className="serif gold-text" style={{ fontWeight: 600, fontSize: "clamp(26px,3vw,40px)" }}>{s.n}</div>
                  <div style={{ fontSize: 9, color: C.muted, letterSpacing: 1.5, marginTop: 4, textTransform: "uppercase" }}>{s.l}</div>
                </div>
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
                style={{ position: "relative", overflow: "hidden", border: `1px solid ${C.border}`, borderRadius: 2, display: "block", animationDelay: `${0.1 * i + 0.2}s` }}
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
          <div>
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
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="sl" style={{ marginBottom: 10 }}>The Opportunity</div>
            <div className="divl divc" style={{ width: 54, height: 1 }} />
            <h2 className="serif" style={{ fontWeight: 400, fontSize: "clamp(30px,4.5vw,58px)" }}>
              Why Invest in <em className="gold-text">Dholera?</em>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16 }}>
            {WHY.map((m) => (
              <div
                key={m.t}
                style={{ padding: "30px 24px", border: `1px solid ${C.border}`, background: C.black, borderRadius: 2, transition: "border-color .35s, transform .35s, box-shadow .35s", cursor: "default" }}
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
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    border: `1px solid ${C.gold}66`,
                    background: `${C.gold}12`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    marginBottom: 18,
                  }}
                >
                  {m.icon}
                </div>
                <div className="serif" style={{ fontSize: 21, fontWeight: 500, marginBottom: 8 }}>{m.t}</div>
                <div style={{ fontSize: 12.5, color: C.muted, lineHeight: 1.8 }}>{m.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(60px,9vw,100px) clamp(18px,5vw,40px)" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="sl" style={{ marginBottom: 10 }}>Our Portfolio</div>
          <div className="divl divc" style={{ width: 54, height: 1 }} />
          <h2 className="serif" style={{ fontWeight: 400, fontSize: "clamp(30px,4.5vw,58px)" }}>
            Featured <em className="gold-text">Projects</em>
          </h2>
        </div>
        <div className="grid-2">
          {PROJECT_SUMMARIES.map((p) => (
            <Link
              key={p.id}
              to="/projects/$id"
              params={{ id: p.id }}
              className="proj-card"
              style={{ background: C.card, border: `1px solid ${C.border}`, overflow: "hidden", display: "block", borderRadius: 2, borderLeft: `3px solid ${p.color}` }}
            >
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

function HomeRoute() {
  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_LD) }} />
      <HomePage />
    </SiteShell>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Buy Plots in Dholera Smart City | DealWithIt Real Estate" },
      { name: "description", content: "Invest in India's first greenfield smart city. Premium residential & commercial plots in Dholera SIR by RSC Group — NA/NOC certified, 100% title clear. 15+ projects since 2010." },
      { name: "keywords", content: "dholera plots, dholera smart city, residential plots dholera, dholera sir investment, rsc group dholera, buy plot dholera, dholera real estate" },
      { property: "og:title", content: "Buy Plots in Dholera Smart City | DealWithIt Real Estate" },
      { property: "og:description", content: "Premium residential & commercial plots in India's first greenfield smart city. NA/NOC certified, 100% title clear." },
      { property: "og:url", content: "https://dealwithit.org.in/" },
      { name: "twitter:title", content: "Buy Plots in Dholera Smart City | DealWithIt Real Estate" },
      { name: "twitter:description", content: "Premium residential & commercial plots in India's first greenfield smart city. NA/NOC certified, 100% title clear." },
    ],
    links: [
      { rel: "canonical", href: "https://dealwithit.org.in/" },
    ],
  }),
  component: HomeRoute,
});
