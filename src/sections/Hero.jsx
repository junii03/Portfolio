import { useRef } from "react";

const Hero = () => {
    const contextRef = useRef(null);
    const headerRef = useRef(null)
    return (
        <section id='home' className='flex flex-col justify-end min-h-screen '>
            <div ref={contextRef} >
                <div style={{ clipPath: "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%);" }}>
                    <div ref={headerRef} className='flex flex-col items-center justify-center gap-12 pt-16 sm:gap-16 '>
                        <p className="text-sm font-light tracking-[0.5rem] uppercase px-10 text-black">404 No Bugs Found</p>
                        <div className="px-10">
                            <h1 className="flex flex-col flex-wrap uppercase gap-12 text-black banner-text-responsive sm:gap-16 md:block">
                                M. Junaid Afzal
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
