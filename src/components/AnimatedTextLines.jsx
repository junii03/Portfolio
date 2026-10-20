import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const AnimatedTextLines = ({ text, className, stagger = 0.3, duration = 1 }) => {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    const containerRef = useRef(null);
    const linesRef = useRef([]);


    useGSAP(() => {
        if (linesRef.current.length > 0) {
            gsap.from(linesRef.current, {
                y: 100,
                opacity: 0,
                duration,
                stagger,
                ease: 'back.out',
                scrollTrigger: {
                    trigger: containerRef.current,

                }
            })
        }
    });

    return (
        <div ref={containerRef} className={className}>
            {lines.map((line, index) => (
                <span
                    ref={(el) => (linesRef.current[index] = el)}
                    className="block leading-relaxed tracking-wide text-pretty"
                    key={index}>{line}</span>
            ))}
        </div>
    )
}

export default AnimatedTextLines
