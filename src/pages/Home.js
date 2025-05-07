import React from 'react';

import { useMasterContext } from '../contexts/MasterContext';

import WelcomeText from '../components/WelcomeText';

const Home = () => {

    const { showWelcomeText } = useMasterContext();
    
    return (
        <div 
            class="w-full flex flex-col flex-1 max-w-7xl mx-auto p-4 items-center justify-center"
        >
          <div class="flex text-black w-full text-left sm:text-center items-center justify-center">
            {showWelcomeText && (
                  <WelcomeText />
            )}
          </div>
            
        </div>
    );
};

export default Home;