// src/pages/CheckoutPayment.js
import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../../components/CheckoutForm';

import rack_1 from '../../assets/rack_1.png';
import mockup_2 from '../../assets/250ml_mockup_2.png';

const stripePromise = loadStripe(
  process.env.REACT_APP_ENV === 'development'
    ? process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY_TEST
    : process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY_LIVE
);

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [clientSecret, setClientSecret] = useState(state?.clientSecret || null);
  const [paymentIntent, setPaymentIntent] = useState(state?.paymentIntent || null);
  const [product, setProduct] = useState(state?.product || null);
  const [user, setUser] = useState(state?.user || null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!clientSecret || !product || !user) {
      setError('Missing payment information.');
      setTimeout(() => navigate('/products'), 3000);
    }
  }, [clientSecret, product, user, navigate]);

  /* custom appearance optionality */
  const appearance = {
    theme: 'light',
    variables: {
      colorPrimary: '#000', // Custom primary color (e.g., an orange)
      colorBackground: '#FFF', // White background
      colorText: '#000/50', // Text color
      fontFamily: 'Arial, sans-serif', // Custom font family
      // Class rounded
      borderRadius: '0.25rem', // Custom border radius
    },
  };
  

  const options = {
    clientSecret,
    appearance,
  };
  
  const amount = product?.variants[0].price * 100;

  const shipping = 499; // flat rate shipping
  const estimatedTax = amount * 0.00; // no tax on food — right ... ?
  const total = amount + shipping + estimatedTax;

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

  const images = [rack_1, mockup_2];
  const [slide, setSlide] = useState(0);

  const next  = () => setSlide((i) => (i + 1) % images.length);
  const prev  = () => setSlide((i) => (i - 1 + images.length) % images.length);


  return (
    <div className="inset-0 flex flex-row items-start justify-center flex-1 min-h-screen pt-24  px-6 pb-6 w-full h-full overflow-hidden">
      <div class="flex flex-1 max-w-6xl mx-auto w-full h-full">
        <div className="flex relative flex-col space-y-6 lg:grid lg:grid-cols-5 lg:gap-8 lg:space-y-0">
          <div className="flex flex-col w-full items-start justify-start lg:col-span-3 space-y-2">
              <p className="font-mono w-full text-left text-xs uppercase font-bold">
                The world's first can of milk is three clicks away.
              </p>
              {/* <p className="font-mono text-xs uppercase">
                These stone-cold cans of ultra-retorted™ lactose-free Cow Juice can be on your doorstep within four days.
              </p> */}
              
              <div 
                className="relative w-full rounded-sm overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                  <div
                      className="flex w-full transition-transform duration-500 ease-in-out"
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

                  <div className="absolute bottom-2 inset-x-0 flex justify-center gap-1">
                      {images.map((_, i) => (
                      <div
                          key={i}
                          onClick={() => setSlide(i)}
                          className="relative w-8 h-2 border-[0.25px] border-black rounded-full overflow-hidden cursor-pointer"
                      >
                          <div
                              className={`absolute inset-0 ${slide === i ? "animate-progress" : "w-0"} bg-black`}
                          />
                      </div>
                      ))}
                  </div>
              </div> 
               

              {/* Buy Now Subtotal display, with shipping message */}
              <div className="flex flex-col w-full border-[0.5px] border-black p-2 rounded-sm bg-neutral-100 text-xs font-mono animate-fade-up animate-delay-[400ms] space-y-1">
                <span className="font-bold uppercase">Order Summary</span>
                <div className="flex justify-between"><span>Item(s):</span><span>${(amount / 100).toFixed(2)}</span></div>
                <div className="pl-2 text-[11px] text-black/80">[1]. {product?.title}</div>
                <div className="flex justify-between"><span>Shipping & handling:</span><span class="italic">${(shipping / 100).toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Total before tax:</span><span>${(amount / 100).toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Estimated tax:</span><span>${(estimatedTax / 100).toFixed(2)}</span></div>
                <div className="flex justify-between font-bold border-t pt-1"><span>Order total:</span><span>${(total / 100).toFixed(2)}</span></div>
                <p className="text-[10px] text-black/60 pt-1">Shipping costs and applicable taxes will be finalized at checkout.</p>
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
            </div>
            <div class={`hidden sm:flex w-full items-center justify-end col-span-2 animate-flip-dow`}>
              <div class="flex h-full items-start justify-end">
                  {/* The actual logo's SVG */}
                  <svg class="flex text-cowjuice-gold/50 w-full z-20" id="Layer_2" data-name="Layer 2" viewBox="0 0 119.06 300.64">
                      <g id="Layer_1-2" data-name="Layer 1">
                          <g>
                              <path class={"fill-current animate-fade-righ animate-delay-[350ms]"} d="M66.88,292.71c18.83,0,22.64-4.86,22.81-23.57h25.57c-.17,24.28-8.12,31.5-57.02,31.5s-55.29-8.76-55.47-32.92h42.68c.17,21.67,2.94,24.99,21.43,24.99Z"/>
                              <path class={"fill-current animate-fade-righ animate-delay-[300ms]"} d="M112.32,240.72c0,18.48-15.21,21.2-65.66,21.2-27.3,0-45.79-2.84-45.79-18.12,0-16.34,5.53-21.2,59.96-21.2,41.99,0,51.49,6.63,51.49,18.12ZM40.61,243.32c0,10.42,9.16,11.72,24.36,11.72s24.71-2.61,24.71-11.72-7.43-12.79-24.71-12.79-24.36,2.49-24.36,12.79Z"/>
                              <path class={"fill-current animate-fade-righ animate-delay-[250ms]"} d="M113.01,186.6c-4.32.71-27.47,2.96-27.47,4.74,0,2.01,26.26,4.62,31.62,5.21v14.57l-110.42,8.29v-7.7c29.2-2.72,45.27-4.15,54.6-5.45,7.95-1.18,11.4-1.42,11.4-3.67,0-2.72-13.31-4.62-61.69-7.58v-7.22c23.15-1.78,36.29-2.61,43.89-3.67,6.74-.83,10.02-.95,10.02-3.2,0-3.32-7.78-5.09-57.89-10.19v-6.51l105.92,9.24v13.15Z"/>
                          </g>
                          <g>
                              <path class={"fill-current animate-fade-righ animate-delay-[200ms]"} d="M119.06,158.1h-31.79c-.52-10.78-6.39-13.5-24.54-13.5H0v-8.53h53.57c54.95,0,65.14,2.01,65.49,22.03Z"/>
                              <path class={"fill-current animate-fade-righ animate-delay-[150ms]"} d="M118.02,111.91c0,16.82-20.74,17.65-108.51,17.65v-8.65c57.19-.12,69.81-1.18,69.81-9.47,0-4.38-2.59-7.34-14.34-8.76-5.7-.71-13.13-1.07-22.81-1.18-9.33-.12-20.91-.12-36.81-.12v-6.87c92.62,0,112.66,1.07,112.66,17.41Z"/>
                              <path class={"fill-current animate-fade-righ animate-delay-[100ms]"} d="M4.84,87.4v-9.24h106.79v9.24H4.84Z"/>
                              <path class={"fill-current animate-fade-righ animate-delay-[50ms]"} d="M66.87,63.24c18.83,0,22.64-4.86,22.81-23.57h25.57c-.17,24.28-8.12,31.5-57.02,31.5S2.94,62.41,2.76,38.25h42.68c.17,21.67,2.94,24.99,21.43,24.99Z"/>
                              <path class={"fill-current animate-fade-righ animate-delay-[0ms]"} d="M7.6,31.15V.71h35.77c0,22.62,1.73,23.57,8.29,23.57,7.43,0,9.68-.71,9.68-20.96h11.23c0,18.59,1.9,19.9,9.85,19.9s9.68-1.18,9.85-23.21h22.64v31.15H7.6Z"/>
                          </g>
                      </g>
                  </svg>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Payment;