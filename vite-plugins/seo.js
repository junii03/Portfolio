// Build-time SEO plugin.
//
// The portfolio is a client-rendered React SPA, so crawlers that don't run
// JavaScript (Bing/Yandex partial rendering, social unfurlers, AI/LLM bots)
// would otherwise see an empty <div id="root">. This plugin makes the real
// content available in the raw HTML and generates every SEO artifact from the
// same data the UI renders (src/constants):
//
//   - <title>, meta description, canonical, Open Graph, Twitter, verification
//   - JSON-LD @graph: Person, WebSite, ProfilePage, project ItemList, services
//   - a semantic, visually-hidden HTML snapshot inside #root (React replaces it
//     on mount; it is the visible fallback when JS is disabled)
//   - sitemap.xml (with image entries), robots.txt and llms.txt
//
// index.html contains the markers <!--seo:head--> and <!--seo:body-->.

import {
    SITE,
    socials,
    sameAs,
    hero,
    servicesIntro,
    servicesData,
    about,
    experienceIntro,
    experience,
    worksIntro,
    projects,
    stackIntro,
    skills,
    education,
    certifications,
    contactIntro,
} from '../src/constants/index.js';
import { caseStudies } from '../src/constants/caseStudies.js';

const abs = (p) => (/^https?:\/\//.test(p) ? p : `${SITE.url}${p.startsWith('/') ? '' : '/'}${p}`);
const esc = (s = '') =>
    String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const oneLine = (s = '') => String(s).replace(/\s*\n\s*/g, ' ').trim();
const jsonLd = (obj) =>
    `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`;

const PERSON_ID = `${SITE.url}/#person`;
const WEBSITE_ID = `${SITE.url}/#website`;
const PAGE_ID = `${SITE.url}/#webpage`;

function buildGraph(modified) {
    const portrait = {
        '@type': 'ImageObject',
        '@id': `${SITE.url}/#portrait`,
        url: abs(SITE.portrait),
        contentUrl: abs(SITE.portrait),
        width: 460,
        height: 460,
        caption: about.portraitAlt,
    };
    const ogImage = {
        '@type': 'ImageObject',
        '@id': `${SITE.url}/#primaryimage`,
        url: abs(SITE.ogImage),
        contentUrl: abs(SITE.ogImage),
        width: 1200,
        height: 630,
        caption: SITE.ogImageAlt,
    };

    const person = {
        '@type': 'Person',
        '@id': PERSON_ID,
        name: SITE.name,
        givenName: 'Muhammad Junaid',
        familyName: 'Afzal',
        alternateName: SITE.alternateNames,
        url: `${SITE.url}/`,
        mainEntityOfPage: { '@id': PAGE_ID },
        image: { '@id': `${SITE.url}/#portrait` },
        jobTitle: SITE.jobTitle,
        description: oneLine(about.paragraphs[0]),
        email: `mailto:${SITE.email}`,
        telephone: SITE.phoneE164,
        address: {
            '@type': 'PostalAddress',
            addressLocality: SITE.location.city,
            addressRegion: SITE.location.region,
            addressCountry: SITE.location.countryCode,
        },
        nationality: { '@type': 'Country', name: SITE.location.country },
        worksFor: [
            { '@type': 'Organization', name: 'Astute Technologies (Pvt.) Ltd.' },
            { '@type': 'CollegeOrUniversity', name: education.school, url: 'https://ucp.edu.pk/' },
        ],
        alumniOf: {
            '@type': 'CollegeOrUniversity',
            name: education.school,
            url: 'https://ucp.edu.pk/',
            address: { '@type': 'PostalAddress', addressLocality: education.city, addressCountry: 'PK' },
        },
        hasOccupation: {
            '@type': 'Occupation',
            name: 'Software Engineer',
            occupationLocation: { '@type': 'Country', name: SITE.location.country },
            skills: 'Flutter, React Native, NestJS, Node.js, TypeScript, Firebase, MongoDB, Redis, Solana, LiveKit',
        },
        knowsAbout: [...new Set(skills.flatMap((g) => g.items))].concat([
            'Mobile app development',
            'Backend architecture',
            'Microservices',
            'Real-time systems',
            'Retrieval-augmented generation',
        ]),
        knowsLanguage: ['en', 'ur'],
        sameAs,
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Software engineering services',
            itemListElement: servicesData.map((s) => ({
                '@type': 'Offer',
                itemOffered: { '@type': 'Service', name: s.title, description: s.description },
            })),
        },
    };

    const website = {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: `${SITE.url}/`,
        name: `${SITE.name} — Portfolio`,
        alternateName: `${SITE.fullName} Portfolio`,
        description: SITE.description,
        inLanguage: SITE.language,
        publisher: { '@id': PERSON_ID },
        copyrightHolder: { '@id': PERSON_ID },
    };

    const page = {
        '@type': ['ProfilePage', 'WebPage'],
        '@id': PAGE_ID,
        url: `${SITE.url}/`,
        name: SITE.title,
        description: SITE.description,
        inLanguage: SITE.language,
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': PERSON_ID },
        mainEntity: { '@id': PERSON_ID },
        primaryImageOfPage: { '@id': `${SITE.url}/#primaryimage` },
        image: { '@id': `${SITE.url}/#primaryimage` },
        dateModified: modified,
        breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE.url}/` }],
        },
    };

    const works = {
        '@type': 'ItemList',
        '@id': `${SITE.url}/#projects`,
        name: `Projects by ${SITE.name}`,
        itemListElement: projects.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
                '@type': 'CreativeWork',
                name: p.name,
                description: p.description,
                creator: { '@id': PERSON_ID },
                keywords: p.frameworks.join(', '),
                ...(p.href ? { url: p.href } : {}),
                ...(p.image ? { image: abs(p.image) } : {}),
            },
        })),
    };

    return { '@context': 'https://schema.org', '@graph': [person, portrait, ogImage, website, page, works] };
}

