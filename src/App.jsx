import { useEffect } from 'react';
import ReactLenis from 'lenis/react';
import { ScrollTrigger } from 'gsap/all';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import ServiceSummary from './sections/ServiceSummary';
import Services from './sections/Services';
import About from './sections/About';
import Experience from './sections/Experience';
import Works from './sections/Works';
import Stack from './sections/Stack';
import ContactSummary from './sections/ContactSummary';
import Contact from './sections/Contact';

const reducedMotion =
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

const App = () => {
    // Custom fonts shift layout once they swap in; re-measure scroll triggers afterwards.
    useEffect(() => {
        document.fonts?.ready.then(() => ScrollTrigger.refresh());
    }, []);

    return (
        <ReactLenis root options={{ smoothWheel: !reducedMotion, anchors: { duration: 1.4 } }}>
            <a href="#main-content" className="skip-link">Skip to content</a>
            <SpeedInsights />
            <Navbar />
            <main id="main-content" className="relative w-full overflow-x-clip">
                <Hero />
                <ServiceSummary />
                <Services />
                <About />
                <Experience />
                <Works />
                <Stack />
                <ContactSummary />
                <Contact />
            </main>
        </ReactLenis>
    );
};

export default App;
