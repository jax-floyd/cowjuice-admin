import React, { useState, useEffect, useRef } from 'react';

import mockup_1a from '../assets/250ml_mockup_1a.png'; 
import mockup_2a from '../assets/250ml_mockup_2a.png';

const Can = () => {
    
    const canRef = useRef(null);
    const [visible, setVisible] = useState(false);   // ← fire once

    /* When 5 % of footer is visible, flip `visible` to true */
    useEffect(() => {
        const el = canRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();          // run only once
            }
        },
        { threshold: 0.05 }                 // tweak as you like
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const anim = (cls) => (visible ? cls : 'opacity-0');   // or 'animate-none'
    
    return (
        <div ref={canRef} className="inset-0 flex flex-1 flex-col max-w-6xl mx-auto px-6 pb-6 pt-6 w-full h-full overflow-hidden">
            <div className={anim("flex animate-fade-down border-black  border-t-[0.5px] border-b-[0.5px] py-6 flex-1 flex-row sm:flex-row items-start justify-start space-y-4 sm:space-y-0 w-full")}>
                <div class="flex flex-row">
                    <img class="flex" src={mockup_1a} />
                    <img class="hidden sm:block sm:w-1/2" src={mockup_2a} />
                </div>
                
            </div>
        </div>

    );
};

export default Can;