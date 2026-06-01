function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const GP_ICON = "assets/goldpoint-icon.png";
const GP_FORM_ENDPOINT = "https://formspree.io/f/mgoqrloj";

/* ===================== components.jsx ===================== */
// GoldPoint Digital, shared components
// Loaded as type="text/babel"; exports to window for cross-script sharing.

const {
  useState,
  useEffect,
  useRef,
  useMemo
} = React;

/* ---------- Reveal on scroll ---------- */
function Reveal({
  as: Tag = "div",
  delay = 0,
  className = "",
  children,
  ...rest
}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
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
      io = new IntersectionObserver(entries => entries.forEach(e => {
        if (e.isIntersecting) {
          el.classList.add("in");
          clearTimeout(fallback);
          io.unobserve(el);
        }
      }), {
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px"
      });
      io.observe(el);
    } else {
      el.classList.add("in");
      clearTimeout(fallback);
    }
    return () => {
      clearTimeout(fallback);
      if (io) io.disconnect();
    };
  }, []);
  return /*#__PURE__*/React.createElement(Tag, _extends({
    ref: ref,
    "data-delay": delay || undefined,
    className: `gp-reveal ${className}`
  }, rest), children);
}

/* ---------- Logo wordmark ---------- */
function Logo({
  onClick,
  large
}) {
  return /*#__PURE__*/React.createElement("a", {
    className: "gp-logo" + (large ? " gp-logo-lg" : ""),
    href: "#/",
    onClick: e => {
      e.preventDefault();
      onClick?.();
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: GP_ICON,
    alt: "",
    className: "gp-logo-icon"
  }), /*#__PURE__*/React.createElement("span", {
    className: "gp-logo-wm"
  }, /*#__PURE__*/React.createElement("span", {
    className: "gp-logo-name"
  }, "GoldPoint"), /*#__PURE__*/React.createElement("span", {
    className: "gp-logo-tag"
  }, "Digital")));
}

/* ---------- Top Nav ---------- */
const NAV = [{
  id: "home",
  label: "Home"
}, {
  id: "services",
  label: "Services"
}, {
  id: "solutions",
  label: "Solutions"
}, {
  id: "industries",
  label: "Industries"
}, {
  id: "about",
  label: "About"
}, {
  id: "insights",
  label: "Insights"
}, {
  id: "contact",
  label: "Contact"
}];
function Nav({
  active,
  onNavigate
}) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  const go = id => {
    setOpen(false);
    onNavigate(id);
  };
  return /*#__PURE__*/React.createElement("nav", {
    className: "gp-nav"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-nav-inner"
  }, /*#__PURE__*/React.createElement(Logo, {
    onClick: () => go("home")
  }), /*#__PURE__*/React.createElement("div", {
    className: "gp-nav-links"
  }, NAV.map(n => /*#__PURE__*/React.createElement("a", {
    key: n.id,
    href: `#/${n.id}`,
    className: active === n.id ? "active" : "",
    onClick: e => {
      e.preventDefault();
      go(n.id);
    }
  }, n.label))), /*#__PURE__*/React.createElement("button", {
    className: "gp-btn gp-btn-gold gp-nav-cta",
    onClick: () => go("contact")
  }, "Schedule a Consultation", /*#__PURE__*/React.createElement(Arrow, null)), /*#__PURE__*/React.createElement("button", {
    className: "gp-burger" + (open ? " open" : ""),
    "aria-label": "Toggle menu",
    "aria-expanded": open,
    onClick: () => setOpen(o => !o)
  }, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null))), /*#__PURE__*/React.createElement("div", {
    className: "gp-mobile-menu" + (open ? " open" : "")
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-mobile-links"
  }, NAV.map((n, i) => /*#__PURE__*/React.createElement("a", {
    key: n.id,
    href: `#/${n.id}`,
    className: active === n.id ? "active" : "",
    style: {
      transitionDelay: open ? i * 0.04 + 0.05 + "s" : "0s"
    },
    onClick: e => {
      e.preventDefault();
      go(n.id);
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "idx"
  }, String(i + 1).padStart(2, "0")), n.label))), /*#__PURE__*/React.createElement("button", {
    className: "gp-btn gp-btn-gold",
    style: {
      width: "100%",
      justifyContent: "center",
      marginTop: 28
    },
    onClick: () => go("contact")
  }, "Schedule a Consultation ", /*#__PURE__*/React.createElement(Arrow, null)), /*#__PURE__*/React.createElement("div", {
    className: "gp-mobile-foot"
  }, /*#__PURE__*/React.createElement("a", {
    href: "mailto:sales@goldpointdigital.com"
  }, "sales@goldpointdigital.com"), /*#__PURE__*/React.createElement("a", {
    href: "mailto:info@goldpointdigital.com"
  }, "info@goldpointdigital.com"))));
}

/* ---------- Footer ---------- */
function Footer({
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("footer", {
    className: "gp-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.4fr 1fr 1fr 1fr 1fr",
      gap: 48,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Logo, {
    onClick: () => onNavigate("home")
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--steel-300)",
      marginTop: 24,
      maxWidth: 380,
      lineHeight: 1.6
    }
  }, "Enterprise digital transformation, AI engineering and growth consulting for organizations modernizing the way they operate, sell and scale."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28,
      display: "flex",
      gap: 12,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "gp-chip"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), " Remote \xB7 Global"))), /*#__PURE__*/React.createElement(FootCol, {
    title: "Services",
    items: [["Executive Consulting", "services"], ["AI Development", "services"], ["Web Development", "services"], ["Mobile Applications", "services"], ["UI / UX Design", "services"], ["CRM & Automation", "services"]],
    onNavigate: onNavigate
  }), /*#__PURE__*/React.createElement(FootCol, {
    title: "Solutions",
    items: [["Systems Integration", "solutions"], ["DevOps & Engineering", "solutions"], ["Branding & Creative", "solutions"], ["Digital Growth", "solutions"], ["Revenue Operations", "solutions"]],
    onNavigate: onNavigate
  }), /*#__PURE__*/React.createElement(FootCol, {
    title: "Company",
    items: [["About", "about"], ["Industries", "industries"], ["Insights", "insights"], ["Careers", "careers"], ["Contact", "contact"]],
    onNavigate: onNavigate
  }), /*#__PURE__*/React.createElement(FootCol, {
    title: "Connect",
    items: [["sales@goldpointdigital.com", "contact"], ["info@goldpointdigital.com", "contact"]],
    onNavigate: onNavigate
  })), /*#__PURE__*/React.createElement("hr", {
    className: "gp-rule",
    style: {
      margin: "64px 0 24px"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      color: "var(--steel-400)",
      fontSize: 12,
      fontFamily: "var(--f-mono)",
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      flexWrap: "wrap",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, "\xA9 2026 GoldPoint Digital \xB7 All Rights Reserved"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#/terms",
    onClick: e => {
      e.preventDefault();
      onNavigate("terms");
    }
  }, "Terms of Use"), /*#__PURE__*/React.createElement("a", {
    href: "#/privacy",
    onClick: e => {
      e.preventDefault();
      onNavigate("privacy");
    }
  }, "Privacy Policy"), /*#__PURE__*/React.createElement("a", {
    href: "#/security",
    onClick: e => {
      e.preventDefault();
      onNavigate("security");
    }
  }, "Security"), /*#__PURE__*/React.createElement("span", null, "Status \xB7 ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--gold-300)"
    }
  }, "All systems operational"))))));
}
function FootCol({
  title,
  items,
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "gp-label",
    style: {
      marginBottom: 20
    }
  }, title), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      padding: 0,
      margin: 0,
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, items.map(([label, target], i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, /*#__PURE__*/React.createElement("a", {
    href: `#/${target}`,
    onClick: e => {
      e.preventDefault();
      onNavigate(target);
    },
    style: {
      color: "var(--steel-200)",
      fontSize: 14,
      transition: "color .2s"
    },
    onMouseOver: e => e.currentTarget.style.color = "var(--gold-200)",
    onMouseOut: e => e.currentTarget.style.color = "var(--steel-200)"
  }, label)))));
}

/* ---------- Small bits ---------- */
function Arrow({
  size = 14
}) {
  return /*#__PURE__*/React.createElement("svg", {
    className: "arr",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14M13 6l6 6-6 6",
    strokeLinecap: "square",
    strokeLinejoin: "miter"
  }));
}
function SectionHead({
  index,
  eyebrow,
  title,
  lede,
  align = "left",
  action
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "auto 1fr auto",
      gap: 32,
      alignItems: "end",
      marginBottom: 56,
      textAlign: align
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-index",
    style: {
      paddingTop: 8
    }
  }, index), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "gp-eyebrow",
    style: {
      marginBottom: 24
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h2", {
    className: "gp-display gp-h2",
    style: {
      margin: 0,
      maxWidth: 18 + "ch"
    }
  }, title), lede && /*#__PURE__*/React.createElement("p", {
    className: "gp-lede",
    style: {
      marginTop: 20
    }
  }, lede)), /*#__PURE__*/React.createElement("div", null, action));
}

/* ---------- Page Header (sub-pages) ---------- */
function PageHeader({
  kicker,
  title,
  lede,
  meta
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      paddingTop: 200,
      paddingBottom: 80,
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-bg-grid",
    style: {
      position: "absolute",
      inset: 0,
      opacity: 0.5
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "gp-shimmer"
  }), /*#__PURE__*/React.createElement("div", {
    className: "gp-container",
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "gp-eyebrow",
    style: {
      marginBottom: 32
    }
  }, kicker)), /*#__PURE__*/React.createElement(Reveal, {
    delay: 1
  }, /*#__PURE__*/React.createElement("h1", {
    className: "gp-display gp-h1",
    style: {
      margin: 0,
      maxWidth: "16ch"
    }
  }, title)), lede && /*#__PURE__*/React.createElement(Reveal, {
    delay: 2
  }, /*#__PURE__*/React.createElement("p", {
    className: "gp-lede",
    style: {
      marginTop: 32,
      maxWidth: 740
    }
  }, lede)), meta && /*#__PURE__*/React.createElement(Reveal, {
    delay: 3
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 56,
      paddingTop: 24,
      borderTop: "1px solid rgba(255,255,255,0.08)",
      display: "grid",
      gridTemplateColumns: `repeat(${meta.length}, minmax(0,1fr))`,
      gap: 24
    }
  }, meta.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-label",
    style: {
      marginBottom: 10
    }
  }, m.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--f-display)",
      fontSize: 18,
      color: "var(--bone-100)"
    }
  }, m.value)))))));
}

/* ---------- Animated counter ---------- */
function Counter({
  to,
  prefix = "",
  suffix = "",
  duration = 1800
}) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf, start;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const step = ts => {
          if (!start) start = ts;
          const p = Math.min(1, (ts - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(to * eased);
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
        io.disconnect();
      }
    }, {
      threshold: 0.4
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);
  const formatted = to >= 100 ? Math.round(val) : val.toFixed(1);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    className: "gp-stat-num"
  }, prefix, formatted, suffix);
}

/* ---------- Service Row ---------- */
function ServiceRow({
  index,
  title,
  meta,
  tags,
  onClick
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "gp-row",
    onClick: onClick
  }, /*#__PURE__*/React.createElement("span", {
    className: "gp-index"
  }, index), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "gp-row-title"
  }, title), tags && /*#__PURE__*/React.createElement("div", {
    className: "gp-taglist",
    style: {
      marginTop: 14
    }
  }, tags.map((t, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: "gp-tag"
  }, t)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "gp-row-meta"
  }, meta), /*#__PURE__*/React.createElement("span", {
    className: "gp-crosshair"
  })));
}

