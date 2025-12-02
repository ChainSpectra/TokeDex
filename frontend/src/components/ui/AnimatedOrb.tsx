import React from 'react';
import { motion } from 'framer-motion';

const AnimatedOrb: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Main Orb */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-cyan via-primary-purple to-primary-pink opacity-80 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Secondary Glow */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent-cyan via-accent-purple to-accent-pink opacity-60 blur-2xl"
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Solid Core */}
      <motion.div
        className="relative w-full h-full rounded-full bg-gradient-to-br from-primary-cyan via-primary-purple to-primary-pink glow-gradient"
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Inner Rings */}
        <motion.div
          className="absolute inset-4 rounded-full border-2 border-white/20"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute inset-8 rounded-full border-2 border-white/10"
          animate={{
            rotate: [360, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>

      {/* Orbiting Elements */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 bg-white rounded-full"
          style={{
            top: '50%',
            left: '50%',
          }}
          animate={{
            x: [
              Math.cos((i * Math.PI * 2) / 6) * 150,
              Math.cos(((i * Math.PI * 2) / 6) + (Math.PI * 2)) * 150,
            ],
            y: [
              Math.sin((i * Math.PI * 2) / 6) * 150,
              Math.sin(((i * Math.PI * 2) / 6) + (Math.PI * 2)) * 150,
            ],
          }}
          transition={{
            duration: 20 + i * 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedOrb;
