import React from "react";

/**
 * FAQ – Frequently Asked Questions about Cow Juice’s Ultra‑Retorted Milk™
 * Matches the zany, typographic, animated UI used across the site.
 */
const Questions = () => {

    const questions = [
        {
            q: "Is this a real product?",
            a: "Yes.\n                  ",
            delay: "50ms",
        },
        {
            q: "What is Ultra‑Retorted Milk™?",
            a: "Ultra‑Retortation™ is our proprietary high‑heat pasteurization sorcery that caramelizes milk’s natural sugars, creating a naturally sweeter, shelf‑stable, lactose‑free can of glory.\n                  ",
            delay: "100ms",
        },
        {
            q: "Is Cow Juice really lactose‑free?",
            a: "Absolutely. Lactase enzyme is added to our milk to hydrolyze every last lactose molecule, granting you the gift of Lactose‑Freedom™.",
            delay: "150ms",
        },
        {
            q: "Do I need to keep Cow Juice refrigerated?",
            a: "Before cracking it open, no — Ultra‑Retorted Milk™ boasts a 365‑day ambient shelf‑life (see footnote [1]). After opening, treat it like regular milk: chug immediately or refrigerate for up to 7 days (if it lasts that long).",
            delay: "200ms",
        },
        {
            q: "Does it taste like regular milk?",
            a: "Yes — but better. Think milk, but with a subtle, caramelized sweetness Mother Nature would’ve added if she’d had the audacity to give retortation a chance.",
            delay: "250ms",
        },
        {
            q: "Will shotgunning Cow Juice turn me into a cow?",
            a: "Yes – obviously.",
            delay: "300ms",
        },
        {
            q: "Where does the milk come from?",
            a: "Cow Juice's milk supply is 100 % Grade A milk from hard‑working Upper‑Midwestern dairy farmers who high‑five their cows daily for morale. All our milk is hormone and antibiotic free.",
            delay: "350ms",
        },
        {
            q: "Is the can recyclable?",
            a: "Infinitely. Aluminum is the GOAT of recycling materials. Just rinse, recycle, repeat (see footnote [3]).",
            delay: "400ms",
        },
        {
            q: "Why does the milk look caramelly in color?",
            a: "Because it's retorted. The high heat of retortation is optimized to caramelize the natural sugars in milk.",
            delay: "450ms",
        },
        {
            q: "Does Ultra‑Retorted Milk™ contain preservatives?",
            a: "Zero. Nada. The retort process itself locks in freshness — like cryogenic sleep, but tastier.",
            delay: "500ms",
        },
        {
            q: "Why hasn’t milk been canned before?",
            a: "Because destiny waited for 2025 and the audacity of Cow Juice. You’re welcome, planet milk.",
            delay: "550ms",
        },
    ];
    return (
        <div className="inset-0 flex flex-row items-start justify-center flex-1 min-h-screen pt-24 px-6 pb-6 w-full h-full overflow-hidden">
            <div className="flex flex-1 max-w-6xl mx-auto w-full h-full">
                {/* ── 3‑col grid on lg+, stacked on sm ─────────────────────────────── */}
                <div className="flex flex-col-reverse sm:grid sm:grid-cols-1 gap-8 lg:grid-cols-3 h-full items-start justify-center animate-fade">

                    {/* ─── Right‑hand Footnotes panel (md+) ─────────────────────────── */}
                    <div className="flex flex-col flex-1 w-full h-full border-[0.5px] border-black rounded-sm items-start justify-between space-y-2 p-2 sm:p-4 animate-fade-up sm:animate-fade-left">
                        <div className="flex flex-1 flex-col items-start w-full space-y-2 opacity-60">
                            <p className="text-[10px] leading-3 font-mono uppercase font-bold text-left animate-flip-down animate-delay-[125ms]">
                                A necessary novella of footnotes and legalese, because Ultra‑Retortation™ is too glorious for a single asterisk.
                            </p>
                            <p className="text-[10px] leading-3 font-mono text-left w-full inline border-[0.5px] border-transparent hover:bg-neutral-100 hover:border-black transition-colors duration-300 cursor-default rounded-md animate-flip-down animate-delay-[250ms]">
                                <sup>[1]</sup> Ultra‑Retorted Milk™ ships happily unrefrigerated but lives its best life chilled — like your ex, but sweeter.
                            </p>
                            <p className="text-[10px] leading-3 font-mono text-left w-full inline border-[0.5px] border-transparent hover:bg-neutral-100 hover:border-black transition-colors duration-300 cursor-default rounded-md animate-flip-down animate-delay-[375ms]">
                                <sup>[2]</sup> Lactose‑Freedom™ achieved via the almighty lactase enzyme. Your stomach may now rejoice in polyphonic harmony.
                            </p>
                            <p className="text-[10px] leading-3 font-mono text-left w-full inline border-[0.5px] border-transparent hover:bg-neutral-100 hover:border-black transition-colors duration-300 cursor-default rounded-md animate-flip-down animate-delay-[500ms]">
                                <sup>[3]</sup> Aluminum cans are infinitely recyclable; please don’t turn them into pencil holders unless you recycle the pencil holder later.
                            </p>
                            <p className="text-[10px] leading-3 font-mono text-left w-full inline border-[0.5px] border-transparent hover:bg-neutral-100 hover:border-black transition-colors duration-300 cursor-default rounded-md animate-flip-down animate-delay-[625ms]">
                                <sup>[4]</sup> Contains: Milk (obviously). Not suitable for those who think almond “milk” counts as real milk.
                            </p>
                        </div>
                        <p className="font-mono py-2 text-[10px] leading-3 uppercase opacity-60 border-t-[0.5px] border-black">
                            Ultra‑Retorted™, Retortation™, &amp; Cow Juice™ are trademarks of Cow Juice Inc. Rip ’em and we’ll retort you with the next batch.
                        </p>
                    </div>

                    {/* ─── Main FAQ content (spans 2 cols on lg+) ────────────────────── */}
                    <div className="flex flex-col col-span-2 justify-start items-center space-y-4 w-full animate-fade">
                        {/* Page intro */}
                        <p className="w-full font-mono text-xs font-bold uppercase rounded-sm border-black dark:bg-white dark:border-white dark:text-black animate-flip-down">
                            Everything you never knew you needed to know about the juice of a cow — answered.
                        </p>

                        {/* FAQ list */}
                        <div className="flex flex-col w-full space-y-2">
                            {questions.map((item, idx) => (
                                <details
                                    key={idx}
                                    className={`group border-[0.5px] border-black rounded-sm p-2 w-full animate-flip-down animate-delay-[${item.delay}]`}
                                >
                                    <summary className="cursor-pointer font-mono text-xs uppercase font-bold flex justify-between items-center">
                                        {item.q}
                                        <span className="transition-transform duration-300 group-open:rotate-45">＋</span>
                                    </summary>
                                    <p className="mt-2 font-mono text-[10px] leading-3 sm:text-xs sm:leading-normal uppercase animate-flip-down">
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