import React from 'react';
import { motion } from 'framer-motion';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  variant?: 'glass' | 'solid' | 'gradient-border';
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = true,
  variant = 'glass',
}) => {
  const variants = {
    glass: 'glass-card',
    solid: 'bg-dark-800 border border-white/10 rounded-3xl',
    'gradient-border': 'gradient-border',
  };

  const hoverClasses = hover ? 'hover-lift hover:border-white/20 hover:glow-gradient cursor-pointer' : '';

  return (
    <motion.div
      className={`${variants[variant]} p-8 ${hoverClasses} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={hover ? { scale: 1.02 } : {}}
    >
      {children}
    </motion.div>
  );
};

export default Card;
