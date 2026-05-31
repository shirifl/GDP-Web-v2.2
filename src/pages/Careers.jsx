// GoldPoint Digital — Careers page (simple, single CTA)
import React from "react";
import { PageHeader, Reveal, Arrow, FinalCTA } from "../components.jsx";

export default function CareersPage({ onNavigate }) {
  return (
    <div className="page-fade">
      <PageHeader
        kicker="Careers"
        title={<>Build the firm with <span className="gp-serif-italic" style={{ color: "var(--gold-200)" }}>us.</span></>}
        lede="GoldPoint Digital is a senior bench by design. We hire experienced consultants, engineers, designers and strategists who are ready to embed with executive teams and deliver work that matters."
      />

      <section className="gp-section" style={{ paddingTop: 24 }}>
        <div className="gp-container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 56 }}>
            <Reveal>
              <div className="gp-eyebrow" style={{ marginBottom: 24 }}>What we look for</div>
              <h2 className="gp-display gp-h2" style={{ margin: 0, letterSpacing: "-0.03em", maxWidth: "14ch" }}>
                Senior talent. <span className="gp-serif-italic" style={{ color: "var(--gold-200)" }}>Quiet excellence.</span>
              </h2>
              <p className="gp-lede" style={{ marginTop: 28 }}>
                We do not run a public job board. Our team grows through referral and direct introduction, on a rolling basis as engagements scale.
              </p>
              <p style={{ color: "var(--steel-300)", marginTop: 16, fontSize: 16, lineHeight: 1.6 }}>
                If your background sits at the intersection of strategy and execution, in consulting, engineering, AI, design, brand, or growth, we would welcome the introduction.
              </p>
              <div style={{ marginTop: 40, display: "flex", gap: 14, flexWrap: "wrap" }}>
                <a href="mailto:info@goldpointdigital.com?subject=Introduction%20%C2%B7%20GoldPoint%20Digital%20Careers" className="gp-btn gp-btn-gold" style={{ textDecoration: "none" }}>
                  info@goldpointdigital.com <Arrow />
                </a>
                <button className="gp-btn gp-btn-ghost" onClick={() => onNavigate("about")}>About the firm <Arrow /></button>
              </div>
            </Reveal>

            <Reveal delay={2}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, border: "1px solid rgba(255,255,255,0.08)" }}>
                {[
                  { code: "01", t: "Senior bench",       b: "Experienced practitioners, never junior delivery." },
                  { code: "02", t: "Remote, first",      b: "Distributed by design, we work with senior talent wherever they are." },
                  { code: "03", t: "Executive scope",    b: "Direct exposure to C-suite stakeholders from day one." },
                  { code: "04", t: "Premium economics",  b: "Top of market compensation and partner-track economics." },
                ].map((x, i) => (
                  <div key={i} style={{
                    padding: 28,
                    borderRight: i % 2 === 0 ? "1px solid rgba(255,255,255,0.08)" : "none",
                    borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none",
                    display: "flex", flexDirection: "column", gap: 12, minHeight: 200,
                  }}>
                    <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--gold-300)", letterSpacing: "0.14em" }}>{x.code}</span>
                    <h4 className="gp-display" style={{ fontSize: 20, letterSpacing: "-0.02em", margin: "auto 0 0" }}>{x.t}</h4>
                    <p style={{ color: "var(--steel-300)", fontSize: 13, margin: 0 }}>{x.b}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <FinalCTA onNavigate={onNavigate} />
    </div>
  );
}
