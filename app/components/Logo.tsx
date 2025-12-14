'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface LogoProps {
  size?: 'small' | 'large';
  className?: string;
}

export default function Logo({ size = 'small', className = '' }: LogoProps) {
  // Base sizes for different contexts
  const baseSize = size === 'large' ? 320 : 180;
  
  return (
    <motion.div
      className={`flex flex-col items-center ${className}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className={`relative flex items-center justify-center
          ${size === 'small' 
            ? 'w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 xl:w-44 xl:h-44' 
            : 'w-80 h-80'
          }`}
        whileHover={{ 
          scale: 1.08,
          rotate: [0, -5, 5, -5, 0],
        }}
        transition={{ 
          duration: 0.3,
          rotate: { duration: 0.5 }
        }}
      >
        <Image
          src="/images/adbeesz.png"
          alt="Adbeezs Logo"
          width={baseSize}
          height={baseSize}
          className="object-contain w-full h-full"
          priority
        />
      </motion.div>
    </motion.div>
  );
}

