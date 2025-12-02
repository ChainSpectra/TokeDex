import { useState, useEffect } from 'react';
import App from '../App';

// ParticleSplash component - impressive particle explosion with 3D depth
export const ParticleSplash = () => {
  return (
    <>
      <style>{`
        @keyframes particleExplode1 {
          0% {
            transform: translate(-50%, -50%) translate(0, 0) scale(0);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) translate(180px, -120px) scale(1);
            opacity: 0;
          }
        }

        @keyframes particleExplode2 {
          0% {
            transform: translate(-50%, -50%) translate(0, 0) scale(0);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) translate(-160px, -140px) scale(1);
            opacity: 0;
          }
        }

        @keyframes particleExplode3 {
          0% {
            transform: translate(-50%, -50%) translate(0, 0) scale(0);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) translate(200px, 80px) scale(1);
            opacity: 0;
          }
        }

        @keyframes particleExplode4 {
          0% {
            transform: translate(-50%, -50%) translate(0, 0) scale(0);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) translate(-190px, 100px) scale(1);
            opacity: 0;
          }
        }

        @keyframes particleExplode5 {
          0% {
            transform: translate(-50%, -50%) translate(0, 0) scale(0);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) translate(0px, -180px) scale(1);
            opacity: 0;
          }
        }

        @keyframes particleExplode6 {
          0% {
            transform: translate(-50%, -50%) translate(0, 0) scale(0);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) translate(0px, 170px) scale(1);
            opacity: 0;
          }
        }

        @keyframes particleExplode7 {
          0% {
            transform: translate(-50%, -50%) translate(0, 0) scale(0);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) translate(140px, 140px) scale(1);
            opacity: 0;
          }
        }

        @keyframes particleExplode8 {
          0% {
            transform: translate(-50%, -50%) translate(0, 0) scale(0);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) translate(-150px, -70px) scale(1);
            opacity: 0;
          }
        }

        @keyframes logoReveal {
          0% {
            transform: translate(-50%, -50%) scale(0) rotate(-180deg);
            opacity: 0;
          }
          60% {
            transform: translate(-50%, -50%) scale(1.2) rotate(10deg);
          }
          100% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        @keyframes energyPulse {
          0%, 100% {
            box-shadow: 
              0 0 40px rgba(0, 212, 255, 0.8),
              0 0 80px rgba(123, 97, 255, 0.6),
              0 0 120px rgba(255, 51, 102, 0.4),
              inset 0 0 40px rgba(0, 212, 255, 0.3);
          }
          50% {
            box-shadow: 
              0 0 60px rgba(0, 212, 255, 1),
              0 0 120px rgba(123, 97, 255, 0.8),
              0 0 180px rgba(255, 51, 102, 0.6),
              inset 0 0 60px rgba(0, 212, 255, 0.5);
          }
        }

        @keyframes waveRipple {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(3);
            opacity: 0;
          }
        }

        @keyframes rotateGlow {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        @keyframes textGlitch {
          0%, 90%, 100% {
            transform: translate(-50%, -50%);
            text-shadow: 
              0 0 20px rgba(0, 212, 255, 0.8),
              0 0 40px rgba(123, 97, 255, 0.6);
          }
          92% {
            transform: translate(-48%, -50%);
            text-shadow: 
              -2px 0 rgba(255, 51, 102, 0.8),
              2px 0 rgba(0, 212, 255, 0.8);
          }
          94% {
            transform: translate(-52%, -50%);
            text-shadow: 
              2px 0 rgba(255, 51, 102, 0.8),
              -2px 0 rgba(0, 212, 255, 0.8);
          }
        }

        @keyframes hexFloat {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        .particle-splash-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: radial-gradient(ellipse at center, #1a0a2e 0%, #0a0a1a 50%, #000000 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          z-index: 9999;
        }

        .particle-container {
          position: relative;
          width: 600px;
          height: 600px;
        }

        .center-core {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 180px;
          height: 180px;
          animation: logoReveal 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }

        .core-hexagon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #00D4FF, #7B61FF, #FF3366);
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          animation: energyPulse 2s ease-in-out infinite, hexFloat 4s ease-in-out infinite;
        }

        .core-inner {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 85%;
          height: 85%;
          background: #0a0a1a;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }

        .core-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 4rem;
          font-weight: 900;
          background: linear-gradient(135deg, #00D4FF, #7B61FF, #FF3366);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          z-index: 10;
          animation: textGlitch 3s ease-in-out infinite;
        }

        .rotating-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 240px;
          height: 240px;
          border: 3px solid transparent;
          border-top-color: rgba(0, 212, 255, 0.8);
          border-right-color: rgba(123, 97, 255, 0.6);
          border-radius: 50%;
          animation: rotateGlow 3s linear infinite;
        }

        .ripple-wave {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 200px;
          height: 200px;
          border: 2px solid rgba(0, 212, 255, 0.6);
          border-radius: 50%;
          animation: waveRipple 2s ease-out infinite;
        }

        .ripple-wave:nth-child(2) {
          animation-delay: 0.4s;
        }

        .ripple-wave:nth-child(3) {
          animation-delay: 0.8s;
        }

        .ripple-wave:nth-child(4) {
          animation-delay: 1.2s;
        }

        .particle {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 12px;
          height: 12px;
          background: linear-gradient(135deg, #00D4FF, #7B61FF);
          border-radius: 50%;
          box-shadow: 
            0 0 20px rgba(0, 212, 255, 0.8),
            0 0 40px rgba(123, 97, 255, 0.6);
        }

        .particle:nth-child(1) { animation: particleExplode1 2s ease-out infinite; }
        .particle:nth-child(2) { animation: particleExplode2 2s ease-out infinite; animation-delay: 0.1s; }
        .particle:nth-child(3) { animation: particleExplode3 2s ease-out infinite; animation-delay: 0.2s; }
        .particle:nth-child(4) { animation: particleExplode4 2s ease-out infinite; animation-delay: 0.3s; }
        .particle:nth-child(5) { animation: particleExplode5 2s ease-out infinite; animation-delay: 0.4s; }
        .particle:nth-child(6) { animation: particleExplode6 2s ease-out infinite; animation-delay: 0.5s; }
        .particle:nth-child(7) { animation: particleExplode7 2s ease-out infinite; animation-delay: 0.6s; }
        .particle:nth-child(8) { animation: particleExplode8 2s ease-out infinite; animation-delay: 0.7s; }

        .title-container {
          position: absolute;
          bottom: 80px;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          animation: logoReveal 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.3s backwards;
        }

        .main-title {
          font-size: 3.5rem;
          font-weight: 900;
          background: linear-gradient(135deg, #00D4FF, #7B61FF, #FF3366, #00D4FF);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: 8px;
          margin-bottom: 12px;
          text-shadow: 0 0 40px rgba(0, 212, 255, 0.5);
        }

        .sub-title {
          font-size: 1.1rem;
          color: rgba(0, 212, 255, 0.9);
          font-weight: 400;
          letter-spacing: 8px;
          text-transform: uppercase;
          text-shadow: 0 0 20px rgba(0, 212, 255, 0.6);
        }

        @media (max-width: 768px) {
          .particle-container {
            width: 400px;
            height: 400px;
          }

          .center-core {
            width: 140px;
            height: 140px;
          }

          .core-text {
            font-size: 3rem;
          }

          .main-title {
            font-size: 2.5rem;
            letter-spacing: 4px;
          }

          .sub-title {
            font-size: 0.9rem;
            letter-spacing: 4px;
          }
        }
      `}</style>

      <div className="particle-splash-container">
        <div className="particle-container">
          {/* Ripple waves */}
          <div className="ripple-wave"></div>
          <div className="ripple-wave"></div>
          <div className="ripple-wave"></div>
          <div className="ripple-wave"></div>

          {/* Rotating ring */}
          <div className="rotating-ring"></div>

          {/* Exploding particles */}
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>

          {/* Center core with hexagon */}
          <div className="center-core">
            <div className="core-hexagon"></div>
            <div className="core-inner"></div>
            <div className="core-text">Q</div>
          </div>

          {/* Title */}
          <div className="title-container">
            <div className="main-title">TOKEDEX</div>
            <div className="sub-title">Decentralized Exchange</div>
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
    // Start fade out after 2.5 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2500);

    // Remove splash completely after fade animation
    const removeTimer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

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
            transform: scale(1.1);
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
          animation: splashFadeOut 0.5s ease-out forwards;
        }

        .app-wrapper {
          animation: appFadeIn 0.6s ease-out;
        }
      `}</style>

      {showSplash ? (
        <div className={fadeOut ? 'splash-wrapper' : ''}>
          <ParticleSplash />
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
