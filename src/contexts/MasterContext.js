import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import getCaseCount from '../functions/cases/getCaseCount.js';


export const MasterContext = createContext();

export const useMasterContext  = () => useContext(MasterContext);

export const MasterContextProvider = ({ children }) => {

  const navigate = useNavigate();

    const [user, setUser] = useState(() => { // <-- Handles React State update
      try {
        const stored = localStorage.getItem('user');
        if (stored) return JSON.parse(stored);
    
        // Create a new temporary user if none exists
        const newUser = {
          id: 'cj_' + Math.random().toString(36).substring(2, 15), // simple unique per-user Cow Juice id
          createdAt: new Date().toISOString(),
        };
        localStorage.setItem('user', JSON.stringify(newUser));
        return newUser;
      } catch {
        return null;
      }
    });

    const updateUser = (updaterFn) => { // <-- Handles local storage update
      setUser(prev => {
        const updated = updaterFn(prev);
        try {
          localStorage.setItem('user', JSON.stringify(updated));
        } catch (err) {
          console.error('Failed to save user to localStorage:', err);
        }
        return updated;
      });
    };
  
    const [caseNumber, setCaseNumber] = useState(null);
    useEffect(() => { // <-- On page load, we get the case number; we need to redirect to the error page if no number is returned.
        const fetchCaseCount = async () => {
          const count = await getCaseCount();
          if (count !== null) {
            console.log("not null")
            setCaseNumber(count); // Update state if the count was successfully fetched
          } else {
            setCaseNumber(657);
          }
        };
    
        fetchCaseCount();
    }, []);

    const [bag, setBag] = useState(() => {
      try {
        const stored = localStorage.getItem('bag');
        return stored ? JSON.parse(stored) : [];
      } catch {
        return [];
      }
    });
  
    useEffect(() => {
      try {
        localStorage.setItem('bag', JSON.stringify(bag));
      } catch (e) {
        console.error('Failed to save bag to localStorage:', e);
      }
    }, [bag]);

    const [isWelcomeTextTyping, setIsWelcomeTextTyping] = useState(false);
    const [showWelcomeText, setShowWelcomeText] = useState(true);
    const [readyForSplash, setReadyForSplash] = useState(false);
    const handleTypingAnimationComplete = () => {
      setIsWelcomeTextTyping(false);

      setTimeout(() => {
          setShowWelcomeText(false);
          setReadyForSplash(true)
          navigate('/order');
      }, 1000);
    };

    const value = {
        user,
        setUser,
        updateUser, // <-- Distinct from setUser (which handles React update)
        caseNumber,
        bag,
        setBag,

        showWelcomeText,
        setShowWelcomeText,
        isWelcomeTextTyping,
        setIsWelcomeTextTyping,
        readyForSplash,
        setReadyForSplash,
        handleTypingAnimationComplete,
    }

    return (
        <MasterContext.Provider value={value}>
            {children}
        </MasterContext.Provider>
    );
};