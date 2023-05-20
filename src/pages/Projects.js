import React from 'react';

import { useMasterContext } from '../contexts/MasterContext';

import WorkGrid from '../components/Home/WorkGrid/WorkGrid';

const Projects = () => {

    const { showWorkGrid } = useMasterContext();
    
    return (
        <div className="w-full flex flex-col flex-1 max-w-7xl mx-auto p-4 items-center justify-center">
            <>
                {showWorkGrid && (
                    <WorkGrid />
                )}
            </>
            
            
            
        </div>
    );
};

export default Projects;
