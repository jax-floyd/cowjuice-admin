import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import mockup_2 from "../../assets/250ml_mockup_2.png";

/**
 * ProductDetails – PDP for the “Liquid Death of milk.”
 * Responsive, animated, and edgy (in the Cow Juice tone).
 */
const ProductDetails = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    const [product, setProduct] = useState(state?.product || null);

    const [qty, setQty] = useState(1);

    const increment = () => setQty((q) => Math.min(q + 1, 10));
    const decrement = () => setQty((q) => Math.max(q - 1, 1));

    return (
        <div className="inset-0 flex flex-1 max-w-3xl min-h-screen mx-auto px-6 pb-6 pt-24 w-full h-full overflow-hidden">
            <div className="flex flex-col items-center justify-start space-y-4 w-full animate-fade">
                <p class={`w-full font-mono text-xs font-bold uppercase rounded-sm border-black dark:bg-white dark:border-white dark:text-black animate-flip-down`} >
                    These eight stone‑cold cans of caramel‑kissed, lactose‑free Cow Juice will crush your deepest caramelized cravings.
                </p>
                <div class="flex flex-row w-full">
                    <img src={mockup_2} alt="Cow Juice Mockup" className="w-full sm:w-1/2 animate-fade-down border-[0.0px] border-black/50 rounded-sm" />
                </div>
                <p className="font-mono text-xs leading-relaxed">
                    Eight stone‑cold cans of caramel‑kissed, lactose‑free fuel designed to
                    convert fragile bones into the bluntest of instruments. 
                    
                    Pasteurised? Nah. We
                    went <em>nuclear</em>. Ultra‑retorted so hard it laughs at
                    refrigeration.
                </p>

                {/* ─── Feature list ──────────────────────────────────────────────── */}
                <ul class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-xs font-semibold font-mono">
                    <li>✔ 100 % dairy milk</li>
                    <li>✔ Lactose‑free</li>
                    <li>✔ Naturally sweet—no added sugar</li>
                    <li>✔ 365-day shelf life</li>
                    <li>✔ 8 g moo-scle building protein per 250 ml can</li>
                    <li>✔ Infinitiely recylable, micro-plastic-free aluminum</li>
                </ul>

                {/* ─── Quantity picker + Buttons ─────────────────────────────────── */}
                <div className="mt-8 flex flex-col w-full items-center gap-4">
                    <div className="inline-flex w-full font-mono text-xs p-2 items-center border-[0.5px] border-black rounded-sm select-none">
                        <button onClick={decrement} className="px-3 border-[0.5px] border-black rounded-lg font-bold">
                            −
                        </button>
                            <span className="font-mono text-xs w-10 text-center">{qty}</span>
                        <button onClick={increment} className="font-mono text-xs  px-3 border-[0.5px] border-black rounded-lg font-bold">
                            +
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                        /* TODO: wire into checkout */
                        }}
                        className="text-xs bg-black text-white border-[0.5px] border-black flex w-full font-mono p-2 rounded-sm font-bold uppercase"
                    >
                        Add {qty} Pack{qty > 1 ? "s" : ""} — ${(qty * 29).toFixed(2)}
                    </button>
                </div>

                {/* ─── Nutrition accordion ─────────────────────────────────────── */}
                <details className="flex flex-col w-full mt-6 border-t border-dashed pt-4">
                    <summary className="cursor-pointer font-semibold font-mono text-xs ">
                        Nutrition Facts &amp; Ingredients
                    </summary>
                    <div className="mt-4 font-mono text-xs leading-relaxed space-y-1 animate-fade-down">
                        <p>Serving Size: 1 can (250 ml)</p>
                        <p>
                        Calories: 160 • Protein: 8 g • Fat: 6 g • Carbs: 18 g • Sugars:
                        12 g
                        </p>
                        <p className="pt-2">
                        <span className="font-semibold">Ingredients:</span> Filtered milk,
                        lactase enzyme, natural caramelization.
                        </p>
                        <p className="opacity-60">
                        Contains: Milk. Produced in a facility that also processes nuts.
                        </p>
                    </div>
                </details>

                {/* ─── Legal ─────────────────────────────────────────────────────── */}
                <p className="font-mono text-xs mt-8 text-[10px] leading-3 uppercase opacity-60">
                    Ultra‑Retorted™, Retortation™, and Cow Juice™ are trademarks of Cow Juice Inc. Ultra-Retorted Milk is proprietary Cow Juice Intellectural Property.
                </p>
            </div>
        </div>
    );
};

export default ProductDetails;