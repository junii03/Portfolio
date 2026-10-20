// Portfolio content. Shared by the React sections and by the build-time SEO
// plugin (static HTML snapshot, JSON-LD, llms.txt) — edit copy here once.
export { SITE, socials, sameAs } from './site.js';

export const hero = {
    subtitle: 'Mobile & Full-Stack · Lahore',
    title: 'Junaid Afzal',
    text: 'Software engineer shipping Flutter, React Native & NestJS\nfrom architecture to production —\nwith AI and real-time features built in',
};

export const servicesIntro = {
    subtitle: 'Behind Every Click, There’s Code',
    title: 'Services',
    text: 'From mobile apps to microservices,\nI build products that are fast, reliable\nand ready for real users.',
};

export const servicesData = [
    {
        title: 'Cross-Platform Mobile Apps',
        description:
            'I build production-grade Flutter and React Native apps for iOS and Android — clean architecture, smooth UI and store-ready releases.',
        items: [
            {
                title: 'Flutter & Dart',
                description: '(Riverpod, Provider, Clean Architecture)',
            },
            {
                title: 'React Native',
                description: '(TypeScript, Android & iOS, performance tuning)',
            },
            {
                title: 'Firebase & Integrations',
                description: '(Auth, Firestore, FCM, REST with token refresh, RevenueCat)',
            },
        ],
    },
    {
        title: 'Backend & Microservices',
        description:
            'Scalable NestJS backends: well-designed REST APIs, microservices and real-time features that mobile clients can rely on.',
        items: [
            {
                title: 'NestJS & Node.js',
                description: '(REST APIs, microservices, Swagger / OpenAPI)',
            },
            {
                title: 'Databases & Caching',
                description: '(MongoDB, Firestore, Redis)',
            },
            {
                title: 'Auth & Real-time',
                description: '(JWT, WebSockets, notifications)',
            },
        ],
    },
    {
        title: 'AI & Real-Time Features',
        description:
            'Practical AI inside real products: speech, LLM and retrieval pipelines, plus low-latency audio and video experiences.',
        items: [
            {
                title: 'LLM Pipelines',
                description: '(GPT-4o, Whisper STT, ElevenLabs TTS)',
            },
            {
                title: 'RAG & Chatbots',
                description: '(Firestore-grounded retrieval, Cloud Functions)',
            },
            {
                title: 'Real-time Media',
                description: '(LiveKit, WebSockets, FFmpeg)',
            },
        ],
    },
    {
        title: 'Web3, Web & DevOps',
        description:
            'Solana wallet integrations, React dashboards and CI/CD pipelines that carry features from commit to production.',
        items: [
            {
                title: 'Web3',
                description: '(Solana wallets, Hyperledger Fabric)',
            },
            {
                title: 'Web Dashboards',
                description: '(React, Tailwind CSS)',
            },
            {
                title: 'CI/CD',
                description: '(GitHub Actions, automated builds, Docker — learning)',
            },
        ],
    },
];

export const about = {
    subtitle: 'Crafted with purpose, Engineered to perform',
    title: 'About',
    text: 'Owning features end-to-end —\nfrom system design to deployment',
    paragraphs: [
        'I’m a software engineer with 1.5+ years of professional experience building cross-platform mobile apps and backend systems. I work across the stack — Flutter and React Native on the client; NestJS microservices, REST APIs and CI/CD on the server.',
        'I lead mobile and backend workstreams of 5–8 member teams, coordinate with web developers and mentor junior engineers. Alongside work I’m completing my BS in Software Engineering at the University of Central Punjab (CGPA 3.92), teaching Programming Fundamentals as a teaching assistant, and going deeper into DevOps and distributed systems.',
    ],
    portraitAlt: 'Portrait of Junaid Afzal, software engineer based in Lahore, Pakistan',
    stats: [
        { value: 1.5, decimals: 1, suffix: '+', label: 'Years professional experience' },
        { value: 6, suffix: '+', label: 'Production apps shipped' },
        { value: 60, suffix: '+', label: 'Countries served by Oner Education' },
        { value: 3.92, decimals: 2, label: 'CGPA · BS Software Engineering' },
    ],
};

export const experienceIntro = {
    subtitle: 'Shipping on mobile, backend and AI',
    title: 'Experience',
    text: 'Where I’ve built, led\nand shipped real products.',
};

