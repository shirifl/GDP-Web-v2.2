// GoldPoint Digital — Services page (all primary service disciplines)
import React, { useState } from "react";
import { PageHeader, Reveal, Arrow, FinalCTA } from "../components.jsx";

const SERVICES_DATA = [
  {
    id: "consulting",
    code: "S.01",
    name: "Executive Consulting & Digital Transformation",
    tag: "Strategy",
    summary: "Boardroom-grade advisory for organizations modernizing operations, technology and revenue systems.",
    items: [
      "Business growth strategy",
      "Digital transformation consulting",
      "Customer acquisition strategy",
      "Revenue operations consulting",
      "AI adoption consulting",
      "Technology modernization",
      "Operational consulting",
      "Executive advisory services",
      "Fractional digital leadership",
    ],
  },
  {
    id: "ai",
    code: "S.02",
    name: "AI Development",
    tag: "Engineering",
    headline: "AI systems designed for modern businesses.",
    summary: "Custom-built AI infrastructure: assistants, workflows, dashboards and OpenAI integrations engineered for production environments.",
    items: [
      "AI consulting",
      "AI workflow automation",
      "AI chatbots",
      "AI assistants",
      "AI-powered reporting",
      "AI analytics dashboards",
      "AI lead qualification systems",
      "OpenAI integrations",
      "AI business optimization",
    ],
  },
  {
    id: "web",
    code: "S.03",
    name: "Web Development",
    tag: "Engineering",
    headline: "Enterprise web platforms built for growth.",
    summary: "From flagship marketing systems to SaaS platforms and customer portals, engineered for performance, security and scale.",
    items: [
      "Enterprise websites",
      "SaaS development",
      "Ecommerce platforms",
      "Customer portals",
      "API integrations",
      "Progressive web apps",
      "CMS architecture",
      "Technical SEO",
      "Performance optimization",
    ],
  },
  {
    id: "mobile",
    code: "S.04",
    name: "Mobile Application Development",
    tag: "Product",
    headline: "Mobile experiences that move enterprise metrics.",
    summary: "Native and cross-platform applications integrated with your CRM, identity and revenue systems.",
    items: [
      "iOS development",
      "Android development",
      "Cross-platform apps",
      "Enterprise applications",
      "Customer engagement apps",
      "CRM-integrated mobile systems",
    ],
  },
  {
    id: "uiux",
    code: "S.05",
    name: "UI / UX Design",
    tag: "Design",
    headline: "Premium product design and digital experience.",
    summary: "Strategy, prototyping and journey design for digital products held to enterprise UX standards.",
    items: [
      "UI / UX strategy",
      "Wireframes",
      "Interactive prototypes",
      "User journey mapping",
      "Product design consulting",
      "Customer experience optimization",
    ],
  },
  {
    id: "crm",
    code: "S.06",
    name: "CRM & Automation",
    tag: "Revenue Ops",
    headline: "Revenue infrastructure across major platforms.",
    summary: "Implementation, optimization and revenue operations across Salesforce, HubSpot, Microsoft Dynamics, Zoho and Monday.com.",
    items: [
      "CRM implementation",
      "CRM optimization",
      "Workflow automation",
      "Revenue operations",
      "Lead routing systems",
      "Pipeline optimization",
      "Marketing automation",
    ],
    platforms: ["Salesforce", "HubSpot", "Microsoft Dynamics", "Zoho", "Monday.com"],
  },
];

