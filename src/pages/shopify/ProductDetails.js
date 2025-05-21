import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

import mockup_2 from "../../assets/250ml_mockup_2.png";
import mockup_4 from "../../assets/250ml_mockup_4.png";
import mockup_5 from "../../assets/250ml_mockup_5.png";
import rack_2 from "../../assets/rack_2.png";
import rack_3 from "../../assets/rack_3.png";

import AmericanFlag from "../../components/icons/AmericanFlag";

/**
 * ProductDetails – PDP for the “Liquid Death of milk.”
 * Responsive, animated, and edgy (in the Cow Juice tone).
 */
const ProductDetails = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    const intervalRef = useRef(null);

    /* Autoplay for image carousel */
    useEffect(() => {
        intervalRef.current = setInterval(next, 5000);
        return () => clearInterval(intervalRef.current);
    }, []);

    /* Swipe refs for swiping on carousel */
    const touchStartX = useRef(null);
    const SWIPE_TOLERANCE = 50;          // px needed to trigger a change

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
        clearInterval(intervalRef.current);          // pause autoplay while swiping
    };

    const handleTouchEnd = (e) => {
        const delta = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(delta) > SWIPE_TOLERANCE) {
            delta < 0 ? next() : prev();               // left swipe → next, right → prev
        }
        /* restart autoplay */
        intervalRef.current = setInterval(next, 5000);
    };

    const [product, setProduct] = useState(state?.product || null);

    const [qty, setQty] = useState(1);

    const increment = () => setQty((q) => Math.min(q + 1, 10));
    const decrement = () => setQty((q) => Math.max(q - 1, 1));

    const images = [mockup_5, rack_3, mockup_2, rack_2, mockup_4];
    const [slide, setSlide] = useState(0);

    const next  = () => setSlide((i) => (i + 1) % images.length);
    const prev  = () => setSlide((i) => (i - 1 + images.length) % images.length);

    const handleBuyNowClick = async ( product ) => {

        const numericId = product.id;
        const uniqueSuffix = uuidv4().replace(/-/g, '');
        const cleanCheckoutId = `${numericId}-${uniqueSuffix}`;
        
        navigate(`/checkouts/${cleanCheckoutId}/contact-entry/impatient`, { state: { product: product } });
    };

    return (
        <div className="inset-0 flex flex-row items-start justify-center flex-1 min-h-screen pt-24  px-6 pb-6 w-full h-full overflow-hidden">
            <div class="flex flex-1 max-w-6xl mx-auto w-full h-full">
                <div className="flex flex-col-reverse sm:grid sm:grid-cols-1 gap-8 lg:grid-cols-3 h-full items-start justify-center animate-fade">
                    {/* Footnotes side tab to be shown on md+ */}
                    <div className="flex flex-col flex-1 w-full h-full border-[0.0px] sm:border-[0.5px] border-black rounded-sm items-start justify-between space-y-2 p-0 sm:p-4 animate-fade-up lg:animate-fade-left">
                        <div className="flex flex-1 flex-col items-start w-full space-y-2 uppercase">
                            <p class="text-[10px] uppercase font-mono font-bold text-left leading-3">A selection of very important footnotes pertaining to the world's first can of milk which absolutely must be read to understand the ultra-retortation of milk.</p>
                            <p className="text-[10px] leading-3 sm:text-xs sm:leading-normal font-mono text-left w-full inline border-[0.5px] border-transparent hover:bg-neutral-100 hover:border-black transition-colors duration-300 cursor-default rounded-md p-0 sm:p-1 animate-flip-down animate-delay-[125ms]">
                                <sup>[1]</sup> Cow Juice will soon release a 19.2oz tallboy version of this, the same Ultra-Retorted Milk. These smallboys to be available only for a limited time.
                            </p>
                            <p className="text-[10px] leading-3 sm:text-xs sm:leading-normal font-mono text-left w-full inline border-[0.5px] border-transparent hover:bg-neutral-100 hover:border-black transition-colors duration-300 cursor-default rounded-md p-0 sm:p-1 animate-flip-down animate-delay-[250ms]">
                                <sup>[2]</sup> Cow Juice's Ultra-Retorted Milk is in no way intended for the weak-boned individuals who can't stomach the thought of drinking the purest protein on planet earth.
                            </p>
                            <p className="text-[10px] leading-3 sm:text-xs sm:leading-normal font-mono text-left w-full inline border-[0.5px] border-transparent hover:bg-neutral-100 hover:border-black transition-colors duration-300 cursor-default rounded-md p-0 sm:p-1 animate-flip-down animate-delay-[375ms]">
                                <sup>[3]</sup> Cow Juice Inc. has secured only the highest-quality milk for the production of this Ultra-Retorted Cow Juice. Our milk supply comes entirely from Upper Midwestern dairy cows, raised by hard-working, dedicated, and all-around amazing American Dairy Farmers, whom Cow Juice Inc. is immensely proud to support.
                            </p>
                            <p className="text-[10px] leading-3 sm:text-xs sm:leading-normal font-mono text-left w-full inline border-[0.5px] border-transparent hover:bg-neutral-100 hover:border-black transition-colors duration-300 cursor-default rounded-md p-0 sm:p-1 animate-flip-down animate-delay-[500ms]">
                                <sup>[4]</sup> Ultra-Retortation™ is Cow Juice Inc.'s proprietary pasteurization process that makes this can of milk last longer than your houseplants and taste the like caramelized Cow Juice you never knew planet milk needed.
                            </p>
                            {/* ─── Nutrition accordion ─────────────────────────────────────── */}
                            <details className="flex flex-col w-full mt-6 border-t-[0.5px] border-dashed border-black pt-4">
                                <summary className="cursor-pointer font-semibold font-mono text-[10px] leading-3 uppercase sm:text-xs sm:leading-normal">
                                    Nutrition Facts &amp; Ingredients<sup class=""></sup>
                                </summary>
                                <div className="mt-4 font-mono text-[10px] leading-3 sm:text-xs sm:leading-normal space-y-1 animate-fade-down">
                                    <p>Serving Size: 1 can (8oz) (250 ml)</p>
                                    <p>
                                    Calories: 120 • Protein: 8 g • Fat: 5 g • Carbs: 11 g • Sugars:
                                    12 g [Including 0g Added Sugars]
                                    </p>
                                    <p className="pt-2 text-[10px] leading-3 sm:text-xs sm:leading-normal">
                                    <span className="font-semibold">Ingredients:</span> Ultra-Retorted Reduced Fat Milk,
                                    Lactase Enzyme, Vitamin A, Vitamin D3.
                                    </p>
                                    <p className="pt-2 font-bold text-[10px] leading-3 sm:text-xs sm:leading-normal">Best enjoyed refrigerated</p>
                                    <p className="opacity-60 text-[10px] leading-3 sm:text-xs sm:leading-normal">
                                    Contains: Milk (duh). Produced in a facility that also processes milk (double duh).
                                    </p>
                                </div>
                            </details>
                        </div>
                        <p className="font-mono py-2 text-[10px] leading-3 uppercase opacity-60 border-t-[0.5px] border-black">
                            Ultra-Retorted™, Retortation™, &amp; Cow Juice™ are trademarks of Cow Juice Inc. Rip ’em and we’ll toss you in the retort with the next batch.
                        </p>
                    </div>
                    <div class="flex flex-col col-span-2 justify-start items-center space-y-4 w-full animate-fade">
                        <p class={`w-full font-mono text-xs font-bold uppercase rounded-sm border-black dark:bg-white dark:border-white dark:text-black animate-flip-down`} >
                            This <span class="font-bold text-cowjuice-gold border-[0.5px] border-cowjuice-gold px-[2px] rounded-sm">{product.title.includes('6') ? '6' : product.title.includes('8') ? '8' : product.title.includes('12') ? '12' : ''}-pack</span> of Ultra-Retorted Cow Juice will leave you wondering why it took until 2025 for milk to come in a can.<sup>[1]</sup>
                        </p>
                        <div 
                            className="relative flex-1 h-full w-full rounded-sm animate-fade-up overflow-hidden"
                            onTouchStart={handleTouchStart}
                            onTouchEnd={handleTouchEnd}
                        >
                            {/* slide track */}
                            <div
                                className="flex w-full h-full transition-transform duration-500 ease-in-out"
                                style={{ transform: `translateX(-${slide * 100}%)` }}
                            >
                                {images.map((src, i) => (
                                    <img
                                        key={i}
                                        src={src}
                                        alt={`Cow Juice mock‑up ${i + 1}`}
                                        className="flex-shrink-0 w-full"
                                    />
                                ))}
                            </div>

                            {/* arrows */}
                            <button
                                onClick={() => { prev(); clearInterval(intervalRef.current); }}
                                className="absolute top-1/2 left-2 -translate-y-1/2 bg-neutral-100 hover:bg-white border-[0.25px] border-black rounded-xl w-8 h-6 flex items-center justify-center font-bold"
                                aria-label="Previous image"
                            >‹</button>

                            <button
                                onClick={() => { next(); clearInterval(intervalRef.current); }}
                                className="absolute top-1/2 right-2 -translate-y-1/2 bg-neutral-100 hover:bg-white border-[0.25px] border-black rounded-xl w-8 h-6 flex items-center justify-center font-bold"
                                aria-label="Next image"
                            >›</button>

                            {/* dots + progress bar */}
                            <div className="absolute bottom-2 inset-x-0 flex justify-center gap-1">
                                {images.map((_, i) => (
                                <div
                                    key={i}
                                    onClick={() => setSlide(i)}
                                    className="relative w-8 h-2 border-[0.25px] border-black rounded-full overflow-hidden cursor-pointer"
                                >
                                    {/* this inner bar animates only on the active slide */}
                                    <div
                                        className={`absolute inset-0 ${slide === i ? "animate-progress" : "w-0"} bg-black`}
                                    />
                                </div>
                                ))}
                            </div>
                        </div>

                        <div class="flex flex-col items-start justify-center w-full space-y-1">
                            <p class="text-[10px] font-mono font-bold uppercase leading-3 text-left">[What's included?]</p>
                            <li className="font-mono text-xs uppercase">
                                {product.title.includes('6') ? '6' : product.title.includes('8') ? '8' : product.title.includes('12') ? '12' : ''}x stone‑cold 8.0oz cans of Cow Juice's Ultra-Retorted Milk public beta product.<sup>[2]</sup>
                            </li>
                            <li className="font-mono text-xs uppercase">
                                1x beta-testing certificate of entry to the wonderful world of retortation (a.k.a., retort-land).
                            </li>
                             
                        </div>

                        {/* ─── Feature list ──────────────────────────────────────────────── */}
                        <ul class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-xs font-semibold font-mono uppercase">
                            <li>✔ 100 % dairy cow milk</li>
                            <li>✔ Ultra-Retort Pasteurized, Homogenized, Fortified</li>
                            <li>✔ Grade A Product of USA<sup>[3]</sup></li>
                            <li class="inline-flex">✔ Lactose‑Freedom™ <div class="pl-2 flex flex-1"><AmericanFlag /></div></li>
                            <li>✔ Natural sweetness w/ no added sugar</li>
                            <li>✔ 365-day shelf-life w/ no preservatives</li>
                            <li>✔ 8 g moo-scle building protein per 8oz can</li>
                            <li>✔ Infinitely recylable, micro-plastic-free aluminum</li>
                        </ul>

                        {/* ─── Quantity picker + Buttons ─────────────────────────────────── */}
                        <div className="mt-8 flex flex-col w-full items-center gap-4">
                            <div className="flex relative w-full font-mono text-xs p-2 items-center border-[0.5px] bg-neutral-200 border-black rounded-sm select-none">
                                

                                {/* The actual functionality we mask */}
                                <div class="inline-flex w-full font-mono text-xs p-2 items-center border-[0.5px] border-black bg-neutral-200 rounded-sm select-none">
                                    <button onClick={decrement} disabled={true} className="px-3 border-[0.5px] border-black rounded-lg font-bold">
                                        −
                                    </button>
                                        <span className="font-mono text-xs w-10 text-center">{qty}</span>
                                    <button onClick={increment} disabled={true} className="font-mono text-xs  px-3 border-[0.5px] border-black rounded-lg font-bold">
                                        +
                                    </button>
                                    <span class="absolute left-32 hidden sm:block rotate-[-6deg] border-[0.5px] border-black rounded-sm bg-cowjuice-red text-white font-bold uppercase px-[2px]">While we'd love to sell you 20 cases ...</span>
                                    <span class="absolute right-4 rotate-[2deg] border-[0.5px] border-black rounded-sm bg-cowjuice-red text-white font-bold uppercase px-[2px]">Limited to 1-case / beta tester</span>
                                </div>
                                
                            </div>

                            <button
                                type="button"
                                onClick={() => handleBuyNowClick(product)}
                                className="text-xs bg-black hover:bg-cowjuice-gold/50 text-white border-[0.5px] border-black flex w-full font-mono p-2 sm:px-2 sm:py-4 rounded-sm font-bold uppercase transiiton-colors duration-500"
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;