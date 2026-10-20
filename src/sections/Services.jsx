import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection"
import { servicesData, servicesIntro } from "../constants";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Services = () => {
    const seriveRef = useRef([]);
    const isDesktop = useMediaQuery({ minWidth: 768 });
    useGSAP(() => {
        seriveRef.current.forEach((el) => {
            if (el) {
                gsap.from(el, {
                    y: 200,



                    duration: 1,
                    ease: 'circ.out',
                    scrollTrigger: {
                        trigger: el,
                        start: "top 80%",

                    }
                });
            }
        });
    }, []);
    return (
        <section id="services" className="relative min-h-screen bg-black rounded-t-4xl">
            <AnimatedHeaderSection
                subtitle={servicesIntro.subtitle}
                title={servicesIntro.title}
                text={servicesIntro.text}
                textColor="text-white"
                withScrollTrigger={true}
            />

            {servicesData.map((service, index) => (
                <div
                    key={index}
                    ref={el => (seriveRef.current[index] = el)}
                    className="sticky pt-6 px-10 pb-12 text-white bg-black border-t-2 border-white/30"
                    style={isDesktop ? {
                        top: `calc(10vh + ${index * 5}em)`,
                        marginBottom: `${(servicesData.length - index - 1) * 5}rem`
                    } : {
                        top: 0,
                    }}
                >
                    <div className="flex items-center gap-4 justify-between font-light">
                        <div className="flex flex-col gap-6">
                            <h3 className="text-4xl lg:text-5xl">{service.title}</h3>
                            <p className="text-xl leading-relaxed tracking-widest lg:text-2xl text-white/60 text-pretty">
                                {service.description}
                            </p>
                            <div className="flex flex-col gap-2 text-2xl sm:gap-4 lg:text-3xl text-white/80">
                                {service.items.map((item, itemIndex) => (
                                    <div key={`item-${index}-${itemIndex}`}>
                                        <h4 className="flex items-baseline">
                                            <span className="mr-12 text-lg text-white/30">0{itemIndex + 1}</span>
                                            {item.title}
                                            <span className="ml-4 hidden text-base text-white/40 md:inline">{item.description}</span>
                                        </h4>
                                        {itemIndex < service.items.length - 1 && (
                                            <div className="w-full h-px my-2 bg-white/30"></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default Services;
