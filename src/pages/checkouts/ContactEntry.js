import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import rack_1 from '../../assets/rack_1.png';
import mockup_2 from '../../assets/250ml_mockup_2.png';

/* ------- Understand that we have two different checkout flows ------- 
  1. Checkout from a buy now button on the product page (i.e., buy-now=true)
  2. Checkout from the bag page (i.e., buy-now=false)
*/

const ContactEntry = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const product = state?.product;
  const price = product?.variants[0].price * 100;
  const checkoutId = window.location.pathname.split('/')[2];

  const estimatedTax = price * 0.00; // no tax on food — right ... ?
  const shipping = 499 // flat rate shipping
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
    }
  };

  return (
    <div className="flex flex-1 min-h-screen max-w-3xl mx-auto px-6 pb-6 pt-24 w-full h-full">
      <form onSubmit={step === 1 ? handleNext : handleSubmit} className="flex flex-col w-full space-y-4 animate-fade">
        <p className="font-mono text-xs uppercase font-bold animate-flip-down animate-delay-200">
          The world's first can of milk is within reach.
        </p>
        <p className="font-mono text-xs uppercase animate-flip-up animate-delay-300">
          These stone-cold cans of ultra-retorted™ lactose-free Cow Juice can be on your doorstep within four days.
        </p>
        <div class="flex flex-row w-full items-center justify-center space-x-2">
          <div class="flex w-full flex-row space-x-2 h-full">
            <img src={rack_1} alt="A Rack of Cow Juice" className="w-full animate-fade-down animate-delay-[400ms] rounded-sm select-none" />
          </div>
          <div class="hidden sm:flex w-full flex-row space-x-2 h-full">
            <img src={mockup_2} alt="A Can of Cow Juice" className="w-full h-full animate-fade-up animate-delay-500 rounded-sm select-none" />
          </div>
        </div>
        
        
        {/* Buy Now Subtotal display, with shipping message */}
        {/* <div className="flex flex-col w-full border-[0.5px] border-black p-2 rounded-sm bg-neutral-100 text-xs font-mono animate-fade-up animate-delay-[400ms] space-y-1">
          <span className="font-bold uppercase">Order Summary</span>
          <div className="flex justify-between"><span>Item(s):</span><span>${(amount / 100).toFixed(2)}</span></div>
          <div className="pl-2 text-[11px] text-black/80">[1]. {product?.name}</div>
          <div className="flex justify-between"><span>Shipping & handling:</span><span class="italic">--</span></div>
          <div className="flex justify-between"><span>Total before tax:</span><span>${(amount / 100).toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Estimated tax:</span><span>${(estimatedTax / 100).toFixed(2)}</span></div>
          <div className="flex justify-between font-bold border-t pt-1"><span>Order total:</span><span>${(total / 100).toFixed(2)}</span></div>
          <p className="text-[10px] text-black/60 pt-1">Shipping costs and applicable taxes will be finalized at checkout.</p>
        </div> */}

        <div className="flex flex-col w-full space-y-2 animate-fade-up animate-delay-500">
          {step === 1 ? (
            <>
              <div className="grid grid-cols-2 gap-2">
                <input name="firstName" placeholder="First Name" onChange={handleChange} required className="text-xs font-mono border-[0.5px] border-black p-2 rounded-sm focus:outline-none focus:bg-black/5 transition-colors duration-300 animate-fade-right animate-delay-[300ms]" />
                <input name="lastName" placeholder="Last Name" onChange={handleChange} required className="text-xs font-mono border-[0.5px] border-black p-2 rounded-sm focus:outline-none focus:bg-black/5 transition-colors duration-300 animate-fade-left animate-delay-[400ms]" />
              </div>
              <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="text-xs font-mono border-[0.5px] border-black p-2 rounded-sm focus:outline-none focus:bg-black/5 transition-colors duration-300 animate-fade-right animate-delay-[500ms]" />
              <input name="phone" type="tel" placeholder="Phone (optional)" onChange={handleChange} className="text-xs font-mono border-[0.5px] border-black p-2 rounded-sm focus:outline-none focus:bg-black/5 transition-colors duration-300 animate-fade-left animate-delay-[600ms]" />
            </>
          ) : (
            <>
              <input name="address1" placeholder="Address Line 1" onChange={handleChange} required className="text-xs font-mono border-[0.5px] border-black p-2 rounded-sm focus:outline-none focus:bg-black/5 transition-colors duration-300 animate-fade-right animate-delay-[0ms]" />
              <input name="address2" placeholder="Address Line 2 (optional)" onChange={handleChange} className="text-xs font-mono border-[0.5px] border-black p-2 rounded-sm focus:outline-none focus:bg-black/5 transition-colors duration-300 animate-fade-left animate-delay-[100ms]" />
              <div className="grid grid-cols-2 gap-2">
                <input name="city" placeholder="City" onChange={handleChange} required className="text-xs font-mono border-[0.5px] border-black p-2 rounded-sm focus:outline-none focus:bg-black/5 transition-colors duration-300 animate-fade-right animate-delay-[200ms]" />
                <input name="state" placeholder="State" onChange={handleChange} required className="text-xs font-mono border-[0.5px] border-black p-2 rounded-sm focus:outline-none focus:bg-black/5 transition-colors duration-300 animate-fade-left animate-delay-[300ms]" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input name="postalCode" placeholder="Postal Code" onChange={handleChange} required className="text-xs font-mono border-[0.5px] border-black p-2 rounded-sm focus:outline-none focus:bg-black/5 transition-colors duration-300 animate-fade-down animate-delay-[400ms]" />
                <input name="country" placeholder="Country" value="US" readOnly className="text-xs font-mono bg-black/5 border-[0.5px] border-black p-2.5 rounded-sm focus:outline-none focus:bg-black/5 transition-colors duration-300 animate-fade-up animate-delay-[500ms]" />
              </div>
            </>
          )}

          {error && <p className="text-xs text-red-500 font-mono">{error}</p>}

          <div className="flex flex-col w-full sm:flex-row justify-between space-y-2 sm:space-y-0 sm:space-x-2">
            {step === 1 && (
              <button
                type="submit"
                className="flex text-xs text-left font-mono w-full font-bold uppercase p-2 border-[0.5px] rounded-sm border-black bg-black text-white disabled:opacity-50 animate-flip-up animate-delay-[800ms]"
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
                  className="flex text-xs text-left font-mono w-full font-bold uppercase p-2 border-[0.5px] rounded-sm border-black bg-black text-white disabled:opacity-50 animate-flip-up animate-delay-[800ms]"
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
                  className="flex text-xs text-left font-mono w-full font-bold uppercase p-2 border-[0.5px] rounded-sm border-black bg-white text-black hover:bg-black hover:text-white transition animate-fade-left"
                  disabled={loading}
                >
                  Back
                </button>
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactEntry;
