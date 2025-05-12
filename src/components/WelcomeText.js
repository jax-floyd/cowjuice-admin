import React, { useEffect } from 'react';

import Typewriter from "typewriter-effect";

import { useMasterContext } from '../contexts/MasterContext';

const WelcomeText = () => {

    const { isWelcomeTextTyping, setIsWelcomeTextTyping, handleTypingAnimationComplete } = useMasterContext();

    useEffect(() => {
        setIsWelcomeTextTyping(true);
    }, []);
    
    return (
        <a className={`text-xs text-left font-mono uppercase ${!isWelcomeTextTyping && 'animate-slide-left-fade-out'}`}>
            <Typewriter
                options={{
                    delay: 36,
                    autoStart: true,
                    cursor: "_",
                    deleteSpeed: 18,
                }}
                onInit={(typewriter) => {
                    typewriter
                        .typeString("cow juice.")
                        .pauseFor(500)
                        .typeString("<br />a dairy <span class='bg-cowjuice-gold text-white font-bold rounded-sm px-[2px]'>revolution</span>.")
                        .pauseFor(500)
                        .typeString("<br />the world's first can of <span class='bg-cowjuice-gold text-white rounded-sm font-bold px-[2px]'>milk</span>:")
                        .pauseFor(500)
                        // .typeString("cow juice ")
                        // .pauseFor(200)
                        // .typeString("<br />is a very <span class='bg-black text-white font-bold rounded-sm px-[2px]'>special</span> ")
                        // .pauseFor(200)
                        // .typeString("kind of milk ...")
                        // .pauseFor(500)
                        .callFunction(() => {
                            handleTypingAnimationComplete();
                        })
                        .start();
                }} 
            />
        </a>
    );
};

export default WelcomeText;