import { useState, type ChangeEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { C, EMAIL, INSTA, PHONE, PHONE_DISPLAY, waMsg } from "@/lib/site";
import { SiteShell } from "@/components/site-shell";
import { WaIcon, InstaIcon } from "@/components/icons";

interface FormState {
  name: string;
  email: string;
  phone: string;
  project: string;
  message: string;
}

const EMPTY: FormState = { name: "", email: "", phone: "", project: "", message: "" };

const CONTACT_METHODS = [
  { kind: "phone" as const, t: "Phone", v: PHONE_DISPLAY, href: `tel:+${PHONE}` },
  { kind: "wa" as const, t: "WhatsApp", v: "Chat directly with us", href: waMsg("Hi! I'd like to know more about your Dholera projects.") },
  { kind: "insta" as const, t: "Instagram", v: "@dealwithit.realty", href: INSTA },
  { kind: "email" as const, t: "Email", v: EMAIL, href: `mailto:${EMAIL}` },
];

const CRM_WEBHOOK = "https://crm-api-server-yugdealwithit-6735s-projects.vercel.app/api/webhook/site";

function ContactPage() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handle = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async () => {
    if (!form.name || !form.phone) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch(CRM_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email || null,
          website_page: typeof window !== "undefined" ? window.location.href : "/contact",
        }),
      });
      if (!res.ok) throw new Error(`Server error ${res.status}`);
      setSent(true);
    } catch (err) {
      console.error("Enquiry submission failed:", err);
      setSubmitError("Something went wrong. Please try WhatsApp or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const waEnquiry = waMsg(
    `Hi! My name is ${form.name || "[Name]"}. I'm interested in ${form.project || "your projects"}. Phone: ${form.phone || "[Phone]"}. ${form.message || ""}`,
  );

  return (
    <div>
      {/* Hero */}
      <div
        style={{
          background: `linear-gradient(135deg,${C.black},${C.card})`,
          display: "flex",
          alignItems: "flex-end",
          minHeight: "clamp(260px,38vh,340px)",
          paddingTop: 130,
          paddingBottom: 44,
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <div className="reveal" style={{ maxWidth: 1200, margin: "0 auto", width: "100%", padding: "0 clamp(18px,5vw,40px)" }}>
          <div className="sl" style={{ marginBottom: 12 }}>Reach Out</div>
          <h1 className="serif" style={{ fontSize: "clamp(40px,7vw,80px)", fontWeight: 300, lineHeight: 1 }}>
            Let's <em className="gold-text">Connect</em>
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(48px,7vw,80px) clamp(18px,5vw,40px)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "clamp(36px,5vw,56px)" }} className="contact-grid">
          {/* Info */}
          <div>
            <div className="sl" style={{ marginBottom: 10 }}>Get In Touch</div>
            <div className="divl" />
            <h2 className="serif" style={{ fontSize: "clamp(26px,3.5vw,42px)", fontWeight: 400, marginBottom: 16, lineHeight: 1.1 }}>
              We're Here
              <br />
              <em>to Help</em>
            </h2>
            <p style={{ color: C.muted, fontSize: 15, lineHeight: 1.95, marginBottom: 26 }}>
              Whether first-time investor or seasoned buyer — our experts guide you through the best investment opportunities in Dholera Smart City.
            </p>

            {CONTACT_METHODS.map((c) => (
              <a
                key={c.t}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : "_self"}
                rel="noreferrer"
                style={{ display: "flex", gap: 14, padding: "16px 0", borderBottom: `1px solid ${C.border}`, alignItems: "center", color: C.white }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    border: `1px solid ${C.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    background: c.kind === "wa" ? "#25D366" : c.kind === "insta" ? "linear-gradient(45deg,#f09433,#e6683c,#dc2743)" : "transparent",
                    fontSize: 17,
                  }}
                >
                  {c.kind === "wa" ? <WaIcon size={17} /> : c.kind === "insta" ? <InstaIcon size={15} /> : c.kind === "phone" ? "📞" : "✉️"}
                </div>
                <div>
                  <div style={{ fontSize: 11, color: C.muted, letterSpacing: 2, marginBottom: 3, textTransform: "uppercase" }}>{c.t}</div>
                  <div style={{ fontSize: 13 }}>{c.v}</div>
                </div>
                <div style={{ marginLeft: "auto", color: C.muted, fontSize: 14 }}>→</div>
              </a>
            ))}

            <div style={{ marginTop: 28, paddingTop: 26, borderTop: `1px solid ${C.border}` }}>
              <div className="sl" style={{ marginBottom: 14 }}>Our Offices</div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 10, color: C.gold, marginBottom: 5, letterSpacing: 1 }}>CORPORATE OFFICE</div>
                <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.9 }}>
                  904, 9th Floor, Signature-1, Opp. Andaz Party Plot,
                  <br />
                  S.G. Highway, Makarba, Ahmedabad – 380 051
                </p>
              </div>
              <div>
                <div style={{ fontSize: 10, color: C.gold, marginBottom: 5, letterSpacing: 1 }}>DHOLERA OFFICE</div>
                <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.9 }}>
                  Kasindra MDR Road, Kasindra, Dholera,
                  <br />
                  Ahmedabad – 382465, Gujarat
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            {sent ? (
              <div style={{ background: C.card, border: `1px solid ${C.gold}44`, padding: "52px 38px", textAlign: "center", borderRadius: 2 }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                <h3 className="serif" style={{ fontSize: 30, fontWeight: 400, marginBottom: 12 }}>Thank You, {form.name}!</h3>
                <p style={{ color: C.muted, fontSize: 14.5, lineHeight: 1.85, marginBottom: 24 }}>
                  We'll call you on {form.phone} within 24 hours.
                  <br />
                  Site visits available 365 days a year.
                </p>
                <a href={waMsg(`Hi! I just submitted an enquiry. Name: ${form.name}, Phone: ${form.phone}.`)} target="_blank" rel="noreferrer">
                  <button className="btn-wa"><WaIcon size={14} />Also message on WhatsApp</button>
                </a>
              </div>
            ) : (
              <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: "clamp(26px,4vw,40px)", borderRadius: 2 }}>
                <div className="sl" style={{ marginBottom: 20 }}>Enquiry Form</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: 11, color: C.muted, letterSpacing: 2, marginBottom: 6 }}>FULL NAME *</div>
                    <input name="name" value={form.name} onChange={handle} placeholder="Your name" />
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: C.muted, letterSpacing: 2, marginBottom: 6 }}>PHONE *</div>
                    <input name="phone" value={form.phone} onChange={handle} placeholder="+91 XXXXX XXXXX" type="tel" />
                  </div>
                </div>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 11, color: C.muted, letterSpacing: 2, marginBottom: 6 }}>EMAIL</div>
                  <input name="email" value={form.email} onChange={handle} placeholder="your@email.com" type="email" />
                </div>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 11, color: C.muted, letterSpacing: 2, marginBottom: 6 }}>INTERESTED PROJECT</div>
                  <select name="project" value={form.project} onChange={handle}>
                    <option value="">Select a project</option>
                    <option>Pride (Kasindra, Dholera)</option>
                    <option>Aerox (Pipli, Dholera)</option>
                    <option>Regalia 5 (Cher, Dholera)</option>
                    <option>Elanza 2 (Kharod, Dholera)</option>
                    <option>Paradise (Gamph, Dholera) — Sold Out</option>
                    <option>Other / General Inquiry</option>
                  </select>
                </div>
                <div style={{ marginBottom: 22 }}>
                  <div style={{ fontSize: 11, color: C.muted, letterSpacing: 2, marginBottom: 6 }}>MESSAGE</div>
                  <textarea name="message" value={form.message} onChange={handle} rows={4} placeholder="Tell us about your investment goals..." style={{ resize: "vertical" }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <button className="btn-gold" onClick={submit} disabled={submitting} style={{ width: "100%", padding: "13px 8px", opacity: submitting ? 0.7 : 1 }}>
                    {submitting ? "Sending…" : "Send Enquiry"}
                  </button>
                  <a href={waEnquiry} target="_blank" rel="noreferrer" style={{ display: "block" }}>
                    <button className="btn-wa" style={{ width: "100%", padding: "13px 8px" }}><WaIcon size={13} />WhatsApp</button>
                  </a>
                </div>
                {submitError && (
                  <p style={{ fontSize: 12, color: "#e05050", marginTop: 10, textAlign: "center", lineHeight: 1.6 }}>{submitError}</p>
                )}
                <p style={{ fontSize: 11, color: C.muted, marginTop: 12, textAlign: "center", lineHeight: 1.6 }}>
                  Site visits available 365 days a year.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media(min-width:768px){ .contact-grid{grid-template-columns:1fr 1fr!important;} }
      `}</style>
    </div>
  );
}

function ContactRoute() {
  return (
    <SiteShell>
      <ContactPage />
    </SiteShell>
  );
}

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact DealWithIt | Book a Free Site Visit in Dholera" },
      { name: "description", content: "Get in touch with DealWithIt Real Estate. Call, WhatsApp or fill the form to book a free site visit to Dholera SIR — Pride, Aerox, Regalia 5 or Elanza 2." },
      { name: "keywords", content: "contact dealwithit, book site visit dholera, dholera real estate enquiry, rsc group contact, dholera plot enquiry" },
      { property: "og:title", content: "Contact DealWithIt | Book a Free Site Visit in Dholera" },
      { property: "og:description", content: "Call, WhatsApp or fill the form to book a free site visit to Dholera SIR projects." },
      { property: "og:url", content: "https://dealwithit.org.in/contact" },
      { property: "og:image", content: "https://dealwithit.org.in/og-image.png" },
      { property: "og:image:alt", content: "Contact DealWithIt Real Estate" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Contact DealWithIt | Book a Free Site Visit in Dholera" },
      { name: "twitter:description", content: "Call, WhatsApp or fill the form to book a free site visit to Dholera SIR projects." },
      { name: "twitter:image", content: "https://dealwithit.org.in/og-image.png" },
    ],
    links: [
      { rel: "canonical", href: "https://dealwithit.org.in/contact" },
    ],
  }),
  component: ContactRoute,
});
