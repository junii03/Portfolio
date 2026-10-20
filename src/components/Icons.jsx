// Tiny inline SVG icons — replaces runtime Iconify API fetches (no third-party requests, no icon pop-in).
export const ArrowUpRight = ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M7 17 17 7M8 7h9v9" />
    </svg>
);

export const FourPointStar = ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" width="1em" height="1em">
        <path d="M12 2c.6 5.6 4.4 9.4 10 10-5.6.6-9.4 4.4-10 10-.6-5.6-4.4-9.4-10-10 5.6-.6 9.4-4.4 10-10Z" />
    </svg>
);

export const Square = ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" width="1em" height="1em">
        <rect x="6" y="6" width="12" height="12" />
    </svg>
);
