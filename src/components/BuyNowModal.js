import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import triggerPostToListProducts from '../functions/shopify/triggerPostToListProducts';

import rack_1 from '../assets/rack_1.png'; // Assuming you have a rack image

import ExclusivityModal from './ExclusivityModal'; // Assuming you have an ExclusivityModal component
import CheckoutForm from './CheckoutForm'; // Assuming you have a CheckoutForm component

const BuyNowModal = ({ onUnlock }) => {
    const navigate = useNavigate();

    const stripePromise = loadStripe(
      process.env.REACT_APP_ENV === 'development'
        ? process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY_TEST
        : process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY_LIVE
    );

    const [products, setProducts] = useState([]);
    const [product, setproduct] = useState(null);
    
    const [status, setStatus] = useState('idle'); // idle | error | success
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'US'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const fetchProducts = async () => {
        setLoading(true);           // good UX if you let users refresh later
        setError('');
    
        try {
            // your helper should return { products: [...] }
            const products = await triggerPostToListProducts();
            setProducts(products.products);

        } catch (err) {
            console.error('Failed to fetch products:', err);
            setError('Could not load products. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            fetchProducts();
        }, 500);
    }, []);

    const parseTitle = (title) => {
        // We want to return '6-pack' e.g., from "Cow Juice Ultra-Retorted™ 2% Milk — 7-pack"
        const match = title.match(/(\d+-pack)/);
        return match ? match[0] : title; // If no match, return the full title
    };

    const [step, setStep] = useState(1); // 1: email input, 2: review input

    // helpers for styling
    const btnBase    = `flex w-full items-center justify-start font-mono text-xs uppercase font-bold rounded-xl border-[0.5px] transition-colors duration-300`;
    const btnIdle    = `${((formData.email === '') || (step === 2 && formData.address1 === '')) ? 'bg-white text-black border-[0.5px] border-black' : 'bg-black disabled:bg-black/70 text-white border-[0.5px] border-black'}`;
    const btnError   = 'bg-black text-white shake';
    const btnSuccess = 'bg-cowjuice-gold text-white';

    const getButtonClass = () => {
        if (status === 'success') return `${btnBase} ${btnSuccess}`;
        if (status === 'error') return `${btnBase} ${btnError}`;
        return `${btnBase} ${btnIdle}`;
    };


    /* ───────── Private-beta gate ───────── */
    const [unlocked, setUnlocked] = useState(false);

    const price = product?.variants[0].price * 100;
    const numericId = product?.id;
    const uniqueSuffix = uuidv4().replace(/-/g, '');
    const checkoutId = `${numericId}-${uniqueSuffix}`;

    const estimatedTax = price * 0.00; // no tax on food — right ... ?
    const shipping = product?.id === 9976043864353 ? 0 : 499 // flat rate shipping unless 12-pack when we comp, ever so generously
    const amount = price + estimatedTax + shipping;

    const total = amount; // no tax on food — right ... ?

    const [clientSecret, setClientSecret] = useState(null);
    const [paymentIntent, setPaymentIntent] = useState(null);

    const user = {
        email: formData.email,
        name: {
            first: formData.firstName,
            last: formData.lastName
        },
        shipping: {
            address1: formData.address1,
            address2: formData.address2,
            city: formData.city,
            state: formData.state,
            postalCode: formData.postalCode,
            country: formData.country,
            // phone: formData.phone
        }
    };
    
    /* custom appearance optionality */
    const appearance = {
        theme: 'light',
        variables: {
            colorPrimary: '#000', // Custom primary color (e.g., an orange)
            colorBackground: '#FFF', // White background
            colorText: '#000/50', // Text color
            fontFamily: 'Arial, sans-serif', // Custom font family
            // Class rounded
            borderRadius: '0.75rem', // Custom border radius
        },
    };
    
    const options = {
        clientSecret,
        appearance,
        paymentMethodOrder: ['card'], // or any valid combination you want
    };
    
    const handleProceedToPayment = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch('https://api.gotcowjuice.com:2000/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount,
                    email: user.email,
                    name: user.name,
                    shipping: user.shipping
                })
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || 'Failed to create payment intent');

            setClientSecret(data.clientSecret);
            setPaymentIntent(data.paymentIntent);
            setStep(3); // Move to payment step
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        };
    };

    return (
        <>
        {/* {!unlocked && (
            <>
                <div className="fixed inset-0 z-100 animate-fade animate-delay-[750ms]" />

                <ExclusivityModal
                    onUnlock={() => setUnlocked(true)}
                    class="z-100"          // give the modal a higher z if needed
                />
            </>
        )} */}
        <div class={`fixed inset-0 z-50 flex flex-col justify-end space-y-2 px-6 pt-8 pb-6 bg-white backdrop-blur-sm ${status === 'success' ? 'animate-fade-out animate-delay-[750ms] animate-duration-300' : 'animate-fade animate-delay-[0ms]'}`}>
            
            
            {/* Close Button */}
            <button onClick={() => onUnlock(null)} class="absolute top-6 right-6 text-xs text-black font-mono">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-black">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </button>

            {/* Notice of Closure Options */}
            <p class="absolute top-6 left-6 text-[10px] uppercase opacity-60 text-black font-mono">[Click to big round X to close]</p>

            {/* Mockup Carousel */}
            <div class="absolute inset-0 top-16 px-6">
                <motion.div
                    layout
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="w-full rounded-xl border-[0.5px] border-black/10 shadow-sm max-w-xl mx-auto animate-fade-down overflow-hidden"
                    onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
                >
                    <div
                        className="flex w-full transition-transform duration-500 animate-fade animate-delay-300 ease-in-out"
                    >
                        <img
                            src={rack_1}
                            alt={`Cow Juice mock‑up 1`}
                            className="flex-shrink-0 w-full object-cover"
                        />
                    </div>


                    <div className="absolute top-2 inset-y-0 right-2 flex justify-center gap-1">
                        <p class="flex w-full text-[10px] text-black font-mono uppercase opacity-60">"... Moo."™</p>
                    </div>

                    <div className="absolute bottom-2 inset-x-0 left-2 flex justify-center gap-1">
                        <p class="flex w-full text-[10px] text-black font-mono uppercase opacity-60">[#DrinkTheTruth]</p>
                    </div>
                </motion.div>
            </div>
                
            {/* Bottom Button + Footnote + Validation Form */}
            <motion.div 
                layout
                class="flex flex-col items-center w-full max-w-xl mx-auto space-y-3"
                onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
                transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
                {/* Step 1. Contact Entry */}
                {step === 1 && (
                    <>
                        {/* Top Feedback Input */}
                        <div class="flex flex-col items-center w-full max-w-xl mx-auto space-y-2">
                            <p class="font-mono text-[10px] opacity-60 uppercase w-full text-left">Cow Juice is three clicks away:</p>
                            <input
                                name='email'
                                type="email"
                                autoComplete="off"
                                autoCorrect="off"
                                autoCapitalize="off"
                                spellCheck={false}
                                className="w-full border-[0.5px] border-black px-4 py-3 sm:py-4 rounded-xl bg-white focus:outline-none font-mono text-xs h-auto uppercase animate-flip-up"
                                placeholder="Email"
                                value={formData.email}
                                onClick={(e) => e.stopPropagation()}
                                onChange={handleChange}
                            />
                        </div>
                        {formData.email !== '' && (
                            <div className="flex flex-col w-full space-y-2 animate-flip-up animate-delay-[200ms]">
                                <input
                                    name="firstName"
                                    type="text"
                                    autoComplete="off"
                                    autoCorrect="off"
                                    autoCapitalize="off"
                                    spellCheck={false}
                                    placeholder="First Name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    onClick={(e) => e.stopPropagation()}
                                    className="w-full border-[0.5px] border-black px-4 py-3 sm:py-4 rounded-xl bg-white focus:outline-none font-mono text-xs uppercase animate-flip-up"
                                />
                                <input
                                    name="lastName"
                                    type="text"
                                    autoComplete="off"
                                    autoCorrect="off"
                                    autoCapitalize="off"
                                    spellCheck={false}
                                    placeholder="Last Name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    onClick={(e) => e.stopPropagation()}
                                    className="w-full border-[0.5px] border-black px-4 py-3 sm:py-4 rounded-xl bg-white focus:outline-none font-mono text-xs uppercase animate-flip-up"
                                />
                        </div>
                        )}

                        {!(formData.firstName === '' || formData.lastName === '') && (
                            // Checkbox for confidential or public review
                            <div className="grid grid-cols-2 gap-2 w-full items-center justify-between animate-flip-up cursor-pointer">
                                {products.map((p, index) => {
                                    const hasInventory = p.variants[0].inventory_quantity > 0;

                                    return (
                                        <button 
                                        key={index} 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (hasInventory) setproduct(p);
                                        }}
                                        className={`relative flex flex-row items-center justify-center  w-full border-[0.5px] border-black rounded-lg p-2 
                                            ${product?.id === p.id ? 'bg-cowjuice-gold/20 font-bold' : 'bg-white'} 
                                            ${hasInventory ? '' : 'pointer-events-none bg-neutral-100'} 
                                            transition-colors duration-300`}
                                        >
                                        <div class="flex flex-row">
                                            <p className={`text-[10px] leading-3 font-mono uppercase ${hasInventory ? '' : 'line-through opacity-40'}`}>
                                            {parseTitle(p.title)} | 
                                            </p>
                                            <p className={`text-[10px] leading-3 font-mono ${hasInventory ? 'opacity-100' : 'line-through opacity-40'}`}>
                                            &nbsp;${p.variants[0].price}
                                            </p>
                                        </div>

                                        {!hasInventory && (
                                            <div className="absolute inset-0 w-full h-full rounded-lg pointer-events-none" />
                                        )}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </>
                )}
                
                {/* Step 2. Shipping Address */}
                {step === 2 && (
                    <>
                        <button onClick={() => setStep(1)} className="font-mono text-[10px] opacity-60 uppercase w-full text-left">&lt;&lt; Back to Contact Info</button>
                        <div className="flex flex-col w-full space-y-2">
                            <input
                                name="address1"
                                placeholder="Address Line 1"
                                value={formData.address1}
                                onChange={handleChange}
                                required
                                className="text-xs font-mono border-[0.5px] border-black px-4 py-3 sm:py-4 rounded-xl focus:outline-none bg-white uppercase animate-flip-up"
                            />
                            <input
                                name="address2"
                                placeholder="Address Line 2 (optional)"
                                value={formData.address2}
                                onChange={handleChange}
                                className="text-xs font-mono border-[0.5px] border-black px-4 py-3 sm:py-4 rounded-xl focus:outline-none bg-white uppercase animate-flip-up"
                            />
                            <div className="grid grid-cols-2 gap-2">
                            <input
                                name="city"
                                placeholder="City"
                                value={formData.city}
                                onChange={handleChange}
                                required
                                className="text-xs font-mono border-[0.5px] border-black px-4 py-3 sm:py-4 rounded-xl focus:outline-none bg-white uppercase animate-flip-up"
                            />
                            <input
                                name="state"
                                placeholder="State"
                                value={formData.state}
                                onChange={handleChange}
                                required
                                className="text-xs font-mono border-[0.5px] border-black px-4 py-3 sm:py-4 rounded-xl focus:outline-none bg-white uppercase animate-flip-up"
                            />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                            <input
                                name="postalCode"
                                placeholder="Postal Code"
                                value={formData.postalCode}
                                onChange={handleChange}
                                required
                                className="text-xs font-mono border-[0.5px] border-black px-4 py-3 sm:py-4 rounded-xl focus:outline-none bg-white uppercase animate-flip-up"
                            />
                            <input
                                name="country"
                                placeholder="Country"
                                value="US"
                                readOnly
                                className="text-xs font-mono bg-black/5 border-[0.5px] border-black px-4 py-3 sm:py-4 rounded-xl focus:outline-none uppercase animate-flip-up"
                            />
                            </div>
                        </div>
                    </>
                )}

                {/* Step 3. Payment */}
                {step === 3 && (
                    <>
                        {/* Buy Now Subtotal display, with shipping message */}
                        <div className="flex flex-col w-full border-[0.5px] border-black p-2 rounded-xl bg-cowjuice-white/70 text-xs font-mono animate-fade-up animate-delay-[400ms] space-y-1">
                            <span className="font-bold uppercase">Order Summary</span>

                            <div className="flex justify-between uppercase"><span>Shipping:</span><span class="italic">${(shipping / 100).toFixed(2)}</span></div>
                            <div className="flex justify-between uppercase"><span>Total before tax:</span><span>${(amount / 100).toFixed(2)}</span></div>
                            <div className="flex justify-between uppercase"><span>Estimated tax:</span><span>${(estimatedTax / 100).toFixed(2)}</span></div>
                            <div className="flex justify-between font-bold border-t-[0.5px] border-black pt-1 uppercase"><span>Order total:</span><span>${(total / 100).toFixed(2)}</span></div>
                            <p className="text-[10px] opacity-60 uppercase leading-3 pt-1">Shipping costs and applicable taxes will be finalized at checkout.</p>
                        </div>
        
                        {error && <p className="text-red-500 text-sm">{error}</p>}
        
                        {loading && (
                        <div className="flex justify-center items-center w-full py-10">
                            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 animate-spin">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </div>
                        )}

                        {!loading && (
                            <button onClick={() => setStep(2)} className={`font-mono text-[10px] opacity-60 uppercase w-full text-left animate-flip-up animate-delay-300`}>&lt;&lt; Back to Shipping</button>
                        )}

                        {!error && clientSecret && product && user && (
                            <Elements stripe={stripePromise} clientSecret={clientSecret}  options={options}>
                                <CheckoutForm
                                    clientSecret={clientSecret}
                                    paymentIntent={paymentIntent}
                                    product={product}
                                    user={user}
                                    loading={loading}
                                    setLoading={setLoading}
                                    error={error}
                                    setError={setError}
                                />
                            </Elements>
                        )}
                    </>
                )}

                {/* Buttons */}

                {(step === 1 || step === 2) && (
                    <>
                        <button
                            onClick={(e) => {
                                // e.stopPropagation();
                                if (step === 1) {
                                    setStep(2);
                                } else if (step === 2) {
                                    // We create the payment intent.
                                    handleProceedToPayment(e);
                                } else if (step === 3) {
                                    // Go back functionality
                                    setStep(2);
                                } else {
                                    // Default case, just in case
                                    setStep(1);
                                };
                            }}
                            disabled={loading || formData.email === '' || (formData.firstName === '' && formData.lastName === '')}
                            className={getButtonClass()}
                        >
                    {formData.email === '' ? (
                        <p className="font-mono text-xs uppercase font-bold animate-fade py-3 sm:py-4 px-4">Buy Cow Juice<sup> [1]</sup></p>
                    ) : (
                        <div className="flex w-full h-full py-3 sm:py-4 px-4">
                        {loading ? (
                            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 animate-spin">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            <>
                            {status === 'success' ? (
                                <p className="w-full flex font-mono text-xs uppercase font-bold animate-fade">{step === 1 ? 'Proceedeing to shipping!' : 'Proceeding to payment!'}<sup> [2]</sup></p>
                            ) : status === 'error' ? (
                                <p className="w-full flex font-mono text-xs uppercase font-bold animate-fade">Error proceeding to shipping</p>
                            ) : (
                                <p className="w-full flex font-mono text-xs uppercase font-bold animate-fade">{step === 1 ? 'Proceed to shipping' : step === 2 ? 'Proceed to payment' : 'Back'}</p>
                            )}
                            </>
                        )}
                        </div>
                    )}
                    </button>

                    <p onClick={(e) => e.stopPropagation()} className="font-mono text-[10px] leading-3 uppercase opacity-60 animate-flip-down animate-delay-[800ms]">
                        <sup>[1]</sup> Buying Cow Juice will in every which way improve your quality of life. We guarantee it. (Of course not with a money back guarantee, as all sales are final.) The cow (whose name is Jerry) thanks you kindly for your anticipated purchase.
                    </p>
                    <p onClick={(e) => e.stopPropagation()} className={`font-mono text-[10px] leading-3 uppercase animate-flip-down animate-delay-[800ms] ${(formData.firstName === '' || formData.lastName === '') ? 'opacity-0' : 'opacity-60'} transition-opacity duration-[750ms]`}>
                        <sup>[2]</sup> Cow Juice costs $3 per can, which is, considering the revolutionarily caramelly nature of this premo-milk product, an absolute steal. Shipping is free for 12 packs. Please allow n # of days for delivery. If you have any questions, please email Jerry.
                    </p>
                    
                    </>
                )}
                
                {status === 'error' && (
                    <p onClick={(e) => e.stopPropagation()} className="text-[10px] text-cowjuice-red font-mono uppercase animate-flip-up">No order found. Please try again.</p>
                )}
            </motion.div>
            </div>
        </>
    );
};

export default BuyNowModal;
