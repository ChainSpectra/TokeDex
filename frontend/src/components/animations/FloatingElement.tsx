import React from 'react';
import { motion } from 'framer-motion';

export interface FloatingElementProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
}

const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  delay = 0,
  duration = 6,
  yOffset = 20,
  className = '',
}) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -yOffset, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
};

export default FloatingElement;
