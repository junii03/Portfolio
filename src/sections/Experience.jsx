import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import AnimatedHeaderSection from '../components/AnimatedHeaderSection';
import { experience, experienceIntro } from '../constants';

const Experience = () => {
    const listRef = useRef(null);

    useGSAP(() => {
        const rows = gsap.utils.toArray('.exp-row', listRef.current);
        rows.forEach((row) => {
            gsap.from(row, {
                y: 80,
                autoAlpha: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: { trigger: row, start: 'top 85%' },
            });
            gsap.from(row.querySelector('.exp-line'), {
                scaleX: 0,
                transformOrigin: 'left center',
                duration: 1.4,
                ease: 'power3.inOut',
                scrollTrigger: { trigger: row, start: 'top 85%' },
            });
        });
    }, []);

    return (
        <section id="experience" className="flex flex-col min-h-screen">
            <AnimatedHeaderSection
                subtitle={experienceIntro.subtitle}
                title={experienceIntro.title}
                text={experienceIntro.text}
                textColor="text-black"
                withScrollTrigger={true}
            />
            <ol ref={listRef} className="flex flex-col font-light">
                {experience.map((job) => (
                    <li key={`${job.company}-${job.period}`} className="exp-row px-10 pb-16">
                        <div className="exp-line h-0.5 w-full bg-black/80" />
                        <div className="grid gap-6 pt-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
                            <header className="flex flex-col gap-2">
                                <p className="text-sm tracking-[0.25em] uppercase text-black/60">{job.period}</p>
                                <h3 className="text-3xl leading-tight lg:text-[44px]">{job.company}</h3>
                                <p className="text-lg text-black/70 lg:text-2xl">{job.role}</p>
                                <ul className="mt-3 flex flex-wrap gap-2" aria-label="Technologies">
                                    {job.stack.map((tech) => (
                                        <li
                                            key={tech}
                                            className="rounded-full border border-black/40 px-3 py-1 text-xs tracking-wider"
                                        >
                                            {tech}
                                        </li>
                                    ))}
                                </ul>
                            </header>
                            <ul className="flex flex-col gap-4 text-base leading-relaxed tracking-wide text-black/80 md:text-lg">
                                {job.points.map((point) => (
                                    <li key={point.slice(0, 32)} className="flex gap-4">
                                        <span aria-hidden="true" className="mt-[0.7em] h-px w-5 shrink-0 bg-gold" />
                                        <span className="text-pretty">{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </li>
                ))}
            </ol>
        </section>
    );
};

export default Experience;
