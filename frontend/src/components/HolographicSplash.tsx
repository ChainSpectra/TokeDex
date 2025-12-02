import { useState, useEffect } from 'react';
import App from '../App';

// HolographicSplash component - futuristic hologram projection effect
export const HolographicSplash = () => {
  return (
    <>
      <style>{`
        @keyframes hologramFlicker {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
          75% {
            opacity: 0.95;
          }
        }

        @keyframes scanLine {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100vh);
          }
        }

        @keyframes hologramReveal {
          0% {
            clip-path: inset(50% 50% 50% 50%);
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 0;
          }
          50% {
            clip-path: inset(0% 0% 0% 0%);
          }
          100% {
            clip-path: inset(0% 0% 0% 0%);
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
        }

        @keyframes dataStream {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }

        @keyframes rotate3D {
          0% {
            transform: translate(-50%, -50%) rotateY(0deg) rotateX(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotateY(360deg) rotateX(360deg);
          }
        }

        @keyframes gridPerspective {
          0%, 100% {
            transform: perspective(1000px) rotateX(60deg) translateZ(0);
          }
          50% {
            transform: perspective(1000px) rotateX(60deg) translateZ(-50px);
          }
        }

        .holographic-splash-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          z-index: 9999;
          perspective: 1000px;
        }

        .scan-line {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(to bottom, transparent, rgba(0, 212, 255, 0.8), transparent);
          animation: scanLine 3s linear infinite;
          box-shadow: 0 0 10px rgba(0, 212, 255, 0.8);
        }

        .grid-floor {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 300px;
          background-image: 
            linear-gradient(rgba(0, 212, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.3) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: gridPerspective 4s ease-in-out infinite;
          transform-origin: bottom center;
        }

        .data-streams {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .data-stream {
          position: absolute;
          width: 1px;
          height: 100px;
          background: linear-gradient(to bottom, transparent, rgba(0, 212, 255, 0.6), transparent);
          animation: dataStream 2s linear infinite;
        }

        .data-stream:nth-child(1) { left: 10%; animation-delay: 0s; }
        .data-stream:nth-child(2) { left: 25%; animation-delay: 0.3s; }
        .data-stream:nth-child(3) { left: 40%; animation-delay: 0.6s; }
        .data-stream:nth-child(4) { left: 55%; animation-delay: 0.9s; }
        .data-stream:nth-child(5) { left: 70%; animation-delay: 1.2s; }
        .data-stream:nth-child(6) { left: 85%; animation-delay: 1.5s; }

        .hologram-logo {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 300px;
          height: 300px;
          animation: hologramReveal 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }

        .hologram-cube {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 150px;
          height: 150px;
          transform-style: preserve-3d;
          animation: rotate3D 8s linear infinite, hologramFlicker 0.15s infinite;
        }

        .cube-face {
          position: absolute;
          width: 150px;
          height: 150px;
          border: 2px solid rgba(0, 212, 255, 0.5);
          background: rgba(0, 212, 255, 0.1);
          box-shadow: 
            inset 0 0 30px rgba(0, 212, 255, 0.3),
            0 0 30px rgba(0, 212, 255, 0.3);
        }

        .cube-face::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80%;
          height: 80%;
          border: 1px solid rgba(123, 97, 255, 0.4);
        }

        .front  { transform: translateZ(75px); }
        .back   { transform: translateZ(-75px) rotateY(180deg); }
        .right  { transform: rotateY(90deg) translateZ(75px); }
        .left   { transform: rotateY(-90deg) translateZ(75px); }
        .top    { transform: rotateX(90deg) translateZ(75px); }
        .bottom { transform: rotateX(-90deg) translateZ(75px); }

        .center-orb {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80px;
          height: 80px;
          background: radial-gradient(circle, rgba(0, 212, 255, 0.8), rgba(123, 97, 255, 0.4), transparent);
          border-radius: 50%;
          animation: hologramFlicker 0.15s infinite;
          box-shadow: 
            0 0 40px rgba(0, 212, 255, 0.8),
            0 0 80px rgba(123, 97, 255, 0.6),
            inset 0 0 30px rgba(0, 212, 255, 0.5);
        }

        .rings-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 250px;
          height: 250px;
        }

        .holo-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: 1px solid rgba(0, 212, 255, 0.4);
          border-radius: 50%;
          animation: hologramFlicker 0.15s infinite;
        }

        .holo-ring:nth-child(1) {
          width: 200px;
          height: 200px;
        }

        .holo-ring:nth-child(2) {
          width: 240px;
          height: 240px;
          animation-delay: 0.05s;
        }

        .holo-ring:nth-child(3) {
          width: 280px;
          height: 280px;
          animation-delay: 0.1s;
        }

        .hologram-text {
          position: absolute;
          bottom: -100px;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          white-space: nowrap;
          animation: hologramFlicker 0.15s infinite;
        }

        .holo-title {
          font-size: 3rem;
          font-weight: 900;
          color: rgba(0, 212, 255, 0.9);
          text-shadow: 
            0 0 10px rgba(0, 212, 255, 0.8),
            0 0 20px rgba(0, 212, 255, 0.6),
            0 0 30px rgba(0, 212, 255, 0.4);
          letter-spacing: 8px;
          font-family: 'Courier New', monospace;
          margin-bottom: 8px;
        }

        .holo-subtitle {
          font-size: 1rem;
          color: rgba(123, 97, 255, 0.8);
          text-shadow: 
            0 0 5px rgba(123, 97, 255, 0.8),
            0 0 10px rgba(123, 97, 255, 0.6);
          letter-spacing: 6px;
          text-transform: uppercase;
          font-family: 'Courier New', monospace;
        }

        .glitch-effect {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 212, 255, 0.03) 0px,
            transparent 2px,
            transparent 4px,
            rgba(0, 212, 255, 0.03) 6px
          );
          pointer-events: none;
          animation: hologramFlicker 0.15s infinite;
        }

        @media (max-width: 768px) {
          .hologram-logo {
            width: 250px;
            height: 250px;
          }

          .hologram-cube {
            width: 120px;
            height: 120px;
          }

          .cube-face {
            width: 120px;
            height: 120px;
          }

          .front  { transform: translateZ(60px); }
          .back   { transform: translateZ(-60px) rotateY(180deg); }
          .right  { transform: rotateY(90deg) translateZ(60px); }
          .left   { transform: rotateY(-90deg) translateZ(60px); }
          .top    { transform: rotateX(90deg) translateZ(60px); }
          .bottom { transform: rotateX(-90deg) translateZ(60px); }

          .holo-title {
            font-size: 2.2rem;
            letter-spacing: 4px;
          }

          .holo-subtitle {
            font-size: 0.85rem;
            letter-spacing: 4px;
          }
        }
      `}</style>

      <div className="holographic-splash-container">
        {/* Glitch scanline effect */}
        <div className="glitch-effect"></div>

        {/* Scanning line */}
        <div className="scan-line"></div>

        {/* Data streams */}
        <div className="data-streams">
          <div className="data-stream"></div>
          <div className="data-stream"></div>
          <div className="data-stream"></div>
          <div className="data-stream"></div>
          <div className="data-stream"></div>
          <div className="data-stream"></div>
        </div>

        {/* 3D Grid floor */}
        <div className="grid-floor"></div>

        {/* Main hologram */}
        <div className="hologram-logo">
          {/* Concentric rings */}
          <div className="rings-container">
            <div className="holo-ring"></div>
            <div className="holo-ring"></div>
            <div className="holo-ring"></div>
          </div>

          {/* 3D Rotating cube */}
          <div className="hologram-cube">
            <div className="cube-face front"></div>
            <div className="cube-face back"></div>
            <div className="cube-face right"></div>
            <div className="cube-face left"></div>
            <div className="cube-face top"></div>
            <div className="cube-face bottom"></div>
          </div>

          {/* Center energy orb */}
          <div className="center-orb"></div>

          {/* Text */}
          <div className="hologram-text">
            <div className="holo-title">TOKEDEX</div>
            <div className="holo-subtitle">Holographic DEX</div>
          </div>
        </div>
      </div>
    </>
  );
};

// AppWithSplash - wrapper component
export const AppWithSplash = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2500);

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
          }
          to {
            opacity: 0;
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
          <HolographicSplash />
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
