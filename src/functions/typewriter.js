import React, { useState, useEffect } from 'react';

const useTypewriter = (text, speed = 50) => {
    const [currentText, setCurrentText] = useState('');
  
    useEffect(() => {
      let i = 0;
      setCurrentText('');
      const timer = setInterval(() => {
        setCurrentText((prev) => prev + text.charAt(i));
        i++;
        if (i > text.length) {
          clearInterval(timer);
        }
      }, speed);
  
      return () => clearInterval(timer);
    }, [text, speed]);
  
    return currentText;
};

export default useTypewriter;