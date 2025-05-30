import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AmericanFlag from '../icons/AmericanFlag';

const LactoseFreedom = ({ onUnlock }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle'); // idle | error | success
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      navigate('/shopify/products');
      setLoading(false);
      onUnlock(null);
    }, 0);
  };

  const questions = [
    {
      delay: '250ms',
      q: (
        <>What is <span className="text-black">Lactose-Freedom™</span>?</>
      ),
      a: (
        <>
          The quality of being free of lactose. Cow Juice has this lactose-freedom thanks to our industrial-grade liberation technique that shatters lactose into harmless fragments — giving you creamy milk with zero digestive distress.
        </>
      ),
    },
    {
      delay: '300ms',
      q: <>How is milk freed of lactose?</>,
      a: (
        <>
          Every last lactose molecule is removed with the help of a handy-dandy little enzyme called lactase, the same enzyme children have in their guts - and which most adults do not.
        </>
      ),
    },
    {
      delay: '450ms',
      q: <>So is it safe for lactose-intolerants?</>,
      a: (
        <>
          Yes, absolutely - Cow Juice is 100% safe for lactose-intolerant people. You can drink Cow Juice resting assured that we've obliterate lactose molecules so thoroughly your digestive tract will never suspect milk was involved to begin with.
        </>
      ),
    },
  ];

  const btnBase = 'flex w-full items-center justify-start font-mono text-xs uppercase font-bold py-2 sm:py-4 px-2 rounded-sm border-[0.5px] transition-colors duration-300';
  const btnIdle = 'bg-black text-white hover:bg-neutral-700';
  const btnError = 'bg-black text-white shake';
  const btnSuccess = 'bg-cowjuice-gold text-white';

  return (
    <div
      className={`fixed inset-0 -top-4 z-50 flex items-center bg-black/20 backdrop-blur-sm justify-center ${
        status === 'success'
          ? 'animate-fade-out animate-delay-[750ms] animate-duration-300'
          : 'animate-fade animate-delay-[0ms]'
      }`}
      onClick={() => onUnlock(null)}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col space-y-4 bg-white p-6 rounded-xl border-[0.5px] border-black w-[90%] max-w-xl sm:max-w-3xl shadow-2xl animate-fade-up"
      >
        {/* Header */}
        <div className="flex flex-col space-y-2 w-full">
          <div className="flex w-full items-center justify-between">
            <p className="inline-flex font-mono text-xs uppercase text-left font-bold">
              Lactose-Freedom™ <div class="hidden sm:flex px-2"><AmericanFlag /></div> | A Liberation Prospectus
            </p>
            <button
              onClick={() => onUnlock(null)}
              className="text-xs text-black font-mono"
              type="button"
            >
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5 text-black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          </div>
          <p className="font-mono text-[10px] leading-3 uppercase text-left">
            These are the most common questions about{' '}
            <span className="text-cowjuice-blue border-[0.5px] border-cowjuice-blue rounded-sm px-[2px]">
              Lactose-Freedom™
            </span>
            &nbsp;— your opportunity to drink the truth without remorse.
          </p>
        </div>

        {/* FAQ List */}
        <div className="flex flex-col w-full space-y-2">
          {questions.map((item, idx) => (
            <details
              key={idx}
              className={
                `group border-[0.5px] border-black rounded-sm w-full animate-flip-down animate-delay-[${item.delay}]`
              }
            >
              <summary className="cursor-pointer font-mono text-xs uppercase font-bold flex justify-between px-2 py-2 sm:py-4">
                <div className="flex-1">{item.q}</div>
                <span className="transition-transform duration-300 group-open:rotate-45">
                  ＋
                </span>
              </summary>
              <div className="border-t-[0.5px] border-black mt-1" />
              <div className="mt-2 font-mono text-[11px] px-2 pb-2 leading-3 uppercase">
                {item.a}
              </div>
            </details>
          ))}
        </div>

        {/* Footer Buttons */}
        <div className="border-b-[0.5px] border-black" />
        <div className="flex flex-col items-center justify-center space-y-2">
          <button
            type="submit"
            disabled={status === 'success'}
            className="flex w-full items-center justify-start font-mono text-xs uppercase font-bold py-2 sm:py-4 px-2 rounded-sm border-[0.5px] border-black transition-colors duration-300"
          >
            {loading ? (
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 animate-spin"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              <p class="inline-flex"><span class="text-cowjuice-red border-[0.5px] border-cowjuice-red font-light rounded-sm px-[2px]">Embrace</span>&nbsp;<span class="text-cowjuice-blue border-[0.5px] border-cowjuice-blue font-light rounded-sm px-[2px]">Liberty</span><div class="flex sm:hidden px-2"><AmericanFlag /></div>&nbsp;| Join the Beta</p>
            )}
          </button>
          <button
            disabled={status === 'success'}
            className={[btnBase, status === 'idle' && btnIdle, status === 'error' && btnError, status === 'success' && btnSuccess]
              .filter(Boolean)
              .join(' ')}
          >
              Read the FAQs
          </button>
        </div>
      </form>
    </div>
  );
};

export default LactoseFreedom;