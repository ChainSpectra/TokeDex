import { useState, useEffect } from 'react';
import App from '../App';

// VelocitySplash component - animated swap arrows with liquid flow
export const VelocitySplash = () => {
  return (
    <>
      <style>{`
        @keyframes liquidFlow {
          0% {
            stroke-dashoffset: 1000;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        @keyframes arrowGlow {
          0%, 100% {
            filter: drop-shadow(0 0 15px rgba(0, 212, 255, 0.6))
                    drop-shadow(0 0 30px rgba(0, 212, 255, 0.4));
          }
          50% {
            filter: drop-shadow(0 0 25px rgba(123, 97, 255, 0.8))
                    drop-shadow(0 0 50px rgba(123, 97, 255, 0.5));
          }
        }

        @keyframes speedLine1 {
          0% {
            transform: translateX(-100px);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(100px);
            opacity: 0;
          }
        }

        @keyframes speedLine2 {
          0% {
            transform: translateX(-100px);
            opacity: 0;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: translateX(100px);
            opacity: 0;
          }
        }

        @keyframes speedLine3 {
          0% {
            transform: translateX(-100px);
            opacity: 0;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            transform: translateX(100px);
            opacity: 0;
          }
        }

        @keyframes lightningBolt {
          0%, 100% {
            opacity: 0;
            transform: scale(0.8);
          }
          10%, 20% {
            opacity: 1;
            transform: scale(1);
          }
          15%, 25% {
            opacity: 0;
            transform: scale(0.8);
          }
        }

        @keyframes pulseRing {
          0% {
            transform: scale(0.95);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.9;
          }
          100% {
            transform: scale(0.95);
            opacity: 0.7;
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes textGradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .velocity-splash-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: linear-gradient(135deg, #050510 0%, #0a1428 50%, #0d0a1f 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          z-index: 9999;
        }

        .grid-overlay {
          position: absolute;
          inset: 0;
          opacity: 0.1;
          background-image: 
            linear-gradient(rgba(0, 212, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.3) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        .velocity-logo-container {
          position: relative;
          width: 350px;
          height: 350px;
          animation: fadeInScale 0.8s ease-out;
        }

        .swap-arrows-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 200px;
          height: 200px;
          animation: arrowGlow 2s ease-in-out infinite;
        }

        .liquid-wave {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: liquidFlow 3s ease-in-out infinite;
        }

        .speed-lines-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 200px;
          height: 200px;
          overflow: hidden;
        }

        .speed-line {
          position: absolute;
          height: 2px;
          width: 80px;
          background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.8), transparent);
          border-radius: 2px;
        }

        .speed-line:nth-child(1) {
          top: 35%;
          animation: speedLine1 1.5s ease-in-out infinite;
        }

        .speed-line:nth-child(2) {
          top: 50%;
          animation: speedLine2 1.5s ease-in-out 0.2s infinite;
        }

        .speed-line:nth-child(3) {
          top: 65%;
          animation: speedLine3 1.5s ease-in-out 0.4s infinite;
        }

        .lightning-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 250px;
          height: 250px;
        }

        .lightning {
          position: absolute;
          animation: lightningBolt 3s ease-in-out infinite;
        }

        .lightning:nth-child(1) {
          top: 10%;
          right: 15%;
          animation-delay: 0.5s;
        }

        .lightning:nth-child(2) {
          bottom: 10%;
          left: 15%;
          animation-delay: 1.5s;
        }

        .pulse-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 220px;
          height: 220px;
          border: 2px solid rgba(0, 212, 255, 0.3);
          border-radius: 50%;
          animation: pulseRing 2s ease-in-out infinite;
        }

        .velocity-text {
          position: absolute;
          bottom: -100px;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          white-space: nowrap;
        }

        .velocity-title {
          font-size: 2.5rem;
          font-weight: 900;
          background: linear-gradient(90deg, #00D4FF, #7B61FF, #00D4FF, #7B61FF);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 8px;
          letter-spacing: 3px;
          animation: textGradient 3s linear infinite;
        }

        .velocity-subtitle {
          font-size: 0.95rem;
          color: rgba(0, 212, 255, 0.7);
          font-weight: 300;
          letter-spacing: 6px;
          text-transform: uppercase;
        }

        @media (max-width: 768px) {
          .velocity-logo-container {
            width: 280px;
            height: 280px;
          }

          .swap-arrows-container {
            width: 160px;
            height: 160px;
          }

          .velocity-title {
            font-size: 2rem;
          }

          .velocity-subtitle {
            font-size: 0.8rem;
            letter-spacing: 3px;
          }
        }
      `}</style>

      <div className="velocity-splash-container">
        {/* Grid overlay */}
        <div className="grid-overlay"></div>

        {/* Main logo container */}
        <div className="velocity-logo-container">
          {/* Pulsing ring */}
          <div className="pulse-ring"></div>

          {/* Lightning bolts */}
          <div className="lightning-container">
            <svg className="lightning" width="30" height="40" viewBox="0 0 30 40">
              <path
                d="M15 0 L10 20 L20 20 L15 40 L25 15 L15 15 Z"
                fill="url(#lightningGradient)"
                opacity="0.9"
              />
              <defs>
                <linearGradient id="lightningGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00D4FF" />
                  <stop offset="100%" stopColor="#7B61FF" />
                </linearGradient>
              </defs>
            </svg>
            <svg className="lightning" width="30" height="40" viewBox="0 0 30 40">
              <path
                d="M15 0 L10 20 L20 20 L15 40 L25 15 L15 15 Z"
                fill="url(#lightningGradient2)"
                opacity="0.9"
              />
              <defs>
                <linearGradient id="lightningGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7B61FF" />
                  <stop offset="100%" stopColor="#00D4FF" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Speed lines */}
          <div className="speed-lines-container">
            <div className="speed-line"></div>
            <div className="speed-line"></div>
            <div className="speed-line"></div>
          </div>

          {/* Swap arrows with liquid flow */}
          <div className="swap-arrows-container">
            <svg width="200" height="200" viewBox="0 0 200 200">
              <defs>
                <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00D4FF" />
                  <stop offset="50%" stopColor="#7B61FF" />
                  <stop offset="100%" stopColor="#00D4FF" />
                </linearGradient>
                <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(0, 212, 255, 0.6)" />
                  <stop offset="50%" stopColor="rgba(123, 97, 255, 0.8)" />
                  <stop offset="100%" stopColor="rgba(0, 212, 255, 0.6)" />
                </linearGradient>
              </defs>

              {/* Top curved arrow (going right) */}
              <path
                d="M 40 60 Q 100 20, 160 60"
                fill="none"
                stroke="url(#arrowGradient)"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <path
                d="M 160 60 L 145 50 M 160 60 L 145 70"
                fill="none"
                stroke="url(#arrowGradient)"
                strokeWidth="6"
                strokeLinecap="round"
              />

              {/* Bottom curved arrow (going left) */}
              <path
                d="M 160 140 Q 100 180, 40 140"
                fill="none"
                stroke="url(#arrowGradient)"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <path
                d="M 40 140 L 55 130 M 40 140 L 55 150"
                fill="none"
                stroke="url(#arrowGradient)"
                strokeWidth="6"
                strokeLinecap="round"
              />

              {/* Liquid wave flow */}
              <path
                className="liquid-wave"
                d="M 50 70 Q 70 65, 90 70 T 130 70 Q 150 75, 160 80 L 160 130 Q 140 125, 120 130 T 80 130 Q 60 135, 50 130 Z"
                fill="url(#liquidGradient)"
                opacity="0.4"
              />

              {/* Center flow indicator */}
              <circle cx="100" cy="100" r="15" fill="url(#arrowGradient)" opacity="0.8" />
              <circle cx="100" cy="100" r="10" fill="#0a1428" opacity="0.9" />
              <circle cx="100" cy="100" r="5" fill="url(#arrowGradient)" />
            </svg>
          </div>

          {/* Text */}
          <div className="velocity-text">
            <div className="velocity-title">TokeDEx</div>
            <div className="velocity-subtitle">Liquid Velocity</div>
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
          <VelocitySplash />
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
