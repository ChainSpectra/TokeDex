import React from 'react';

export interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'alt' | 'custom';
  gradient?: string;
}

const GradientText: React.FC<GradientTextProps> = ({
  children,
  className = '',
  variant = 'primary',
  gradient,
}) => {
  const variants = {
    primary: 'gradient-text',
    alt: 'gradient-text-alt',
    custom: '',
  };

  const style = gradient ? { backgroundImage: gradient } : {};

  return (
    <span
      className={`${variants[variant]} ${variant === 'custom' ? 'bg-clip-text text-transparent' : ''} ${className}`}
      style={style}
    >
      {children}
    </span>
  );
};

export default GradientText;
