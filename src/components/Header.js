import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {

    const navigate = useNavigate();

    const onHome = window.location.pathname === '/';

    return (
        <>  
            <div class="w-full max-w-7xl mx-auto p-4 animate-slide-down-fade-in">
                <div class={`flex flex-flow items-center ${!onHome ? 'justify-between' : 'justify-end'}`}>
                    <div class="flex flex-row items-center justify-start space-x-4">
                        <a onClick={() => navigate(-1)} class="text-xs font-mono cursor-pointer">&lt;&lt; </a>
                    </div>
                    <div class="space-x-4">
                        {window.location.pathname !== '/' && (<a href="/" class="text-xs font-mono">/home</a>)}
                        <a href="/ideas" class={`text-xs font-mono ${window.location.pathname === '/ideas' && 'font-bold'}`}>/ideas</a>
                        <a href="/projects" class={`text-xs font-mono ${window.location.pathname === '/projects' && 'font-bold'}`}>/projects</a>
                        <a href="/more" class={`text-xs font-mono ${window.location.pathname === '/more' && 'font-bold'}`}>/more</a>
                    </div>
                    
                </div>
            </div>
        </>
    );
};

export default Header;