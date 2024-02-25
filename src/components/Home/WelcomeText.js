import React, { useEffect } from 'react';

import Typewriter from "typewriter-effect";

import { useMasterContext } from '../../contexts/MasterContext';

const WelcomeText = () => {

    const { isWelcomeTextTyping, setIsWelcomeTextTyping, handleTypingAnimationComplete } = useMasterContext();
    
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
                        .typeString("jaxfloyd.com")
                        .pauseFor(500)
                        .deleteAll()
                        .typeString("welcome.")
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