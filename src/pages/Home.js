import React, { useState } from 'react';

import { useMasterContext } from '../contexts/MasterContext';

import WelcomeText from '../components/WelcomeText';
import MooSplash from '../components/MooSplash';

const Home = () => {

    const { showWelcomeText, readyForSplash } = useMasterContext();
    
    return (
        <div class="w-full flex flex-col flex-1 max-w-7xl mx-auto p-4 items-center justify-center">
          {/* {readyForSplash && (
            <MooSplash />
          )} */}
          <div class="flex text-black w-full text-left sm:text-center items-center justify-center">
            {showWelcomeText && (
                  <WelcomeText />
            )}
          </div>
        </div>
    );
};

export default Home;