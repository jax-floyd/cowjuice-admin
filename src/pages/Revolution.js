import React, { useState, useEffect, useRef } from 'react';

import AmericanFlag from '../components/icons/AmericanFlag';

import milk_in_a_can from '../assets/milk_in_a_can_mark.svg';
import milk_in_a_can_lines from '../assets/milk_in_a_can_lines_mark.svg';


const Revolution = () => {
  
  /* ── Reveal once the section is 15 % in view ─────────────── */
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();          // fire once
        }
      },
      { threshold: 0.30 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* identical helper to Footer’s */
  const anim = (cls) => (visible ? cls : 'opacity-0'); // or 'animate-none'

  /* ─────────────────────────────────────────────────────────── */
  return (
    <section
      ref={sectionRef}
      className="inset-0 flex flex-1 py-24 w-full min-h-screen overflow-hidden bg-black"
    >
      <div className="flex flex-col w-full max-w-6xl mx-auto space-y-6 px-6">
        <svg class="fill-white rotate-[4deg] w-full" id="Layer_2" data-name="Layer 2" viewBox="0 0 298.85 116.29">
          <g id="Layer_1-2" data-name="Layer 1">
            <path class={anim("animate-fade-up sm:animate-fade-right animate-delay-[0ms] sm:animate-delay-[0ms]")} d="M39.09,71.85c-1.9,0-4.4,5.51-11.88,37.1h-5.59c-3.56-15.88-5.46-24.39-7.01-29.41-1.19-4.34-1.66-6.18-3.33-6.18-4.75,0-3.8,6.18-3.8,37.75H.12L0,4.18h10.93c11.05,54.31,15.33,59.15,16.87,59.15,1.78,0,6.18-4.34,16.99-63.33h6.3v116.29h-7.84c0-40.27-2.26-44.45-4.16-44.45Z"/>
            <path class={anim("animate-fade-up sm:animate-fade-right animate-delay-[30ms] sm:animate-delay-[30ms]")} d="M59.45,5.85h9.27v103.26h-9.27V5.85Z"/>
            <path class={anim("animate-fade-up sm:animate-fade-right animate-delay-[60ms] sm:animate-delay-[60ms]")} d="M77.04,1.17h8.44v35.43c0,44.11,2.38,46.45,18.89,46.61v24.9h-27.33V1.17Z"/>
            <path class={anim("animate-fade-up sm:animate-fade-right animate-delay-[90ms] sm:animate-delay-[90ms]")} d="M145.74,113.12h-11.64c-2.02-26.41-4.75-27.58-11.29-27.58-4.28,0-6.54,2.5-6.66,26.23h-6.41V4.84h8.91c0,43.28,1.07,50.64,2.73,50.64,1.9,0,4.87-9.36,15.45-52.47h10.58l-14.97,54.64c8.91,7.02,10.45,17.39,13.3,55.48Z"/>
            <path class={anim("animate-fade-up sm:animate-fade-right animate-delay-[120ms] sm:animate-delay-[120ms]")} d="M182.59,68.34c0,18.22,5.17,21.89,25.11,22.05v24.73c-25.87-.16-33.57-7.85-33.57-55.14s9.34-53.47,35.08-53.63v41.26c-23.09.16-26.62,2.84-26.62,20.72Z"/>
            <path class={anim("animate-fade-up sm:animate-fade-right animate-delay-[160ms] sm:animate-delay-[160ms]")} d="M234.85,92.22c-8.2,0-9.72,3.51-11.61,16.88h-10.48l10.35-103.76h21.58l11.49,108.6h-7.7c-1.77-17.88-3.41-21.73-13.63-21.73ZM232.2,44.11c-.88,0-4.55.18-6.94,17.71-2.02,15.21.63,19.21,6.94,19.21,6.68,0,10.85-2.67,8.08-19.21-2.78-16.54-7.07-17.71-8.08-17.71Z"/>
            <path class={anim("animate-fade-up sm:animate-fade-right animate-delay-[210ms] sm:animate-delay-[210ms]")} d="M276.14,83.21c-2.4-5.35-3.66-9.02-5.43-9.02-4.04,0-2.52,10.86-2.52,42.11h-7.19V6.68h7.19c8.08,32.26,15.02,53.3,17.42,53.3,2.27,0,3.28-11.03,3.28-59.98h9.97v112.94h-10.73c-5.55-13.86-9.21-23.39-11.99-29.74Z"/>
            <path class={anim("animate-fade-up sm:animate-fade-right animate-delay-[280ms] sm:animate-delay-[280ms]")} d="M153.72,111.21h1.39v-4.2h-1.39v-.73h3.64v.73h-1.39v4.2h1.39v.73h-3.64v-.73Z"/>
            <path class={anim("animate-fade-up sm:animate-fade-right animate-delay-[360ms] sm:animate-delay-[360ms]")} d="M158.82,106.27h.93l1.66,3.37.53,1.19h.02c-.03-.57-.12-1.25-.12-1.87v-2.7h.83v5.67h-.93l-1.65-3.37-.53-1.19h-.02c.03.59.12,1.24.12,1.84v2.72h-.83v-5.67Z"/>
            <path class={anim("animate-fade-up sm:animate-fade-right animate-delay-[460ms] sm:animate-delay-[460ms]")} d="M170.63,106.27h1.01l1.87,5.67h-.93l-.91-3.09c-.18-.61-.37-1.25-.53-1.89h-.03c-.17.64-.35,1.27-.53,1.89l-.93,3.09h-.89l1.87-5.67ZM169.81,109.63h2.63v.69h-2.63v-.69Z"/>
          </g>
        </svg>
        {/* Headline strip */}
        <div class="rotate-[6deg]">
          <div className={anim('flex flex-col w-full text-xs font-mono uppercase text-black font-bold bg-white p-2 sm:py-4 rounded-sm animate-flip-up animate-duration-1000 animate-delay-[0ms]')}>
            <p> The Revolution of Cow Juice: <span className="text-cowjuice-gold bg-white border-[0.5px] border-cowjuice-gold rounded-sm px-[2px]">A can of milk</span></p>
          </div>
        </div>
        

        {/* One‑liner */}
        <p className={anim('text-xs font-mono w-full sm:w-1/2 text-white font-bold uppercase animate-fade-up animate-delay-[150ms]')}>
          Milk in a can - the Ultra‑Retorted™ juice of a cow - is a new category of dairy, pioneered by Cow Juice Inc.
        </p>

        {/* Story block */}
        <div className="flex flex-col  items-start space-y-3">
          <p className={anim('text-[10px] uppercase text-white font-mono font-bold animate-flip-down animate-delay-[300ms]')}>
            I. No fluff - why is this actually a big deal?
          </p>

          <p className={anim('text-xs uppercase text-white font-mono animate-fade-up animate-delay-[450ms]')}>
              Never before in the history of milk has the world's best protein source - milk, to be clear - come in an on-the-go, adult-accessible format.
          </p>
          <p className={anim('text-xs uppercase text-white font-mono animate-fade-up animate-delay-[450ms]')}>
              That is, until Cow Juice came to town.
          </p>
          <p className={anim('text-xs text-white font-mono animate-fade-up animate-delay-[450ms]')}>
              <span class="uppercase">We are here to usher in a new era of milk -- the</span> <span class="">gotCowJuice?™</span> <span class="uppercase">era. This era promises the world stumpendous amounts of zero-added-anything protein delight on the back of flavor- & digestion-optimized dairy, as never before seen in the milk aisle.</span>
          </p>
          <p className={anim('text-xs uppercase text-white font-mono animate-fade-up animate-delay-[450ms]')}>
              It is all made possible by the general wonderfulness of bovine cow milk which, again, we will reiterate is the best beverage on earth with the possible exception of water (though probably not because drinking water alone would kill you while drinking cow juice alone would just give you unbelievable strong bones).
          </p>

          <div class={anim("flex w-full border-[0.5px] border-white animate-fade-up animate-delay-[700ms]")} />

          {/* A block to explain the three big reasons Ultra-Retorted milk is revolutionary. */}
          <p className={anim('text-[10px] uppercase text-white font-mono font-bold animate-flip-down animate-delay-[725ms]')}>
            II. For those who want the bullet points
          </p>
          <p className={anim('text-xs uppercase text-white font-mono animate-fade-up animate-delay-[450ms]')}>
              If you get nothing else out of this site understand the following. Cow Juice is revolutionary because:
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            <div class={anim("flex flex-col items-center justify-start space-y-2 animate-fade-right animate-delay-[750ms]")}>
              <p class="inline-flex w-full font-mono text-xs uppercase font-bold text-white border-[0.75px] border-white rounded-sm p-2 sm:px-2 sm:py-4">Lactose-Freedom™ <div class="flex flex-1 pl-2"><AmericanFlag /></div></p>
              {/* <p class="font-mono text-xs text-white w-full text-left">Ultra-Retorted Milk is lactose free. Americans adults love milk, but millions can't stomach lactose. Enter Cow Juice. The retortation of dairy creates the easiest to digest milk the world has ever seen.</p> */}
            </div>
            <div class={anim("flex flex-col items-center justify-start space-y-2 animate-fade-up animate-delay-[800ms]")}>
              <p class="w-full font-mono text-xs uppercase font-bold text-white border-[0.75px] border-white rounded-sm p-2 sm:px-2 sm:py-4">Naturally Caramelized Dairy</p>
              {/* <p class="font-mono text-xs text-white w-full text-left">Ultra-Retorted Milk has a robust, sophisticated taste. Words truly cannot describe the flavor. All parties who try Cow Juice agree that retortation has created this, probably the most unique naturally-sweet, dulce de leche-like milk in bovine history.</p> */}
            </div>
            <div class={anim("flex flex-col items-center justify-start space-y-2 animate-fade-left animate-delay-[850ms]")}>
              <p class="w-full font-mono text-xs uppercase font-bold text-white border-[0.75px] border-white rounded-sm p-2 sm:px-2 sm:py-4">A Protein Windfall</p>
              {/* <p class="font-mono text-xs text-white w-full text-left">Cow Juice Inc. strongly believes it is time that adults have the opportunity to drink chemical-free, one-ingredient, all-natural and complete protein. Ultra-Retorted Milk, for the above reasons, is a radically new presentation of dairy cow milk – the most adult-accessible milk on the planet — with all the nutritional moo-scle building advantages of milk.</p> */}
            </div>
            <div class={anim("flex flex-col items-center justify-start space-y-2 animate-fade-down animate-delay-[900ms]")}>
              <p class="w-full font-mono text-xs uppercase font-bold text-white border-[0.75px] border-white rounded-sm p-2 sm:px-2 sm:py-4">Extended Shelf-Life</p>
              {/* <p class="font-mono text-xs text-white w-full text-left">Ultra-Retort Pasteurization — because of the tremendous, insurmountable, & downright unbelievable heat and pressure the milk is subjected to in the Retort chamber — creates a shelf-stable milk with a 365-day shelf-life. Absolutely no preservatives, emulfiers, stabilizers, carrageenans or other unpronounceable ingredients are required for this result. Cow Juice is just milk in every can.</p> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Revolution;