/* ---------- Hero Visual: Digital Transformation Growth Chart ---------- */
function HeroVisual() {
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
  const W = 600,
    H = 380;
  const baseline = [[0, 270], [60, 268], [120, 272], [180, 266], [240, 264], [300, 262]];
  const lift = [[300, 262], [360, 230], [420, 188], [480, 138], [540, 90], [600, 58]];
  const toPath = pts => pts.map((p, i) => (i === 0 ? "M" : "L") + p[0] + " " + p[1]).join(" ");
  const baselinePath = toPath(baseline);
  const liftPath = toPath(lift);
  const areaPath = liftPath + ` L${W} ${H} L${lift[0][0]} ${H} Z`;
  const liftLen = 720;
  return /*#__PURE__*/React.createElement("div", {
    className: "hero-chart"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hc-glow"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hc-livetag"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pulse-dot"
  }), /*#__PURE__*/React.createElement("span", null, "Live \xB7 Practice Telemetry")), /*#__PURE__*/React.createElement("div", {
    className: "hc-frame"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hp-corner tl"
  }), /*#__PURE__*/React.createElement("span", {
    className: "hp-corner tr"
  }), /*#__PURE__*/React.createElement("span", {
    className: "hp-corner bl"
  }), /*#__PURE__*/React.createElement("span", {
    className: "hp-corner br"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hc-header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "gp-label",
    style: {
      marginBottom: 6,
      color: "var(--gold-300)"
    }
  }, "Digital Transformation Outcome"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--f-display)",
      fontSize: 17,
      letterSpacing: "-0.01em"
    }
  }, "Revenue trajectory, before vs after engagement")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "right"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-label"
  }, "Index"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--f-display)",
      fontSize: 26,
      color: "var(--gold-200)",
      letterSpacing: "-0.02em"
    }
  }, "+312%"))), /*#__PURE__*/React.createElement("svg", {
    className: "hc-svg",
    viewBox: `0 0 ${W} ${H}`,
    preserveAspectRatio: "none"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "goldLine",
    x1: "0",
    y1: "0",
    x2: "1",
    y2: "0"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0",
    stopColor: "rgba(201,169,97,0.0)"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "0.18",
    stopColor: "rgba(201,169,97,0.5)"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "0.5",
    stopColor: "#e4cc8d"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: "#c9a961"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: "goldArea",
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0",
    stopColor: "rgba(201,169,97,0.32)"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: "rgba(201,169,97,0)"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: "dimLine",
    x1: "0",
    y1: "0",
    x2: "1",
    y2: "0"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0",
    stopColor: "rgba(255,255,255,0.28)"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: "rgba(255,255,255,0.16)"
  }))), [1, 2, 3, 4].map(i => /*#__PURE__*/React.createElement("line", {
    key: "h" + i,
    x1: "0",
    y1: i * 70,
    x2: W,
    y2: i * 70,
    stroke: "rgba(255,255,255,0.04)"
  })), [1, 2, 3, 4, 5].map(i => /*#__PURE__*/React.createElement("line", {
    key: "v" + i,
    x1: i * 100,
    y1: "0",
    x2: i * 100,
    y2: H,
    stroke: "rgba(255,255,255,0.03)"
  })), /*#__PURE__*/React.createElement("line", {
    x1: "300",
    y1: "0",
    x2: "300",
    y2: H,
    stroke: "rgba(201,169,97,0.35)",
    strokeDasharray: "2 4"
  }), /*#__PURE__*/React.createElement("text", {
    x: "305",
    y: "20",
    fontFamily: "JetBrains Mono, monospace",
    fontSize: "9",
    fill: "var(--gold-300)",
    letterSpacing: "2"
  }, "ENGAGEMENT START"), /*#__PURE__*/React.createElement("path", {
    d: baselinePath,
    fill: "none",
    stroke: "url(#dimLine)",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M300 262 L600 254",
    fill: "none",
    stroke: "rgba(255,255,255,0.18)",
    strokeWidth: "1",
    strokeDasharray: "3 5"
  }), /*#__PURE__*/React.createElement("path", {
    d: areaPath,
    fill: "url(#goldArea)",
    style: {
      opacity: draw
    }
  }), /*#__PURE__*/React.createElement("path", {
    d: liftPath,
    fill: "none",
    stroke: "url(#goldLine)",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeDasharray: liftLen,
    strokeDashoffset: liftLen * (1 - draw),
    style: {
      filter: "drop-shadow(0 0 10px rgba(201,169,97,0.5))"
    }
  }), lift.map((p, i) => /*#__PURE__*/React.createElement("circle", {
    key: i,
    cx: p[0],
    cy: p[1],
    r: i === lift.length - 1 ? 5 : 2.5,
    fill: i === lift.length - 1 ? "#e4cc8d" : "#c9a961",
    style: {
      opacity: draw > i / lift.length ? 1 : 0,
      transition: "opacity .3s"
    }
  })), [8, 14, 22, 30, 44, 60].map((h, i) => {
    const x = 308 + i * 48;
    return /*#__PURE__*/React.createElement("rect", {
      key: i,
      x: x,
      y: H - h - 8,
      width: "14",
      height: h * draw,
      fill: i === 5 ? "#c9a961" : "rgba(201,169,97,0.32)"
    });
  }), /*#__PURE__*/React.createElement("g", {
    fontFamily: "JetBrains Mono, monospace",
    fontSize: "9",
    fill: "rgba(255,255,255,0.4)",
    letterSpacing: "1"
  }, /*#__PURE__*/React.createElement("text", {
    x: "0",
    y: H - 4
  }, "Q1"), /*#__PURE__*/React.createElement("text", {
    x: "100",
    y: H - 4
  }, "Q2"), /*#__PURE__*/React.createElement("text", {
    x: "200",
    y: H - 4
  }, "Q3"), /*#__PURE__*/React.createElement("text", {
    x: "300",
    y: H - 4
  }, "Q4"), /*#__PURE__*/React.createElement("text", {
    x: "400",
    y: H - 4
  }, "Q5"), /*#__PURE__*/React.createElement("text", {
    x: "500",
    y: H - 4
  }, "Q6"), /*#__PURE__*/React.createElement("text", {
    x: "578",
    y: H - 4
  }, "Q7"))), /*#__PURE__*/React.createElement("div", {
    className: "hc-legend"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    className: "sw dim"
  }), "Pre-engagement baseline"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    className: "sw gold"
  }), "Post-engagement growth"))), /*#__PURE__*/React.createElement("div", {
    className: "hc-kpi hc-kpi-tl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hc-kpi-label"
  }, "AI Workflows"), /*#__PURE__*/React.createElement("div", {
    className: "hc-kpi-val"
  }, "+184%"), /*#__PURE__*/React.createElement("div", {
    className: "hc-kpi-sub"
  }, "Process velocity")), /*#__PURE__*/React.createElement("div", {
    className: "hc-kpi hc-kpi-br"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hc-kpi-label"
  }, "CRM Pipeline"), /*#__PURE__*/React.createElement("div", {
    className: "hc-kpi-val"
  }, "+312%"), /*#__PURE__*/React.createElement("div", {
    className: "hc-kpi-sub"
  }, "Qualified revenue")));
}

/* ---------- Placeholder media tile ---------- */
function MediaPlaceholder({
  label = "case study image",
  ratio = "16/10",
  tone = "dark",
  small
}) {
  const bg = tone === "gold" ? "linear-gradient(135deg, #2a2010, #14181f)" : "linear-gradient(135deg, #14181f, #0a0e14)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: ratio,
      background: bg,
      position: "relative",
      overflow: "hidden",
      border: "1px solid rgba(255,255,255,0.06)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 18px, rgba(201,169,97,0.06) 18px, rgba(201,169,97,0.06) 19px)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 16,
      top: 16,
      fontFamily: "var(--f-mono)",
      fontSize: 10,
      letterSpacing: 2,
      color: "var(--steel-400)",
      textTransform: "uppercase"
    }
  }, "\u25A2 ", label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: 16,
      bottom: 16,
      fontFamily: "var(--f-mono)",
      fontSize: 10,
      letterSpacing: 2,
      color: "var(--gold-300)"
    }
  }, "IMG_", String(Math.floor(Math.random() * 900) + 100)), !small && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 56,
      border: "1px solid var(--gold-300)",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-crosshair",
    style: {
      width: 24,
      height: 24,
      position: "absolute",
      inset: "50% auto auto 50%",
      transform: "translate(-50%,-50%)"
    }
  }))));
}

/* ---------- Final CTA (shared) ---------- */
function FinalCTA({
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "gp-section",
    style: {
      background: "var(--ink-1000)",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-shimmer"
  }), /*#__PURE__*/React.createElement("div", {
    className: "gp-container",
    style: {
      position: "relative",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "gp-eyebrow",
    style: {
      marginBottom: 36,
      justifyContent: "center"
    }
  }, "Engagement")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 1
  }, /*#__PURE__*/React.createElement("h2", {
    className: "gp-display",
    style: {
      fontSize: "clamp(48px, 7vw, 96px)",
      margin: 0,
      letterSpacing: "-0.03em",
      maxWidth: "16ch",
      marginLeft: "auto",
      marginRight: "auto"
    }
  }, "Ready to scale ", /*#__PURE__*/React.createElement("span", {
    className: "gp-serif-italic",
    style: {
      color: "var(--gold-200)"
    }
  }, "smarter?"))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 2
  }, /*#__PURE__*/React.createElement("p", {
    className: "gp-lede",
    style: {
      margin: "32px auto 0",
      maxWidth: 720
    }
  }, "Whether you need digital transformation, AI integration, software development, CRM modernization, branding, automation or growth strategy, GoldPoint Digital is built to help modern organizations move faster and scale intelligently.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 3
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 56,
      display: "inline-flex",
      gap: 14,
      flexWrap: "wrap",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "gp-btn gp-btn-gold",
    onClick: () => onNavigate("contact")
  }, "Schedule a Strategy Call ", /*#__PURE__*/React.createElement(Arrow, null)), /*#__PURE__*/React.createElement("button", {
    className: "gp-btn gp-btn-ghost",
    onClick: () => onNavigate("contact")
  }, "Request a Proposal ", /*#__PURE__*/React.createElement(Arrow, null)))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 4
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 72,
      display: "flex",
      justifyContent: "center",
      gap: 40,
      color: "var(--steel-400)",
      fontFamily: "var(--f-mono)",
      fontSize: 11,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", null, "sales@goldpointdigital.com"), /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("span", null, "Replies within 24 hours"), /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("span", null, "Long-term enterprise retainers")))));
}

/* Expose globals */
Object.assign(window, {
  Reveal,
  Logo,
  Nav,
  Footer,
  FootCol,
  Arrow,
  SectionHead,
  PageHeader,
  Counter,
  ServiceRow,
  HeroVisual,
  MediaPlaceholder,
  FinalCTA
});

/* ===================== pages/home.jsx ===================== */
// GoldPoint Digital, Home page (NDA-safe: no client names, no case studies)

function HomePage({
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "page-fade"
  }, /*#__PURE__*/React.createElement(HomeHero, {
    onNavigate: onNavigate
  }), /*#__PURE__*/React.createElement(PillarsAndStory, {
    onNavigate: onNavigate
  }), /*#__PURE__*/React.createElement(ServicesOverview, {
    onNavigate: onNavigate
  }), /*#__PURE__*/React.createElement(Methodology, null), /*#__PURE__*/React.createElement(CapabilitiesBand, null), /*#__PURE__*/React.createElement(PracticePrinciples, null), /*#__PURE__*/React.createElement(IndustriesStrip, {
    onNavigate: onNavigate
  }), /*#__PURE__*/React.createElement(InsightsPreview, {
    onNavigate: onNavigate
  }), /*#__PURE__*/React.createElement(FinalCTA, {
    onNavigate: onNavigate
  }));
}

/* ---------- HERO ---------- */
function HomeHero({
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      paddingTop: 140,
      paddingBottom: 80,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-bg-grid",
    style: {
      position: "absolute",
      inset: 0,
      opacity: 0.4
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "gp-shimmer"
  }), /*#__PURE__*/React.createElement("div", {
    className: "gp-container",
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.3fr 1fr",
      gap: 64,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "gp-eyebrow",
    style: {
      marginBottom: 28
    }
  }, "Enterprise Digital Transformation \xB7 AI \xB7 Growth")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 1
  }, /*#__PURE__*/React.createElement("h1", {
    className: "gp-display",
    style: {
      fontSize: "clamp(40px, 5.4vw, 76px)",
      margin: 0,
      letterSpacing: "-0.03em",
      lineHeight: 1.04
    }
  }, "Modernize how your business ", /*#__PURE__*/React.createElement("span", {
    className: "gp-serif-italic",
    style: {
      color: "var(--gold-200)"
    }
  }, "operates,"), " sells and scales.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 2
  }, /*#__PURE__*/React.createElement("p", {
    className: "gp-lede",
    style: {
      marginTop: 28,
      maxWidth: 560
    }
  }, "GoldPoint Digital is a premium consulting, engineering and AI partner for ambitious organizations. We replace fragmented vendors with one accountable firm built to ship measurable outcomes.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 3
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 36,
      display: "flex",
      gap: 14,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "gp-btn gp-btn-primary",
    onClick: () => onNavigate("contact")
  }, "Schedule a Consultation ", /*#__PURE__*/React.createElement(Arrow, null)), /*#__PURE__*/React.createElement("button", {
    className: "gp-btn gp-btn-ghost",
    onClick: () => onNavigate("services")
  }, "Explore Services ", /*#__PURE__*/React.createElement(Arrow, null))))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 2
  }, /*#__PURE__*/React.createElement(HeroVisual, null))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 4
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 72,
      paddingTop: 28,
      borderTop: "1px solid rgba(255,255,255,0.08)",
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 32
    }
  }, [["Why GoldPoint", "Built for the enterprise"], ["Who you work with", "Senior bench, embedded"], ["Engagement", "Multi-year partnerships"], ["What we deliver", "Outcomes that compound"]].map(([k, v], i) => /*#__PURE__*/React.createElement("div", {
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-label",
    style: {
      marginBottom: 8
    }
  }, k), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--f-display)",
      fontSize: 18,
      letterSpacing: "-0.01em"
    }
  }, v)))))));
}

