import React, { useState, useEffect } from 'react';

import mockup_1 from '../assets/mockup_1.png';
import mockup_2 from '../assets/mockup_2.png';
import rack_1 from '../assets/rack_1.png';
import rack_2 from '../assets/rack_2.png';

const Pitch = () => {

    const [slide, setSlide] = useState(0);

    const next = () => {
        setSlide((prevSlide) => (prevSlide + 1));
    };

    const back = () => {
        setSlide((prevSlide) => (prevSlide - 1));
    };

    return (
        <div 
            className="w-full flex flex-col flex-1 max-w-7xl mx-auto p-4 items-center justify-between animate-fade"
        >
            {slide === 0 && (
                <div className="flex bg-white flex-col w-full justify-center border-[0.5px] border-black rounded-xl max-w-3xl p-4 space-y-2">
                    <p className="font-mono text-xs font-bold uppercase w-full">Cow Juice: The World's First Can of Milk</p>
                    <p className="font-mono text-xs">A <a class="underline" href="https://www.linkedin.com/in/jax-floyd-073a58155/" target="_blank" rel="noopener noreferrer">Stanford dropout</a> wants to bring you the world's first can of milk.</p>
                    <div className="flex w-full border-[0.5px] border-black/25 my-2"></div>
                    <img src={mockup_1} alt="Cow Juice Mockup" className="sm:w-1/2 w-2/3 animate-fade-down border-black/50 mb-4" />
                    <div className="flex w-full border-[0.5px] border-black/25 my-2"></div>
                    <p className="font-mono text-xs">We need your help — <span class="font-bold">250,000 dollars</span> — to turn this viral concept into reality.</p>
                    <a 
                        className="flex w-full bg-black text-white text-xs font-mono p-2 rounded-sm my-4"
                        onClick={next}
                    >
                        why you should help
                    </a>
                </div>
            )}
            {slide === 1 && (
                <div className="flex flex-col w-full border-[0.5px] border-black rounded-xl max-w-3xl p-4 space-y-2 animate-fade-left">
                    <p className="font-mono text-xs font-bold uppercase">People want a can of milk</p>
                    <p className="font-mono text-xs">Thousands of people tell us they want to buy this can of milk. And they already have.</p>
                    <div className="flex w-full border-[0.5px] border-black/25 my-2"></div>
                    <img src={mockup_2} alt="Cow Juice Mockup" className="sm:w-1/2 w-2/3 animate-fade-down border-black/50 mb-4" />
                    <div className="flex w-full border-[0.5px] border-black/25 my-2"></div>
                    <p className="font-mono text-xs">In one month, we've done:</p>
                    <p className="font-mono text-xs ml-8">— <span class="font-bold">$5k</span> in pre-order revenue</p>
                    <p className="font-mono text-xs ml-8">— <span class="font-bold">16M views</span> & <span class="font-bold">1M likes</span> across socials</p>
                    <p className="font-mono text-xs ml-8">— ammassed a following of <span class="font-bold">25k</span> future cow juice drinkers</p>
                    <p className="font-mono text-xs">and we've spent exactly <span class="font-bold">$55.67</span> to do it.</p>
                    <div className="flex w-full border-[0.5px] border-black/25 my-2"></div>
                    <p className="font-mono text-xs">Not convinced people want a can of milk? <a class="font-bold underline underline-offset-2" href="https://www.tiktok.com/@juiceofacow" target="_blank" rel="noopener noreferrer">Read what they're saying</a>.</p>
                    <a className="flex w-full bg-black text-white text-xs font-mono p-2 rounded-sm my-4" onClick={next}>explore the opportunity</a>
                    <a className="flex w-full bg-white border-[0.5px] border-black text-xs font-mono p-2 rounded-sm my-4"onClick={back}> back</a>
                </div>
            )}
            {slide === 2 && (
                <div className="flex flex-col w-full border-[0.5px] border-black rounded-xl max-w-3xl p-4 space-y-2 animate-fade-left">
                    <p className="font-mono text-xs font-bold uppercase">The market for Cow Juice is massive</p>
                    <p className="font-mono text-xs">Fluid milk will be a <a class="underline" href="https://www.imarcgroup.com/fluid-milk-market#:~:text=The%20global%20fluid%20milk%20market,dietary%20restrictions%20or%20lactose%20intolerance." target="_blank" rel="noopener noreferrer">$220B market</a> by 2032 — 2% CAGR growth driven by lactose-free, Functional RTD:</p>
                    <p className="font-mono text-xs ml-8">— We're set to break into an untapped and sparsely-populated aisle: single-serve milk.</p>
                    <p className="font-mono text-xs ml-16">— How do we know people want to drink milk on-the-go? <span class="font-bold">They've told us a few thousand times.</span></p>
                    <p className="font-mono text-xs ml-8">— Cow Juice is lactose-free, catering to 80% of adults who don't drink milk because of bloat.</p>
                    <p className="font-mono text-xs ml-16">— And because it's lactose-free, Cow Juice will be the <span class="font-bold">sweetest</span> & <span class="font-bold">richest</span> milk ever crafted.<sup>[1]</sup></p>
                    <div className="flex w-full border-[0.5px] border-black/25 my-2"></div>
                    <p className="font-mono text-xs">Cow Juice is a radically different take on milk. That difference is why, against all odds, we might just succeed.</p>
                    <a className="flex w-full bg-black text-white text-xs font-mono p-2 rounded-sm my-4" onClick={next}>how you can help</a>
                    <a className="flex w-full bg-white border-[0.5px] border-black text-xs font-mono p-2 rounded-sm my-4"onClick={back}> back</a>
                </div>
            )}
            {slide === 3 && (
                <div className="flex flex-col w-full border-[0.5px] border-black rounded-xl max-w-3xl p-4 space-y-2 animate-fade-left">
                    <p className="font-mono text-xs font-bold uppercase">Your $250k will finance a pilot production run for hyper-local regional distribution</p>
                    <p className="font-mono text-xs">Where the money will go:</p>
                    <img src={rack_2} alt="Cow Juice Mockup" className="sm:w-full w-full animate-fade-down border-black/50 mb-4" />
                    <p className="font-mono text-xs ml-8">— <span class="font-bold">$50k</span> for formulation & product development</p>
                    <p className="font-mono text-xs ml-8">— <span class="font-bold">$125k</span> for working capital [MOQ pilot run is 125k cans @ ~ USD 1 / unit w. AVG SRP USD 3.99]</p>
                    <p className="font-mono text-xs ml-8">— <span class="font-bold">$50k</span> for distribution logistics, split between select DTC and regional (NYC, Northeast) c-store sales</p>
                    <p className="font-mono text-xs ml-8">— <span class="font-bold">$25k</span> for legal, brand building, & business formulation and development</p>
                    <div className="flex w-full border-[0.5px] border-black/25 my-2"></div>
                    <p className="font-mono text-xs">We’ve validated strong demand for Cow Juice. Now, we’re bringing the first canned milk to life.</p>
                    <a className="flex w-full bg-black text-white text-xs font-mono p-2 rounded-sm my-4" onClick={next}>Learn More</a>
                    <a className="flex w-full bg-white border-[0.5px] border-black text-xs font-mono p-2 rounded-sm my-4" onClick={back}>Previous Step</a>
                </div>
            )}
            {slide === 4 && (
                <div className="flex flex-col w-full border-[0.5px] border-black rounded-xl max-w-3xl p-4 space-y-2 animate-fade-left">
                    <p className="font-mono text-xs font-bold uppercase">Join us on this journey</p>
                    <p className="font-mono text-xs">More than anything else, we need partners in traversing the very difficult path before us.</p>
                    <div className="flex w-full border-[0.5px] border-black/25 my-2"></div>
                    <p className="font-mono text-xs">Your investment isn’t just about money; frankly we need any and all help you're willing to offer.</p>
                    <p className="font-mono text-xs">Only with your help can make Cow Juice the hottest name in milk.</p>
                    <a className="flex w-full bg-black text-white text-xs font-mono p-2 rounded-sm my-4" href="/preorder">sold? preorder cow juice !</a>
                    <a className="flex w-full bg-white border-[0.5px] border-black text-xs font-mono p-2 rounded-sm my-4"onClick={back}> back</a>
                </div>
            )}

            <div class="flex flex-1 items-end max-w-3xl">
                {slide === 2 && <p class="text-xs font-mono animate-fade-up animate-delay-300"><span class="font-bold">[1] </span>Lactose-free milk has a sweeter-to-the-tongue taste than normal milk with no-added-sugar & identical nutrition. Out canning enchances this sweetness, yielding a taste nearly reminiscent of liquid ice cream.</p>}
            </div>
        </div>
    );
};

export default Pitch;
