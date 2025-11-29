import { useState, useEffect } from 'react';
import App from '../App';

// CosmicExplosionSplash component - supernova energy burst with cosmic particles
export const CosmicExplosionSplash = () => {
  return (
    <>
      <style>{`
        @keyframes supernovaExplosion {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
          }
          30% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
        }

        @keyframes shockwave {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
          }
        }

        @keyframes particleBurst1 {
          0% {
            transform: translate(-50%, -50%) translate(0, 0) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) translate(250px, -200px) scale(0.5);
            opacity: 0;
          }
        }

        @keyframes particleBurst2 {
          0% {
            transform: translate(-50%, -50%) translate(0, 0) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) translate(-230px, -180px) scale(0.5);
            opacity: 0;
          }
        }

        @keyframes particleBurst3 {
          0% {
            transform: translate(-50%, -50%) translate(0, 0) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) translate(280px, 150px) scale(0.5);
            opacity: 0;
          }
        }

        @keyframes particleBurst4 {
          0% {
            transform: translate(-50%, -50%) translate(0, 0) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) translate(-260px, 170px) scale(0.5);
            opacity: 0;
          }
        }

        @keyframes particleBurst5 {
          0% {
            transform: translate(-50%, -50%) translate(0, 0) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) translate(0px, -280px) scale(0.5);
            opacity: 0;
          }
        }

        @keyframes particleBurst6 {
          0% {
            transform: translate(-50%, -50%) translate(0, 0) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) translate(0px, 270px) scale(0.5);
            opacity: 0;
          }
        }

        @keyframes particleBurst7 {
          0% {
            transform: translate(-50%, -50%) translate(0, 0) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) translate(300px, 0px) scale(0.5);
            opacity: 0;
          }
        }

        @keyframes particleBurst8 {
          0% {
            transform: translate(-50%, -50%) translate(0, 0) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) translate(-290px, 0px) scale(0.5);
            opacity: 0;
          }
        }

        @keyframes energyRotate {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        @keyframes coreIntensify {
          0%, 100% {
            box-shadow: 
              0 0 60px rgba(255, 255, 255, 1),
              0 0 120px rgba(0, 212, 255, 0.8),
              0 0 180px rgba(123, 97, 255, 0.6),
              inset 0 0 60px rgba(255, 255, 255, 0.8);
          }
          50% {
            box-shadow: 
              0 0 100px rgba(255, 255, 255, 1),
              0 0 200px rgba(0, 212, 255, 1),
              0 0 300px rgba(123, 97, 255, 0.8),
              inset 0 0 100px rgba(255, 255, 255, 1);
          }
        }

        @keyframes spiralOut {
          0% {
            transform: translate(-50%, -50%) rotate(0deg) scale(0);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) rotate(720deg) scale(2);
            opacity: 0;
          }
        }

        @keyframes textExplosion {
          0% {
            opacity: 0;
            transform: scale(0.5) translateY(50px);
            filter: blur(20px);
          }
          50% {
            opacity: 1;
            filter: blur(0);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
            filter: blur(0);
          }
        }

        @keyframes lightBeamSweep {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg);
            opacity: 0;
          }
        }

        .cosmic-splash-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: radial-gradient(ellipse at center, #0d0d1a 0%, #000000 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          z-index: 9999;
        }

        .star-field {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .distant-star {
          position: absolute;
          width: 1px;
          height: 1px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 0 2px rgba(255, 255, 255, 0.8);
        }

        .explosion-container {
          position: relative;
          width: 600px;
          height: 600px;
          animation: supernovaExplosion 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .supernova-core {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 200px;
          height: 200px;
          background: radial-gradient(circle,
            rgba(255, 255, 255, 1) 0%,
            rgba(255, 200, 100, 1) 20%,
            rgba(0, 212, 255, 0.9) 50%,
            rgba(123, 97, 255, 0.7) 80%,
            transparent 100%
          );
          border-radius: 50%;
          animation: coreIntensify 2s ease-in-out infinite;
        }

        .shockwave {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 200px;
          height: 200px;
          border: 3px solid rgba(0, 212, 255, 0.8);
          border-radius: 50%;
          animation: shockwave 2s ease-out infinite;
        }

        .shockwave:nth-child(2) {
          animation-delay: 0.4s;
        }

        .shockwave:nth-child(3) {
          animation-delay: 0.8s;
        }

        .shockwave:nth-child(4) {
          animation-delay: 1.2s;
        }

        .energy-spiral {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 400px;
          height: 400px;
        }

        .spiral-arm {
          position: absolute;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(0, 212, 255, 0.8) 50%, 
            transparent
          );
          transform-origin: center;
          animation: energyRotate 4s linear infinite;
        }

        .spiral-arm:nth-child(1) {
          transform: translate(-50%, -50%) rotate(0deg);
        }

        .spiral-arm:nth-child(2) {
          transform: translate(-50%, -50%) rotate(60deg);
          animation-delay: 0.2s;
        }

        .spiral-arm:nth-child(3) {
          transform: translate(-50%, -50%) rotate(120deg);
          animation-delay: 0.4s;
        }

        .explosion-particles {
          position: absolute;
          top: 50%;
          left: 50%;
        }

        .cosmic-particle {
          position: absolute;
          width: 20px;
          height: 20px;
          background: radial-gradient(circle, 
            rgba(255, 255, 255, 1), 
            rgba(0, 212, 255, 0.8)
          );
          border-radius: 50%;
          box-shadow: 0 0 20px rgba(0, 212, 255, 1);
        }

        .cosmic-particle:nth-child(1) { animation: particleBurst1 2s ease-out infinite; }
        .cosmic-particle:nth-child(2) { animation: particleBurst2 2s ease-out infinite; }
        .cosmic-particle:nth-child(3) { animation: particleBurst3 2s ease-out infinite; }
        .cosmic-particle:nth-child(4) { animation: particleBurst4 2s ease-out infinite; }
        .cosmic-particle:nth-child(5) { animation: particleBurst5 2s ease-out infinite; }
        .cosmic-particle:nth-child(6) { animation: particleBurst6 2s ease-out infinite; }
        .cosmic-particle:nth-child(7) { animation: particleBurst7 2s ease-out infinite; }
        .cosmic-particle:nth-child(8) { animation: particleBurst8 2s ease-out infinite; }

        .light-beam {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 600px;
          height: 3px;
          background: linear-gradient(90deg,
            transparent,
            rgba(255, 255, 255, 0.8) 50%,
            transparent
          );
          transform-origin: center;
          animation: lightBeamSweep 3s linear infinite;
          filter: blur(2px);
        }

        .cosmic-text {
          position: absolute;
          bottom: 80px;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          animation: textExplosion 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s backwards;
        }

        .cosmic-title {
          font-size: 5rem;
          font-weight: 900;
          background: linear-gradient(135deg, #ffffff, #00D4FF, #7B61FF, #FF3366);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: 15px;
          margin-bottom: 16px;
          filter: drop-shadow(0 0 40px rgba(0, 212, 255, 1))
                  drop-shadow(0 0 80px rgba(123, 97, 255, 0.8));
        }

        .cosmic-subtitle {
          font-size: 1.3rem;
          color: rgba(255, 255, 255, 0.9);
          letter-spacing: 10px;
          text-transform: uppercase;
          text-shadow: 
            0 0 20px rgba(0, 212, 255, 1),
            0 0 40px rgba(123, 97, 255, 0.8);
        }

        @media (max-width: 768px) {
          .explosion-container {
            width: 400px;
            height: 400px;
          }

          .supernova-core {
            width: 150px;
            height: 150px;
          }

          .energy-spiral {
            width: 300px;
            height: 300px;
          }

          .cosmic-title {
            font-size: 3rem;
            letter-spacing: 8px;
          }

          .cosmic-subtitle {
            font-size: 1rem;
            letter-spacing: 6px;
          }
        }
      `}</style>

      <div className="cosmic-splash-container">
        {/* Star field background */}
        <div className="star-field">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="distant-star"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        {/* Main explosion */}
        <div className="explosion-container">
          {/* Shockwaves */}
          <div className="shockwave"></div>
          <div className="shockwave"></div>
          <div className="shockwave"></div>
          <div className="shockwave"></div>

          {/* Light beam sweep */}
          <div className="light-beam"></div>

          {/* Energy spirals */}
          <div className="energy-spiral">
            <div className="spiral-arm"></div>
            <div className="spiral-arm"></div>
            <div className="spiral-arm"></div>
          </div>

          {/* Exploding particles */}
          <div className="explosion-particles">
            <div className="cosmic-particle"></div>
            <div className="cosmic-particle"></div>
            <div className="cosmic-particle"></div>
            <div className="cosmic-particle"></div>
            <div className="cosmic-particle"></div>
            <div className="cosmic-particle"></div>
            <div className="cosmic-particle"></div>
            <div className="cosmic-particle"></div>
          </div>

          {/* Supernova core */}
          <div className="supernova-core"></div>

          {/* Text */}
          <div className="cosmic-text">
            <div className="cosmic-title">TOKEDEX</div>
            <div className="cosmic-subtitle">Explosive Growth</div>
          </div>
        </div>
      </div>
    </>
  );
};

// AppWithSplash wrapper
export const AppWithSplash = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2800);

    const removeTimer = setTimeout(() => {
      setShowSplash(false);
    }, 3300);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes splashFadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }

        @keyframes appFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .splash-wrapper {
          animation: splashFadeOut 0.5s ease-out forwards;
        }

        .app-wrapper {
          animation: appFadeIn 0.6s ease-out;
        }
      `}</style>

      {showSplash ? (
        <div className={fadeOut ? 'splash-wrapper' : ''}>
          <CosmicExplosionSplash />
        </div>
      ) : (
        <div className="app-wrapper">
          <App />
        </div>
      )}
    </>
  );
};

export default AppWithSplash;
