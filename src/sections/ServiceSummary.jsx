import { useGSAP } from "@gsap/react"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const ServiceSummary = () => {
    useGSAP(() => {
        gsap.to('#title-service-1', {
            xPercent: 20,
            scrollTrigger: { trigger: '#title-service-1', scrub: true }
        });
        gsap.to('#title-service-2', {
            xPercent: -30,
            scrollTrigger: { trigger: '#title-service-2', scrub: true }
        });
        gsap.to('#title-service-3', {
            xPercent: 50,
            scrollTrigger: { trigger: '#title-service-3', scrub: true }
        });
        gsap.to('#title-service-4', {
            xPercent: -50,
            scrollTrigger: { trigger: '#title-service-4', scrub: true }
        });
    });

    return (
        <section aria-hidden="true" className="mt-20 overflow-hidden font-light leading-snug text-center mb-42 contact-text-responsive">
            <div id='title-service-1'>
                <p>Architecture</p>
            </div>
            <div id='title-service-2' className="flex items-center justify-center gap-3">
                <p className="font-normal">Mobile</p>
                <div className="w-10 h-1 md:w-32 bg-gold" />
                <p>Backend</p>
            </div>
            <div id='title-service-3' className="flex items-center justify-center gap-3">
                <p className="font-normal">Flutter</p>
                <div className="w-10 h-1 md:w-32 bg-gold" />
                <p className="italic">React Native</p>
                <div className="w-10 h-1 md:w-32 bg-gold" />
                <p>NestJS</p>
            </div>
            <div id='title-service-4' className="flex items-center justify-center gap-3">
                <p>AI &amp; Real-time</p>
            </div>
        </section>
    )
}

export default ServiceSummary;
