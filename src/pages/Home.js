import React from 'react';

import { useMasterContext } from '../contexts/MasterContext';

import WelcomeText from '../components/Home/WelcomeText';

const Home = () => {

    const { showWelcomeText, handleHomeSwipeUp } = useMasterContext();
    
    return (
        <div 
            class="w-full flex flex-col flex-1 max-w-7xl mx-auto p-4 items-center justify-center"
        >
            {showWelcomeText && (
                <WelcomeText />
            )}
        </div>
    );
};

export default Home;
