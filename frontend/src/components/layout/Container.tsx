import React from 'react';

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={`container-custom ${className}`}>
      {children}
    </div>
  );
};

export default Container;
