# Junaid Afzal — Portfolio

Live: <https://junaid.is-a.dev/> · React 19 + Vite 7 + Tailwind 4 + GSAP + Lenis + react-three-fiber.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # outputs dist/ (SEO files are generated here)
npm run preview
```

## Where things live

| What | Where |
| --- | --- |
| Domain, title, description, contact details, verification tokens | `src/constants/site.js` |
| All page copy (hero, services, experience, projects, skills, education) | `src/constants/index.js` |
| Section UI | `src/sections/*` |
| SEO generation (meta, JSON-LD, prerendered HTML, sitemap, robots, llms.txt) | `vite-plugins/seo.js` |
| Cache + security headers (Vercel) | `vercel.json` |
| IndexNow ping (production deploys only) | `scripts/indexnow.mjs` |

Edit copy **once** in `src/constants` — the React UI, the structured data, the
no-JS HTML snapshot and `llms.txt` are all generated from it.

## SEO architecture

- `<head>` (title, description, canonical, Open Graph, Twitter, JSON-LD `@graph` with
  `Person`, `WebSite`, `ProfilePage`, project `ItemList`) is injected at build time.
- A semantic HTML snapshot of the whole page is rendered inside `#root` for crawlers
  that do not run JavaScript (it is visually hidden; React replaces it on mount, and it
  is shown as plain content when JS is disabled).
- `sitemap.xml` (with image entries), `robots.txt` and `llms.txt` are emitted into `dist/`.
- To move domains, change `SITE.url` in `src/constants/site.js` and rebuild.

## Search Console checklist (one-time, manual)

1. Add `https://junaid.is-a.dev/` as a property in Google Search Console and Bing Webmaster
   Tools; put the new meta tokens in `SITE.verification` (`src/constants/site.js`).
2. Submit `https://junaid.is-a.dev/sitemap.xml`, then request indexing for the home page.
3. Link to the portfolio from your LinkedIn, GitHub profile/README, Instagram and résumé.

## Résumé PDF

Export your résumé to `public/Junaid_Afzal_Resume.pdf` and set `resume: '/Junaid_Afzal_Resume.pdf'` in
`src/constants/site.js` — the hero, stack, contact, sitemap-adjacent `llms.txt` links appear automatically.

## Assets

Original, un-optimised images and the original 18 MB `Planet.glb` are kept locally in
`assets-src/` (git-ignored). Shipped versions are WebP images and a meshopt/WebP-compressed
model (`public/models/Planet.glb`, ~1.6 MB).
