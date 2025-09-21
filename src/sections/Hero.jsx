import { Canvas } from "@react-three/fiber";
import { Planet } from "../components/Planet";
import { Environment, Float, Lightformer, Preload, AdaptiveDpr } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { useEffect, useRef, useState } from "react";

const Hero = () => {
    const isMobile = useMediaQuery({ maxWidth: 853 });
    const text = 'Software Engineer & Developer\nbuilding scalable apps from mobile to web\nwhere design meets performance';

    // Pause 3D rendering when not visible or tab hidden
    const sectionRef = useRef(null);
    const [running, setRunning] = useState(true);

    useEffect(() => {
        const el = sectionRef.current;
        let visible = true;
        const computeRun = () => setRunning(visible && !document.hidden);

        // IntersectionObserver to check if section is on screen
        const io = typeof IntersectionObserver !== 'undefined' ? new IntersectionObserver((entries) => {
            const entry = entries[0];
            visible = !!entry?.isIntersecting;
            computeRun();
        }, { threshold: 0.05 }) : null;
        if (io && el) io.observe(el);

        // Page visibility
        const onVis = () => computeRun();
        document.addEventListener('visibilitychange', onVis);

        return () => {
            if (io) try { io.disconnect(); } catch (e) { if (import.meta?.env?.DEV) console.debug(e); }
            document.removeEventListener('visibilitychange', onVis);
        };
    }, []);


    return (
        <section ref={sectionRef} id='home' className='flex flex-col justify-end min-h-screen '>
            <AnimatedHeaderSection subtitle={"404 No Bugs Found"} title={"Junaid Afzal"} text={text} textColor={"text-black"} headingLevel={1} />
            <figure className="absolute inset-0  -z-50 " style={{ width: "100vw", height: "100vh" }}>
                <Canvas
                    shadows
                    frameloop={running ? 'always' : 'never'}
                    dpr={[1, 1.5]}
                    gl={{ antialias: false, powerPreference: 'high-performance' }}
                    camera={{ position: [0, 0, -10], fov: 17.5, near: 1, far: 20 }}
                >
                    <AdaptiveDpr pixelated />
                    <ambientLight intensity={0.5} />
                    <Float speed={0.5}>
                        <Planet scale={isMobile ? 0.7 : 1} />
                    </Float>

                    <Environment resolution={256}>
                        <group rotation={[-Math.PI / 3, 4, 1]} >
                            <Lightformer
                                form={"circle"}
                                intensity={2}
                                scale={10}
                                position={[0, 3, 1]}
                            />
                            <Lightformer
                                form={"circle"}
                                intensity={2}
                                scale={10}
                                position={[-5, -1, -1]}
                            />
                            <Lightformer
                                form={"circle"}
                                intensity={2}
                                scale={16}
                                position={[10, 1, 0]}
                            />
                        </group>
                    </Environment>

                    <Preload all />
                </Canvas>
            </figure>
        </section>
    )
}

export default Hero
