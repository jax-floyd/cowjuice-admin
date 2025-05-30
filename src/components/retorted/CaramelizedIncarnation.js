import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CaramelizedIncarnation = ({ onUnlock }) => {

  const navigate = useNavigate();

  const [status,   setStatus]   = useState('idle'); // idle | error | success

  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    // setLoading(true);

    setTimeout(() => {
      navigate('/shopify/products');
      setLoading(false);
    }, 0);
    
  };

  const questions = [
        {
            q: <>Does it taste like milk?</>,
            a: <>Yes. Which makes a lot of sense, considering that it's <a class='border-[0.5px] border-cowjuice-gold font-bold px-[2px] text-cowjuice-gold' href='https://www.tiktok.com/@juiceofacow/video/7445486726266490142' target='_blank'>just milk</a> in the can.</>,
            delay: "250ms",
        },
        {
            q: <>Does it taste identical to milk?</>,
            a: "No - unless you have very non-discerning taste buds i.e., are the sort of indivdiual who enjoys eating cardboard. Most everyone who tries Cow Juice says it tastes 'like milk, with a special twist'.",
            delay: "300ms",
        },
        {
            q: <>Does it taste better than milk?</>,
            a: <>Only you can be the judge of that. <a class="text-cowjuice-bronze border-[0.5px] border-cowjuice-bronze px-[2px] rounded-sm" href="/shopify/products">Buy the Cow Juice and find out</a>.</>,
            delay: "450ms",
        },
        {
            q: <>So what does it taste like?</>,
            a: <>Ultra-Retorted Milk is best described as an ever-so-slightly-sweeter, butterscotch-reminiscent milk. To some, it mirrors a salted-caramel flavor. To others, it tastes more like toasted milk. To others still, it just tastes like milk.</>,
            delay: "600ms",
        },
        {
            q: <>Is it sweet?</>,
            a: "Cow Juice is ever-so-slightly sweeter than milk. Cow Juice has absolutely no added sugar at all - it is just milk in a can - but its ultra-retortation has yielded a slightly sweeter-to-the-tounge taste.",
            delay: "750ms",
        },
        {
            q: <>Does it have more flavor than milk?</>,
            a: "Nearly everyone who's tried Ultra-Retorted Milk to date agrees that Cow Juice is naturally more more flavorful than traditional milk.",
            delay: "900ms",
        },
        {
            q: <>Does it have an aftertaste?</>,
            a: <>Yes - as do all dairy products. Interestingly, the aftertaste of Cow Juice is more similar to that of ice cream than the aftertaste typically associated with milk.</>,
            delay: "1050ms",
        },
    ];

  // helpers for styling
  const btnBase   = 'flex w-full items-center justify-start font-mono text-xs uppercase font-bold py-2 sm:py-4 px-2 rounded-sm border-[0.5px] transition-colors duration-300';
  const btnIdle   = 'bg-black text-white hover:bg-neutral-700';
  const btnError  = 'bg-black text-white shake';
  const btnSuccess= 'bg-cowjuice-gold text-white';

  return (
    <div onClick={() => onUnlock(null)} className={`fixed inset-0 -top-4 z-50 flex items-center bg-black/0 backdrop-blur-sm justify-center ${status === 'success' ? 'animate-fade-out animate-delay-[750ms] animate-duration-300' : 'animate-fade animate-delay-[0ms]'}`}>
      
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col space-y-4 bg-white p-6 rounded-xl border-[0.5px] border-black w-[90%] max-w-xl sm:max-w-3xl shadow-2xl animate-fade-up"
      >
        <div class="flex flex-col space-y-2 w-full">
          <div class="flex flex-col w-full space-y-2">
            
            <div class="flex w-full items-center justify-between">
              <p className="font-mono text-xs uppercase text-left font-bold">
                The Taste of Cow Juice
              </p>
              {/* Close button */}
              <button
                onClick={() => onUnlock(null)}
                className="text-xs text-black font-mono"
              >
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-black">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </button>
            </div>
            
            <p className="font-mono text-[10px] leading-3 uppercase text-left">
              Everyone wants to know what the juice of a cow tastes like. While there's only one way to find out for sure (see below), we'll do our best to explain:
            </p>
          </div>
          {/* FAQ list */}
          <div className="flex flex-col w-full space-y-2 ">
              {questions.map((item, idx) => (
                  <details
                      key={idx}
                      className={`group border-[0.5px] border-black rounded-sm w-full animate-flip-down animate-delay-[${item.delay}]`}
                  >
                      <summary className="cursor-pointer font-mono text-xs uppercase font-bold flex flex-1 w-full h-full px-2 py-2 sm:py-4 justify-between items-center">
                          <p class="flex w-full items-start">{item.q}</p>
                          <span className="transition-transform duration-300 group-open:rotate-45">＋</span>
                      </summary>
                      <div class="flex w-full border-t-[0.5px] border-black px-2 " />
                      <p className="mt-2 font-mono text-[11px] sm:text-[10px] px-2 pb-2 leading-3 uppercase animate-flip-down">
                          {item.a}
                      </p>
                  </details>
              ))}
          </div>

          
        </div>
        <div class="flex w-full border-b-[0.5px] border-black"/>
        <div class="flex flex-col items-center justify-center space-y-1">
          {/* Submit button */}
          <button
            type="submit"
            disabled={status === 'success'}
            class={[
              btnBase,
              status === 'idle'    && btnIdle,
              status === 'error'   && btnError,
              status === 'success' && btnSuccess,
            ].filter(Boolean).join(' ')}
          >
            {loading ? (
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 animate-spin">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <>
                {status === 'success' ? 'Welcome!' : 'Join the Private Beta Program'}
              </>
            )}
          </button>

          <button
            onClick={() => navigate('/questions')}
            disabled={status === 'success'}
            class="flex w-full items-center justify-start font-mono text-xs uppercase font-bold py-2 sm:py-4 px-2 rounded-sm border-[0.5px] border-black transition-colors duration-300"
          >
            {loading ? (
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 animate-spin">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <>Read the FAQs</>
            )}
          </button>
          {/* Footnotes */}
          <div class="flex flex-1 w-full sm:w-full border-black pt-2 h-full flex-col items-center justify-center sm:items-start space-y-2 animate-fade animate-delay-[1050ms]">
              {/* <p class="text-[10px] font-mono uppercase opacity-60 leading-3"><sup>[1]</sup> Of course, our chocolate milk — Brown Cow Juice™ — will also have chocolate. And Strawberry Shortcake Cow Juice will have strawberries and a very very small cake.</p> */}
          </div>

        </div>
      </form>
    </div>
  );
};

export default CaramelizedIncarnation;
