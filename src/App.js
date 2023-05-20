import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { MasterContextProvider } from './contexts/MasterContext';

import './App.css';

import Home from './pages/Home';
import Projects from './pages/Projects';

import Header from './components/Header';

const App = () => {

  return (
    <Router> 
      <MasterContextProvider>
        <div class="bg-white text-black dark:bg-black dark:text-white">
          <Routes>
            <Route exact path="/" element={
                <div class="flex flex-col min-h-screen p-4 space-y-4">
                  <Home />
                </div>
              }
            />
            <Route exact path="/ideas" element={
                <div class="flex flex-col min-h-screen p-4 space-y-4">
                  <Header />
                </div>
              }
            />
            <Route exact path="/projects" element={
                <div class="flex flex-col min-h-screen p-4 space-y-4">
                  <Header />
                  <Projects />
                </div>
              }
            />
            <Route exact path="/more" element={
                <div class="flex flex-col min-h-screen p-4 space-y-4">
                  <Header />
                </div>
              }
            />
          </Routes>

        </div>
        
      </MasterContextProvider>
    </Router>
  );
};

export default App;
