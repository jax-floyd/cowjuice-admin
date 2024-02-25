import React from 'react';

const Error = () => {
    
    return (
        <div 
            class="w-full flex flex-col flex-1 max-w-7xl mx-auto p-4 items-center justify-center animate-fade"
        >
            <p class="font-mono text-xs">Uh oh. Error 404</p>
            <a href="/" class="font-mono text-xs">Go Home</a>
        </div>
    );
};

export default Error;