/* ---------- PILLARS + STORY ---------- */
function PillarsAndStory({
  onNavigate
}) {
  const pillars = [{
    k: "Strategy",
    t: "Boardroom-grade consulting",
    b: "Executive strategy, RevOps and digital transformation roadmaps for leadership teams."
  }, {
    k: "Technology",
    t: "Engineered execution",
    b: "Production AI, web, mobile, CRM, DevOps and systems integration shipped by senior teams."
  }, {
    k: "Growth",
    t: "Compounding outcomes",
    b: "Brand authority, conversion infrastructure and demand systems that appreciate quarter over quarter."
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "gp-section",
    style: {
      borderTop: "1px solid rgba(255,255,255,0.06)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1.4fr",
      gap: 80,
      alignItems: "start",
      marginBottom: 72
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "gp-eyebrow",
    style: {
      marginBottom: 24
    }
  }, "About the firm"), /*#__PURE__*/React.createElement("h2", {
    className: "gp-display gp-h2",
    style: {
      margin: 0,
      letterSpacing: "-0.03em"
    }
  }, "Strategy. Technology. ", /*#__PURE__*/React.createElement("span", {
    className: "gp-serif-italic",
    style: {
      color: "var(--gold-200)"
    }
  }, "Growth."))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 1
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--steel-200)",
      display: "flex",
      flexDirection: "column",
      gap: 20,
      fontSize: 17,
      lineHeight: 1.6
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, "GoldPoint Digital is a premium digital transformation and consulting firm helping organizations scale through strategy, design, engineering, automation and modern customer acquisition systems."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, "Unlike traditional marketing agencies, we combine executive consulting with technical execution across AI, branding, software engineering, CRM modernization, DevOps, UI/UX design and enterprise growth strategy."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "gp-link",
    onClick: () => onNavigate("about")
  }, "Read the firm story ", /*#__PURE__*/React.createElement(Arrow, null)))))), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 0,
      border: "1px solid rgba(255,255,255,0.08)"
    }
  }, pillars.map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: 36,
      borderRight: i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none",
      display: "flex",
      flexDirection: "column",
      gap: 14,
      minHeight: 220
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--f-mono)",
      fontSize: 11,
      color: "var(--gold-300)",
      letterSpacing: "0.16em",
      textTransform: "uppercase"
    }
  }, p.k), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: 1,
      background: "var(--gold-300)"
    }
  })), /*#__PURE__*/React.createElement("h4", {
    className: "gp-display",
    style: {
      fontSize: 24,
      letterSpacing: "-0.02em",
      margin: 0
    }
  }, p.t), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--steel-300)",
      margin: 0,
      fontSize: 15
    }
  }, p.b)))))));
}

/* ---------- SERVICES OVERVIEW ---------- */
function ServicesOverview({
  onNavigate
}) {
  const services = [{
    code: "01",
    name: "Executive Consulting",
    desc: "Fractional leadership, RevOps and digital transformation strategy.",
    target: "services"
  }, {
    code: "02",
    name: "AI Development",
    desc: "Custom AI workflows, assistants and OpenAI integrations in production.",
    target: "services"
  }, {
    code: "03",
    name: "Web Development",
    desc: "Enterprise websites, SaaS platforms and customer portals.",
    target: "services"
  }, {
    code: "04",
    name: "Mobile Applications",
    desc: "iOS, Android and cross-platform apps integrated with your stack.",
    target: "services"
  }, {
    code: "05",
    name: "UI / UX Design",
    desc: "Product design, journey mapping and interactive prototyping.",
    target: "services"
  }, {
    code: "06",
    name: "CRM & Automation",
    desc: "Salesforce, HubSpot, Dynamics, Zoho, implementation and RevOps.",
    target: "services"
  }, {
    code: "07",
    name: "Systems Integration",
    desc: "API, ERP, payments and cloud integration architecture.",
    target: "solutions"
  }, {
    code: "08",
    name: "DevOps & Engineering",
    desc: "AWS, Azure, Kubernetes, CI/CD and outsourced engineering.",
    target: "solutions"
  }, {
    code: "09",
    name: "Branding & Creative",
    desc: "Identity systems, rebranding and executive-grade creative direction.",
    target: "solutions"
  }, {
    code: "10",
    name: "Digital Growth",
    desc: "SEO, paid acquisition, conversion and inbound demand systems.",
    target: "solutions"
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "gp-section",
    style: {
      background: "var(--ink-1000)",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      borderBottom: "1px solid rgba(255,255,255,0.06)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "end",
      marginBottom: 48,
      flexWrap: "wrap",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "gp-eyebrow",
    style: {
      marginBottom: 20
    }
  }, "What we deliver"), /*#__PURE__*/React.createElement("h2", {
    className: "gp-display gp-h2",
    style: {
      margin: 0,
      letterSpacing: "-0.03em",
      maxWidth: "16ch"
    }
  }, "Ten integrated ", /*#__PURE__*/React.createElement("span", {
    className: "gp-serif-italic",
    style: {
      color: "var(--gold-200)"
    }
  }, "practice areas."))), /*#__PURE__*/React.createElement("button", {
    className: "gp-link",
    onClick: () => onNavigate("services")
  }, "All services ", /*#__PURE__*/React.createElement(Arrow, null))), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: 0,
      borderTop: "1px solid rgba(255,255,255,0.08)"
    }
  }, services.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: s.code,
    onClick: () => onNavigate(s.target),
    style: {
      padding: "32px 36px",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
      borderLeft: i % 2 === 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
      cursor: "pointer",
      transition: "background .3s",
      display: "grid",
      gridTemplateColumns: "48px 1fr 28px",
      gap: 20,
      alignItems: "center"
    },
    onMouseOver: e => {
      e.currentTarget.style.background = "rgba(201,169,97,0.04)";
    },
    onMouseOut: e => {
      e.currentTarget.style.background = "transparent";
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--f-mono)",
      fontSize: 11,
      color: "var(--gold-300)",
      letterSpacing: "0.12em"
    }
  }, s.code), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "gp-display",
    style: {
      fontSize: 22,
      margin: 0,
      letterSpacing: "-0.015em",
      marginBottom: 6
    }
  }, s.name), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--steel-300)",
      margin: 0,
      fontSize: 14,
      lineHeight: 1.45
    }
  }, s.desc)), /*#__PURE__*/React.createElement(Arrow, {
    size: 14
  })))))));
}

/* ---------- METHODOLOGY ---------- */
function Methodology() {
  const steps = [{
    p: "01",
    t: "Discovery",
    b: "Stakeholder interviews, technical audit and revenue diagnostic."
  }, {
    p: "02",
    t: "Architecture",
    b: "Solution design, integration model and brand framework for scale."
  }, {
    p: "03",
    t: "Build",
    b: "Senior team ships in coordinated four-week sprints."
  }, {
    p: "04",
    t: "Operate",
    b: "Continuous optimization, AI tuning and RevOps under retainer."
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "gp-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 56,
      maxWidth: 720
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "gp-eyebrow",
    style: {
      marginBottom: 20
    }
  }, "How we work"), /*#__PURE__*/React.createElement("h2", {
    className: "gp-display gp-h2",
    style: {
      margin: 0,
      letterSpacing: "-0.03em"
    }
  }, "A four-phase engagement model ", /*#__PURE__*/React.createElement("span", {
    className: "gp-serif-italic",
    style: {
      color: "var(--gold-200)"
    }
  }, "built to compound.")))), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 11,
      left: 0,
      right: 0,
      height: 1,
      background: "var(--gold-line)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 28
    }
  }, steps.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 22,
      height: 22,
      borderRadius: "50%",
      background: "var(--ink-950)",
      border: "1px solid var(--gold-300)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 0 24px rgba(201,169,97,0.35)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "var(--gold-300)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24,
      fontFamily: "var(--f-mono)",
      fontSize: 11,
      color: "var(--gold-300)",
      letterSpacing: "0.16em"
    }
  }, "PHASE ", s.p), /*#__PURE__*/React.createElement("h4", {
    className: "gp-display",
    style: {
      fontSize: 26,
      letterSpacing: "-0.02em",
      marginTop: 10,
      marginBottom: 12
    }
  }, s.t), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--steel-300)",
      fontSize: 14,
      margin: 0
    }
  }, s.b))))))));
}

/* ---------- CAPABILITIES BAND ---------- */
function CapabilitiesBand() {
  const caps = ["AI-powered automation", "Enterprise web systems", "CRM modernization", "Revenue operations consulting", "API integrations", "Outsourced engineering", "SaaS product development", "Workflow optimization", "UI / UX strategy", "Enterprise DevOps", "Customer acquisition systems", "Brand authority development"];
  return /*#__PURE__*/React.createElement("section", {
    className: "gp-section",
    style: {
      background: "var(--ink-1000)",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      borderBottom: "1px solid rgba(255,255,255,0.06)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 2fr",
      gap: 80,
      alignItems: "start",
      marginBottom: 48
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "gp-eyebrow",
    style: {
      marginBottom: 20
    }
  }, "Integrated execution"), /*#__PURE__*/React.createElement("h2", {
    className: "gp-display gp-h2",
    style: {
      margin: 0,
      letterSpacing: "-0.03em"
    }
  }, "Enterprise-level ", /*#__PURE__*/React.createElement("span", {
    className: "gp-serif-italic",
    style: {
      color: "var(--gold-200)"
    }
  }, "capabilities."))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 1
  }, /*#__PURE__*/React.createElement("p", {
    className: "gp-lede",
    style: {
      margin: 0
    }
  }, "GoldPoint Digital provides integrated consulting, engineering, AI, branding, automation and operational services, designed to help organizations modernize and scale efficiently."))), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 0,
      border: "1px solid rgba(255,255,255,0.08)"
    }
  }, caps.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: "24px 22px",
      borderRight: i % 4 !== 3 ? "1px solid rgba(255,255,255,0.08)" : "none",
      borderBottom: i < 8 ? "1px solid rgba(255,255,255,0.08)" : "none",
      fontFamily: "var(--f-display)",
      fontSize: 16,
      letterSpacing: "-0.01em",
      display: "flex",
      alignItems: "center",
      gap: 14,
      transition: "all .3s"
    },
    onMouseOver: e => {
      e.currentTarget.style.background = "rgba(201,169,97,0.05)";
    },
    onMouseOut: e => {
      e.currentTarget.style.background = "transparent";
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--f-mono)",
      fontSize: 10,
      color: "var(--gold-300)",
      letterSpacing: "0.1em"
    }
  }, String(i + 1).padStart(2, '0')), c))))));
}

/* ---------- PRACTICE PRINCIPLES (replaces testimonial, abstract, NDA-safe) ---------- */
function PracticePrinciples() {
  const items = [{
    k: "Senior bench",
    t: "No juniors carrying client work.",
    b: "Every engagement is staffed with experienced consultants, engineers and designers, never delegated downward."
  }, {
    k: "Executive scope",
    t: "Embedded with leadership teams.",
    b: "We operate alongside C-suite stakeholders as a long-term strategic partner, not a vendor on the periphery."
  }, {
    k: "Integrated firm",
    t: "Strategy and engineering, in one.",
    b: "Consulting depth and production engineering under a unified governance model and shared accountability."
  }, {
    k: "Discretion",
    t: "Quiet by design.",
    b: "We protect every client relationship under strict confidentiality. Our work speaks louder than our marketing."
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "gp-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 56,
      maxWidth: 720
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "gp-eyebrow",
    style: {
      marginBottom: 20
    }
  }, "Operating principles"), /*#__PURE__*/React.createElement("h2", {
    className: "gp-display gp-h2",
    style: {
      margin: 0,
      letterSpacing: "-0.03em"
    }
  }, "How we engage with ", /*#__PURE__*/React.createElement("span", {
    className: "gp-serif-italic",
    style: {
      color: "var(--gold-200)"
    }
  }, "every client.")))), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 0,
      border: "1px solid rgba(255,255,255,0.08)"
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: 32,
      borderRight: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none",
      display: "flex",
      flexDirection: "column",
      minHeight: 280
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--f-mono)",
      fontSize: 11,
      color: "var(--gold-300)",
      letterSpacing: "0.16em",
      textTransform: "uppercase"
    }
  }, it.k), /*#__PURE__*/React.createElement("h4", {
    className: "gp-display",
    style: {
      fontSize: 22,
      letterSpacing: "-0.02em",
      margin: "28px 0 16px",
      lineHeight: 1.2
    }
  }, it.t), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--steel-300)",
      fontSize: 14,
      margin: 0,
      marginTop: "auto"
    }
  }, it.b)))))));
}

/* ---------- INDUSTRIES STRIP ---------- */
function IndustriesStrip({
  onNavigate
}) {
  const list = ["Financial Services", "Lending & Mortgage", "Healthcare", "Legal", "Technology", "Cybersecurity", "Ecommerce", "Hospitality", "Real Estate", "Professional Services", "Multi-Location", "Startups"];
  return /*#__PURE__*/React.createElement("section", {
    className: "gp-section-tight",
    style: {
      background: "var(--ink-1000)",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      borderBottom: "1px solid rgba(255,255,255,0.06)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 2fr",
      gap: 64,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "gp-eyebrow",
    style: {
      marginBottom: 20
    }
  }, "Industries we support"), /*#__PURE__*/React.createElement("h2", {
    className: "gp-display gp-h3",
    style: {
      margin: 0,
      letterSpacing: "-0.03em"
    }
  }, "Twelve verticals. ", /*#__PURE__*/React.createElement("span", {
    className: "gp-serif-italic",
    style: {
      color: "var(--gold-200)"
    }
  }, "One operating model.")), /*#__PURE__*/React.createElement("button", {
    className: "gp-link",
    onClick: () => onNavigate("industries"),
    style: {
      marginTop: 28
    }
  }, "Explore industries ", /*#__PURE__*/React.createElement(Arrow, null))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 1
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 10
    }
  }, list.map((x, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => onNavigate("industries"),
    style: {
      padding: "14px 18px",
      border: "1px solid rgba(255,255,255,0.1)",
      background: "transparent",
      color: "var(--bone-100)",
      fontFamily: "var(--f-display)",
      fontSize: 15,
      letterSpacing: "-0.01em",
      cursor: "pointer",
      transition: "all .25s"
    },
    onMouseOver: e => {
      e.currentTarget.style.borderColor = "var(--gold-300)";
      e.currentTarget.style.color = "var(--gold-200)";
    },
    onMouseOut: e => {
      e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
      e.currentTarget.style.color = "var(--bone-100)";
    }
  }, x)))))));
}

