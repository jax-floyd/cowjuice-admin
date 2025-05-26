import React, { useState } from 'react';
import Typewriter from 'typewriter-effect';


import mockup_1a from '../assets/250ml_mockup_1a.png'; 

const Order = () => {

  const [typingComplete, setTypingComplete] = useState(false);

  const [defineRetort, setDefineRetort] = useState(false);

  return (
    <div className="inset-0 flex flex-1 flex-col min-h-screen max-w-6xl mx-auto px-6 pb-6 pt-24 w-full h-full overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:space-x-16 items-start justify-start space-y-4 sm:space-y-0 -mt-16 w-full h-full">
            
            <div class="flex flex-row w-full h-full items-start justify-center space-x-2">
              <div class="relative flex w-full items-center justify-start">
                <div class={`absolute inset-0 animate-flip-down`}>
                  <div class={`absolute inset-0 duration-[2000ms]`}>
                    {/* <div class="absolute inset-0 bg-white border-[0.5px] border-black z-10" /> */}
                    <div class="flex w-1/2">
                        {/* The actual logo's SVG */}
                        <svg class="w-full h-full z-20" id="Layer_2" data-name="Layer 2" viewBox="0 0 119.06 300.64">
                            <g id="Layer_1-2" data-name="Layer 1">
                                <g>
                                    <path class={"fill-currentw transition-colors duration-300 animate-fade-right animate-delay-[475ms]"} d="M66.88,292.71c18.83,0,22.64-4.86,22.81-23.57h25.57c-.17,24.28-8.12,31.5-57.02,31.5s-55.29-8.76-55.47-32.92h42.68c.17,21.67,2.94,24.99,21.43,24.99Z"/>
                                    <path class={"fill-current animate-fade-right animate-delay-[375ms]"} d="M112.32,240.72c0,18.48-15.21,21.2-65.66,21.2-27.3,0-45.79-2.84-45.79-18.12,0-16.34,5.53-21.2,59.96-21.2,41.99,0,51.49,6.63,51.49,18.12ZM40.61,243.32c0,10.42,9.16,11.72,24.36,11.72s24.71-2.61,24.71-11.72-7.43-12.79-24.71-12.79-24.36,2.49-24.36,12.79Z"/>
                                    <path class={"fill-current animate-fade-right animate-delay-[300ms]"} d="M113.01,186.6c-4.32.71-27.47,2.96-27.47,4.74,0,2.01,26.26,4.62,31.62,5.21v14.57l-110.42,8.29v-7.7c29.2-2.72,45.27-4.15,54.6-5.45,7.95-1.18,11.4-1.42,11.4-3.67,0-2.72-13.31-4.62-61.69-7.58v-7.22c23.15-1.78,36.29-2.61,43.89-3.67,6.74-.83,10.02-.95,10.02-3.2,0-3.32-7.78-5.09-57.89-10.19v-6.51l105.92,9.24v13.15Z"/>
                                </g>
                                <g>
                                    <path class={"fill-current animate-fade-right animate-delay-[250ms]"} d="M119.06,158.1h-31.79c-.52-10.78-6.39-13.5-24.54-13.5H0v-8.53h53.57c54.95,0,65.14,2.01,65.49,22.03Z"/>
                                    <path class={"fill-current animate-fade-right animate-delay-[200ms]"} d="M118.02,111.91c0,16.82-20.74,17.65-108.51,17.65v-8.65c57.19-.12,69.81-1.18,69.81-9.47,0-4.38-2.59-7.34-14.34-8.76-5.7-.71-13.13-1.07-22.81-1.18-9.33-.12-20.91-.12-36.81-.12v-6.87c92.62,0,112.66,1.07,112.66,17.41Z"/>
                                    <path class={"fill-current animate-fade-right animate-delay-[150ms]"} d="M4.84,87.4v-9.24h106.79v9.24H4.84Z"/>
                                    <path class={"fill-current animate-fade-right animate-delay-[50ms]"} d="M66.87,63.24c18.83,0,22.64-4.86,22.81-23.57h25.57c-.17,24.28-8.12,31.5-57.02,31.5S2.94,62.41,2.76,38.25h42.68c.17,21.67,2.94,24.99,21.43,24.99Z"/>
                                    <path class={"fill-current animate-fade-right animate-delay-[0ms]"} d="M7.6,31.15V.71h35.77c0,22.62,1.73,23.57,8.29,23.57,7.43,0,9.68-.71,9.68-20.96h11.23c0,18.59,1.9,19.9,9.85,19.9s9.68-1.18,9.85-23.21h22.64v31.15H7.6Z"/>
                                </g>
                            </g>
                        </svg>
                    </div>
                  </div>
                </div>
                
                <div class="flex w-full h-full items-center justify-center animate-fade opacity-0 animate-delay[250ms]">
                  <img src={mockup_1a} alt="Cow Juice Mockup" className={`flex w-full opacity-0 rounded-sm select-none`} />
                </div>
                
              </div>
              {/* <div class="hidden sm:flex w-full flex-row space-x-2 h-full">
                <img src={mockup_3} alt="Cow Juice Mockup" className="w-full h-full animate-fade-up animate-delay-[1650ms] mb-4 rounded-sm select-none" />
              </div> */}
            </div>
            
            <div class="flex flex-col w-full h-full items-center justify-start space-y-4">
              <div class={`flex flex-col w-full items-start justify-center space-y-2 animate-fade animate-delay-500`}>
                  <div class="w-auto flex">
                    <div class="flex flex-col w-auto items-start justify-start relative space-y-2">
                      <p class="uppercase font-mono font-bold text-xs text-left">
                        <Typewriter
                          options={{
                            delay: 30,
                            cursor: '',
                            autoStart: true,
                          }}
                          onInit={(typewriter) => {
                            typewriter
                              .pauseFor(1000)
                              .typeString("Coming soon: ")
                              .pauseFor(500)
                              // ① write the HTML with a predictable id
                              .typeString(
                                `The world’s first can of <span id="retortBtn" class="uppercase font-bold border-[0.5px] border-cowjuice-red cursor-pointer rounded-sm px-[2px] text-cowjuice-red animate-pulse">Ultra‑Retorted Milk™</span>.<sup>[i]</sup>`
                              )
                              // ② when it finishes typing, attach listeners
                              .callFunction(() => {
                                setTypingComplete(true);

                                const btn = document.getElementById('retortBtn');
                                if (!btn) return;

                                /* ✅ stable callbacks */
                                const toggle   = () => setDefineRetort(prev => !prev);
                                const show     = () => setDefineRetort(true);
                                const hide     = () => setDefineRetort(false);

                                /* mobile: tap toggles */
                                btn.addEventListener('click', toggle);

                                /* desktop: hover shows / hides */
                                if (window.matchMedia('(hover: hover)').matches) {
                                  btn.addEventListener('mouseenter', show);
                                  btn.addEventListener('mouseleave', hide);
                                }

                                /* 🔒 cleanup */
                                return () => {
                                  btn.removeEventListener('click', toggle);
                                  btn.removeEventListener('mouseenter', show);
                                  btn.removeEventListener('mouseleave', hide);
                                };
                              })

                              .start();
                          }}
                        />
                        {/* --- Ultra‑Retorted Milk definition card --------------------------- */}
                        {typingComplete && (
                          <div className="flex flex-col space-y-2 w-auto items-start justify-start mt-2 bg-white text-[10px] leading-3 font-mono">
                            <div class="flex flex-col space-y-1 text-left bg-white rounded-md border-[0.5px] border-black p-1 animate-flip-down animate-delay-[125ms]">
                              <p class="uppercase font-bold max-w-sm">"Ultra‑Retorted Milk", def. (1a):</p>
                              <p class="uppercase font-light max-w-sm">"Ultra-Retort™ is a high-heat pasteurization process which caramelizes milk's natural sugars to produce a naturally sweeter, lactose-free, shelf-stable can of milk."</p>
                            </div>
                          </div>
                        )}
                      </p>
                    </div>

                  </div>
                  
              </div>

            {typingComplete && (
                <div class="flex flex-1 flex-col w-full h-full space-y-2 items-start justify-end">
                    <div class="flex border-t-[0.5px] border-black w-full animate-fade animate-delay-[250ms]"></div>
                    <p class="text-[10px] sm:text-xs font-mono leading-3 sm:leading-normal animate-flip-up animate-delay-[250ms]"><sup>[I]</sup> Production completed 2025-05-15. Beta release to immediately follow.</p>
                </div>
            )}
            </div>
          </div>
      </div>
  );
};

export default Order;
