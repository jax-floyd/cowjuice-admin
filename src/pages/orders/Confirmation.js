import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Typewriter from 'typewriter-effect';

import mockup_2 from '../../assets/250ml_mockup_2.png';

const OrderConfirmation = () => {
    const { state } = useLocation();
    const navigate   = useNavigate();

    const order = state?.order.order;

    // We need to write a function that determines the total number of cans based on the product name and quantity
    const computeTotalCans = () => {
        const productName = order.line_items[0].name;
        const quantity = order.line_items[0].quantity;
        let totalCans = 0;
        if (productName.includes('12')) {
            totalCans = 12 * quantity;
        } else if (productName.includes('8')) {
            totalCans = 8 * quantity;
        } else if (productName.includes('6')) {
            totalCans = 6 * quantity;
        } else {
            totalCans = 0 * quantity; // Default case
        }
        return totalCans;
    };

    // We write a helper to get the customer's cleaning formated (caps proper) name
    const getCustomerName = () => {
        const firstName = order.customer.first_name;
        const lastName = order.customer.last_name;
        const fullName = `${firstName} ${lastName}`;
        const formattedName = fullName
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
        return formattedName;
    };

    /* ---------- copy ---------- */
    const firstMessageSet = [
        `And just like that, <span class="font-bold">${getCustomerName()}</span>, you have successfully ordered the world's first can of milk.`,
        `Your confirmation number is <span class='font-bold'>#${order.confirmation_number}</span>, which you should save to <a href="/orders/status/'${order.confirmation_number}" target=_blank class="px-1 rounded-sm border-[0.5px] border-black text-black font-bold uppercase animate-pulse">track your order at any time</a>.`,
    ];

    const secondMessageSet = [
        `${computeTotalCans()} cans of <span class='text-cowjuice-gold font-bold border-[0.5px] border-cowjuice-gold rounded-sm px-[2px]'>Ultra-Retorted™ Lactose-Free Cow Juice</span> will arrive on your doorstep momentarily, fulfilled by Cow Juice Man himself.`,
        "Cow Juice Inc. thanks you kindly for believing in the <span class='text-cowjuice-red font-bold border-[0.5px] border-cowjuice-red rounded-sm px-[2px]'>Ultra-Retort™</span> revolution and asks you to reach out with any feedback related to these, the world\'s first cans of milk.",
    ];

    /* ---------- stage flags ---------- */
    const [firstStage,  setFirstStage]  = useState(0);      // index of first set now showing
    const [showImage,   setShowImage]   = useState(false);  // can mock‑up
    const [secondStage, setSecondStage] = useState(-1);     // ‑1 = not started
    const [showBtns,    setShowBtns]    = useState(false);  // CTA buttons

    /* helper to move through first set */
    const advanceFirst = ( idx ) => {
        if (idx < firstMessageSet.length - 1) {
            setFirstStage(idx + 1);
        } else {
            /* finished first batch ➜ show image ➜ start second set */
            setShowImage(true);
            setTimeout(() => setSecondStage(0), 1000);          // wait for image fade
        }
    };

    /* helper for second set */
    const advanceSecond = ( idx ) => {
        if (idx < secondMessageSet.length - 1) {
            setSecondStage(idx + 1);
        } else {
            /* all done ➜ reveal CTAs */
            setShowBtns(true);
        }
    };

    /* ---------- share handler ---------- */
    const handleShare = async () => {
        const shareData = {
            text: "You've gotta see the world’s first can of milk 🐄🥛 ...",
            url: window.location.origin,
        };
        try {
            if (navigator.share) await navigator.share(shareData);
        else {
            await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
            alert('Link copied—now moo it forward!');
        }
        } catch (_) {
            /* ignore */
        }
    };

    return (
        <div className="inset-0 flex flex-1 min-h-screen max-w-3xl mx-auto px-6 pb-6 pt-6 w-full h-full overflow-hidden">
            <div className="flex flex-col items-center justify-start space-y-4 w-full animate-fade">

                {/* ---------- 1️⃣ first message set ---------- */}
                {firstMessageSet.map(
                (msg, i) =>
                    i <= firstStage && (
                    <p key={i} className="w-full font-mono text-xs text-left uppercase">
                        <Typewriter
                            options={{ delay: 18, cursor: '', autoStart: true }}
                            onInit={(tw) =>
                                tw.typeString(msg).
                                pauseFor(500).
                                callFunction(() => advanceFirst(i)).start()
                            }
                        />
                    </p>
                    )
                )}

                {/* ---------- 🥫 can mock‑up ---------- */}
                {showImage && (
                    <div class="flex w-full">
                        <img
                            src={mockup_2}
                            alt="A Can of Cow Juice"
                            class="flex w-full sm:w-1/2 animate-fade-down rounded-sm select-none"
                        />
                    </div>
                )}

                {/* ---------- 2️⃣ second message set ---------- */}
                {secondMessageSet.map((msg, i) =>
                    i !== -1 && i <= secondStage && (
                        <p key={i} className="w-full font-mono text-xs text-left uppercase">
                            <Typewriter
                            options={{ delay: 18, cursor: '', autoStart: true }}
                            onInit={(tw) =>
                                tw.typeString(msg)
                                .pauseFor(500).
                                callFunction(() => advanceSecond(i)).start()
                            }
                            />
                        </p>
                    )
                )}

                {/* ---------- ✅ final CTAs ---------- */}
                {showBtns && (
                <div className="flex flex-col w-full space-y-2 animate-fade-up">
                    <button
                        onClick={() => window.open(`/orders/status/'${order.confirmation_number}`)}
                        className="flex w-full p-2 text-xs font-mono font- border-[0.5px] border-black rounded-sm animate-fade-down animate-delay-100"
                    >
                        Check order status ->
                    </button>
                    <button
                        onClick={() => navigate('/shopify/products')}
                        className="flex w-full bg-black text-white p-2 text-xs font-mono font-bold border-[0.5px] border-black rounded-smm animate-fade-right animate-delay-200"
                    >
                        Keep shopping
                    </button>
                    <button
                        onClick={handleShare}
                        className="flex w-full p-2 text-xs font-mono font- border-[0.5px] border-black rounded-sm animate-fade-left animate-delay-300"
                    >
                        Share the world’s first can of milk
                    </button>
                    <a
                        href={`sms:+19178631395?&body=${encodeURIComponent("Hey Cow Juice Man — just ordered the world's first can of milk! 🐄🥛 [P.S., Please don't abuse this # as it is Cow Juice Man's personal cell!]" )}`}
                        class="flex w-full bg-black text-white p-2 text-xs font-mono font-bold border-[0.5px] border-black rounded-sm animate-fade-up animate-delay-500"
                    >
                        Reach out to Cow Juice Man
                    </a>
                </div>
                )}
            </div>
        </div>
    );
};

export default OrderConfirmation;