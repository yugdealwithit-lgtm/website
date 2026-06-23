import { createFileRoute, Link } from "@tanstack/react-router";
import { C } from "@/lib/site";
import { PROJECT_SUMMARIES } from "@/lib/projects";
import { SiteShell } from "@/components/site-shell";
import { useMagnetic } from "@/hooks/use-magnetic";

function ProjectsPage() {
  const magnetic = useMagnetic();
  return (
    <div>
      {/* Hero */}
      <div
        style={{
          background: `linear-gradient(135deg,${C.black},${C.card})`,
          display: "flex",
          alignItems: "flex-end",
          minHeight: "clamp(280px,40vh,360px)",
          paddingBottom: 48,
          paddingTop: 130,
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <div className="reveal" style={{ maxWidth: 1200, margin: "0 auto", width: "100%", padding: "0 clamp(18px,5vw,40px)" }}>
          <div className="sl" style={{ marginBottom: 12 }}>RSC Group Dholera</div>
          <h1 className="serif" style={{ fontWeight: 300, fontSize: "clamp(40px,7vw,84px)", lineHeight: 1 }}>
            Our <em className="gold-text">Projects</em>
          </h1>
          <p style={{ fontSize: 14, color: C.muted, marginTop: 16, maxWidth: 560, lineHeight: 1.8 }}>
            A curated portfolio of residential, commercial and township plots across Dholera Smart City.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(36px,5vw,56px) clamp(18px,5vw,40px) clamp(56px,8vw,88px)", display: "grid", gap: 22 }}>
        {PROJECT_SUMMARIES.map((p, idx) => (
          <Link
            key={p.id}
            to="/projects/$id"
            params={{ id: p.id }}
            className="proj-card project-row"
            data-flip={idx % 2 === 1 ? "true" : "false"}
            {...magnetic}
            style={{ background: C.card, border: `1px solid ${C.border}`, overflow: "hidden", display: "grid", gridTemplateColumns: "1fr", borderRadius: 4 }}
          >
            <div className="proj-card-img project-img" style={{ position: "relative", overflow: "hidden", minHeight: 220 }}>
              <img src={p.img} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0, filter: p.soldOut ? "grayscale(.65) brightness(.7)" : undefined }} />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top,${C.black}88 0%,transparent 60%)` }} />
              {p.soldOut ? (
                <div style={{ position: "absolute", top: 14, right: 14, background: `${C.black}cc`, border: `1px solid ${C.white}88`, padding: "4px 11px", fontSize: 11, fontWeight: 600, letterSpacing: 1.5, color: C.white, textTransform: "uppercase" }}>Sold Out</div>
              ) : (
                <div style={{ position: "absolute", top: 14, right: 14, background: `${p.color}22`, border: `1px solid ${p.color}55`, padding: "4px 10px", fontSize: 11, letterSpacing: 1.5, color: p.color }}>Available</div>
              )}
            </div>
            <div style={{ padding: "clamp(22px,3vw,40px)" }}>
              <div style={{ fontSize: 11, letterSpacing: 2, color: p.color, border: `1px solid ${p.color}44`, display: "inline-block", padding: "4px 11px", marginBottom: 14, textTransform: "uppercase" }}>{p.cat}</div>
              <h2 className="serif" style={{ fontWeight: 400, marginBottom: 8, fontSize: "clamp(30px,3.5vw,44px)" }}>{p.name}</h2>
              <div style={{ fontSize: 12, color: C.goldL, letterSpacing: 1.3, marginBottom: 14, display: "flex", alignItems: "center", gap: 7 }}><span style={{ width: 5, height: 5, borderRadius: 2, background: p.color, display: "inline-block" }} />{p.loc}</div>
              <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.8, marginBottom: 18 }}>{p.desc}</p>
              <div style={{ display: "flex", gap: 22, marginBottom: 20 }}>
                <div>
                  <div style={{ fontSize: 11, color: C.muted, marginBottom: 3, letterSpacing: 1 }}>PLOTS</div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{p.plots}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: C.muted, marginBottom: 3, letterSpacing: 1 }}>SIZE</div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{p.sizes}</div>
                </div>
              </div>
              <div className="magnetic-btn" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: p.color, fontSize: 11, letterSpacing: 1.8, textTransform: "uppercase" }}>
                <span>View Details</span>
                <span>→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <style>{`
        @media(min-width:768px){
          .project-row{grid-template-columns:1.4fr 1fr!important;}
          .project-row[data-flip="true"]{grid-template-columns:1fr 1.4fr!important;}
          .project-row[data-flip="true"] .project-img{order:2;}
          .project-img{min-height:320px!important;}
        }
      `}</style>
    </div>
  );
}

function ProjectsRoute() {
  return (
    <SiteShell>
      <ProjectsPage />
    </SiteShell>
  );
}

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Dholera Plots for Sale — RSC Group Projects | DealWithIt" },
      { name: "description", content: "Browse Pride, Aerox, Regalia 5, Elanza 2 & Paradise — residential, commercial & township plots in Dholera SIR. All NA/NOC certified with 100% title clear. Sizes from 144 to 500 sq.yd." },
      { name: "keywords", content: "dholera plots for sale, rsc pride dholera, aerox dholera, regalia dholera, paradise dholera, dholera plot price, residential plots dholera sir" },
      { property: "og:title", content: "Dholera Plots for Sale — RSC Group Projects | DealWithIt" },
      { property: "og:description", content: "Residential, commercial & township plots in Dholera SIR. All NA/NOC certified, title clear." },
      { property: "og:url", content: "https://dealwithit.org.in/projects" },
      { name: "twitter:title", content: "Dholera Plots for Sale — RSC Group Projects | DealWithIt" },
      { name: "twitter:description", content: "Residential, commercial & township plots in Dholera SIR. All NA/NOC certified, title clear." },
    ],
    links: [
      { rel: "canonical", href: "https://dealwithit.org.in/projects" },
    ],
  }),
  component: ProjectsRoute,
});
