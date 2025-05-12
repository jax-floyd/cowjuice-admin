import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useMasterContext } from '../contexts/MasterContext';

const Header = () => {
    const navigate = useNavigate();

    const [page, setPage] = useState(window.location.pathname);

    const { user, handleIdeaClick, handleWorkClick, bag } = useMasterContext();

    const sections = [
        {
            name: '/home',
            href: '/',
            delay: '125ms',
            subsections: [],
        },
        {
            name: '/about',
            href: '/about',
            delay: '250ms',
            subsections: [
                // {
                //     name: '/retort',
                //     href: '/about/retort'
                // }
            ],
        },
        {
            name: '/products',
            href: '/shopify/products',
            delay: '375ms',
            subsections: [
                
            ],
        },
        // {
        //     name: '/photos',
        //     href: '/photos',
        //     subsections: [],
        // },
        {
            name: '/contact',
            href: '/contact',
            delay: '500ms',
            subsections: [],
        },
    ];

    const [hoveredTag, setHoveredTag] = useState(null);
    const handleHeaderTagHover = (tag) => {
        setHoveredTag(tag);
    };

    const handleSubsectionClick = (subsection) => {
        const project = "";
        const idea = "";

        if (project) {
            handleWorkClick(project);
        }

        if (idea) {
            handleIdeaClick(idea);
        }
    };

   
    const getDelayClass = (pathname) => {
        switch (pathname) {
        case '/':
            return '';                               // no delay on home
        case '/about':
            return 'animate-delay-[0ms]';         // 6000ms if we want delayed header entyr back
        case '/shopify/products':
            return 'animate-delay-[0ms]';         // medium
        case '/order':
            return 'animate-delay-[8500ms]';         // current special
        case '/contact':
            return 'animate-delay-[500ms]';          
        default:
            return '';                               
        }
    };
  
    const delay = getDelayClass(page);

    return (
        <div class={`absolute w-full bg-white text-black uppercase border-b-[0.5px] border-black items-center justify-center flex px-6 py-6 animate-flip-down ${delay}`}>
            <div class={`flex w-full max-w-6xl mx-auto flex-flow items-center ${page != '/' ? 'justify-between' : 'justify-end'}`}>
                <div class="flex flex-row items-center justify-start space-x-4">
                    <a onClick={() => navigate(-1)} class="text-xs font-mono cursor-pointer">&lt;&lt; </a>
                </div>
                <div class="flex flex-1 w-full items-center justify-end space-x-4 sm:space-x-6">
                    <div class="space-x-4">
                        {sections.map((section, index) => (
                            <>
                                <a
                                    key={index}
                                    href={section.href}
                                    onMouseEnter={() => handleHeaderTagHover(section.name)}
                                    class={`text-xs font-mono active:bg-cowjuice-red active:font-bold active:text-white rounded-sm px-[2px] transition-all duration-300 ${window.location.pathname === section.name && 'font-bold'} animate-fade-down animate-delay-${section.delay}`}
                                >
                                    {section.name}
                                </a>

                                {hoveredTag === section.name && section.subsections.length > 0 && (
                                    <div
                                        class="hidden absolute left-auto right-auto top-auto mt-2 z-10 sm:flex flex-col items-center justify-center"
                                        onMouseLeave={() => handleHeaderTagHover(null)}

                                    >
                                        <div class={`z-0 flex flex-col items-start justify-center space-y-2 ${section.name === '/projects' ? 'ml-24' : 'ml-9'} animate-flip-down`}>
                                            {section.subsections.map((subsection) => {
                                                return (
                                                    <div
                                                        class="flex flex-col"
                                                        onClick={() => handleSubsectionClick(subsection)}
                                                    >
                                                        <a class={`text-xs font-mono cursor-pointer ${window.location.pathname === subsection.href && 'font-bold'}`}>{subsection.name}</a>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )}
                            </>
                        ))}
                        
                    </div>
                    <div class="flex flex-row items-center justify-start space-x-4">
                        <a href={`/shopify/bag`} class={`relative text-xs font-mono text-black cursor-pointer`}>
                            <svg fill="none" viewBox="0 0 24 24" strokeWidth={window.location.pathname === '/bag' ? 2.125 : 1.0} stroke="currentColor" class="h-4 w-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                            {/* {bag.length != 0 && (
                                <span class="text-[8px] font-mono absolute bg-sky-200 p-[0.5px] rounded-full border-[0.5px] border-black">{bag.length}</span>
                            )} */}
                        </a>
                    </div>

                </div>
                
            </div>
        </div>
    );
};

export default Header;