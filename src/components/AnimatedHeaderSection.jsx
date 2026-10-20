import { useRef } from "react";
import AnimatedTextLines from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
const AnimatedHeaderSection = ({ subtitle, title, text, textColor, withScrollTrigger = false, headingLevel = 2, fast = false }) => {
    const d = fast ? 0.6 : 1;
    const contextRef = useRef(null);
    const headerRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: withScrollTrigger ? {
                trigger: contextRef.current,
            } : undefined
        });
        tl.from(contextRef.current, {
            y: "50vh",
            duration: d,
            ease: 'circ.out',
        })
        tl.from(headerRef.current, {
            y: 200,
            opacity: 0,
            duration: d,
            ease: 'circ.out',
        }, "<+0.2")
        tl.from(contextRef.current, {
            scale: 0.8,
            duration: d,
            ease: 'back.out',
        }, "<")
    }, []);

    const safeLevel = Math.min(6, Math.max(1, Number(headingLevel) || 2));
    const HeadingTag = `h${safeLevel}`;

    return (
        <div ref={contextRef} >
            <div className="" style={{ clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0% 100%)" }}>
                <div ref={headerRef} className='flex flex-col justify-center gap-12 pt-16 sm:gap-16 '>
                    <p className={`text-sm font-light tracking-[0.5rem] uppercase px-10 ${textColor}`}>{subtitle}</p>
                    <div className="px-10">
                        <HeadingTag className={`uppercase ${textColor} banner-text-responsive leading-tight`}>
                            {title}
                        </HeadingTag>
                    </div>
                </div>
            </div>
            <div className={`relative px-10 ${textColor}`}>
                <div className="absolute inset-x-0 border-t-2" />
                <div className="py-12 sm:py-16 text-end">
                    <AnimatedTextLines text={text} className={`font-light uppercase value-text-responsive ${textColor}`} stagger={fast ? 0.1 : 0.3} duration={d} />


                </div>
            </div>
        </div>
    )
}

export default AnimatedHeaderSection
