// Single source of truth for site-wide identity + SEO metadata.
// Consumed by the React app AND by vite-plugins/seo.js (meta tags, JSON-LD,
// prerendered HTML snapshot, sitemap, robots.txt, llms.txt). Keep this file
// free of JSX / aliased imports so Node can import it directly.

export const SITE = {
    // Production origin — change here (and nowhere else) if the domain moves.
    url: 'https://junaid.is-a.dev',
    name: 'Junaid Afzal',
    fullName: 'Muhammad Junaid Afzal',
    alternateNames: ['Muhammad Junaid Afzal', 'Junaid Afzal Software Engineer', 'junii03'],
    jobTitle: 'Software Engineer',
    tagline: 'Flutter, React Native & NestJS Software Engineer',
    title: 'Junaid Afzal – Flutter, React Native & NestJS Engineer',
    description:
        'Junaid Afzal is a Lahore-based software engineer building Flutter & React Native apps and NestJS microservices. Explore projects, experience and résumé.',
    shortDescription:
        'Mobile & full-stack software engineer — Flutter, React Native, NestJS, AI and real-time apps.',
    keywords: [
        'Junaid Afzal',
        'Muhammad Junaid Afzal',
        'Software Engineer Lahore',
        'Flutter Developer Pakistan',
        'React Native Developer',
        'NestJS Developer',
        'Mobile App Developer',
        'Full-Stack Developer',
        'Solana dApp',
        'Portfolio',
    ],
    locale: 'en_US',
    language: 'en',
    email: 'junaidafzal.dev@gmail.com',
    phone: '+92 303 8455524',
    phoneE164: '+923038455524',
    location: { city: 'Lahore', region: 'Punjab', country: 'Pakistan', countryCode: 'PK' },
    themeColor: '#e5e5e0',
    themeColorDark: '#000000',
    // Files in /public
    portrait: '/images/junaid-afzal.jpeg',
    ogImage: '/og-image.png',
    ogImageAlt: 'Junaid Afzal — Flutter, React Native and NestJS software engineer based in Lahore, Pakistan',
    // Set to '/Junaid_Afzal_Resume.pdf' after exporting the updated résumé to public/ — links appear automatically.
    resume: null,
    // Search-engine / indexing verification (tokens are per-property; add the
    // token for https://junaid.is-a.dev from Search Console / Bing Webmaster).
    verification: {
        google: ['pYbdSRSWB5AbhMbtrSmi5sqK0axI2Et2LhY_Ywn5wjo'],
        bing: [],
    },
    indexNowKey: '38c211ebbf9d4ca085cfbb014b0b415f',
};

export const socials = [
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/junaiddev/' },
    { name: 'GitHub', href: 'https://github.com/junii03' },
    { name: 'Instagram', href: 'https://www.instagram.com/junii.03/' },
];

// Extra profiles used only for structured data (`sameAs`) and rel="me".
export const sameAs = [
    ...socials.map((s) => s.href),
    'https://www.facebook.com/M.Junii.A/',
];
