import React from 'react';

import { useMasterContext } from '../../../contexts/MasterContext';

import works from './Work';

const WorkGrid = () => {

    const {  isWelcomeTextTyping } = useMasterContext();

    return (
        <>
            {!isWelcomeTextTyping && (
                <div class="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 animate-slide-up-fade-in">
                    {works && works.length > 0 && works.map((work, index) => {
                        return (
                            <div key={index} class="">
                                <div class="flex flex-col items-start justify-center space-y-2">
                                    <div class="flex flex-col items-start justify-center">
                                        <p class=" uppercase font-mono text-xs">
                                            {work.title}
                                        </p>
                                    </div>
                                    <a class=" transition-colors duration-200 font-mono text-xs cursor-pointer select-none">
                                        <span class="inline-flex flex-wrap items-center">
                                            {work.description}
                                        </span>
                                    </a>
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