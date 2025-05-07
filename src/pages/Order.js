import React, { useState, useEffect,  useRef } from 'react';
import Typewriter from 'typewriter-effect';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

// graphics
import mockup_1 from '../assets/250ml_mockup_1.png';
import rack_2 from '../assets/rack_2.png'

const Order = () => {

  const [readyForNextTyping, setReadyForNextTyping] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);

  return (
    <div className="inset-0 flex flex-1 min-h-screen max-w-5xl mx-auto px-6 pb-6 pt-24 w-full h-full overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:space-x-16 items-start justify-start space-y-4 sm:space-y-0 w-full animate-fade">
            
            <div class="flex flex-row w-full h-full items-start justify-center p-0 space-x-2">
              <div class="flex w-full items-center justify-start">
                <img src={mockup_1} alt="Cow Juice Mockup" className={`flex w-full animate-fade-up sm:animate-fade-left animate-duration-700 sm:animate-duration-700 animate-delay-[1250ms] sm:animate-delay-[1250ms] rounded-sm select-none`} />
              </div>
              {/* <div class="hidden sm:flex w-full flex-row space-x-2 h-full">
                <img src={mockup_3} alt="Cow Juice Mockup" className="w-full h-full animate-fade-up animate-delay-[1650ms] mb-4 rounded-sm select-none" />
              </div> */}
            </div>
            
            <div class="flex flex-col w-full h-full items-center justify-start p-0 space-y-4">
              <div class={`flex flex-col space-y-2 w-full animate-fade animate-delay-500`}>
              
                  <p class="w-full font-mono uppercase font-bold text-xs text-left">
                    <Typewriter
                      options={{
                        delay: 30,
                        cursor: '',
                        autoStart: true,
                      }}
                      onInit={(typewriter) => {
                        typewriter
                          .pauseFor(0)
                          .typeString("This milk is <span class='uppercase font-bold bg-cowjuice-red rounded-sm px-[2px] text-white'>retorted</span>.")
                          .callFunction(() => {
                            setReadyForNextTyping(true);
                          })
                          .start()
                      }}
                    />
                  </p>
                  {readyForNextTyping && (
                    <p class="w-full font-mono uppercase text-xs text-left animate-fade-down animate-duration-700">
                      <Typewriter
                        options={{
                          delay: 30,
                          cursor: '',
                          autoStart: true,
                        }}
                        onInit={(typewriter) => {
                          typewriter
                            .pauseFor(1000)
                            .typeString("It was pasteurized in a <span class='uppercase font-bold bg-cowjuice-red rounded-sm px-[2px] text-white'>retort</span>: ")
                            
                            .pauseFor(500)
                            .typeString("a thermal chamber which performs <span class='uppercase font-bold bg-cowjuice-red rounded-sm px-[2px] text-white'>retortation™</span>,")
                            .pauseFor(250)
                            .typeString("the pasteurization process which caramelizes milk & tranforms it into naturally-sweeter, lactose-free cow juice.")
                            .callFunction(() => {
                              setTypingComplete(true);
                            })
                            .start();
                        }}
                      />
                    </p>

                  )}
                  
              </div>
              {typingComplete && (
                <>
                  <div class="flex flex-col items-center justify-center w-full space-y-2">
                    <img src={rack_2} class="hidden sm:block animate-fade-left animate-delay-[200ms]"/>
                    <button
                      onClick={() => window.location.href = '/shopify/products'} 
                      class="flex w-full p-2 sm:p-4 rounded-sm bg-black border-[0.5px] border-black animate-flip-up"
                    >
                      <p class="font-bold text-white text-xs font-mono uppercase">Order the world's first can of milk <sup>[1]</sup></p>
                    </button>
                    <button
                      onClick={() => window.location.href = '/about'} 
                      class="flex w-full p-2 sm:p-4 rounded-sm bg-white border-[0.5px] border-black animate-flip-down animate-delay-[250ms]"
                    >
                      <p class="font-bold text-black text-xs font-mono uppercase">Read about the retortation™ of dairy</p>
                    </button>
                  </div>

                {/* Footnotes below. */}
                <div class="flex flex-col w-full items-center justify-end space-y-2 animate-fade">
                  <div class="flex flex-col w-full items-center justify-center space-y-2 py-2 border-t-[0.5px] border-black">
                    <p class="text-[10px] leading-3 font-mono text-left w-full inline animate-flip-up "><sup>[1]</sup> This marks the official inception of the retort revolution, which you can join by purchasing Cow Juice, the world's first can of ultra-retorted milk™. Included in every parcel is an official certificate that grants you entry into the wonderful world of retortation, more commonly known as retort-land.</p>
                    <p class="text-[10px] leading-3 font-mono text-left w-full inline animate-flip-down"><sup>[2]</sup> Available now in public-beta. Orders ship immediately, hand-packed by Cow Juice Man himself.</p>
                  </div>
                </div>

                {/* ─── Legal ─────────────────────────────────────────────────────── */}
                <p className="font-mono py-2 text-[10px] leading-3 uppercase opacity-60 border-t-[0.5px] border-black">
                    Ultra‑Retorted™, Retortation™, & Cow Juice™ are trademarks of Cow Juice Inc. Rip 'em and we'll toss you in the retort with the next batch of Cow Juice.
                </p>
                </>
              )}
              
            </div>
          </div>
      </div>
  );
};

export default Order;
