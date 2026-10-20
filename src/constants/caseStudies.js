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
        headline: 'A blockchain-backed farmer-to-consumer marketplace with AI modules',
        title: 'Farm2Fork: Hyperledger Fabric Marketplace (FYP)',
        description:
            'Final-year project: a farmer-to-consumer marketplace with a Hyperledger Fabric ledger, AI crop-quality detection and price prediction, plus go-to-market research.',
        kind: 'Final Year Project',
        status: 'In progress · expected Feb 2027',
        company: 'University of Central Punjab',
        role: 'Software engineering student · final year project',
        period: 'Apr 2026 – Feb 2027',
        stack: ['Hyperledger Fabric', 'Blockchain', 'AI / ML', 'Marketplace'],
        keywords: ['Hyperledger Fabric', 'agri marketplace', 'crop quality detection', 'price prediction', 'final year project'],
        links: [{ label: 'View on GitHub', href: 'https://github.com/Farm2Fork-Project' }],
        sections: [
            {
                heading: 'Overview',
                paragraphs: [
                    'Farm2Fork connects farmers directly with consumers. It combines a Hyperledger Fabric transaction ledger with AI-powered crop quality detection and price prediction modules.',
                ],
            },
            {
                heading: 'What it includes',
                bullets: [
                    'A Hyperledger Fabric blockchain ledger that records marketplace transactions.',
                    'AI-powered crop quality detection.',
                    'A price prediction module to support fairer pricing.',
                ],
            },
            {
                heading: 'Beyond the code',
                paragraphs: [
                    'The project also covers the business side: market research, competitor analysis and SWOT analysis to design a go-to-market strategy, with proposed pricing, positioning and promotional plans aimed at market penetration and customer acquisition.',
                ],
            },
        ],
    },
    {
        slug: 'banking-system',
        name: 'Banking System',
        headline: 'One NestJS API powering a React dashboard and a React Native app',
        title: 'Banking System Case Study: NestJS, Redis, React Native',
        description:
            'Solo-architected banking platform: a NestJS API with Redis caching, JWT auth and WebSocket notifications shared by a React dashboard and a React Native app.',
        kind: 'Semester project · solo architecture',
        status: 'Open source',
        company: 'University of Central Punjab',
        role: 'Sole architect and developer',
        period: 'Semester project',
        stack: ['NestJS', 'Redis', 'JWT', 'WebSockets', 'React', 'React Native', 'Swagger'],
        keywords: ['NestJS banking API', 'Redis caching', 'JWT authentication', 'WebSocket notifications', 'Swagger'],
        links: [
            { label: 'View on GitHub', href: 'https://github.com/junii03/Advance-Web-Programming/tree/main/Project' },
        ],
        sections: [
            {
                heading: 'Overview',
                paragraphs: [
                    'I independently designed and built a full-stack banking platform. A single NestJS backend serves both a React web dashboard and a React Native mobile app, so both clients share one API.',
                ],
            },
            {
                heading: 'What I built',
                bullets: [
                    'A NestJS backend with Redis caching and JWT authentication.',
                    'WebSocket notifications for real-time transaction updates.',
                    'Account management, fund transfers and real-time transaction processing.',
                    'A React web dashboard and a React Native mobile app on the same API.',
                    'Documentation and testing of every REST API through Swagger.',
                ],
            },
        ],
    },
];

export const getCaseStudy = (slug) => caseStudies.find((c) => c.slug === slug);
