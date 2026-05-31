// GoldPoint Digital — shared components
import React, { useState, useEffect, useRef } from "react";
import iconUrl from "./assets/goldpoint-icon.png";

/* ---------- Reveal on scroll ---------- */
export function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    // Fail-open: if anything goes wrong, reveal after a beat so content is never stuck hidden.
    const fallback = setTimeout(() => el.classList.add("in"), 1200);
    // Reveal immediately if already within (or near) the viewport on mount.
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const r = el.getBoundingClientRect();
    if (r.top < vh * 0.92 && r.bottom > 0) {
      el.classList.add("in");
      clearTimeout(fallback);
      return () => {};
    }
    let io;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => entries.forEach(e => {
          if (e.isIntersecting) { el.classList.add("in"); clearTimeout(fallback); io.unobserve(el); }
        }),
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
      io.observe(el);
    } else {
      el.classList.add("in");
      clearTimeout(fallback);
    }
    return () => { clearTimeout(fallback); if (io) io.disconnect(); };
  }, []);
  return (
    <Tag ref={ref} data-delay={delay || undefined} className={`gp-reveal ${className}`} {...rest}>{children}</Tag>
  );
}

/* ---------- Logo wordmark ---------- */
export function Logo({ onClick, large }) {
  return (
    <a className={"gp-logo" + (large ? " gp-logo-lg" : "")} href="#/" onClick={(e) => { e.preventDefault(); onClick?.(); }}>
      <img src={iconUrl} alt="GoldPoint Digital" className="gp-logo-icon" />
      <span className="gp-logo-wm">
        <span className="gp-logo-name">GoldPoint</span>
        <span className="gp-logo-tag">Digital</span>
      </span>
    </a>
  );
}

/* ---------- Top Nav ---------- */
const NAV = [
  { id: "home",    label: "Home" },
  { id: "services", label: "Services" },
  { id: "solutions", label: "Solutions" },
  { id: "industries", label: "Industries" },
  { id: "about", label: "About" },
  { id: "insights", label: "Insights" },
  { id: "contact", label: "Contact" },
];

export function Nav({ active, onNavigate }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const go = (id) => { setOpen(false); onNavigate(id); };

  return (
    <nav className="gp-nav">
      <div className="gp-nav-inner">
        <Logo onClick={() => go("home")} />
        <div className="gp-nav-links">
          {NAV.map(n => (
            <a
              key={n.id}
              href={`#/${n.id}`}
              className={active === n.id ? "active" : ""}
              onClick={(e) => { e.preventDefault(); go(n.id); }}
            >{n.label}</a>
          ))}
        </div>
        <button className="gp-btn gp-btn-gold gp-nav-cta" onClick={() => go("contact")}>
          Schedule a Consultation
          <Arrow />
        </button>
        <button
          className={"gp-burger" + (open ? " open" : "")}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
        >
          <span></span><span></span><span></span>
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={"gp-mobile-menu" + (open ? " open" : "")}>
        <div className="gp-mobile-links">
          {NAV.map((n, i) => (
            <a
              key={n.id}
              href={`#/${n.id}`}
              className={active === n.id ? "active" : ""}
              style={{ transitionDelay: open ? (i * 0.04 + 0.05) + "s" : "0s" }}
              onClick={(e) => { e.preventDefault(); go(n.id); }}
            >
              <span className="idx">{String(i + 1).padStart(2, "0")}</span>
              {n.label}
            </a>
          ))}
        </div>
        <button className="gp-btn gp-btn-gold" style={{ width: "100%", justifyContent: "center", marginTop: 28 }} onClick={() => go("contact")}>
          Schedule a Consultation <Arrow />
        </button>
        <div className="gp-mobile-foot">
          <a href="mailto:sales@goldpointdigital.com">sales@goldpointdigital.com</a>
          <a href="mailto:info@goldpointdigital.com">info@goldpointdigital.com</a>
        </div>
      </div>
    </nav>
  );
}

