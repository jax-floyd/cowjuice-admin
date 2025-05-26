import React from 'react';

const Error = () => {
    
    return (
        <div 
            class="w-full flex flex-col flex-1 max-w-7xl mx-auto p-4 items-center justify-center animate-fade space-y-1"
        >
            <p class="font-mono text-xs">page not found.</p>
            <a href="/" class="px-1 font-mono text-xs rounded-sm border-[0.5px] border-cowjuice-red text-cowjuice-red font-bold uppercase animate-pulse">go home</a>
        </div>
    );
};

export default Error;
