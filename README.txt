GoldPoint Digital — Website (self-contained)
============================================

This bundle contains EVERYTHING required to host the site. There are no
runtime CDN dependencies. The only outbound request the site makes is when a
visitor submits a form (to Formspree, the third-party form backend) — that is
by design and cannot be bundled.

CONTENTS
  index.html                         Entry point — open or serve this.
  app.js                             The full application (precompiled, plain JS).
  assets/
    goldpoint-icon.png               Brand logo (used in nav, footer, favicon).
  vendor/
    react.production.min.js          React 18.3.1 (official build).
    react-dom.production.min.js      ReactDOM 18.3.1 (official build).
  fonts/                             Self-hosted web fonts (woff2, latin subset):
    Inter Tight (300/400/500/600), Inter (300/400/500/600),
    JetBrains Mono (400/500), Newsreader italic (400/500).
  README.txt                         This file.

HOW TO HOST
  Upload the whole folder (keeping its structure) to any static web host, or
  serve it locally. Because index.html references app.js, vendor/, and fonts/
  with relative paths, the files must stay together in the same layout.

  Quick local preview (recommended, avoids browser file:// restrictions):
    cd into this folder, then run one of:
      python3 -m http.server 8000      (then open http://localhost:8000)
      npx serve .
  Opening index.html directly via file:// also works in most browsers.

ROUTING
  Single-page app using hash routes (e.g. #/services, #/contact). No server-side
  routing or rewrites needed; any static host works as-is.

FORMS (Formspree)
  The contact consultation form and the Insights newsletter both POST to
  https://formspree.io/f/mgoqrloj. On the first real submission Formspree emails
  the account owner to confirm the form before it forwards messages — approve
  that email once to activate delivery. The free tier has a monthly submission
  cap; upgrade if you expect high volume.

FONTS LICENSE
  All bundled fonts are open source under the SIL Open Font License (OFL) and
  are redistributable: Inter, Inter Tight, JetBrains Mono, Newsreader.

PAGES
  Home · Services · Solutions · Industries · About · Insights · Contact
  Careers (footer link) · Privacy · Terms · Security
