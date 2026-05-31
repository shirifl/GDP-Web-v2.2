# GoldPoint Digital — Website

A production build of the GoldPoint Digital marketing site: a single-page React
application built with [Vite](https://vitejs.dev/). It ships nine pages (Home,
Services, Solutions, Industries, About, Insights, Careers, Contact) plus Privacy,
Terms and Security, all fully responsive from large desktops down to small phones.

Both interactive forms — the **consultation booking** form on the Contact page and
the **newsletter** signup on the Insights page — are wired to
[Formspree](https://formspree.io/).

---

## Quick start

You need [Node.js](https://nodejs.org/) 18 or newer (20+ recommended).

```bash
npm install      # install dependencies
npm run dev      # start the local dev server (http://localhost:5173)
npm run build    # create an optimized production build in dist/
npm run preview  # preview the production build locally
```

---

## Project structure

```
.
├── index.html              # HTML entry (fonts, favicons, social meta)
├── vite.config.js          # Vite config (base: './' so it works in any folder)
├── package.json
├── public/                 # copied verbatim into the build root
│   ├── favicon.ico, favicon-16x16.png, favicon-32x32.png
│   ├── apple-touch-icon.png, icon-192.png, icon-512.png
│   ├── site.webmanifest
│   └── assets/goldpoint-icon.png
├── src/
│   ├── main.jsx            # mounts <App /> and imports global CSS
│   ├── App.jsx             # hash-based router (#/services, #/contact, …)
│   ├── components.jsx      # shared components (Nav, Footer, Hero visual, etc.)
│   ├── styles.css          # design tokens + all styling + responsive layer
│   ├── assets/goldpoint-icon.png
│   └── pages/
│       ├── Home.jsx  Services.jsx  Solutions.jsx  Industries.jsx
│       ├── About.jsx  Insights.jsx  Careers.jsx  Contact.jsx
│       └── Legal.jsx       # Privacy, Terms, Security
└── .github/workflows/deploy.yml   # CI: build + deploy to GitHub Pages
```

Routing is **hash-based** (`#/contact`, `#/insights`, …). This means deep links
never 404 on a static host — no server rewrite rules are required.

---

## Forms & Formspree

Both forms submit to a single Formspree form. The form ID lives in two files as a
constant named `FORMSPREE_ID`:

- `src/pages/Contact.jsx` — consultation booking
- `src/pages/Insights.jsx` — newsletter signup

The current ID is **`mgoqrloj`** (endpoint `https://formspree.io/f/mgoqrloj`).

**To use your own Formspree form**, replace that ID in both files:

```js
const FORMSPREE_ID = "your_new_id";
```

Each submission includes a hidden `form_type` field so you can tell them apart in
your Formspree inbox:

| Form                | `form_type` value          | Extra fields sent                 |
| ------------------- | -------------------------- | --------------------------------- |
| Contact page        | `Consultation Request`     | `name`, `email`, `message`, `session` |
| Insights newsletter | `Newsletter Subscription`  | `email`                           |

The integration uses the official [`@formspree/react`](https://github.com/formspree/formspree-js/tree/master/packages/formspree-react)
package (`useForm` + `ValidationError`), which handles submission state, inline
validation errors and the success view automatically.

---

## Deploying

The site builds to a static `dist/` folder, so it can be hosted anywhere.

### Option A — GitHub Pages (automated, included)

1. Push this repository to GitHub.
2. In the repo, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Push to the `main` branch. The workflow in `.github/workflows/deploy.yml`
   builds the site and publishes it automatically. Your site appears at
   `https://<username>.github.io/<repo>/`.

Because `vite.config.js` sets `base: './'`, the site works correctly whether it's
served from a domain root **or** a GitHub Pages subpath — no config change needed.

### Option B — Netlify / Vercel / Cloudflare Pages

Connect the repo and use:

- **Build command:** `npm run build`
- **Publish directory:** `dist`

Or simply run `npm run build` locally and drag the `dist/` folder onto
Netlify Drop (https://app.netlify.com/drop).

### Option C — any static host

Run `npm run build` and upload the contents of `dist/` to your host
(S3, nginx, Apache, etc.). No special server configuration is required.

---

## Customizing

- **Contact emails** — the site uses `info@goldpointdigital.com` and
  `sales@goldpointdigital.com`. Search the `src/` folder for these to update them.
- **Colors / typography** — all design tokens are CSS variables defined at the top
  of `src/styles.css` (ink black, ivory, champagne gold, fonts).
- **Content** — page copy lives in the corresponding file under `src/pages/`.
- **Favicons / social preview** — replace the images in `public/` and update the
  `<meta>` tags in `index.html`.

---

## Tech

React 18 · Vite 5 · @formspree/react · hash routing · zero runtime CSS framework.
