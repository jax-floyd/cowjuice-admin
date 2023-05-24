import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useMasterContext } from '../contexts/MasterContext';

import works from './Home/WorkGrid/Work';

const Header = () => {
    const navigate = useNavigate();
    const onHome = window.location.pathname === '/';

    const { handleWorkClick } = useMasterContext();

    const sections = [
        {
            name: '/home',
            href: '/',
            subsections: [],
        },
        {
            name: '/ideas',
            href: '/ideas',
            subsections: [],
        },
        {
            name: '/projects',
            href: '/projects',
            subsections: [
                {
                    name: '/financr',
                    href: '/projects/financr',
                },
                {
                    name: '/esterify',
                    href: '/projects/esterify',
                },
                {
                    name: '/sequal',
                    href: '/projects/sequal',
                },
            ],
        },
        {
            name: '/contact',
            href: '/contact',
            subsections: [],
        },
    ];

    const [hoveredTag, setHoveredTag] = useState(null);
    const handleHeaderTagHover = (tag) => {
        setHoveredTag(tag);
    };


    const handleSubsectionClick = (subsection) => {
        // Find the project that matches the subsection name
        console.log(subsection.name.substring(1))
        const project = works.find((work) => work.tag === subsection.name.substring(1));
        
        if (project) {
            handleWorkClick(project);
        }
    };
    

    return (
        <div class="w-full max-w-7xl mx-auto p-4 animate-slide-down-fade-in">
            <div class={`flex flex-flow items-center ${!onHome ? 'justify-between' : 'justify-end'}`}>
                <div class="flex flex-row items-center justify-start space-x-4">
                    <a onClick={() => navigate(-1)} class="text-xs font-mono cursor-pointer">&lt;&lt; </a>
                </div>
                <div class="space-x-4">
                    {sections.map((section, index) => (
                        <>
                            <a
                                key={index}
                                href={section.href}
                                onMouseEnter={() => handleHeaderTagHover(section.name)}
                                class={`text-xs font-mono ${window.location.pathname === section.name && 'font-bold'}`}
                            >
                                {section.name}
                            </a>

                            {hoveredTag === section.name && section.subsections.length > 0 && (
                                <div
                                    class="hidden absolute left-auto right-auto top-auto mt-2 z-10 sm:flex flex-col items-center justify-center"
                                    onMouseLeave={() => handleHeaderTagHover(null)}

                                >
                                    <div class="z-0 flex flex-col items-start justify-center space-y-2 ml-24 animate-flip-down">
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
            </div>
        </div>
    );
};

export default Header;
