import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UltraRetortedMilk = ({ onUnlock }) => {

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
            q: <>Is Ultra-Retorted Milk a real thing?</>,
            a: <>Yes. Retort is a pasteurization method which has been used for centuries -- but never before with milk. Hence the revolutionary nature of Cow Juice. Read the National Center for Biotechnology Information's article about retort, <a class='border-[0.5px] border-cowjuice-gold font-bold px-[2px] text-cowjuice-gold' href='https://pmc.ncbi.nlm.nih.gov/articles/PMC10916645/' target='_blank'>here --></a>.</>,
            delay: "250ms",
        },
        {
            q: <>How is it different from regular milk?</>,
            a: "The high-heat of retortation caramelizes milk's natural sugars to naturally impart a butterscotchy flavor into the Cow Juice. It is ever-so-slightly sweeter than milk with the sort of nutty flavors of toasted sugar. URM is also lactose-free and has an extended 365-day shelf-life.",
            delay: "300ms",
        },
        {
            q: <>So is the can filled with literally just milk?</>,
            a: <>Yes. The only ingredient in OG Cow Juice is Milk,<sup>[1]</sup> pasteurized under Ultra-Retortation.</>,
            delay: "850ms",
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
                Ultra-Retorted Milk [URM] | A Primer
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
              Below are the three (3) most commonly asked questions about the <span class="text-cowjuice-red border-[0.5px] border-cowjuice-red rounded-sm px-[2px]">Retortation</span> of dairy. The answers will help to satisfy your concerns, thought of course not nearly to the extent as would buying the actual Cow Juice.
            </p>
          </div>
          {/* FAQ list */}
          <div className="flex flex-col w-full space-y-2">
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
                {status === 'success' ? 'Welcome!' : 'Buy Ultra-Retorted Milk'}
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
              <>Read all the FAQs</>
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

export default UltraRetortedMilk;
