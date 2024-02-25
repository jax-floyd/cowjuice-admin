import { createContext, useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";

import ideas from '../components/Home/IdeasGrid/Ideas';
import works from '../components/Home/WorkGrid/Work';

export const MasterContext = createContext();

export const useMasterContext  = () => useContext(MasterContext);


export const MasterContextProvider = ({ children }) => {

    const navigate = useNavigate();

    const [isWelcomeTextTyping, setIsWelcomeTextTyping] = useState(false);

    const [showWelcomeText, setShowWelcomeText] = useState(true);
    const [showWorkGrid, setShowWorkGrid] = useState(true);
    const [showIdeasGrid, setShowIdeasGrid] = useState(true)
    
    const entryPage = Math.random() > 0.5 ? '/ideas' : '/projects';

    const [selectedIdea, setSelectedIdea] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);

    const handleTypingAnimationComplete = () => {
        setIsWelcomeTextTyping(false);
        setShowWorkGrid(true);
        setShowIdeasGrid(true);

        setTimeout(() => {
            setShowWelcomeText(false);
            navigate(entryPage);
        }, 1000);
    };

    const handleHomeSwipeUp = () => {
        setIsWelcomeTextTyping(false);
        setShowWorkGrid(true);
        setShowIdeasGrid(true);
        setShowWelcomeText(false);
        navigate(entryPage);
    };

    const handleIdeaClick = (idea) => {
        setShowIdeasGrid(false);
        setSelectedIdea(idea);
        navigate(`/ideas/${idea.tag}`);
    };

    const fetchIdea = (tag) => {
        setShowIdeasGrid(false);
        const idea = ideas.find(idea => idea.tag === tag);
        setSelectedIdea(idea);
    };

    const handleWorkClick = (work) => {
        setShowWorkGrid(false);
        setSelectedProject(work);
        navigate(`/projects/${work.tag}`);
    };

    const fetchWork = (tag) => {
        setShowWorkGrid(false);
        const work = works.find(work => work.tag === tag);
        setSelectedProject(work);
    };

    const value = {
        isWelcomeTextTyping,
        setIsWelcomeTextTyping,

        showWelcomeText,
        setShowWelcomeText,

        showWorkGrid,
        setShowWorkGrid,

        showIdeasGrid,
        setShowIdeasGrid,

        selectedIdea,
        setSelectedIdea,

        fetchIdea,

        selectedProject,
        setSelectedProject,

        fetchWork,
        
        handleTypingAnimationComplete,
        handleHomeSwipeUp,
        handleIdeaClick,
        handleWorkClick,
    }

    return (
        <MasterContext.Provider value={value}>
            {children}
        </MasterContext.Provider>
    );
};