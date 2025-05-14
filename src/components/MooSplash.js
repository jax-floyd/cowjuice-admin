import React, { useEffect, useState } from 'react';

/**
 * MooSplash — sprays **lots** of “Moo.” captions before automatically
 * redirecting to `/order`.
 *
 * Props (all optional):
 *   • `duration` — total splash lifetime in ms (default 2000)
 *   • `interval` — milliseconds between spawn cycles (default 40)
 *   • `burst`    — how many moos spawn each cycle (default 3)
 *
 * Tuned defaults result in ~150 moos over 2 s. Crank `burst` or shrink
 * `interval` for still denser chaos.
 */
const MooSplash = ({ duration = 2000, interval = 30, burst = 18, direct = '/order' }) => {
  const [moos, setMoos] = useState([]);
  
  // 'merican color palette — whites (#ffffff, #f1f1f1) intentionally omitted.
  const palette = ['#002868', '#bf0a30'];

  useEffect(() => {
    let id = 0;
    const spawner = setInterval(() => {
      // Spawn `burst`‑count moos at random coords / transforms
      setMoos((prev) => [
        ...prev,
        ...Array.from({ length: burst }).map(() => ({
          id: id++,
          top: Math.random() * 90 + 'vh',
          left: Math.random() * 90 + 'vw',
          rotate: Math.random() * 40 - 20, // ‑20° → 20° tilt
          scale: 1, // 0.75× → 1.5× size
          color: palette[Math.floor(Math.random() * palette.length)],
        })),
      ]);
    }, interval);

    const timer = setTimeout(() => {
      clearInterval(spawner);
      // brief pause for last moos to animate
      setTimeout(() => {
        window.location.href = direct;
        
      }, 100);
    }, duration);

    return () => {
      clearInterval(spawner);
      clearTimeout(timer);
    };
  }, [duration, interval, burst]);

  return (
    <div className="inset-0 flex w-full h-full overflow-hidden bg-white dark:bg-black">
      {moos.map((moo) => (
        <span
          key={moo.id}
          className="absolute font- px-2 border-[0.5px] rounded-full text-lg animate-fade"
          style={{
            top: moo.top,
            left: moo.left,
            transform: `rotate(${moo.rotate}deg) scale(${moo.scale})`,
            color: moo.color,
            borderColor: moo.color
          }}
        >
          moo
        </span>
      ))}
    </div>
  );
};

export default MooSplash;