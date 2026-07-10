import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { C, waMsg } from "@/lib/site";
import { SiteShell } from "@/components/site-shell";
import { WaIcon } from "@/components/icons";

const SITE_ORIGIN = "https://dealwithit.org.in";

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

function SectionHeading({ eyebrow, title, emphasis }: { eyebrow: string; title: string; emphasis: string }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div className="sl" style={{ marginBottom: 10 }}>{eyebrow}</div>
      <div className="divl" />
      <h2 className="serif" style={{ fontWeight: 400, fontSize: "clamp(26px,3.5vw,42px)", lineHeight: 1.15 }}>
        {title} <em className="gold-text">{emphasis}</em>
      </h2>
    </div>
  );
}

const FAQS = [
  {
    q: "Is DealWithIt Realty the developer of the Dholera SIR projects it lists?",
    a: "No. RSC Group Dholera is the developer. DealWithIt Realty is RSC Group's RERA-authorised channel partner — we market and sell on their behalf, and we are a separate entity from RSC Group's own site, rscgroupdholera.in.",
  },
  {
    q: "Who founded DealWithIt Realty?",
    a: "DealWithIt Realty was founded by Yug Agrawal, who worked on the channel-partner side of the real estate industry — running onboarding meetings and building broker relationships for another real estate group — before starting DealWithIt as RSC Group Dholera's authorised channel partner.",
  },
  {
    q: "Which Dholera SIR projects does DealWithIt represent?",
    a: "Five RSC Group developments: Pride (Kasindra), Aerox (Pipli), Regalia 5 (Cher), Elanza 2 (Kharod), and Paradise (Gamph, now sold out). Each project page lists its own survey number, TP/FP details, and zone.",
  },
  {
    q: "Are the plots NA/NOC certified and title-clear?",
    a: "Yes — every active project we represent (Pride, Aerox, Regalia 5, Elanza 2) is NA/NOC certified with 100% title-clear plots. Paradise, now sold out, was sold under the same standard.",
  },
  {
    q: "Where is DealWithIt Realty based?",
    a: "Our office is at 904, 9th Floor, Signature-1, Opp. Andaz Party Plot, S.G. Highway, Makarba, Ahmedabad – 380 051. Site visits to Dholera SIR are arranged directly with our team, 365 days a year.",
  },
  {
    q: "How do I verify RERA registration for a specific project?",
    a: "RERA registration details are specific to each project and are shared directly when you enquire — contact us on WhatsApp or by phone and we'll provide the registration number for the project you're evaluating.",
  },
];

