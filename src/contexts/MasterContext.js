import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
  

    const value = {
        user,
        setUser,
        
    }

    return (
        <MasterContext.Provider value={value}>
            {children}
        </MasterContext.Provider>
    );
};