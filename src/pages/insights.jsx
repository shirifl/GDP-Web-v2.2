// GoldPoint Digital, Insights / Blog page
import { useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { Arrow, MediaPlaceholder, PageHeader, Reveal } from "../components.jsx";

const POSTS = [
  { id:"p1", cat:"AI Strategy",            title:"The enterprise case for AI-first workflows in 2026.",        author:"GoldPoint Research", date:"Apr 22 · 2026", read:"8 MIN", featured:true,
    excerpt:"Why integrating AI at the workflow layer, not the feature layer, separates leading enterprises from laggards over the next 24 months." },
  { id:"p2", cat:"Digital Transformation", title:"Why CRM modernization is the new revenue lever.",            author:"GoldPoint Practice", date:"Apr 09 · 2026", read:"6 MIN",
    excerpt:"Modern CRM is no longer a system of record; it is the operating system for revenue. A framework for what to modernize first." },
  { id:"p3", cat:"Branding Strategy",      title:"Brand authority as an inbound growth system.",               author:"Creative Practice", date:"Mar 28 · 2026", read:"10 MIN",
    excerpt:"Executive-grade brand systems compound inbound demand. How to architect a brand authority engine across owned and earned channels." },
  { id:"p4", cat:"DevOps",                 title:"From CI/CD to continuous compliance.",                       author:"Engineering Practice", date:"Mar 14 · 2026", read:"7 MIN",
    excerpt:"Compliance shifts left. A pragmatic blueprint for engineering teams shipping into regulated industries." },
  { id:"p5", cat:"UI / UX Strategy",       title:"The product design economics of premium SaaS.",              author:"Design Practice", date:"Feb 27 · 2026", read:"9 MIN",
    excerpt:"What separates a premium SaaS product from a commodity one, and how to invest design dollars where they compound." },
  { id:"p6", cat:"Enterprise Growth",      title:"Building durable demand in long sales cycles.",              author:"Growth Practice", date:"Feb 11 · 2026", read:"11 MIN",
    excerpt:"For enterprise sellers, demand is built quarters in advance. A practical model for compounding inbound pipeline." },
  { id:"p7", cat:"Automation",             title:"Workflow automation as operating leverage.",                 author:"GoldPoint Research", date:"Jan 24 · 2026", read:"5 MIN",
    excerpt:"Automation isn't a tool category, it's an operating discipline. How leaders are rebuilding execution velocity." },
  { id:"p8", cat:"SEO & Search Trends",    title:"After search: visibility in an AI-mediated web.",            author:"Growth Practice", date:"Jan 12 · 2026", read:"12 MIN",
    excerpt:"AI is reshaping how buyers discover firms. A playbook for protecting and growing visibility through the transition." },
  { id:"p9", cat:"Web Development",        title:"Headless architectures for enterprise marketing.",           author:"Engineering Practice", date:"Dec 18 · 2025", read:"8 MIN",
    excerpt:"Why headless is now the default for enterprise marketing, and what to require from your composable stack." },
];

const CATS = ["All","AI Strategy","Digital Transformation","CRM Modernization","SEO & Search Trends","UI / UX Strategy","Automation","DevOps","Enterprise Growth","Web Development","Branding Strategy"];

function InsightsPage({ onNavigate }) {
  const [cat, setCat] = useState("All");
  const featured = POSTS.find(p => p.featured);
  const rest = POSTS.filter(p => !p.featured && (cat === "All" || p.cat === cat));

  return (
    <div className="page-fade">
      <PageHeader
        kicker="Insights"
        title={<>Field notes on digital <span className="gp-serif-italic" style={{ color: "var(--gold-200)" }}>transformation.</span></>}
        lede="Research, frameworks and operating notes from the GoldPoint Digital practice, written for executives modernizing technology, brand and growth."
      />

      {/* Featured */}
      <section className="gp-section-tight">
        <div className="gp-container">
          <Reveal>
            <article style={{
              display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 64,
              borderTop: "1px solid rgba(255,255,255,0.08)",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              padding: "56px 0",
              cursor: "pointer",
            }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 32 }}>
                  <span className="gp-chip"><span className="dot"></span>Featured · {featured.cat}</span>
                  <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--steel-400)", letterSpacing: "0.12em" }}>{featured.date}</span>
                </div>
                <h2 className="gp-display" style={{ fontSize: "clamp(36px, 4.5vw, 60px)", letterSpacing: "-0.03em", lineHeight: 1.05, margin: 0 }}>{featured.title}</h2>
                <p className="gp-lede" style={{ marginTop: 24 }}>{featured.excerpt}</p>
                <div style={{ marginTop: 36, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", gap: 32, color: "var(--steel-400)", fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    <span>By {featured.author}</span>
                    <span>{featured.read} READ</span>
                  </div>
                  <a className="gp-link">Read essay <Arrow /></a>
                </div>
              </div>
              <MediaPlaceholder ratio="4/5" label="featured essay" />
            </article>
          </Reveal>
        </div>
      </section>

      {/* Filters + grid */}
      <section className="gp-section">
        <div className="gp-container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
            <div className="gp-label">Filter by category</div>
            <div className="gp-label">{rest.length} essays</div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 56 }}>
            {CATS.map(c => (
              <button key={c} onClick={() => setCat(c)} className="gp-tag" style={{
                cursor: "pointer",
                background: cat === c ? "var(--gold-300)" : "transparent",
                color: cat === c ? "var(--ink-950)" : "var(--steel-200)",
                borderColor: cat === c ? "var(--gold-300)" : "rgba(255,255,255,0.08)",
                transition: "all .2s ease",
              }}>{c}</button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, border: "1px solid rgba(255,255,255,0.08)" }}>
            {rest.map((p, i) => (
              <Reveal key={p.id} delay={i % 3}>
                <article style={{
                  padding: 36,
                  borderRight: (i % 3 !== 2) ? "1px solid rgba(255,255,255,0.08)" : "none",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                  minHeight: 320,
                  display: "flex", flexDirection: "column",
                  cursor: "pointer", transition: "background .3s",
                }}
                onMouseOver={e => e.currentTarget.style.background = "rgba(201,169,97,0.04)"}
                onMouseOut={e => e.currentTarget.style.background = "transparent"}>
                  <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--gold-300)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 28 }}>{p.cat}</div>
                  <h4 className="gp-display" style={{ fontSize: 22, lineHeight: 1.22, letterSpacing: "-0.02em", margin: 0, marginBottom: 16 }}>{p.title}</h4>
                  <p style={{ color: "var(--steel-300)", fontSize: 14, marginBottom: 24 }}>{p.excerpt}</p>
                  <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", color: "var(--steel-400)", fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.08em" }}>
                    <span>{p.date}</span>
                    <span>{p.read}</span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="gp-section-tight" style={{ background: "var(--ink-1000)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="gp-container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            <div>
              <div className="gp-eyebrow" style={{ marginBottom: 20 }}>Subscribe · GoldPoint Field Notes</div>
              <h3 className="gp-display gp-h3" style={{ margin: 0, letterSpacing: "-0.02em" }}>Research delivered monthly to executive teams modernizing their stack.</h3>
            </div>
            <div>
              <NewsletterForm />
              <div style={{ color: "var(--steel-400)", fontSize: 12, marginTop: 16, fontFamily: "var(--f-mono)", letterSpacing: "0.08em" }}>NO SPAM · MONTHLY ESSAY · UNSUBSCRIBE ANYTIME</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------- Newsletter signup (Formspree) ---------- */
function NewsletterForm() {
  const [state, handleSubmit] = useForm("mgoqrloj");

  if (state.succeeded) {
    return (
      <div style={{ borderTop: "1px solid var(--gold-line)", paddingTop: 24 }}>
        <div className="gp-eyebrow" style={{ marginBottom: 12, color: "var(--gold-200)" }}>Subscribed</div>
        <p style={{ color: "var(--steel-200)", margin: 0, lineHeight: 1.5 }}>
          You're on the list. Look out for GoldPoint Field Notes in your inbox.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="form_type" value="Newsletter Signup" />
      <input type="hidden" name="_subject" value="New GoldPoint Field Notes subscriber" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 16, alignItems: "end" }}>
        <div>
          <label className="gp-label" htmlFor="newsletter-email">Work email</label>
          <input id="newsletter-email" name="email" type="email" required className="gp-input" placeholder="you@company.com" />
        </div>
        <button type="submit" disabled={state.submitting} className="gp-btn gp-btn-gold" style={{ opacity: state.submitting ? 0.6 : 1, cursor: state.submitting ? "wait" : "pointer" }}>
          {state.submitting ? "Sending…" : <>Subscribe <Arrow /></>}
        </button>
      </div>
      <ValidationError prefix="Email" field="email" errors={state.errors} className="gp-form-error" />
      <ValidationError errors={state.errors} className="gp-form-error" />
    </form>
  );
}

export default InsightsPage;
