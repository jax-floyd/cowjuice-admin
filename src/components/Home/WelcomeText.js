import React, { useEffect } from 'react';

import Typewriter from "typewriter-effect";

import { useMasterContext } from '../../contexts/MasterContext';

const WelcomeText = () => {

    const { isWelcomeTextTyping, setIsWelcomeTextTyping, handleTypingAnimationComplete } = useMasterContext();

    // on component mount and every re-=render set the welcom text to true
    // then when the typing animation is complete, set the welcome text to false

    useEffect(() => {
        setIsWelcomeTextTyping(true);
    }, []);
    
    return (
        <a className={`text-xs font-mono ${!isWelcomeTextTyping && 'animate-slide-up-fade-out'}`}>
            <Typewriter
                options={{
                    delay: 36,
                    autoStart: true,
                }}
                onInit={(typewriter) => {
                    typewriter
                        .typeString("Hello.")
                        .pauseFor(500)
                        .deleteAll()
                        .typeString("I'm Jax.")
                        .pauseFor(500)
                        .deleteAll()
                        .typeString('I like to build stuff.')
                        .pauseFor(500)
                        .deleteAll()
                        .typeString("Let me show you.")
                        .pauseFor(500)
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