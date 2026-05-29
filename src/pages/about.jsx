// GoldPoint Digital, About page
import { Arrow, FinalCTA, PageHeader, Reveal } from "../components.jsx";

function AboutPage({ onNavigate }) {
  return (
    <div className="page-fade">
      <PageHeader
        kicker="About"
        title={<>A firm built where <span className="gp-serif-italic" style={{ color: "var(--gold-200)" }}>strategy meets execution.</span></>}
        lede="GoldPoint Digital is a premium consulting, engineering and growth partner for organizations modernizing the way they operate, sell and scale. Quiet by design. Built for compounding outcomes."
      />

      <WhyExist />
      <WhatWeDo onNavigate={onNavigate} />
      <Principles />
      <Approach />
      <FinalCTA onNavigate={onNavigate} />
    </div>
  );
}

/* ---------- WHY WE EXIST ---------- */
function WhyExist() {
  return (
    <section className="gp-section">
      <div className="gp-container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>
          <Reveal>
            <div className="gp-eyebrow" style={{ marginBottom: 24 }}>Why we exist</div>
            <h2 className="gp-display gp-h2" style={{ margin: 0, letterSpacing: "-0.03em" }}>
              Modern enterprises need <span className="gp-serif-italic" style={{ color: "var(--gold-200)" }}>integrated systems</span>, not isolated services.
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <div style={{ display: "flex", flexDirection: "column", gap: 22, color: "var(--steel-200)", fontSize: 17, lineHeight: 1.65 }}>
              <p style={{ margin: 0 }}>
                Most organizations are still buying digital capability in fragments. A branding agency here, a CRM consultant there, an AI vendor pitching the next platform. The result is silos, redundant tooling and outcomes that never quite compound.
              </p>
              <p style={{ margin: 0 }}>
                GoldPoint Digital exists to replace that model. We combine executive consulting with technical execution across AI, software, branding and growth, delivered as a single integrated practice with shared accountability and one point of contact.
              </p>
              <p style={{ margin: 0 }}>
                The result is a firm that thinks like a consulting partner and ships like an in-house product organization.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- WHAT WE DO ---------- */
function WhatWeDo({ onNavigate }) {
  const items = [
    { k: "Strategy",   t: "We advise leadership teams.",          b: "Boardroom-grade consulting on digital transformation, customer acquisition, revenue operations and AI adoption." },
    { k: "Execution",  t: "We build the systems that ship.",      b: "AI, web, mobile, CRM, DevOps and systems integration delivered by senior engineers and designers." },
    { k: "Growth",     t: "We compound the outcome.",             b: "Brand authority, conversion infrastructure and demand systems engineered to appreciate over time." },
  ];
  return (
    <section className="gp-section-tight" style={{ background: "var(--ink-900)", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="gp-container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
          <div>
            <div className="gp-eyebrow" style={{ marginBottom: 20 }}>What we do</div>
            <h3 className="gp-display gp-h3" style={{ margin: 0, letterSpacing: "-0.025em" }}>Strategy. Execution. Growth.</h3>
          </div>
          <button className="gp-link" onClick={() => onNavigate("services")}>Explore Services <Arrow /></button>
        </div>
        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, border: "1px solid rgba(255,255,255,0.08)" }}>
            {items.map((p, i) => (
              <div key={i} style={{ padding: 32, borderRight: i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none", minHeight: 240, display: "flex", flexDirection: "column" }}>
                <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--gold-300)", letterSpacing: "0.16em", textTransform: "uppercase" }}>{p.k}</span>
                <h4 className="gp-display" style={{ fontSize: 24, letterSpacing: "-0.02em", margin: "24px 0 14px", lineHeight: 1.18 }}>{p.t}</h4>
                <p style={{ color: "var(--steel-300)", fontSize: 14, margin: 0, marginTop: "auto" }}>{p.b}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Principles() {
  const items = [
    { code: "01", title: "Boardroom-grade strategy", body: "Executive-level thinking applied to every engagement, from RevOps to product roadmap." },
    { code: "02", title: "Engineered execution",     body: "Senior engineers, designers and architects ship the work, never delegated downward." },
    { code: "03", title: "Compounding outcomes",     body: "We build durable systems and brand authority that appreciate quarter over quarter." },
    { code: "04", title: "Discretion",               body: "Quiet by design. We protect every client relationship under strict confidentiality." },
  ];
  return (
    <section className="gp-section">
      <div className="gp-container">
        <div style={{ marginBottom: 48, maxWidth: 760 }}>
          <Reveal>
            <div className="gp-eyebrow" style={{ marginBottom: 20 }}>Operating principles</div>
            <h2 className="gp-display gp-h2" style={{ margin: 0, letterSpacing: "-0.03em" }}>
              How we engage with <span className="gp-serif-italic" style={{ color: "var(--gold-200)" }}>every client.</span>
            </h2>
          </Reveal>
        </div>
        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0, border: "1px solid rgba(255,255,255,0.08)" }}>
            {items.map((p, i) => (
              <div key={p.code} style={{ padding: 32, borderRight: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none", minHeight: 280, display: "flex", flexDirection: "column" }}>
                <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--gold-300)", letterSpacing: "0.14em" }}>{p.code}</div>
                <h4 className="gp-display" style={{ fontSize: 22, letterSpacing: "-0.02em", marginTop: 28, lineHeight: 1.2 }}>{p.title}</h4>
                <p style={{ color: "var(--steel-300)", fontSize: 14, marginTop: "auto" }}>{p.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Approach() {
  const phases = [
    { p: "Phase 01", t: "Discovery", body: "Stakeholder mapping, technical audit and executive alignment on outcomes." },
    { p: "Phase 02", t: "Architect", body: "Solution design, integration architecture and brand definition." },
    { p: "Phase 03", t: "Build",     body: "Embedded engineering, design and creative production delivered in sprints." },
    { p: "Phase 04", t: "Operate",   body: "Ongoing optimization, RevOps, AI tuning and analytics under retainer." },
  ];
  return (
    <section className="gp-section-tight" style={{ background: "var(--ink-1000)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="gp-container">
        <div style={{ marginBottom: 56, maxWidth: 720 }}>
          <Reveal>
            <div className="gp-eyebrow" style={{ marginBottom: 20 }}>How we engage</div>
            <h2 className="gp-display gp-h2" style={{ margin: 0, letterSpacing: "-0.03em" }}>
              The GoldPoint <span className="gp-serif-italic" style={{ color: "var(--gold-200)" }}>engagement model.</span>
            </h2>
          </Reveal>
        </div>
        <Reveal>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 11, height: 1, background: "var(--gold-line)" }}></div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 32 }}>
              {phases.map((ph, i) => (
                <div key={ph.p}>
                  <span style={{ display: "block", width: 22, height: 22, borderRadius: "50%", background: "var(--ink-1000)", border: "1px solid var(--gold-300)", position: "relative", boxShadow: "0 0 24px rgba(201,169,97,0.35)" }}>
                    <span style={{ position: "absolute", inset: 6, borderRadius: "50%", background: "var(--gold-300)" }}></span>
                  </span>
                  <div style={{ marginTop: 24, fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--gold-300)", letterSpacing: "0.14em" }}>{ph.p}</div>
                  <h4 className="gp-display" style={{ fontSize: 26, letterSpacing: "-0.02em", marginTop: 12, marginBottom: 14 }}>{ph.t}</h4>
                  <p style={{ color: "var(--steel-300)", fontSize: 15, margin: 0 }}>{ph.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default AboutPage;
