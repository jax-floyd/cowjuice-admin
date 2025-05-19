import React from "react";
import Typewriter from "typewriter-effect";

/**
 * Press – Liquid‑Death‑toned news dispatch announcing Ultra‑Retorted Milk.
 */
const Press = () => {
  return (
    <div className="inset-0 flex flex-1 min-h-screen max-w-3xl mx-auto px-6 pb-6 pt-24 w-full h-full overflow-hidden">
      <div className="flex flex-col items-center justify-start space-y-4 w-full animate-fade">
        {/* ─── Headline ────────────────────────────────────────────────── */}
        <p className="w-full font-mono p-2 text-xs font-black uppercase rounded-sm border-[0.5px] border-black dark:bg-white dark:border-white dark:text-black animate-flip-down animate-delay-100">
          <Typewriter
            options={{ delay: 25, cursor: "" }}
            onInit={(tw) => {
              tw
                .pauseFor(250)
                .typeString("For immediate release: ")
                .pauseFor(50)
                .typeString("<br />")
                .pauseFor(50)
                .typeString("<br />")
                .pauseFor(175)
                .typeString("Cow Juice launches a revolution in dairy processing: ")
                .pauseFor(625)
                .typeString("<span class='border-[0.5px] border-cowjuice-red text-cowjuice-red rounded-sm px-[2px]'>ultra-retorted milk™</span>.")
                .start();
            }}
          />
        </p>
        
        {/* ─── Samuel L. Jackson, naturally ─────────────────────────────────────────── */}
        <div class="flex w-full flex-col items-center justify-center space-y-2">
          <img class="flex w-full rounded-sm border-[0.5px] border-black animate-flip-down animate-delay-[4600ms]" src={"https://media1.tenor.com/m/U9fMFxiKWQYAAAAd/retort.gif"} />
          <p class="flex w-full text-[10px] leading-3 font-mono animate-flip-up animate-delay-[4600ms]">[i]. Obviously not&nbsp;<span class="font-bold underline">that ^</span>&nbsp;retort.</p>
        </div>

        {/* ─── Typewriter Copy ─────────────────────────────────────────── */}
        <div class="flex flex-1 w-full">
          <div className="w-full flex-col items-center justify-center space-y-4 font-mono text-xs uppercase rounded-sm border-[0.5px] border-black dark:bg-white dark:border-white dark:text-black animate-fade-up animate-delay-[4600ms] animate-duration-[1500ms] p-2">
            <p class="animate-flip-down animate-delay-[4750ms] text-[10px] leading-3"><span class="font-bold">[DATELINE]:</span> PALO ALTO, CALIFORNIA — STANFORD UNIVERSITY SCHOOL OF cow juicing & radical canned beverage creation.</p>
            <div class="flex w-full border-b-[0.5px] border-black" />
            <p class="animate-flip-down animate-delay-[5000ms]">In a breakthrough designed to confuse lactose-lunatics, refrigerators, and taste buds alike, Cow Juice Inc. today announced the release of ultra-retorted milk.</p>
            <p class="animate-flip-down animate-delay-[5125ms]">As Founder, Cow Juice Man, explained on <a href="https://www.tiktok.com/@juiceofacow/video/7501106269315403054" target="_blank" rel="noopener noreferrer" class="bg-white text-cowjuice-red border-[0.5px] border-cowjuice-red font-bold rounded-sm px-[2px] animate-pulse">the TikTok Press Conference</a>, ultra-retorted milk is produced by pasteurizing milk under ultra-retort pasteurization, a scientific process more commonly known as <span class='bg-cowjuice-red text-white uppercase rounded-sm px-[2px] font-bold'>retortation™</span>.</p>
            <div class="flex w-full border-b-[0.5px] border-black animate-fade animate-delay-[5250ms]" />
            <p class="animate-flip-down font animate-delay-[5375ms]">Retortation — the high-heat pasteurization which turns normal milk into naturally sweeter lactose-free cow juice - offers milk-lovers three (3) benefits which promise to usher in a new era of milk:</p>
            <ul className="w-full grid grid-cols-2 gap-1 text-[11px]">
              <li class="animate-fade-left animate-delay-[5500ms]">✔ A naturally sweeter, slightly-caramelized tasting milk with no added sugar</li>
              <li class="animate-fade-down animate-delay-[5500ms]">✔ Freedom from lactose — and the toilet — facilitating infinite cow juice shotgunability</li>
              <li class="animate-fade-down animate-delay-[5500ms]">✔ Extended 365-day shelf-life</li>
              <li class="animate-fade-down animate-delay-[5500ms]">✔ The easiest-to-digest 8g of protein per 250 ml infinitely recyclable can</li>
            </ul>
            <div class="flex w-full border-b-[0.5px] border-black animate-fade animate-delay-[5625ms]" />
            <p class=" animate-flip-down animate-delay-[5625ms] text-xs">For those reasons, we are confident that Cow Juice and Ultra-Retorted Milk will change the world. <div class="inline-block h-2 w-2 bg-cowjuice-red rounded-"></div></p>
          </div>
        </div>
        <p className="w-full flex-1 flex items-end text-[10px] leading-3 font-mono uppercase opacity-60 pt-2 animate-flip-up animate-delay-[5750ms]">
          Ultra‑Retort™, Retortation™, and Cow Juice™ are trademarks of Cow Juice Inc. Ultra-Retorted Milk is proprietary Cow Juice Intellectural Property.
        </p>
      </div>
    </div>
  );
};

export default Press;