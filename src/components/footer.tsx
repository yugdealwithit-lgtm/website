import { Link } from "@tanstack/react-router";
import { C, INSTA, PHONE, PHONE_DISPLAY, waMsg } from "@/lib/site";
import { PROJECT_SUMMARIES } from "@/lib/projects";
import { WaIcon, InstaIcon } from "./icons";

const SocialRow = () => (
  <div style={{ display: "flex", gap: 10 }}>
    <a href={waMsg("Hi! I'm interested in your Dholera projects.")} target="_blank" rel="noreferrer" aria-label="WhatsApp">
      <span style={{ background: "#25D366", color: "#fff", width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <WaIcon size={16} />
      </span>
    </a>
    <a href={INSTA} target="_blank" rel="noreferrer" aria-label="Instagram">
      <span style={{ background: "linear-gradient(45deg,#f09433,#e6683c,#dc2743)", color: "#fff", width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <InstaIcon size={16} />
      </span>
    </a>
    <a href={`tel:+${PHONE}`} aria-label="Call us">
      <span style={{ background: `linear-gradient(135deg,${C.gold},${C.goldL})`, color: C.black, width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>📞</span>
    </a>
  </div>
);

const footerLinkStyle: React.CSSProperties = {
  color: C.muted,
  fontSize: 12,
  marginBottom: 10,
  display: "block",
  transition: "color .3s",
};

export const Footer = () => (
  <footer
    style={{
      background: "#080808",
      borderTop: `1px solid ${C.border}`,
      padding: "clamp(44px,7vw,64px) clamp(18px,5vw,40px) 26px",
    }}
  >
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
          gap: 36,
          marginBottom: 40,
        }}
      >
        {/* Brand */}
        <div style={{ gridColumn: "1 / -1", maxWidth: 320 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <span className="serif" style={{ fontSize: 26, fontWeight: 600 }}>
              <span style={{ color: C.white }}>Deal</span>
              <span style={{ color: C.goldL }}>WithIt</span>
            </span>
            <div>
              <div style={{ width: 28, height: 1, background: C.gold, marginBottom: 2 }} />
              <div style={{ fontSize: 7, letterSpacing: 4, color: C.gold }}>REAL ESTATE</div>
            </div>
          </div>
          <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.9, marginBottom: 18, maxWidth: 300 }}>
            Your trusted partner for premium real estate investments in Dholera Smart City — India's first greenfield smart city.
          </p>
          <SocialRow />
        </div>

        {/* Pages */}
        <div>
          <div className="sl" style={{ marginBottom: 16 }}>Pages</div>
          <Link to="/" style={footerLinkStyle}>Home</Link>
          <Link to="/about" style={footerLinkStyle}>About</Link>
          <Link to="/projects" style={footerLinkStyle}>Projects</Link>
          <Link to="/blogs" style={footerLinkStyle}>Blogs</Link>
          <Link to="/contact" style={footerLinkStyle}>Contact</Link>
          <Link to="/login" style={footerLinkStyle}>Admin</Link>
        </div>

        {/* Projects */}
        <div>
          <div className="sl" style={{ marginBottom: 16 }}>Projects</div>
          {PROJECT_SUMMARIES.map((p) => (
            <Link key={p.id} to="/projects/$id" params={{ id: p.id }} style={footerLinkStyle}>
              {p.name}
            </Link>
          ))}
        </div>

        {/* Contact */}
        <div>
          <div className="sl" style={{ marginBottom: 16 }}>Contact</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            <a href={`tel:+${PHONE}`} style={{ display: "flex", alignItems: "center", gap: 8, color: C.muted, fontSize: 12 }}>
              <span>📞</span>
              {PHONE_DISPLAY}
            </a>
            <a href={waMsg("Hi!")} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, color: C.muted, fontSize: 12 }}>
              <WaIcon size={14} /> WhatsApp Us
            </a>
            <a href={INSTA} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, color: C.muted, fontSize: 12 }}>
              <InstaIcon size={14} /> @dealwithit.realty
            </a>
            <p style={{ color: C.muted, fontSize: 12, lineHeight: 1.8, marginTop: 4 }}>
              904, 9th Floor, Signature-1,
              <br />
              Opp. Andaz Party Plot,
              <br />
              S.G. Highway, Makarba,
              <br />
              Ahmedabad – 380 051
            </p>
          </div>
        </div>
      </div>

      <div
        style={{
          borderTop: `1px solid ${C.border}`,
          paddingTop: 20,
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 8,
          alignItems: "center",
        }}
      >
        <span style={{ color: C.muted, fontSize: 10 }}>© 2026 DealWithIt Real Estate.</span>
        <span style={{ color: C.muted, fontSize: 10 }}>Dholera, Gujarat, India</span>
      </div>
    </div>
  </footer>
);