/* ---------- INSIGHTS PREVIEW ---------- */
function InsightsPreview({
  onNavigate
}) {
  const posts = [{
    cat: "AI Strategy",
    title: "The enterprise case for AI-first workflows in 2026.",
    date: "Apr 22 · 2026",
    read: "8 MIN"
  }, {
    cat: "Digital Transformation",
    title: "Why CRM modernization is the new revenue lever.",
    date: "Apr 09 · 2026",
    read: "6 MIN"
  }, {
    cat: "Branding Strategy",
    title: "Brand authority as an inbound growth system.",
    date: "Mar 28 · 2026",
    read: "10 MIN"
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "gp-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "end",
      marginBottom: 48,
      flexWrap: "wrap",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "gp-eyebrow",
    style: {
      marginBottom: 20
    }
  }, "From the practice"), /*#__PURE__*/React.createElement("h2", {
    className: "gp-display gp-h2",
    style: {
      margin: 0,
      letterSpacing: "-0.03em"
    }
  }, "Field notes on digital ", /*#__PURE__*/React.createElement("span", {
    className: "gp-serif-italic",
    style: {
      color: "var(--gold-200)"
    }
  }, "transformation."))), /*#__PURE__*/React.createElement("button", {
    className: "gp-link",
    onClick: () => onNavigate("insights")
  }, "All insights ", /*#__PURE__*/React.createElement(Arrow, null))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      borderTop: "1px solid rgba(255,255,255,0.08)"
    }
  }, posts.map((p, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: i,
    delay: i
  }, /*#__PURE__*/React.createElement("article", {
    style: {
      padding: "36px 32px",
      borderRight: i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
      cursor: "pointer",
      transition: "background .3s",
      height: "100%",
      display: "flex",
      flexDirection: "column"
    },
    onMouseOver: e => {
      e.currentTarget.style.background = "rgba(201,169,97,0.04)";
    },
    onMouseOut: e => {
      e.currentTarget.style.background = "transparent";
    },
    onClick: () => onNavigate("insights")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--f-mono)",
      fontSize: 10,
      color: "var(--gold-300)",
      letterSpacing: "0.12em",
      textTransform: "uppercase"
    }
  }, p.cat), /*#__PURE__*/React.createElement("h4", {
    className: "gp-display",
    style: {
      fontSize: 22,
      lineHeight: 1.22,
      letterSpacing: "-0.02em",
      marginTop: 18,
      marginBottom: 36,
      flexGrow: 1
    }
  }, p.title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      color: "var(--steel-400)",
      fontFamily: "var(--f-mono)",
      fontSize: 11,
      letterSpacing: "0.08em"
    }
  }, /*#__PURE__*/React.createElement("span", null, p.date), /*#__PURE__*/React.createElement("span", null, p.read, " READ"))))))));
}
window.HomePage = HomePage;

/* ===================== pages/services.jsx ===================== */
// GoldPoint Digital, Services page (all primary service disciplines)

const SERVICES_DATA = [{
  id: "consulting",
  code: "S.01",
  name: "Executive Consulting & Digital Transformation",
  tag: "Strategy",
  summary: "Boardroom-grade advisory for organizations modernizing operations, technology and revenue systems.",
  items: ["Business growth strategy", "Digital transformation consulting", "Customer acquisition strategy", "Revenue operations consulting", "AI adoption consulting", "Technology modernization", "Operational consulting", "Executive advisory services", "Fractional digital leadership"]
}, {
  id: "ai",
  code: "S.02",
  name: "AI Development",
  tag: "Engineering",
  headline: "AI systems designed for modern businesses.",
  summary: "Custom-built AI infrastructure: assistants, workflows, dashboards and OpenAI integrations engineered for production environments.",
  items: ["AI consulting", "AI workflow automation", "AI chatbots", "AI assistants", "AI-powered reporting", "AI analytics dashboards", "AI lead qualification systems", "OpenAI integrations", "AI business optimization"]
}, {
  id: "web",
  code: "S.03",
  name: "Web Development",
  tag: "Engineering",
  headline: "Enterprise web platforms built for growth.",
  summary: "From flagship marketing systems to SaaS platforms and customer portals, engineered for performance, security and scale.",
  items: ["Enterprise websites", "SaaS development", "Ecommerce platforms", "Customer portals", "API integrations", "Progressive web apps", "CMS architecture", "Technical SEO", "Performance optimization"]
}, {
  id: "mobile",
  code: "S.04",
  name: "Mobile Application Development",
  tag: "Product",
  headline: "Mobile experiences that move enterprise metrics.",
  summary: "Native and cross-platform applications integrated with your CRM, identity and revenue systems.",
  items: ["iOS development", "Android development", "Cross-platform apps", "Enterprise applications", "Customer engagement apps", "CRM-integrated mobile systems"]
}, {
  id: "uiux",
  code: "S.05",
  name: "UI / UX Design",
  tag: "Design",
  headline: "Premium product design and digital experience.",
  summary: "Strategy, prototyping and journey design for digital products held to enterprise UX standards.",
  items: ["UI / UX strategy", "Wireframes", "Interactive prototypes", "User journey mapping", "Product design consulting", "Customer experience optimization"]
}, {
  id: "crm",
  code: "S.06",
  name: "CRM & Automation",
  tag: "Revenue Ops",
  headline: "Revenue infrastructure across major platforms.",
  summary: "Implementation, optimization and revenue operations across Salesforce, HubSpot, Microsoft Dynamics, Zoho and Monday.com.",
  items: ["CRM implementation", "CRM optimization", "Workflow automation", "Revenue operations", "Lead routing systems", "Pipeline optimization", "Marketing automation"],
  platforms: ["Salesforce", "HubSpot", "Microsoft Dynamics", "Zoho", "Monday.com"]
}];
function ServicesPage({
  onNavigate
}) {
  const [active, setActive] = useState(SERVICES_DATA[0].id);
  return /*#__PURE__*/React.createElement("div", {
    className: "page-fade"
  }, /*#__PURE__*/React.createElement(PageHeader, {
    kicker: "Services",
    title: /*#__PURE__*/React.createElement(React.Fragment, null, "Built to move enterprise ", /*#__PURE__*/React.createElement("span", {
      className: "gp-serif-italic",
      style: {
        color: "var(--gold-200)"
      }
    }, "metrics.")),
    lede: "Consulting, engineering, AI, design and growth, delivered as one integrated practice. Each service is engineered to produce measurable outcomes, not deliverables."
  }), /*#__PURE__*/React.createElement(ServicesValueProps, {
    onNavigate: onNavigate
  }), /*#__PURE__*/React.createElement("section", {
    className: "gp-section",
    style: {
      paddingTop: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "320px 1fr",
      gap: 64,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("aside", {
    style: {
      position: "sticky",
      top: 110
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-label",
    style: {
      marginBottom: 24
    }
  }, "Practice Areas"), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      padding: 0,
      margin: 0
    }
  }, SERVICES_DATA.map(s => /*#__PURE__*/React.createElement("li", {
    key: s.id
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setActive(s.id);
      const el = document.getElementById("svc-" + s.id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.pageYOffset - 100;
        window.scrollTo({
          top: y,
          behavior: "smooth"
        });
      }
    },
    style: {
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
      transition: "color .2s ease"
    }
  }, /*#__PURE__*/React.createElement("span", null, s.name.split(" & ")[0].split(" ")[0], " ", s.name.includes("&") ? "/ " + s.name.split(" & ")[1] : s.name.split(" ").slice(1).join(" ")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--f-mono)",
      fontSize: 11,
      color: "var(--gold-400)",
      letterSpacing: "0.1em"
    }
  }, s.code)))), /*#__PURE__*/React.createElement("li", {
    style: {
      borderTop: "1px solid rgba(255,255,255,0.08)",
      borderBottom: "1px solid rgba(255,255,255,0.08)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onNavigate("solutions"),
    style: {
      width: "100%",
      textAlign: "left",
      padding: "14px 0",
      color: "var(--steel-300)",
      fontFamily: "var(--f-display)",
      fontSize: 16
    }
  }, "See Solutions \u2192"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40,
      padding: 24,
      border: "1px solid var(--gold-line)",
      background: "rgba(201,169,97,0.04)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-label",
    style: {
      marginBottom: 12
    }
  }, "Talk to the team"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--steel-200)",
      fontSize: 14,
      marginBottom: 16
    }
  }, "Scope an engagement with our practice leads."), /*#__PURE__*/React.createElement("button", {
    className: "gp-btn gp-btn-gold",
    style: {
      height: 44,
      fontSize: 13
    },
    onClick: () => onNavigate("contact")
  }, "Book Intro ", /*#__PURE__*/React.createElement(Arrow, {
    size: 12
  })))), /*#__PURE__*/React.createElement("div", null, SERVICES_DATA.map((s, i) => /*#__PURE__*/React.createElement(ServiceBlock, {
    key: s.id,
    s: s,
    i: i
  })))))), /*#__PURE__*/React.createElement(CrossSell, {
    onNavigate: onNavigate
  }), /*#__PURE__*/React.createElement(FinalCTA, {
    onNavigate: onNavigate
  }));
}
function ServiceBlock({
  s,
  i
}) {
  return /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("section", {
    id: "svc-" + s.id,
    style: {
      borderTop: "1px solid rgba(255,255,255,0.08)",
      padding: "64px 0 80px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--f-mono)",
      fontSize: 11,
      color: "var(--gold-300)",
      letterSpacing: "0.12em"
    }
  }, s.code, " \xB7 ", s.tag), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--f-mono)",
      fontSize: 11,
      color: "var(--steel-400)",
      letterSpacing: "0.12em"
    }
  }, "0", i + 1, " / 0", SERVICES_DATA.length)), /*#__PURE__*/React.createElement("h2", {
    className: "gp-display",
    style: {
      fontSize: "clamp(32px, 4vw, 52px)",
      letterSpacing: "-0.03em",
      lineHeight: 1.05,
      margin: 0
    }
  }, s.headline || s.name), /*#__PURE__*/React.createElement("p", {
    className: "gp-lede",
    style: {
      marginTop: 24,
      maxWidth: 720
    }
  }, s.summary), s.platforms && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      flexWrap: "wrap",
      marginTop: 28
    }
  }, s.platforms.map((p, idx) => /*#__PURE__*/React.createElement("span", {
    key: idx,
    className: "gp-chip"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), p))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 48,
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 0,
      border: "1px solid rgba(255,255,255,0.08)"
    }
  }, s.items.map((it, idx) => /*#__PURE__*/React.createElement("div", {
    key: idx,
    style: {
      padding: "20px 18px",
      borderRight: (idx + 1) % 3 !== 0 && idx !== s.items.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
      borderBottom: idx < s.items.length - (s.items.length % 3 || 3) ? "1px solid rgba(255,255,255,0.08)" : "none",
      display: "flex",
      alignItems: "center",
      gap: 12,
      fontSize: 15,
      color: "var(--steel-100)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 4,
      height: 4,
      background: "var(--gold-300)"
    }
  }), it)))));
}

/* Cross-sell band */
function CrossSell({
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "gp-section-tight",
    style: {
      background: "var(--ink-900)",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      borderBottom: "1px solid rgba(255,255,255,0.06)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 56,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    className: "gp-display gp-h3",
    style: {
      margin: 0,
      maxWidth: 18 + "ch",
      letterSpacing: "-0.02em"
    }
  }, "Operating below the line? Explore ", /*#__PURE__*/React.createElement("span", {
    className: "gp-serif-italic",
    style: {
      color: "var(--gold-200)"
    }
  }, "Solutions"), ", our infrastructure and growth practice."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      justifyContent: "flex-end"
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "gp-btn gp-btn-primary",
    onClick: () => onNavigate("solutions")
  }, "View Solutions ", /*#__PURE__*/React.createElement(Arrow, null)), /*#__PURE__*/React.createElement("button", {
    className: "gp-btn gp-btn-ghost",
    onClick: () => onNavigate("industries")
  }, "Industries ", /*#__PURE__*/React.createElement(Arrow, null))))));
}
window.ServicesPage = ServicesPage;

/* ---------- Services Value Props (sales band) ---------- */
function ServicesValueProps({
  onNavigate
}) {
  const props = [{
    k: "Outcome",
    t: "Measured, not promised.",
    b: "Every engagement is anchored to revenue, efficiency or experience metrics defined with leadership before kickoff."
  }, {
    k: "Bench",
    t: "Senior practitioners only.",
    b: "Strategy, engineering and design led by experienced specialists. No junior teams executing on your brand."
  }, {
    k: "Model",
    t: "Embedded with executives.",
    b: "We operate as an extension of your leadership team, with weekly cadence and direct executive access."
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "gp-section-tight",
    style: {
      background: "var(--ink-900)",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      borderBottom: "1px solid rgba(255,255,255,0.06)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 0,
      border: "1px solid rgba(255,255,255,0.08)"
    }
  }, props.map((p, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: i,
    delay: i
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 32,
      borderRight: i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none",
      minHeight: 220,
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--f-mono)",
      fontSize: 11,
      color: "var(--gold-300)",
      letterSpacing: "0.16em",
      textTransform: "uppercase"
    }
  }, p.k), /*#__PURE__*/React.createElement("h4", {
    className: "gp-display",
    style: {
      fontSize: 22,
      letterSpacing: "-0.02em",
      margin: "20px 0 12px",
      lineHeight: 1.2
    }
  }, p.t), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--steel-300)",
      fontSize: 14,
      margin: 0,
      marginTop: "auto"
    }
  }, p.b)))))));
}

