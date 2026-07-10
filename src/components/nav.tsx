import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { C, INSTA, PHONE, PHONE_DISPLAY, waMsg } from "@/lib/site";
import { WaIcon, InstaIcon } from "./icons";

interface NavItem {
  label: string;
  to: string;
  params?: Record<string, string>;
}

const LINKS: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Pride", to: "/projects/$id", params: { id: "pride" } },
  { label: "Aerox", to: "/projects/$id", params: { id: "aerox" } },
  { label: "Regalia 5", to: "/projects/$id", params: { id: "regalia" } },
  { label: "Elanza 2", to: "/projects/$id", params: { id: "elanza" } },
  { label: "Blogs", to: "/blogs" },
  { label: "Contact", to: "/contact" },
];

const Logo = ({ size = 26 }: { size?: number }) => (
  <span className="serif" style={{ fontSize: size, fontWeight: 600, lineHeight: 1 }}>
    <span style={{ color: C.white }}>Deal</span>
    <span style={{ color: C.goldL }}>WithIt</span>
  </span>
);

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      setScrollPct(pct);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile overlay is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="scroll-progress" style={{ width: `${scrollPct}%` }} />
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: scrolled ? "14px clamp(18px,5vw,40px)" : "22px clamp(18px,5vw,40px)",
          background: scrolled ? "rgba(10,10,10,0.78)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
          transition: "all .4s cubic-bezier(.4,0,.2,1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Logo />
          <span className="hide-mob">
            <span style={{ display: "block", width: 32, height: 1, background: C.gold, marginBottom: 3 }} />
            <span style={{ display: "block", fontSize: 7, letterSpacing: 4, color: C.gold }}>REAL ESTATE</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hide-mob" style={{ display: "flex", gap: 24, alignItems: "center" }}>
          {LINKS.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              params={l.params}
              className="nav-link"
              activeProps={{ className: "nav-link active" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <a
            href={waMsg("Hi! I'd like to enquire about your Dholera real estate projects.")}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
          >
            <span
              style={{
                background: "#25D366",
                color: "#fff",
                width: 34,
                height: 34,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <WaIcon size={16} />
            </span>
          </a>
          <Link to="/contact" className="btn-gold hide-mob" style={{ padding: "10px 20px", fontSize: 10 }}>
            Enquire
          </Link>
          {/* Hamburger */}
          <button
            className="show-mob"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            style={{
              background: "none",
              border: `1px solid ${C.border}`,
              borderRadius: 2,
              width: 38,
              height: 38,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 5,
            }}
          >
            <span style={{ display: "block", width: 18, height: 1.5, background: C.white }} />
            <span style={{ display: "block", width: 18, height: 1.5, background: C.white }} />
            <span style={{ display: "block", width: 18, height: 1.5, background: C.white }} />
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen overlay */}
      <div className={`mob-menu${open ? " open" : ""}`}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 28,
            paddingBottom: 20,
            borderBottom: `1px solid ${C.border}`,
          }}
        >
          <Logo size={24} />
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            style={{ background: "none", border: "none", color: C.muted, fontSize: 26, cursor: "pointer", lineHeight: 1 }}
          >
            ✕
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", overflowY: "auto" }}>
          {LINKS.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              params={l.params}
              className="mob-link"
              activeProps={{ className: "mob-link active" }}
              activeOptions={{ exact: l.to === "/" }}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div style={{ marginTop: "auto", paddingTop: 28, display: "flex", gap: 12, alignItems: "center" }}>
          <a href={waMsg("Hi! I'd like to know about your Dholera projects.")} target="_blank" rel="noreferrer" aria-label="WhatsApp">
            <span style={{ background: "#25D366", color: "#fff", width: 42, height: 42, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <WaIcon size={18} />
            </span>
          </a>
          <a href={INSTA} target="_blank" rel="noreferrer" aria-label="Instagram">
            <span style={{ background: "linear-gradient(45deg,#f09433,#e6683c,#dc2743)", color: "#fff", width: 42, height: 42, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <InstaIcon size={18} />
            </span>
          </a>
          <a
            href={`tel:+${PHONE}`}
            style={{ marginLeft: "auto", color: C.goldL, fontSize: 13, letterSpacing: 1 }}
          >
            {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </>
  );
};