function buildHead({ title, description, path = '/', graph, ogType = 'profile', keywords = SITE.keywords }) {
    const url = `${SITE.url}${path}`;
    const home = path === '/';
    const metas = [
        `<title>${esc(title)}</title>`,
        `<meta name="description" content="${esc(description)}" />`,
        `<meta name="keywords" content="${esc(keywords.join(', '))}" />`,
        `<meta name="author" content="${esc(SITE.fullName)}" />`,
        `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`,
        `<meta name="theme-color" content="${SITE.themeColor}" media="(prefers-color-scheme: light)" />`,
        `<meta name="theme-color" content="${SITE.themeColorDark}" media="(prefers-color-scheme: dark)" />`,
        ...SITE.verification.google.map((t) => `<meta name="google-site-verification" content="${esc(t)}" />`),
        ...SITE.verification.bing.map((t) => `<meta name="msvalidate.01" content="${esc(t)}" />`),
        `<meta name="geo.region" content="PK-PB" />`,
        `<meta name="geo.placename" content="${esc(SITE.location.city)}" />`,
        `<link rel="canonical" href="${url}" />`,
        `<link rel="alternate" hreflang="${SITE.language}" href="${url}" />`,
        `<link rel="alternate" hreflang="x-default" href="${url}" />`,
        `<link rel="sitemap" type="application/xml" href="/sitemap.xml" />`,
        `<link rel="alternate" type="text/plain" href="/llms.txt" title="LLM-readable summary" />`,
        ...(home ? sameAs.map((h) => `<link rel="me" href="${esc(h)}" />`) : []),
        // Open Graph
        `<meta property="og:type" content="${ogType}" />`,
        `<meta property="og:site_name" content="${esc(SITE.name)} — Portfolio" />`,
        `<meta property="og:title" content="${esc(title)}" />`,
        `<meta property="og:description" content="${esc(description)}" />`,
        `<meta property="og:url" content="${url}" />`,
        `<meta property="og:locale" content="${SITE.locale}" />`,
        `<meta property="og:image" content="${abs(SITE.ogImage)}" />`,
        `<meta property="og:image:secure_url" content="${abs(SITE.ogImage)}" />`,
        `<meta property="og:image:type" content="image/png" />`,
        `<meta property="og:image:width" content="1200" />`,
        `<meta property="og:image:height" content="630" />`,
        `<meta property="og:image:alt" content="${esc(SITE.ogImageAlt)}" />`,
        ...(ogType === 'profile'
            ? [
                `<meta property="profile:first_name" content="Muhammad Junaid" />`,
                `<meta property="profile:last_name" content="Afzal" />`,
                `<meta property="profile:username" content="junii03" />`,
            ]
            : []),
        // Twitter / X
        `<meta name="twitter:card" content="summary_large_image" />`,
        `<meta name="twitter:title" content="${esc(title)}" />`,
        `<meta name="twitter:description" content="${esc(description)}" />`,
        `<meta name="twitter:image" content="${abs(SITE.ogImage)}" />`,
        `<meta name="twitter:image:alt" content="${esc(SITE.ogImageAlt)}" />`,
        jsonLd(graph),
    ];
    return metas.map((m) => `    ${m}`).join('\n');
}

