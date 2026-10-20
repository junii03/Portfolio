import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import AnimatedHeaderSection from '../components/AnimatedHeaderSection';
import SceneBoundary from '../components/SceneBoundary';
import { ArrowUpRight } from '../components/Icons';
import { hero, SITE } from '../constants';

const PlanetScene = lazy(() => import('../components/PlanetScene'));

const Hero = () => {
    const isMobile = useMediaQuery({ maxWidth: 853 });

    // Pause 3D rendering when off-screen or tab hidden
    const sectionRef = useRef(null);
    const ctaRef = useRef(null);
    const [running, setRunning] = useState(true);
    const [sceneReady, setSceneReady] = useState(false);
    const [mountScene, setMountScene] = useState(false);

    // Defer the heavy 3D chunk until the browser is idle, so text paints first.
    useEffect(() => {
        const start = () => setMountScene(true);
        if ('requestIdleCallback' in window) {
            const id = window.requestIdleCallback(start, { timeout: 1200 });
            return () => window.cancelIdleCallback(id);
        }
        const id = setTimeout(start, 300);
        return () => clearTimeout(id);
    }, []);

    useEffect(() => {
        const el = sectionRef.current;
        let visible = true;
        const computeRun = () => setRunning(visible && !document.hidden);
        const io = typeof IntersectionObserver !== 'undefined'
            ? new IntersectionObserver((entries) => {
                visible = !!entries[0]?.isIntersecting;
                computeRun();
            }, { threshold: 0.05 })
            : null;
        if (io && el) io.observe(el);
        document.addEventListener('visibilitychange', computeRun);
        return () => {
            io?.disconnect();
            document.removeEventListener('visibilitychange', computeRun);
        };
    }, []);

    useGSAP(() => {
        gsap.from(gsap.utils.toArray(ctaRef.current.children), {
            y: 24,
            autoAlpha: 0,
            duration: 0.9,
            delay: 1.1,
            stagger: 0.12,
            ease: 'power3.out',
        });
    }, []);

    const ctaBase =
        'group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 sm:px-6 sm:py-3 sm:text-xs md:text-sm md:tracking-[0.25em]';

    return (
        <section ref={sectionRef} id="home" className="relative flex flex-col justify-end min-h-screen">
            <AnimatedHeaderSection
                subtitle={hero.subtitle}
                title={hero.title}
                text={hero.text}
                textColor="text-black"
                headingLevel={1}
            />
            <div ref={ctaRef} className="flex flex-wrap items-center gap-3 px-10 pb-10 -mt-6 sm:-mt-4 sm:pb-12">
                <a href="#work" className={`${ctaBase} bg-black text-white hover:bg-DarkLava`}>
                    See my work
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                {SITE.resume && (
                <a
                    href={SITE.resume}
                    target="_blank"
                    rel="noopener"
                    className={`${ctaBase} border border-black/70 text-black hover:bg-black hover:text-white`}
                >
                    Résumé (PDF)
                </a>
                )}
                <a href="#contact" className={`${ctaBase} hidden text-black/70 hover:text-black sm:inline-flex`}>
                    Get in touch
                </a>
            </div>
            <figure
                aria-hidden="true"
                className="absolute inset-0 -z-50 h-screen w-screen transition-opacity duration-[1500ms]"
                style={{ opacity: sceneReady ? 1 : 0 }}
            >
                {mountScene && (
                    <SceneBoundary>
                        <Suspense fallback={null}>
                            <PlanetScene running={running} isMobile={isMobile} onReady={() => setSceneReady(true)} />
                        </Suspense>
                    </SceneBoundary>
                )}
            </figure>
        </section>
    );
};

export default Hero;
