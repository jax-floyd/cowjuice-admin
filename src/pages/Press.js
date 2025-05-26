import React from "react";
import Typewriter from "typewriter-effect";

/**
 * Press – Liquid‑Death‑toned news dispatch announcing Ultra‑Retorted Milk.
 */
const Press = () => {
  return (
    <div className="inset-0 flex flex-row items-start justify-center flex-1 min-h-screen pt-12 px-6 pb-6 w-full h-full overflow-hidden">
            <div className="flex flex-1 max-w-6xl mx-auto w-full h-full">
                {/* ── 3‑col grid on lg+, stacked on sm ─────────────────────────────── */}
                <div className="flex flex-col-reverse sm:grid sm:grid-cols-1 gap-8 lg:grid-cols-3 h-full items-start justify-center animate-fade">
                  {/* ─── Right‑hand Footnotes panel (md+) ─────────────────────────── */}
                    <div className="flex flex-col flex-1 w-full h-full border-[0.5px] border-black rounded-sm items-start justify-between space-y-2 p-2 sm:p-4 animate-fade-up sm:animate-fade-left animate-delay-[4750ms] sm:animate-delay-[4750ms]">
                        <div className="flex flex-1 flex-col items-start w-full space-y-1 opacity-60">
                            <p className="text-[10px] leading-3 font-mono uppercase font-bold text-left animate-flip-down animate-delay-[250ms]">
                                A necessary novella of footnotes and legalese, because Ultra‑Retortation™ is too glorious for a single asterisk.
                            </p>
                            <p className="p-1 text-[10px] leading-3 uppercase font-mono text-left w-full inline border-[0.5px] border-transparent hover:bg-neutral-100 hover:border-black transition-colors duration-300 cursor-default rounded-md animate-flip-down animate-delay-[375ms]">
                                <sup>[1]</sup> Ultra‑Retorted Milk™ ships happily unrefrigerated but lives its best life chilled — like your ex, but sweeter.
                            </p>
                            <p className="p-1 text-[10px] leading-3 uppercase font-mono text-left w-full inline border-[0.5px] border-transparent hover:bg-neutral-100 hover:border-black transition-colors duration-300 cursor-default rounded-md animate-flip-down animate-delay-[500ms]">
                                <sup>[2]</sup> Lactose‑Freedom™ achieved via the almighty lactase enzyme. Your stomach may now rejoice in polyphonic harmony.
                            </p>
                            <p className="p-1 text-[10px] leading-3 uppercase font-mono text-left w-full inline border-[0.5px] border-transparent hover:bg-neutral-100 hover:border-black transition-colors duration-300 cursor-default rounded-md animate-flip-down animate-delay-[625ms]">
                                <sup>[3]</sup> Aluminum cans are infinitely recyclable; please don’t turn them into pencil holders unless you recycle the pencil holder later.
                            </p>
                            <p className="p-1 text-[10px] leading-3 uppercase font-mono text-left w-full inline border-[0.5px] border-transparent hover:bg-neutral-100 hover:border-black transition-colors duration-300 cursor-default rounded-md animate-flip-down animate-delay-[750ms]">
                                <sup>[4]</sup> Contains: Milk (obviously). Not suitable for those who think almond “milk” counts as real milk.
                            </p>
                            <p className="p-1 text-[10px] leading-3 uppercase font-mono text-left w-full inline border-[0.5px] border-transparent hover:bg-neutral-100 hover:border-black transition-colors duration-300 cursor-default rounded-md animate-flip-down animate-delay-[750ms]">
                                <sup>[5]</sup> In the words of a great American: "Free at last, Free at last, Thank God almightly Cow Juice is lactose-free at last!"
                            </p>
                        </div>
                        <p className="font-mono py-2 text-[10px] leading-3  uppercase opacity-60 border-t-[0.5px] border-black">
                            Ultra‑Retorted™, Retortation™, &amp; Cow Juice™ are trademarks of Cow Juice Inc. Rip ’em and we’ll retort you with the next batch of Cow Juice.
                        </p>
                    </div>
              <div className="flex flex-col col-span-2 justify-start items-center space-y-4 w-full animate-fade">
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
                  <img class="hidden sm:flex w-full rounded-sm border-[0.5px] border-black animate-flip-down animate-delay-[4600ms]" src={"https://jamesletoile.com/wp-content/uploads/2014/05/98929-oh-well-allow-me-to-retort-gif-jle0-2.gif"} />
                  <img class="flex sm:hidden w-full rounded-sm border-[0.5px] border-black animate-flip-down animate-delay-[4600ms]" src={"https://media.tenor.com/U9fMFxiKWQYAAAAM/retort.gif"} />
                  
                  <p class="flex w-full text-[10px] leading-3 font-mono animate-flip-up animate-delay-[4600ms]">[i]. Obviously not&nbsp;<span class="font-bold underline">that ^</span>&nbsp;retort.</p>
                </div>

                {/* ─── Typewriter Copy ─────────────────────────────────────────── */}
                <div class="flex flex-1 w-full">
                  <div className="w-full flex-col items-center justify-center space-y-4 font-mono text-xs uppercase rounded-sm border-[0.5px] border-black dark:bg-white dark:border-white dark:text-black animate-fade-up animate-delay-[4600ms] animate-duration-[1500ms] p-2">
                    <p class="animate-flip-down animate-delay-[4750ms] text-[10px] leading-3"><span class="font-bold">[DATELINE]:</span> PALO ALTO, CALIFORNIA — STANFORD UNIVERSITY SCHOOL OF cow juicing & radical canned beverage creation.</p>
                    <div class="flex w-full border-b-[0.5px] border-black" />
                    <p class="animate-flip-down animate-delay-[5000ms]">In a breakthrough designed to confuse lactose-lunatics, refrigerators, and taste buds alike, Cow Juice Inc. today announced the release of ultra-retorted milk.</p>
                    <p class="animate-flip-down animate-delay-[5125ms]">As Founder, Cow Juice Man, explained on the TikTok <a href="https://www.tiktok.com/@juiceofacow/video/7506352605468118315" target="_blank" rel="noopener noreferrer" class="bg-white text-cowjuice-gold border-[0.5px] border-cowjuice-gold font-bold rounded-sm px-[2px] animate-pulse">Press Conference</a>, ultra-retorted milk is produced by pasteurizing milk under ultra-retort pasteurization, a scientific process more commonly known as <span class='border-[0.5px] border-cowjuice-red text-cowjuice-red uppercase rounded-sm px-[2px] font-bold'>retortation™</span>.</p>
                    <div class="flex w-full border-b-[0.5px] border-black animate-fade animate-delay-[5250ms]" />
                    <p class="animate-flip-down font animate-delay-[5375ms]">Retortation — the high-heat pasteurization which turns normal milk into ever-so-slightly sweeter lactose-free cow juice - offers milk-lovers three (3) benefits which promise to usher in a new era of milk:</p>
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
              </div>
            </div>
          </div>
    </div>
  );
};

export default Press;