// GoldPoint Digital — Industries page
import React, { useState } from "react";
import { PageHeader, Reveal, Arrow, MediaPlaceholder, FinalCTA } from "../components.jsx";

const INDUSTRIES = [
  { code: "I.01", name: "Financial Services",     desc: "Modernizing portals, KYC, advisor tooling and revenue operations for banks, asset managers and fintechs.", focus: "CRM modernization · Compliance UX" },
  { code: "I.02", name: "Lending & Mortgage",     desc: "Originations, broker portals, decisioning automation and CRM modernization across lending stacks.", focus: "Workflow automation · RevOps" },
  { code: "I.03", name: "Healthcare",             desc: "HIPAA-grade portals, AI triage, patient engagement and operational workflow automation.", focus: "AI engagement · Compliance" },
  { code: "I.04", name: "Legal",                  desc: "Matter management, intake automation, client portals and AI-powered document workflows.", focus: "Intake · Document AI" },
  { code: "I.05", name: "Technology",             desc: "SaaS product design, growth engineering, RevOps and AI features for software companies.", focus: "Product design · Growth" },
  { code: "I.06", name: "Cybersecurity",          desc: "Premium brand systems, enterprise demand engines and conversion infrastructure for security firms.", focus: "Brand authority · Demand" },
  { code: "I.07", name: "Ecommerce",              desc: "Headless commerce, customer portals, loyalty systems and revenue lift through CX engineering.", focus: "Headless commerce · CX" },
  { code: "I.08", name: "Hospitality",            desc: "Direct-booking systems, premium rebrands, loyalty automation and guest-experience digital ops.", focus: "Rebrand · Direct booking" },
  { code: "I.09", name: "Real Estate",            desc: "Brokerage portals, listing platforms, agent CRM systems and AI-assisted property workflows.", focus: "Portals · Agent CRM" },
  { code: "I.10", name: "Professional Services",  desc: "Productized service operations, intake automation, branding and CRM modernization.", focus: "Productization · CRM" },
  { code: "I.11", name: "Multi-Location",         desc: "Local SEO, brand consistency systems, location-level CRM and operational reporting at scale.", focus: "Local SEO · Reporting" },
  { code: "I.12", name: "Startups",               desc: "Fractional digital leadership and AI-first growth engines for venture-backed founders.", focus: "Fractional leadership" },
];

export default function IndustriesPage({ onNavigate }) {
  const [active, setActive] = useState(0);
  return (
    <div className="page-fade">
      <PageHeader
        kicker="Industries"
        title={<>An operating model proven across <span className="gp-serif-italic" style={{ color: "var(--gold-200)" }}>regulated and high-growth verticals.</span></>}
        lede="The mechanics of digital transformation change by industry. So does the regulatory ground, the buying motion and the operating cadence. We tailor every engagement to the realities of your sector."
      />

      <section className="gp-section" style={{ paddingTop: 56 }}>
        <div className="gp-container">
          <div className="gp-split" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 80, alignItems: "start" }}>
            {/* Index */}
            <div style={{ position: "sticky", top: 110 }}>
              <div className="gp-label" style={{ marginBottom: 24 }}>Hover to explore</div>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                {INDUSTRIES.map((ind, i) => (
                  <button
                    key={ind.code}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "60px 1fr 20px",
                      gap: 16,
                      width: "100%",
                      alignItems: "center",
                      padding: "20px 0",
                      borderBottom: "1px solid rgba(255,255,255,0.08)",
                      textAlign: "left",
                      cursor: "pointer",
                      transition: "padding .25s ease, color .25s ease",
                      paddingLeft: active === i ? 16 : 0,
                      color: active === i ? "var(--bone-100)" : "var(--steel-300)",
                    }}>
                    <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: active === i ? "var(--gold-200)" : "var(--steel-400)", letterSpacing: "0.12em" }}>{ind.code}</span>
                    <span style={{ fontFamily: "var(--f-display)", fontSize: 22, letterSpacing: "-0.02em" }}>{ind.name}</span>
                    <span style={{ color: active === i ? "var(--gold-300)" : "transparent", transition: "color .25s" }}><Arrow size={12} /></span>
                  </button>
                ))}
              </div>
            </div>

            {/* Active card */}
            <div style={{ position: "sticky", top: 110 }}>
              <Reveal key={active}>
                <div className="gp-card" style={{ padding: 0 }}>
                  <MediaPlaceholder ratio="16/10" label={INDUSTRIES[active].name.toLowerCase()} />
                  <div style={{ padding: 36 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
                      <span className="gp-chip"><span className="dot"></span>{INDUSTRIES[active].code}</span>
                      <button className="gp-link" style={{ fontSize: 11, paddingBottom: 2 }} onClick={() => onNavigate("contact")}>Discuss your case <Arrow size={11} /></button>
                    </div>
                    <h3 className="gp-display" style={{ fontSize: 36, letterSpacing: "-0.02em", margin: 0 }}>{INDUSTRIES[active].name}</h3>
                    <p style={{ color: "var(--steel-200)", marginTop: 16, fontSize: 16 }}>{INDUSTRIES[active].desc}</p>
                    <div className="gp-grid-2" style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.08)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                      <div>
                        <div className="gp-label" style={{ marginBottom: 8 }}>Primary focus</div>
                        <div style={{ fontSize: 14 }}>{INDUSTRIES[active].focus}</div>
                      </div>
                      <div>
                        <div className="gp-label" style={{ marginBottom: 8 }}>Engagement</div>
                        <div style={{ fontSize: 14 }}>Embedded · Retainer · Project</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA onNavigate={onNavigate} />
    </div>
  );
}
