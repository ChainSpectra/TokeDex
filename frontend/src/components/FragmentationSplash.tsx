import { useState, useEffect } from 'react';
import App from '../App';

// FragmentationSplash component - animated asset fragmentation
export const FragmentationSplash = () => {
  return (
    <>
      <style>{`
        @keyframes diamondPulse {
          0%, 100% {
            transform: scale(1);
            filter: drop-shadow(0 0 20px rgba(0, 212, 255, 0.6));
          }
          50% {
            transform: scale(1.05);
            filter: drop-shadow(0 0 40px rgba(123, 97, 255, 0.8));
          }
        }

        @keyframes blockSlideOut {
          0% {
            transform: translate(0, 0);
            opacity: 1;
          }
          40% {
            transform: translate(80px, -80px);
            opacity: 1;
          }
          50% {
            transform: translate(80px, -80px);
            opacity: 0.8;
          }
          100% {
            transform: translate(80px, -80px);
            opacity: 0;
          }
        }

        @keyframes fragment1 {
          0%, 50% {
            transform: translate(0, 0) scale(0);
            opacity: 0;
          }
          60% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(40px, -60px) scale(0.8);
            opacity: 1;
          }
        }

        @keyframes fragment2 {
          0%, 50% {
            transform: translate(0, 0) scale(0);
            opacity: 0;
          }
          60% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(70px, -40px) scale(0.8);
            opacity: 1;
          }
        }

        @keyframes fragment3 {
          0%, 50% {
            transform: translate(0, 0) scale(0);
            opacity: 0;
          }
          60% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(90px, -70px) scale(0.8);
            opacity: 1;
          }
        }

        @keyframes fragment4 {
          0%, 50% {
            transform: translate(0, 0) scale(0);
            opacity: 0;
          }
          60% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(60px, -90px) scale(0.8);
            opacity: 1;
          }
        }

        @keyframes fragment5 {
          0%, 50% {
            transform: translate(0, 0) scale(0);
            opacity: 0;
          }
          60% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(100px, -50px) scale(0.8);
            opacity: 1;
          }
        }

        @keyframes lineGrow1 {
          0%, 60% {
            stroke-dashoffset: 100;
            opacity: 0;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }

        @keyframes tokenGlow {
          0%, 100% {
            box-shadow: 
              0 0 15px rgba(0, 212, 255, 0.8),
              0 0 30px rgba(0, 212, 255, 0.4),
              inset 0 0 10px rgba(0, 212, 255, 0.6);
          }
          50% {
            box-shadow: 
              0 0 25px rgba(123, 97, 255, 0.9),
              0 0 50px rgba(123, 97, 255, 0.6),
              inset 0 0 15px rgba(123, 97, 255, 0.8);
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

        @keyframes gridPulse {
          0%, 100% {
            opacity: 0.05;
          }
          50% {
            opacity: 0.15;
          }
        }

        .fragmentation-splash-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: linear-gradient(135deg, #0a0a1f 0%, #1a0f2e 50%, #0f0a20 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          z-index: 9999;
        }

        .grid-background {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(123, 97, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(123, 97, 255, 0.1) 1px, transparent 1px);
          background-size: 40px 40px;
          animation: gridPulse 3s ease-in-out infinite;
        }

        .fragmentation-container {
          position: relative;
          width: 400px;
          height: 400px;
          animation: fadeInScale 0.8s ease-out;
        }

        .diamond-asset {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 120px;
          height: 120px;
          animation: diamondPulse 3s ease-in-out infinite;
        }

        .block {
          position: absolute;
          width: 30px;
          height: 30px;
          background: linear-gradient(135deg, #00D4FF, #7B61FF);
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .block-1 { top: 15px; left: 45px; }
        .block-2 { top: 15px; right: 45px; }
        .block-3 { bottom: 15px; left: 45px; }
        .block-4 { bottom: 15px; right: 45px; }
        .block-5 { top: 45px; left: 15px; }
        .block-6 { top: 45px; right: 15px; }
        .block-7 { bottom: 45px; left: 15px; }
        .block-8 { bottom: 45px; right: 15px; }

        .center-diamond {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(45deg);
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #7B61FF, #FF3366, #00D4FF);
          border: 2px solid rgba(255, 255, 255, 0.5);
          box-shadow: 
            0 0 30px rgba(0, 212, 255, 0.6),
            inset 0 0 20px rgba(123, 97, 255, 0.4);
        }

        .sliding-block {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 30px;
          height: 30px;
          background: linear-gradient(135deg, #00D4FF, #7B61FF);
          border: 2px solid rgba(255, 255, 255, 0.3);
          animation: blockSlideOut 2s ease-out forwards;
        }

        .fragments-container {
          position: absolute;
          top: 50%;
          left: 50%;
        }

        .fragment {
          position: absolute;
          width: 16px;
          height: 16px;
          background: linear-gradient(135deg, #00D4FF, #7B61FF);
          border-radius: 50%;
          animation: tokenGlow 2s ease-in-out infinite;
          transform: translate(80px, -80px);
        }

        .fragment:nth-child(1) {
          animation: fragment1 2s ease-out forwards, tokenGlow 2s ease-in-out infinite;
        }

        .fragment:nth-child(2) {
          animation: fragment2 2s ease-out forwards, tokenGlow 2s ease-in-out infinite;
          animation-delay: 0s, 0.1s;
        }

        .fragment:nth-child(3) {
          animation: fragment3 2s ease-out forwards, tokenGlow 2s ease-in-out infinite;
          animation-delay: 0s, 0.2s;
        }

        .fragment:nth-child(4) {
          animation: fragment4 2s ease-out forwards, tokenGlow 2s ease-in-out infinite;
          animation-delay: 0s, 0.3s;
        }

        .fragment:nth-child(5) {
          animation: fragment5 2s ease-out forwards, tokenGlow 2s ease-in-out infinite;
          animation-delay: 0s, 0.4s;
        }

        .connection-lines {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .connection-line {
          stroke: url(#lineGradient);
          stroke-width: 1.5;
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: lineGrow1 1.5s ease-out forwards;
          animation-delay: 0.6s;
          opacity: 0;
        }

        .fragmentation-text {
          position: absolute;
          bottom: -120px;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          white-space: nowrap;
        }

        .fragmentation-title {
          font-size: 2.5rem;
          font-weight: 900;
          background: linear-gradient(135deg, #00D4FF, #7B61FF, #FF3366);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 8px;
          letter-spacing: 3px;
        }

        .fragmentation-subtitle {
          font-size: 0.95rem;
          color: rgba(0, 212, 255, 0.8);
          font-weight: 300;
          letter-spacing: 5px;
          text-transform: uppercase;
        }

        @media (max-width: 768px) {
          .fragmentation-container {
            width: 320px;
            height: 320px;
          }

          .diamond-asset {
            width: 100px;
            height: 100px;
          }

          .block {
            width: 25px;
            height: 25px;
          }

          .center-diamond {
            width: 35px;
            height: 35px;
          }

          .fragmentation-title {
            font-size: 2rem;
          }

          .fragmentation-subtitle {
            font-size: 0.8rem;
            letter-spacing: 3px;
          }
        }
      `}</style>

      <div className="fragmentation-splash-container">
        {/* Grid background */}
        <div className="grid-background"></div>

        {/* Main fragmentation animation */}
        <div className="fragmentation-container">
          {/* Diamond asset made of blocks */}
          <div className="diamond-asset">
            {/* Outer blocks forming grid structure */}
            <div className="block block-1"></div>
            <div className="block block-2"></div>
            <div className="block block-3"></div>
            <div className="block block-4"></div>
            <div className="block block-5"></div>
            <div className="block block-6"></div>
            <div className="block block-7"></div>
            <div className="block block-8"></div>

            {/* Center diamond (high-value asset) */}
            <div className="center-diamond"></div>
          </div>

          {/* Sliding block that fragments */}
          <div className="sliding-block"></div>

          {/* Fragments (small tokens) */}
          <div className="fragments-container">
            <div className="fragment"></div>
            <div className="fragment"></div>
            <div className="fragment"></div>
            <div className="fragment"></div>
            <div className="fragment"></div>
          </div>

          {/* Connection lines */}
          <svg className="connection-lines" width="400" height="400" viewBox="0 0 400 400">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(0, 212, 255, 0.6)" />
                <stop offset="100%" stopColor="rgba(123, 97, 255, 0.6)" />
              </linearGradient>
            </defs>

            {/* Lines from center to fragments */}
            <line className="connection-line" x1="200" y1="200" x2="240" y2="140" />
            <line className="connection-line" x1="200" y1="200" x2="270" y2="160" />
            <line className="connection-line" x1="200" y1="200" x2="290" y2="130" />
            <line className="connection-line" x1="200" y1="200" x2="260" y2="110" />
            <line className="connection-line" x1="200" y1="200" x2="300" y2="150" />
          </svg>

          {/* Text */}
          <div className="fragmentation-text">
            <div className="fragmentation-title">TokeDEx</div>
            <div className="fragmentation-subtitle">Fractional Assets</div>
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
          <FragmentationSplash />
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
