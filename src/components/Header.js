import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useMasterContext } from '../contexts/MasterContext';

/* 1️⃣  Tiny helper so Header stays readable   */
const Ticker = () => (
  <div className="relative flex flex-1 items-center justify-center overflow-hidden h-5">           {/* parent clip */}
    <div className="absolute w-full animate-ticker whitespace-nowrap">
      <span className="text-[11px] leading-3 sm:text-xs sm:leading-normal text-black font-mono uppercase">
        Breaking News from Moo-land: Cow Juice Inc. releases the world’s first can of Ultra‑Retorted Milk •&nbsp;
        <span className="underline">Read the press release →</span>&nbsp;&nbsp;&nbsp;
        Pre‑orders now open • Free shipping over $50 • Follow&nbsp;@juiceofacow on TikTok →
      </span>
    </div>
  </div>
);

const Header = () => {
  const navigate = useNavigate();
  const [page]           = useState(window.location.pathname);
  const { bag }          = useMasterContext();

  /* Your existing delay logic, unchanged  */
  const getDelayClass = (pathname) => {
    switch (pathname) {
      case '/':                  return 'animate-delay-[8500ms]';
      case '/order':             return 'animate-delay-[8500ms]';
      case '/contact':           return 'animate-delay-[500ms]';
      default:                   return '';
    }
  };
  const delay = getDelayClass(page);

  return (
    <header
      className={`absolute w-full bg-white text-black uppercase 
                  border-b-[0.5px] border-black px-6 py-6 flex items-center justify-center
                  animate-flip-down ${delay}`}
    >
      <div className="flex w-full max-w-6xl mx-auto items-center">
        {/* 2️⃣ Back icon (z‑10 so ticker slides under) */}
        <button
          onClick={() => navigate(-1)}
          className="relative z-10 bg-transparent text-xs font-mono mr-0 cursor-pointer"
        >
          &lt;&lt;
        </button>

        {/* 3️⃣ The ticker lives right here */}
        <Ticker />

        {/* 4️⃣ Bag icon (also z‑10) */}
        <a
          href="/shopify/bag"
          className="relative z-10 bg-transparent text-xs font-mono ml-0 cursor-pointer"
        >
          <svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={page === '/bag' ? 2.125 : 1}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993
                 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125
                 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974
                 c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0
                 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375
                 0 0 1 .75 0Z"
            />
          </svg>
          {/* Uncomment if you want the bag‑count badge
          {bag.length !== 0 && (
            <span className="absolute -top-1 -right-1 bg-sky-200 text-[8px] font-mono
                             rounded-full px-1 border-[0.5px] border-black">
              {bag.length}
            </span>
          )} */}
        </a>
      </div>
    </header>
  );
};

export default Header;