/* ===================== pages/solutions.jsx ===================== */
// GoldPoint Digital, Solutions page (Systems Integration, DevOps, Branding, Digital Growth)

const SOLUTIONS_DATA = [{
  id: "integration",
  code: "L.01",
  name: "Systems Integration",
  summary: "Connect the enterprise stack, APIs, ERPs, payments, identity and data, into a single intelligent operating layer.",
  items: ["API integrations", "ERP integrations", "Cloud integrations", "CRM integrations", "Payment integrations", "Enterprise systems architecture", "Automation consulting"]
}, {
  id: "devops",
  code: "L.02",
  name: "DevOps & Engineering",
  summary: "Outsourced engineering, cloud architecture and infrastructure automation built for resilient enterprise delivery.",
  items: ["Outsourced engineering", "DevOps consulting", "CI / CD implementation", "Cloud infrastructure consulting", "Kubernetes consulting", "AWS consulting", "Azure consulting", "Infrastructure automation"]
}, {
  id: "branding",
  code: "L.03",
  name: "Branding & Creative",
  summary: "Identity systems, rebrands and executive-grade creative direction for organizations stepping up in market.",
  items: ["Brand strategy", "Logo design", "Brand identity systems", "Rebranding", "Presentation design", "Creative direction", "Motion graphics", "Marketing collateral"]
}, {
  id: "growth",
  code: "L.04",
  name: "Digital Growth Strategy",
  summary: "Inbound, paid and conversion infrastructure engineered to compound demand over time.",
  items: ["SEO", "Paid advertising", "Social media strategy", "Funnel optimization", "Conversion optimization", "Reputation management", "Analytics & reporting"]
}];
function SolutionsPage({
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "page-fade"
  }, /*#__PURE__*/React.createElement(PageHeader, {
    kicker: "Solutions",
    title: /*#__PURE__*/React.createElement(React.Fragment, null, "Infrastructure and growth, engineered to ", /*#__PURE__*/React.createElement("span", {
      className: "gp-serif-italic",
      style: {
        color: "var(--gold-200)"
      }
    }, "compound.")),
    lede: "Where Services is the consulting practice, Solutions is the technical and growth machinery. Built to scale once and pay back for years."
  }), /*#__PURE__*/React.createElement(SolutionsValueProps, null), /*#__PURE__*/React.createElement("section", {
    className: "gp-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-container"
  }, SOLUTIONS_DATA.map((s, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: s.id,
    delay: i % 3
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "120px 1fr 1fr",
      gap: 56,
      borderTop: "1px solid rgba(255,255,255,0.08)",
      padding: "56px 0",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--f-mono)",
      fontSize: 11,
      color: "var(--gold-300)",
      letterSpacing: "0.12em"
    }
  }, s.code), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "gp-display",
    style: {
      fontSize: "clamp(28px, 3.2vw, 42px)",
      margin: 0,
      letterSpacing: "-0.025em",
      lineHeight: 1.08
    }
  }, s.name), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--steel-200)",
      marginTop: 18,
      maxWidth: 50 + "ch"
    }
  }, s.summary)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      padding: 0,
      margin: 0
    }
  }, s.items.map((it, idx) => /*#__PURE__*/React.createElement("li", {
    key: idx,
    style: {
      display: "grid",
      gridTemplateColumns: "34px 1fr",
      gap: 12,
      padding: "12px 0",
      borderBottom: idx < s.items.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--f-mono)",
      fontSize: 10,
      color: "var(--gold-400)",
      letterSpacing: "0.1em"
    }
  }, String(idx + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15
    }
  }, it)))))))))), /*#__PURE__*/React.createElement(FinalCTA, {
    onNavigate: onNavigate
  }));
}
window.SolutionsPage = SolutionsPage;

/* ---------- Solutions Value Props ---------- */
function SolutionsValueProps() {
  const items = [{
    k: "Architected",
    t: "Designed to scale once.",
    b: "Solutions are architected to scale predictably, with documentation, governance and observability built in from day one."
  }, {
    k: "Composable",
    t: "Plugged into your stack.",
    b: "Integrations across CRM, ERP, identity, payments and cloud, so new systems extend the stack instead of replacing it."
  }, {
    k: "Operated",
    t: "Tuned over the long term.",
    b: "We do not hand off and disappear. Solutions are operated and improved on retainer with active executive sponsorship."
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "gp-section-tight",
    style: {
      background: "var(--ink-900)",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      borderBottom: "1px solid rgba(255,255,255,0.06)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 0,
      border: "1px solid rgba(255,255,255,0.08)"
    }
  }, items.map((p, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: i,
    delay: i
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 32,
      borderRight: i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none",
      minHeight: 220,
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--f-mono)",
      fontSize: 11,
      color: "var(--gold-300)",
      letterSpacing: "0.16em",
      textTransform: "uppercase"
    }
  }, p.k), /*#__PURE__*/React.createElement("h4", {
    className: "gp-display",
    style: {
      fontSize: 22,
      letterSpacing: "-0.02em",
      margin: "20px 0 12px",
      lineHeight: 1.2
    }
  }, p.t), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--steel-300)",
      fontSize: 14,
      margin: 0,
      marginTop: "auto"
    }
  }, p.b)))))));
}

/* ===================== pages/industries.jsx ===================== */
// GoldPoint Digital, Industries page

const INDUSTRIES = [{
  code: "I.01",
  name: "Financial Services",
  desc: "Modernizing portals, KYC, advisor tooling and revenue operations for banks, asset managers and fintechs.",
  focus: "CRM modernization · Compliance UX"
}, {
  code: "I.02",
  name: "Lending & Mortgage",
  desc: "Originations, broker portals, decisioning automation and CRM modernization across lending stacks.",
  focus: "Workflow automation · RevOps"
}, {
  code: "I.03",
  name: "Healthcare",
  desc: "HIPAA-grade portals, AI triage, patient engagement and operational workflow automation.",
  focus: "AI engagement · Compliance"
}, {
  code: "I.04",
  name: "Legal",
  desc: "Matter management, intake automation, client portals and AI-powered document workflows.",
  focus: "Intake · Document AI"
}, {
  code: "I.05",
  name: "Technology",
  desc: "SaaS product design, growth engineering, RevOps and AI features for software companies.",
  focus: "Product design · Growth"
}, {
  code: "I.06",
  name: "Cybersecurity",
  desc: "Premium brand systems, enterprise demand engines and conversion infrastructure for security firms.",
  focus: "Brand authority · Demand"
}, {
  code: "I.07",
  name: "Ecommerce",
  desc: "Headless commerce, customer portals, loyalty systems and revenue lift through CX engineering.",
  focus: "Headless commerce · CX"
}, {
  code: "I.08",
  name: "Hospitality",
  desc: "Direct-booking systems, premium rebrands, loyalty automation and guest-experience digital ops.",
  focus: "Rebrand · Direct booking"
}, {
  code: "I.09",
  name: "Real Estate",
  desc: "Brokerage portals, listing platforms, agent CRM systems and AI-assisted property workflows.",
  focus: "Portals · Agent CRM"
}, {
  code: "I.10",
  name: "Professional Services",
  desc: "Productized service operations, intake automation, branding and CRM modernization.",
  focus: "Productization · CRM"
}, {
  code: "I.11",
  name: "Multi-Location",
  desc: "Local SEO, brand consistency systems, location-level CRM and operational reporting at scale.",
  focus: "Local SEO · Reporting"
}, {
  code: "I.12",
  name: "Startups",
  desc: "Fractional digital leadership and AI-first growth engines for venture-backed founders.",
  focus: "Fractional leadership"
}];
function IndustriesPage({
  onNavigate
}) {
  const [active, setActive] = useState(0);
  return /*#__PURE__*/React.createElement("div", {
    className: "page-fade"
  }, /*#__PURE__*/React.createElement(PageHeader, {
    kicker: "Industries",
    title: /*#__PURE__*/React.createElement(React.Fragment, null, "An operating model proven across ", /*#__PURE__*/React.createElement("span", {
      className: "gp-serif-italic",
      style: {
        color: "var(--gold-200)"
      }
    }, "regulated and high-growth verticals.")),
    lede: "The mechanics of digital transformation change by industry. So does the regulatory ground, the buying motion and the operating cadence. We tailor every engagement to the realities of your sector."
  }), /*#__PURE__*/React.createElement("section", {
    className: "gp-section",
    style: {
      paddingTop: 56
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1.2fr",
      gap: 80,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "sticky",
      top: 110
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-label",
    style: {
      marginBottom: 24
    }
  }, "Hover to explore"), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid rgba(255,255,255,0.08)"
    }
  }, INDUSTRIES.map((ind, i) => /*#__PURE__*/React.createElement("button", {
    key: ind.code,
    onMouseEnter: () => setActive(i),
    onFocus: () => setActive(i),
    style: {
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
      color: active === i ? "var(--bone-100)" : "var(--steel-300)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--f-mono)",
      fontSize: 11,
      color: active === i ? "var(--gold-200)" : "var(--steel-400)",
      letterSpacing: "0.12em"
    }
  }, ind.code), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--f-display)",
      fontSize: 22,
      letterSpacing: "-0.02em"
    }
  }, ind.name), /*#__PURE__*/React.createElement("span", {
    style: {
      color: active === i ? "var(--gold-300)" : "transparent",
      transition: "color .25s"
    }
  }, /*#__PURE__*/React.createElement(Arrow, {
    size: 12
  })))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "sticky",
      top: 110
    }
  }, /*#__PURE__*/React.createElement(Reveal, {
    key: active
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-card",
    style: {
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(MediaPlaceholder, {
    ratio: "16/10",
    label: INDUSTRIES[active].name.toLowerCase()
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 36
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "gp-chip"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), INDUSTRIES[active].code), /*#__PURE__*/React.createElement("button", {
    className: "gp-link",
    style: {
      fontSize: 11,
      paddingBottom: 2
    },
    onClick: () => onNavigate("contact")
  }, "Discuss your case ", /*#__PURE__*/React.createElement(Arrow, {
    size: 11
  }))), /*#__PURE__*/React.createElement("h3", {
    className: "gp-display",
    style: {
      fontSize: 36,
      letterSpacing: "-0.02em",
      margin: 0
    }
  }, INDUSTRIES[active].name), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--steel-200)",
      marginTop: 16,
      fontSize: 16
    }
  }, INDUSTRIES[active].desc), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32,
      paddingTop: 24,
      borderTop: "1px solid rgba(255,255,255,0.08)",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "gp-label",
    style: {
      marginBottom: 8
    }
  }, "Primary focus"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14
    }
  }, INDUSTRIES[active].focus)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "gp-label",
    style: {
      marginBottom: 8
    }
  }, "Engagement"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14
    }
  }, "Embedded \xB7 Retainer \xB7 Project")))))))))), /*#__PURE__*/React.createElement(FinalCTA, {
    onNavigate: onNavigate
  }));
}
window.IndustriesPage = IndustriesPage;

/* ===================== pages/about.jsx ===================== */
// GoldPoint Digital, About page

function AboutPage({
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "page-fade"
  }, /*#__PURE__*/React.createElement(PageHeader, {
    kicker: "About",
    title: /*#__PURE__*/React.createElement(React.Fragment, null, "A firm built where ", /*#__PURE__*/React.createElement("span", {
      className: "gp-serif-italic",
      style: {
        color: "var(--gold-200)"
      }
    }, "strategy meets execution.")),
    lede: "GoldPoint Digital is a premium consulting, engineering and growth partner for organizations modernizing the way they operate, sell and scale. Quiet by design. Built for compounding outcomes."
  }), /*#__PURE__*/React.createElement(WhyExist, null), /*#__PURE__*/React.createElement(WhatWeDo, {
    onNavigate: onNavigate
  }), /*#__PURE__*/React.createElement(Principles, null), /*#__PURE__*/React.createElement(Approach, null), /*#__PURE__*/React.createElement(FinalCTA, {
    onNavigate: onNavigate
  }));
}

/* ---------- WHY WE EXIST ---------- */
function WhyExist() {
  return /*#__PURE__*/React.createElement("section", {
    className: "gp-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 80
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "gp-eyebrow",
    style: {
      marginBottom: 24
    }
  }, "Why we exist"), /*#__PURE__*/React.createElement("h2", {
    className: "gp-display gp-h2",
    style: {
      margin: 0,
      letterSpacing: "-0.03em"
    }
  }, "Modern enterprises need ", /*#__PURE__*/React.createElement("span", {
    className: "gp-serif-italic",
    style: {
      color: "var(--gold-200)"
    }
  }, "integrated systems"), ", not isolated services.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 2
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 22,
      color: "var(--steel-200)",
      fontSize: 17,
      lineHeight: 1.65
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, "Most organizations are still buying digital capability in fragments. A branding agency here, a CRM consultant there, an AI vendor pitching the next platform. The result is silos, redundant tooling and outcomes that never quite compound."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, "GoldPoint Digital exists to replace that model. We combine executive consulting with technical execution across AI, software, branding and growth, delivered as a single integrated practice with shared accountability and one point of contact."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, "The result is a firm that thinks like a consulting partner and ships like an in-house product organization."))))));
}

