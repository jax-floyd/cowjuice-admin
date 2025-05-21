import React, { useRef, useState, useLayoutEffect } from 'react';

/* ————————————————————————————————————————————————————————
   Single-line ticker that auto-sizes its speed
   ———————————————————————————————————————————————————————— */
const Ticker = () => {
  const track = useRef(null);
  const [page] = useState(window.location.pathname);
  const [dur, setDur] = useState(30);          // fallback

  useLayoutEffect(() => {
    if (!track.current) return;
    const W         = track.current.getBoundingClientRect().width / 2; // width of one copy
    const pxPerSec  = 60;                                              // tweak to taste
    setDur(W / pxPerSec);
  }, []);

  /* Your existing delay logic, unchanged  */
  const getDelayClass = (pathname) => {
    switch (pathname) {
      case '/':                  return 'animate-delay-[4000ms]'; //'animate-delay-[8500ms]' for actual HomeNew
      // case '/':                  return 'animate-delay-[10500ms]';
      case '/order':             return 'animate-delay-[8500ms]';
      case '/contact':           return 'animate-delay-[500ms]';
      
      default:                   return '';
    }
  };

  const delay = getDelayClass(page);

  return (
    <div class={`flex z-30 w-full h-5 py-5 items-center justify-center overflow-hidden border-b-[0.5px] border-black bg-white animate-flip-up ${delay}`}>
      <div
        ref={track}
        class="flex items-center justify-center whitespace-nowrap animate-ticker"
        style={{
          animationDuration: `${dur}s`,
          animationDelay:    `${delay}ms`,
        }}
      >
        <TickerText />
        <TickerText />
      </div>
    </div>
  );
};

export default Ticker;

/* ——— ticker payload ——— */
const TickerText = () => (
  <span className="px-8 text-[11px] leading-3 sm:text-xs sm:leading-normal font-mono uppercase text-black">
    Breaking News from&nbsp;
    <span className="text-cowjuice-gold border border-cowjuice-gold font-bold rounded-sm px-[2px]">Moo-land</span>:&nbsp;
    Cow Juice Inc. pioneers an <span className="border-[0.5px] border-cowjuice-red text-cowjuice-red rounded-sm px-[2px] font-bold">ultra-retorted™</span> revolution: the world’s first can of milk.
    • Critics exclaim: "The most <span className="border-[0.5px] border-cowjuice-red text-cowjuice-red rounded-sm px-[2px] font-bold">retorted</span> milk in history!"
    • Join the retort revolution: Follow <a href="https://www.tiktok.com/@juiceofacow/video/7445486726266490142" target="blank" class="border-[0.5px] border-cowjuice-gold text-cowjuice-gold rounded-sm px-[2px] font-bold lowercase">@juiceofacow</a> on TikTok →
  </span>
);