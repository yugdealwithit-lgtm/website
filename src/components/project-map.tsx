import { useState } from "react";
import { C, MAPS, VIRTUAL_TOUR_URL, waMsg, type MapKey } from "@/lib/site";
import { WaIcon } from "./icons";

/** Builds a Google Maps embed URL in satellite mode for the given coordinates. */
function satelliteEmbedUrl(lat: number, lng: number): string {
  // !5e1 = satellite layer, 1d500 ≈ zoom-16 scale
  return (
    `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d500` +
    `!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1` +
    `!5e1!3m2!1sen!2sin!4v1718006400000`
  );
}

/** Google Maps satellite embed + link buttons for Google Maps, Dholera 3D tour, and WhatsApp directions. */
export const MapEmbed = ({ project }: { project: MapKey }) => {
  const m = MAPS[project];
  const embedUrl = satelliteEmbedUrl(m.lat, m.lng);
  const gmapsUrl = `https://www.google.com/maps?q=${m.lat},${m.lng}&t=k`;

  return (
    <div style={{ border: `1px solid ${C.border}`, overflow: "hidden", borderRadius: 2 }}>
      {/* Header */}
      <div
        style={{
          background: C.card,
          padding: "10px 16px",
          borderBottom: `1px solid ${C.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontSize: 11, color: C.goldL, letterSpacing: 1 }}>📍 {m.label}</span>
        <span
          style={{
            fontSize: 8,
            letterSpacing: 2,
            color: C.muted,
            border: `1px solid ${C.border}`,
            padding: "3px 8px",
          }}
        >
          SATELLITE
        </span>
      </div>

      {/* Google Maps satellite iframe */}
      <iframe
        src={embedUrl}
        title={`${m.label} — Satellite View`}
        className="map-frame"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        style={{ display: "block" }}
      />

      {/* Action row */}
      <div
        style={{
          background: C.card,
          borderTop: `1px solid ${C.border}`,
          padding: "12px 16px",
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <a href={gmapsUrl} target="_blank" rel="noreferrer">
          <button className="btn-gold" style={{ padding: "9px 14px", fontSize: 10 }}>
            🗺️ Open in Google Maps
          </button>
        </a>
        <a href={VIRTUAL_TOUR_URL} target="_blank" rel="noreferrer">
          <button className="btn-out" style={{ padding: "9px 14px", fontSize: 10 }}>
            🌐 Explore Dholera in 3D
          </button>
        </a>
        <a href={waMsg(`Hi! I want directions to ${m.label}.`)} target="_blank" rel="noreferrer">
          <button className="btn-wa" style={{ padding: "9px 14px", fontSize: 10 }}>
            <WaIcon size={13} /> Directions
          </button>
        </a>
      </div>
    </div>
  );
};

/** Zoomable plot-layout image with a booking-status legend. */
export const InventoryMap = ({ src, alt }: { src: string; alt: string }) => {
  const [zoomed, setZoomed] = useState(false);
  const legend: [string, string][] = [
    ["#e53e3e", "Booked"],
    [C.white, "Available"],
    [C.gold, "Premium (+charges)"],
  ];
  return (
    <div>
      <div style={{ marginBottom: 12, display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
        {legend.map(([bg, label]) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span
              className="legend-dot"
              style={{ background: bg, border: bg === C.white ? `1px solid ${C.border}` : "none" }}
            />
            <span style={{ fontSize: 11, color: C.muted }}>{label}</span>
          </div>
        ))}
        <span
          style={{ marginLeft: "auto", fontSize: 11, color: C.gold, cursor: "pointer" }}
          onClick={() => setZoomed(true)}
        >
          🔍 Zoom
        </span>
      </div>
      <div
        onClick={() => setZoomed(true)}
        style={{ cursor: "zoom-in", border: `1px solid ${C.border}`, overflow: "hidden", position: "relative" }}
      >
        <img src={src} alt={alt} style={{ width: "100%", display: "block" }} />
        <div
          style={{
            position: "absolute",
            bottom: 10,
            right: 10,
            background: `${C.black}cc`,
            padding: "5px 10px",
            fontSize: 9,
            letterSpacing: 1.5,
            color: C.goldL,
            border: `1px solid ${C.border}`,
          }}
        >
          TAP TO ZOOM
        </div>
      </div>
      {zoomed && (
        <div className="img-zoom-wrap" onClick={() => setZoomed(false)}>
          <div style={{ position: "relative", maxWidth: "100%", maxHeight: "90vh" }}>
            <img src={src} alt={alt} style={{ maxWidth: "100%", maxHeight: "85vh", objectFit: "contain", display: "block" }} />
            <button
              onClick={() => setZoomed(false)}
              aria-label="Close"
              style={{
                position: "absolute",
                top: -12,
                right: -12,
                background: C.gold,
                border: "none",
                color: C.black,
                width: 32,
                height: 32,
                borderRadius: "50%",
                cursor: "pointer",
                fontSize: 16,
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ✕
            </button>
            <p style={{ textAlign: "center", color: C.muted, fontSize: 10, marginTop: 8, letterSpacing: 2 }}>TAP TO CLOSE</p>
          </div>
        </div>
      )}
    </div>
  );
};
