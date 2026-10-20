import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import AnimatedHeaderSection from '../components/AnimatedHeaderSection';
import Marquee from '../components/Marquee';
import { ArrowUpRight } from '../components/Icons';
import { SITE, socials, contactIntro } from '../constants';

const Contact = () => {
    const items = ['Ideas to Reality', 'Code with Vision', 'Design the Future', 'Dream. Build. Grow.'];

    useGSAP(() => {
        gsap.from('.social-link', {
            y: 100,
            autoAlpha: 0,
            delay: 0.3,
            duration: 1,
            stagger: 0.2,
            ease: 'back.out',
            scrollTrigger: { trigger: '.social-link' },
        });
    }, []);

    const row = 'social-link';
    const label = 'lg:text-[32px] text-[26px] leading-none';
    const value = 'inline-flex items-center gap-3 lowercase md:text-2xl lg:text-3xl tracking-wider transition-colors hover:text-gold';

    return (
        <section id="contact" className="min-h-screen flex flex-col justify-between bg-black">
            <AnimatedHeaderSection
                subtitle={contactIntro.subtitle}
                title={contactIntro.title}
                text={contactIntro.text}
                textColor="text-white"
                withScrollTrigger={true}
            />
            <address className="flex px-10 mb-10 font-light not-italic text-white uppercase">
                <div className="flex flex-col w-full gap-10">
                    <div className={row}>
                        <h3 className={label}>E-mail</h3>
                        <div className="w-full h-px my-2 bg-white/30" />
                        <a href={`mailto:${SITE.email}`} className={value}>
                            {SITE.email}
                            <ArrowUpRight className="size-5 md:size-6" />
                        </a>
                    </div>
                    <div className={row}>
                        <h3 className={label}>Phone</h3>
                        <div className="w-full h-px my-2 bg-white/30" />
                        <a href={`tel:${SITE.phoneE164}`} className={value}>
                            {SITE.phone}
                        </a>
                    </div>
                    <div className={row}>
                        <h3 className={label}>Based in</h3>
                        <div className="w-full h-px my-2 bg-white/30" />
                        <p className="md:text-2xl lg:text-3xl tracking-wider">
                            {SITE.location.city}, {SITE.location.country}
                        </p>
                    </div>
                    <div className={row}>
                        <h3 className={label}>Elsewhere</h3>
                        <div className="w-full h-px my-2 bg-white/30" />
                        <div className="flex flex-wrap gap-x-6 gap-y-2">
                            {socials.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="me noopener noreferrer"
                                    className="md:text-sm text-xs tracking-widest leading-loose hover:text-gold transition-colors uppercase"
                                >
                                    {'{'} {social.name} {'}'}
                                </a>
                            ))}
                            {SITE.resume && (
                            <a
                                href={SITE.resume}
                                target="_blank"
                                rel="noopener"
                                className="md:text-sm text-xs tracking-widest leading-loose hover:text-gold transition-colors uppercase"
                            >
                                {'{'} Résumé PDF {'}'}
                            </a>
                            )}
                        </div>
                    </div>
                </div>
            </address>
            <Marquee items={items} className="text-white bg-transparent" />
        </section>
    );
};

export default Contact;
