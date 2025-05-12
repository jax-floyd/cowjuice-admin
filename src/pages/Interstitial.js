import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

import MooSplash from '../components/MooSplash';

const Interstitial = () => {
  const navigate = useNavigate();

  /* flip to “exit” after the splash’s 2-second runtime */
  const [exit, setExit] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setExit(true), 2000);
    return () => clearTimeout(id);
  }, []);

  /* hop to /order 600 ms after the exit animation starts */
  useEffect(() => {
    if (!exit) return;
    const navId = setTimeout(() => navigate('/temporal-existentialism'), 600);
    return () => clearTimeout(navId);
  }, [exit, navigate]);

  /* -------------  options for <motion.div> ------------- */
  const animate = exit
    ? { opacity: [1, 0] }  // slide-up & fade
    : { opacity: 1 };          // stay put until exit

  const transition = {
    duration: 0.3,
    easing: 'ease-in-out',
    fill: 'backwards',      // keep the final y/opacity until we navigate
  };

  /* ----------------------------------------------------- */
  return (
    <div className="relative inset-0 flex w-full h-full overflow-hidden">
      <motion.div initial={false} animate={animate} transition={transition}>
        <MooSplash duration={2000} />
      </motion.div>
    </div>
  );
};

export default Interstitial;