function AboutPage() {
  return (
    <div>
      {/* ── Hero ── */}
      <div
        style={{
          background: `linear-gradient(135deg,${C.black},${C.card})`,
          display: "flex",
          alignItems: "flex-end",
          minHeight: "clamp(280px,40vh,360px)",
          paddingTop: 130,
          paddingBottom: 48,
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <div className="reveal" style={{ maxWidth: 1200, margin: "0 auto", width: "100%", padding: "0 clamp(18px,5vw,40px)" }}>
          <div className="sl" style={{ marginBottom: 12 }}>About Us</div>
          <h1 className="serif" style={{ fontWeight: 300, fontSize: "clamp(40px,7vw,84px)", lineHeight: 1 }}>
            Why Investors Trust <em className="gold-text">DealWithIt</em>
          </h1>
          <p style={{ fontSize: 14, color: C.muted, marginTop: 16, maxWidth: 640, lineHeight: 1.8 }}>
            RSC Group Dholera's RERA-authorised channel partner for Dholera SIR real estate —
            here's exactly who we are, who we work with, and how we operate.
          </p>
        </div>
      </div>

      {/* ── Company story ── */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "clamp(56px,8vw,88px) clamp(18px,5vw,40px) clamp(32px,5vw,48px)" }}>
        <SectionHeading eyebrow="Our Story" title="What DealWithIt" emphasis="Actually Is" />
        <p style={{ color: C.muted, fontSize: 14.5, lineHeight: 1.95, marginBottom: 18 }}>
          DealWithIt Realty is a real estate brokerage based in Ahmedabad, operating as the RERA-authorised
          channel partner for RSC Group Dholera — the developer behind{" "}
          <Link to="/projects/$id" params={{ id: "pride" }} style={{ color: C.goldL }}>Pride</Link>,{" "}
          <Link to="/projects/$id" params={{ id: "aerox" }} style={{ color: C.goldL }}>Aerox</Link>,{" "}
          <Link to="/projects/$id" params={{ id: "regalia" }} style={{ color: C.goldL }}>Regalia 5</Link>,{" "}
          <Link to="/projects/$id" params={{ id: "elanza" }} style={{ color: C.goldL }}>Elanza 2</Link>, and{" "}
          <Link to="/projects/$id" params={{ id: "paradise" }} style={{ color: C.goldL }}>Paradise</Link> in
          Dholera Special Investment Region (SIR), Gujarat.
        </p>
        <p style={{ color: C.muted, fontSize: 14.5, lineHeight: 1.95, marginBottom: 18 }}>
          We deliberately state this plainly because it matters: DealWithIt Realty is <strong style={{ color: C.white }}>not</strong> RSC
          Group Dholera, and we are not affiliated with RSC Group's own site, rscgroupdholera.in. RSC Group builds
          and holds the land; DealWithIt markets and sells it on their behalf as an authorised sales partner. Every
          project page on this site discloses that relationship in its own terms and conditions.
        </p>
        <p style={{ color: C.muted, fontSize: 14.5, lineHeight: 1.95 }}>
          Our work is narrow by design — we only represent NA/NOC-certified, title-clear inventory inside Dholera
          SIR, and we don't take on developments outside that scope. That narrowness is the point: it's how a small
          team stays accountable for what it recommends.
        </p>
      </section>

      {/* ── Founder / leadership ── */}
      <section style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "clamp(56px,8vw,88px) clamp(18px,5vw,40px)" }}>
          <SectionHeading eyebrow="Leadership" title="Founded by" emphasis="Yug Agrawal" />
          <p style={{ color: C.muted, fontSize: 14.5, lineHeight: 1.95, marginBottom: 18 }}>
            Yug Agrawal founded DealWithIt Realty after working on the channel-partner side of the real estate
            industry — running onboarding meetings and building broker relationships for another real estate
            group in the region. That work meant sitting on the other side of the table from where DealWithIt
            now sits: sourcing and vetting the partners who sell a developer's inventory, rather than being one.
          </p>
          <p style={{ color: C.muted, fontSize: 14.5, lineHeight: 1.95 }}>
            DealWithIt Realty was built directly on that experience — as a channel-partner operation that
            understands what a developer needs from a partner, and what an investor needs from a channel
            partner: a straight answer, a real site visit, and paperwork that holds up.
          </p>
        </div>
      </section>

      {/* ── Track record ── */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "clamp(56px,8vw,88px) clamp(18px,5vw,40px)" }}>
        <SectionHeading eyebrow="Track Record" title="Experience Behind" emphasis="the Brand" />
        <p style={{ color: C.muted, fontSize: 14.5, lineHeight: 1.95, marginBottom: 24 }}>
          RSC Group Dholera, the developer we represent, was founded in 2010 and has delivered 15+ projects in
          Dholera SIR under Mr. Ramrajsinh Chudasama (Director, Rtd. Army). DealWithIt Realty's own track record as
          their channel partner is smaller and more recent by comparison — and we'd rather point to what's
          concretely verifiable than claim a tenure we haven't earned:
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 1, background: C.border, border: `1px solid ${C.border}` }}>
          {[
            ["5", "Dholera SIR projects represented"],
            ["1", "Project sold out to completion (Paradise)"],
            ["11+", "In-depth research articles published"],
            ["100%", "NA/NOC, title-clear inventory only"],
          ].map(([n, l]) => (
            <div key={l} style={{ background: C.black, padding: "22px 18px" }}>
              <div className="serif gold-text" style={{ fontWeight: 600, fontSize: "clamp(24px,2.6vw,32px)" }}>{n}</div>
              <div style={{ fontSize: 11, color: C.muted, letterSpacing: 1, marginTop: 6, lineHeight: 1.5 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Why investors trust us ── */}
      <section style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "clamp(56px,8vw,88px) clamp(18px,5vw,40px)" }}>
          <SectionHeading eyebrow="Why Trust Us" title="What We Do" emphasis="Differently" />
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            {[
              ["RERA-authorised, not self-declared", "Our channel-partner status with RSC Group Dholera is stated on every project page we represent, alongside the explicit disclosure that we are not RSC Group itself."],
              ["We disclose sold-out inventory instead of hiding it", "Paradise is marked \"Sold Out\" across this site rather than left listed as available — we'd rather lose a lead than misrepresent inventory."],
              ["We publish the research, not just the pitch", "Our blog carries 11+ long-form articles on pricing, risk, and Dholera SIR's infrastructure timeline — written for due diligence, not just to rank."],
              ["Project details are specific, not vague", "Survey numbers, TP/FP references, and zone classifications are listed on each project page instead of generic \"prime location\" language."],
              ["Direct access, not a gated funnel", "Every page carries a working phone number and WhatsApp line to a real person, alongside our physical Ahmedabad office address."],
            ].map(([t, d]) => (
              <div key={t} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ width: 6, height: 6, background: C.gold, marginTop: 8, flexShrink: 0, transform: "rotate(45deg)" }} />
                <div>
                  <div style={{ fontSize: 14.5, fontWeight: 600, color: C.white, marginBottom: 4 }}>{t}</div>
                  <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.8 }}>{d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Dholera expertise ── */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "clamp(56px,8vw,88px) clamp(18px,5vw,40px)" }}>
        <SectionHeading eyebrow="Local Expertise" title="What We Know About" emphasis="Dholera SIR" />
        <p style={{ color: C.muted, fontSize: 14.5, lineHeight: 1.95, marginBottom: 18 }}>
          Every project we represent sits inside Dholera Special Investment Region — India's first greenfield
          smart city and a Delhi-Mumbai Industrial Corridor (DMIC) node. Our team tracks the infrastructure
          specifics that actually move plot values: the Dholera International Airport (under development at
          Navagam), the 109 km, six-lane Ahmedabad-Dholera Expressway (NH-751), the Tata Electronics semiconductor
          FAB plant, the 5000 MW Tata Solar Park, and the planned Gandhinagar-Dholera metro connectivity.
        </p>
        <p style={{ color: C.muted, fontSize: 14.5, lineHeight: 1.95, marginBottom: 18 }}>
          That's also why each project page states its own zone and survey references — Pride sits at the
          entrance of DSIR TP2, Regalia 5 is Final Plot 382 in TP 3C1 at Cher, Elanza 2 is close to TP-2 at
          Kharod — instead of leaving location claims unverifiable.
        </p>
        <p style={{ color: C.muted, fontSize: 14.5, lineHeight: 1.95 }}>
          We've written this up in more depth than a single page allows. If you're evaluating Dholera SIR
          seriously, start with{" "}
          <Link to="/blog/$slug" params={{ slug: "what-is-dholera-sir" }} style={{ color: C.goldL }}>
            what Dholera SIR actually is
          </Link>
          , then read our honest take on{" "}
          <Link to="/blog/$slug" params={{ slug: "is-dholera-good-investment-2026" }} style={{ color: C.goldL }}>
            whether it's a good investment in 2026
          </Link>
          , and how it compares to{" "}
          <Link to="/blog/$slug" params={{ slug: "dholera-vs-other-smart-cities" }} style={{ color: C.goldL }}>
            other Indian smart cities
          </Link>
          .
        </p>
      </section>

      {/* ── Investment philosophy ── */}
      <section style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "clamp(56px,8vw,88px) clamp(18px,5vw,40px)" }}>
          <SectionHeading eyebrow="How We Operate" title="Our Investment" emphasis="Philosophy" />
          <p style={{ color: C.muted, fontSize: 14.5, lineHeight: 1.95, marginBottom: 18 }}>
            We only take on inventory that's NA/NOC certified and title-clear before it reaches a project page —
            not after a buyer raises the question. If a project doesn't clear that bar, we don't represent it,
            regardless of how it's priced.
          </p>
          <p style={{ color: C.muted, fontSize: 14.5, lineHeight: 1.95, marginBottom: 18 }}>
            We treat published research as part of the product, not a marketing add-on. Every major buying
            question — pricing, timing, safety, comparison to alternatives — has a dedicated article on this
            site with real figures, not slogans, so a buyer can form their own view before ever speaking to us.
          </p>
          <p style={{ color: C.muted, fontSize: 14.5, lineHeight: 1.95 }}>
            And we'd rather tell an investor a project is sold out than keep the door open for a lead. Paradise
            is the case in point: it's marked sold out sitewide, not quietly left listed at "limited availability."
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ maxWidth: 860, margin: "0 auto", padding: "clamp(56px,8vw,88px) clamp(18px,5vw,40px)" }}>
        <SectionHeading eyebrow="Common Questions" title="Frequently Asked" emphasis="Questions" />
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {FAQS.map((f, i) => (
            <FaqItem key={i} q={f.q} a={f.a} />
          ))}
        </div>
      </section>

      {/* ── Closing CTA ── */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 clamp(18px,5vw,40px) clamp(56px,9vw,96px)" }}>
        <div style={{ background: `linear-gradient(135deg,${C.gold}1a,${C.card})`, border: `1px solid ${C.gold}44`, padding: "clamp(28px,5vw,44px)", textAlign: "center", borderRadius: 2 }}>
          <div className="sl" style={{ marginBottom: 12, color: C.goldL }}>Talk to us directly</div>
          <h2 className="serif" style={{ fontSize: "clamp(24px,3.5vw,34px)", fontWeight: 300, marginBottom: 16 }}>
            Questions about a <em className="gold-text">specific project?</em>
          </h2>
          <p style={{ fontSize: 13, color: C.muted, marginBottom: 24, maxWidth: 480, marginLeft: "auto", marginRight: "auto", lineHeight: 1.8 }}>
            Browse our current projects or reach the team directly for RERA and site-visit details.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/projects" className="btn-gold">View Projects</Link>
            <a href={waMsg("Hi! I read your About page and have a question about DealWithIt / RSC Group Dholera.")} target="_blank" rel="noreferrer">
              <button className="btn-wa"><WaIcon size={15} />WhatsApp Us</button>
            </a>
          </div>
          <div style={{ marginTop: 22 }}>
            <Link to="/" style={{ color: C.muted, fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>← Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function AboutRoute() {
  const orgLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${SITE_ORIGIN}/#organization`,
    name: "DealWithIt Real Estate",
    url: SITE_ORIGIN,
    description:
      "RERA-authorised channel partner for RSC Group Dholera's Dholera SIR projects. Not affiliated with rscgroupdholera.in.",
    telephone: "+919319319501",
    email: "yug.dealwithit@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "904, 9th Floor, Signature-1, Opp. Andaz Party Plot, S.G. Highway, Makarba",
      addressLocality: "Ahmedabad",
      addressRegion: "GJ",
      postalCode: "380051",
      addressCountry: "IN",
    },
    areaServed: { "@type": "Place", name: "Dholera, Gujarat, India" },
    founder: { "@id": `${SITE_ORIGIN}/about#founder` },
    sameAs: ["https://instagram.com/dealwithit.realty"],
  };

  const founderLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_ORIGIN}/about#founder`,
    name: "Yug Agrawal",
    jobTitle: "Founder",
    worksFor: { "@id": `${SITE_ORIGIN}/#organization` },
    description:
      "Founder of DealWithIt Realty. Previously worked on the channel-partner side of the real estate industry — onboarding meetings and broker relationships — before founding DealWithIt as RSC Group Dholera's authorised channel partner.",
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(founderLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <AboutPage />
    </SiteShell>
  );
}

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About DealWithIt Realty | RSC Group's Dholera SIR Channel Partner" },
      { name: "description", content: "DealWithIt Realty is RSC Group Dholera's RERA-authorised channel partner for Dholera SIR real estate. Learn who we are, our founder, and how we operate — factually, not in marketing language." },
      { name: "keywords", content: "dealwithit realty, dholera channel partner, rsc group dholera partner, dholera real estate broker, yug agrawal dealwithit" },
      { property: "og:title", content: "About DealWithIt Realty | RSC Group's Dholera SIR Channel Partner" },
      { property: "og:description", content: "RSC Group Dholera's RERA-authorised channel partner — who we are, our founder, and how we operate." },
      { property: "og:url", content: `${SITE_ORIGIN}/about` },
      { property: "og:type", content: "website" },
      { property: "og:image", content: `${SITE_ORIGIN}/og-image.png` },
      { property: "og:image:alt", content: "About DealWithIt Realty" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "About DealWithIt Realty | RSC Group's Dholera SIR Channel Partner" },
      { name: "twitter:description", content: "RSC Group Dholera's RERA-authorised channel partner — who we are, our founder, and how we operate." },
      { name: "twitter:image", content: `${SITE_ORIGIN}/og-image.png` },
    ],
    links: [{ rel: "canonical", href: `${SITE_ORIGIN}/about` }],
  }),
  component: AboutRoute,
});