export const experience = [
    {
        company: 'Astute Technologies',
        role: 'Software Engineer · Cross-Platform Mobile App Developer',
        period: 'Oct 2024 – Present',
        current: true,
        stack: ['Flutter', 'React Native', 'NestJS', 'MongoDB', 'Firebase', 'GPT-4o', 'GitHub Actions'],
        points: [
            'Led mobile and backend workstreams of 5–8 member teams — regular syncs with web developers, feature handoffs and mentoring junior developers.',
            'Built and maintained 4+ production Flutter apps with Riverpod, Firebase (Auth, Firestore, Cloud Messaging) and secure REST integrations with token-refresh handling.',
            'Currently leading development of a large-scale React Native application (NDA — details available on request).',
            'Owned the Leklok v2 backend end-to-end: 3 NestJS microservices, a weight-based recommendation algorithm, an ads pipeline and a guest flow on MongoDB, with GitHub Actions CI/CD for builds and deployment.',
            'Modernized the legacy Oner Education Flutter app (60+ countries) and solo-built its AI interview grader (Whisper + GPT-4o) and RAG recommendation chatbot — while shipping 6+ production apps.',
        ],
    },
    {
        company: 'University of Central Punjab',
        role: 'Teaching Assistant, Programming Fundamentals',
        period: 'Oct 2026 – Feb 2027',
        current: true,
        stack: ['Programming Fundamentals', 'Mentoring'],
        points: [
            'Supporting instruction for the Programming Fundamentals course: assisting in lab sessions, grading assignments and quizzes, and helping students with debugging and core programming concepts.',
        ],
    },
    {
        company: 'Astute Technologies',
        role: 'Flutter Developer Intern',
        period: 'Aug 2024 – Oct 2024',
        stack: ['Flutter', 'Firebase'],
        points: [
            'Developed 2 mobile applications with Firebase backend integration; resolved critical bugs affecting push notifications and UI responsiveness.',
            'Upgraded deprecated Flutter projects to current framework standards, improving long-term maintainability.',
            'Contributed to Agile sprints using Git, GitHub and Trello with a cross-functional team.',
        ],
    },
];

export const worksIntro = {
    subtitle: 'Logic meets Aesthetics, Seamlessly',
    title: 'Works',
    text: 'Selected projects across mobile, backend,\nAI and web — shipped, live and in progress.',
};

// `caseStudy` links the row to /projects/<slug>/ (see caseStudies.js); `href` is the external link.
// `href` is optional — rows without one render as non-clickable (employer / academic work).
// `image` is optional — rows without one simply show no hover preview.
export const projects = [
    {
        id: 1,
        name: 'Oner Education',
        caseStudy: 'oner-education',
        kind: 'Student placement platform · Astute Technologies',
        description:
            'Global student-placement app live on the Play Store across 60+ countries — fully modernized to the latest Flutter (all breaking deprecations resolved), plus an AI interview grader (Whisper + GPT-4o) and a RAG chatbot that recommends institutions.',
        href: 'https://play.google.com/store/apps/details?id=com.oner.education',
        frameworks: ['Flutter', 'Firebase', 'GPT-4o', 'Whisper', 'RAG'],
    },
    {
        id: 2,
        name: 'Leklok Backend v2',
        caseStudy: 'leklok-backend',
        kind: 'Audio-first social platform · Astute Technologies',
        description:
            'Three NestJS microservices on MongoDB: a weight-based post recommendation algorithm, a full ads pipeline and a guest flow — shipped with GitHub Actions CI/CD.',
        frameworks: ['NestJS', 'MongoDB', 'Microservices', 'GitHub Actions'],
    },
    {
        id: 3,
        name: 'Farm2Fork',
        caseStudy: 'farm2fork',
        kind: 'Final Year Project · University of Central Punjab · Apr 2026 – Feb 2027',
        description:
            'Farmer-to-buyer marketplace: NestJS API, Next.js and Flutter apps, a Hyperledger Fabric ledger for payments and supply-chain events, and an AI crop-grading service — plus go-to-market research and pricing strategy.',
        href: 'https://github.com/Farm2Fork-Project',
        frameworks: ['NestJS', 'Next.js', 'Flutter', 'Hyperledger Fabric', 'FastAPI'],
    },
    {
        id: 4,
        name: 'Banking System',
        caseStudy: 'banking-system',
        kind: 'Semester project · Solo architecture',
        description:
            'Full-stack banking platform: NestJS API with Redis caching, JWT auth and WebSocket notifications, shared by a React dashboard and a React Native app — all REST APIs documented and tested via Swagger.',
        href: 'https://github.com/junii03/Advance-Web-Programming/tree/main/Project',
        frameworks: ['NestJS', 'Redis', 'JWT', 'WebSockets', 'React', 'React Native'],
    },
    {
        id: 5,
        name: 'Scents E-commerce',
        kind: 'Online fragrance store',
        description:
            'A sleek online fragrance store with a user-friendly interface and an integrated admin panel.',
        href: 'https://zakisessence.pk/',
        image: '/assets/projects/scents-store.webp',
        imageSize: [1600, 928],
        frameworks: ['React', 'Firebase', 'Tailwind CSS'],
    },
    {
        id: 6,
        name: 'HBL Banking Clone',
        kind: 'Web engineering project',
        description:
            'A full-stack online banking app featuring intuitive UI and secure transactions.',
        href: 'https://github.com/junii03/Web-Engineering/tree/7fb9cdfccb73c08263b159a50482014f3856305c/WAD/Project',
        image: '/assets/projects/hbl-clone.webp',
        imageSize: [1600, 1000],
        frameworks: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Redis'],
    },
    {
        id: 7,
        name: 'Shippacks App',
        kind: 'Package delivery · Google Play',
        description:
            'A mobile app for hassle-free package delivery — track, manage and deliver with ease.',
        href: 'https://play.google.com/store/apps/details?id=com.shippacks.app&pli=1',
        image: '/assets/projects/shippacks.webp',
        imageSize: [1600, 900],
        frameworks: ['Flutter', 'Firebase', 'FCM', 'Google Maps'],
    },
    {
        id: 8,
        name: 'Connecting Seafarer App',
        kind: 'Maritime community · Google Play',
        description:
            'A global platform connecting seafarers and shipping entities with real-time communication and community tools.',
        href: 'https://play.google.com/store/apps/details?id=com.marinoft.connecting_seafarer',
        image: '/assets/projects/connecting-seafarer.webp',
        imageSize: [1600, 900],
        frameworks: ['Flutter', 'WebSockets', 'FCM'],
    },
];

