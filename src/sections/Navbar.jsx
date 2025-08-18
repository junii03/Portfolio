import { useEffect, useRef, useState } from 'react'
import { socials } from '../constants';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Link } from 'react-scroll';

function Navbar() {
    const navRef = useRef(null);
    const linkRef = useRef([]);
    const contactRef = useRef(null);
    const topLineRef = useRef(null);
    const bottomLineRef = useRef(null);
    const tl = useRef(null);
    const iconTl = useRef(null);
    const [showBurger, setShowBurger] = useState(true);
    const [isOpened, setIsOpened] = useState(false);

    const toggleMenu = () => {
        if (isOpened) {
            tl.current.reverse();
            iconTl.current.reverse();
        } else {
            tl.current.play();
            iconTl.current.play();
        }
        setIsOpened(!isOpened);
    };

    useGSAP(() => {
        gsap.set(navRef.current, { xPercent: 100 });
        gsap.set([linkRef.current, contactRef.current], { autoAlpha: 0, x: -20 });

        tl.current = gsap.timeline({ paused: true })
            .to(navRef.current, {
                xPercent: 0,
                duration: 1,
                ease: "power3.out",
            })
            .to(linkRef.current, {
                autoAlpha: 1,
                x: 0,
                stagger: 0.1,
                duration: 0.5,
                ease: "power3.out",
            }, "<")
            .to(contactRef.current, {
                autoAlpha: 1,
                x: 0,
                duration: 0.5,
                ease: "power2.out",
            }, "<+0.2");

        iconTl.current = gsap.timeline({ paused: true })
            .to(topLineRef.current, {
                rotation: 45,
                y: 3.3,
                duration: 0.3,
                ease: "power2.inOut",
            })
            .to(bottomLineRef.current, {
                rotation: -45,
                y: -3.3,
                duration: 0.3,
                ease: "power2.inOut",
            }, "<");
    }, []);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setShowBurger(currentScrollY < lastScrollY || currentScrollY < 10);
            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* Sidebar Menu */}
            <nav
                ref={navRef}
                className='fixed flex z-50 flex-col justify-between w-full h-full uppercase bg-gradient-to-br from-black via-neutral-900 to-black text-white/80 py-28 gap-y-10 md:w-1/2 md:left-1/2 px-10'
            >
                {/* Navigation Links */}
                <div className='flex flex-col text-5xl gap-y-2 md:text-6xl lg:text-8xl'>
                    {['home', 'services', 'about', 'work', 'contact'].map((section, index) => (
                        <div key={index} ref={(el) => (linkRef.current[index] = el)}>
                            <Link
                                offset={0}
                                smooth
                                duration={1500}
                                to={`${section}`}
                                className='transition-all duration-300 hover:text-white cursor-pointer'
                            >
                                {section}
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Contact Section */}
                <div ref={contactRef} className='flex flex-col flex-wrap justify-between gap-8 md:flex-row'>
                    <div className='font-light'>
                        <p className='tracking-wider text-white/50'>E-mail</p>
                        <p className='text-xl tracking-widest lowercase text-pretty'>
                            junaidafzal.dev@gmail.com
                        </p>
                    </div>

                    <div className='font-light'>
                        <p className='tracking-wider text-white/50'>Social Media</p>
                        <div className='flex flex-col md:flex-row gap-x-4 mt-2'>
                            {socials.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    aria-label={social.name}
                                    title={social.name}
                                    className='text-sm leading-loose tracking-widest uppercase hover:text-white transition-colors duration-300'
                                >
                                    {"{ "}{social.name}{" }"}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Burger Button */}
            <div
                aria-label="Menu Button"
                role="button"
                style={showBurger ? { clipPath: "circle(50.0% at 50% 50%)" } : { clipPath: "circle(0% at 50% 50%)" }}
                onClick={toggleMenu}
                className='fixed z-50 flex flex-col justify-center items-center gap-1 transition-all duration-300 bg-black rounded-full cursor-pointer w-14 h-14 md:w-20 md:h-20 top-4 right-10'
            >
                <span ref={topLineRef} className='block w-8 h-0.5 bg-white rounded-full origin-center'></span>
                <span ref={bottomLineRef} className='block w-8 h-0.5 bg-white rounded-full origin-center'></span>
            </div>
        </>
    );
}

export default Navbar;
