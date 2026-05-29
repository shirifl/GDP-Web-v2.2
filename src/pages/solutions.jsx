// GoldPoint Digital, Solutions page (Systems Integration, DevOps, Branding, Digital Growth)
import { FinalCTA, Logo, PageHeader, Reveal } from "../components.jsx";

const SOLUTIONS_DATA = [
  {
    id: "integration",
    code: "L.01",
    name: "Systems Integration",
    summary: "Connect the enterprise stack, APIs, ERPs, payments, identity and data, into a single intelligent operating layer.",
    items: ["API integrations","ERP integrations","Cloud integrations","CRM integrations","Payment integrations","Enterprise systems architecture","Automation consulting"],
  },
  {
    id: "devops",
    code: "L.02",
    name: "DevOps & Engineering",
    summary: "Outsourced engineering, cloud architecture and infrastructure automation built for resilient enterprise delivery.",
    items: ["Outsourced engineering","DevOps consulting","CI / CD implementation","Cloud infrastructure consulting","Kubernetes consulting","AWS consulting","Azure consulting","Infrastructure automation"],
  },
  {
    id: "branding",
    code: "L.03",
    name: "Branding & Creative",
    summary: "Identity systems, rebrands and executive-grade creative direction for organizations stepping up in market.",
    items: ["Brand strategy","Logo design","Brand identity systems","Rebranding","Presentation design","Creative direction","Motion graphics","Marketing collateral"],
  },
  {
    id: "growth",
    code: "L.04",
    name: "Digital Growth Strategy",
    summary: "Inbound, paid and conversion infrastructure engineered to compound demand over time.",
    items: ["SEO","Paid advertising","Social media strategy","Funnel optimization","Conversion optimization","Reputation management","Analytics & reporting"],
  },
];

function SolutionsPage({ onNavigate }) {
  return (
    <div className="page-fade">
      <PageHeader
        kicker="Solutions"
        title={<>Infrastructure and growth, engineered to <span className="gp-serif-italic" style={{ color: "var(--gold-200)" }}>compound.</span></>}
        lede="Where Services is the consulting practice, Solutions is the technical and growth machinery. Built to scale once and pay back for years."
      />

      <SolutionsValueProps />

      <section className="gp-section">
        <div className="gp-container">
          {SOLUTIONS_DATA.map((s, i) => (
            <Reveal key={s.id} delay={i % 3}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "120px 1fr 1fr",
                gap: 56,
                borderTop: "1px solid rgba(255,255,255,0.08)",
                padding: "56px 0",
                alignItems: "start",
              }}>
                <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--gold-300)", letterSpacing: "0.12em" }}>{s.code}</div>
                <div>
                  <h3 className="gp-display" style={{ fontSize: "clamp(28px, 3.2vw, 42px)", margin: 0, letterSpacing: "-0.025em", lineHeight: 1.08 }}>{s.name}</h3>
                  <p style={{ color: "var(--steel-200)", marginTop: 18, maxWidth: 50 + "ch" }}>{s.summary}</p>
                </div>
                <div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {s.items.map((it, idx) => (
                      <li key={idx} style={{
                        display: "grid", gridTemplateColumns: "34px 1fr", gap: 12,
                        padding: "12px 0",
                        borderBottom: idx < s.items.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                        alignItems: "center",
                      }}>
                        <span style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--gold-400)", letterSpacing: "0.1em" }}>{String(idx+1).padStart(2,'0')}</span>
                        <span style={{ fontSize: 15 }}>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <FinalCTA onNavigate={onNavigate} />
    </div>
  );
}

export default SolutionsPage;

/* ---------- Solutions Value Props ---------- */
function SolutionsValueProps() {
  const items = [
    { k: "Architected", t: "Designed to scale once.",       b: "Solutions are architected to scale predictably, with documentation, governance and observability built in from day one." },
    { k: "Composable",  t: "Plugged into your stack.",      b: "Integrations across CRM, ERP, identity, payments and cloud, so new systems extend the stack instead of replacing it." },
    { k: "Operated",    t: "Tuned over the long term.",     b: "We do not hand off and disappear. Solutions are operated and improved on retainer with active executive sponsorship." },
  ];
  return (
    <section className="gp-section-tight" style={{ background: "var(--ink-900)", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="gp-container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, border: "1px solid rgba(255,255,255,0.08)" }}>
          {items.map((p, i) => (
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
