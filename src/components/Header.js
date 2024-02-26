import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useMasterContext } from '../contexts/MasterContext';

import ideas from './Home/IdeasGrid/Ideas';
import works from './Home/WorkGrid/Work';

const Header = () => {
    const navigate = useNavigate();
    const onHome = window.location.pathname === '/';

    const { handleIdeaClick, handleWorkClick } = useMasterContext();

    const sections = [
        {
            name: '/home',
            href: '/',
            subsections: [],
        },
        {
            name: '/ideas',
            href: '/ideas',
            subsections: [
                {
                    name: '/imbalances-and-innovation',
                    href: '/ideas/imbalances-and-innovation',
                },
                // {
                //     name: '/fiscal-theory',
                //     href: '/ideas/fiscal-theory',
                // },
                {
                    name: '/rectifying-trade-imbalances',
                    href: '/ideas/rectifying-trade-imbalances',
                },
                
                // {
                //     name: '/dividend-discount-pricing',
                //     href: '/ideas/dividend-discount-pricing',
                // },
                // {
                //     name: '/the-problems-imbalances-pose',
                //     href: '/ideas/the-problems-imbalances-pose',
                // },
                // {
                //     name: '/on-sticky-prices',
                //     href: '/ideas/on-sticky-prices',
                // },
            ],
        },
        {
            name: '/projects',
            href: '/projects',
            subsections: [
                {
                    name: '/chipt-checkout',
                    href: '/projects/chipt-checkout',
                },
                {
                    name: '/aditus',
                    href: '/projects/aditus',
                },
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
                {
                    name: '/claros',
                    href: '/projects/claros',
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
        const project = works.find((work) => work.tag === subsection.name.substring(1));
        const idea = ideas.find((idea) => idea.tag === subsection.name.substring(1));
        console.log('project', project);
        console.log('idea', idea);
        if (project) {
            handleWorkClick(project);
        }

        if (idea) {
            handleIdeaClick(idea);
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
            </div>
        </div>
    );
};

export default Header;
