import { useEffect, useState } from "react";

// ── Brand colour palette (elevated black & gold — warm, luminous)
export const C = {
  black: "#100c06",   // warm near-black base (lifted off pure black)
  dark: "#17110a",    // raised surface
  card: "#1d1610",    // warm card
  cardHi: "#241c12",  // card hover
  gold: "#c9a84c",    // primary gold (brighter than the old muddy #9a7b2e)
  goldL: "#f0d479",   // highlight gold
  goldB: "#f7e4a0",   // brightest gold (shimmer peak)
  goldD: "#9a7b2e",   // deep gold (fills / pressed states)
  white: "#f6f1e6",   // warm cream text
  muted: "#b09f86",   // warm muted text (brighter & warmer than old #888880)
  mutedD: "#7d6f5a",  // dim muted (de-emphasised labels)
  border: "#3a2f1e",  // warm gold-tinted hairline
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

/** Government Dholera SIR 3D virtual tour (DICDL). */
export const VIRTUAL_TOUR_URL =
  "https://dholera.gujarat.gov.in/dholera_virtual_tours/static/src/Dholera%20SIR/data/index.htm";

/** Real GPS coordinates for each project (used by the location map). */
export const MAPS = {
  pride: { lat: 22.4168, lng: 72.1045, zoom: 16, label: "RSC Pride — Kasindra, Dholera" },
  aerox: { lat: 22.414795, lng: 72.287033, zoom: 16, label: "Aerox — Pipli, Dholera" },
  regalia: { lat: 22.385, lng: 72.18, zoom: 16, label: "Regalia 5 — Cher, Dholera" },
  elanza: { lat: 22.4, lng: 72.2, zoom: 14, label: "Elanza 2 — Kharod, Dholera (near TP-2)" },
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
