// components/Ticker.js
import React, { useRef, useState, useEffect } from 'react';

const Ticker = ({ pxPerSec = 60 }) => {
  const trackRef = useRef(null);      // wrapper that slides
  const textRef  = useRef(null);      // <span> of a single copy
  const [dur, setDur] = useState(null);   // null = not ready yet

  /* ——— helper that (re)computes duration ——— */
  const calcDuration = () => {
    if (!textRef.current) return;
    const W = textRef.current.scrollWidth;   // ← reliable width of one copy
    setDur(W / pxPerSec);
  };

  /* ——— run once, then on resize / font-load / orientation ——— */
  useEffect(() => {
    calcDuration();                 // first attempt

    const ro = new ResizeObserver(calcDuration);
    if (textRef.current) ro.observe(textRef.current);

    window.addEventListener('resize',            calcDuration);
    window.addEventListener('orientationchange', calcDuration);

    // Wait for web-fonts
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(calcDuration);
    }

    return () => {
      ro.disconnect();
      window.removeEventListener('resize',            calcDuration);
      window.removeEventListener('orientationchange', calcDuration);
    };
  }, []);

  /* Your existing delay logic, unchanged  */
  const [page]           = useState(window.location.pathname);
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


  return (
    <div
      className={`w-full py-4 flex items-center overflow-hidden
                  border-b-[0.5px] border-black bg-white
                  animate-flip-up ${delay}`}
    >
      <div
        ref={trackRef}
        className={`flex whitespace-nowrap animate-ticker`}
        style={{
          animationPlayState: dur ? 'running' : 'paused', // wait for proper dur
          animationDuration : dur ? `${dur}s` : undefined,
          animationDelay    : `${delay}ms`,
        }}
      >
        <TickerText ref={textRef} />
        <TickerText />
      </div>
    </div>
  );
};

export default Ticker;

/* ——— the scrolling payload ——— */
const TickerText = React.forwardRef((props, ref) => (
  <span ref={ref} class="px-8 text-[11px] leading-3 sm:text-xs sm:leading-normal font-mono uppercase">
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Breaking News from <span className="text-cowjuice-gold border border-cowjuice-gold font-bold rounded-sm px-[2px]">Moo-land</span>:
    Cow Juice pioneers the <span className="border-[0.5px] border-cowjuice-red text-cowjuice-red rounded-sm px-[2px] font-bold">ultra-retort™</span> revolution – the world’s first can of milk.
    {/* • Critics exclaim: “The most <span className="border-[0.5px] border-cowjuice-red text-cowjuice-red rounded-sm px-[2px] font-bold">retorted</span> milk in history!” */}
    &nbsp;• Follow&nbsp;
    <a
      href="https://www.tiktok.com/@juiceofacow"
      target="_blank"
      rel="noopener noreferrer"
      className="border-[0.5px] border-cowjuice-gold rounded-sm px-[2px] font-bold lowercase text-cowjuice-gold"
    >
      @juiceofacow
    </a>
    &nbsp;on TikTok →
  </span>
));