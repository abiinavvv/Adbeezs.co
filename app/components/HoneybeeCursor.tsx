'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

export default function HoneybeeCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [animationData, setAnimationData] = useState<any>(null);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Load Lottie animation
    fetch('/Honey Bee.json')
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => {
        console.error('Error loading honeybee animation:', err);
      });
  }, []);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    // Only show hover effects when actually hovering over interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over interactive elements (links, buttons, cards with group class, etc.)
      const isInteractive = 
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.group') ||
        target.closest('[role="button"]') ||
        target.closest('[class*="hover"]');
      
      setIsHovering(!!isInteractive);
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [cursorX, cursorY]);

  // Transform values for rotation based on movement
  const rotateX = useTransform(
    cursorYSpring,
    typeof window !== 'undefined' ? [0, window.innerHeight] : [0, 1000],
    [15, -15]
  );
  const rotateY = useTransform(
    cursorXSpring,
    typeof window !== 'undefined' ? [0, window.innerWidth] : [0, 1000],
    [-15, 15]
  );

  return (
    <>
      {/* Honeybee cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          rotateX,
          rotateY,
        }}
        animate={{
          scale: isHovering ? 1.2 : 1,
        }}
        transition={{
          scale: { duration: 0.2 },
        }}
      >
        {animationData ? (
          <div className="w-16 h-16 -translate-x-1/2 -translate-y-1/2">
            <Lottie
              animationData={animationData}
              loop={true}
              autoplay={true}
              style={{ width: '100%', height: '100%' }}
              speed={isHovering ? 1.5 : 1}
            />
          </div>
        ) : (
          // Fallback SVG while loading
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="-translate-x-1/2 -translate-y-1/2"
          >
            <circle cx="20" cy="20" r="12" fill="#FFD700" stroke="#000" strokeWidth="1.5" />
            <line x1="16" y1="20" x2="24" y2="20" stroke="#000" strokeWidth="2" />
            <circle cx="17" cy="18" r="2" fill="#000" />
            <circle cx="23" cy="18" r="2" fill="#000" />
          </svg>
        )}
      </motion.div>

      {/* Honeycomb particles on hover */}
      {isHovering && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-40"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
          }}
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: Math.cos((i * Math.PI * 2) / 6) * 50,
                y: Math.sin((i * Math.PI * 2) / 6) * 50,
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20">
                <polygon
                  points="10,2 16,6 16,14 10,18 4,14 4,6"
                  fill="#FFD700"
                  fillOpacity="0.6"
                  stroke="#000"
                  strokeWidth="0.5"
                />
              </svg>
            </motion.div>
          ))}
        </motion.div>
      )}
    </>
  );
}