/* ---------- WHAT WE DO ---------- */
function WhatWeDo({
  onNavigate
}) {
  const items = [{
    k: "Strategy",
    t: "We advise leadership teams.",
    b: "Boardroom-grade consulting on digital transformation, customer acquisition, revenue operations and AI adoption."
  }, {
    k: "Execution",
    t: "We build the systems that ship.",
    b: "AI, web, mobile, CRM, DevOps and systems integration delivered by senior engineers and designers."
  }, {
    k: "Growth",
    t: "We compound the outcome.",
    b: "Brand authority, conversion infrastructure and demand systems engineered to appreciate over time."
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "gp-section-tight",
    style: {
      background: "var(--ink-900)",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      borderBottom: "1px solid rgba(255,255,255,0.06)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "end",
      marginBottom: 40,
      flexWrap: "wrap",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "gp-eyebrow",
    style: {
      marginBottom: 20
    }
  }, "What we do"), /*#__PURE__*/React.createElement("h3", {
    className: "gp-display gp-h3",
    style: {
      margin: 0,
      letterSpacing: "-0.025em"
    }
  }, "Strategy. Execution. Growth.")), /*#__PURE__*/React.createElement("button", {
    className: "gp-link",
    onClick: () => onNavigate("services")
  }, "Explore Services ", /*#__PURE__*/React.createElement(Arrow, null))), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 0,
      border: "1px solid rgba(255,255,255,0.08)"
    }
  }, items.map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: 32,
      borderRight: i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none",
      minHeight: 240,
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--f-mono)",
      fontSize: 11,
      color: "var(--gold-300)",
      letterSpacing: "0.16em",
      textTransform: "uppercase"
    }
  }, p.k), /*#__PURE__*/React.createElement("h4", {
    className: "gp-display",
    style: {
      fontSize: 24,
      letterSpacing: "-0.02em",
      margin: "24px 0 14px",
      lineHeight: 1.18
    }
  }, p.t), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--steel-300)",
      fontSize: 14,
      margin: 0,
      marginTop: "auto"
    }
  }, p.b)))))));
}
function Principles() {
  const items = [{
    code: "01",
    title: "Boardroom-grade strategy",
    body: "Executive-level thinking applied to every engagement, from RevOps to product roadmap."
  }, {
    code: "02",
    title: "Engineered execution",
    body: "Senior engineers, designers and architects ship the work, never delegated downward."
  }, {
    code: "03",
    title: "Compounding outcomes",
    body: "We build durable systems and brand authority that appreciate quarter over quarter."
  }, {
    code: "04",
    title: "Discretion",
    body: "Quiet by design. We protect every client relationship under strict confidentiality."
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "gp-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 48,
      maxWidth: 760
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "gp-eyebrow",
    style: {
      marginBottom: 20
    }
  }, "Operating principles"), /*#__PURE__*/React.createElement("h2", {
    className: "gp-display gp-h2",
    style: {
      margin: 0,
      letterSpacing: "-0.03em"
    }
  }, "How we engage with ", /*#__PURE__*/React.createElement("span", {
    className: "gp-serif-italic",
    style: {
      color: "var(--gold-200)"
    }
  }, "every client.")))), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 0,
      border: "1px solid rgba(255,255,255,0.08)"
    }
  }, items.map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: p.code,
    style: {
      padding: 32,
      borderRight: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none",
      minHeight: 280,
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--f-mono)",
      fontSize: 11,
      color: "var(--gold-300)",
      letterSpacing: "0.14em"
    }
  }, p.code), /*#__PURE__*/React.createElement("h4", {
    className: "gp-display",
    style: {
      fontSize: 22,
      letterSpacing: "-0.02em",
      marginTop: 28,
      lineHeight: 1.2
    }
  }, p.title), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--steel-300)",
      fontSize: 14,
      marginTop: "auto"
    }
  }, p.body)))))));
}
function Approach() {
  const phases = [{
    p: "Phase 01",
    t: "Discovery",
    body: "Stakeholder mapping, technical audit and executive alignment on outcomes."
  }, {
    p: "Phase 02",
    t: "Architect",
    body: "Solution design, integration architecture and brand definition."
  }, {
    p: "Phase 03",
    t: "Build",
    body: "Embedded engineering, design and creative production delivered in sprints."
  }, {
    p: "Phase 04",
    t: "Operate",
    body: "Ongoing optimization, RevOps, AI tuning and analytics under retainer."
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "gp-section-tight",
    style: {
      background: "var(--ink-1000)",
      borderTop: "1px solid rgba(255,255,255,0.06)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 56,
      maxWidth: 720
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "gp-eyebrow",
    style: {
      marginBottom: 20
    }
  }, "How we engage"), /*#__PURE__*/React.createElement("h2", {
    className: "gp-display gp-h2",
    style: {
      margin: 0,
      letterSpacing: "-0.03em"
    }
  }, "The GoldPoint ", /*#__PURE__*/React.createElement("span", {
    className: "gp-serif-italic",
    style: {
      color: "var(--gold-200)"
    }
  }, "engagement model.")))), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 11,
      height: 1,
      background: "var(--gold-line)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 32
    }
  }, phases.map((ph, i) => /*#__PURE__*/React.createElement("div", {
    key: ph.p
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      width: 22,
      height: 22,
      borderRadius: "50%",
      background: "var(--ink-1000)",
      border: "1px solid var(--gold-300)",
      position: "relative",
      boxShadow: "0 0 24px rgba(201,169,97,0.35)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      inset: 6,
      borderRadius: "50%",
      background: "var(--gold-300)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24,
      fontFamily: "var(--f-mono)",
      fontSize: 11,
      color: "var(--gold-300)",
      letterSpacing: "0.14em"
    }
  }, ph.p), /*#__PURE__*/React.createElement("h4", {
    className: "gp-display",
    style: {
      fontSize: 26,
      letterSpacing: "-0.02em",
      marginTop: 12,
      marginBottom: 14
    }
  }, ph.t), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--steel-300)",
      fontSize: 15,
      margin: 0
    }
  }, ph.body))))))));
}
window.AboutPage = AboutPage;

/* ===================== pages/insights.jsx ===================== */
// GoldPoint Digital, Insights / Blog page

const POSTS = [{
  id: "p1",
  cat: "AI Strategy",
  title: "The enterprise case for AI-first workflows in 2026.",
  author: "GoldPoint Research",
  date: "Apr 22 · 2026",
  read: "8 MIN",
  featured: true,
  excerpt: "Why integrating AI at the workflow layer, not the feature layer, separates leading enterprises from laggards over the next 24 months."
}, {
  id: "p2",
  cat: "Digital Transformation",
  title: "Why CRM modernization is the new revenue lever.",
  author: "GoldPoint Practice",
  date: "Apr 09 · 2026",
  read: "6 MIN",
  excerpt: "Modern CRM is no longer a system of record; it is the operating system for revenue. A framework for what to modernize first."
}, {
  id: "p3",
  cat: "Branding Strategy",
  title: "Brand authority as an inbound growth system.",
  author: "Creative Practice",
  date: "Mar 28 · 2026",
  read: "10 MIN",
  excerpt: "Executive-grade brand systems compound inbound demand. How to architect a brand authority engine across owned and earned channels."
}, {
  id: "p4",
  cat: "DevOps",
  title: "From CI/CD to continuous compliance.",
  author: "Engineering Practice",
  date: "Mar 14 · 2026",
  read: "7 MIN",
  excerpt: "Compliance shifts left. A pragmatic blueprint for engineering teams shipping into regulated industries."
}, {
  id: "p5",
  cat: "UI / UX Strategy",
  title: "The product design economics of premium SaaS.",
  author: "Design Practice",
  date: "Feb 27 · 2026",
  read: "9 MIN",
  excerpt: "What separates a premium SaaS product from a commodity one, and how to invest design dollars where they compound."
}, {
  id: "p6",
  cat: "Enterprise Growth",
  title: "Building durable demand in long sales cycles.",
  author: "Growth Practice",
  date: "Feb 11 · 2026",
  read: "11 MIN",
  excerpt: "For enterprise sellers, demand is built quarters in advance. A practical model for compounding inbound pipeline."
}, {
  id: "p7",
  cat: "Automation",
  title: "Workflow automation as operating leverage.",
  author: "GoldPoint Research",
  date: "Jan 24 · 2026",
  read: "5 MIN",
  excerpt: "Automation isn't a tool category, it's an operating discipline. How leaders are rebuilding execution velocity."
}, {
  id: "p8",
  cat: "SEO & Search Trends",
  title: "After search: visibility in an AI-mediated web.",
  author: "Growth Practice",
  date: "Jan 12 · 2026",
  read: "12 MIN",
  excerpt: "AI is reshaping how buyers discover firms. A playbook for protecting and growing visibility through the transition."
}, {
  id: "p9",
  cat: "Web Development",
  title: "Headless architectures for enterprise marketing.",
  author: "Engineering Practice",
  date: "Dec 18 · 2025",
  read: "8 MIN",
  excerpt: "Why headless is now the default for enterprise marketing, and what to require from your composable stack."
}];
const CATS = ["All", "AI Strategy", "Digital Transformation", "CRM Modernization", "SEO & Search Trends", "UI / UX Strategy", "Automation", "DevOps", "Enterprise Growth", "Web Development", "Branding Strategy"];
function InsightsPage({
  onNavigate
}) {
  const [cat, setCat] = useState("All");
  const featured = POSTS.find(p => p.featured);
  const rest = POSTS.filter(p => !p.featured && (cat === "All" || p.cat === cat));
  const [subEmail, setSubEmail] = useState("");
  const [subState, setSubState] = useState("idle"); // idle | sending | done | error
  const subscribe = async e => {
    if (e) e.preventDefault();
    if (subState === "sending" || !subEmail) return;
    setSubState("sending");
    try {
      const res = await fetch(GP_FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: subEmail,
          form: "Field Notes newsletter",
          _subject: "New newsletter subscriber, GoldPoint Digital"
        })
      });
      setSubState(res.ok ? "done" : "error");
      if (res.ok) setSubEmail("");
    } catch (_) {
      setSubState("error");
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "page-fade"
  }, /*#__PURE__*/React.createElement(PageHeader, {
    kicker: "Insights",
    title: /*#__PURE__*/React.createElement(React.Fragment, null, "Field notes on digital ", /*#__PURE__*/React.createElement("span", {
      className: "gp-serif-italic",
      style: {
        color: "var(--gold-200)"
      }
    }, "transformation.")),
    lede: "Research, frameworks and operating notes from the GoldPoint Digital practice, written for executives modernizing technology, brand and growth."
  }), /*#__PURE__*/React.createElement("section", {
    className: "gp-section-tight"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("article", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.1fr 1fr",
      gap: 64,
      borderTop: "1px solid rgba(255,255,255,0.08)",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
      padding: "56px 0",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "gp-chip"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), "Featured \xB7 ", featured.cat), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--f-mono)",
      fontSize: 11,
      color: "var(--steel-400)",
      letterSpacing: "0.12em"
    }
  }, featured.date)), /*#__PURE__*/React.createElement("h2", {
    className: "gp-display",
    style: {
      fontSize: "clamp(36px, 4.5vw, 60px)",
      letterSpacing: "-0.03em",
      lineHeight: 1.05,
      margin: 0
    }
  }, featured.title), /*#__PURE__*/React.createElement("p", {
    className: "gp-lede",
    style: {
      marginTop: 24
    }
  }, featured.excerpt), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 36,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 32,
      color: "var(--steel-400)",
      fontFamily: "var(--f-mono)",
      fontSize: 11,
      letterSpacing: "0.1em",
      textTransform: "uppercase"
    }
  }, /*#__PURE__*/React.createElement("span", null, "By ", featured.author), /*#__PURE__*/React.createElement("span", null, featured.read, " READ")), /*#__PURE__*/React.createElement("a", {
    className: "gp-link"
  }, "Read essay ", /*#__PURE__*/React.createElement(Arrow, null)))), /*#__PURE__*/React.createElement(MediaPlaceholder, {
    ratio: "4/5",
    label: "featured essay"
  }))))), /*#__PURE__*/React.createElement("section", {
    className: "gp-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 32,
      flexWrap: "wrap",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-label"
  }, "Filter by category"), /*#__PURE__*/React.createElement("div", {
    className: "gp-label"
  }, rest.length, " essays")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 8,
      marginBottom: 56
    }
  }, CATS.map(c => /*#__PURE__*/React.createElement("button", {
    key: c,
    onClick: () => setCat(c),
    className: "gp-tag",
    style: {
      cursor: "pointer",
      background: cat === c ? "var(--gold-300)" : "transparent",
      color: cat === c ? "var(--ink-950)" : "var(--steel-200)",
      borderColor: cat === c ? "var(--gold-300)" : "rgba(255,255,255,0.08)",
      transition: "all .2s ease"
    }
  }, c))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 0,
      border: "1px solid rgba(255,255,255,0.08)"
    }
  }, rest.map((p, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: p.id,
    delay: i % 3
  }, /*#__PURE__*/React.createElement("article", {
    style: {
      padding: 36,
      borderRight: i % 3 !== 2 ? "1px solid rgba(255,255,255,0.08)" : "none",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
      minHeight: 320,
      display: "flex",
      flexDirection: "column",
      cursor: "pointer",
      transition: "background .3s"
    },
    onMouseOver: e => e.currentTarget.style.background = "rgba(201,169,97,0.04)",
    onMouseOut: e => e.currentTarget.style.background = "transparent"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--f-mono)",
      fontSize: 11,
      color: "var(--gold-300)",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      marginBottom: 28
    }
  }, p.cat), /*#__PURE__*/React.createElement("h4", {
    className: "gp-display",
    style: {
      fontSize: 22,
      lineHeight: 1.22,
      letterSpacing: "-0.02em",
      margin: 0,
      marginBottom: 16
    }
  }, p.title), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--steel-300)",
      fontSize: 14,
      marginBottom: 24
    }
  }, p.excerpt), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      display: "flex",
      justifyContent: "space-between",
      color: "var(--steel-400)",
      fontFamily: "var(--f-mono)",
      fontSize: 11,
      letterSpacing: "0.08em"
    }
  }, /*#__PURE__*/React.createElement("span", null, p.date), /*#__PURE__*/React.createElement("span", null, p.read)))))))), /*#__PURE__*/React.createElement("section", {
    className: "gp-section-tight",
    style: {
      background: "var(--ink-1000)",
      borderTop: "1px solid rgba(255,255,255,0.06)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 64,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "gp-eyebrow",
    style: {
      marginBottom: 20
    }
  }, "Subscribe \xB7 GoldPoint Field Notes"), /*#__PURE__*/React.createElement("h3", {
    className: "gp-display gp-h3",
    style: {
      margin: 0,
      letterSpacing: "-0.02em"
    }
  }, "Research delivered monthly to executive teams modernizing their stack.")), /*#__PURE__*/React.createElement("div", null, subState === "done" ? /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--gold-line)",
      paddingTop: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-eyebrow",
    style: {
      marginBottom: 12
    }
  }, "Subscribed"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--steel-200)",
      fontSize: 15,
      margin: 0
    }
  }, "Thank you. You're on the list, watch your inbox for the next GoldPoint Field Notes.")) : /*#__PURE__*/React.createElement("form", {
    onSubmit: subscribe
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr auto",
      gap: 16,
      alignItems: "end"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "gp-label"
  }, "Work email"), /*#__PURE__*/React.createElement("input", {
    type: "email",
    required: true,
    className: "gp-input",
    placeholder: "you@company.com",
    value: subEmail,
    onChange: e => {
      setSubEmail(e.target.value);
      if (subState === "error") setSubState("idle");
    }
  })), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "gp-btn gp-btn-gold",
    disabled: subState === "sending",
    style: {
      opacity: subState === "sending" ? 0.7 : 1,
      cursor: subState === "sending" ? "default" : "pointer"
    }
  }, subState === "sending" ? "Sending…" : /*#__PURE__*/React.createElement(React.Fragment, null, "Subscribe ", /*#__PURE__*/React.createElement(Arrow, null)))), subState === "error" ? /*#__PURE__*/React.createElement("div", {
    style: {
      color: "#e9b4b4",
      fontSize: 12,
      marginTop: 16,
      lineHeight: 1.5
    }
  }, "Something went wrong. Please try again, or email ", /*#__PURE__*/React.createElement("a", {
    href: "mailto:info@goldpointdigital.com",
    style: {
      color: "var(--gold-200)",
      borderBottom: "1px solid var(--gold-line-strong)"
    }
  }, "info@goldpointdigital.com"), ".") : /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--steel-400)",
      fontSize: 12,
      marginTop: 16,
      fontFamily: "var(--f-mono)",
      letterSpacing: "0.08em"
    }
  }, "NO SPAM \xB7 MONTHLY ESSAY \xB7 UNSUBSCRIBE ANYTIME")))))));
}
window.InsightsPage = InsightsPage;

