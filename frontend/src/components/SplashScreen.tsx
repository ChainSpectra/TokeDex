import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import App from '../App';

// TokedexLogo component - animated gradient logo
const TokedexLogo = () => {
  return (
    <motion.div
      className="relative"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        duration: 0.8,
        ease: [0.34, 1.56, 0.64, 1]
      }}
    >
      {/* Animated orb behind logo */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary-cyan via-primary-purple to-primary-pink rounded-full blur-3xl opacity-50"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Logo text */}
      <div className="relative z-10 text-center">
        <motion.h1
          className="text-7xl md:text-8xl font-bold mb-4"
          style={{
            background: 'linear-gradient(135deg, #00D4FF 0%, #7B61FF 50%, #FF3366 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          TokeDEx
        </motion.h1>
        
        {/* Subtitle with typing effect */}
        <motion.p
          className="text-xl text-gray-400 font-light tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Next-Gen Token Creation
        </motion.p>
      </div>
      
      {/* Loading dots */}
      <motion.div
        className="flex justify-center gap-2 mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-gradient-to-r from-primary-cyan to-primary-purple rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

// SplashScreen component
export const SplashScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }} />
      </div>
      
      {/* Floating gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-cyan/20 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-purple/20 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Logo */}
      <TokedexLogo />
    </div>
  );
};

// AppWithSplash component - handles splash → app transition
export const AppWithSplash = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Hide splash after 1.8 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {showSplash ? (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.05
          }}
          transition={{ 
            duration: 0.6,
            ease: "easeInOut"
          }}
        >
          <SplashScreen />
        </motion.div>
      ) : (
        <motion.div
          key="app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            duration: 0.6,
            ease: "easeInOut"
          }}
        >
          <App />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AppWithSplash;
