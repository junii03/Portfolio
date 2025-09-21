import React, { useRef, useState } from 'react'
import AnimatedHeaderSection from '../components/AnimatedHeaderSection'
import { projects } from '../constants';
import { Icon } from '@iconify/react/dist/iconify.js';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Works = () => {
    const [currentIndex, setCurrentIndex] = useState(null)
    const text = 'Featured projects that showcase my skills\n and passion for creating impactful digital solutions';
    const previewRef = useRef(null);
    const mouse = useRef({ x: 0, y: 0 });
    const moveX = useRef(null);
    const moveY = useRef(null);
    const overlayRef = useRef([]);

    useGSAP(() => {
        moveX.current = gsap.quickTo(previewRef.current, "x", {
            duration: 1.5,
            ease: "power3.out",
        });
        moveY.current = gsap.quickTo(previewRef.current, "y", {
            duration: 2,
            ease: "power3.out",
        });

        gsap.from("#project", {
            y: 100,
            opacity: 0,
            delay: 0.5,
            stagger: 0.3,
            duration: 1,
            ease: "back.out",
            scrollTrigger: {
                trigger: "#project",

            }
        })
    })
    const handleMouseEnter = (index) => {
        if (window.innerWidth < 768) return; // Prevent hover effect on mobile
        setCurrentIndex(index);
        const overlayElement = overlayRef.current[index];
        if (!overlayElement) return;
        gsap.killTweensOf(overlayElement);
        gsap.fromTo(overlayElement,
            {
                clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
            },
            {
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                duration: 0.15,
                ease: "power2.out",
            }
        );


        gsap.to(previewRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",

        });
    }
    const handleMouseLeave = (index) => {
        if (window.innerWidth < 768) return; // Prevent hover effect on mobile
        setCurrentIndex(null);

        const overlayElement = overlayRef.current[index];
        if (!overlayElement) return;
        gsap.killTweensOf(overlayElement);
        gsap.to(overlayElement, {
            clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
            duration: 0.15,
            ease: "power2.out",
        });
        gsap.to(previewRef.current, {
            opacity: 0,
            scale: 0.5,
            duration: 0.3,
            ease: "power2.out",

        });
    }

    const handleMouseMove = (e) => {
        if (window.innerWidth < 768) return; // Prevent hover effect on mobile
        mouse.current.x = e.clientX + 24;
        mouse.current.y = e.clientY + 24;
        moveX.current(mouse.current.x);
        moveY.current(mouse.current.y);
    }


    return (
        <section id='work' className='flex flex-col min-h-screen'>
            <AnimatedHeaderSection subtitle={"Logic meets Aesthetics, Seamlessly"} title={"Works"} text={text} textColor={"text-black"} withScrollTrigger={true} />
            <div className='relative flex flex-col font-light' onMouseMove={handleMouseMove}>
                {projects.map((project, index) => (
                    <div key={project.id} id='project' className='relative flex flex-col gap-1 py-5 cursor-pointer group md:gap-0' onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={() => handleMouseLeave(index)} onClick={() => window.open(project.href, '_blank', 'noopener,noreferrer')}>
                        {/* overlay */}
                        <div
                            className='absolute inset-0 hidden md:block duration-200 bg-gradient-to-r from-black/90 via-black/70 to-black/90 -z-10 clip-path'
                            ref={(el) => { overlayRef.current[index] = el }}
                        />
                        {/* title + one-liner */}
                        <div className='flex flex-col px-10 text-black transition-all duration-500 md:group-hover:px-12 md:group-hover:text-white'>
                            <div className="flex justify-between items-center">
                                <h2 className='lg:text-[32px] text-[26px] leading-none '>
                                    {project.name}
                                </h2>
                                <Icon icon="mynaui:arrow-up-right-square" className='md:size-6 size-5' />
                            </div>
                            {project.description && (
                                <p className="mt-1 text-sm md:text-base text-black/70 md:group-hover:text-white/80">
                                    {project.description}
                                </p>
                            )}
                        </div>
                        {/* divider */}
                        <div className='w-full h-0.5 bg-black/80' />
                        {/* framework */}
                        <div className='flex px-10 text-xs leading-loose transition-all duration-500 md:text-sm gap-x-5 md:group-hover:px-12'> {project.frameworks.map((framework) => (
                            <p key={framework.id} className='transition-colors duration-500 text-black md:group-hover:text-white' >{framework.name}</p>
                        ))}</div>
                        {/* mobile preview images */}
                        <div className='relative flex items-center justify-center px-10 md:hidden h-[400px]'>
                            <img src={project.bgImage} alt={`${project.name}-bg-img`} className='object-cover w-full h-full rounded-md brightness-50' loading='lazy' decoding='async' fetchpriority='low' />
                            <img src={project.image} alt={`${project.name}-mobile-img`} className=' absolute bg-center px-14 rounded-md' loading='lazy' decoding='async' fetchpriority='low' />
                        </div>
                    </div>
                ))}
                {/* desktop floating preview */}
                <div ref={previewRef} className='fixed -top-2/6  left-0 z-50 overflow-hidden border-8 border-black pointer-events-none w-[960px] md:block opacity-0  hidden rounded-2xl'>
                    {currentIndex !== null && projects[currentIndex] && (
                        <img src={projects[currentIndex].image} alt={`${projects[currentIndex].name} preview`} className='object-cover w-full h-full rounded-md' loading='lazy' decoding='async' fetchpriority='low' />
                    )}
                </div>
            </div>
        </section>
    )
}

export default Works
