import React from 'react';

const Header = () => {

    return (
        <>  
            <div class="absolute w-full max-w-7xl mx-auto p-4 animate-slide-down-fade-in">
                <div class="flex flex-flow items-center justify-end space-x-4">
                    <a href="/ideas" class={`text-xs font-mono ${window.location.pathname === '/ideas' && 'font-bold'}`}>/ideas</a>
                    <a href="/projects" class={`text-xs font-mono ${window.location.pathname === '/projects' && 'font-bold'}`}>/projects</a>
                    <a href="/more" class={`text-xs font-mono ${window.location.pathname === '/more' && 'font-bold'}`}>/more</a>
                </div>
            </div>
        </>
    );
};

export default Header;