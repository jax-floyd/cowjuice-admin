import React, { useState } from 'react';

import { useMasterContext } from '../../../contexts/MasterContext';

import dollar from '../../../assets/ideas/fiscal_theory/dollar.jpg';
import ship from '../../../assets/ideas/trade_imbalances/ship.jpg';
import mercantilePort from '../../../assets/ideas/imbalances_and_innovation/mercantile_port.png';

import ideas from './Ideas';

const IdeasGrid = () => {

    const {  isWelcomeTextTyping, handleIdeaClick } = useMasterContext();

    const [ideaHovered, setIdeaHovered] = useState(null);
    const [ideaButtonHovered, setIdeaButtonHovered] = useState(null);

    return (
        <>
            {!isWelcomeTextTyping && (
                <div class="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-8 animate-slide-up-fade-in">
                    {ideas && ideas.length > 0 && ideas.map((idea, index) => {
                        return (
                            <div key={index} >
                                <div 
                                    onMouseEnter={() => setIdeaHovered(idea)}
                                    onMouseLeave={() => setIdeaHovered(null)}
                                    class="flex flex-col items-start justify-center space-y-2 cursor-pointer">
                                    
                                    <div class="flex flex-row items-start justify-between w-full space-x-4">
                                        <p class=" uppercase font-mono text-xs">
                                            {idea.title}
                                        </p>
                                        <p class="font-semibold font-mono text-xs">
                                            {idea.date}
                                        </p>
                                    </div>
                                    <a class="transition-colors duration-200 font-mono text-xs cursor-pointer">
                                        <span class="inline-flex flex-wrap items-center">
                                            {idea.description}
                                        </span>
                                    </a>
                                    {ideaHovered && ideaHovered.id === idea.id ? (
                                        <div class="flex flex-row items-center justify-start space-x-2">
                                            <a
                                                onClick={() => handleIdeaClick(idea)}
                                                onMouseEnter={() => setIdeaButtonHovered(idea.id + 'learn')}
                                                onMouseLeave={() => setIdeaButtonHovered(null)}
                                                class="font-mono text-xs animate-fade-left px-2 pl-5 border border-dashed border-black dark:border-white transition-colors duration-400 cursor-pointer rounded-full"
                                            >
                                                <span class="inline-flex flex-wrap items-center">
                                                    Read <span class="hidden sm:inline">&nbsp;More</span>
                                                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={"w-4 h-4" + (ideaButtonHovered === idea.id + 'learn' ? ' opacity-100 animate-fade-right animate-delay-none animate-duration-400' : ' opacity-0')}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                                    </svg>
                                                </span>
                                            </a>
                                        </div>

                                    ) : (
                                        <div class="flex flex-row items-center justify-start space-x-2">
                                            <a
                                                onClick={() => handleIdeaClick(idea)}
                                                class="font-mono text-xs px-2 border border-transparent rounded-full"
                                            >
                                                <span class="inline-flex flex-wrap items-center">
                                                    
                                                </span>
                                            </a>

                                            <a
                                                href={idea.link}
                                                target="_blank"
                                                class="font-mono text-xs px-2 border border-transparent rounded-full"
                                            >
                                                <span class="inline-flex flex-wrap items-center">
                                                    
                                                </span>
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </>
    );
};

export default IdeasGrid;