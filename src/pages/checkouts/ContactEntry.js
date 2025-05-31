import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Typewriter from 'typewriter-effect';
import { motion } from 'framer-motion';

import rack_1 from '../../assets/rack_1.png';
import mockup_2 from '../../assets/250ml_mockup_2.png';
import mockup_7 from '../../assets/250ml_mockup_7.png';
import mockup_8 from '../../assets/250ml_mockup_8.png';

import ExclusivityModal from '../../components/ExclusivityModal.js';

import validateAddress from '../../functions/utils/validateAddress.js';

const ContactEntry = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const product = state?.product;
  console.log(product);
  const price = product?.variants[0].price * 100;
  const checkoutId = window.location.pathname.split('/')[2];

  const estimatedTax = price * 0.00; // no tax on food — right ... ?
  const shipping = product.id === 9976043864353 ? 0 : 499 // flat rate shipping unless 12-pack when we comp, ever so generously
  const amount = price + estimatedTax + shipping;

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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleBack = (e) => {
    e.preventDefault();
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

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
        phone: formData.phone
      }
    };

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

      navigate(`/checkouts/${checkoutId}/payment/${data.paymentIntent.id}`, {
        state: {
          clientSecret: data.clientSecret,
          paymentIntent: data.paymentIntent, // Pass entire payment intent to '/payment' for passing to integrated elements
          product,
          user
        }
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    };
  };

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
          delta < 0 ? next() : prev();              // left swipe → next, right → prev
      }
      /* restart autoplay */
      intervalRef.current = setInterval(next, 5000);
  };

  const images = [rack_1, mockup_2];
  const [slide, setSlide] = useState(0);

  const next  = () => setSlide((i) => (i + 1) % images.length);
  const prev  = () => setSlide((i) => (i - 1 + images.length) % images.length);


  /* ───────── Private-beta gate ───────── */
  const [unlocked, setUnlocked] = useState(false);
  

  return (
    <>
      {/* ───────── Overlay + modal ───────── */}
      {!unlocked && (
        <>
          {/* dim + blur the page beneath */}
          <div className="fixed inset-0 z-40 animate-fade animate-delay-[750ms]" />
          {/* modal itself has higher z-index */}
          <ExclusivityModal
            onUnlock={() => setUnlocked(true)}
            class="z-50"          // give the modal a higher z if needed
          />
        </>
      )}

      <div className="inset-0 flex flex-row items-start justify-center flex-1 min-h-screen pt-6  px-6 pb-6 w-full h-full overflow-hidden">
        <div class="flex flex-1 max-w-6xl mx-auto w-full relative h-full">
          <div
            className="flex relative flex-col space-y-6 lg:grid lg:grid-cols-5 lg:gap-8 lg:space-y-0"
          >
            <div className="flex flex-col w-full items-start justify-start lg:col-span-3 space-y-2">
              <p className="font-mono text-xs uppercase font-bold animate-flip-down animate-delay-200">
                Cow Juice is three clicks away.<sup>[1]</sup>
              </p>

              <div
                  
                  className="relative flex-1 w-full rounded-sm animate-fade-down overflow-hidden"
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
              >
                  {/* slide track */}
                  <div
                      className="flex w-full transition-transform duration-500 animate-fade animate-delay-300 ease-in-out"
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
              {/* ─────────── FORM ─────────── */}
              <form onSubmit={step === 1 ? handleNext : handleSubmit} className="flex flex-col w-full items-center justify-start col-span-3 space-y-4 animate-fade">
                <p className="font-mono text-xs uppercase animate-flip-up animate-delay-300">
                  {product.title.includes('6') ? '6' : product.title.includes('8') ? '8' : product.title.includes('12') ? '12' : ''} stone-cold cans of ultra-retorted™ lactose-free Cow Juice can be on your doorstep within days.<sup>[2]</sup>
                </p>

                <div className="flex flex-col w-full space-y-2 animate-fade-up animate-delay-500">
                  {step === 1 ? (
                    <>
                      <div className="grid grid-cols-2 gap-2">
                        <input name="firstName" placeholder="First Name" onChange={handleChange} required className="text-xs font-mono border-[0.5px] border-black p-2 sm:py-4 sm:px-2 rounded-sm focus:outline-none focus:bg-black/5 transition-colors duration-300 animate-fade-right animate-delay-[300ms]" />
                        <input name="lastName" placeholder="Last Name" onChange={handleChange} required className="text-xs font-mono border-[0.5px] border-black p-2 sm:py-4 sm:px-2 rounded-sm focus:outline-none focus:bg-black/5 transition-colors duration-300 animate-fade-left animate-delay-[400ms]" />
                      </div>
                      <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="text-xs font-mono border-[0.5px] border-black p-2 sm:py-4 sm:px-2 rounded-sm focus:outline-none focus:bg-black/5 transition-colors duration-300 animate-fade-right animate-delay-[500ms]" />
                      <input name="phone" type="tel" placeholder="Phone (optional)" onChange={handleChange} className="text-xs font-mono border-[0.5px] border-black p-2 sm:py-4 sm:px-2 rounded-sm focus:outline-none focus:bg-black/5 transition-colors duration-300 animate-fade-left animate-delay-[600ms]" />
                    </>
                  ) : (
                    <div class="flex flex-col w-full space-y-2">
                      <input name="address1" placeholder="Address Line 1" onChange={handleChange} required className="text-xs font-mono border-[0.5px] border-black p-2 sm:py-4 sm:px-2 rounded-sm focus:outline-none focus:bg-black/5 transition-colors duration-300 animate-fade-right animate-delay-[0ms]" />
                      <input name="address2" placeholder="Address Line 2 (optional)" onChange={handleChange} className="text-xs font-mono border-[0.5px] border-black p-2 sm:py-4 sm:px-2 rounded-sm focus:outline-none focus:bg-black/5 transition-colors duration-300 animate-fade-left animate-delay-[100ms]" />
                      <div className="grid grid-cols-2 gap-2">
                        <input name="city" placeholder="City" onChange={handleChange} required className="text-xs font-mono border-[0.5px] border-black p-2 sm:py-4 sm:px-2 rounded-sm focus:outline-none focus:bg-black/5 transition-colors duration-300 animate-fade-right animate-delay-[200ms]" />
                        <input name="state" placeholder="State" onChange={handleChange} required className="text-xs font-mono border-[0.5px] border-black p-2 sm:py-4 sm:px-2 rounded-sm focus:outline-none focus:bg-black/5 transition-colors duration-300 animate-fade-left animate-delay-[300ms]" />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <input name="postalCode" placeholder="Postal Code" onChange={handleChange} required className="text-xs font-mono border-[0.5px] border-black p-2 sm:py-4 sm:px-2 rounded-sm focus:outline-none focus:bg-black/5 transition-colors duration-300 animate-fade-down animate-delay-[400ms]" />
                        <input name="country" placeholder="Country" value="US" readOnly className="text-xs font-mono bg-black/5 border-[0.5px] border-black p-2.5 sm:py-4 sm:px-2 rounded-sm focus:outline-none focus:bg-black/5 transition-colors duration-300 animate-fade-up animate-delay-[500ms]" />
                      </div>
                    </div>
                  )}

                  {error && <p className="text-xs text-red-500 font-mono">{error}</p>}

                  <div className="flex flex-col w-full sm:flex-row justify-between space-y-2 sm:space-y-0 sm:space-x-2">
                    {step === 1 && (
                      <button
                        type="submit"
                        className="flex text-xs text-left font-mono w-full font-bold uppercase p-2 sm:py-4 sm:px-2 border-[0.5px] rounded-sm border-black bg-black text-white disabled:opacity-50 animate-flip-up animate-delay-[800ms]"
                        disabled={loading}
                      >
                        {loading ? (
                          <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 animate-spin">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : step === 1 ? 'Continue to Shipping' : 'Continue to Payment'}
                      </button>
                    )}
                    {step === 2 && (
                      <>
                        <button
                          type="submit"
                          className="flex text-xs text-left font-mono w-full font-bold uppercase p-2 sm:py-4 sm:px-2 border-[0.5px] rounded-sm border-black bg-black text-white disabled:opacity-50 animate-flip-up animate-delay-[800ms]"
                          disabled={loading}
                        >
                          {loading ? (
                            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 animate-spin">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          ) : (
                            step === 1 ? 'Continue to Shipping' : 'Continue to Payment'
                          )}
                        </button>
                        <button
                          onClick={handleBack}
                          className="flex text-xs text-left font-mono w-full font-bold uppercase p-2 sm:py-4 sm:px-2 border-[0.5px] rounded-sm border-black bg-white text-black animate-fade-left"
                          disabled={loading}
                        >
                          Back
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </form>
              {/* Footnotes explaining CJPRBTP, eventually CJPBTP & product release; only show post closure of Exclusivity */}
              {unlocked && (
                <>
                  <div class="flex w-full pt-12 pb-1 sm:py-4 animate-fade animate-delay-[0ms]">
                    <div class="flex w-full border-t-[0.5px] border-black opacity-60 "/>
                  </div>
                  <div class="flex w-full flex-col items-center justify-center space-y-2">
                      <p class="inline w-full text-[10px] text-left sm:text-xs uppercase font-mono leading-3 text-zinc-500 animate-flip-down animate-delay-[0ms]"><sup>[1]</sup> Cow Juice has been released in private beta. If you're viewing this page, Cow Juice Man has personally decided — after carefully reasoning under a special logical system called moo-rationality — to include you in this super exclusive, all around stupendous group of milk enthusiasts known only as the <span class="text-cowjuice-gold border-[0.5px] border-cowjuice-gold rounded-sm px-[2px] font-bold">Cow Juice Private Beta Testing Program [CJPRBTP]</span>.</p>
                      <p class="inline w-full text-[10px] text-left sm:text-xs uppercase font-mono leading-3 text-zinc-500 animate-flip-down animate-delay-[125ms]"><sup>[2]</sup> Participation in CJPRBTP comes with strings wholly, tightly, and unambiguously attached. Namely: upon receipt of the cow juice, you must communicate to Cow Juice Man a 100% no-glaze, radically honest review of this bovine delight we call Ultra-Retorted Milk™. Consider yourself advised.</p>
                     
                  </div>
                </>
              )}
            </div>
            <div class={`hidden lg:flex w-full items-center justify-end col-span-2 animate-flip-down`}>
              <div class="flex h-full items-start justify-end">
                  {/* The actual logo's SVG */}
                  <svg class="flex text-cowjuice-gold/50 w-full z-20" id="Layer_2" data-name="Layer 2" viewBox="0 0 119.06 300.64">
                      <g id="Layer_1-2" data-name="Layer 1">
                          <g>
                              <path class={"fill-current animate-fade-right animate-delay-[350ms]"} d="M66.88,292.71c18.83,0,22.64-4.86,22.81-23.57h25.57c-.17,24.28-8.12,31.5-57.02,31.5s-55.29-8.76-55.47-32.92h42.68c.17,21.67,2.94,24.99,21.43,24.99Z"/>
                              <path class={"fill-current animate-fade-right animate-delay-[300ms]"} d="M112.32,240.72c0,18.48-15.21,21.2-65.66,21.2-27.3,0-45.79-2.84-45.79-18.12,0-16.34,5.53-21.2,59.96-21.2,41.99,0,51.49,6.63,51.49,18.12ZM40.61,243.32c0,10.42,9.16,11.72,24.36,11.72s24.71-2.61,24.71-11.72-7.43-12.79-24.71-12.79-24.36,2.49-24.36,12.79Z"/>
                              <path class={"fill-current animate-fade-right animate-delay-[250ms]"} d="M113.01,186.6c-4.32.71-27.47,2.96-27.47,4.74,0,2.01,26.26,4.62,31.62,5.21v14.57l-110.42,8.29v-7.7c29.2-2.72,45.27-4.15,54.6-5.45,7.95-1.18,11.4-1.42,11.4-3.67,0-2.72-13.31-4.62-61.69-7.58v-7.22c23.15-1.78,36.29-2.61,43.89-3.67,6.74-.83,10.02-.95,10.02-3.2,0-3.32-7.78-5.09-57.89-10.19v-6.51l105.92,9.24v13.15Z"/>
                          </g>
                          <g>
                              <path class={"fill-current animate-fade-right animate-delay-[200ms]"} d="M119.06,158.1h-31.79c-.52-10.78-6.39-13.5-24.54-13.5H0v-8.53h53.57c54.95,0,65.14,2.01,65.49,22.03Z"/>
                              <path class={"fill-current animate-fade-right animate-delay-[150ms]"} d="M118.02,111.91c0,16.82-20.74,17.65-108.51,17.65v-8.65c57.19-.12,69.81-1.18,69.81-9.47,0-4.38-2.59-7.34-14.34-8.76-5.7-.71-13.13-1.07-22.81-1.18-9.33-.12-20.91-.12-36.81-.12v-6.87c92.62,0,112.66,1.07,112.66,17.41Z"/>
                              <path class={"fill-current animate-fade-right animate-delay-[100ms]"} d="M4.84,87.4v-9.24h106.79v9.24H4.84Z"/>
                              <path class={"fill-current animate-fade-right animate-delay-[50ms]"} d="M66.87,63.24c18.83,0,22.64-4.86,22.81-23.57h25.57c-.17,24.28-8.12,31.5-57.02,31.5S2.94,62.41,2.76,38.25h42.68c.17,21.67,2.94,24.99,21.43,24.99Z"/>
                              <path class={"fill-current animate-fade-right animate-delay-[0ms]"} d="M7.6,31.15V.71h35.77c0,22.62,1.73,23.57,8.29,23.57,7.43,0,9.68-.71,9.68-20.96h11.23c0,18.59,1.9,19.9,9.85,19.9s9.68-1.18,9.85-23.21h22.64v31.15H7.6Z"/>
                          </g>
                      </g>
                  </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactEntry;
