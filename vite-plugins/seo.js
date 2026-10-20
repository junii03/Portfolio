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

function buildHead(modified) {
    const url = `${SITE.url}/`;
    const metas = [
        `<title>${esc(SITE.title)}</title>`,
        `<meta name="description" content="${esc(SITE.description)}" />`,
        `<meta name="keywords" content="${esc(SITE.keywords.join(', '))}" />`,
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
        ...sameAs.map((h) => `<link rel="me" href="${esc(h)}" />`),
        // Open Graph
        `<meta property="og:type" content="profile" />`,
        `<meta property="og:site_name" content="${esc(SITE.name)} — Portfolio" />`,
        `<meta property="og:title" content="${esc(SITE.title)}" />`,
        `<meta property="og:description" content="${esc(SITE.description)}" />`,
        `<meta property="og:url" content="${url}" />`,
        `<meta property="og:locale" content="${SITE.locale}" />`,
        `<meta property="og:image" content="${abs(SITE.ogImage)}" />`,
        `<meta property="og:image:secure_url" content="${abs(SITE.ogImage)}" />`,
        `<meta property="og:image:type" content="image/png" />`,
        `<meta property="og:image:width" content="1200" />`,
        `<meta property="og:image:height" content="630" />`,
        `<meta property="og:image:alt" content="${esc(SITE.ogImageAlt)}" />`,
        `<meta property="profile:first_name" content="Muhammad Junaid" />`,
        `<meta property="profile:last_name" content="Afzal" />`,
        `<meta property="profile:username" content="junii03" />`,
        // Twitter / X
        `<meta name="twitter:card" content="summary_large_image" />`,
        `<meta name="twitter:title" content="${esc(SITE.title)}" />`,
        `<meta name="twitter:description" content="${esc(SITE.description)}" />`,
        `<meta name="twitter:image" content="${abs(SITE.ogImage)}" />`,
        `<meta name="twitter:image:alt" content="${esc(SITE.ogImageAlt)}" />`,
        jsonLd(buildGraph(modified)),
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
            `<article><h3>${p.href ? `<a href="${esc(p.href)}" rel="noopener noreferrer">${esc(p.name)}</a>` : esc(p.name)}</h3><p>${esc(p.kind)}</p><p>${esc(p.description)}</p><p>${esc(p.frameworks.join(', '))}</p></article>`,
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
    return {
        name: 'portfolio-seo',
        transformIndexHtml: {
            order: 'pre',
            handler(html) {
                return html
                    .replace('<!--seo:head-->', buildHead(modified))
                    .replace('<!--seo:body-->', buildSnapshot());
            },
        },
        generateBundle() {
            this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: buildSitemap(modified) });
            this.emitFile({ type: 'asset', fileName: 'robots.txt', source: buildRobots() });
            this.emitFile({ type: 'asset', fileName: 'llms.txt', source: buildLlms() });
        },
    };
}
