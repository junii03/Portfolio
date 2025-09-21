import { useGSAP } from "@gsap/react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection"
import Marquee from "../components/Marquee";
import { socials } from "../constants";
import gsap from "gsap";

const Contact = () => {
    const text = "Have a project, an idea, or just want to connect?\nMy inbox is always open. Let’s talk.";
    const items = [
        "Ideas to Reality",
        "Code with Vision",
        "Design the Future",
        "Dream. Build. Grow.",
    ];


    useGSAP(() => {
        gsap.from('.social-link', {
            y: 100,
            opacity: 0,
            delay: 0.5,
            duration: 1,
            stagger: 0.3,
            ease: "back.out",
            scrollTrigger: {
                trigger: ".social-link",
            }
        })
    }, [])
    return (
        <section id="contact" className="min-h-screen flex flex-col justify-between bg-black">
            <div>
                <AnimatedHeaderSection subtitle={"Ideas into Code, Conversations into Collaboration"} title={"Contact"} text={text} textColor={"text-white"} withScrollTrigger={true} />
            </div>
            <div className="flex px-10 font-light text-white uppercase lg:text-[32px] text-[26px] leading-none  mb-10 ">
                <div className="flex flex-col w-full gap-10">
                    <div className="social-link">
                        <h2>
                            E-mail
                        </h2>
                        <div className="w-full h-px my-2 bg-white/30" />
                        <p className="lowercase md:text-2xl ld:text-3xl tracking-wider">junaidafzal.dev@gmail.com</p>
                    </div>
                    <div className="social-link">
                        <h2>
                            Phone
                        </h2>
                        <div className="w-full h-px my-2 bg-white/30" />
                        <p className="lowercase md:text-2xl ld:text-3xl tracking-wider">+92 303 8455524</p>
                    </div>
                    <div className="social-link">
                        <h2>
                            Social Media
                        </h2>
                        <div className="w-full h-px my-2 bg-white/30" />
                        <div className="flex flex-wrap gap-2">
                            {socials.map((social, index) => (
                                <a key={index} href={social.href} target="_blank" rel="noopener noreferrer" className="md:text-sm text-xs tracking-widest leading-loose hover:text-white/80 transition-colors uppercase cursor-pointer">
                                    {"{"}  {social.name} {"}"}
                                </a>
                            )
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Marquee items={items} className="text-white bg-transparent" />
        </section>
    )
}

export default Contact
