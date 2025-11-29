import React from 'react';
import { motion } from 'framer-motion';

export interface BadgeProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'gradient';
}

const Badge: React.FC<BadgeProps> = ({
  children,
  icon,
  className = '',
  variant = 'default',
}) => {
  const variants = {
    default: 'glass-card border-2 border-white/20',
    gradient: 'bg-gradient-to-r from-primary-cyan/20 via-primary-purple/20 to-primary-pink/20 border-2 border-primary-purple/30',
  };

  return (
    <motion.div
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${variants[variant]} ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      {icon && <span className="text-lg">{icon}</span>}
      {children}
    </motion.div>
  );
};

export default Badge;
