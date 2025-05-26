import React, { useState, useRef, useEffect } from 'react';

/* Import the modals for each card */
import UltraRetortedMilk from '../components/retorted/UltraRetortedMilk'; 
import LactoseFreedom from '../components/retorted/LactoseFreedom';
import CaramelizedIncarnation from '../components/retorted/CaramelizedIncarnation';
import ProteinRevolution from '../components/retorted/ProteinRevolution';

/**
 * Retort Page – Frequently Asked Questions about Cow Juice’s Ultra‑Retorted Milk™
 * Matches the zany, typographic, animated UI used across the site.
 */

const Retorted = () => {

    const retortedRef = useRef(null);
    const [visible, setVisible] = useState(false);   // ← fire once

    /* When 30 % of container is visible, flip `visible` to true */
    useEffect(() => {
        const el = retortedRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                setVisible(true);
                observer.disconnect();          // run only once
            }
        },
        { threshold: 0.30 }                 // tweak as you like
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const anim = (cls) => (visible ? cls : 'opacity-0');   // or 'animate-none'

    // Handle modals
    const [modal, setModal] = useState(null);

    return (
        <>
            {/* ───────── Overlay + modal ───────── */}
            {modal && modal === 'ultra_retorted_milk' ? (
                <>
                    {/* dim + blur the page beneath */}
                    <div className="fixed inset-0 z-40 animate-fade animate-delay-[0ms]" />
                    {/* modal itself has higher z-index */}
                    <UltraRetortedMilk
                        onUnlock={() => setModal(null)}
                        class="z-50"          // give the modal a higher z if needed
                    />
                </>
            ) : modal === 'lactose_freedom' ? (
                <>
                    {/* dim + blur the page beneath */}
                    <div className="fixed inset-0 z-40 animate-fade animate-delay-[0ms]" />
                    {/* modal itself has higher z-index */}
                    <LactoseFreedom
                        onUnlock={() => setModal(null)}
                        class="z-50"          // give the modal a higher z if needed
                    />
                </>
            ) : modal === 'caramelized_incarnation' ? (
                <>
                    {/* dim + blur the page beneath */}
                    <div className="fixed inset-0 z-40 animate-fade animate-delay-[0ms]" />
                    {/* modal itself has higher z-index */}
                    <CaramelizedIncarnation
                        onUnlock={() => setModal(null)}
                        class="z-50"          // give the modal a higher z if needed
                    />
                </>
            ) : modal === 'protein_revolution' ? (
                <>
                    {/* dim + blur the page beneath */}
                    <div className="fixed inset-0 z-40 animate-fade animate-delay-[0ms]" />
                    {/* modal itself has higher z-index */}
                    <ProteinRevolution
                        onUnlock={() => setModal(null)}
                        class="z-50"          // give the modal a higher z if needed
                    />
                </>
            ) : (
                <></>
            )}
            <div ref={retortedRef} className={anim("inset-0 bg-cowjuice-gold/10 flex flex-1 flex-row items-start justify-center h-screen pt-12 px-6 pb-6 w-full border-b-[0.5px] border-black overflow-hidden transition-all duration-1000")}>
                <div className="flex flex-1  flex-col items-start justify-between max-w-6xl mx-auto w-full h-full space-y-16">
                    <div class="flex w-full flex-1 h-full justify-between items-between flex-col space-y-4">
                        <div className="flex relative w-full">
                            <p class={anim("absolute inset-0 top-0 sm:top-4 md:top-6 lg:top-8 text-xs font-mono font-bold uppercase animate-flip-down")}>This milk is</p>
                            <svg class="flex w-full sm:w-3/4" id="Layer_2" data-name="Layer 2" viewBox="0 0 346.44 140.19">
                                <g id="Layer_1-2" data-name="Layer 1">
                                    <g>
                                        <path class={anim("animate-fade-up sm:animate-fade-left animate-delay-[0ms] sm:animate-delay-[0ms]")} d="M17.74,114.25c-3.77.33-2.42,5.63-.91,22.92l-7.28.64L0,28.67c37.07-3.06,39.15,1.82,42.87,44.3,1.81,20.66.14,33.49-8.17,38.28l15.83,27.54-15.96,1.4c-11.27-21.69-14.32-26.16-16.82-25.94ZM21.94,63.81c-9.3.81-10.06,6.62-9.04,18.22,1,11.42,3.92,17.25,12.08,16.53,8.16-.71,11.16-5.55,10.03-18.47-1.15-13.1-3.77-17.1-13.07-16.28Z"/>
                                        <path class={anim("animate-fade-up sm:animate-fade-left animate-delay-[30ms] sm:animate-delay-[30ms]")} d="M46.76,28.99l32.28-2.82,3.04,34.75c-23.99,2.1-24.85,3.87-24.29,10.24.63,7.22,1.58,9.34,23.06,7.46l.95,10.91c-19.72,1.73-20.94,3.69-20.26,11.42.65,7.4,2.08,9.3,25.46,7.42l1.92,22-33.04,2.89-9.12-104.26Z"/>
                                        <path class={anim("animate-fade-up sm:animate-fade-left animate-delay-[60ms] sm:animate-delay-[60ms]")} d="M115.91,129.01l-7.41.65c-6.17-70.52-6.97-72.31-21.04-71.25l-3.04-34.75,36.68-3.21,2.64,30.23c-15.44,1.35-14.31,4.3-7.83,78.34Z"/>
                                        <path class={anim("animate-fade-up sm:animate-fade-left animate-delay-[90ms] sm:animate-delay-[90ms]")} d="M157.83,121.79c-19.6,1.71-23.78-12.81-28.06-61.84-2.32-26.52-.87-44.75,15.33-46.17,17.34-1.52,22.95,3.41,27.58,56.29,3.57,40.81-2.65,50.65-14.84,51.72ZM148.97,52.35c-11.06.97-11.66,9.99-10.37,24.77,1.29,14.78,4.86,23.77,14.54,22.92,9.68-.85,12.93-8.41,11.46-25.19-1.47-16.79-4.7-23.45-15.63-22.49Z"/>
                                        <path class={anim("animate-fade-up sm:animate-fade-left animate-delay-[120ms] sm:animate-delay-[12ms]")} d="M192.95,98.92c-3.77.33-2.42,5.63-.91,22.92l-7.28.64-9.55-109.14c37.07-3.06,39.15,1.82,42.87,44.3,1.81,20.66.14,33.49-8.17,38.28l15.83,27.54-15.96,1.4c-11.27-21.69-14.32-26.16-16.82-25.94ZM197.14,48.48c-9.3.81-10.06,6.62-9.04,18.22,1,11.42,3.92,17.25,12.08,16.53,8.16-.71,11.16-5.55,10.03-18.47-1.15-13.1-3.77-17.1-13.07-16.28Z"/>
                                        <path class={anim("animate-fade-up sm:animate-fade-left animate-delay-[160ms] sm:animate-delay-[160ms]")} d="M249.5,117.33l-7.41.65c-6.17-70.52-6.97-72.31-21.04-71.25l-3.04-34.75,36.68-3.21,2.64,30.23c-15.46,1.35-14.31,4.3-7.83,78.34Z"/>
                                        <path class={anim("animate-fade-up sm:animate-fade-left animate-delay-[210ms] sm:animate-delay-[210ms]")} d="M261.55,10.2l32.28-2.82,3.04,34.75c-23.99,2.1-24.85,3.87-24.29,10.24.63,7.22,1.58,9.34,23.06,7.46l.95,10.91c-19.72,1.73-20.94,3.69-20.26,11.42.65,7.4,2.08,9.3,25.46,7.42l1.92,22-33.04,2.89-9.12-104.26Z"/>
                                        <path class={anim("animate-fade-up sm:animate-fade-left animate-delay-[280ms] sm:animate-delay-[280ms]")} d="M310.5,107.92L301.11.63c27.76-2.43,39.78.42,43.26,40.22,5.01,57.24,3.42,63.65-33.87,67.08ZM321.94,36.21c-7.78.68-9.53,5.39-7.79,25.2,1.84,21,4.24,23.83,10.02,23.33,12.56-1.1,14.82-5.7,13.27-23.33-1.85-21.16-4.82-26.14-15.5-25.2Z"/>
                                    </g>
                                </g>
                            </svg>
                            <p class={anim("w-1/3 sm:w-1/6  absolute -bottom-8 sm:bottom-4 md:bottom-6 lg:bottom-8 right-0 text-[10px] leading-3 text-right text-black font-mono font- uppercase animate-flip-down animate-pulse border-[0.5px] border-black rounded-sm bg-white p-1")}>Click the cards to learn about ultra-retorted milk:</p>
                        </div>
                        {/* Content of the page, gonna be rotate cause we can */}
                        <div class="flex w-full items-center flex-col pt-8 space-y-8 sm:space-y-4">
                            <div class="flex w-full items-center justify-end">
                                <button onClick={() => setModal('ultra_retorted_milk')} class={anim("flex flex-col w-full sm:w-1/2 rotate-[7deg] py-4 px-2 bg-white border-[0.5px] border-black rounded-lg animate-fade animate-delay-[300ms] hover:bg-zinc-100 transition-colors duration-300 cursor-pointer")}>
                                    {/* Page intro */}
                                    <div className="w-full flex flex-col items-start justify-start font-mono text-xs uppercase rounded-sm border-black dark:bg-white dark:border-white dark:text-black animate-flip-down space-y-1">
                                        <span class="font-bold"><span class="text-cowjuice-bronze border-[0.5px] border-cowjuice-bronze rounded-sm px-[2px]">Ultra-Retorted Milk™</span>, Def. 1(a):</span>
                                        <p class="text-left text-[10px] leading-3">The revolutionary pasteurization process which caramelizes milk to turn it into this ever-so-slightly sweeter, <span class="text-cowjuice-bronze font-bold border-[0.5px] border-cowjuice-bronze px-[2px] rounded-sm">butterscotchy</span> can of lactose-free cow juice.</p>
                                    </div>
                                </button>
                            </div>
                            <div class="flex w-full items-center justify-start">
                                <button onClick={() => setModal('lactose_freedom')} class={anim("z-25 flex flex-col w-full justify-start sm:w-1/2 rotate-[-9deg] py-4 px-2 bg-white border-[0.5px] border-black rounded-lg animate-fade animate-delay-[450ms] hover:bg-zinc-100 transition-colors duration-300 cursor-pointer")}>
                                    {/* Page intro */}
                                    <div className="w-full flex flex-col items-start justify-start font-mono text-xs uppercase rounded-sm border-black dark:bg-white dark:border-white dark:text-black animate-flip-down space-y-1">
                                        <span class="font-bold"><span class="text-cowjuice-bronze font-bold border-[0.5px] border-cowjuice-bronze rounded-sm px-[2px]">Lactose</span>-<span class="text-cowjuice-bronze border-[0.5px] border-cowjuice-bronze font-bold rounded-sm px-[2px]">Freedom™</span> | The Liberation of Milk™</span>
                                        <p class="text-left text-[10px] leading-3">"Twelve score and seven years ago, our forefathers boldly declared: "Give me liberty -- or give me lactose." In the same brazen spirit which characterizes this great land we call planet milk, Cow Juice Inc. is proud to announce that Ultra-Retorted Milk has been liberated from lactose, and shall henceforth be known as the free-est milk in the land!"<sup>[1]</sup></p>
                                    </div>
                                </button>
                            </div>
                            <div class="flex w-full items-center justify-end">
                                <button onClick={() => setModal('caramelized_incarnation')} class={anim("flex flex-col w-full sm:w-1/2 rotate-[3deg] py-4 px-2 bg-white border-[0.5px] border-black rounded-lg animate-fade animate-delay-[600ms] hover:bg-zinc-100 transition-colors duration-300 cursor-pointer")}>
                                    {/* Page intro */}
                                    <div className="w-full flex flex-col items-start justify-center font-mono  uppercase rounded-sm border-black dark:bg-white dark:border-white dark:text-black animate-flip-down space-y-1">
                                        <span class="font-bold text-[12px] leading-3">The <span class="text-cowjuice-bronze border-[0.5px] border-cowjuice-bronze rounded-sm px-[2px]">Caramelized</span> Incarnation of Moo Juice™</span>
                                        <p class="text-left text-[10px] leading-3">Retortation has imparted into these glorious cans of Cow Juice a degree of caramelization heretofor thought unimaginable in the minds of dairy industry experts and milk enthusiasts alike. Ultra-Retorted Milk bears the flavor-sophistication reminiscent of what one might plausibly expect if milk were to board a red-eye to Paris, plop its juicy-self down in a cafe on the River Seine, and emerge the Francophilian nightmare the American Dairy Cow has feared all along.<sup>[2]</sup></p>
                                    </div>
                                </button>
                            </div>
                            <div class="flex w-full items-center justify-start">
                                <button onClick={() => setModal('protein_revolution')} class={anim("z-25 flex flex-col w-full justify-start sm:w-1/2 rotate-[12deg] py-4 px-2 bg-white border-[0.5px] border-black rounded-lg animate-fade animate-delay-[750ms] hover:bg-zinc-100 transition-colors duration-300 cursor-pointer")}>
                                    {/* Page intro */}
                                    <div className="w-full flex flex-col items-start justify-center font-mono text-xs uppercase rounded-sm border-black dark:bg-white dark:border-white dark:text-black animate-flip-down space-y-1">
                                        <span class="font-bold">A <span class="text-cowjuice-bronze font-bold border-[0.5px] border-cowjuice-bronze rounded-sm px-[2px]">Protein</span> Breakthrough: The Naturaler <span class="text-cowjuice-bronze border-[0.5px] border-cowjuice-bronze font-bold rounded-sm px-[2px]">Whey</span></span>
                                        <p class="text-left text-[10px] leading-3">We do believe that complete, chemical-free protein should be freely accessible to all who crave moo-scle building eventualities. Which is why we have juiced the cow; because the juice of a cow is only the most complete form of protein known to man -- and the place from which whey protein comes from anyway) ...<sup>[3]</sup></p>
                                    </div>
                                </button>
                            </div>
                        </div>
                        
                    </div>
                    <div class="flex w-full items-center justify-end">
                        <div class="flex w-full sm:w-1/2 border-[0.5px] rounded-sm border-black py-4 px-4 h-full flex-col items-center justify-center sm:items-start space-y-2 animate-fade animate-delay-[1050ms]">
                            <p class="text-xs font-mono uppercase">We hereby humbly submit, with the evidence of the reasons above, that Cow Juice and Ultra-Retorted Milk will not just change the world, not just change this cosmic sphere commonly known as planet milk, but will in fact alter the fundamental nature and character of the galaxy itself - by, naturally, ripping a whole in the space-time continuum as large as the Cow itself - and thereby rename this galaxy we call home: <span class="text-cowjuice-bronze border-[0.5px] border-cowjuice-bronze px-[2px] rounded-sm font-bold">The cow juicy way</span>.<span class="inline-flex ml-2 h-2.5 w-2.5 bg-cowjuice-bronze"></span></p>
                        </div>
                    </div>
                    
                    {/* Footnotes */}
                    <div class="flex flex-1 w-full sm:w-1/2 border-t-[0.5px] border-black pt-4 h-full flex-col items-center justify-center sm:items-start space-y-2 animate-fade animate-delay-[1050ms]">
                        <p class="text-[10px] font-mono uppercase opacity-60 leading-3"><sup>[1]</sup> One may be inspired to recall the words of another great American: "Free at last, free at last, thank god almightly milk is free at last!"</p>
                        <p class="text-[10px] font-mono uppercase opacity-60 leading-3"><sup>[2]</sup> Lest anyone doubt: Cow Juice is proudly made in America, with the juice of American Dairy Cows.</p>
                        <p class="text-[10px] font-mono uppercase opacity-60 leading-3"><sup>[3]</sup> Cow Juice boasts the most natural 1.1 grams of protein per fluid oz on earth, free of any and all additives, stabilizers, emulsifiers, and other unpronounceable ingredients.</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Retorted;