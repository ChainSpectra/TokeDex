import { useState, useEffect } from 'react';
import App from '../App';

// LaunchpadSplash component - animated Q launchpad with rising token
export const LaunchpadSplash = () => {
  return (
    <>
      <style>{`
        @keyframes tokenRise {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-15px) scale(1.1);
            opacity: 1;
          }
        }

        @keyframes tokenGlow {
          0%, 100% {
            box-shadow: 
              0 0 20px rgba(123, 97, 255, 0.6),
              0 0 40px rgba(123, 97, 255, 0.4),
              0 0 60px rgba(123, 97, 255, 0.2);
          }
          50% {
            box-shadow: 
              0 0 30px rgba(0, 212, 255, 0.8),
              0 0 60px rgba(0, 212, 255, 0.6),
              0 0 90px rgba(0, 212, 255, 0.4);
          }
        }

        @keyframes orbitRotate {
          from {
            transform: rotate(0deg) translateX(120px) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(120px) rotate(-360deg);
          }
        }

        @keyframes orbit2 {
          from {
            transform: rotate(72deg) translateX(120px) rotate(-72deg);
          }
          to {
            transform: rotate(432deg) translateX(120px) rotate(-432deg);
          }
        }

        @keyframes orbit3 {
          from {
            transform: rotate(144deg) translateX(120px) rotate(-144deg);
          }
          to {
            transform: rotate(504deg) translateX(120px) rotate(-504deg);
          }
        }

        @keyframes orbit4 {
          from {
            transform: rotate(216deg) translateX(120px) rotate(-216deg);
          }
          to {
            transform: rotate(576deg) translateX(120px) rotate(-576deg);
          }
        }

        @keyframes orbit5 {
          from {
            transform: rotate(288deg) translateX(120px) rotate(-288deg);
          }
          to {
            transform: rotate(648deg) translateX(120px) rotate(-648deg);
          }
        }

        @keyframes qGlow {
          0%, 100% {
            filter: drop-shadow(0 0 20px rgba(123, 97, 255, 0.6))
                    drop-shadow(0 0 40px rgba(123, 97, 255, 0.3));
          }
          50% {
            filter: drop-shadow(0 0 30px rgba(0, 212, 255, 0.8))
                    drop-shadow(0 0 60px rgba(0, 212, 255, 0.4));
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pulseRing {
          0%, 100% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }

        .splash-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 50%, #0f0520 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          z-index: 9999;
        }

        .grid-bg {
          position: absolute;
          inset: 0;
          opacity: 0.15;
          background-image: 
            linear-gradient(rgba(123, 97, 255, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(123, 97, 255, 0.2) 1px, transparent 1px);
          background-size: 50px 50px;
        }

        .launchpad-container {
          position: relative;
          width: 300px;
          height: 300px;
          animation: fadeIn 0.8s ease-out;
        }

        .q-launchpad {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 180px;
          height: 180px;
          animation: qGlow 2s ease-in-out infinite;
        }

        .q-circle {
          position: absolute;
          width: 100%;
          height: 100%;
          border: 8px solid transparent;
          border-radius: 50%;
          background: linear-gradient(135deg, #7B61FF, #00D4FF) border-box;
          -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }

        .q-tail {
          position: absolute;
          bottom: -15px;
          right: 15px;
          width: 60px;
          height: 8px;
          background: linear-gradient(90deg, #7B61FF, #00D4FF);
          border-radius: 4px;
          transform: rotate(-45deg);
        }

        .launchpad-platform {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 140px;
          height: 6px;
          background: linear-gradient(90deg, rgba(123, 97, 255, 0.4), rgba(0, 212, 255, 0.4));
          border-radius: 3px;
          animation: pulseRing 2s ease-in-out infinite;
        }

        .rising-token {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #7B61FF, #00D4FF, #FF3366);
          border-radius: 50%;
          animation: 
            tokenRise 2s ease-in-out infinite,
            tokenGlow 2s ease-in-out infinite;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: white;
          font-size: 20px;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
        }

        .orbit-container {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
        }

        .orbit-dot {
          position: absolute;
          width: 12px;
          height: 12px;
          background: linear-gradient(135deg, #00D4FF, #7B61FF);
          border-radius: 50%;
          box-shadow: 
            0 0 15px rgba(0, 212, 255, 0.8),
            0 0 30px rgba(123, 97, 255, 0.6);
        }

        .orbit-dot:nth-child(1) {
          animation: orbitRotate 8s linear infinite;
        }

        .orbit-dot:nth-child(2) {
          animation: orbit2 8s linear infinite;
        }

        .orbit-dot:nth-child(3) {
          animation: orbit3 8s linear infinite;
        }

        .orbit-dot:nth-child(4) {
          animation: orbit4 8s linear infinite;
        }

        .orbit-dot:nth-child(5) {
          animation: orbit5 8s linear infinite;
        }

        .launchpad-text {
          position: absolute;
          bottom: -80px;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          white-space: nowrap;
        }

        .launchpad-title {
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #00D4FF, #7B61FF, #FF3366);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 8px;
          letter-spacing: 2px;
        }

        .launchpad-subtitle {
          font-size: 1rem;
          color: rgba(123, 97, 255, 0.8);
          font-weight: 300;
          letter-spacing: 4px;
          text-transform: uppercase;
        }

        @media (max-width: 768px) {
          .launchpad-container {
            width: 250px;
            height: 250px;
          }

          .q-launchpad {
            width: 150px;
            height: 150px;
          }

          .launchpad-title {
            font-size: 2rem;
          }

          .launchpad-subtitle {
            font-size: 0.875rem;
          }
        }
      `}</style>

      <div className="splash-container">
        {/* Grid background */}
        <div className="grid-bg"></div>

        {/* Main launchpad animation */}
        <div className="launchpad-container">
          {/* Q Shape - Launchpad */}
          <div className="q-launchpad">
            <div className="q-circle"></div>
            <div className="q-tail"></div>
          </div>

          {/* Platform base */}
          <div className="launchpad-platform"></div>

          {/* Rising Token in center */}
          <div className="rising-token">Q</div>

          {/* Orbiting dots - representing decentralized communities */}
          <div className="orbit-container">
            <div className="orbit-dot"></div>
            <div className="orbit-dot"></div>
            <div className="orbit-dot"></div>
            <div className="orbit-dot"></div>
            <div className="orbit-dot"></div>
          </div>

          {/* Text */}
          <div className="launchpad-text">
            <div className="launchpad-title">TokeDEx</div>
            <div className="launchpad-subtitle">Token Launchpad</div>
          </div>
        </div>
      </div>
    </>
  );
};

// AppWithSplash - wrapper component that handles splash → app transition
export const AppWithSplash = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade out after 1.8 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 1800);

    // Remove splash completely after fade animation (2 seconds total)
    const removeTimer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes splashFadeOut {
          from {
            opacity: 1;
            transform: scale(1);
          }
          to {
            opacity: 0;
            transform: scale(1.05);
          }
        }

        @keyframes appFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .splash-wrapper {
          animation: splashFadeOut 0.6s ease-out forwards;
        }

        .app-wrapper {
          animation: appFadeIn 0.6s ease-out;
        }
      `}</style>

      {showSplash ? (
        <div className={fadeOut ? 'splash-wrapper' : ''}>
          <LaunchpadSplash />
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
