import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { C, PHONE, PHONE_DISPLAY, waMsg } from "@/lib/site";
import { PROJECTS, type Project, type ProjectId } from "@/lib/projects";
import { SiteShell } from "@/components/site-shell";
import { WaIcon } from "@/components/icons";
import { MapEmbed, InventoryMap } from "@/components/project-map";

const TABS = ["overview", "gallery", "amenities", "location", "inventory"] as const;
type Tab = (typeof TABS)[number];

const tabLabel = (t: Tab) => (t === "inventory" ? "📊 Inventory" : t.charAt(0).toUpperCase() + t.slice(1));

/** Sticky booking / enquiry sidebar. */
const BookingCard = ({ proj }: { proj: Project }) => (
  <aside style={{ position: "sticky", top: 96 }}>
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderTop: `3px solid ${proj.color}`, padding: 28, borderRadius: 2 }}>
      <div className="sl" style={{ marginBottom: 6 }}>Book a Site Visit</div>
      <h3 className="serif" style={{ fontSize: 26, fontWeight: 400, marginBottom: 6 }}>{proj.name}</h3>
      <div style={{ fontSize: 11, color: C.gold, letterSpacing: 1, marginBottom: 18 }}>📍 {proj.loc}</div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: C.border, border: `1px solid ${C.border}`, marginBottom: 18 }}>
        {[
          ["Plots", proj.plots],
          ["Sizes", proj.sizes],
          ["Status", proj.status],
          ["Category", proj.cat.split(" ")[0]],
        ].map(([l, v]) => (
          <div key={l} style={{ background: C.card, padding: "12px 14px" }}>
            <div style={{ fontSize: 8, color: C.muted, letterSpacing: 1.5, marginBottom: 4, textTransform: "uppercase" }}>{l}</div>
            <div style={{ fontSize: 13, fontWeight: 500 }}>{v}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <a href={waMsg(`Hi! I'm interested in ${proj.name} project. Please share details & pricing.`)} target="_blank" rel="noreferrer">
          <button className="btn-wa" style={{ width: "100%" }}><WaIcon size={15} />WhatsApp Enquiry</button>
        </a>
        <a href={`tel:+${PHONE}`}>
          <button className="btn-gold" style={{ width: "100%" }}>📞 {PHONE_DISPLAY}</button>
        </a>
        <Link to="/contact" className="btn-out" style={{ width: "100%" }}>Send a Message</Link>
      </div>
      <p style={{ fontSize: 10, color: C.muted, marginTop: 14, textAlign: "center", lineHeight: 1.6 }}>
        Site visits available 365 days a year.
      </p>
    </div>
  </aside>
);

function ProjectDetail({ proj }: { proj: Project }) {
  const [tab, setTab] = useState<Tab>("overview");
  const { id, name, tagline, cat, loc, color, imgs, bookingImg, about, plots, sizes, status, whyInvest, surveyInfo, amenities, locationBenefits } = proj;

  return (
    <div>
      {/* HERO */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: "clamp(360px,55vh,560px)",
          display: "flex",
          alignItems: "center",
          paddingTop: 96,
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <img src={imgs[0]} alt={name} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.22 }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(160deg,${C.black}f2 0%,${color}22 100%)` }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", position: "relative", zIndex: 2, padding: "40px clamp(18px,5vw,40px)" }}>
          <div style={{ display: "flex", gap: 6, marginBottom: 16, alignItems: "center", flexWrap: "wrap" }}>
            <Link to="/" style={{ fontSize: 10, color: C.muted, letterSpacing: 1 }}>Home</Link>
            <span style={{ color: C.muted }}>›</span>
            <Link to="/projects" style={{ fontSize: 10, color: C.muted, letterSpacing: 1 }}>Projects</Link>
            <span style={{ color: C.muted }}>›</span>
            <span style={{ fontSize: 10, color, letterSpacing: 1 }}>{name}</span>
          </div>
          <div style={{ fontSize: 9, letterSpacing: 2, color, border: `1px solid ${color}44`, display: "inline-block", padding: "4px 11px", marginBottom: 16, textTransform: "uppercase" }}>{cat}</div>
          <h1 className="serif" style={{ fontWeight: 300, lineHeight: 0.95, marginBottom: 14, fontSize: "clamp(48px,9vw,104px)" }}>{name}</h1>
          <p className="serif" style={{ fontSize: "clamp(18px,2.4vw,26px)", color: C.muted, fontStyle: "italic", marginBottom: 26 }}>{tagline}</p>
          <div style={{ display: "flex", gap: 30, marginBottom: 28, flexWrap: "wrap" }}>
            {[
              { l: "Location", v: loc },
              { l: "Plots", v: plots },
              { l: "Size", v: sizes },
              { l: "Status", v: status },
            ].map((s) => (
              <div key={s.l}>
                <div style={{ fontSize: 9, color: C.muted, letterSpacing: 2, marginBottom: 3, textTransform: "uppercase" }}>{s.l}</div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{s.v}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link to="/contact" className="btn-gold">Enquire Now</Link>
            <a href={waMsg(`Hi! I'm interested in ${name} project. Please share details.`)} target="_blank" rel="noreferrer">
              <button className="btn-wa"><WaIcon size={14} />WhatsApp</button>
            </a>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div style={{ background: C.card, borderBottom: `1px solid ${C.border}`, padding: "0 clamp(18px,5vw,40px)", display: "flex", overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
        {TABS.map((t) => (
          <button key={t} className={`tab-btn ${tab === t ? "active" : ""}`} onClick={() => setTab(t)} style={{ flexShrink: 0, margin: "8px 3px" }}>
            {tabLabel(t)}
          </button>
        ))}
      </div>

      {/* CONTENT + SIDEBAR */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(36px,5vw,52px) clamp(18px,5vw,40px) clamp(48px,7vw,72px)", display: "grid", gridTemplateColumns: "1fr", gap: "clamp(32px,4vw,52px)" }} className="detail-grid">
        <div>
          {/* OVERVIEW */}
          {tab === "overview" && (
            <div>
              <div className="sl" style={{ marginBottom: 10 }}>About the Project</div>
              <div className="divl" />
              <h2 className="serif" style={{ fontSize: "clamp(26px,3.5vw,42px)", fontWeight: 400, marginBottom: 16 }}>About <em>{name}</em></h2>
              <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.95, marginBottom: 22 }}>{about}</p>

              <img src={imgs[1]} alt={name} style={{ width: "100%", height: "clamp(220px,32vw,320px)", objectFit: "cover", border: `1px solid ${C.border}`, marginBottom: 28, borderRadius: 2 }} />

              <h3 className="serif" style={{ fontSize: 24, fontWeight: 400, marginBottom: 14 }}>Why Invest Here?</h3>
              <div style={{ marginBottom: 28 }}>
                {whyInvest.map((w) => (
                  <div key={w} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
                    <div style={{ width: 6, height: 6, background: color, marginTop: 7, flexShrink: 0, transform: "rotate(45deg)" }} />
                    <span style={{ fontSize: 13, color: C.muted, lineHeight: 1.7 }}>{w}</span>
                  </div>
                ))}
              </div>

              {surveyInfo.length > 0 && (
                <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: 22, borderRadius: 2 }}>
                  <div className="sl" style={{ marginBottom: 12 }}>Project Details</div>
                  {surveyInfo.map((s, i) => (
                    <div key={s.label} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: i < surveyInfo.length - 1 ? `1px solid ${C.border}` : "none" }}>
                      <span style={{ fontSize: 12, color: C.muted }}>{s.label}</span>
                      <span style={{ fontSize: 12, fontWeight: 500 }}>{s.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* GALLERY */}
          {tab === "gallery" && (
            <div>
              <div className="sl" style={{ marginBottom: 10 }}>Project Gallery</div>
              <div className="divl" />
              <h2 className="serif" style={{ fontSize: "clamp(26px,3.5vw,42px)", fontWeight: 400, marginBottom: 28 }}>From the <em>Brochure</em></h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 10 }}>
                {imgs.map((img, i) => (
                  <div
                    key={i}
                    style={{ overflow: "hidden", border: `1px solid ${C.border}`, transition: "border-color .3s", borderRadius: 2 }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = color)}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = C.border)}
                  >
                    <img src={img} alt={`${name} ${i + 1}`} style={{ width: "100%", height: 220, objectFit: "cover", display: "block" }} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AMENITIES */}
          {tab === "amenities" && (
            <div>
              <div className="sl" style={{ marginBottom: 10 }}>Features & Amenities</div>
              <div className="divl" />
              <h2 className="serif" style={{ fontSize: "clamp(26px,3.5vw,42px)", fontWeight: 400, marginBottom: 28 }}>World-Class <em>Amenities</em></h2>
              <div className="grid-4" style={{ marginBottom: 32 }}>
                {amenities.map((a) => (
                  <div
                    key={a.name}
                    style={{ background: C.card, border: `1px solid ${C.border}`, padding: "26px 16px", textAlign: "center", transition: "all .3s", borderRadius: 2 }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = color;
                      e.currentTarget.style.background = `${color}11`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = C.border;
                      e.currentTarget.style.background = C.card;
                    }}
                  >
                    <div style={{ fontSize: 30, marginBottom: 12 }}>{a.icon}</div>
                    <div style={{ fontSize: 11, letterSpacing: 0.5, fontWeight: 500, lineHeight: 1.4 }}>{a.name}</div>
                  </div>
                ))}
              </div>
              <img src={imgs[2] || imgs[0]} alt={name} style={{ width: "100%", maxHeight: 380, objectFit: "cover", border: `1px solid ${C.border}`, borderRadius: 2 }} />
            </div>
          )}

          {/* LOCATION */}
          {tab === "location" && (
            <div>
              <div className="sl" style={{ marginBottom: 10 }}>Location Advantages</div>
              <div className="divl" />
              <h2 className="serif" style={{ fontSize: "clamp(26px,3.5vw,42px)", fontWeight: 400, marginBottom: 28 }}>Strategic <em>Location</em></h2>
              <div>
                {locationBenefits.map((b) => (
                  <div key={b.title} style={{ display: "flex", gap: 12, padding: "16px 0", borderBottom: `1px solid ${C.border}`, alignItems: "flex-start" }}>
                    <div style={{ background: `${color}22`, border: `1px solid ${color}44`, padding: "9px 11px", fontSize: 16, flexShrink: 0 }}>{b.icon}</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 3 }}>{b.title}</div>
                      <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.7 }}>{b.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 28 }}>
                <MapEmbed project={id} />
              </div>
            </div>
          )}

          {/* INVENTORY */}
          {tab === "inventory" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
                <div>
                  <div className="sl" style={{ marginBottom: 10 }}>Booking Status</div>
                  <div className="divl" />
                  <h2 className="serif" style={{ fontSize: "clamp(26px,3.5vw,42px)", fontWeight: 400 }}>Plot <em>Inventory & Layout</em></h2>
                  <p style={{ color: C.muted, fontSize: 12.5, marginTop: 10, lineHeight: 1.7, maxWidth: 480 }}>
                    Live layout plan. Red = Booked, White = Available. Tap to zoom.
                  </p>
                </div>
                <a href={waMsg(`Hi! I'd like to check available plots in ${name}.`)} target="_blank" rel="noreferrer">
                  <button className="btn-wa"><WaIcon size={14} />Check Available Plots</button>
                </a>
              </div>
              <InventoryMap src={bookingImg} alt={`${name} booking status`} />
              <div style={{ marginTop: 20, background: C.card, border: `1px solid ${C.border}`, padding: "18px 22px", display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", alignItems: "center", borderRadius: 2 }}>
                <span style={{ fontSize: 12.5, color: C.muted }}>Want to book a specific plot?</span>
                <a href={waMsg(`Hi! I've seen the ${name} layout and want to book a plot.`)} target="_blank" rel="noreferrer">
                  <button className="btn-gold" style={{ padding: "10px 20px", fontSize: 10 }}>Enquire on WhatsApp</button>
                </a>
                <Link to="/contact" className="btn-out" style={{ padding: "10px 20px", fontSize: 10 }}>Email Enquiry</Link>
              </div>
            </div>
          )}
        </div>

        <BookingCard proj={proj} />
      </div>

      <style>{`
        @media(min-width:1000px){
          .detail-grid{grid-template-columns:1fr 360px!important;}
        }
      `}</style>
    </div>
  );
}

function ProjectDetailRoute() {
  const { proj } = Route.useLoaderData();
  const ld = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: `RSC ${proj.name} — ${proj.cat}`,
    description: proj.about,
    url: `https://dealwithit.org.in/projects/${proj.id}`,
    address: { "@type": "PostalAddress", addressLocality: proj.loc, addressRegion: "Gujarat", addressCountry: "IN" },
    numberOfRooms: proj.plots,
    floorSize: { "@type": "QuantitativeValue", value: proj.sizes, unitText: "sq.yd" },
    offeredBy: { "@type": "RealEstateAgent", name: "DealWithIt Real Estate", url: "https://dealwithit.org.in", telephone: "+919319319501" },
  };
  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <ProjectDetail proj={proj} />
    </SiteShell>
  );
}

export const Route = createFileRoute("/projects/$id")({
  loader: ({ params }) => {
    const proj = PROJECTS[params.id as ProjectId];
    if (!proj) throw notFound();
    return { proj };
  },
  head: ({ loaderData, params }) => {
    const proj = loaderData?.proj;
    const title = proj
      ? `RSC ${proj.name} — ${proj.cat} in ${proj.loc} | DealWithIt`
      : "Project | DealWithIt Real Estate";
    const desc = proj
      ? `${proj.about.slice(0, 155)}…`
      : "Premium plots in Dholera SIR by RSC Group.";
    const url = `https://dealwithit.org.in/projects/${params.id}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { name: "keywords", content: `rsc ${proj?.name?.toLowerCase()} dholera, ${proj?.loc?.toLowerCase()}, dholera plots, ${proj?.cat?.toLowerCase()}, dholera sir investment` },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
      ],
      links: [
        { rel: "canonical", href: url },
      ],
    };
  },
  component: ProjectDetailRoute,
});
