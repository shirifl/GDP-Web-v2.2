// GoldPoint Digital, Contact page (simplified consultation booking)
import { useState, useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { Arrow, PageHeader, Reveal } from "../components.jsx";

function ContactPage({ onNavigate }) {
  const SESSIONS = [
    { id: "15", len: "15 min", title: "Intro Call", desc: "A quick fit check to understand your goals and point you in the right direction." },
    { id: "30", len: "30 min", title: "Consultation", desc: "A focused working session on a specific initiative, challenge or opportunity." },
    { id: "60", len: "60 min", title: "Strategic Discussion", desc: "A deep-dive with our team to map a transformation, AI or growth roadmap." },
  ];

  const [session, setSession] = useState("30");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [state, handleSubmit, reset] = useForm("mgoqrloj");
  const selected = SESSIONS.find((s) => s.id === session);

  useEffect(() => {
    if (state.succeeded) window.scrollTo({ top: 0, behavior: "smooth" });
  }, [state.succeeded]);

  return (
    <div className="page-fade">
      <PageHeader
        kicker="Schedule a Consultation"
        title={<>Let's build something <span className="gp-serif-italic" style={{ color: "var(--gold-200)" }}>exceptional.</span></>}
        lede="Tell us who you are and pick a session length. A member of our team will confirm your time, typically within 24 hours."
      />

      <section className="gp-section" style={{ paddingTop: 24 }}>
        <div className="gp-container">
          {!state.succeeded ? (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
              {/* Left, session picker */}
              <Reveal>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 32 }}>
                  <div className="gp-label" style={{ marginBottom: 20 }}>Step 1 · Choose a session</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {SESSIONS.map(s => {
                      const on = session === s.id;
                      return (
                        <button key={s.id} type="button" onClick={() => setSession(s.id)} style={{
                          display: "grid", gridTemplateColumns: "auto 1fr", gap: 20, alignItems: "center",
                          textAlign: "left", padding: "22px 24px",
                          border: "1px solid " + (on ? "var(--gold-300)" : "rgba(255,255,255,0.1)"),
                          background: on ? "rgba(201,169,97,0.07)" : "transparent",
                          cursor: "pointer", transition: "all .2s",
                        }}>
                          <span style={{
                            fontFamily: "var(--f-display)", fontSize: 22, letterSpacing: "-0.02em",
                            color: on ? "var(--gold-200)" : "var(--bone-100)",
                            minWidth: 72,
                          }}>{s.len}</span>
                          <span>
                            <span style={{ display: "block", fontFamily: "var(--f-display)", fontSize: 18, letterSpacing: "-0.015em", marginBottom: 4 }}>{s.title}</span>
                            <span style={{ display: "block", color: "var(--steel-300)", fontSize: 13, lineHeight: 1.45 }}>{s.desc}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 12, color: "var(--steel-300)", fontSize: 14 }}>
                    <span className="pulse-dot"></span>
                    Prefer email? Reach us directly at <a href="mailto:sales@goldpointdigital.com" style={{ color: "var(--gold-200)", borderBottom: "1px solid var(--gold-line-strong)" }}>sales@goldpointdigital.com</a>
                  </div>
                </div>
              </Reveal>

              {/* Right, minimal form */}
              <Reveal delay={1}>
                <form
                  onSubmit={handleSubmit}
                  style={{ borderTop: "1px solid var(--gold-line)", paddingTop: 32 }}
                >
                  <div className="gp-label" style={{ marginBottom: 28 }}>Step 2 · Your details</div>

                  {/* Hidden metadata sent to Formspree */}
                  <input type="hidden" name="form_type" value="Consultation Request" />
                  <input type="hidden" name="session" value={`${selected.len} · ${selected.title}`} />
                  <input
                    type="hidden"
                    name="_subject"
                    value={`New consultation request · ${selected.len} ${selected.title}`}
                  />

                  <Field label="Name *">
                    <input id="name" name="name" className="gp-input" required placeholder="First & last name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                    <ValidationError prefix="Name" field="name" errors={state.errors} className="gp-form-error" />
                  </Field>
                  <Field label="Email *">
                    <input id="email" name="email" type="email" className="gp-input" required placeholder="you@company.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                    <ValidationError prefix="Email" field="email" errors={state.errors} className="gp-form-error" />
                  </Field>
                  <Field label="What would you like to discuss? (optional)">
                    <textarea id="message" name="message" className="gp-textarea" rows="3" placeholder="A sentence or two of context helps us prepare."
                      value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                    <ValidationError prefix="Message" field="message" errors={state.errors} className="gp-form-error" />
                  </Field>

                  <div style={{ marginTop: 32, padding: "18px 20px", border: "1px solid rgba(255,255,255,0.08)", background: "var(--ink-900)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span className="gp-label">Selected session</span>
                    <span style={{ fontFamily: "var(--f-display)", fontSize: 17, color: "var(--gold-200)" }}>
                      {selected.len} · {selected.title}
                    </span>
                  </div>

                  <ValidationError errors={state.errors} className="gp-form-error" style={{ marginTop: 16 }} />

                  <button type="submit" disabled={state.submitting} className="gp-btn gp-btn-gold" style={{ marginTop: 28, width: "100%", justifyContent: "center", opacity: state.submitting ? 0.6 : 1, cursor: state.submitting ? "wait" : "pointer" }}>
                    {state.submitting ? "Sending…" : <>Request This Time <Arrow /></>}
                  </button>
                  <div style={{ color: "var(--steel-400)", fontFamily: "var(--f-mono)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 18, textAlign: "center" }}>
                    Secured · TLS 1.3 · No obligation
                  </div>
                </form>
              </Reveal>
            </div>
          ) : (
            <SubmittedState
              session={selected}
              name={form.name}
              onReset={() => { reset(); setForm({ name: "", email: "", message: "" }); }}
              onNavigate={onNavigate}
            />
          )}
        </div>
      </section>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ marginTop: 28 }}>
      <label className="gp-label">{label}</label>
      {children}
    </div>
  );
}

function SubmittedState({ session, name, onReset, onNavigate }) {
  return (
    <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center", borderTop: "1px solid var(--gold-line)", paddingTop: 64 }}>
      <span className="gp-eyebrow" style={{ marginBottom: 24, justifyContent: "center" }}>Request received</span>
      <h3 className="gp-display gp-h2" style={{ margin: "24px 0 0", letterSpacing: "-0.03em" }}>
        Thank you{name ? ", " + name.split(" ")[0] : ""}. <span className="gp-serif-italic" style={{ color: "var(--gold-200)" }}>We'll confirm shortly.</span>
      </h3>
      <p className="gp-lede" style={{ marginTop: 24, marginLeft: "auto", marginRight: "auto" }}>
        We've reserved your interest in a <strong style={{ color: "var(--bone-100)" }}>{session.len} {session.title}</strong>. A member of our team will email you to confirm a time, typically within 24 hours.
      </p>
      <div style={{ marginTop: 40, display: "inline-flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
        <button className="gp-btn gp-btn-ghost" onClick={onReset}>Book another session <Arrow /></button>
        <button className="gp-btn gp-btn-primary" onClick={() => onNavigate("insights")}>Read our insights <Arrow /></button>
      </div>
    </div>
  );
}

export default ContactPage;
