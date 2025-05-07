// src/pages/CheckoutPayment.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../../components/CheckoutForm';

import rack_1 from '../../assets/rack_1.png';

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

  // const appearance = {
  //   theme: 'stripe',
  // };

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

  console.log(error)

  return (
    <div className="flex flex-1 min-h-screen max-w-3xl mx-auto px-6 pb-6 pt-24 w-full h-full">
      <div className="flex flex-col w-full items-center justify-start space-y-4">
        <p className="font-mono w-full text-left text-xs uppercase font-bold">
          The world's first can of milk is within reach.
        </p>
        <p className="font-mono text-xs uppercase">
          These stone-cold cans of ultra-retorted™ lactose-free Cow Juice can be on your doorstep within four days.
        </p>
        <div class="flex w-full">
          <img src={rack_1} className="flex w-full sm:w-1/2" />
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
    </div>
  );
};

export default Payment;