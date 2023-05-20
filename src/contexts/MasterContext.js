import { createContext, useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";

export const MasterContext = createContext();

export const useMasterContext  = () => useContext(MasterContext);

export const MasterContextProvider = ({ children }) => {

    const navigate = useNavigate();

    const [isWelcomeTextTyping, setIsWelcomeTextTyping] = useState(false);

    const [showWelcomeText, setShowWelcomeText] = useState(true);
    const [showWorkGrid, setShowWorkGrid] = useState(true);

    const handleTypingAnimationComplete = () => {
        setIsWelcomeTextTyping(false);
        setShowWorkGrid(true);

        setTimeout(() => {
            setShowWelcomeText(false);
            navigate('/projects');

        }, 1000);
    };

    const value = {
        isWelcomeTextTyping,
        setIsWelcomeTextTyping,

        showWelcomeText,
        setShowWelcomeText,

        showWorkGrid,
        setShowWorkGrid,
        
        handleTypingAnimationComplete,
    }

    return (
        <MasterContext.Provider value={value}>
            {children}
        </MasterContext.Provider>
    );
};