function buildSnapshot() {
    const li = (arr) => `<ul>${arr.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>`;
    const nav = [
        ['services', 'Services'],
        ['about', 'About'],
        ['experience', 'Experience'],
        ['work', 'Works'],
        ['stack', 'Stack'],
        ['contact', 'Contact'],
    ];
    return `<div class="seo-snapshot">
<header id="home">
<h1>${esc(hero.title)} — ${esc(SITE.jobTitle)} (Flutter, React Native &amp; NestJS)</h1>
<p>${esc(oneLine(hero.text))}</p>
<p>${esc(hero.subtitle)}</p>
<nav aria-label="Primary">${nav.map(([id, label]) => `<a href="#${id}">${label}</a>`).join(' ')}</nav>
</header>
<main>
<section id="services"><h2>${esc(servicesIntro.title)}</h2><p>${esc(oneLine(servicesIntro.text))}</p>
${servicesData
    .map(
        (s) => `<article><h3>${esc(s.title)}</h3><p>${esc(s.description)}</p><ul>${s.items
            .map((i) => `<li>${esc(i.title)} ${esc(i.description)}</li>`)
            .join('')}</ul></article>`,
    )
    .join('\n')}
</section>
<section id="about"><h2>${esc(about.title)}</h2><p>${esc(oneLine(about.text))}</p>
<img src="${SITE.portrait}" alt="${esc(about.portraitAlt)}" width="460" height="460" loading="lazy" decoding="async" />
${about.paragraphs.map((p) => `<p>${esc(p)}</p>`).join('\n')}
<ul>${about.stats.map((s) => `<li>${s.value}${s.suffix || ''} — ${esc(s.label)}</li>`).join('')}</ul>
</section>
<section id="experience"><h2>${esc(experienceIntro.title)}</h2>
${experience
    .map(
        (e) =>
            `<article><h3>${esc(e.role)} — ${esc(e.company)}</h3><p>${esc(e.period)}</p>${li(e.points)}<p>${esc(e.stack.join(', '))}</p></article>`,
    )
    .join('\n')}
</section>
<section id="work"><h2>${esc(worksIntro.title)}</h2><p>${esc(oneLine(worksIntro.text))}</p>
${projects
    .map(
        (p) =>
            `<article><h3>${p.caseStudy ? `<a href="/projects/${p.caseStudy}/">${esc(p.name)}</a>` : p.href ? `<a href="${esc(p.href)}" rel="noopener noreferrer">${esc(p.name)}</a>` : esc(p.name)}</h3><p>${esc(p.kind)}</p><p>${esc(p.description)}</p><p>${esc(p.frameworks.join(', '))}</p></article>`,
    )
    .join('\n')}
</section>
<section id="stack"><h2>${esc(stackIntro.title)}</h2>
${skills.map((g) => `<h3>${esc(g.group)}</h3><p>${esc(g.items.join(', '))}</p>`).join('\n')}
<h3>Education</h3><p>${esc(education.degree)}, ${esc(education.school)}, ${esc(education.city)} (${esc(education.period)}) — CGPA ${esc(education.cgpa)}</p>
<p>${esc(education.highlights.join('; '))}</p>
<p>${esc(education.earlier.degree)}, ${esc(education.earlier.school)}, ${esc(education.earlier.city)} (${esc(education.earlier.period)}) — ${esc(education.earlier.result)}</p>
<h3>Certifications &amp; activities</h3>${li(certifications)}
</section>
<section id="contact"><h2>${esc(contactIntro.title)}</h2><p>${esc(oneLine(contactIntro.text))}</p>
<p><a href="mailto:${SITE.email}">${SITE.email}</a> · <a href="tel:${SITE.phoneE164}">${esc(SITE.phone)}</a> · ${esc(SITE.location.city)}, ${esc(SITE.location.country)}</p>
${SITE.resume ? `<p><a href="${SITE.resume}">Download résumé (PDF)</a></p>` : ''}
<p>${socials.map((s) => `<a href="${esc(s.href)}" rel="me noopener noreferrer">${esc(s.name)}</a>`).join(' · ')}</p>
</section>
</main>
</div>`;
}

