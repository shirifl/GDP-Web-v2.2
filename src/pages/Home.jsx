// GoldPoint Digital — Home page (NDA-safe: no client names, no case studies)
import React from "react";
import { Reveal, Arrow, HeroVisual, FinalCTA } from "../components.jsx";

export default function HomePage({ onNavigate }) {
  return (
    <div className="page-fade">
      <HomeHero onNavigate={onNavigate} />
      <PillarsAndStory onNavigate={onNavigate} />
      <ServicesOverview onNavigate={onNavigate} />
      <Methodology />
      <CapabilitiesBand />
      <PracticePrinciples />
      <IndustriesStrip onNavigate={onNavigate} />
      <InsightsPreview onNavigate={onNavigate} />
      <FinalCTA onNavigate={onNavigate} />
    </div>
  );
}

/* ---------- HERO ---------- */
function HomeHero({ onNavigate }) {
  return (
    <section style={{ position: "relative", paddingTop: 140, paddingBottom: 80, overflow: "hidden" }}>
      <div className="gp-bg-grid" style={{ position: "absolute", inset: 0, opacity: 0.4 }}></div>
      <div className="gp-shimmer"></div>
      <div className="gp-container" style={{ position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <Reveal>
              <div className="gp-eyebrow" style={{ marginBottom: 28 }}>Enterprise Digital Transformation · AI · Growth</div>
            </Reveal>
            <Reveal delay={1}>
              <h1 className="gp-display" style={{ fontSize: "clamp(40px, 5.4vw, 76px)", margin: 0, letterSpacing: "-0.03em", lineHeight: 1.04 }}>
                Modernize how your business <span className="gp-serif-italic" style={{ color: "var(--gold-200)" }}>operates,</span> sells and scales.
              </h1>
            </Reveal>
            <Reveal delay={2}>
              <p className="gp-lede" style={{ marginTop: 28, maxWidth: 560 }}>
                GoldPoint Digital is a premium consulting, engineering and AI partner for ambitious organizations. We replace fragmented vendors with one accountable firm built to ship measurable outcomes.
              </p>
            </Reveal>
            <Reveal delay={3}>
              <div style={{ marginTop: 36, display: "flex", gap: 14, flexWrap: "wrap" }}>
                <button className="gp-btn gp-btn-primary" onClick={() => onNavigate("contact")}>
                  Schedule a Consultation <Arrow />
                </button>
                <button className="gp-btn gp-btn-ghost" onClick={() => onNavigate("services")}>
                  Explore Services <Arrow />
                </button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={2}>
            <HeroVisual />
          </Reveal>
        </div>

        {/* Bottom strip, benefit-focused proof points */}
        <Reveal delay={4}>
          <div style={{
            marginTop: 72,
            paddingTop: 28,
            borderTop: "1px solid rgba(255,255,255,0.08)",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 32,
          }}>
            {[
              ["Why GoldPoint", "Built for the enterprise"],
              ["Who you work with", "Senior bench, embedded"],
              ["Engagement", "Multi-year partnerships"],
              ["What we deliver", "Outcomes that compound"],
            ].map(([k,v],i) => (
              <div key={i}>
                <div className="gp-label" style={{ marginBottom: 8 }}>{k}</div>
                <div style={{ fontFamily: "var(--f-display)", fontSize: 18, letterSpacing: "-0.01em" }}>{v}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- PILLARS + STORY ---------- */
function PillarsAndStory({ onNavigate }) {
  const pillars = [
    { k: "Strategy",   t: "Boardroom-grade consulting", b: "Executive strategy, RevOps and digital transformation roadmaps for leadership teams." },
    { k: "Technology", t: "Engineered execution",       b: "Production AI, web, mobile, CRM, DevOps and systems integration shipped by senior teams." },
    { k: "Growth",     t: "Compounding outcomes",       b: "Brand authority, conversion infrastructure and demand systems that appreciate quarter over quarter." },
  ];
  return (
    <section className="gp-section" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="gp-container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, alignItems: "start", marginBottom: 72 }}>
          <Reveal>
            <div className="gp-eyebrow" style={{ marginBottom: 24 }}>About the firm</div>
            <h2 className="gp-display gp-h2" style={{ margin: 0, letterSpacing: "-0.03em" }}>
              Strategy. Technology. <span className="gp-serif-italic" style={{ color: "var(--gold-200)" }}>Growth.</span>
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <div style={{ color: "var(--steel-200)", display: "flex", flexDirection: "column", gap: 20, fontSize: 17, lineHeight: 1.6 }}>
              <p style={{ margin: 0 }}>
                GoldPoint Digital is a premium digital transformation and consulting firm helping organizations scale through strategy, design, engineering, automation and modern customer acquisition systems.
              </p>
              <p style={{ margin: 0 }}>
                Unlike traditional marketing agencies, we combine executive consulting with technical execution across AI, branding, software engineering, CRM modernization, DevOps, UI/UX design and enterprise growth strategy.
              </p>
              <div style={{ marginTop: 8 }}>
                <button className="gp-link" onClick={() => onNavigate("about")}>Read the firm story <Arrow /></button>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, border: "1px solid rgba(255,255,255,0.08)" }}>
            {pillars.map((p, i) => (
              <div key={i} style={{
                padding: 36,
                borderRight: i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none",
                display: "flex", flexDirection: "column", gap: 14, minHeight: 220,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--gold-300)", letterSpacing: "0.16em", textTransform: "uppercase" }}>{p.k}</span>
                  <span style={{ width: 28, height: 1, background: "var(--gold-300)" }}></span>
                </div>
                <h4 className="gp-display" style={{ fontSize: 24, letterSpacing: "-0.02em", margin: 0 }}>{p.t}</h4>
                <p style={{ color: "var(--steel-300)", margin: 0, fontSize: 15 }}>{p.b}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- SERVICES OVERVIEW ---------- */
function ServicesOverview({ onNavigate }) {
  const services = [
    { code: "01", name: "Executive Consulting", desc: "Fractional leadership, RevOps and digital transformation strategy.", target: "services" },
    { code: "02", name: "AI Development", desc: "Custom AI workflows, assistants and OpenAI integrations in production.", target: "services" },
    { code: "03", name: "Web Development", desc: "Enterprise websites, SaaS platforms and customer portals.", target: "services" },
    { code: "04", name: "Mobile Applications", desc: "iOS, Android and cross-platform apps integrated with your stack.", target: "services" },
    { code: "05", name: "UI / UX Design", desc: "Product design, journey mapping and interactive prototyping.", target: "services" },
    { code: "06", name: "CRM & Automation", desc: "Salesforce, HubSpot, Dynamics, Zoho, implementation and RevOps.", target: "services" },
    { code: "07", name: "Systems Integration", desc: "API, ERP, payments and cloud integration architecture.", target: "solutions" },
    { code: "08", name: "DevOps & Engineering", desc: "AWS, Azure, Kubernetes, CI/CD and outsourced engineering.", target: "solutions" },
    { code: "09", name: "Branding & Creative", desc: "Identity systems, rebranding and executive-grade creative direction.", target: "solutions" },
    { code: "10", name: "Digital Growth", desc: "SEO, paid acquisition, conversion and inbound demand systems.", target: "solutions" },
  ];
  return (
    <section className="gp-section" style={{ background: "var(--ink-1000)", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="gp-container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 48, flexWrap: "wrap", gap: 24 }}>
          <div>
            <div className="gp-eyebrow" style={{ marginBottom: 20 }}>What we deliver</div>
            <h2 className="gp-display gp-h2" style={{ margin: 0, letterSpacing: "-0.03em", maxWidth: "16ch" }}>
              Ten integrated <span className="gp-serif-italic" style={{ color: "var(--gold-200)" }}>practice areas.</span>
            </h2>
          </div>
          <button className="gp-link" onClick={() => onNavigate("services")}>All services <Arrow /></button>
        </div>

        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 0, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            {services.map((s, i) => (
              <div key={s.code}
                   onClick={() => onNavigate(s.target)}
                   style={{
                     padding: "32px 36px",
                     borderBottom: "1px solid rgba(255,255,255,0.08)",
                     borderLeft: i % 2 === 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
                     cursor: "pointer",
                     transition: "background .3s",
                     display: "grid",
                     gridTemplateColumns: "48px 1fr 28px",
                     gap: 20,
                     alignItems: "center",
                   }}
                   onMouseOver={e => { e.currentTarget.style.background = "rgba(201,169,97,0.04)"; }}
                   onMouseOut={e => { e.currentTarget.style.background = "transparent"; }}>
                <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--gold-300)", letterSpacing: "0.12em" }}>{s.code}</span>
                <div>
                  <h3 className="gp-display" style={{ fontSize: 22, margin: 0, letterSpacing: "-0.015em", marginBottom: 6 }}>{s.name}</h3>
                  <p style={{ color: "var(--steel-300)", margin: 0, fontSize: 14, lineHeight: 1.45 }}>{s.desc}</p>
                </div>
                <Arrow size={14} />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- METHODOLOGY ---------- */
function Methodology() {
  const steps = [
    { p: "01", t: "Discovery",    b: "Stakeholder interviews, technical audit and revenue diagnostic." },
    { p: "02", t: "Architecture", b: "Solution design, integration model and brand framework for scale." },
    { p: "03", t: "Build",        b: "Senior team ships in coordinated four-week sprints." },
    { p: "04", t: "Operate",      b: "Continuous optimization, AI tuning and RevOps under retainer." },
  ];
  return (
    <section className="gp-section">
      <div className="gp-container">
        <div style={{ marginBottom: 56, maxWidth: 720 }}>
          <Reveal>
            <div className="gp-eyebrow" style={{ marginBottom: 20 }}>How we work</div>
            <h2 className="gp-display gp-h2" style={{ margin: 0, letterSpacing: "-0.03em" }}>
              A four-phase engagement model <span className="gp-serif-italic" style={{ color: "var(--gold-200)" }}>built to compound.</span>
            </h2>
          </Reveal>
        </div>

        <Reveal>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: 11, left: 0, right: 0, height: 1, background: "var(--gold-line)" }}></div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 28 }}>
              {steps.map((s, i) => (
                <div key={i}>
                  <div style={{
                    width: 22, height: 22, borderRadius: "50%",
                    background: "var(--ink-950)",
                    border: "1px solid var(--gold-300)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 0 24px rgba(201,169,97,0.35)",
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold-300)" }}></span>
                  </div>
                  <div style={{ marginTop: 24, fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--gold-300)", letterSpacing: "0.16em" }}>PHASE {s.p}</div>
                  <h4 className="gp-display" style={{ fontSize: 26, letterSpacing: "-0.02em", marginTop: 10, marginBottom: 12 }}>{s.t}</h4>
                  <p style={{ color: "var(--steel-300)", fontSize: 14, margin: 0 }}>{s.b}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- CAPABILITIES BAND ---------- */
function CapabilitiesBand() {
  const caps = [
    "AI-powered automation", "Enterprise web systems", "CRM modernization",
    "Revenue operations consulting", "API integrations", "Outsourced engineering",
    "SaaS product development", "Workflow optimization", "UI / UX strategy",
    "Enterprise DevOps", "Customer acquisition systems", "Brand authority development",
  ];
  return (
    <section className="gp-section" style={{ background: "var(--ink-1000)", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="gp-container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, alignItems: "start", marginBottom: 48 }}>
          <Reveal>
            <div className="gp-eyebrow" style={{ marginBottom: 20 }}>Integrated execution</div>
            <h2 className="gp-display gp-h2" style={{ margin: 0, letterSpacing: "-0.03em" }}>
              Enterprise-level <span className="gp-serif-italic" style={{ color: "var(--gold-200)" }}>capabilities.</span>
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <p className="gp-lede" style={{ margin: 0 }}>
              GoldPoint Digital provides integrated consulting, engineering, AI, branding, automation and operational services, designed to help organizations modernize and scale efficiently.
            </p>
          </Reveal>
        </div>

        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, border: "1px solid rgba(255,255,255,0.08)" }}>
            {caps.map((c, i) => (
              <div key={i} style={{
                padding: "24px 22px",
                borderRight: (i % 4 !== 3) ? "1px solid rgba(255,255,255,0.08)" : "none",
                borderBottom: i < 8 ? "1px solid rgba(255,255,255,0.08)" : "none",
                fontFamily: "var(--f-display)",
                fontSize: 16,
                letterSpacing: "-0.01em",
                display: "flex",
                alignItems: "center",
                gap: 14,
                transition: "all .3s",
              }}
              onMouseOver={e => { e.currentTarget.style.background = "rgba(201,169,97,0.05)"; }}
              onMouseOut={e => { e.currentTarget.style.background = "transparent"; }}>
                <span style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--gold-300)", letterSpacing: "0.1em" }}>{String(i+1).padStart(2,'0')}</span>
                {c}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- PRACTICE PRINCIPLES (NDA-safe) ---------- */
function PracticePrinciples() {
  const items = [
    { k: "Senior bench",     t: "No juniors carrying client work.",  b: "Every engagement is staffed with experienced consultants, engineers and designers, never delegated downward." },
    { k: "Executive scope",  t: "Embedded with leadership teams.",   b: "We operate alongside C-suite stakeholders as a long-term strategic partner, not a vendor on the periphery." },
    { k: "Integrated firm",  t: "Strategy and engineering, in one.", b: "Consulting depth and production engineering under a unified governance model and shared accountability." },
    { k: "Discretion",       t: "Quiet by design.",                  b: "We protect every client relationship under strict confidentiality. Our work speaks louder than our marketing." },
  ];
  return (
    <section className="gp-section">
      <div className="gp-container">
        <div style={{ marginBottom: 56, maxWidth: 720 }}>
          <Reveal>
            <div className="gp-eyebrow" style={{ marginBottom: 20 }}>Operating principles</div>
            <h2 className="gp-display gp-h2" style={{ margin: 0, letterSpacing: "-0.03em" }}>
              How we engage with <span className="gp-serif-italic" style={{ color: "var(--gold-200)" }}>every client.</span>
            </h2>
          </Reveal>
        </div>
        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, border: "1px solid rgba(255,255,255,0.08)" }}>
            {items.map((it, i) => (
              <div key={i} style={{
                padding: 32,
                borderRight: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none",
                display: "flex", flexDirection: "column",
                minHeight: 280,
              }}>
                <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--gold-300)", letterSpacing: "0.16em", textTransform: "uppercase" }}>{it.k}</span>
                <h4 className="gp-display" style={{ fontSize: 22, letterSpacing: "-0.02em", margin: "28px 0 16px", lineHeight: 1.2 }}>{it.t}</h4>
                <p style={{ color: "var(--steel-300)", fontSize: 14, margin: 0, marginTop: "auto" }}>{it.b}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- INDUSTRIES STRIP ---------- */
function IndustriesStrip({ onNavigate }) {
  const list = [
    "Financial Services","Lending & Mortgage","Healthcare","Legal",
    "Technology","Cybersecurity","Ecommerce","Hospitality",
    "Real Estate","Professional Services","Multi-Location","Startups",
  ];
  return (
    <section className="gp-section-tight" style={{ background: "var(--ink-1000)", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="gp-container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 64, alignItems: "center" }}>
          <Reveal>
            <div className="gp-eyebrow" style={{ marginBottom: 20 }}>Industries we support</div>
            <h2 className="gp-display gp-h3" style={{ margin: 0, letterSpacing: "-0.03em" }}>
              Twelve verticals. <span className="gp-serif-italic" style={{ color: "var(--gold-200)" }}>One operating model.</span>
            </h2>
            <button className="gp-link" onClick={() => onNavigate("industries")} style={{ marginTop: 28 }}>Explore industries <Arrow /></button>
          </Reveal>
          <Reveal delay={1}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {list.map((x, i) => (
                <button key={i}
                  onClick={() => onNavigate("industries")}
                  style={{
                    padding: "14px 18px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "transparent",
                    color: "var(--bone-100)",
                    fontFamily: "var(--f-display)",
                    fontSize: 15,
                    letterSpacing: "-0.01em",
                    cursor: "pointer",
                    transition: "all .25s",
                  }}
                  onMouseOver={e => { e.currentTarget.style.borderColor = "var(--gold-300)"; e.currentTarget.style.color = "var(--gold-200)"; }}
                  onMouseOut={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "var(--bone-100)"; }}>
                  {x}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- INSIGHTS PREVIEW ---------- */
function InsightsPreview({ onNavigate }) {
  const posts = [
    { cat: "AI Strategy",             title: "The enterprise case for AI-first workflows in 2026.", date: "Apr 22 · 2026", read: "8 MIN" },
    { cat: "Digital Transformation",  title: "Why CRM modernization is the new revenue lever.",    date: "Apr 09 · 2026", read: "6 MIN" },
    { cat: "Branding Strategy",       title: "Brand authority as an inbound growth system.",       date: "Mar 28 · 2026", read: "10 MIN" },
  ];
  return (
    <section className="gp-section">
      <div className="gp-container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 48, flexWrap: "wrap", gap: 24 }}>
          <div>
            <div className="gp-eyebrow" style={{ marginBottom: 20 }}>From the practice</div>
            <h2 className="gp-display gp-h2" style={{ margin: 0, letterSpacing: "-0.03em" }}>
              Field notes on digital <span className="gp-serif-italic" style={{ color: "var(--gold-200)" }}>transformation.</span>
            </h2>
          </div>
          <button className="gp-link" onClick={() => onNavigate("insights")}>All insights <Arrow /></button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          {posts.map((p, i) => (
            <Reveal key={i} delay={i}>
              <article style={{
                padding: "36px 32px",
                borderRight: i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                cursor: "pointer",
                transition: "background .3s",
                height: "100%",
                display: "flex", flexDirection: "column",
              }}
              onMouseOver={e => { e.currentTarget.style.background = "rgba(201,169,97,0.04)"; }}
              onMouseOut={e => { e.currentTarget.style.background = "transparent"; }}
              onClick={() => onNavigate("insights")}>
                <div style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--gold-300)", letterSpacing: "0.12em", textTransform: "uppercase" }}>{p.cat}</div>
                <h4 className="gp-display" style={{ fontSize: 22, lineHeight: 1.22, letterSpacing: "-0.02em", marginTop: 18, marginBottom: 36, flexGrow: 1 }}>{p.title}</h4>
                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--steel-400)", fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.08em" }}>
                  <span>{p.date}</span>
                  <span>{p.read} READ</span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
