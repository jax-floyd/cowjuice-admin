import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Typewriter from "typewriter-effect";


/* ---------- Universal helper component to ensure react router dom navs scroll to top as do href navs ---------- */
const QR = () => {

    const navigate = useNavigate();

    const [isTextTyping, setIsTextTyping] = useState(true);
    useEffect(() => {
        if (!isTextTyping) {
            setTimeout(() => {
                navigate('/questions');
            }, (750));
        }
    }, [isTextTyping]);

    return (
        <div class="w-full flex flex-col flex-1 max-w-7xl mx-auto p-4 items-center justify-center">
            {/* {readyForSplash && (
                <MooSplash />
            )} */}
            <div class="flex text-black w-full text-left sm:text-center items-center justify-center">
                <a className={`flex w-full text-xs text-left font-mono uppercase ${!isTextTyping && 'animate-slide-up-fade-out'}`}>
                    <Typewriter
                        options={{
                            delay: 36,
                            autoStart: true,
                            cursor: "_",
                            deleteSpeed: 18,
                        }}
                        onInit={(typewriter) => {
                            typewriter
                                .typeString("we know you have questions:")
                                .pauseFor(500)
                                .callFunction(() => {
                                    setIsTextTyping();
                                })
                                .start();
                        }} 
                    />
                </a>
            </div>
        </div>
       
    );
};

export default QR;