import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import AnimatedHeaderSection from '../components/AnimatedHeaderSection';
import AnimatedTextLines from '../components/AnimatedTextLines';
import CountUp from '../components/CountUp';
import { about, SITE } from '../constants';

const About = () => {
    const imgRef = useRef(null);
    const statsRef = useRef(null);

    useGSAP(() => {
        gsap.to('#about', {
            scale: 0.95,
            scrollTrigger: {
                trigger: '#about',
                start: 'bottom 80%',
                end: 'bottom 20%',
                scrub: true,
            },
            ease: 'power1.inOut',
        });

        // Portrait reveals upward with a slow settle
        gsap.fromTo(
            imgRef.current,
            { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.15 },
            {
                clipPath: 'inset(0% 0% 0% 0%)',
                scale: 1,
                duration: 1.6,
                ease: 'power4.out',
                scrollTrigger: { trigger: imgRef.current, start: 'top 85%' },
            },
        );

        gsap.from(statsRef.current.children, {
            y: 40,
            autoAlpha: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: { trigger: statsRef.current, start: 'top 88%' },
        });
    });

    return (
        <section id="about" className="min-h-screen bg-black rounded-b-4xl">
            <AnimatedHeaderSection
                subtitle={about.subtitle}
                title={about.title}
                text={about.text}
                textColor="text-white"
                withScrollTrigger={true}
            />
            <div className="flex flex-col gap-16 px-10 pb-16 text-xl font-light items-center justify-between tracking-wide lg:flex-row md:text-2xl lg:text-3xl text-white/60">
                <img
                    ref={imgRef}
                    src={SITE.portrait}
                    alt={about.portraitAlt}
                    width="460"
                    height="460"
                    className="w-full max-w-md rounded-3xl grayscale"
                    loading="lazy"
                    decoding="async"
                />
                <div className="flex w-full flex-col gap-8">
                    {about.paragraphs.map((p) => (
                        <AnimatedTextLines key={p.slice(0, 24)} text={p} className="w-full" />
                    ))}
                </div>
            </div>
            <dl
                ref={statsRef}
                className="grid grid-cols-2 gap-x-6 gap-y-10 px-10 pb-20 text-white md:grid-cols-4"
            >
                {about.stats.map((stat) => (
                    <div key={stat.label} className="flex flex-col-reverse justify-end gap-3 border-t border-white/30 pt-4">
                        <dt className="text-xs font-light uppercase tracking-[0.2em] text-white/50 md:text-sm">
                            {stat.label}
                        </dt>
                        <dd className="text-5xl font-light lg:text-7xl">
                            <CountUp value={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
                        </dd>
                    </div>
                ))}
            </dl>
        </section>
    );
};

export default About;
