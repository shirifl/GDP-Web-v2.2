# GoldPoint Digital

Enterprise digital transformation, AI engineering, CRM modernization and growth consulting website. Built as a React single-page application with Vite.

## Tech stack

- **React 18** + **Vite 5** (production bundling, no in-browser transpilation)
- **Hash-based routing** (no server config required, works on any static host)
- **[@formspree/react](https://formspree.io/)** for form handling
- Pure CSS design system (`src/styles.css`), Google Fonts (Inter Tight, Inter, JetBrains Mono, Newsreader)

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # produce a production build in dist/
npm run preview  # preview the production build locally
```

## Project structure

```
goldpoint-digital/
├── index.html                 # Vite entry HTML (fonts, favicon, #root)
├── vite.config.js             # base "./" for portable hosting
├── public/
│   └── favicon.png
├── src/
│   ├── main.jsx               # React entry point
│   ├── App.jsx                # router (hash-based) + Nav/Footer shell
│   ├── styles.css             # design tokens + all component styles
│   ├── components.jsx         # shared components (Nav, Footer, Reveal, …)
│   └── pages/                 # Home, Services, Solutions, Industries,
│                              # About, Insights, Careers, Contact, Legal
└── .github/workflows/deploy.yml
```

## Forms (Formspree)

Both forms submit to the Formspree endpoint `mgoqrloj` via `@formspree/react`.
Each form includes a hidden `form_type` field so submissions are easy to tell
apart in the Formspree inbox:

| Form                         | Location              | `form_type`            | Fields sent                                  |
| ---------------------------- | --------------------- | ---------------------- | -------------------------------------------- |
| Consultation request         | Contact page          | `Consultation Request` | `name`, `email`, `message`, `session`        |
| Field Notes newsletter       | Insights page         | `Newsletter Signup`    | `email`                                       |

Both forms show inline validation errors, disable their submit button while
sending, and render a success state on completion.

To point at a different Formspree project, change the form ID passed to
`useForm("mgoqrloj")` in `src/pages/contact.jsx` and `src/pages/insights.jsx`.

## Deployment

The build uses a **relative base path** (`base: "./"`) and **hash routing**, so
the same `dist/` output works unchanged on a root domain *or* a subpath such as
a GitHub Pages project site — no configuration edits needed.

### GitHub Pages (included workflow)

1. Push this repo to GitHub with the default branch named `main`.
2. In the repo: **Settings → Pages → Build and deployment → Source → GitHub Actions**.
3. Every push to `main` runs `.github/workflows/deploy.yml`, which builds and
   publishes `dist/`. The site goes live at `https://<user>.github.io/<repo>/`.

### Netlify

Connect the repo (config is in `netlify.toml`) or drag-and-drop the `dist/`
folder. Build command `npm run build`, publish directory `dist`.

### Vercel

Import the repo. Settings are detected from `vercel.json` (Vite framework,
build `npm run build`, output `dist`).

## Notes

- Image placeholders (`MediaPlaceholder`) are intentional and ready for real
  client logos, leadership portraits and case-study photography.
- Contact emails used site-wide: `info@goldpointdigital.com`,
  `sales@goldpointdigital.com`.