/* ===================== pages/careers.jsx ===================== */
// GoldPoint Digital, Careers page (simple, single CTA)

function CareersPage({
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "page-fade"
  }, /*#__PURE__*/React.createElement(PageHeader, {
    kicker: "Careers",
    title: /*#__PURE__*/React.createElement(React.Fragment, null, "Build the firm with ", /*#__PURE__*/React.createElement("span", {
      className: "gp-serif-italic",
      style: {
        color: "var(--gold-200)"
      }
    }, "us.")),
    lede: "GoldPoint Digital is a senior bench by design. We hire experienced consultants, engineers, designers and strategists who are ready to embed with executive teams and deliver work that matters."
  }), /*#__PURE__*/React.createElement("section", {
    className: "gp-section",
    style: {
      paddingTop: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 80,
      alignItems: "start",
      borderTop: "1px solid rgba(255,255,255,0.08)",
      paddingTop: 56
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "gp-eyebrow",
    style: {
      marginBottom: 24
    }
  }, "What we look for"), /*#__PURE__*/React.createElement("h2", {
    className: "gp-display gp-h2",
    style: {
      margin: 0,
      letterSpacing: "-0.03em",
      maxWidth: "14ch"
    }
  }, "Senior talent. ", /*#__PURE__*/React.createElement("span", {
    className: "gp-serif-italic",
    style: {
      color: "var(--gold-200)"
    }
  }, "Quiet excellence.")), /*#__PURE__*/React.createElement("p", {
    className: "gp-lede",
    style: {
      marginTop: 28
    }
  }, "We do not run a public job board. Our team grows through referral and direct introduction, on a rolling basis as engagements scale."), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--steel-300)",
      marginTop: 16,
      fontSize: 16,
      lineHeight: 1.6
    }
  }, "If your background sits at the intersection of strategy and execution, in consulting, engineering, AI, design, brand, or growth, we would welcome the introduction."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40,
      display: "flex",
      gap: 14,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "mailto:info@goldpointdigital.com",
    className: "gp-btn gp-btn-gold",
    style: {
      textDecoration: "none"
    }
  }, "info@goldpointdigital.com ", /*#__PURE__*/React.createElement(Arrow, null)), /*#__PURE__*/React.createElement("button", {
    className: "gp-btn gp-btn-ghost",
    onClick: () => onNavigate("about")
  }, "About the firm ", /*#__PURE__*/React.createElement(Arrow, null)))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 2
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 0,
      border: "1px solid rgba(255,255,255,0.08)"
    }
  }, [{
    code: "01",
    t: "Senior bench",
    b: "Experienced practitioners, never junior delivery."
  }, {
    code: "02",
    t: "Remote, first",
    b: "Distributed by design, we work with senior talent wherever they are."
  }, {
    code: "03",
    t: "Executive scope",
    b: "Direct exposure to C-suite stakeholders from day one."
  }, {
    code: "04",
    t: "Premium economics",
    b: "Top of market compensation and partner-track economics."
  }].map((x, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: 28,
      borderRight: i % 2 === 0 ? "1px solid rgba(255,255,255,0.08)" : "none",
      borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none",
      display: "flex",
      flexDirection: "column",
      gap: 12,
      minHeight: 200
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--f-mono)",
      fontSize: 11,
      color: "var(--gold-300)",
      letterSpacing: "0.14em"
    }
  }, x.code), /*#__PURE__*/React.createElement("h4", {
    className: "gp-display",
    style: {
      fontSize: 20,
      letterSpacing: "-0.02em",
      margin: "auto 0 0"
    }
  }, x.t), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--steel-300)",
      fontSize: 13,
      margin: 0
    }
  }, x.b)))))))), /*#__PURE__*/React.createElement(FinalCTA, {
    onNavigate: onNavigate
  }));
}
window.CareersPage = CareersPage;

/* ===================== pages/contact.jsx ===================== */
// GoldPoint Digital, Contact page (simplified consultation booking)

function ContactPage({
  onNavigate
}) {
  const SESSIONS = [{
    id: "15",
    len: "15 min",
    title: "Intro Call",
    desc: "A quick fit check to understand your goals and point you in the right direction."
  }, {
    id: "30",
    len: "30 min",
    title: "Consultation",
    desc: "A focused working session on a specific initiative, challenge or opportunity."
  }, {
    id: "60",
    len: "60 min",
    title: "Strategic Discussion",
    desc: "A deep-dive with our team to map a transformation, AI or growth roadmap."
  }];
  const [session, setSession] = useState("30");
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async e => {
    e.preventDefault();
    if (submitting) return;
    setError("");
    setSubmitting(true);
    const chosen = SESSIONS.find(s => s.id === session);
    try {
      const res = await fetch(GP_FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          session: chosen ? chosen.len + " " + chosen.title : session,
          _subject: "New consultation request, GoldPoint Digital"
        })
      });
      if (res.ok) {
        setSubmitted(true);
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      } else {
        let msg = "Something went wrong. Please try again or email us directly.";
        try {
          const data = await res.json();
          if (data && data.errors && data.errors.length) {
            msg = data.errors.map(x => x.message).join(" ");
          }
        } catch (_) {}
        setError(msg);
      }
    } catch (_) {
      setError("We couldn't reach the server. Please check your connection or email us directly.");
    } finally {
      setSubmitting(false);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "page-fade"
  }, /*#__PURE__*/React.createElement(PageHeader, {
    kicker: "Schedule a Consultation",
    title: /*#__PURE__*/React.createElement(React.Fragment, null, "Let's build something ", /*#__PURE__*/React.createElement("span", {
      className: "gp-serif-italic",
      style: {
        color: "var(--gold-200)"
      }
    }, "exceptional.")),
    lede: "Tell us who you are and pick a session length. A member of our team will confirm your time, typically within 24 hours."
  }), /*#__PURE__*/React.createElement("section", {
    className: "gp-section",
    style: {
      paddingTop: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-container"
  }, !submitted ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 80,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid rgba(255,255,255,0.08)",
      paddingTop: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-label",
    style: {
      marginBottom: 20
    }
  }, "Step 1 \xB7 Choose a session"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, SESSIONS.map(s => {
    const on = session === s.id;
    return /*#__PURE__*/React.createElement("button", {
      key: s.id,
      type: "button",
      onClick: () => setSession(s.id),
      style: {
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gap: 20,
        alignItems: "center",
        textAlign: "left",
        padding: "22px 24px",
        border: "1px solid " + (on ? "var(--gold-300)" : "rgba(255,255,255,0.1)"),
        background: on ? "rgba(201,169,97,0.07)" : "transparent",
        cursor: "pointer",
        transition: "all .2s"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--f-display)",
        fontSize: 22,
        letterSpacing: "-0.02em",
        color: on ? "var(--gold-200)" : "var(--bone-100)",
        minWidth: 72
      }
    }, s.len), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "block",
        fontFamily: "var(--f-display)",
        fontSize: 18,
        letterSpacing: "-0.015em",
        marginBottom: 4
      }
    }, s.title), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "block",
        color: "var(--steel-300)",
        fontSize: 13,
        lineHeight: 1.45
      }
    }, s.desc)));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40,
      display: "flex",
      alignItems: "center",
      gap: 12,
      color: "var(--steel-300)",
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "pulse-dot"
  }), "Prefer email? Reach us directly at ", /*#__PURE__*/React.createElement("a", {
    href: "mailto:sales@goldpointdigital.com",
    style: {
      color: "var(--gold-200)",
      borderBottom: "1px solid var(--gold-line-strong)"
    }
  }, "sales@goldpointdigital.com")))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 1
  }, /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit,
    style: {
      borderTop: "1px solid var(--gold-line)",
      paddingTop: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-label",
    style: {
      marginBottom: 28
    }
  }, "Step 2 \xB7 Your details"), /*#__PURE__*/React.createElement(Field, {
    label: "Name *"
  }, /*#__PURE__*/React.createElement("input", {
    className: "gp-input",
    required: true,
    placeholder: "First & last name",
    value: form.name,
    onChange: e => setForm({
      ...form,
      name: e.target.value
    })
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Email *"
  }, /*#__PURE__*/React.createElement("input", {
    type: "email",
    className: "gp-input",
    required: true,
    placeholder: "you@company.com",
    value: form.email,
    onChange: e => setForm({
      ...form,
      email: e.target.value
    })
  })), /*#__PURE__*/React.createElement(Field, {
    label: "What would you like to discuss? (optional)"
  }, /*#__PURE__*/React.createElement("textarea", {
    className: "gp-textarea",
    rows: "3",
    placeholder: "A sentence or two of context helps us prepare.",
    value: form.message,
    onChange: e => setForm({
      ...form,
      message: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32,
      padding: "18px 20px",
      border: "1px solid rgba(255,255,255,0.08)",
      background: "var(--ink-900)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "gp-label"
  }, "Selected session"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--f-display)",
      fontSize: 17,
      color: "var(--gold-200)"
    }
  }, SESSIONS.find(s => s.id === session).len, " \xB7 ", SESSIONS.find(s => s.id === session).title)), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "gp-btn gp-btn-gold",
    disabled: submitting,
    style: {
      marginTop: 28,
      width: "100%",
      justifyContent: "center",
      opacity: submitting ? 0.7 : 1,
      cursor: submitting ? "default" : "pointer"
    }
  }, submitting ? "Sending…" : /*#__PURE__*/React.createElement(React.Fragment, null, "Request This Time ", /*#__PURE__*/React.createElement(Arrow, null))), error && /*#__PURE__*/React.createElement("div", {
    style: {
      color: "#e9b4b4",
      fontSize: 13,
      marginTop: 16,
      textAlign: "center",
      lineHeight: 1.5
    }
  }, error, " ", /*#__PURE__*/React.createElement("a", {
    href: "mailto:sales@goldpointdigital.com",
    style: {
      color: "var(--gold-200)",
      borderBottom: "1px solid var(--gold-line-strong)"
    }
  }, "sales@goldpointdigital.com")), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--steel-400)",
      fontFamily: "var(--f-mono)",
      fontSize: 10,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      marginTop: 18,
      textAlign: "center"
    }
  }, "Secured \xB7 TLS 1.3 \xB7 No obligation")))) : /*#__PURE__*/React.createElement(SubmittedState, {
    session: SESSIONS.find(s => s.id === session),
    name: form.name,
    onReset: () => {
      setSubmitted(false);
      setForm({
        name: "",
        email: "",
        message: ""
      });
    },
    onNavigate: onNavigate
  }))));
}
function Field({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement("label", {
    className: "gp-label"
  }, label), children);
}
function SubmittedState({
  session,
  name,
  onReset,
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 760,
      margin: "0 auto",
      textAlign: "center",
      borderTop: "1px solid var(--gold-line)",
      paddingTop: 64
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "gp-eyebrow",
    style: {
      marginBottom: 24,
      justifyContent: "center"
    }
  }, "Request received"), /*#__PURE__*/React.createElement("h3", {
    className: "gp-display gp-h2",
    style: {
      margin: "24px 0 0",
      letterSpacing: "-0.03em"
    }
  }, "Thank you", name ? ", " + name.split(" ")[0] : "", ". ", /*#__PURE__*/React.createElement("span", {
    className: "gp-serif-italic",
    style: {
      color: "var(--gold-200)"
    }
  }, "We'll confirm shortly.")), /*#__PURE__*/React.createElement("p", {
    className: "gp-lede",
    style: {
      marginTop: 24,
      marginLeft: "auto",
      marginRight: "auto"
    }
  }, "We've reserved your interest in a ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--bone-100)"
    }
  }, session.len, " ", session.title), ". A member of our team will email you to confirm a time, typically within 24 hours."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40,
      display: "inline-flex",
      gap: 14,
      flexWrap: "wrap",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "gp-btn gp-btn-ghost",
    onClick: onReset
  }, "Book another session ", /*#__PURE__*/React.createElement(Arrow, null)), /*#__PURE__*/React.createElement("button", {
    className: "gp-btn gp-btn-primary",
    onClick: () => onNavigate("insights")
  }, "Read our insights ", /*#__PURE__*/React.createElement(Arrow, null))));
}
window.ContactPage = ContactPage;

