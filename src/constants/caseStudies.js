// Case-study pages (/projects/<slug>/). Rendered as static, zero-JS HTML by
// vite-plugins/seo.js. Every fact below comes from the résumé — add real
// challenges, decisions and results here to make each page richer.

export const caseStudies = [
    {
        slug: 'oner-education',
        name: 'Oner Education',
        headline: 'Modernizing a global student-placement app — and adding AI to it',
        title: 'Oner Education Case Study: Flutter Modernization + AI',
        description:
            'How I modernized the Oner Education Flutter app (60+ countries) and built an AI interview grader with Whisper + GPT-4o and a RAG recommendation chatbot.',
        kind: 'Student placement platform',
        status: 'Live on Google Play',
        company: 'Astute Technologies',
        role: 'Flutter developer · sole developer of the AI features',
        period: 'Oct 2024 – Present',
        stack: ['Flutter', 'Dart', 'Firebase Cloud Functions', 'Firestore', 'OpenAI GPT-4o', 'Whisper STT', 'RAG'],
        keywords: ['Flutter modernization', 'Flutter upgrade', 'GPT-4o', 'Whisper', 'RAG chatbot', 'Firebase Cloud Functions'],
        links: [
            { label: 'View on Google Play', href: 'https://play.google.com/store/apps/details?id=com.oner.education' },
        ],
        sections: [
            {
                heading: 'Overview',
                paragraphs: [
                    'Oner Education is a global student-placement platform, live on the Play Store and used across 60+ countries. I inherited its Flutter codebase after it had fallen severely behind current Flutter and Dart releases.',
                ],
            },
            {
                heading: 'The challenge',
                paragraphs: [
                    'An outdated framework version put Play Store compliance and long-term maintainability at risk, and it blocked building new features on a modern foundation.',
                ],
            },
            {
                heading: 'What I built',
                bullets: [
                    'Full Flutter modernization — upgraded the app from a severely outdated version to the latest Flutter/Dart, resolved every breaking deprecation across the entire app, and restored full platform compatibility.',
                    'AI interview assessment for job, scholarship and IELTS interviews: the app records the user’s audio, transcribes it with Whisper STT, grades the answers with GPT-4o (scores, summaries and improvement suggestions) and generates a structured report. The pipeline runs on Firebase Cloud Functions and Flutter, and I was the sole developer.',
                    'A RAG-based institution-recommendation chatbot: Firestore-grounded retrieval through Cloud Functions that matches each user to programs based on their academic profile.',
                ],
            },
            {
                heading: 'Outcome',
                paragraphs: [
                    'The platform is back on a current, Play Store-compliant Flutter foundation that is easier to maintain, and students now get AI interview practice and personalised program suggestions inside the app.',
                ],
            },
        ],
    },
    {
        slug: 'leklok-backend',
        name: 'Leklok Backend v2',
        headline: 'Rebuilding an audio-first social platform’s backend as NestJS microservices',
        title: 'Leklok Backend v2 Case Study: NestJS Microservices',
        description:
            'Case study: owning the Leklok v2 backend — 3 NestJS microservices, 15+ REST endpoints, a weight-based recommendation algorithm and an ads pipeline on MongoDB.',
        kind: 'Audio-first social platform · backend',
        status: 'Production',
        company: 'Astute Technologies',
        role: 'Backend lead · owned v2 end-to-end',
        period: 'Oct 2024 – Present',
        stack: ['NestJS', 'Node.js', 'MongoDB', 'REST APIs', 'Microservices', 'GitHub Actions'],
        keywords: ['NestJS microservices', 'recommendation algorithm', 'ads pipeline', 'MongoDB', 'REST API design'],
        links: [],
        sections: [
            {
                heading: 'Overview',
                paragraphs: [
                    'Leklok is an audio-first social platform. I first maintained and stabilized its v1 backend — API lifecycle improvements, bug fixes and performance work across distributed services — and then took ownership of the v2 backend.',
                ],
            },
            {
                heading: 'Architecture',
                paragraphs: [
                    'v2 is split into three NestJS microservices: the main backend, a gift wallet system and a user-verification service. I designed and built 15+ REST endpoints from scratch across them, backed by MongoDB.',
                ],
            },
            {
                heading: 'What I built',
                bullets: [
                    'A weight-based post recommendation algorithm that ranks content for each user — core to the platform’s retention.',
                    'A complete ads pipeline covering targeting, delivery and impression tracking — core to monetization.',
                    'A guest-user flow that gives unauthenticated users access to the app, improving top-of-funnel acquisition.',
                    'GitHub Actions CI/CD for automated backend deployment and mobile builds.',
                ],
            },
            {
                heading: 'Team',
                paragraphs: [
                    'I led the mobile and backend workstreams of 5–8 member teams: running regular syncs with web developers, coordinating feature handoffs and mentoring junior developers.',
                ],
            },
        ],
    },
    {
        slug: 'farm2fork',
        name: 'Farm2Fork',
        headline: 'A farmer-to-buyer marketplace with blockchain provenance and AI crop grading',
        title: 'Farm2Fork: Marketplace with Hyperledger Fabric & AI',
        description:
            'Final-year project: a farm-to-buyer marketplace with a NestJS API, Next.js and Flutter apps, a Hyperledger Fabric ledger and an AI crop-grading service.',
        kind: 'Final Year Project',
        status: 'In progress · expected Feb 2027',
        company: 'University of Central Punjab',
        role: 'Lead developer across web, backend, mobile, blockchain and AI',
        period: 'Apr 2026 – Feb 2027',
        stack: [
            'NestJS',
            'MongoDB',
            'Redis',
            'Next.js',
            'TypeScript',
            'Flutter',
            'Firebase Auth',
            'Hyperledger Fabric',
            'Go chaincode',
            'FastAPI',
            'Docker',
        ],
        keywords: ['Hyperledger Fabric', 'agri marketplace', 'crop quality grading', 'NestJS', 'Flutter', 'final year project'],
        links: [{ label: 'View on GitHub', href: 'https://github.com/Farm2Fork-Project' }],
        sections: [
            {
                heading: 'Overview',
                paragraphs: [
                    'Farm2Fork connects farmers directly with buyers, with transporters handling delivery. It is organised as five repositories in a GitHub organisation — web, backend, mobile, blockchain and AI — and I am the lead developer across all of them.',
                ],
            },
            {
                heading: 'How it is built',
                bullets: [
                    'Backend — a NestJS API on MongoDB and Redis with Firebase authentication, Swagger documentation, Docker Compose to run the whole stack locally, and end-to-end tests covering the payment and shipment flows.',
                    'Web — a Next.js app with separate routes for buyers, farmers and transporters, Firebase sign-in (including Google) and credentialed, HTTP-only backend sessions protected by a CSRF header.',
                    'Mobile — a Flutter app with Google Maps for farm pins, the checkout drop-off pin and transporter maps; transporters share location only while online with the app open, and Firebase Cloud Messaging delivers push notifications.',
                    'Blockchain — a Hyperledger Fabric network with Go chaincode that records payments (Stripe, JazzCash, Safepay) and supply-chain events such as listed, assigned, picked up, in transit and delivered. Writes are validated and idempotent, and the ledger can be queried by ledger key, reference or product.',
                    'AI — a FastAPI inference service that suggests an A–D quality grade from a photo of wheat, rice, mango or maize (EfficientNet-B0) for the farmer to confirm, plus a rule-based price-range estimate in PKR per unit.',
                ],
            },
            {
                heading: 'Engineering notes',
                paragraphs: [
                    'The AI grade is a suggestion the farmer confirms, not a certified assessment, and the price estimate is rule-based until a trained model is available — the documentation says so explicitly, and so does this page. A benchmark script measures ledger write throughput at different concurrency levels.',
                ],
            },
            {
                heading: 'Beyond the code',
                paragraphs: [
                    'The project also includes market research, competitor analysis and SWOT analysis to design a go-to-market strategy, with proposed pricing, positioning and promotional plans aimed at market penetration and customer acquisition.',
                ],
            },
        ],
    },
    {
        slug: 'banking-system',
        name: 'HBL Banking System',
        headline: 'One Express API powering a React web app and an Expo mobile app',
        title: 'HBL Banking System: Express, MongoDB & React Native',
        description:
            'Solo-built banking platform: an Express + MongoDB API with Redis, JWT and Socket.IO, powering a React web app and an Expo React Native app.',
        kind: 'Semester project · full-stack web + mobile',
        status: 'Open source',
        company: 'University of Central Punjab',
        role: 'Sole developer — backend, web and mobile',
        period: 'Semester project (Advanced Web Programming)',
        stack: [
            'Node.js',
            'Express',
            'MongoDB',
            'Redis',
            'JWT',
            'Socket.IO',
            'Swagger / OpenAPI',
            'React',
            'Vite',
            'Tailwind CSS',
            'React Native',
            'Expo',
        ],
        keywords: ['banking API', 'Express MongoDB', 'Redis caching', 'JWT role-based access', 'Socket.IO notifications', 'Expo React Native'],
        links: [
            { label: 'View on GitHub', href: 'https://github.com/junii03/Advance-Web-Programming/tree/main/Project' },
        ],
        sections: [
            {
                heading: 'Overview',
                paragraphs: [
                    'I designed and built a full-stack banking platform on my own. A single Node.js/Express backend serves a React web app and an Expo React Native mobile app, so both clients share one API.',
                ],
            },
            {
                heading: 'What the platform does',
                bullets: [
                    'Accounts and transactions — multiple account types (savings, current, fixed deposit, Islamic savings, salary), fund transfers, deposits and withdrawals, with real-time notifications over Socket.IO.',
                    'Cards and loans — debit and credit card management, loan applications with EMI calculation and an approval workflow, and a branch and ATM locator.',
                    'Administration — an admin dashboard with system statistics, user and transaction oversight, and reporting.',
                ],
            },
            {
                heading: 'Security and quality',
                bullets: [
                    'JWT authentication with role-based access for customers, employees, managers and admins.',
                    'Rate limiting, account lockout after failed logins, transaction monitoring that flags suspicious activity, and audit logging.',
                    'Redis caching and an OpenAPI/Swagger specification documenting the REST API.',
                ],
            },
            {
                heading: 'Clients',
                paragraphs: [
                    'The web app is built with React, Vite and Tailwind CSS. The mobile app uses Expo with file-based routing, NativeWind for styling and Axios against the same backend.',
                ],
            },
        ],
    },
];

export const getCaseStudy = (slug) => caseStudies.find((c) => c.slug === slug);
