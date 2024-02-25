import React from 'react';

import { useMasterContext } from '../contexts/MasterContext';

import IdeasGrid from '../components/Home/IdeasGrid/IdeasGrid';

const Ideas = () => {

    const { showIdeasGrid, setShowIdeasGrid } = useMasterContext();

    setShowIdeasGrid(true);
    
    return (
        <div className="w-full flex flex-col flex-1 max-w-7xl mx-auto p-4 items-center justify-center">
            <>
                {showIdeasGrid && (
                    <IdeasGrid />
                )}
            </>
        </div>
    );
};

export default Ideas;