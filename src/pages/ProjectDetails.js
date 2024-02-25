import React from 'react';

import { useMasterContext } from '../contexts/MasterContext';

const ProjectDetails = () => {

    const { selectedProject, fetchWork } = useMasterContext();

    if (!selectedProject) {
        const tag = window.location.pathname.split('/').pop();
        fetchWork(tag);
    };

    if (!selectedProject) return null;

    return (
        <div class="max-w-3xl mx-auto p-4">
            <div class="flex flex-col items-start justify-start">
                <div class="flex flex-row items-start justify-between space-x-4 animate-flip-up">
                    <p class="uppercase font-mono text-xs">
                        {selectedProject.title}
                    </p>

                    <p class="uppercase font-mono text-xs">|</p>
                
                    <p class="uppercase font-mono text-xs">
                        {selectedProject.blurb}
                    </p>
                </div>

                <div class="w-full border-[0.5px] my-8" />

                <div class="flex flex-col items-start justify-start">
                    <p class="font-mono text-xs animate-fade-down animate-delay-500">
                        {selectedProject.details.map((detail, index) => {
                            return (
                                <p key={index}>
                                    <a key={index}>
                                        {detail}
                                        <div class="my-3"/>
                                    </a>
                                </p>

                            )}
                        )}
                    </p>
                </div>  
            </div>
        </div>
    );
};

export default ProjectDetails;