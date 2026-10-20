import { useCallback, useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SITE, socials } from '../constants';

const sections = ['home', 'services', 'about', 'experience', 'work', 'stack', 'contact'];

function Navbar() {
    const navRef = useRef(null);
    const burgerRef = useRef(null);
    const linkRef = useRef([]);
    const contactRef = useRef(null);
    const topLineRef = useRef(null);
    const bottomLineRef = useRef(null);
    const tl = useRef(null);
    const iconTl = useRef(null);
    const [showBurger, setShowBurger] = useState(true);
    const [isOpened, setIsOpened] = useState(false);

    const setOpen = useCallback((open) => {
        if (!tl.current) return;
        if (open) {
            tl.current.play();
            iconTl.current.play();
        } else {
            tl.current.reverse();
            iconTl.current.reverse();
        }
        setIsOpened(open);
    }, []);

    // Close on outside click and on Escape (returning focus to the toggle)
    useEffect(() => {
        if (!isOpened) return;
        const onDown = (e) => {
            if (!navRef.current?.contains(e.target) && !burgerRef.current?.contains(e.target)) setOpen(false);
        };
        const onKey = (e) => {
            if (e.key === 'Escape') {
                setOpen(false);
                burgerRef.current?.focus();
            }
        };
        document.addEventListener('mousedown', onDown);
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('mousedown', onDown);
            document.removeEventListener('keydown', onKey);
        };
    }, [isOpened, setOpen]);

    useGSAP(() => {
        gsap.set(navRef.current, { xPercent: 100 });
        gsap.set([linkRef.current, contactRef.current], { autoAlpha: 0, x: -20 });

        tl.current = gsap.timeline({ paused: true })
            .to(navRef.current, { xPercent: 0, duration: 1, ease: 'power3.out' })
            .to(linkRef.current, { autoAlpha: 1, x: 0, stagger: 0.12, duration: 0.5, ease: 'power3.out' }, '<')
            .to(contactRef.current, { autoAlpha: 1, x: 0, duration: 0.5, ease: 'power2.out' }, '<+0.2');

        iconTl.current = gsap.timeline({ paused: true })
            .to(topLineRef.current, { rotation: 45, y: 3.3, duration: 0.3, ease: 'power2.inOut' })
            .to(bottomLineRef.current, { rotation: -45, y: -3.3, duration: 0.3, ease: 'power2.inOut' }, '<');
    }, []);

    // Hide the burger while scrolling down, reveal on scroll up
    useEffect(() => {
        let lastScrollY = window.scrollY;
        const onScroll = () => {
            const y = window.scrollY;
            setShowBurger(y < lastScrollY || y < 10);
            lastScrollY = y;
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const burgerVisible = showBurger || isOpened;

    return (
        <>
            <nav
                ref={navRef}
                id="site-menu"
                aria-label="Primary"
                inert={!isOpened}
                className="fixed z-50 flex flex-col justify-between w-full h-full uppercase bg-gradient-to-br from-black via-neutral-900 to-black text-white/80 py-28 gap-y-10 md:w-1/2 md:left-1/2 px-10 overflow-y-auto"
            >
                <ul className="flex flex-col text-5xl gap-y-1 md:text-6xl lg:text-7xl">
                    {sections.map((section, index) => (
                        <li key={section} ref={(el) => (linkRef.current[index] = el)}>
                            <a
                                href={`#${section}`}
                                onClick={() => setOpen(false)}
                                className="inline-block transition-all duration-300 hover:text-white hover:translate-x-2 focus-visible:text-white"
                            >
                                {section}
                            </a>
                        </li>
                    ))}
                </ul>

                <div ref={contactRef} className="flex flex-col flex-wrap justify-between gap-8 md:flex-row">
                    <div className="font-light">
                        <p className="tracking-wider text-white/50">E-mail</p>
                        <a href={`mailto:${SITE.email}`} className="text-xl tracking-widest lowercase text-pretty hover:text-white transition-colors">
                            {SITE.email}
                        </a>
                    </div>

                    <div className="font-light">
                        <p className="tracking-wider text-white/50">Social Media</p>
                        <div className="flex flex-col md:flex-row gap-x-4 mt-2">
                            {socials.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="me noopener noreferrer"
                                    className="text-sm leading-loose tracking-widest uppercase hover:text-white transition-colors duration-300"
                                >
                                    {'{ '}{social.name}{' }'}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>

            <button
                ref={burgerRef}
                type="button"
                aria-label={isOpened ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpened}
                aria-controls="site-menu"
                onClick={() => setOpen(!isOpened)}
                style={{ clipPath: burgerVisible ? 'circle(50% at 50% 50%)' : 'circle(0% at 50% 50%)' }}
                tabIndex={burgerVisible ? 0 : -1}
                className="fixed z-[60] flex flex-col justify-center items-center gap-1 transition-all duration-300 bg-black rounded-full cursor-pointer w-14 h-14 md:w-20 md:h-20 top-4 right-6 md:right-10 hover:scale-105"
            >
                <span ref={topLineRef} className="block w-8 h-0.5 bg-white rounded-full origin-center" />
                <span ref={bottomLineRef} className="block w-8 h-0.5 bg-white rounded-full origin-center" />
            </button>
        </>
    );
}

export default Navbar;
