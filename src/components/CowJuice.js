import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Typewriter from 'typewriter-effect';

import cowjuice from '../assets/cowjuice.svg'; // Import the Cow Juice logo if needed
import cowjuice_lined from '../assets/cowjuice_lined.svg'; // Import the Cow Juice lined logo if needed
import bull_silhouette from '../assets/bull_silhouette.svg'; // Import the Bull silhouette if needed
import bull_silhouette_simple from '../assets/bull_silhouette_simple.svg'; // Import the Bull silhouette if needed
import bull_fill from '../assets/bull_fill.svg'; // Import the Bull silhouette if needed

/* Import the modals for each card */
import BuyNowModal from '../components/BuyNowModal';

/**
 * Cow Juice Component – the card that introduced Cow Juice’s Ultra‑Retorted Milk™
 * Matches the zany, typographic, animated UI used across the site.
 */

const CowJuice = () => {
    const navigate = useNavigate();

    const cowjuiceRef = useRef(null);
    const [visible, setVisible] = useState(false);   // ← fire once

    /* When 30 % of container is visible, flip `visible` to true */
    useEffect(() => {
        const el = cowjuiceRef.current;
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

    const [readyForNextTyping, setReadyForNextTyping] = useState(false);
    const [typingComplete, setTypingComplete] = useState(false);

    const handleEnterSite = () => {
        const section = cowjuiceRef.current;
        if (!section) return;

        // 1️⃣ Figure out the exact scroll target:
        const startY   = window.pageYOffset;
        const targetY  = section.offsetTop + section.offsetHeight;
        const distance = targetY - startY;
        const overshoot = 0;            // how far past you want the little bounce
        const duration  = 1250;           // total animation time in ms

        // 2️⃣ The “easeOutBack” function gives that overshoot-and-settle feel:
        const easeOutBack = (x) => {
            const c1 = 0.0; // custom overshoot factor
            const c3 = c1 + 1;
            return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
        };

        let startTime = null;
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased    = easeOutBack(progress);

            // scroll to current eased position (with overshoot baked in)
            window.scrollTo(0, startY + (distance + overshoot) * eased);

            if (elapsed < duration) {
            requestAnimationFrame(step);
            } else {
            // 3️⃣ snap back exactly to our true target
            window.scrollTo({ top: targetY, behavior: 'smooth' });
            }
        };

        requestAnimationFrame(step);
    };


    return (
        <>
            {modal && (
                <>
                    <div className="fixed inset-0 z-40 animate-fade animate-delay-[0ms]" />
                    <BuyNowModal
                        onUnlock={() => setModal(null)}
                        class="z-50"          
                    />
                </>
            )}
            <div ref={cowjuiceRef} className={anim("inset-0 bg-cowjuice-gold/10 relative z-20 flex flex-1 flex-row items-start justify-center pt-12 px-6 pb-6 w-full border-b-[0.5px] border-black overflow-hidden transition-all duration-1000")}>
                <div className="flex flex-1  flex-col items-start justify-between max-w-6xl mx-auto w-full h-full space-y-16">
                    <div class="flex w-full flex-1 h-full justify-between items-between flex-col space-y-4 pb-12">
                        <div className="flex relative w-full">
                            {/* <p class={anim("absolute inset-0 top-0 sm:top-4 md:top-6 lg:top-8 text-xs font-mono font-bold uppercase animate-flip-down")}>This milk is</p> */}
                            <svg xmlns="http://www.w3.org/2000/svg" class="hidden sm:flex w-full sm:w-3/4" id="Layer_2" data-name="Layer 2" viewBox="0 0 337.48 132.34">
                                <g id="Layer_1-2" data-name="Layer 1">
                                    <g>
                                    <path class={anim("animate-fade-up sm:animate-fade-right animate-delay-[280ms] sm:animate-delay-[0ms]")} d="M10.05,87.12c1.6,18.33,7.06,21.58,26.87,20.01l2.18,24.89c-25.7,2.08-34.01-4.98-38.18-52.57C-3.03,34.22,5.49,24.83,31.02,22.43l3.63,41.52c-22.91,2.17-26.18,5.17-24.6,23.16Z"/>
                                    <path class={anim("animate-fade-up sm:animate-fade-right animate-delay-[210ms] sm:animate-delay-[30ms]")} d="M68.94,126.53c-19.54,1.71-23.72-12.84-28.01-61.93-2.32-26.56-.89-44.81,15.27-46.23,17.29-1.51,22.89,3.42,27.53,56.37,3.58,40.87-2.63,50.72-14.78,51.79ZM60.07,56.99c-11.02.96-11.62,10-10.33,24.8s4.86,23.8,14.51,22.96c9.65-.84,12.9-8.41,11.43-25.22s-4.71-23.48-15.6-22.53Z"/>
                                    <path class={anim("animate-fade-up sm:animate-fade-right animate-delay-[160ms] sm:animate-delay-[60ms]")} d="M126.27,122.19c-1.12-4.14-5.47-26.46-7.35-26.3-2.13.19-2.65,25.99-2.82,31.26l-15.41,1.35-18.17-106.68,8.14-.71c5.37,28.17,8.24,43.67,10.41,52.63,1.93,7.63,2.47,10.97,4.85,10.76,2.88-.25,3.75-13.38,2.76-60.74l7.64-.67c3.85,22.37,5.85,35.07,7.62,42.38,1.45,6.48,1.85,9.66,4.23,9.45,3.51-.31,4.72-8.04,5.84-57.27l6.89-.6-.75,103.92-13.9,1.22Z"/>
                                    <path class={anim("animate-fade-up sm:animate-fade-right animate-delay-[120ms] sm:animate-delay-[90ms]")} d="M170.54,124.25l-2.71-30.94c11.35-1.5,13.74-7.46,12.19-25.13l-5.34-61.03,9.02-.79,4.56,52.12c4.68,53.48,3.41,63.58-17.73,65.77Z"/>
                                    <path class={anim("animate-fade-up sm:animate-fade-right animate-delay-[90ms] sm:animate-delay-[120ms]")} d="M219.32,118.96c-17.79,1.56-20.43-18.53-27.9-103.95l9.14-.8c5,55.64,7.2,67.81,15.96,67.04,4.64-.41,7.55-3.2,8.05-14.76.26-5.61,0-12.87-.69-22.3-.67-9.09-1.65-20.36-3.01-35.83l7.26-.64c7.89,90.13,8.46,109.72-8.82,111.23Z"/>
                                    <path class={anim("animate-fade-up sm:animate-fade-right animate-delay-[60ms] sm:animate-delay-[160ms]")} d="M235.63,6.56l9.77-.85,9.09,103.91-9.77.85-9.09-103.91Z"/>
                                    <path class={anim("animate-fade-up sm:animate-fade-right animate-delay-[30ms] sm:animate-delay-[210ms]")} d="M266.48,64.69c1.6,18.33,7.06,21.58,26.86,20.01l2.18,24.89c-25.69,2.08-34.01-4.98-38.17-52.57-3.96-45.23,4.56-54.62,30.1-57.02l3.63,41.52c-22.91,2.17-26.18,5.17-24.6,23.16Z"/>
                                    <path class={anim("animate-fade-up sm:animate-fade-right animate-delay-[0ms] sm:animate-delay-[280ms]")} d="M295.4,4.05l32.2-2.82,3.04,34.8c-23.93,2.09-24.78,3.86-24.22,10.24.63,7.23,1.57,9.35,22.99,7.48l.96,10.93c-19.67,1.72-20.88,3.69-20.2,11.42s2.07,9.31,25.39,7.44l1.93,22.03-32.95,2.88-9.13-104.41Z"/>
                                    </g>
                                </g>
                            </svg>
                            <svg class="flex sm:hidden w-3/4 sm:w-3/4" xmlns="http://www.w3.org/2000/svg" id="Layer_2" data-name="Layer 2" viewBox="0 0 182.56 241.83">
                                <g id="Layer_1-2" data-name="Layer 1">
                                    <path class={anim("animate-fade-up sm:animate-fade-left animate-delay-[0ms] sm:animate-delay-[0ms]")} d="M49.33,67.19c.96,18.38,6.31,21.81,26.16,20.94l1.31,24.95c-25.75,1.18-33.82-6.17-36.32-53.87C38.1,13.86,46.94,4.78,72.55,3.27l2.18,41.63c-22.97,1.37-26.34,4.26-25.4,22.29Z"/>
                                    <path class={anim("animate-fade-up sm:animate-fade-left animate-delay-[30ms] sm:animate-delay-[30ms]")} d="M106.8,108.63c-19.59,1.03-23.26-13.66-25.84-62.87-1.4-26.63.67-44.82,16.87-45.67,17.33-.91,22.76,4.22,25.54,57.3,2.15,40.97-4.4,50.6-16.58,51.24ZM100.37,38.82c-11.05.58-11.97,9.59-11.19,24.42.78,14.84,4.03,23.95,13.7,23.45,9.67-.51,13.18-7.96,12.3-24.81-.88-16.85-3.88-23.63-14.81-23.06Z"/>
                                    <path class={anim("animate-fade-up sm:animate-fade-left animate-delay-[60ms] sm:animate-delay-[60ms]")} d="M164.25,106.29c-.97-4.17-4.54-26.64-6.43-26.54-2.13.11-3.55,25.88-3.9,31.14l-15.45.81L124.03,4.46l8.16-.43c4.38,28.34,6.71,43.93,8.57,52.96,1.66,7.69,2.09,11.05,4.47,10.93,2.89-.15,4.22-13.24,4.88-60.6l7.66-.4c3.07,22.49,4.62,35.25,6.14,42.62,1.22,6.53,1.51,9.72,3.9,9.59,3.52-.18,5-7.87,7.84-57.03l6.91-.36-4.38,103.83-13.94.73Z"/>
                                    <path class={anim("animate-fade-up sm:animate-fade-left animate-delay-[90ms] sm:animate-delay-[90ms]")} d="M0,228.31l3.25-30.89c11.43.69,14.91-4.71,16.76-22.34l6.4-60.93,9.01.95-5.47,52.03c-5.61,53.39-8.78,63.06-29.95,61.18Z"/>
                                    <path class={anim("animate-fade-up sm:animate-fade-left animate-delay-[120ms] sm:animate-delay-[120ms]")} d="M48.89,232.42c-17.76-1.87-16.52-22.09-7.56-107.36l9.13.96c-5.71,55.57-5.87,67.94,2.88,68.86,4.63.49,8.02-1.7,10.72-12.95,1.33-5.46,2.47-12.63,3.58-22.02,1.08-9.05,2.26-20.3,3.89-35.74l7.25.76c-9.46,89.98-12.63,109.32-29.88,107.51Z"/>
                                    <path class={anim("animate-fade-up sm:animate-fade-left animate-delay-[160ms] sm:animate-delay-[160ms]")} d="M86.35,125.2l9.75,1.03-10.9,103.74-9.75-1.03,10.9-103.74Z"/>
                                    <path class={anim("animate-fade-up sm:animate-fade-left animate-delay-[210ms] sm:animate-delay-[210ms]")} d="M105.54,188.14c-1.92,18.3,2.82,22.53,22.55,24.77l-2.61,24.85c-25.62-2.86-32.43-11.38-27.44-58.89,4.75-45.16,14.9-52.74,40.43-50.22l-4.36,41.45c-22.9-2.24-26.68.08-28.57,18.04Z"/>
                                    <path class={anim("animate-fade-up sm:animate-fade-left animate-delay-[280ms] sm:animate-delay-[280ms]")} d="M145.5,134.14l32.14,3.38-3.65,34.74c-23.89-2.51-25.06-.93-25.73,5.43-.76,7.22-.24,9.48,21.14,11.73l-1.15,10.91c-19.63-2.06-21.2-.36-22.01,7.36-.78,7.39.26,9.53,23.5,12.14l-2.31,21.99-32.89-3.46,10.96-104.23Z"/>
                                </g>
                                </svg>
                            <p class={anim(`${!typingComplete ? 'opacity-0' : 'opacity-100'} w-auto absolute -bottom-8 sm:bottom-4 md:bottom-6 lg:bottom-8 right-0 text-[10px] leading-3 text-right text-black font-mono font- uppercase animate-flip-up animate-delay-500 border-[0.5px] border-black rounded-sm bg-white p-1 transition-all duration-[1000ms]`)}>"... Moo."™</p>
                        </div>
                        {/* Content of the page, gonna be rotate cause we can */}
                        <div class="relative z-50 flex w-full items-center flex-col pt-8 space-y-8 sm:space-y-4">
                            <div class="flex w-full items-center justify-end">
                                <div class={anim("flex flex-col w-full h-32 sm:w-1/2 rotate-[7deg] py-4 px-2 space-y-2 bg-white border-[0.5px] border-black rounded-lg animate-fade animate-delay-[750ms] transition-colors duration-300 cursor-pointer")}>
                                    {/* Page intro */}
                                    <div className="w-full flex flex-col items-start justify-start font-mono text-xs uppercase rounded-sm border-black dark:bg-white dark:border-white dark:text-black animate-flip-down space-y-1">
                                        <p class="font-bold">
                                            <Typewriter
                                                options={{
                                                delay: 30,
                                                cursor: '',
                                                autoStart: true,
                                                }}
                                                onInit={(typewriter) => {
                                                typewriter
                                                    .pauseFor(1000)
                                                    .typeString("The world's first can of Milk.™")
                                                    .callFunction(() => setReadyForNextTyping(true))
                                                    .start()
                                                }}
                                            />
                                        </p>
                                        {readyForNextTyping && (
                                            <p class="text-left text-[10px] leading-3">
                                                <Typewriter
                                                    options={{
                                                    delay: 30,
                                                    cursor: '_',
                                                    autoStart: true,
                                                    }}
                                                    onInit={(typewriter) => {
                                                    typewriter
                                                        .pauseFor(500)
                                                        .typeString("Critics exlaim: ")
                                                        .pauseFor(400)
                                                        .typeString(`"The most revolutionary product to hit the market since they juiced the cow: `)
                                                        .pauseFor(600)
                                                        .typeString(`<span class='text-cowjuice-bronze font-bold border-[0.5px] border-cowjuice-bronze px-[2px] rounded-sm'>Ultra-Retorted Milk™</span>!"`)
                                                        .callFunction(() => setTypingComplete(true))
                                                        .start()
                                                    }}
                                                />
                                            </p>
                                        )}
                                    </div>
                                    {typingComplete && (
                                        <div class="flex w-full flex-row items-center justify-center space-x-2">
                                            <button 
                                                class="flex w-full border-[0.5px] hover:bg-zinc-100 active:bg-cowjuice-gold/50 border-black rounded-md px-2 py-2 animate-flip-down" 
                                                onMouseEnter={(e) => e.stopPropagation()}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate('/shopify/products');
                                                }}
                                                
                                            >
                                                <p class="text-xs font-mono uppercase text-black">Shop Milk</p>
                                            </button>
                                            <button 
                                                class="flex w-full border-[0.5px] hover:bg-zinc-100 active:bg-cowjuice-gold/50 border-black rounded-md px-2 py-2 animate-flip-down animate-delay-150" 
                                                // onMouseEnter={(e) => e.stopPropagation()}
                                                onClick={() => {
                                                    // e.stopPropagation();
                                                    setModal(!modal);
                                                }}
                                                
                                            >
                                                <p class="text-xs font-mono uppercase text-black">Buy Now</p>
                                            </button>
                                        </div>
                                    )}
                                    
                                </div>
                            </div>

                            <div class={`${!typingComplete ? 'opacity-0' : 'opacity-100'} flex flex-col items-center justify-center w-full transition-opacity duration-[100ms]`}>
                                <button onClick={handleEnterSite} class="flex p-2 rounded-full border-[0.5px] border-black bg-white animate-bounce">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.0} stroke="currentColor" className="h-4 w-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                                    </svg>
                                </button>
                                <p class="text-[11px] text-black lg:text-white opacity-60 lg:opacity-100 uppercase font-mono animate-bounce">Enter site<sup>[1]</sup></p>
                            </div>
                        </div>
                    </div>

                    <div class={`${!typingComplete ? 'opacity-0' : 'opacity-100'} absolute -px-6 inset-0 -bottom-[825px] sm:-bottom-[768px] lg:-bottom-[1000px] z-0 flex w-full md:w-2/3 lg:w-3/4 items-center justify-end overflow-hidden transition-opacity duration-[1000ms]`}>
                        <img class="w-full flex" src={bull_fill} />
                    </div>
                    
                    {/* Footnotes */}
                    <div class={`flex flex-1 w-full md:w-2/3 lg:w-3/4 border-t-[0.0px] border-white pt-4 h-full flex-col items-center justify-center sm:items-start space-y-2 animate-fade animate-delay-[1050ms]`}>
                        <p class={`${!typingComplete ? 'opacity-0' : 'opacity-100'} text-[10px] text-center w-full text-white font-bold font-mono uppercase leading-3 transition-opacity duration-[1000ms]`}><sup>[1]</sup> This site should not be entered by anyone fearful of milk, dairy based delight, protein revolutions, lactose-freedom-derived glory, or the greatness of this land we call the United States of Milk. Proceed at your own peril."</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CowJuice;