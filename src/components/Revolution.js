import React, { useState, useEffect, useRef } from 'react';

import AmericanFlag from './icons/AmericanFlag';

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
        {/* Headline strip */}
        <div className={anim('flex w-full text-xs font-mono uppercase text-black font-bold bg-white p-2 sm:py-4 rounded-sm animate-flip-up animate-duration-1000 animate-delay-[0ms]')}>
          <p> The Revolution of Cow Juice: <span className="text-cowjuice-gold bg-white border-[0.5px] border-cowjuice-gold rounded-sm px-[2px]">Milk in a can</span></p>
        </div>

        {/* One‑liner */}
        <p className={anim('text-xs font-mono text-white font-bold uppercase animate-fade-up animate-delay-[150ms]')}>
          Milk in a can - the Ultra‑Retorted™ juice of a cow - is a new category of dairy, pioneered by Cow Juice Inc.
        </p>

        {/* Story block */}
        <div className="flex flex-col items-start space-y-3">
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
              If you get nothing else out of this site understand the following. Cow Juice is:
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
              <p class="w-full font-mono text-xs uppercase font-bold text-white border-[0.75px] border-white rounded-sm p-2 sm:px-2 sm:py-4">A Protein Revolution</p>
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
