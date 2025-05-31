import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import triggerPostToSearchOrders from '../functions/shopify/triggerPostToSearchOrders';

import review from '../assets/review.svg'; // Assuming you have a review icon
import bull_silhouette from '../assets/bull_silhouette.svg'; // Import the Bull silhouette if needed

const ReviewInputModal = ({ onUnlock }) => {
  const navigate = useNavigate();

  const [status, setStatus] = useState('idle'); // idle | error | success
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState('');
  const [showInput, setShowInput] = useState(false);

  const [email, setEmail] = useState('');
  const [orderNumber, setOrderNumber] = useState('');

  const [confidential, setConfidential] = useState(false);

  const handlePostFeedback = async () => {
    setLoading(true);
    try {
      const result = await triggerPostToSearchOrders(email, orderNumber);
      const orders = result?.orders || [];
      if (orders.length > 0) {
        // If we found an order, proceed to post the review, pinging endpoint on server with review data
        const reviewData = {
          review,
          email,
          orderNumber: orders[0].id,
          confidential,
        };

        const response = await fetch('https://api.gotcowjuice.com:2000/save-review', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reviewData),
        });
        
        setStatus('success');
        setTimeout(() => onUnlock(), 1000);
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  // helpers for styling
  const btnBase    = `flex w-full items-center justify-start font-mono text-xs uppercase font-bold py-3 sm:py-4 px-4 rounded-xl border-[0.5px] transition-colors duration-300`;
  const btnIdle    = `${review === '' ? 'bg-white text-black border-[0.5px] border-black' : 'bg-black disabled:bg-black/70 text-white border-[0.5px] border-black'}`;
  const btnError   = 'bg-black text-white shake';
  const btnSuccess = 'bg-cowjuice-gold text-white';

  const getButtonClass = () => {
    if (status === 'success') return `${btnBase} ${btnSuccess}`;
    if (status === 'error') return `${btnBase} ${btnError}`;
    return `${btnBase} ${btnIdle}`;
  };

  return (
    <div 
      onClick={() => onUnlock(null)} 
      className={`fixed inset-0 z-50 flex flex-col justify-end space-y-2 px-6 pt-8 pb-6 bg-black/5 backdrop-blur-sm ${status === 'success' ? 'animate-fade-out animate-delay-[750ms] animate-duration-300' : 'animate-fade animate-delay-[0ms]'}`}
    >
      {/* Close Button */}
      <button
        onClick={() => onUnlock(null)}
        className="absolute top-6 right-6 text-xs text-black font-mono"
      >
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-black">
          <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      </button>

      {/* Review SVG */}
      {/* <div className="flex">
        <img src={review} className="w-1/4 mx-auto h-full" />
      </div> */}

      {/* Notice of Closure Options */}
      <p class="absolute top-6 left-6 text-[10px] uppercase opacity-60 text-black font-mono">[Click anywhere to close & read the reviews]</p>

    
      {/* Bottom Button + Footnote + Validation Form */}
      <motion.div 
        layout
        class="flex flex-col items-center w-full max-w-xl mx-auto space-y-3"
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {/* Top Feedback Input */}
        <div 
          class="flex flex-col items-center w-full max-w-xl mx-auto space-y-2"
        >
          <p class="font-mono text-[10px] opacity-60 uppercase w-full text-left">Help us populate the great wall of Cow Juice reviews:</p>
          <input
            className="w-full border-[0.5px] border-black px-4 py-3 sm:py-4 rounded-xl bg-white focus:outline-none font-mono text-xs h-auto uppercase animate-flip-up"
            autoFocus
            placeholder="'Cow Juice tasted like ...'"
            value={review}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => setReview(e.target.value)}
          />
        </div>
        {review !== '' && (
          <div className="flex flex-col w-full space-y-2 animate-flip-up animate-delay-[200ms]">
            <input
              type="email"
              placeholder="Email (optional w/ order #)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="w-full border-[0.5px] border-black px-4 py-3 sm:py-4 rounded-xl bg-white focus:outline-none font-mono text-xs animate-flip-up"
            />
            <input
              type="text"
              placeholder="Order Number (optional w/ email)"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value.toUpperCase())}
              onClick={(e) => e.stopPropagation()}
              className="w-full border-[0.5px] border-black px-4 py-3 sm:py-4 rounded-xl bg-white focus:outline-none font-mono text-xs animate-flip-up"
            />
          </div>
        )}

        {!(email === '' && orderNumber === '') && (
          // Checkbox for confidential or public review
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setConfidential(!confidential);
            }}
            className="flex w-full items-center space-x-2 animate-flip-up cursor-pointer"
          >
            <button
              className={`h-4 w-4 text-black focus:ring-black border-[0.5px] border-black rounded-md ${confidential ? 'bg-black' : 'bg-white'} transition-colors duration-300`}
            />
            <p className="text-[10px] w-full flex leading-3 font-mono text-black opacity-60 hover:opacity-80 uppercase">
              Don't post my review publicly
            </p>
          </button>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePostFeedback();
          }}
          disabled={loading || review === '' || (email === '' && orderNumber === '')}
          className={getButtonClass()}
        >
          {review === '' ? (
            <p className="font-mono text-xs uppercase font-bold animate-fade">Review Cow Juice<sup> [1]</sup></p>
          ) : (
            <div className="text-white">
              {loading ? (
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 animate-spin">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <>
                  {status === 'success' ? (
                    <p className="font-mono text-xs uppercase font-bold animate-fade">Review Submitted!<sup> [2]</sup></p>
                  ) : status === 'error' ? (
                    <p className="font-mono text-xs uppercase font-bold animate-fade">Error Submitting Review</p>
                  ) : (
                    <p className="font-mono text-xs uppercase font-bold animate-fade">Submit Review</p>
                  )}
                </>
              )}
            </div>
          )}
        </button>

        <p onClick={(e) => e.stopPropagation()} className="font-mono text-[10px] leading-3 uppercase opacity-60 animate-flip-down animate-delay-[800ms]">
          <sup>[1]</sup> All reviews are legally binding and spiritually significant. False reviews will be met with unequivocal justice. Lie and you will be sued by our high-flying team of bovine libel lawyers.
        </p>
        <p onClick={(e) => e.stopPropagation()} className={`font-mono text-[10px] leading-3 uppercase animate-flip-down animate-delay-[800ms] ${review === '' ? 'opacity-0' : 'opacity-60'} transition-opacity duration-[750ms]`}>
          <sup>[2]</sup> Cow Juice has no interest in randos leaving reviews. We want to hear from our beta testers. Please enter an email or order ID used in a past order. Don't worry, your email will not be shared.
        </p>

        {status === 'error' && (
          <p onClick={(e) => e.stopPropagation()} className="text-[10px] text-cowjuice-red font-mono uppercase animate-flip-up">No order found. Please try again.</p>
        )}
      </motion.div>
    </div>
  );
};

export default ReviewInputModal;
