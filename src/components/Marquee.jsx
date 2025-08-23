import { Icon } from "@iconify/react/dist/iconify.js";
import gsap from "gsap";
import { Observer } from "gsap/all";
import { useEffect, useRef, useState, useCallback } from "react";

gsap.registerPlugin(Observer);

export default function Marquee({
    items = [],
    className = "text-white bg-black",
    icon = "mdi:star-four-points",
    iconClassName = "",
    reverse = false,
    speed = 100 // px / second base speed (increase to go faster)
}) {
    const containerRef = useRef(null);
    const contentRef = useRef(null);

    // number of duplicated sets to render (dynamic)
    const [copies, setCopies] = useState(2);

    // runtime refs for the ticker-based animation
    const singleWidthRef = useRef(0);
    const posRef = useRef(0); // current transform x (px)
    const lastTimeRef = useRef(performance.now());
    const runningRef = useRef(true);
    const speedObjRef = useRef({ v: 1 }); // animated multiplier (can be negative to reverse)
    const quickSetterRef = useRef(null);
    const roRef = useRef(null);
    const observerRef = useRef(null);

    // helper to build one set of items
    const buildSingleSet = (keyBase = "") => (
        <div
            key={keyBase}
            className="marquee-set inline-flex items-center whitespace-nowrap"
            style={{ display: "inline-flex", whiteSpace: "nowrap" }}
            aria-hidden="true"
        >
            {items.map((text, idx) => (
                <span
                    key={`${keyBase}-${idx}`}
                    className="flex items-center px-8 md:px-16 gap-x-4 md:gap-x-8"
                    style={{ display: "inline-flex", whiteSpace: "nowrap" }}
                >
                    {text} <Icon icon={icon} className={iconClassName} />
                </span>
            ))}
        </div>
    );

    // Compute how many copies we need so total content > container + singleWidth (safe loop)
    const computeCopies = useCallback(() => {
        const container = containerRef.current;
        const content = contentRef.current;
        if (!container || !content) return;

        const firstChild = content.children[0];
        if (!firstChild) return;

        const singleW = Math.max(1, Math.ceil(firstChild.getBoundingClientRect().width));
        singleWidthRef.current = singleW;

        const containerW = container.getBoundingClientRect().width;

        // ensure enough copies that total width > container + one single set (buffer)
        const needed = Math.max(2, Math.ceil((containerW + singleW) / singleW));
        const finalCopies = Math.max(2, needed + 1); // +1 buffer

        setCopies(prev => (prev !== finalCopies ? finalCopies : prev));
    }, []);

    // Initialize quickSetter and reset position
    const initTicker = useCallback(() => {
        const content = contentRef.current;
        if (!content) return;

        // Set initial transform
        posRef.current = 0;
        gsap.set(content, { x: 0, force3D: true, overwrite: true });

        // quickSetter for super-fast transform writes with no layout queries
        quickSetterRef.current = gsap.quickSetter(content, "x", "px");

        // reset lastTime
        lastTimeRef.current = performance.now();
    }, []);

    // The smooth ticker that moves the content each frame
    useEffect(() => {
        // don't start until DOM ready
        initTicker();

        function tick() {
            if (!runningRef.current || !contentRef.current) return;

            const now = performance.now();
            const dt = Math.max(0, (now - lastTimeRef.current) / 1000); // seconds
            lastTimeRef.current = now;

            const singleW = singleWidthRef.current || 1;
            const baseDir = reverse ? 1 : -1; // -1 moves left
            const effectiveSpeed = Math.max(1, speed) * speedObjRef.current.v; // px/sec * multiplier

            // update position
            posRef.current += baseDir * effectiveSpeed * dt;

            // wrap to keep pos within [-singleW, singleW] for numeric stability
            if (posRef.current <= -singleW) posRef.current += singleW;
            if (posRef.current >= singleW) posRef.current -= singleW;

            // write transform via quickSetter
            if (quickSetterRef.current) quickSetterRef.current(posRef.current);
            else if (contentRef.current) contentRef.current.style.transform = `translate3d(${posRef.current}px,0,0)`;
        }

        // attach to gsap ticker (uses RAF internally, integrates with GSAP smoothness)
        gsap.ticker.add(tick);
        return () => {
            gsap.ticker.remove(tick);
        };
    }, [initTicker, reverse, speed]);

    // ResizeObserver/resize listener to recompute copies and re-init ticker
    useEffect(() => {
        computeCopies();
        // debounce helper
        let t;
        if (typeof ResizeObserver !== "undefined") {
            roRef.current = new ResizeObserver(() => {
                clearTimeout(t);
                t = setTimeout(() => {
                    computeCopies();
                    // re-init quickSetter & reset position after DOM update
                    requestAnimationFrame(() => initTicker());
                }, 100);
            });
            if (containerRef.current) roRef.current.observe(containerRef.current);
            if (contentRef.current) roRef.current.observe(contentRef.current);
        } else {
            const onResize = () => {
                clearTimeout(t);
                t = setTimeout(() => {
                    computeCopies();
                    requestAnimationFrame(() => initTicker());
                }, 120);
            };
            window.addEventListener("resize", onResize);
            return () => {
                window.removeEventListener("resize", onResize);
            };
        }

        return () => {
            if (roRef.current) {
                try { roRef.current.disconnect(); } catch (e) {
                    console.log(e);
                }
            }
        };
    }, [computeCopies, initTicker]);

    // Scroll Observer that temporarily changes multiplier (smoothly) — reduces jitter by animating the multiplier
    useEffect(() => {
        observerRef.current = Observer.create({
            onChangeY(self) {
                // choose a multiplier; can be negative to reverse briefly
                let factor = 1.8;
                if ((!reverse && self.deltaY < 0) || (reverse && self.deltaY > 0)) factor *= -1;
                // animate multiplier to factor quickly then back to 1
                gsap.killTweensOf(speedObjRef.current);
                gsap.to(speedObjRef.current, {
                    v: factor,
                    duration: 0.12,
                    overwrite: true,
                    onUpdate: () => { /* tick reads v each frame */ }
                });
                gsap.to(speedObjRef.current, { v: 1, duration: 0.6, delay: 0.08 });
            }
        });
        return () => {
            try { observerRef.current && observerRef.current.kill && observerRef.current.kill(); } catch (e) {
                console.log(e);
            }
        };
    }, [reverse]);

    // Pause/resume on hover (pauses ticker updates)
    const handleMouseEnter = () => (runningRef.current = false);
    const handleMouseLeave = () => {
        // resume and reset time baseline to avoid big dt spike
        runningRef.current = true;
        lastTimeRef.current = performance.now();
    };

    // When copies change we must rebuild sets (useEffect triggers a DOM update)
    useEffect(() => {
        // after DOM updates, reinitialize quickSetter + reset pos so visual seam doesn't jitter
        requestAnimationFrame(() => initTicker());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [copies]);

    // Build sets array
    const sets = [];
    for (let i = 0; i < copies; i++) sets.push(buildSingleSet(`set-${i}`));

    return (
        <div
            ref={containerRef}
            className={`overflow-hidden w-full h-20 md:h-[100px] flex items-center marquee-text-responsive font-light uppercase ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            aria-hidden="true"
            role="presentation"
            style={{
                willChange: "transform",
                WebkitFontSmoothing: "antialiased",
                transformStyle: "preserve-3d",
                // avoid layout paint on transform: use translate3d in writes
            }}
        >
            <div
                ref={contentRef}
                className="inline-flex"
                style={{ display: "inline-flex", whiteSpace: "nowrap", transform: "translate3d(0,0,0)" }}
            >
                {sets}
            </div>
        </div>
    );
}