export const stackIntro = {
    subtitle: 'Tools I reach for',
    title: 'Stack',
    text: 'The languages, frameworks and platforms\nbehind the work — plus where I studied.',
};

export const skills = [
    { group: 'Mobile', items: ['Flutter (Dart)', 'React Native (TypeScript)', 'Riverpod', 'Provider', 'Firebase', 'LiveKit', 'RevenueCat'] },
    { group: 'Backend', items: ['NestJS', 'Node.js', 'REST API Design', 'Microservices', 'WebSockets', 'JWT Auth', 'Swagger / OpenAPI'] },
    { group: 'Databases', items: ['MongoDB', 'Firebase Firestore', 'Redis'] },
    { group: 'AI & Integrations', items: ['OpenAI GPT-4o', 'Whisper STT', 'ElevenLabs TTS', 'RAG pipelines', 'FFmpeg'] },
    { group: 'Web3', items: ['Solana wallet integration', 'Hyperledger Fabric'] },
    { group: 'DevOps & Tooling', items: ['GitHub Actions (CI/CD)', 'Git', 'Docker (learning)', 'Postman', 'Figma', 'Android Studio', 'Xcode'] },
    { group: 'Languages', items: ['TypeScript', 'JavaScript', 'Dart', 'C++', 'C'] },
];

export const education = {
    school: 'University of Central Punjab',
    city: 'Lahore',
    degree: 'BS Software Engineering',
    period: 'Mar 2023 – Feb 2027 (expected)',
    cgpa: '3.92 / 4.00',
    highlights: ['NSCT (Apr 2026): scored 72 / 100 — 98.1 percentile'],
    earlier: {
        school: 'Sadiq Public School',
        city: 'Bahawalpur',
        degree: 'F.Sc. Pre-Medical',
        period: 'Oct 2019 – May 2021',
        result: '97.5%',
    },
};

export const certifications = [
    'Object-Oriented Programming Specialization — Coursera',
    'DevOps & CI/CD — in progress (7th-semester coursework)',
    'Volunteer, Rizq UCP Chapter — organized a community Iftar program, Ramzan 2025',
];

export const contactIntro = {
    subtitle: 'Ideas into Code, Conversations into Collaboration',
    title: 'Contact',
    text: 'Have a project, an idea, or just want to connect?\nMy inbox is always open. Let’s talk.',
};