const caseUrl = (slug) => `${SITE.url}/projects/${slug}/`;

function buildCaseStudyGraph(cs, modified) {
    const url = caseUrl(cs.slug);
    return {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebPage',
                '@id': `${url}#webpage`,
                url,
                name: cs.title,
                description: cs.description,
                inLanguage: SITE.language,
                isPartOf: { '@id': WEBSITE_ID },
                primaryImageOfPage: { '@id': `${SITE.url}/#primaryimage` },
                dateModified: modified,
                mainEntity: { '@id': `${url}#project` },
                breadcrumb: { '@id': `${url}#breadcrumb` },
            },
            {
                '@type': 'CreativeWork',
                '@id': `${url}#project`,
                name: cs.name,
                headline: cs.headline,
                description: cs.description,
                keywords: [...cs.stack, ...cs.keywords].join(', '),
                creator: { '@id': PERSON_ID },
                author: { '@id': PERSON_ID },
                inLanguage: SITE.language,
                mainEntityOfPage: { '@id': `${url}#webpage` },
                ...(cs.links[0] ? { sameAs: cs.links.map((l) => l.href) } : {}),
            },
            {
                '@type': 'Person',
                '@id': PERSON_ID,
                name: SITE.name,
                url: `${SITE.url}/`,
            },
            {
                '@type': 'BreadcrumbList',
                '@id': `${url}#breadcrumb`,
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE.url}/` },
                    { '@type': 'ListItem', position: 2, name: 'Works', item: `${SITE.url}/#work` },
                    { '@type': 'ListItem', position: 3, name: cs.name, item: url },
                ],
            },
        ],
    };
}

