import { useState, useEffect } from 'react';
import App from '../App';

// QuantumPortalSplash component - interdimensional portal with quantum effects
export const QuantumPortalSplash = () => {
  return (
    <>
      <style>{`
        @keyframes portalSpin {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        @keyframes portalPulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0.1;
          }
        }

        @keyframes energyBeam {
          0% {
            transform: scaleY(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: scaleY(1);
            opacity: 0;
          }
        }

        @keyframes quantumShift {
          0%, 100% {
            transform: translate(-50%, -50%) translateZ(0);
            filter: hue-rotate(0deg);
          }
          50% {
            transform: translate(-50%, -50%) translateZ(50px);
            filter: hue-rotate(180deg);
          }
        }

        @keyframes particleOrbit {
          0% {
            transform: rotate(0deg) translateX(150px) rotate(0deg);
            opacity: 0;
          }
          10%, 90% {
            opacity: 1;
          }
          100% {
            transform: rotate(360deg) translateX(150px) rotate(-360deg);
            opacity: 0;
          }
        }

        @keyframes portalReveal {
          0% {
            transform: translate(-50%, -50%) scale(0) rotate(180deg);
            opacity: 0;
          }
          70% {
            transform: translate(-50%, -50%) scale(1.2) rotate(-10deg);
          }
          100% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        @keyframes warpEffect {
          0%, 100% {
            transform: perspective(1000px) rotateX(0deg) scale(1);
          }
          50% {
            transform: perspective(1000px) rotateX(20deg) scale(1.1);
          }
        }

        @keyframes lightningStrike {
          0%, 90%, 100% {
            opacity: 0;
          }
          91%, 93%, 95% {
            opacity: 1;
          }
          92%, 94% {
            opacity: 0.3;
          }
        }

        @keyframes cosmicFloat {
          0%, 100% {
            transform: translate(-50%, -50%) translateY(0) scale(1);
          }
          50% {
            transform: translate(-50%, -50%) translateY(-30px) scale(1.1);
          }
        }

        @keyframes textReveal {
          0% {
            opacity: 0;
            transform: translateY(50px);
            filter: blur(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        .quantum-splash-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: radial-gradient(ellipse at center, #1a0033 0%, #000000 70%);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          z-index: 9999;
          perspective: 1000px;
        }

        .cosmic-stars {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 0 3px rgba(255, 255, 255, 0.8);
          animation: cosmicFloat 4s ease-in-out infinite;
        }

        .star:nth-child(1) { top: 10%; left: 15%; animation-delay: 0s; }
        .star:nth-child(2) { top: 20%; left: 80%; animation-delay: 0.5s; }
        .star:nth-child(3) { top: 60%; left: 25%; animation-delay: 1s; }
        .star:nth-child(4) { top: 80%; left: 70%; animation-delay: 1.5s; }
        .star:nth-child(5) { top: 40%; left: 90%; animation-delay: 2s; }
        .star:nth-child(6) { top: 30%; left: 10%; animation-delay: 2.5s; }

        .portal-container {
          position: relative;
          width: 500px;
          height: 500px;
          animation: portalReveal 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }

        .portal-core {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 200px;
          height: 200px;
        }

        .portal-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          border-radius: 50%;
          border: 3px solid transparent;
        }

        .portal-ring-1 {
          width: 200px;
          height: 200px;
          border-color: rgba(0, 212, 255, 0.8);
          animation: portalSpin 8s linear infinite;
          box-shadow: 
            0 0 30px rgba(0, 212, 255, 0.6),
            inset 0 0 30px rgba(0, 212, 255, 0.3);
        }

        .portal-ring-2 {
          width: 280px;
          height: 280px;
          border-color: rgba(123, 97, 255, 0.6);
          animation: portalSpin 6s linear infinite reverse;
          box-shadow: 
            0 0 40px rgba(123, 97, 255, 0.5),
            inset 0 0 40px rgba(123, 97, 255, 0.2);
        }

        .portal-ring-3 {
          width: 360px;
          height: 360px;
          border-color: rgba(255, 51, 102, 0.4);
          animation: portalSpin 10s linear infinite;
          box-shadow: 
            0 0 50px rgba(255, 51, 102, 0.4),
            inset 0 0 50px rgba(255, 51, 102, 0.2);
        }

        .portal-pulse {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0, 212, 255, 0.4), transparent 70%);
          animation: portalPulse 3s ease-in-out infinite;
        }

        .portal-pulse:nth-child(2) {
          animation-delay: 1s;
        }

        .portal-pulse:nth-child(3) {
          animation-delay: 2s;
        }

        .portal-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 150px;
          height: 150px;
          background: radial-gradient(circle, 
            rgba(255, 255, 255, 1) 0%,
            rgba(0, 212, 255, 0.8) 30%,
            rgba(123, 97, 255, 0.6) 60%,
            transparent 100%
          );
          border-radius: 50%;
          animation: quantumShift 4s ease-in-out infinite;
          box-shadow: 
            0 0 60px rgba(0, 212, 255, 1),
            0 0 120px rgba(123, 97, 255, 0.8),
            inset 0 0 50px rgba(255, 255, 255, 0.5);
        }

        .energy-beams {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
        }

        .beam {
          position: absolute;
          width: 3px;
          height: 200px;
          background: linear-gradient(to bottom, transparent, rgba(0, 212, 255, 0.8), transparent);
          transform-origin: top center;
          animation: energyBeam 2s ease-in-out infinite;
        }

        .beam:nth-child(1) { left: 50%; transform: rotate(0deg); animation-delay: 0s; }
        .beam:nth-child(2) { left: 50%; transform: rotate(45deg); animation-delay: 0.25s; }
        .beam:nth-child(3) { left: 50%; transform: rotate(90deg); animation-delay: 0.5s; }
        .beam:nth-child(4) { left: 50%; transform: rotate(135deg); animation-delay: 0.75s; }
        .beam:nth-child(5) { left: 50%; transform: rotate(180deg); animation-delay: 1s; }
        .beam:nth-child(6) { left: 50%; transform: rotate(225deg); animation-delay: 1.25s; }
        .beam:nth-child(7) { left: 50%; transform: rotate(270deg); animation-delay: 1.5s; }
        .beam:nth-child(8) { left: 50%; transform: rotate(315deg); animation-delay: 1.75s; }

        .quantum-particles {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
        }

        .quantum-particle {
          position: absolute;
          width: 8px;
          height: 8px;
          background: radial-gradient(circle, rgba(0, 212, 255, 1), rgba(123, 97, 255, 0.5));
          border-radius: 50%;
          animation: particleOrbit 4s linear infinite;
          box-shadow: 0 0 10px rgba(0, 212, 255, 1);
        }

        .quantum-particle:nth-child(1) { animation-delay: 0s; }
        .quantum-particle:nth-child(2) { animation-delay: 0.4s; }
        .quantum-particle:nth-child(3) { animation-delay: 0.8s; }
        .quantum-particle:nth-child(4) { animation-delay: 1.2s; }
        .quantum-particle:nth-child(5) { animation-delay: 1.6s; }
        .quantum-particle:nth-child(6) { animation-delay: 2s; }
        .quantum-particle:nth-child(7) { animation-delay: 2.4s; }
        .quantum-particle:nth-child(8) { animation-delay: 2.8s; }

        .lightning-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .lightning {
          position: absolute;
          animation: lightningStrike 3s ease-in-out infinite;
        }

        .lightning:nth-child(1) { top: 20%; left: 30%; animation-delay: 1s; }
        .lightning:nth-child(2) { top: 70%; right: 25%; animation-delay: 2s; }

        .quantum-text {
          position: absolute;
          bottom: 80px;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          animation: textReveal 1s ease-out 0.5s backwards;
        }

        .quantum-title {
          font-size: 4.5rem;
          font-weight: 900;
          background: linear-gradient(135deg, #00D4FF, #7B61FF, #FF3366, #00D4FF);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: 12px;
          margin-bottom: 16px;
          filter: drop-shadow(0 0 30px rgba(0, 212, 255, 0.8));
          animation: warpEffect 4s ease-in-out infinite;
        }

        .quantum-subtitle {
          font-size: 1.2rem;
          color: rgba(0, 212, 255, 0.9);
          letter-spacing: 10px;
          text-transform: uppercase;
          text-shadow: 
            0 0 20px rgba(0, 212, 255, 0.8),
            0 0 40px rgba(123, 97, 255, 0.6);
        }

        @media (max-width: 768px) {
          .portal-container {
            width: 350px;
            height: 350px;
          }

          .portal-ring-1 {
            width: 150px;
            height: 150px;
          }

          .portal-ring-2 {
            width: 210px;
            height: 210px;
          }

          .portal-ring-3 {
            width: 270px;
            height: 270px;
          }

          .portal-center {
            width: 100px;
            height: 100px;
          }

          .quantum-title {
            font-size: 2.8rem;
            letter-spacing: 6px;
          }

          .quantum-subtitle {
            font-size: 0.95rem;
            letter-spacing: 6px;
          }
        }
      `}</style>

      <div className="quantum-splash-container">
        {/* Cosmic stars background */}
        <div className="cosmic-stars">
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
        </div>

        {/* Lightning effects */}
        <div className="lightning-container">
          <svg className="lightning" width="40" height="80" viewBox="0 0 40 80">
            <path
              d="M20 0 L10 40 L25 40 L15 80 L35 30 L20 30 Z"
              fill="rgba(0, 212, 255, 0.8)"
              filter="url(#glow)"
            />
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
          </svg>
          <svg className="lightning" width="40" height="80" viewBox="0 0 40 80">
            <path
              d="M20 0 L10 40 L25 40 L15 80 L35 30 L20 30 Z"
              fill="rgba(123, 97, 255, 0.8)"
              filter="url(#glow2)"
            />
            <defs>
              <filter id="glow2">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
          </svg>
        </div>

        {/* Portal structure */}
        <div className="portal-container">
          {/* Pulsing waves */}
          <div className="portal-pulse"></div>
          <div className="portal-pulse"></div>
          <div className="portal-pulse"></div>

          {/* Rotating rings */}
          <div className="portal-ring portal-ring-3"></div>
          <div className="portal-ring portal-ring-2"></div>
          <div className="portal-ring portal-ring-1"></div>

          {/* Energy beams */}
          <div className="energy-beams">
            <div className="beam"></div>
            <div className="beam"></div>
            <div className="beam"></div>
            <div className="beam"></div>
            <div className="beam"></div>
            <div className="beam"></div>
            <div className="beam"></div>
            <div className="beam"></div>
          </div>

          {/* Orbiting particles */}
          <div className="quantum-particles">
            <div className="quantum-particle"></div>
            <div className="quantum-particle"></div>
            <div className="quantum-particle"></div>
            <div className="quantum-particle"></div>
            <div className="quantum-particle"></div>
            <div className="quantum-particle"></div>
            <div className="quantum-particle"></div>
            <div className="quantum-particle"></div>
          </div>

          {/* Portal center */}
          <div className="portal-center"></div>

          {/* Text */}
          <div className="quantum-text">
            <div className="quantum-title">TOKEDEX</div>
            <div className="quantum-subtitle">Portal To Web3</div>
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
          <QuantumPortalSplash />
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
