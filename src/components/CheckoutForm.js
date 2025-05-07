import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { v4 as uuidv4 } from 'uuid';


const CheckoutForm = ({ clientSecret, paymentIntent, product, user, loading, setLoading, error, setError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    setTimeout(() => { setLoading(false) }, 1000);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError(null);

    if (!stripe || !elements) {
      setError('Stripe is not ready');
      setProcessing(false);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + '/order-confirmation',
      },
      redirect: 'if_required'
    });

    if (error) {
      console.log("Oh my lord an error occurred")
      setError(error.message);
      setProcessing(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      
      try {
        const response = await fetch('https://api.gotcowjuice.com:2000/create-shopify-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: user.email,
            name: {
              first: user.name.first,
              last: user.name.last,
            },
            lineItems: [
              {
                title: product.title,
                variant_id: product.variants[0].id,
                quantity: 1,
              },
            ],
            shipping: user.shipping, // Ensure this exists in user object
          })
        });

        // Only case of success
        const orderResponse = await response.json();
        const numericId = orderResponse.order.id;

        const uniqueSuffix = uuidv4().replace(/-/g, '');
        const cleanOrderId = `${numericId}-${uniqueSuffix}`;

        navigate(`/orders/${cleanOrderId}/confirmation`, { state: { order: orderResponse } });
      } catch (err) {
        console.error('Shopify order creation failed:', err);
        setError(err);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full animate-fade-down animate-delay-1000">
      {loading ? (
        <div className="flex w-full h-full justify-center items-center py-10">
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 animate-spin">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : (
        <>
          <PaymentElement onReady={() => setLoading(false)} clientSecret={clientSecret} />
          {error && <div className="text-red-600 text-sm font-mono">{error}</div>}
          <button
            type="submit"
            disabled={!stripe || processing}
            className="w-full flex items-center justify-center bg-black border-[0.5px] border-black py-3 rounded-[0.25rem] font-[Arial] text-sm disabled:opacity-50 animate-flip-up animate-delay-200"
          >
            {
              processing ? (
                <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <p class="font-[Arial] font-bold uppercase text-white text-xs">
                  Pay ${paymentIntent.amount / 100}
                </p>
              )
            }            
          </button>
        </>
      )}
    </form>
  );
};

export default CheckoutForm;