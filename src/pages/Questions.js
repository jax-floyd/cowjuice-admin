import React from "react";

import faq_mark from '../assets/faq_mark.svg';

/**
 * FAQ – Frequently Asked Questions about Cow Juice’s Ultra‑Retorted Milk™
 * Matches the zany, typographic, animated UI used across the site.
 */
const Questions = () => {

    const questions = [
        {
            q: "Is this a real product?",
            a: "Yes.\n                  ",
            delay: "250ms",
        },
        {
            q: "What is Ultra‑Retorted Milk™?",
            a: "Ultra‑Retortation™ is our proprietary high‑heat pasteurization sorcery that caramelizes milk’s natural sugars, creating a slightly sweeter, flavor enhanced, lactose‑free can of milk.\n                  ",
            delay: "300ms",
        },
        {
            q: "Is Cow Juice really lactose‑free?",
            a: "Yes — 100%. Lactase enzyme is added to our milk to hydrolyze every last lactose molecule, granting you the gift of Lactose‑Freedom™.",
            delay: "400ms",
        },
        {
            q: "What is Lactose-Freedom™?",
            a: "Lactose‑Freedom™ is the quality of being lactose-free. Because liberty is important, we've freed milk from the abject heinousness of lactose. Cow Juice's lactose freedom means you can drink as much Cow Juice as you can possibly guzzle down in one sitting.",
            delay: "450ms",
        },
        {
            q: "Do I need to keep Cow Juice refrigerated?",
            a: "Before cracking it open, no — Ultra‑Retorted Milk™ boasts a 365‑day ambient shelf‑life (see footnote [1]). After opening, treat it like regular milk: chug immediately or refrigerate for up to 7 days (if it lasts that long).",
            delay: "500ms",
        },
        {
            q: "Does it taste like regular milk?",
            a: "Yes — but with a more robust, sophisticated flavor. Think milk, but with a subtle, caramelized sweetness Mother Nature would’ve added if she’d had the audacity to give retortation a chance.",
            delay: "550ms",
        },
        {
            q: "Will shotgunning Cow Juice turn me into a cow?",
            a: "Yes – obviously.",
            delay: "600ms",
        },
        {
            q: "Where does the milk come from?",
            a: "Cow Juice's milk supply is 100 % Grade A milk from hard‑working Upper‑Midwestern American dairy farmers who high‑five their cows daily for morale. All our milk is hormone and antibiotic free.",
            delay: "650ms",
        },
        {
            q: "Is the can recyclable?",
            a: "Infinitely. Aluminum is the GOAT of recycling materials. Just rinse, recycle, repeat (see footnote [3]).",
            delay: "700ms",
        },
        {
            q: "Why does the milk taste like butterscotch?",
            a: "Because it's retorted. The high heat of retortation is optimized to caramelize the natural sugars in milk.",
            delay: "750ms",
        },
        {
            q: "Why is the milk caramel colored?",
            a: "Because it's retorted. The high heat of retortation is optimized to caramelize the natural sugars in milk.",
            delay: "800ms",
        },
        {
            q: "How long does Cow Juice last?",
            a: "Cow Juice has a 365-day shelf life. This is 100% due to its Ultra-Retorted nature. The high heat of retortation destroys any and all pathogens which could possibly destroy the deliciousness that is this can of bovine gold.",
            delay: "850ms",
        },
        {
            q: "Does Ultra‑Retorted Milk™ contain preservatives?",
            a: "Absolutely not — never. It is just milk, in a can. The retortation process itself locks in freshness — like cryogenic sleep, but tastier.",
            delay: "850ms",
        },
        {
            q: "Why hasn’t milk been canned before?",
            a: "Because destiny waited for 2025 and the audacity of Cow Juice. You’re welcome, planet milk.",
            delay: "900ms",
        },
        {
            q: "Where is Cow Juice made?",
            a: "Cow Juice is proudly made in America, with the juice of American dairy cows.",
            delay: "950ms",
        },
    ];
    
    return (
        <div className="inset-0 flex flex-row items-start justify-center flex-1 min-h-screen pt-12 px-6 pb-6 w-full h-full overflow-hidden">
            <div className="flex flex-1 max-w-6xl mx-auto w-full h-full">
                {/* ── 3‑col grid on lg+, stacked on sm ─────────────────────────────── */}
                <div className="flex flex-col-reverse sm:grid gap-8 sm:grid-cols-3 h-full items-start justify-center animate-fade">
                    {/* ─── Right‑hand Footnotes panel (md+) ─────────────────────────── */}
                    <div className="flex flex-col flex-1 w-full h-full border-[0.5px] border-black rounded-sm items-start justify-between space-y-2 p-2 sm:p-4 animate-fade-up sm:animate-fade-left">
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
                            <p className="p-1 text-[10px] leading-3 uppercase font-mono text-left w-full inline border-[0.5px] border-transparent hover:bg-neutral-100 hover:border-black transition-colors duration-300 cursor-default rounded-md animate-flip-down animate-delay-[750ms]">
                                <sup>[6]</sup> In the words of another: "Give me liberty — or give me lactose."
                            </p>
                        </div>
                        <p className="font-mono py-2 text-[10px] leading-3  uppercase opacity-60 border-t-[0.5px] border-black">
                            Ultra‑Retorted™, Retortation™, &amp; Cow Juice™ are trademarks of Cow Juice Inc. Rip ’em and we’ll retort you with the next batch of Cow Juice.
                        </p>
                    </div>

                    {/* ─── Main FAQ content (spans 2 cols on lg+) ────────────────────── */}
                    <div className="flex flex-col col-span-2 justify-start items-center space-y-4 w-full animate-fade">
                        {/* On-brand H1 Equiv. */}
                        <div class="flex w-full justify-start">
                            <svg class="flex w-full sm:w-3/4" id="Layer_2" data-name="Layer 2" viewBox="0 0 136.43 116.29">
                                <g id="Layer_1-2" data-name="Layer 1">
                                    <g>
                                        <path class="animate-fade animate-delay-[0ms]" d="M8.27,40.29c0,6.81,1,8.61,25.23,8.61v10c-21.95.14-23.81,1.39-23.95,29.32H0V3.33h34.64v29.46c-25.66.14-26.37,1.94-26.37,7.5Z"/>
                                        <path class="animate-fade animate-delay-[75ms]"  d="M61.16,72.25c-9.27,0-10.98,2.92-13.12,14.03h-11.83L47.9,0h24.38l12.97,90.31h-8.7c-2-14.87-3.85-18.06-15.4-18.06ZM58.17,32.23c-1,0-5.13.14-7.84,14.73-2.28,12.64.71,15.98,7.84,15.98,7.56,0,12.26-2.22,9.12-15.98-3.14-13.75-7.98-14.73-9.12-14.73Z"/>
                                        <path class="animate-fade animate-delay-[150ms]" d="M116.47,89.06c.28,8.75,2.57,9.59,11.4,9.59v15.01c-2.14,1.11-5.7,2.64-9.55,2.64-7.84,0-9.98-3.06-9.98-27.79-15.82-2.64-19.24-17.09-19.24-52.1,0-21.95,3.56-35.85,21.81-35.85,19.67,0,25.52,3.47,25.52,47.24,0,31.54-6.84,40.15-19.96,41.26ZM112.77,31.4c-12.12,0-13.69,6.11-13.69,18.06s2.99,18.34,13.69,18.34,15.11-4.72,15.11-18.34-2.99-18.06-15.11-18.06Z"/>
                                    </g>
                                </g>
                            </svg>
                        </div>

                        {/* Page intro */}
                        <p className="w-full font-mono text-xs font-bold uppercase rounded-sm border-black dark:bg-white dark:border-white dark:text-black animate-flip-down">
                            Everything you'll ever need to know about the juice of a cow — and a good bit you won't.
                        </p>

                        {/* FAQ list */}
                        <div className="flex flex-col w-full space-y-2">
                            {questions.map((item, idx) => (
                                <details
                                    key={idx}
                                    className={`group border-[0.5px] border-black rounded-sm w-full animate-flip-down animate-delay-[${item.delay}]`}
                                >
                                    <summary className="cursor-pointer font-mono text-xs uppercase font-bold flex flex-1 w-full h-full px-2 py-4 justify-between items-center">
                                        <p class="flex w-full items-start">{item.q}</p>
                                        <span className="transition-transform duration-300 group-open:rotate-45">＋</span>
                                    </summary>
                                    <div class="flex w-full border-t-[0.5px] border-black px-2 " />
                                    <p className="mt-2 font-mono text-[11px] px-2 pb-2 leading-3 sm:text-xs sm:leading-normal uppercase animate-flip-down">
                                        {item.a}
                                    </p>
                                </details>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Questions;