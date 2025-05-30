import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useMasterContext } from '../contexts/MasterContext';

const Header = () => {
  const navigate = useNavigate();
  const [page]           = useState(window.location.pathname);

  /* Your existing delay logic, unchanged  */
  const getDelayClass = (pathname) => {
    switch (pathname) {
      // case '/':                  return 'animate-delay-[4000ms]'; //'animate-delay-[8500ms]' for actual HomeNew
      case '/':                  return 'animate-delay-[500ms]';
      case '/order':             return 'animate-delay-[8500ms]';
      case '/contact':           return 'animate-delay-[500ms]';
      
      default:                   return '';
    }
  };
  const delay = getDelayClass(page);

  const [showMenu, setShowMenu] = useState(false);

  const [menuState, setMenuState] = useState('hidden');

  // when we start a fade-out, wait for the CSS anim (500 ms) before unmounting
  useEffect(() => {
    if (menuState === 'leave') {
      const id = setTimeout(() => setMenuState('hidden'), 500); // ← match animationDuration
      return () => clearTimeout(id);
    }
  }, [menuState]);

  const openMenu  = () => setMenuState('enter');
  const closeMenu = () => setMenuState('leave');

  const handlePageClick = (page) => {
    setShowMenu(false);
    navigate(page);
  };

  const internalLinks = [
    { label: 'Home',                 path: '/' },
    { label: 'Buy Cow Juice',        path: '/shopify/products' },
    { label: 'Read the Reviews',    path: '/beta/reviews' },
    { label: 'Ultra-Retorted Milk',  path: '/ultra-retorted-milk' },
    { label: 'Retortation Press Release',    path: '/press' },
    { label: 'The Revolution of Cow Juice',    path: '/the-revolution-of-cow-juice' },
    { label: 'Frequently Asked Questions',                 path: '/questions' },
    { label: 'Check Order Status',         path: '/orders/status' },
    { label: 'Contact Cow Juice',    path: '/contact' },
  ];

  const externalLinks = [
    { label: "Watch the cow get juiced →", href: "https://tiktok.com/@juiceofacow" },
    { label: "Cows aren’t milked—they’re juiced →", href: "https://tiktok.com/@juiceofacow" },
  ];
  

  return (
    <>
      {showMenu && (
        <div class="fixed flex-col -top-0 inset-0 z-30 w-full bg-white text-black uppercase border-b-[0.5px] border-black px-6 py-6 flex items-end justify-start overflow-hidden animate-flip-down ${delay}">
          {/* Close button */}
          <button
            onClick={() => setShowMenu(false)}
            className="text-xs text-black font-mono"
          >
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-black">
              <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </button>

          {/* Menu links — add whatever you like */}
          <nav className="flex flex-col w-full items-end space-y-4 ">
            <div class="flex flex-col flex-1 w-full md:w-1/2 lg:w-1/3 space-y-2">
              <div class="flex w-full flex-col items-start justify-start ">
                <p class="font-mono text-[10px] font-bold uppercase">[Navigate this site]</p>
              </div>
              <div class="flex flex-col items-center justify-center space-y-1">
                {internalLinks.map(({ label, path }) => (
                  <button
                    key={path}
                    onClick={() => handlePageClick(path)}
                    className="text-xs uppercase font-mono"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div class="flex w-full md:w-1/2 lg:w-1/3 border-b-[0.5px] border-black"/>
            <div class="flex flex-col flex-1 w-full md:w-1/2 lg:w-1/3 space-y-2">
              <div class="flex w-full flex-col items-start justify-start ">
                <p class="font-mono text-[10px] font-bold uppercase">[External links]</p>
              </div>
              <div class="flex flex-col items-center justify-center space-y-1">
                
                {externalLinks.map(({ label, href }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs uppercase font-mono"
                  >
                    {label}
                  </a>
                ))}

              </div>
              
            </div>
            
          </nav>
          <button 
            onClick={() => window.location.href = 'mailto:cowjuiceman@gotcowjuice.com?subject=Hi%20Cow%20Juice%20Man%20—%20I%20Have%20a%20Question%20about%20Cow%20Juice%20&body=Dear%20Cow%20Juice%20Man%2C%0A%0A'}
            class="font-mono text-xs border-[0.5px] border-cowjuice-gold text-cowjuice-gold px-[2px] mt-2 uppercase font-bold rounded-sm animate-pulse"
          >
            Site newly released | Help us debug
          </button>
        </div>
      )}
      <header className={`flex w-full bg-white text-black uppercase border-b-[0.5px] border-black px-6 py-6 items-center justify-center overflow-hidden animate-flip-down ${delay}`}>
        <div className="flex w-full flex-1 max-w-6xl mx-auto items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="relative z-10 bg-transparent text-xs font-mono mr-0 cursor-pointer"
          >
            &lt;&lt;
          </button>

          <button
            onClick={() => setShowMenu(true)}
            className="relative z-10 bg-transparent text-xs text-black font-mono ml-0 cursor-pointer"
          >
            <svg fill="currentColors" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </header>

    </>
  );
};

export default Header;