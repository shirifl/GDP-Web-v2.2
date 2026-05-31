// GoldPoint Digital — Legal pages (Privacy, Terms, Security)
import React from "react";
import { PageHeader, Reveal, Arrow } from "../components.jsx";

/* ---------- Shared legal layout ---------- */
function LegalLayout({ kicker, title, updated, intro, sections, onNavigate }) {
  return (
    <div className="page-fade">
      <PageHeader kicker={kicker} title={title} lede={intro} />

      <section className="gp-section" style={{ paddingTop: 24 }}>
        <div className="gp-container">
          <div className="gp-legal-grid" style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 64, alignItems: "start" }}>
            {/* Sticky contents */}
            <aside className="gp-legal-aside" style={{ position: "sticky", top: 120 }}>
              <div className="gp-label" style={{ marginBottom: 20 }}>Contents</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                {sections.map((s, i) => (
                  <li key={i}>
                    <button
                      onClick={() => {
                        const el = document.getElementById("sec-" + i);
                        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 110, behavior: "smooth" });
                      }}
                      style={{ display: "grid", gridTemplateColumns: "32px 1fr", gap: 10, width: "100%", textAlign: "left",
                        padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.08)", color: "var(--steel-200)",
                        fontSize: 14, cursor: "pointer", transition: "color .2s" }}
                      onMouseOver={e => e.currentTarget.style.color = "var(--gold-200)"}
                      onMouseOut={e => e.currentTarget.style.color = "var(--steel-200)"}>
                      <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--gold-400)" }}>{String(i+1).padStart(2,'0')}</span>
                      <span>{s.h}</span>
                    </button>
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: 28 }}>
                <div className="gp-label" style={{ marginBottom: 8 }}>Last updated</div>
                <div style={{ fontSize: 14, color: "var(--steel-200)" }}>{updated}</div>
              </div>
            </aside>

            {/* Body */}
            <div style={{ maxWidth: 760 }}>
              {sections.map((s, i) => (
                <Reveal key={i}>
                  <div id={"sec-" + i} style={{ paddingBottom: 40, marginBottom: 40, borderBottom: i < sections.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 20 }}>
                      <span style={{ fontFamily: "var(--f-mono)", fontSize: 12, color: "var(--gold-300)", letterSpacing: "0.12em" }}>{String(i+1).padStart(2,'0')}</span>
                      <h2 className="gp-display" style={{ fontSize: 26, letterSpacing: "-0.02em", margin: 0 }}>{s.h}</h2>
                    </div>
                    <div style={{ paddingLeft: 32, display: "flex", flexDirection: "column", gap: 16 }}>
                      {s.body.map((p, j) => (
                        typeof p === "string"
                          ? <p key={j} style={{ color: "var(--steel-200)", fontSize: 16, lineHeight: 1.65, margin: 0 }}>{p}</p>
                          : <ul key={j} style={{ margin: 0, paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                              {p.map((li, k) => (
                                <li key={k} style={{ display: "grid", gridTemplateColumns: "16px 1fr", gap: 12, color: "var(--steel-200)", fontSize: 15, lineHeight: 1.55 }}>
                                  <span style={{ width: 5, height: 5, background: "var(--gold-300)", marginTop: 9 }}></span>
                                  <span>{li}</span>
                                </li>
                              ))}
                            </ul>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}

              <div style={{ marginTop: 16, padding: 28, border: "1px solid var(--gold-line)", background: "rgba(201,169,97,0.04)" }}>
                <h4 className="gp-display" style={{ fontSize: 20, letterSpacing: "-0.02em", margin: 0, marginBottom: 10 }}>Questions about this policy?</h4>
                <p style={{ color: "var(--steel-300)", fontSize: 14, margin: 0, marginBottom: 18 }}>
                  Reach our team at <a href="mailto:info@goldpointdigital.com" style={{ color: "var(--gold-200)", borderBottom: "1px solid var(--gold-line-strong)" }}>info@goldpointdigital.com</a>.
                </p>
                <button className="gp-btn gp-btn-ghost" style={{ height: 44, fontSize: 13 }} onClick={() => onNavigate("contact")}>Contact us <Arrow size={12} /></button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------- Privacy Policy ---------- */
export function PrivacyPage({ onNavigate }) {
  return (
    <LegalLayout
      onNavigate={onNavigate}
      kicker="Legal"
      title="Privacy Policy"
      updated="May 29, 2026"
      intro="GoldPoint Digital respects your privacy and is committed to protecting the personal information you share with us. This policy explains what we collect, how we use it and the choices available to you."
      sections={[
        { h: "Information we collect", body: [
          "We collect information you provide directly, such as your name, email address and any details submitted through our consultation and contact forms.",
          "We also collect limited technical information automatically, including device type, browser, and general usage data, to operate and improve the website.",
        ]},
        { h: "How we use information", body: [
          "We use the information we collect to:",
          ["Respond to inquiries and schedule consultations","Provide and improve our services","Communicate updates you have requested","Maintain the security and performance of our website"],
        ]},
        { h: "Sharing of information", body: [
          "We do not sell your personal information. We may share information with trusted service providers who support our operations, and only to the extent necessary to deliver our services.",
          "We may disclose information where required by law or to protect the rights, safety and property of GoldPoint Digital and others.",
        ]},
        { h: "Data retention", body: [
          "We retain personal information only for as long as necessary to fulfill the purposes described in this policy, or as required by applicable law.",
        ]},
        { h: "Your choices", body: [
          "You may request access to, correction of, or deletion of your personal information at any time by contacting us.",
          "You can opt out of non-essential communications by following the unsubscribe instructions included in our emails.",
        ]},
        { h: "Contact", body: [
          "If you have questions about this Privacy Policy or how your information is handled, please contact us at info@goldpointdigital.com.",
        ]},
      ]}
    />
  );
}

/* ---------- Terms of Use ---------- */
export function TermsPage({ onNavigate }) {
  return (
    <LegalLayout
      onNavigate={onNavigate}
      kicker="Legal"
      title="Terms of Use"
      updated="May 29, 2026"
      intro="By accessing or using the GoldPoint Digital website, services or content, you agree to comply with these Terms of Use. Please read them carefully."
      sections={[
        { h: "Acceptance of terms", body: [
          "By accessing or using this website, you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree, please do not use the website.",
        ]},
        { h: "Use of the website", body: [
          "You agree not to:",
          ["Use the website for any unlawful purpose","Attempt unauthorized access to our systems or data","Copy proprietary content without authorization","Interfere with or disrupt the operation of the website"],
        ]},
        { h: "Intellectual property", body: [
          "All website content, branding, designs, graphics, text, code and intellectual property are owned by GoldPoint Digital unless otherwise stated, and may not be used without prior written permission.",
        ]},
        { h: "Service availability", body: [
          "GoldPoint Digital reserves the right to modify, update or discontinue services or website functionality at any time without notice.",
          "We do not guarantee uninterrupted website availability and shall not be liable for damages resulting from service interruptions.",
        ]},
        { h: "Limitation of liability", body: [
          "The website and its content are provided on an \"as is\" basis. To the fullest extent permitted by law, GoldPoint Digital disclaims all warranties and shall not be liable for any indirect or consequential damages arising from your use of the website.",
        ]},
        { h: "Acceptance", body: [
          "Continued use of this website constitutes acceptance of these terms. For questions, contact info@goldpointdigital.com.",
        ]},
      ]}
    />
  );
}

/* ---------- Security ---------- */
export function SecurityPage({ onNavigate }) {
  return (
    <LegalLayout
      onNavigate={onNavigate}
      kicker="Trust & Security"
      title="Security"
      updated="May 29, 2026"
      intro="Security is foundational to how we build and operate. This overview summarizes the practices we apply across our website and client engagements."
      sections={[
        { h: "Data protection", body: [
          "All traffic to our website is encrypted in transit using modern TLS. Sensitive data is handled according to the principle of least privilege and stored only as long as needed.",
        ]},
        { h: "Infrastructure security", body: [
          "Our practices include:",
          ["Encryption in transit and at rest","Secure, monitored hosting environments","Security headers and hardened configurations","Regular backups and recovery testing","Protection against common web threats"],
        ]},
        { h: "Access controls", body: [
          "We apply role-based access controls and multi-factor authentication across internal systems, ensuring only authorized personnel can access sensitive information.",
        ]},
        { h: "Engagement security", body: [
          "For client engagements, we align to your security and compliance requirements, including data handling agreements, confidentiality terms and industry-specific obligations where applicable.",
        ]},
        { h: "Reporting a concern", body: [
          "If you believe you have found a security issue, please contact us promptly at info@goldpointdigital.com so we can investigate and respond.",
        ]},
      ]}
    />
  );
}
