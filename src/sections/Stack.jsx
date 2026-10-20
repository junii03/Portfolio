import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import AnimatedHeaderSection from '../components/AnimatedHeaderSection';
import { stackIntro, skills, education, certifications, SITE } from '../constants';

const Stack = () => {
    const rootRef = useRef(null);

    useGSAP(() => {
        gsap.utils.toArray('.stack-row', rootRef.current).forEach((row) => {
            gsap.from(row, {
                y: 60,
                autoAlpha: 0,
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: { trigger: row, start: 'top 88%' },
            });
        });
        gsap.from('.chip', {
            y: 16,
            autoAlpha: 0,
            duration: 0.5,
            stagger: { each: 0.015, from: 'start' },
            ease: 'power2.out',
            scrollTrigger: { trigger: rootRef.current, start: 'top 60%' },
        });
    }, []);

    return (
        <section ref={rootRef} id="stack" className="min-h-screen bg-black text-white rounded-4xl">
            <AnimatedHeaderSection
                subtitle={stackIntro.subtitle}
                title={stackIntro.title}
                text={stackIntro.text}
                textColor="text-white"
                withScrollTrigger={true}
            />
            <div className="flex flex-col font-light">
                {skills.map((group) => (
                    <div key={group.group} className="stack-row px-10 pb-10">
                        <div className="h-px w-full bg-white/30" />
                        <div className="grid gap-4 pt-6 md:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] md:gap-10">
                            <h3 className="text-2xl lg:text-3xl uppercase">{group.group}</h3>
                            <ul className="flex flex-wrap gap-2">
                                {group.items.map((item) => (
                                    <li
                                        key={item}
                                        className="chip rounded-full border border-white/30 px-4 py-1.5 text-sm tracking-wide text-white/80 transition-colors duration-300 hover:border-gold hover:text-gold md:text-base"
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}

                <div className="stack-row px-10 pb-16 pt-6">
                    <div className="h-px w-full bg-white/30" />
                    <div className="grid gap-6 pt-6 md:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] md:gap-10">
                        <h3 className="text-2xl lg:text-3xl uppercase">Education</h3>
                        <div className="flex flex-col gap-3 text-white/70">
                            <p className="text-2xl text-white lg:text-4xl">{education.school}</p>
                            <p className="text-lg lg:text-xl">
                                {education.degree} · {education.city}
                            </p>
                            <p className="text-sm tracking-[0.2em] uppercase text-white/50">
                                {education.period} · CGPA {education.cgpa}
                            </p>
                            {education.highlights.map((h) => (
                                <p key={h} className="text-base text-white/80">{h}</p>
                            ))}
                            <div className="mt-6 flex flex-col gap-1 border-t border-white/15 pt-6">
                                <p className="text-xl text-white lg:text-2xl">{education.earlier.school}</p>
                                <p className="text-base lg:text-lg">
                                    {education.earlier.degree} · {education.earlier.city}
                                </p>
                                <p className="text-sm tracking-[0.2em] uppercase text-white/50">
                                    {education.earlier.period} · {education.earlier.result}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="stack-row px-10 pb-20">
                    <div className="h-px w-full bg-white/30" />
                    <div className="grid gap-6 pt-6 md:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] md:gap-10">
                        <h3 className="text-2xl lg:text-3xl uppercase">Certifications &amp; activities</h3>
                        <ul className="flex flex-col gap-3 text-base text-white/70 md:text-lg">
                            {certifications.map((c) => (
                                <li key={c} className="flex gap-4">
                                    <span aria-hidden="true" className="mt-[0.7em] h-px w-5 shrink-0 bg-gold" />
                                    {c}
                                </li>
                            ))}
                        </ul>
                    </div>
                    {SITE.resume && (
                    <a
                        href={SITE.resume}
                        target="_blank"
                        rel="noopener"
                        className="mt-12 inline-block rounded-full border border-white/60 px-6 py-3 text-xs uppercase tracking-[0.25em] transition-colors duration-300 hover:bg-white hover:text-black md:text-sm"
                    >
                        Download full résumé (PDF)
                    </a>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Stack;