/* ===================== pages/legal.jsx ===================== */
// GoldPoint Digital, Legal pages (Privacy, Terms, Security)

/* ---------- Shared legal layout ---------- */
function LegalLayout({
  kicker,
  title,
  updated,
  intro,
  sections,
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "page-fade"
  }, /*#__PURE__*/React.createElement(PageHeader, {
    kicker: kicker,
    title: title,
    lede: intro
  }), /*#__PURE__*/React.createElement("section", {
    className: "gp-section",
    style: {
      paddingTop: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "260px 1fr",
      gap: 64,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("aside", {
    style: {
      position: "sticky",
      top: 120
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-label",
    style: {
      marginBottom: 20
    }
  }, "Contents"), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      padding: 0,
      margin: 0,
      borderTop: "1px solid rgba(255,255,255,0.08)"
    }
  }, sections.map((s, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      const el = document.getElementById("sec-" + i);
      if (el) window.scrollTo({
        top: el.getBoundingClientRect().top + window.pageYOffset - 110,
        behavior: "smooth"
      });
    },
    style: {
      display: "grid",
      gridTemplateColumns: "32px 1fr",
      gap: 10,
      width: "100%",
      textAlign: "left",
      padding: "14px 0",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
      color: "var(--steel-200)",
      fontSize: 14,
      cursor: "pointer",
      transition: "color .2s"
    },
    onMouseOver: e => e.currentTarget.style.color = "var(--gold-200)",
    onMouseOut: e => e.currentTarget.style.color = "var(--steel-200)"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--f-mono)",
      fontSize: 11,
      color: "var(--gold-400)"
    }
  }, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("span", null, s.h))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-label",
    style: {
      marginBottom: 8
    }
  }, "Last updated"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "var(--steel-200)"
    }
  }, updated))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 760
    }
  }, sections.map((s, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    id: "sec-" + i,
    style: {
      paddingBottom: 40,
      marginBottom: 40,
      borderBottom: i < sections.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 16,
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--f-mono)",
      fontSize: 12,
      color: "var(--gold-300)",
      letterSpacing: "0.12em"
    }
  }, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("h2", {
    className: "gp-display",
    style: {
      fontSize: 26,
      letterSpacing: "-0.02em",
      margin: 0
    }
  }, s.h)), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingLeft: 32,
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, s.body.map((p, j) => typeof p === "string" ? /*#__PURE__*/React.createElement("p", {
    key: j,
    style: {
      color: "var(--steel-200)",
      fontSize: 16,
      lineHeight: 1.65,
      margin: 0
    }
  }, p) : /*#__PURE__*/React.createElement("ul", {
    key: j,
    style: {
      margin: 0,
      paddingLeft: 0,
      listStyle: "none",
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, p.map((li, k) => /*#__PURE__*/React.createElement("li", {
    key: k,
    style: {
      display: "grid",
      gridTemplateColumns: "16px 1fr",
      gap: 12,
      color: "var(--steel-200)",
      fontSize: 15,
      lineHeight: 1.55
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 5,
      height: 5,
      background: "var(--gold-300)",
      marginTop: 9
    }
  }), /*#__PURE__*/React.createElement("span", null, li))))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      padding: 28,
      border: "1px solid var(--gold-line)",
      background: "rgba(201,169,97,0.04)"
    }
  }, /*#__PURE__*/React.createElement("h4", {
    className: "gp-display",
    style: {
      fontSize: 20,
      letterSpacing: "-0.02em",
      margin: 0,
      marginBottom: 10
    }
  }, "Questions about this policy?"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--steel-300)",
      fontSize: 14,
      margin: 0,
      marginBottom: 18
    }
  }, "Reach our team at ", /*#__PURE__*/React.createElement("a", {
    href: "mailto:info@goldpointdigital.com",
    style: {
      color: "var(--gold-200)",
      borderBottom: "1px solid var(--gold-line-strong)"
    }
  }, "info@goldpointdigital.com"), "."), /*#__PURE__*/React.createElement("button", {
    className: "gp-btn gp-btn-ghost",
    style: {
      height: 44,
      fontSize: 13
    },
    onClick: () => onNavigate("contact")
  }, "Contact us ", /*#__PURE__*/React.createElement(Arrow, {
    size: 12
  }))))))));
}

/* ---------- Privacy Policy ---------- */
function PrivacyPage({
  onNavigate
}) {
  return /*#__PURE__*/React.createElement(LegalLayout, {
    onNavigate: onNavigate,
    kicker: "Legal",
    title: "Privacy Policy",
    updated: "May 29, 2026",
    intro: "GoldPoint Digital respects your privacy and is committed to protecting the personal information you share with us. This policy explains what we collect, how we use it and the choices available to you.",
    sections: [{
      h: "Information we collect",
      body: ["We collect information you provide directly, such as your name, email address and any details submitted through our consultation and contact forms.", "We also collect limited technical information automatically, including device type, browser, and general usage data, to operate and improve the website."]
    }, {
      h: "How we use information",
      body: ["We use the information we collect to:", ["Respond to inquiries and schedule consultations", "Provide and improve our services", "Communicate updates you have requested", "Maintain the security and performance of our website"]]
    }, {
      h: "Sharing of information",
      body: ["We do not sell your personal information. We may share information with trusted service providers who support our operations, and only to the extent necessary to deliver our services.", "We may disclose information where required by law or to protect the rights, safety and property of GoldPoint Digital and others."]
    }, {
      h: "Data retention",
      body: ["We retain personal information only for as long as necessary to fulfill the purposes described in this policy, or as required by applicable law."]
    }, {
      h: "Your choices",
      body: ["You may request access to, correction of, or deletion of your personal information at any time by contacting us.", "You can opt out of non-essential communications by following the unsubscribe instructions included in our emails."]
    }, {
      h: "Contact",
      body: ["If you have questions about this Privacy Policy or how your information is handled, please contact us at info@goldpointdigital.com."]
    }]
  });
}

/* ---------- Terms of Use ---------- */
function TermsPage({
  onNavigate
}) {
  return /*#__PURE__*/React.createElement(LegalLayout, {
    onNavigate: onNavigate,
    kicker: "Legal",
    title: "Terms of Use",
    updated: "May 29, 2026",
    intro: "By accessing or using the GoldPoint Digital website, services or content, you agree to comply with these Terms of Use. Please read them carefully.",
    sections: [{
      h: "Acceptance of terms",
      body: ["By accessing or using this website, you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree, please do not use the website."]
    }, {
      h: "Use of the website",
      body: ["You agree not to:", ["Use the website for any unlawful purpose", "Attempt unauthorized access to our systems or data", "Copy proprietary content without authorization", "Interfere with or disrupt the operation of the website"]]
    }, {
      h: "Intellectual property",
      body: ["All website content, branding, designs, graphics, text, code and intellectual property are owned by GoldPoint Digital unless otherwise stated, and may not be used without prior written permission."]
    }, {
      h: "Service availability",
      body: ["GoldPoint Digital reserves the right to modify, update or discontinue services or website functionality at any time without notice.", "We do not guarantee uninterrupted website availability and shall not be liable for damages resulting from service interruptions."]
    }, {
      h: "Limitation of liability",
      body: ["The website and its content are provided on an \"as is\" basis. To the fullest extent permitted by law, GoldPoint Digital disclaims all warranties and shall not be liable for any indirect or consequential damages arising from your use of the website."]
    }, {
      h: "Acceptance",
      body: ["Continued use of this website constitutes acceptance of these terms. For questions, contact info@goldpointdigital.com."]
    }]
  });
}

/* ---------- Security ---------- */
function SecurityPage({
  onNavigate
}) {
  return /*#__PURE__*/React.createElement(LegalLayout, {
    onNavigate: onNavigate,
    kicker: "Trust & Security",
    title: "Security",
    updated: "May 29, 2026",
    intro: "Security is foundational to how we build and operate. This overview summarizes the practices we apply across our website and client engagements.",
    sections: [{
      h: "Data protection",
      body: ["All traffic to our website is encrypted in transit using modern TLS. Sensitive data is handled according to the principle of least privilege and stored only as long as needed."]
    }, {
      h: "Infrastructure security",
      body: ["Our practices include:", ["Encryption in transit and at rest", "Secure, monitored hosting environments", "Security headers and hardened configurations", "Regular backups and recovery testing", "Protection against common web threats"]]
    }, {
      h: "Access controls",
      body: ["We apply role-based access controls and multi-factor authentication across internal systems, ensuring only authorized personnel can access sensitive information."]
    }, {
      h: "Engagement security",
      body: ["For client engagements, we align to your security and compliance requirements, including data handling agreements, confidentiality terms and industry-specific obligations where applicable."]
    }, {
      h: "Reporting a concern",
      body: ["If you believe you have found a security issue, please contact us promptly at info@goldpointdigital.com so we can investigate and respond."]
    }]
  });
}
window.PrivacyPage = PrivacyPage;
window.TermsPage = TermsPage;
window.SecurityPage = SecurityPage;

/* ===================== app.jsx ===================== */
// GoldPoint Digital — App router

function App() {
  const initial = typeof location !== "undefined" && location.hash.replace(/^#\//, "") || "home";
  const [page, setPage] = useState(initial || "home");
  useEffect(() => {
    const onHash = () => setPage(location.hash.replace(/^#\//, "") || "home");
    window.addEventListener("hashchange", onHash);
    window.addEventListener("gpnav", e => navigate(e.detail));
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const navigate = id => {
    setPage(id);
    history.pushState(null, "", "#/" + id);
    window.scrollTo({
      top: 0,
      behavior: "instant" in window ? "instant" : "auto"
    });
  };
  let view;
  switch (page) {
    case "services":
      view = /*#__PURE__*/React.createElement(ServicesPage, {
        onNavigate: navigate
      });
      break;
    case "solutions":
      view = /*#__PURE__*/React.createElement(SolutionsPage, {
        onNavigate: navigate
      });
      break;
    case "industries":
      view = /*#__PURE__*/React.createElement(IndustriesPage, {
        onNavigate: navigate
      });
      break;
    case "about":
      view = /*#__PURE__*/React.createElement(AboutPage, {
        onNavigate: navigate
      });
      break;
    case "insights":
      view = /*#__PURE__*/React.createElement(InsightsPage, {
        onNavigate: navigate
      });
      break;
    case "careers":
      view = /*#__PURE__*/React.createElement(CareersPage, {
        onNavigate: navigate
      });
      break;
    case "contact":
      view = /*#__PURE__*/React.createElement(ContactPage, {
        onNavigate: navigate
      });
      break;
    case "privacy":
      view = /*#__PURE__*/React.createElement(PrivacyPage, {
        onNavigate: navigate
      });
      break;
    case "terms":
      view = /*#__PURE__*/React.createElement(TermsPage, {
        onNavigate: navigate
      });
      break;
    case "security":
      view = /*#__PURE__*/React.createElement(SecurityPage, {
        onNavigate: navigate
      });
      break;
    case "home":
    default:
      view = /*#__PURE__*/React.createElement(HomePage, {
        onNavigate: navigate
      });
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Nav, {
    active: page,
    onNavigate: navigate
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      paddingTop: 0
    }
  }, view), /*#__PURE__*/React.createElement(Footer, {
    onNavigate: navigate
  }));
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(/*#__PURE__*/React.createElement(App, null));

/* Wire favicon to the embedded brand mark */
(function () {
  try {
    var l = document.querySelector('link[rel="icon"]') || document.createElement('link');
    l.rel = 'icon';
    l.type = 'image/png';
    l.href = GP_ICON;
    document.head.appendChild(l);
  } catch (e) {}
})();