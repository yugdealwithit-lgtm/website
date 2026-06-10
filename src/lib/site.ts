import { useEffect, useState } from "react";

// ── Brand colour palette (dark luxury)
export const C = {
  black: "#0a0a0a",
  dark: "#111111",
  card: "#161616",
  cardHi: "#1c1c1c",
  gold: "#9a7b2e",
  goldL: "#c9a84c",
  goldB: "#e8c55a",
  white: "#f5f3ee",
  muted: "#888880",
  border: "#2a2a2a",
} as const;

// ── Contact details
export const PHONE = "919319319501";
export const PHONE_DISPLAY = "+91 93193 19501";
export const INSTA = "https://instagram.com/dealwithit.realty";
export const EMAIL = "support@rscgroupco.com";
export const WA_BASE = `https://wa.me/${PHONE}`;

/** Build a pre-filled WhatsApp deep link. */
export const waMsg = (msg: string): string =>
  `${WA_BASE}?text=${encodeURIComponent(msg)}`;

/** Real GPS coordinates for each project (used by the location map). */
export const MAPS = {
  pride: { lat: 22.4168, lng: 72.1045, zoom: 16, label: "RSC Pride — Kasindra, Dholera" },
  aerox: { lat: 22.414795, lng: 72.287033, zoom: 16, label: "Aerox — Pipli, Dholera" },
  regalia: { lat: 22.385, lng: 72.18, zoom: 16, label: "Regalia 3 — Cher, Dholera" },
  paradise: { lat: 22.395, lng: 72.078, zoom: 15, label: "Paradise — Gamph, Dholera" },
} as const;

export type MapKey = keyof typeof MAPS;

/** Tracks whether the viewport is below the mobile breakpoint. */
export const useIsMobile = (breakpoint = 768): boolean => {
  const [mob, setMob] = useState(false);
  useEffect(() => {
    const check = () => setMob(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return mob;
};
