import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

// Counts up once when scrolled into view. Final value is always the rendered text,
// so crawlers and reduced-motion users see the real number.
const CountUp = ({ value, decimals = 0, suffix = '', className = '' }) => {
    const ref = useRef(null);
    const fmt = (n) => n.toFixed(decimals);

    useGSAP(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const state = { n: 0 };
        ref.current.textContent = fmt(0) + suffix;
        gsap.to(state, {
            n: value,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: { trigger: ref.current, start: 'top 90%' },
            onUpdate: () => {
                ref.current.textContent = fmt(state.n) + suffix;
            },
        });
    }, [value]);

    return (
        <span ref={ref} className={className}>
            {fmt(value)}
            {suffix}
        </span>
    );
};

export default CountUp;