/* ---------- Footer ---------- */
export function Footer({ onNavigate }) {
  return (
    <footer className="gp-footer">
      <div className="gp-container">
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr 1fr", gap: 48, alignItems: "start" }}>
          <div>
            <Logo onClick={() => onNavigate("home")} />
            <p style={{ color: "var(--steel-300)", marginTop: 24, maxWidth: 380, lineHeight: 1.6 }}>
              Enterprise digital transformation, AI engineering and growth consulting for organizations modernizing the way they operate, sell and scale.
            </p>
            <div style={{ marginTop: 28, display: "flex", gap: 12, alignItems: "center" }}>
              <span className="gp-chip"><span className="dot"></span> Remote · Global</span>
            </div>
          </div>
          <FootCol title="Services" items={[
            ["Executive Consulting","services"],
            ["AI Development","services"],
            ["Web Development","services"],
            ["Mobile Applications","services"],
            ["UI / UX Design","services"],
            ["CRM & Automation","services"],
          ]} onNavigate={onNavigate} />
          <FootCol title="Solutions" items={[
            ["Systems Integration","solutions"],
            ["DevOps & Engineering","solutions"],
            ["Branding & Creative","solutions"],
            ["Digital Growth","solutions"],
            ["Revenue Operations","solutions"],
          ]} onNavigate={onNavigate} />
          <FootCol title="Company" items={[
            ["About","about"],
            ["Industries","industries"],
            ["Insights","insights"],
            ["Careers","careers"],
            ["Contact","contact"],
          ]} onNavigate={onNavigate} />
          <FootCol title="Connect" items={[
            ["sales@goldpointdigital.com","contact"],
            ["info@goldpointdigital.com","contact"],
          ]} onNavigate={onNavigate} />
        </div>

        <hr className="gp-rule" style={{ margin: "64px 0 24px" }} />
        <div style={{ display: "flex", justifyContent: "space-between", color: "var(--steel-400)", fontSize: 12, fontFamily: "var(--f-mono)", letterSpacing: "0.06em", textTransform: "uppercase", flexWrap: "wrap", gap: 16 }}>
          <div>© 2026 GoldPoint Digital · All Rights Reserved</div>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            <a href="#/terms" onClick={(e)=>{e.preventDefault();onNavigate("terms");}}>Terms of Use</a>
            <a href="#/privacy" onClick={(e)=>{e.preventDefault();onNavigate("privacy");}}>Privacy Policy</a>
            <a href="#/security" onClick={(e)=>{e.preventDefault();onNavigate("security");}}>Security</a>
            <span>Status · <span style={{ color: "var(--gold-300)" }}>All systems operational</span></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
export function FootCol({ title, items, onNavigate }) {
  return (
    <div>
      <div className="gp-label" style={{ marginBottom: 20 }}>{title}</div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
        {items.map(([label, target], i) => (
          <li key={i}>
            <a href={`#/${target}`} onClick={(e)=>{e.preventDefault();onNavigate(target);}}
               style={{ color: "var(--steel-200)", fontSize: 14, transition: "color .2s" }}
               onMouseOver={e=>e.currentTarget.style.color="var(--gold-200)"}
               onMouseOut={e=>e.currentTarget.style.color="var(--steel-200)"}>
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Small bits ---------- */
export function Arrow({ size = 14 }) {
  return (
    <svg className="arr" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  );
}

export function SectionHead({ index, eyebrow, title, lede, align = "left", action }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 32, alignItems: "end", marginBottom: 56, textAlign: align }}>
      <div className="gp-index" style={{ paddingTop: 8 }}>{index}</div>
      <div>
        <div className="gp-eyebrow" style={{ marginBottom: 24 }}>{eyebrow}</div>
        <h2 className="gp-display gp-h2" style={{ margin: 0, maxWidth: 18 + "ch" }}>{title}</h2>
        {lede && <p className="gp-lede" style={{ marginTop: 20 }}>{lede}</p>}
      </div>
      <div>{action}</div>
    </div>
  );
}

/* ---------- Page Header (sub-pages) ---------- */
export function PageHeader({ kicker, title, lede, meta }) {
  return (
    <header style={{ paddingTop: 200, paddingBottom: 80, position: "relative", overflow: "hidden" }}>
      <div className="gp-bg-grid" style={{ position: "absolute", inset: 0, opacity: 0.5 }}></div>
      <div className="gp-shimmer"></div>
      <div className="gp-container" style={{ position: "relative" }}>
        <Reveal>
          <div className="gp-eyebrow" style={{ marginBottom: 32 }}>{kicker}</div>
        </Reveal>
        <Reveal delay={1}>
          <h1 className="gp-display gp-h1" style={{ margin: 0, maxWidth: "16ch" }}>{title}</h1>
        </Reveal>
        {lede && (
          <Reveal delay={2}>
            <p className="gp-lede" style={{ marginTop: 32, maxWidth: 740 }}>{lede}</p>
          </Reveal>
        )}
        {meta && (
          <Reveal delay={3}>
            <div style={{ marginTop: 56, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.08)", display: "grid", gridTemplateColumns: `repeat(${meta.length}, minmax(0,1fr))`, gap: 24 }}>
              {meta.map((m, i) => (
                <div key={i}>
                  <div className="gp-label" style={{ marginBottom: 10 }}>{m.label}</div>
                  <div style={{ fontFamily: "var(--f-display)", fontSize: 18, color: "var(--bone-100)" }}>{m.value}</div>
                </div>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </header>
  );
}

/* ---------- Animated counter ---------- */
export function Counter({ to, prefix = "", suffix = "", duration = 1800 }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    let raf, start;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const step = (ts) => {
          if (!start) start = ts;
          const p = Math.min(1, (ts - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(to * eased);
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
        io.disconnect();
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);
  const formatted = to >= 100 ? Math.round(val) : val.toFixed(1);
  return <span ref={ref} className="gp-stat-num">{prefix}{formatted}{suffix}</span>;
}

/* ---------- Service Row ---------- */
export function ServiceRow({ index, title, meta, tags, onClick }) {
  return (
    <div className="gp-row" onClick={onClick}>
      <span className="gp-index">{index}</span>
      <div>
        <div className="gp-row-title">{title}</div>
        {tags && (
          <div className="gp-taglist" style={{ marginTop: 14 }}>
            {tags.map((t, i) => <span key={i} className="gp-tag">{t}</span>)}
          </div>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <span className="gp-row-meta">{meta}</span>
        <span className="gp-crosshair"></span>
      </div>
    </div>
  );
}

/* ---------- Hero Visual: Digital Transformation Growth Chart ---------- */
export function HeroVisual() {
  const [draw, setDraw] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let raf;
    const tick = () => {
      const p = Math.min(1, (performance.now() - start) / 2400);
      setDraw(p < 1 ? 1 - Math.pow(1 - p, 3) : 1);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Pre / Post curve points
  const W = 600, H = 380;
  const baseline = [
    [0, 270], [60, 268], [120, 272], [180, 266], [240, 264], [300, 262],
  ];
  const lift = [
    [300, 262], [360, 230], [420, 188], [480, 138], [540, 90], [600, 58],
  ];
  const toPath = (pts) => pts.map((p, i) => (i === 0 ? "M" : "L") + p[0] + " " + p[1]).join(" ");
  const baselinePath = toPath(baseline);
  const liftPath = toPath(lift);
  const areaPath = liftPath + ` L${W} ${H} L${lift[0][0]} ${H} Z`;
  const liftLen = 720;

  return (
    <div className="hero-chart">
      <div className="hc-glow"></div>

      {/* Top-right live tag */}
      <div className="hc-livetag">
        <span className="pulse-dot"></span>
        <span>Live · Practice Telemetry</span>
      </div>

      {/* Chart frame */}
      <div className="hc-frame">
        <span className="hp-corner tl"></span>
        <span className="hp-corner tr"></span>
        <span className="hp-corner bl"></span>
        <span className="hp-corner br"></span>

        <div className="hc-header">
          <div>
            <div className="gp-label" style={{ marginBottom: 6, color: "var(--gold-300)" }}>Digital Transformation Outcome</div>
            <div style={{ fontFamily: "var(--f-display)", fontSize: 17, letterSpacing: "-0.01em" }}>
              Revenue trajectory, before vs after engagement
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div className="gp-label">Index</div>
            <div style={{ fontFamily: "var(--f-display)", fontSize: 26, color: "var(--gold-200)", letterSpacing: "-0.02em" }}>+312%</div>
          </div>
        </div>

        <svg className="hc-svg" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
          <defs>
            <linearGradient id="goldLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="rgba(201,169,97,0.0)" />
              <stop offset="0.18" stopColor="rgba(201,169,97,0.5)" />
              <stop offset="0.5" stopColor="#e4cc8d" />
              <stop offset="1" stopColor="#c9a961" />
            </linearGradient>
            <linearGradient id="goldArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="rgba(201,169,97,0.32)" />
              <stop offset="1" stopColor="rgba(201,169,97,0)" />
            </linearGradient>
            <linearGradient id="dimLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="rgba(255,255,255,0.28)" />
              <stop offset="1" stopColor="rgba(255,255,255,0.16)" />
            </linearGradient>
          </defs>

          {/* Grid */}
          {[1,2,3,4].map(i => (
            <line key={"h"+i} x1="0" y1={i*70} x2={W} y2={i*70} stroke="rgba(255,255,255,0.04)" />
          ))}
          {[1,2,3,4,5].map(i => (
            <line key={"v"+i} x1={i*100} y1="0" x2={i*100} y2={H} stroke="rgba(255,255,255,0.03)" />
          ))}

          {/* Vertical "engagement starts" marker */}
          <line x1="300" y1="0" x2="300" y2={H} stroke="rgba(201,169,97,0.35)" strokeDasharray="2 4" />
          <text x="305" y="20" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="var(--gold-300)" letterSpacing="2">ENGAGEMENT START</text>

          {/* Baseline (flat) */}
          <path d={baselinePath} fill="none" stroke="url(#dimLine)" strokeWidth="1.5" />
          {/* Baseline projected dashed */}
          <path d="M300 262 L600 254" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeDasharray="3 5" />

          {/* Growth area under lift */}
          <path d={areaPath} fill="url(#goldArea)" style={{ opacity: draw }} />
          {/* Lift line */}
          <path d={liftPath}
                fill="none"
                stroke="url(#goldLine)"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={liftLen}
                strokeDashoffset={liftLen * (1 - draw)}
                style={{ filter: "drop-shadow(0 0 10px rgba(201,169,97,0.5))" }} />

          {/* Data points on lift */}
          {lift.map((p, i) => (
            <circle key={i} cx={p[0]} cy={p[1]} r={i === lift.length - 1 ? 5 : 2.5}
              fill={i === lift.length - 1 ? "#e4cc8d" : "#c9a961"}
              style={{ opacity: draw > i / lift.length ? 1 : 0, transition: "opacity .3s" }} />
          ))}

          {/* Bars at bottom (capability volume) */}
          {[8, 14, 22, 30, 44, 60].map((h, i) => {
            const x = 308 + i * 48;
            return (
              <rect key={i} x={x} y={H - h - 8} width="14" height={h * draw}
                fill={i === 5 ? "#c9a961" : "rgba(201,169,97,0.32)"} />
            );
          })}

          {/* X-axis labels */}
          <g fontFamily="JetBrains Mono, monospace" fontSize="9" fill="rgba(255,255,255,0.4)" letterSpacing="1">
            <text x="0" y={H - 4}>Q1</text>
            <text x="100" y={H - 4}>Q2</text>
            <text x="200" y={H - 4}>Q3</text>
            <text x="300" y={H - 4}>Q4</text>
            <text x="400" y={H - 4}>Q5</text>
            <text x="500" y={H - 4}>Q6</text>
            <text x="578" y={H - 4}>Q7</text>
          </g>
        </svg>

        {/* Legend */}
        <div className="hc-legend">
          <span><span className="sw dim"></span>Pre-engagement baseline</span>
          <span><span className="sw gold"></span>Post-engagement growth</span>
        </div>
      </div>

      {/* Floating KPI cards */}
      <div className="hc-kpi hc-kpi-tl">
        <div className="hc-kpi-label">AI Workflows</div>
        <div className="hc-kpi-val">+184%</div>
        <div className="hc-kpi-sub">Process velocity</div>
      </div>
      <div className="hc-kpi hc-kpi-br">
        <div className="hc-kpi-label">CRM Pipeline</div>
        <div className="hc-kpi-val">+312%</div>
        <div className="hc-kpi-sub">Qualified revenue</div>
      </div>
    </div>
  );
}

/* ---------- Placeholder media tile ---------- */
export function MediaPlaceholder({ label = "case study image", ratio = "16/10", tone = "dark", small }) {
  const bg = tone === "gold" ? "linear-gradient(135deg, #2a2010, #14181f)" : "linear-gradient(135deg, #14181f, #0a0e14)";
  return (
    <div style={{ aspectRatio: ratio, background: bg, position: "relative", overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 18px, rgba(201,169,97,0.06) 18px, rgba(201,169,97,0.06) 19px)"
      }}></div>
      <div style={{ position: "absolute", left: 16, top: 16, fontFamily: "var(--f-mono)", fontSize: 10, letterSpacing: 2, color: "var(--steel-400)", textTransform: "uppercase" }}>
        ▢ {label}
      </div>
      <div style={{ position: "absolute", right: 16, bottom: 16, fontFamily: "var(--f-mono)", fontSize: 10, letterSpacing: 2, color: "var(--gold-300)" }}>
        IMG_{String(Math.floor(Math.random()*900)+100)}
      </div>
      {!small && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 56, height: 56, border: "1px solid var(--gold-300)", position: "relative" }}>
            <div className="gp-crosshair" style={{ width: 24, height: 24, position: "absolute", inset: "50% auto auto 50%", transform: "translate(-50%,-50%)" }}></div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Final CTA (shared) ---------- */
export function FinalCTA({ onNavigate }) {
  return (
    <section className="gp-section" style={{ background: "var(--ink-1000)", borderTop: "1px solid rgba(255,255,255,0.06)", position: "relative", overflow: "hidden" }}>
      <div className="gp-shimmer"></div>
      <div className="gp-container" style={{ position: "relative", textAlign: "center" }}>
        <Reveal>
          <div className="gp-eyebrow" style={{ marginBottom: 36, justifyContent: "center" }}>Engagement</div>
        </Reveal>
        <Reveal delay={1}>
          <h2 className="gp-display" style={{ fontSize: "clamp(48px, 7vw, 96px)", margin: 0, letterSpacing: "-0.03em", maxWidth: "16ch", marginLeft: "auto", marginRight: "auto" }}>
            Ready to scale <span className="gp-serif-italic" style={{ color: "var(--gold-200)" }}>smarter?</span>
          </h2>
        </Reveal>
        <Reveal delay={2}>
          <p className="gp-lede" style={{ margin: "32px auto 0", maxWidth: 720 }}>
            Whether you need digital transformation, AI integration, software development, CRM modernization, branding, automation or growth strategy, GoldPoint Digital is built to help modern organizations move faster and scale intelligently.
          </p>
        </Reveal>
        <Reveal delay={3}>
          <div style={{ marginTop: 56, display: "inline-flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
            <button className="gp-btn gp-btn-gold" onClick={() => onNavigate("contact")}>Schedule a Strategy Call <Arrow /></button>
            <button className="gp-btn gp-btn-ghost" onClick={() => onNavigate("contact")}>Request a Proposal <Arrow /></button>
          </div>
        </Reveal>
        <Reveal delay={4}>
          <div style={{ marginTop: 72, display: "flex", justifyContent: "center", gap: 40, color: "var(--steel-400)", fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", flexWrap: "wrap" }}>
            <span>sales@goldpointdigital.com</span>
            <span>·</span>
            <span>Replies within 24 hours</span>
            <span>·</span>
            <span>Long-term enterprise retainers</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
