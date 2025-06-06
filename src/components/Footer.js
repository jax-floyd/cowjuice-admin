import React, { useState, useEffect, useRef } from 'react';

import { useLocation } from 'react-router-dom';

const Footer = () => {

    const location = useLocation();
    
    const footerRef = useRef(null);
    const [visible, setVisible] = useState(false);   // ← fire once

    /* When 5 % of footer is visible, flip `visible` to true */
    useEffect(() => {
        const el = footerRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();          // run only once
            }
        },
        { threshold: 0.05 }                 // tweak as you like
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const anim = (cls) => (visible ? cls : 'opacity-0');   // or 'animate-none'


    // Define the 'black bg pages which require a mt callout
    const blacks = ['/', '/the-revolution-of-cow-juice']

    return (
        <footer ref={footerRef} className={`${blacks.includes(location.pathname) && 'mt-6'} flex flex-col space-x-2 sm:flex-col sm:space-y-16 justify-start sm:items-center w-full bg-cowjuice-gold text-white px-6 space-y-8 py-16 sm:py-0 sm:pb-16`}>
            <div class="flex flex-row sm:flex-col space-x-2 sm:flexcol sm:space-y-0 justify-start sm:items-center w-full max-w-6xl mx-auto bg-transparent text-white">
                {/* h-32 classed div with transparency to allow for better display of sm:> COW JUICE animation */}
                <div class="sm flex flex-1 h-full items-center">
                    {/* The actual logo's SVG */}
                    <svg class="w-full sm:hidden text-white" id="Layer_2" data-name="Layer 2" viewBox="0 0 119.06 300.64">
                        <g id="Layer_1-2" data-name="Layer 1">
                            <g>
                                <path class={anim("fill-current animate-fade-right animate-delay-[825ms]")} d="M66.88,292.71c18.83,0,22.64-4.86,22.81-23.57h25.57c-.17,24.28-8.12,31.5-57.02,31.5s-55.29-8.76-55.47-32.92h42.68c.17,21.67,2.94,24.99,21.43,24.99Z"/>
                                <path class={anim("fill-current animate-fade-right animate-delay-[750ms]")} d="M112.32,240.72c0,18.48-15.21,21.2-65.66,21.2-27.3,0-45.79-2.84-45.79-18.12,0-16.34,5.53-21.2,59.96-21.2,41.99,0,51.49,6.63,51.49,18.12ZM40.61,243.32c0,10.42,9.16,11.72,24.36,11.72s24.71-2.61,24.71-11.72-7.43-12.79-24.71-12.79-24.36,2.49-24.36,12.79Z"/>
                                <path class={anim("fill-current animate-fade-right animate-delay-[625ms]")} d="M113.01,186.6c-4.32.71-27.47,2.96-27.47,4.74,0,2.01,26.26,4.62,31.62,5.21v14.57l-110.42,8.29v-7.7c29.2-2.72,45.27-4.15,54.6-5.45,7.95-1.18,11.4-1.42,11.4-3.67,0-2.72-13.31-4.62-61.69-7.58v-7.22c23.15-1.78,36.29-2.61,43.89-3.67,6.74-.83,10.02-.95,10.02-3.2,0-3.32-7.78-5.09-57.89-10.19v-6.51l105.92,9.24v13.15Z"/>
                            </g>
                            <g>
                                <path class={anim("fill-current animate-fade-right animate-delay-[500ms]")} d="M119.06,158.1h-31.79c-.52-10.78-6.39-13.5-24.54-13.5H0v-8.53h53.57c54.95,0,65.14,2.01,65.49,22.03Z"/>
                                <path class={anim("fill-current animate-fade-right animate-delay-[375ms]")} d="M118.02,111.91c0,16.82-20.74,17.65-108.51,17.65v-8.65c57.19-.12,69.81-1.18,69.81-9.47,0-4.38-2.59-7.34-14.34-8.76-5.7-.71-13.13-1.07-22.81-1.18-9.33-.12-20.91-.12-36.81-.12v-6.87c92.62,0,112.66,1.07,112.66,17.41Z"/>
                                <path class={anim("fill-current animate-fade-right animate-delay-[250ms]")} d="M4.84,87.4v-9.24h106.79v9.24H4.84Z"/>
                                <path class={anim("fill-current animate-fade-right animate-delay-[125ms]")} d="M66.87,63.24c18.83,0,22.64-4.86,22.81-23.57h25.57c-.17,24.28-8.12,31.5-57.02,31.5S2.94,62.41,2.76,38.25h42.68c.17,21.67,2.94,24.99,21.43,24.99Z"/>
                                <path class={anim("fill-current animate-fade-right animate-delay-[0ms]")} d="M7.6,31.15V.71h35.77c0,22.62,1.73,23.57,8.29,23.57,7.43,0,9.68-.71,9.68-20.96h11.23c0,18.59,1.9,19.9,9.85,19.9s9.68-1.18,9.85-23.21h22.64v31.15H7.6Z"/>
                            </g>
                        </g>
                    </svg>
                </div>
                <div class="hidden sm:flex flex-1 w-full h-full items-center justify-center">
                    <svg class="w-full text-white" xmlns="http://www.w3.org/2000/svg" id="Layer_2" data-name="Layer 2" viewBox="0 0 300.64 119.06">
                        <g id="Layer_1-2" data-name="Layer 1">
                            <g>
                                <path class={anim("fill-current animate-fade-down animate-delay-[0ms]")} d="M7.93,66.88c0,18.83,4.86,22.64,23.57,22.81v25.57c-24.28-.17-31.5-8.12-31.5-57.02S8.76,2.94,32.92,2.77v42.68c-21.67.17-24.99,2.94-24.99,21.43Z"/>
                                <path class={anim("fill-current animate-fade-down animate-delay-[125ms]")} d="M59.93,112.32c-18.48,0-21.2-15.21-21.2-65.66C38.73,19.36,41.57.87,56.85.87c16.34,0,21.2,5.53,21.2,59.96,0,41.99-6.63,51.49-18.12,51.49ZM57.32,40.61c-10.42,0-11.72,9.16-11.72,24.36s2.61,24.71,11.72,24.71,12.79-7.43,12.79-24.71-2.49-24.36-12.79-24.36Z"/>
                                <path class={anim("fill-current animate-fade-down animate-delay-[250ms]")} d="M114.05,113.01c-.71-4.32-2.96-27.47-4.74-27.47-2.01,0-4.62,26.26-5.21,31.62h-14.57L81.24,6.74h7.7c2.72,29.2,4.15,45.27,5.45,54.6,1.18,7.95,1.42,11.4,3.67,11.4,2.72,0,4.62-13.31,7.58-61.69h7.22c1.78,23.15,2.61,36.29,3.67,43.89.83,6.74.95,10.02,3.2,10.02,3.32,0,5.09-7.78,10.19-57.89h6.51l-9.24,105.92h-13.15Z"/>
                            </g>
                            <g>
                                <path class={anim("fill-current animate-fade-down animate-delay-[375ms]")} d="M142.54,119.06v-31.79c10.78-.52,13.5-6.39,13.5-24.54V0h8.53v53.57c0,54.95-2.01,65.14-22.03,65.49Z"/>
                                <path class={anim("fill-current animate-fade-down animate-delay-[500ms]")} d="M188.73,118.02c-16.82,0-17.65-20.74-17.65-108.51h8.65c.12,57.19,1.18,69.81,9.47,69.81,4.38,0,7.34-2.59,8.76-14.34.71-5.7,1.07-13.13,1.18-22.81.12-9.33.12-20.91.12-36.81h6.87c0,92.62-1.07,112.66-17.41,112.66Z"/>
                                <path class={anim("fill-current animate-fade-down animate-delay-[625ms]")} d="M213.24,4.84h9.24v106.79h-9.24V4.84Z"/>
                                <path class={anim("fill-current animate-fade-down animate-delay-[750ms]")} d="M237.4,66.87c0,18.83,4.86,22.64,23.57,22.81v25.57c-24.28-.17-31.5-8.12-31.5-57.02S238.23,2.94,262.39,2.76v42.68c-21.67.17-24.99,2.94-24.99,21.43Z"/>
                                <path class={anim("fill-current animate-fade-down animate-delay-[825ms]")} d="M269.5,7.6h30.44v35.77c-22.62,0-23.57,1.73-23.57,8.29,0,7.43.71,9.68,20.96,9.68v11.23c-18.59,0-19.9,1.9-19.9,9.85s1.18,9.68,23.21,9.85v22.64h-31.15V7.6Z"/>
                            </g>
                        </g>
                    </svg>
                </div>
                <div className="flex flex-1 w-full max-w-6xl rounded-sm h-full mx-auto flex-col sm:flex-row items-end sm:items-start justify-between space-y-4 sm:space-y-0 sm:space-x-4 pt-0 sm:pt-16">

                    {/* ── Left: Brand + tagline ───────────────────────── */}
                    <div className="flex flex-col items-end sm:items-start leading-tight">
                        <span className={anim("text-[11px] sm:text-[10px] leading-3 font-mono uppercase font-bold animate-fade-left sm:animate-fade-down animate-delay-[0ms] sm:animate-delay-[1000ms]")}>
                            <span class="text-md">©</span> {new Date().getFullYear()} Cow Juice Inc.
                        </span>
                        <span className={anim("text-[11px] sm:text-[10px] leading-3 font-mono text-right uppercase font-bold animate-fade-left sm:animate-fade-down animate-delay-[125ms] sm:animate-delay-[1125ms]")}>
                            The world's first can of milk.™
                        </span>
                    </div>

                    {/* ── Center: Nav links ──────────────────────────── */}
                    <nav className="flex sm:hidden flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 items-end font-bold uppercase">
                        {[
                            { name: 'Home', href: '/', delay: 'animate-delay-[250ms] sm:animate-delay-[750ms]' },
                            { name: 'Press', href: '/press', delay: 'animate-delay-[375ms] sm:animate-delay-[875ms]' },
                            { name: 'Shop', href: '/shopify/products', delay: 'animate-delay-[500ms] sm:animate-delay-[1000ms]' },
                            { name: 'Retort', href: '/ultra-retorted-milk', delay: 'animate-delay-[625ms] sm:animate-delay-[1125ms]' },
                            { name: 'FAQ', href: '/questions', delay: 'animate-delay-[750ms] sm:animate-delay-[1350ms]' },
                            { name: 'Orders', href: '/orders/status', delay: 'animate-delay-[800ms] sm:animate-delay-[1500ms]' },
                            { name: 'Reviews', href: '/beta/reviews', delay: 'animate-delay-[1000ms] sm:animate-delay-[1650ms]' },
                            { name: 'Contact', href: '/contact', delay: 'animate-delay-[1250ms] sm:animate-delay-[1775ms]' },
                        ].map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className={anim(`text-xs sm:text-[10px] font-mono uppercase text-white hover:text-black hover:bg-white rounded-[1px] px-[2px] transition-colors duration-300 animate-fade-left sm:animate-fade-down ${link.delay}`)}
                        >
                            {link.name}
                        </a>
                        ))}
                    </nav>

                    {/* ── Right: Legal blurb ─────────────────────────── */}
                    <div className="flex w-full sm:w-1/4 flex-col items-end text-right sm:items-end leading-tight space-y-2">
                        <span className={anim("text-[11px] sm:text-[10px] font-mono uppercase font-bold animate-fade-left sm:animate-fade-down animate-delay-[1000ms] sm:animate-delay-[1000ms]")}>
                            Ultra‑Retort™, Retortation™, and Cow Juice™ are trademarks of Cow Juice Inc. Dare to rip them and you will be juiced.
                        </span>
                        <span className={anim("text-[11px] sm:text-[10px] font-mono text-white uppercase font-bold animate-fade-left sm:animate-fade-down animate-delay-[1125ms] sm:animate-delay-[1125ms]")}>
                            One Question Remains: Got Cow Juice?
                        </span>
                    </div>
                </div>
            </div>

            {/* ── Legal disclaimer grid ─────────────────────────────── */}
            <div className="relative text-white uppercase text-[11px] sm:text-[10px] font-mono font-semibold sm:font-light flex flex-col sm:grid sm:grid-cols-3 sm:gap-12 w-full h-auto space-y-4 sm:space-y-0 max-w-6xl mx-auto">

                {/* 1 */}
                <p className={anim("text-left sm:text-justify animate-flip-down animate-delay-[1200ms]")}>
                    Since it is effectively impossible to describe the degree of retortation packed into every aluminum can of Moo‑Nectar, Cow Juice Inc. — which naturally includes its wholly‑owned and partially‑owned subsidiaries, pet projects, spirit animals, and alter egos (<span className="font-bold">"Cow Juice Entities"</span>) — has been advised by its impossibly distinguished team of corporate attorneys to slap the following legal novella on this site and every extant piece of Cow Juice paraphernalia.
                </p>

                {/* 2 */}
                <p className={anim("text-left sm:text-justify animate-flip-down animate-delay-[1325ms]")}>
                    Drinking Ultra‑Retorted Milk™ may cause sudden confidence, unexpected refrigerator apathy, and the sort of milk‑mustache superiority that ends friendships. The Cow Juice Entities™ make no medical, nutritional, or metaphysical guarantees—other than promising your dairy has been retorted to oblivion, caramelized for pleasure, and stripped of every last languishing lactose molecule, leaving nothing but pure bovine bravado in a can.
                </p>

                {/* 3 — extended */}
                <p className={anim("text-left sm:text-justify animate-flip-down animate-delay-[1450ms]")}>
                    By merely allowing your retinas to graze this sentence, you — for reasons known only to ancient dairy oracles — hereby acknowledge the following terms, waive all claims, and forfeit the right to whine about literally any consequence arising on this gloriously calcium‑soaked planet we call Planet Milk (including, but not limited to, rogue milk tides and existential dread brought on by dairy enlightenment).
                </p>

                {/* 4 — list stays the same */}
                <ul className={anim("text-left sm:text-justify  w-full flex flex-col space-y-1")}>
                    <li className={anim("animate-flip-down animate-delay-[1575ms]")}>
                    1. “Retortation” is a totally legitimate word, entirely fabricated by Cow Juice Entities because we said so and the dictionary cried in the corner.
                    </li>
                    <li className={anim("animate-flip-down animate-delay-[1700ms]")}>
                    2. Any attempt to copy, siphon, or otherwise “borrow” our proprietary alumnium milking procedure will summon Cow Juice Man™ from his eternal positioning on TikTok livestream (he once juiced a tractor; don’t test him).
                    </li>
                    <li className={anim("animate-flip-down animate-delay-[1825ms]")}>
                    3. If you spill a can on your laptop, your lawyer may absolutely not phone our lawyer—our lawyer is busy taste‑testing the product for “research.”
                    </li>
                </ul>

                {/* 5 — padded */}
                <p className={anim("text-left sm:text-justify animate-flip-down animate-delay-[1950ms]")}>
                    Cow Juice Entities thank you for your unwavering bravery, salute your adventurous palate, and bid you tidings of great Cow Juice. May your days be frothy, your nights ultra‑retorted, and your emails forever lactose‑free.
                </p>

                {/* 6 — NEW cell */}
                <p className={anim("text-left sm:text-justify animate-flip-down animate-delay-[2075ms]")}>
                    P.S. Federal regulators insist we remind you that Ultra‑Retorted Milk™ is literally just “milk,” contains exactly 0.00 % unicorn tears and 100% milk, and has not been evaluated by philosophers for its ability to spark spontaneous existential breakthroughs — though early anecdotal evidence looks promising. Thank you again for listening.
                </p>
            </div>

            {/* ── Footer Bottom Links ─────────────────────────────────── */}
            <div className={anim("flex w-full flex-col sm:flex-row items-center justify-start sm:justify-between mx-auto max-w-6xl border-t-[0.5px] border-white pt-6 mt-6 text-center uppercase font-light text-[11px] sm:text-[10px] font-mono space-x-0 space-y-4 sm:space-x-4 sm:space-y-0 animate-fade animate-delay-[2200ms]")}>
                <div class={anim("flex w-full flex-row items-center justify-center sm:justify-start space-x-2 animate-flip-down animate-delay-[2200ms]")}>
                    <a href="/legal/terms-and-conditions" className="cursor-pointer px-[2px] rounded-sm hover:text-black hover:bg-white transition-all duration-300">
                        Terms
                    </a>
                    <span>|</span>
                    <a href="/legal/privacy-policy" className="cursor-pointer px-[2px] rounded-sm hover:text-black hover:bg-white transition-all duration-300">
                        Privacy
                    </a>
                    <span>|</span>
                    <a href="/cookies" className="cursor-pointer px-[2px] rounded-sm hover:text-black hover:bg-white transition-all duration-300">
                        Cookies <span class="hidden sm:inline">[What Felicity!]</span>
                    </a>
                </div>
                <div class="flex sm:hidden w-48 border-t-[0.5px] border-white"/>
                <div class={anim("flex w-full items-center justify-center sm:justify-end flex-col sm:flex-row space-x-0 space-y-1 sm:space-x-4 sm:space-y-0 animate-flip-down animate-delay-[2325ms]")}>
                    <p className="flex justify-center cursor-pointer px-[2px] rounded-sm hover:text-black hover:bg-white transition-all duration-300">
                        Because cows are not milked – they're juiced™
                    </p>
                    <span class="hidden sm:block">|</span>
                    {/* <div class="flex sm:hidden w-24 border-t-[0.5px] border-white"/> */}
                    <p className="flex justify-center cursor-pointer px-[2px] rounded-sm hover:text-black hover:bg-white transition-all duration-300">
                        #DrinkTheTruth™
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;