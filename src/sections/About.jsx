import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection"
import AnimatedTextLines from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const About = () => {
    const text = 'Building apps that connect\n design, performance, and scalability';
    const aboutText =
        'I am a software engineering student and developer specializing in Flutter, Dart, and modern web technologies. I focus on creating scalable, user-centric applications where clean design meets high performance.';

    const imgRef = useRef(null);
    useGSAP(() => {
        gsap.to("#about", {
            scale: 0.95,
            scrollTrigger: {
                trigger: "#about",
                start: "bottom 80%",
                end: "bottom 20%",
                scrub: true,
                markers: false,
            },
            ease: "power1.inOut"
        });

        gsap.set(imgRef.current, {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)"
        });
        gsap.to(imgRef.current, {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
            duration: 2,
            ease: "power4.out",
            scrollTrigger: {
                trigger: imgRef.current,

            }
        }
        );
    })
    return (
        <section id="about" className="min-h-screen bg-black rounded-b-4xl">
            <AnimatedHeaderSection subtitle={"Crafted with purpose, Engineered to perform"} title={"About"} text={text} textColor={"text-white"} withScrollTrigger={true} />
            <div className="flex flex-col gap-16 px-10 pb-16 text-xl font-light items-center justify-between tracking-wide lg:flex-row md:text-2xl lg:text-3xl text-white/60">
                <img ref={imgRef} src="images/man.jpeg" alt="Portrait of Junaid Afzal" className="w-md rounded-3xl" loading="lazy" decoding="async" fetchPriority="low" />
                <AnimatedTextLines text={aboutText} className={"w-full"} />
            </div>
        </section>
    )
}

export default About
