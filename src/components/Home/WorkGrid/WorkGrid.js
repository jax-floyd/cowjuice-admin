import React, { useState } from 'react';

import { useMasterContext } from '../../../contexts/MasterContext';

import works from './Work';

const WorkGrid = () => {

    const {  isWelcomeTextTyping, handleWorkClick } = useMasterContext();

    const [workHovered, setWorkHovered] = useState(null);

    return (
        <>
            {!isWelcomeTextTyping && (
                <div class="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 animate-slide-up-fade-in">
                    {works && works.length > 0 && works.map((work, index) => {
                        return (
                            <div key={index} >
                                <div 
                                    onMouseEnter={() => setWorkHovered(work)}
                                    onMouseLeave={() => setWorkHovered(null)}
                                    class="flex flex-col items-start justify-center space-y-2 cursor-pointer">
                                    <div class="flex flex-row items-start justify-start w-full space-x-4">
                                        <p class=" uppercase font-mono text-xs">
                                            {work.title}
                                        </p>
                                        
                                    </div>
                                    <a class="transition-colors duration-200 font-mono text-xs cursor-pointer">
                                        <span class="inline-flex flex-wrap items-center">
                                            {work.description}
                                        </span>
                                    </a>
                                    {workHovered && workHovered.id === work.id ? (
                                        <div class="flex flex-row items-center justify-start space-x-2">
                                            <a
                                                onClick={() => handleWorkClick(work)}
                                                class="font-mono text-xs animate-fade-left px-2 border border-dashed border-black dark:border-white hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors duration-400 cursor-pointer rounded-full"
                                            >
                                                <span class="inline-flex flex-wrap items-center">
                                                    Learn <span class="hidden sm:inline">&nbsp;More</span>
                                                </span>
                                            </a>

                                            <a
                                                href={work.link}
                                                target="_blank"
                                                class="font-mono text-xs animate-fade-up px-2 border border-dashed border-black dark:border-white hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors duration-400 cursor-pointer rounded-full"
                                            >
                                                <span class="inline-flex flex-wrap items-center">
                                                    View<span class="hidden sm:inline">&nbsp;Project</span>
                                                </span>
                                            </a>
                                        </div>

                                    ) : (
                                        <div class="flex flex-row items-center justify-start space-x-2">
                                            <a
                                                onClick={() => handleWorkClick(work)}
                                                class="font-mono text-xs px-2 border border-transparent rounded-full"
                                            >
                                                <span class="inline-flex flex-wrap items-center">
                                                    
                                                </span>
                                            </a>

                                            <a
                                                href={work.link}
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

export default WorkGrid;