// Static, zero-JS case-study page. Styled with the same compiled Tailwind CSS as the SPA.
function buildCaseStudyPage(cs, { cssTags, modified }) {
    const others = caseStudies.filter((c) => c.slug !== cs.slug);
    const head = buildHead({
        title: cs.title,
        description: cs.description,
        path: `/projects/${cs.slug}/`,
        graph: buildCaseStudyGraph(cs, modified),
        ogType: 'article',
        keywords: [cs.name, ...cs.keywords, SITE.name],
    });
    const meta = [
        ['Role', cs.role],
        ['Company', cs.company],
        ['Period', cs.period],
        ['Status', cs.status],
    ];
    return `<!doctype html>
<html lang="${SITE.language}">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
${head}
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/manifest.webmanifest" />
    <link rel="preload" href="/fonts/amiamie/woff2/Amiamie-Light.woff2" as="font" type="font/woff2" crossorigin />
${cssTags}
</head>
<body>
<a href="#main" class="skip-link">Skip to content</a>
<header class="flex items-center justify-between px-6 py-6 text-sm uppercase tracking-[0.25em] md:px-10">
    <a href="/" class="transition-colors hover:text-gold-deep">&larr; ${esc(SITE.name)}</a>
    <a href="/#work" class="transition-colors hover:text-gold-deep">All work</a>
</header>
<main id="main">
    <section class="rounded-4xl bg-black px-6 pb-16 pt-12 text-white md:px-10 md:pb-24 md:pt-20">
        <p class="text-xs font-light uppercase tracking-[0.4em] text-white/60 md:text-sm">${esc(cs.kind)}</p>
        <h1 class="mt-8 max-w-5xl text-5xl font-light uppercase leading-[1.02] md:text-7xl lg:text-8xl">${esc(cs.name)}</h1>
        <p class="mt-8 max-w-3xl text-xl font-light leading-relaxed text-white/75 md:text-3xl">${esc(cs.headline)}</p>
        <dl class="mt-14 grid gap-x-10 gap-y-8 border-t border-white/25 pt-8 sm:grid-cols-2 lg:grid-cols-4">
${meta
    .map(
        ([k, v]) =>
            `            <div><dt class="text-xs font-light uppercase tracking-[0.25em] text-white/55">${k}</dt><dd class="mt-2 text-base font-light md:text-lg">${esc(v)}</dd></div>`,
    )
    .join('\n')}
        </dl>
    </section>
    <article class="mx-auto max-w-5xl px-6 py-16 font-light md:px-10 md:py-24">
${cs.sections
    .map(
        (sec) => `        <section class="grid gap-4 border-t border-black/80 py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] md:gap-12 md:py-14">
            <h2 class="text-3xl uppercase md:text-4xl">${esc(sec.heading)}</h2>
            <div class="flex flex-col gap-5 text-lg leading-relaxed text-black/80 md:text-xl">
${(sec.paragraphs || []).map((t) => `                <p>${esc(t)}</p>`).join('\n')}
${
    sec.bullets
        ? `                <ul class="flex flex-col gap-4">${sec.bullets
              .map(
                  (b) =>
                      `<li class="flex gap-4"><span aria-hidden="true" class="mt-[0.8em] h-px w-6 shrink-0 bg-gold-deep"></span><span>${esc(b)}</span></li>`,
              )
              .join('')}</ul>`
        : ''
}
            </div>
        </section>`,
    )
    .join('\n')}
        <section class="grid gap-4 border-t border-black/80 py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] md:gap-12 md:py-14">
            <h2 class="text-3xl uppercase md:text-4xl">Stack</h2>
            <ul class="flex flex-wrap gap-2" aria-label="Technologies">${cs.stack
                .map((t) => `<li class="rounded-full border border-black/40 px-4 py-1.5 text-sm tracking-wide md:text-base">${esc(t)}</li>`)
                .join('')}</ul>
        </section>
${
    cs.links.length
        ? `        <p class="flex flex-wrap gap-4 border-t border-black/80 pt-10">${cs.links
              .map(
                  (l) =>
                      `<a href="${esc(l.href)}" target="_blank" rel="noopener noreferrer" class="rounded-full bg-black px-6 py-3 text-xs uppercase tracking-[0.25em] text-white transition-colors hover:bg-DarkLava md:text-sm">${esc(l.label)} &nearr;</a>`,
              )
              .join('')}</p>`
        : ''
}
    </article>
    <nav aria-label="More case studies" class="rounded-t-4xl bg-black px-6 py-16 text-white md:px-10">
        <h2 class="text-sm font-light uppercase tracking-[0.3em] text-white/60">More work</h2>
        <ul class="mt-8 divide-y divide-white/20 border-y border-white/20">
${others
    .map(
        (o) =>
            `            <li><a href="/projects/${o.slug}/" class="flex items-center justify-between gap-6 py-6 text-2xl font-light transition-colors hover:text-gold md:text-4xl"><span>${esc(o.name)}</span><span class="hidden text-sm uppercase tracking-[0.2em] text-white/55 md:block">${esc(o.kind)}</span></a></li>`,
    )
    .join('\n')}
        </ul>
        <p class="mt-14 text-sm font-light uppercase tracking-[0.2em] text-white/60">
            <a class="transition-colors hover:text-gold" href="mailto:${SITE.email}">${SITE.email}</a>
            &nbsp;·&nbsp; ${socials.map((s) => `<a class="transition-colors hover:text-gold" href="${esc(s.href)}" target="_blank" rel="me noopener noreferrer">${esc(s.name)}</a>`).join(' &nbsp;·&nbsp; ')}
        </p>
    </nav>
</main>
</body>
</html>
`;
}

