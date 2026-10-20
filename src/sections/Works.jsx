import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import AnimatedHeaderSection from '../components/AnimatedHeaderSection';
import ProjectPreview from '../components/ProjectPreview';
import { ArrowUpRight } from '../components/Icons';
import { projects, worksIntro } from '../constants';

const isDesktop = () => window.innerWidth >= 768;

const Works = () => {
    const [currentIndex, setCurrentIndex] = useState(null);
    const listRef = useRef(null);
    const previewRef = useRef(null);
    const moveX = useRef(null);
    const moveY = useRef(null);
    const overlayRef = useRef([]);

    useGSAP(() => {
        moveX.current = gsap.quickTo(previewRef.current, 'x', { duration: 1.5, ease: 'power3.out' });
        moveY.current = gsap.quickTo(previewRef.current, 'y', { duration: 2, ease: 'power3.out' });

        gsap.from('.project-row', {
            y: 80,
            autoAlpha: 0,
            stagger: 0.12,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: listRef.current, start: 'top 85%' },
        });
    }, []);

    const show = (index, point) => {
        if (!isDesktop()) return;
        setCurrentIndex(index);
        if (point) {
            moveX.current(point.x);
            moveY.current(point.y);
        }
        const overlay = overlayRef.current[index];
        if (overlay) {
            gsap.killTweensOf(overlay);
            gsap.fromTo(
                overlay,
                { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' },
                { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: 0.15, ease: 'power2.out' },
            );
        }
        gsap.to(previewRef.current, { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' });
    };

    const hide = (index) => {
        if (!isDesktop()) return;
        setCurrentIndex(null);
        const overlay = overlayRef.current[index];
        if (overlay) {
            gsap.killTweensOf(overlay);
            gsap.to(overlay, {
                clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
                duration: 0.15,
                ease: 'power2.out',
            });
        }
        gsap.to(previewRef.current, { opacity: 0, scale: 0.5, duration: 0.3, ease: 'power2.out' });
    };

    const handleMouseMove = (e) => {
        if (!isDesktop()) return;
        moveX.current(e.clientX + 24);
        moveY.current(e.clientY + 24);
    };

    // Keyboard users get the same preview, anchored next to the focused row
    const handleFocus = (index, e) => {
        const r = e.currentTarget.getBoundingClientRect();
        show(index, { x: Math.max(24, r.right - 600), y: Math.max(24, r.top - 120) });
    };

    const active = currentIndex !== null ? projects[currentIndex] : null;

    return (
        <section id="work" className="flex flex-col min-h-screen">
            <AnimatedHeaderSection
                subtitle={worksIntro.subtitle}
                title={worksIntro.title}
                text={worksIntro.text}
                textColor="text-black"
                withScrollTrigger={true}
            />
            <ul ref={listRef} className="relative flex flex-col font-light" onMouseMove={handleMouseMove}>
                {projects.map((project, index) => {
                    const Tag = project.href ? 'a' : 'div';
                    const linkProps = project.href
                        ? {
                            href: project.href,
                            target: '_blank',
                            rel: 'noopener noreferrer',
                            'aria-label': `${project.name} — opens in a new tab`,
                        }
                        : {};
                    return (
                        <li key={project.id} className="project-row">
                            <Tag
                                {...linkProps}
                                className={`relative flex flex-col gap-1 py-5 group md:gap-0 ${project.href ? 'cursor-pointer' : ''}`}
                                onMouseEnter={() => show(index)}
                                onMouseLeave={() => hide(index)}
                                onFocus={project.href ? (e) => handleFocus(index, e) : undefined}
                                onBlur={project.href ? () => hide(index) : undefined}
                            >
                                {/* hover overlay */}
                                <div
                                    aria-hidden="true"
                                    className="absolute inset-0 hidden md:block duration-200 bg-gradient-to-r from-black/90 via-black/70 to-black/90 -z-10 clip-path"
                                    ref={(el) => { overlayRef.current[index] = el; }}
                                />
                                <div className="flex flex-col px-10 text-black transition-all duration-500 md:group-hover:px-12 md:group-hover:text-white md:group-focus-visible:px-12 md:group-focus-visible:text-white">
                                    <p className="mb-2 text-[11px] uppercase tracking-[0.3em] text-black/50 transition-colors duration-500 md:group-hover:text-white/60">
                                        {project.kind}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <h3 className="lg:text-[32px] text-[26px] leading-none">{project.name}</h3>
                                        {project.href && (
                                            <ArrowUpRight className="md:size-6 size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                                        )}
                                    </div>
                                    <p className="mt-2 max-w-4xl text-sm md:text-base text-black/70 transition-colors duration-500 md:group-hover:text-white/80">
                                        {project.description}
                                    </p>
                                </div>
                                <div className="w-full h-0.5 mt-3 bg-black/80" />
                                <ul className="flex flex-wrap px-10 text-xs leading-loose transition-all duration-500 md:text-sm gap-x-5 md:group-hover:px-12">
                                    {project.frameworks.map((fw) => (
                                        <li key={fw} className="text-black transition-colors duration-500 md:group-hover:text-white">
                                            {fw}
                                        </li>
                                    ))}
                                </ul>
                                {/* mobile preview */}
                                <div className="relative flex items-center justify-center px-10 mt-3 md:hidden">
                                    {project.image ? (
                                        <div className="relative w-full overflow-hidden rounded-md">
                                            <img
                                                src={project.bgImage}
                                                alt=""
                                                width="1200"
                                                height="800"
                                                className="object-cover w-full h-[260px] brightness-50"
                                                loading="lazy"
                                                decoding="async"
                                            />
                                            <ProjectPreview
                                                project={project}
                                                className="absolute inset-0 m-auto w-[82%] rounded-md shadow-xl"
                                            />
                                        </div>
                                    ) : (
                                        <ProjectPreview project={project} className="w-full rounded-md" />
                                    )}
                                </div>
                            </Tag>
                        </li>
                    );
                })}
            </ul>

            {/* desktop floating preview */}
            <div
                ref={previewRef}
                aria-hidden="true"
                className="fixed top-0 left-0 z-50 hidden overflow-hidden border-8 border-black pointer-events-none opacity-0 md:block w-[min(960px,60vw)] rounded-2xl bg-black"
                style={{ marginTop: '-18vh' }}
            >
                {active && <ProjectPreview project={active} className="object-cover w-full h-auto" eager />}
            </div>
        </section>
    );
};

export default Works;
