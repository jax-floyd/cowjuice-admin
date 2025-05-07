import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import triggerPostToDecrementCase from '../functions/cases/triggerPostToDecrementCase.js';

const Thanks = () => {
  const location = useLocation();
  const [paymentId, setPaymentId] = useState(null);

  useEffect(() => {
    const processPayment = async () => {
      try {
        // Retrieve payment ID from query params
        const queryParams = new URLSearchParams(location.search);
        const paymentIdFromParams = queryParams.get('paymentId');
        setPaymentId(paymentIdFromParams);

        if (paymentIdFromParams) {
          // Trigger post-payment decrement action
          await triggerPostToDecrementCase();

          // Redirect to welcome page with payment ID
          window.location.href = `/welcome?paymentId=${paymentIdFromParams}`;
        } else {
          console.error('No paymentId found in query params');
        }
      } catch (error) {
        console.error('Error processing payment:', error);
      }
    };

    processPayment();
  }, [location.search]);

  return (
    <div className="flex flex-1 max-w-3xl mx-auto p-6 w-full h-full items-center justify-center">
      <p className="animate-fade text-xs font-mono">Processing your payment...</p>
    </div>
  );
};

export default Thanks;