export default function ServicesPage({ onNavigate }) {
  const [active, setActive] = useState(SERVICES_DATA[0].id);
  return (
    <div className="page-fade">
      <PageHeader
        kicker="Services"
        title={<>Built to move enterprise <span className="gp-serif-italic" style={{ color: "var(--gold-200)" }}>metrics.</span></>}
        lede="Consulting, engineering, AI, design and growth, delivered as one integrated practice. Each service is engineered to produce measurable outcomes, not deliverables."
      />

      <ServicesValueProps onNavigate={onNavigate} />

      <section className="gp-section" style={{ paddingTop: 24 }}>
        <div className="gp-container">
          <div className="gp-sidebar" style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 64, alignItems: "start" }}>
            {/* Sticky service index */}
            <aside style={{ position: "sticky", top: 110 }}>
              <div className="gp-label" style={{ marginBottom: 24 }}>Practice Areas</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {SERVICES_DATA.map((s) => (
                  <li key={s.id}>
                    <button
                      onClick={() => {
                        setActive(s.id);
                        const el = document.getElementById("svc-" + s.id);
                        if (el) {
                          const y = el.getBoundingClientRect().top + window.pageYOffset - 100;
                          window.scrollTo({ top: y, behavior: "smooth" });
                        }
                      }}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        padding: "14px 0",
                        borderTop: "1px solid rgba(255,255,255,0.08)",
                        textAlign: "left",
                        color: active === s.id ? "var(--gold-200)" : "var(--steel-200)",
                        fontFamily: "var(--f-display)",
                        fontSize: 16,
                        letterSpacing: "-0.01em",
                        transition: "color .2s ease",
                      }}>
                      <span>{s.name.split(" & ")[0].split(" ")[0]} {s.name.includes("&") ? "/ " + s.name.split(" & ")[1] : s.name.split(" ").slice(1).join(" ")}</span>
                      <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--gold-400)", letterSpacing: "0.1em" }}>{s.code}</span>
                    </button>
                  </li>
                ))}
                <li style={{ borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  <button onClick={() => onNavigate("solutions")}
                    style={{ width: "100%", textAlign: "left", padding: "14px 0", color: "var(--steel-300)", fontFamily: "var(--f-display)", fontSize: 16 }}>
                    See Solutions →
                  </button>
                </li>
              </ul>

              <div style={{ marginTop: 40, padding: 24, border: "1px solid var(--gold-line)", background: "rgba(201,169,97,0.04)" }}>
                <div className="gp-label" style={{ marginBottom: 12 }}>Talk to the team</div>
                <p style={{ color: "var(--steel-200)", fontSize: 14, marginBottom: 16 }}>Scope an engagement with our practice leads.</p>
                <button className="gp-btn gp-btn-gold" style={{ height: 44, fontSize: 13 }} onClick={() => onNavigate("contact")}>Book Intro <Arrow size={12} /></button>
              </div>
            </aside>

            {/* Content */}
            <div>
              {SERVICES_DATA.map((s, i) => (
                <ServiceBlock key={s.id} s={s} i={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <CrossSell onNavigate={onNavigate} />
      <FinalCTA onNavigate={onNavigate} />
    </div>
  );
}

function ServiceBlock({ s, i }) {
  return (
    <Reveal>
      <section id={"svc-" + s.id} style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "64px 0 80px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
          <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--gold-300)", letterSpacing: "0.12em" }}>{s.code} · {s.tag}</span>
          <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--steel-400)", letterSpacing: "0.12em" }}>0{i+1} / 0{SERVICES_DATA.length}</span>
        </div>
        <h2 className="gp-display" style={{ fontSize: "clamp(32px, 4vw, 52px)", letterSpacing: "-0.03em", lineHeight: 1.05, margin: 0 }}>
          {s.headline || s.name}
        </h2>
        <p className="gp-lede" style={{ marginTop: 24, maxWidth: 720 }}>{s.summary}</p>

        {s.platforms && (
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 28 }}>
            {s.platforms.map((p, idx) => (
              <span key={idx} className="gp-chip"><span className="dot"></span>{p}</span>
            ))}
          </div>
        )}

        <div className="gp-grid-3" style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, border: "1px solid rgba(255,255,255,0.08)" }}>
          {s.items.map((it, idx) => (
            <div key={idx} style={{
              padding: "20px 18px",
              borderRight: ((idx+1) % 3 !== 0 && idx !== s.items.length - 1) ? "1px solid rgba(255,255,255,0.08)" : "none",
              borderBottom: idx < s.items.length - (s.items.length % 3 || 3) ? "1px solid rgba(255,255,255,0.08)" : "none",
              display: "flex", alignItems: "center", gap: 12,
              fontSize: 15, color: "var(--steel-100)",
            }}>
              <span style={{ width: 4, height: 4, background: "var(--gold-300)" }}></span>
              {it}
            </div>
          ))}
        </div>
      </section>
    </Reveal>
  );
}

/* Cross-sell band */
function CrossSell({ onNavigate }) {
  return (
    <section className="gp-section-tight" style={{ background: "var(--ink-900)", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="gp-container">
        <div className="gp-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
          <h3 className="gp-display gp-h3" style={{ margin: 0, maxWidth: 18 + "ch", letterSpacing: "-0.02em" }}>
            Operating below the line? Explore <span className="gp-serif-italic" style={{ color: "var(--gold-200)" }}>Solutions</span>, our infrastructure and growth practice.
          </h3>
          <div style={{ display: "flex", gap: 14, justifyContent: "flex-end" }}>
            <button className="gp-btn gp-btn-primary" onClick={() => onNavigate("solutions")}>View Solutions <Arrow /></button>
            <button className="gp-btn gp-btn-ghost" onClick={() => onNavigate("industries")}>Industries <Arrow /></button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Services Value Props (sales band) ---------- */
function ServicesValueProps({ onNavigate }) {
  const props = [
    { k: "Outcome", t: "Measured, not promised.", b: "Every engagement is anchored to revenue, efficiency or experience metrics defined with leadership before kickoff." },
    { k: "Bench",   t: "Senior practitioners only.",   b: "Strategy, engineering and design led by experienced specialists. No junior teams executing on your brand." },
    { k: "Model",   t: "Embedded with executives.",    b: "We operate as an extension of your leadership team, with weekly cadence and direct executive access." },
  ];
  return (
    <section className="gp-section-tight" style={{ background: "var(--ink-900)", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="gp-container">
        <div className="gp-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, border: "1px solid rgba(255,255,255,0.08)" }}>
          {props.map((p, i) => (
            <Reveal key={i} delay={i}>
              <div style={{ padding: 32, borderRight: i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none", minHeight: 220, display: "flex", flexDirection: "column" }}>
                <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--gold-300)", letterSpacing: "0.16em", textTransform: "uppercase" }}>{p.k}</span>
                <h4 className="gp-display" style={{ fontSize: 22, letterSpacing: "-0.02em", margin: "20px 0 12px", lineHeight: 1.2 }}>{p.t}</h4>
                <p style={{ color: "var(--steel-300)", fontSize: 14, margin: 0, marginTop: "auto" }}>{p.b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