function buildSitemap(modified) {
    const images = [SITE.ogImage, SITE.portrait, ...projects.filter((p) => p.image).map((p) => p.image)];
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${SITE.url}/</loc>
    <lastmod>${modified}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
${images.map((i) => `    <image:image><image:loc>${abs(i)}</image:loc></image:image>`).join('\n')}
  </url>
${caseStudies
    .map(
        (c) => `  <url>
    <loc>${caseUrl(c.slug)}</loc>
    <lastmod>${modified}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`,
    )
    .join('\n')}
</urlset>
`;
}

const buildRobots = () => `User-agent: *
Allow: /

Sitemap: ${SITE.url}/sitemap.xml
`;

function buildLlms() {
    return `# ${SITE.name} (${SITE.fullName})

> ${SITE.name} is a ${SITE.location.city}, ${SITE.location.country}-based software engineer building cross-platform mobile apps (Flutter, React Native) and scalable backends (NestJS microservices), with experience in AI integrations (GPT-4o, Whisper, RAG), real-time systems (LiveKit, WebSockets) and Solana dApps.

## Summary
${about.paragraphs.map((p) => p).join('\n\n')}

## Current roles
${experience
    .filter((e) => e.current)
    .map((e) => `- ${e.role}, ${e.company} (${e.period})`)
    .join('\n')}

## Selected projects
${projects.map((p) => `- ${p.name}: ${p.description}${p.href ? ` (${p.href})` : ''}`).join('\n')}

## Case studies
${caseStudies.map((c) => `- [${c.name}](${caseUrl(c.slug)}): ${c.description}`).join('\n')}

## Skills
${skills.map((g) => `- ${g.group}: ${g.items.join(', ')}`).join('\n')}

## Education
- ${education.degree}, ${education.school} (${education.period}), CGPA ${education.cgpa}

## Links
- [Portfolio](${SITE.url}/)
${SITE.resume ? `- [Résumé (PDF)](${abs(SITE.resume)})\n` : ''}${socials.map((s) => `- [${s.name}](${s.href})`).join('\n')}
- Email: ${SITE.email}
`;
}

export default function seoPlugin() {
    const modified = new Date().toISOString();
    const homeHead = () =>
        buildHead({ title: SITE.title, description: SITE.description, path: '/', graph: buildGraph(modified) });
    return {
        name: 'portfolio-seo',
        transformIndexHtml: {
            order: 'pre',
            handler(html) {
                return html.replace('<!--seo:head-->', homeHead()).replace('<!--seo:body-->', buildSnapshot());
            },
        },
        // Dev server: serve the case-study pages so links work locally too.
        configureServer(server) {
            server.middlewares.use(async (req, res, next) => {
                const m = req.url?.split('?')[0].match(/^\/projects\/([\w-]+)\/?$/);
                const cs = m && caseStudies.find((c) => c.slug === m[1]);
                if (!cs) return next();
                const html = buildCaseStudyPage(cs, {
                    cssTags: '    <script type="module">import "/src/index.css";</script>',
                    modified,
                });
                res.setHeader('Content-Type', 'text/html');
                res.end(await server.transformIndexHtml(req.url, html));
            });
        },
        generateBundle(_, bundle) {
            const entry = Object.values(bundle).find((c) => c.type === 'chunk' && c.isEntry);
            const css = [...(entry?.viteMetadata?.importedCss ?? [])];
            const cssTags = css.map((f) => `    <link rel="stylesheet" href="/${f}" />`).join('\n');
            for (const cs of caseStudies) {
                this.emitFile({
                    type: 'asset',
                    fileName: `projects/${cs.slug}/index.html`,
                    source: buildCaseStudyPage(cs, { cssTags, modified }),
                });
            }
            this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: buildSitemap(modified) });
            this.emitFile({ type: 'asset', fileName: 'robots.txt', source: buildRobots() });
            this.emitFile({ type: 'asset', fileName: 'llms.txt', source: buildLlms() });
        },
    };
}
