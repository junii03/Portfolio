import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import AnimatedHeaderSection from '../components/AnimatedHeaderSection';
import { ArrowUpRight } from '../components/Icons';
import { projects, worksIntro, socials } from '../constants';

const PREVIEW_W = 340;
const PREVIEW_H = 200;
const isDesktop = () => window.innerWidth >= 1024;
const pad = (n) => String(n).padStart(2, '0');

const Works = () => {
    const [active, setActive] = useState(null);
    const listRef = useRef(null);
    const previewRef = useRef(null);
    const moveX = useRef(null);
    const moveY = useRef(null);
    const overlayRef = useRef([]);

    useGSAP(() => {
        moveX.current = gsap.quickTo(previewRef.current, 'x', { duration: 0.6, ease: 'power3.out' });
        moveY.current = gsap.quickTo(previewRef.current, 'y', { duration: 0.6, ease: 'power3.out' });

        gsap.from('.project-row', {
            y: 60,
            autoAlpha: 0,
            stagger: 0.1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: listRef.current, start: 'top 85%' },
        });
    }, []);

    // Keep the small preview inside the viewport, to the lower-right of the pointer
    const follow = (x, y) => {
        moveX.current(Math.min(x + 28, window.innerWidth - PREVIEW_W - 24));
        moveY.current(Math.min(y + 28, window.innerHeight - PREVIEW_H - 24));
    };

    const show = (index, point) => {
        if (!isDesktop()) return;
        setActive(index);
        if (point) follow(point.x, point.y);
        const overlay = overlayRef.current[index];
        if (overlay) {
            gsap.killTweensOf(overlay);
            gsap.to(overlay, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.35, ease: 'power3.out' });
        }
        if (projects[index].image) {
            gsap.to(previewRef.current, { autoAlpha: 1, scale: 1, duration: 0.25, ease: 'power2.out' });
        }
    };

    const hide = (index) => {
        if (!isDesktop()) return;
        setActive(null);
        const overlay = overlayRef.current[index];
        if (overlay) {
            gsap.killTweensOf(overlay);
            gsap.to(overlay, { clipPath: 'inset(100% 0% 0% 0%)', duration: 0.3, ease: 'power3.inOut' });
        }
        gsap.to(previewRef.current, { autoAlpha: 0, scale: 0.92, duration: 0.2, ease: 'power2.in' });
    };

    const onMouseMove = (e) => {
        if (isDesktop()) follow(e.clientX, e.clientY);
    };

    // Keyboard users get the same preview, anchored beside the focused row
    const onFocus = (index, e) => {
        const r = e.currentTarget.getBoundingClientRect();
        show(index, { x: r.right - PREVIEW_W - 120, y: r.top });
    };

    return (
        <section id="work" className="flex flex-col min-h-screen">
            <AnimatedHeaderSection
                subtitle={worksIntro.subtitle}
                title={worksIntro.title}
                text={worksIntro.text}
                textColor="text-black"
                withScrollTrigger={true}
            />
            <ul ref={listRef} className="relative flex flex-col border-t border-black/80 font-light" onMouseMove={onMouseMove}>
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
                        <li key={project.id} className="project-row border-b border-black/80">
                            <Tag
                                {...linkProps}
                                className="group relative grid gap-4 px-10 py-8 lg:grid-cols-[3rem_minmax(0,1.3fr)_minmax(0,1.6fr)_minmax(0,1fr)_3rem] lg:items-center lg:gap-8 lg:py-10"
                                onMouseEnter={() => show(index)}
                                onMouseLeave={() => hide(index)}
                                onFocus={project.href ? (e) => onFocus(index, e) : undefined}
                                onBlur={project.href ? () => hide(index) : undefined}
                            >
                                <div
                                    aria-hidden="true"
                                    className="absolute inset-0 hidden bg-black -z-10 lg:block"
                                    style={{ clipPath: 'inset(100% 0% 0% 0%)' }}
                                    ref={(el) => { overlayRef.current[index] = el; }}
                                />

                                <span className="hidden text-sm tracking-[0.2em] text-black/40 transition-colors duration-300 lg:block lg:group-hover:text-white/50">
                                    {pad(index + 1)}
                                </span>

                                <div className="transition-colors duration-300 lg:group-hover:text-white">
                                    <h3 className="text-3xl leading-tight lg:text-[40px]">{project.name}</h3>
                                    <p className="mt-2 text-[11px] uppercase tracking-[0.25em] text-black/50 transition-colors duration-300 lg:group-hover:text-white/60">
                                        {project.kind}
                                    </p>
                                </div>

                                <p className="max-w-xl text-sm leading-relaxed text-black/70 transition-colors duration-300 md:text-base lg:group-hover:text-white/75">
                                    {project.description}
                                </p>

                                <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs tracking-wide text-black/80 transition-colors duration-300 md:text-sm lg:group-hover:text-white/90" aria-label="Technologies">
                                    {project.frameworks.map((fw) => (
                                        <li key={fw}>{fw}</li>
                                    ))}
                                </ul>

                                <span
                                    aria-hidden="true"
                                    className={`hidden size-11 place-items-center justify-self-end rounded-full border border-black/30 transition-all duration-300 lg:grid ${project.href ? 'lg:group-hover:border-gold lg:group-hover:bg-gold lg:group-hover:text-black lg:group-hover:rotate-45' : 'opacity-0'}`}
                                >
                                    <ArrowUpRight className="size-5" />
                                </span>

                                {/* mobile / tablet: small inline thumbnail, only when we have a screenshot */}
                                {project.image && (
                                    <img
                                        src={project.image}
                                        alt={`${project.name} screenshot`}
                                        width={project.imageSize?.[0] ?? 1600}
                                        height={project.imageSize?.[1] ?? 900}
                                        className="mt-2 aspect-video w-full max-w-md rounded-lg object-cover object-top lg:hidden"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                )}
                            </Tag>
                        </li>
                    );
                })}
            </ul>

            <div className="flex items-center justify-between px-10 py-10 text-sm tracking-[0.2em] uppercase">
                <span className="text-black/50">More on GitHub</span>
                <a
                    href={socials.find((s) => s.name === 'GitHub')?.href}
                    target="_blank"
                    rel="me noopener noreferrer"
                    className="inline-flex items-center gap-2 transition-colors hover:text-gold"
                >
                    github.com/junii03 <ArrowUpRight className="size-4" />
                </a>
            </div>

            {/* desktop cursor-following preview: compact, screenshot-only */}
            <div
                ref={previewRef}
                aria-hidden="true"
                className="pointer-events-none fixed left-0 top-0 z-50 hidden overflow-hidden rounded-xl bg-black shadow-2xl ring-1 ring-black/10 lg:block"
                style={{ width: PREVIEW_W, height: PREVIEW_H, opacity: 0, visibility: 'hidden' }}
            >
                {projects.map((p, i) =>
                    p.image ? (
                        <img
                            key={p.id}
                            src={p.image}
                            alt=""
                            width={p.imageSize?.[0] ?? 1600}
                            height={p.imageSize?.[1] ?? 900}
                            className="absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-200"
                            style={{ opacity: active === i ? 1 : 0 }}
                            loading="lazy"
                            decoding="async"
                        />
                    ) : null,
                )}
            </div>
        </section>
    );
};

export default Works;
