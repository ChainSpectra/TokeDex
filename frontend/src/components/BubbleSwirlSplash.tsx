import { useState, useEffect } from 'react';
import App from '../App';

// BubbleSwirlSplash component - glossy bubble logo with swirl background
export const BubbleSwirlSplash = () => {
  return (
    <>
      <style>{`
        @keyframes bubbleFloat {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            transform: translate(-50%, -50%) scale(1.07);
          }
        }

        @keyframes swirlBlob1 {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg) scale(1);
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
          25% {
            transform: translate(30px, -50px) rotate(90deg) scale(1.1);
            border-radius: 40% 60% 70% 30% / 50% 60% 40% 50%;
          }
          50% {
            transform: translate(-20px, -80px) rotate(180deg) scale(0.9);
            border-radius: 70% 30% 50% 50% / 30% 60% 40% 70%;
          }
          75% {
            transform: translate(-40px, -30px) rotate(270deg) scale(1.05);
            border-radius: 30% 70% 40% 60% / 70% 40% 60% 30%;
          }
        }

        @keyframes swirlBlob2 {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg) scale(1);
            border-radius: 40% 60% 60% 40% / 70% 30% 70% 30%;
          }
          25% {
            transform: translate(-40px, 60px) rotate(-90deg) scale(1.15);
            border-radius: 60% 40% 30% 70% / 40% 70% 30% 60%;
          }
          50% {
            transform: translate(30px, 90px) rotate(-180deg) scale(0.85);
            border-radius: 50% 50% 70% 30% / 60% 40% 60% 40%;
          }
          75% {
            transform: translate(50px, 40px) rotate(-270deg) scale(1.1);
            border-radius: 70% 30% 40% 60% / 30% 70% 30% 70%;
          }
        }

        @keyframes swirlBlob3 {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg) scale(1);
            border-radius: 50% 50% 30% 70% / 30% 60% 70% 40%;
          }
          33% {
            transform: translate(20px, -70px) rotate(120deg) scale(1.2);
            border-radius: 70% 30% 60% 40% / 50% 50% 50% 50%;
          }
          66% {
            transform: translate(-30px, 50px) rotate(240deg) scale(0.9);
            border-radius: 40% 60% 50% 50% / 70% 30% 60% 40%;
          }
        }

        @keyframes shimmer {
          0%, 100% {
            opacity: 0.8;
            transform: translateX(-50%) translateY(-200%);
          }
          50% {
            opacity: 1;
            transform: translateX(-50%) translateY(200%);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .bubble-swirl-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 50%, #16213e 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          z-index: 9999;
        }

        .swirl-background {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .swirl-blob {
          position: absolute;
          filter: blur(80px);
          opacity: 0.4;
        }

        .swirl-blob-1 {
          width: 500px;
          height: 500px;
          top: 10%;
          left: 15%;
          background: linear-gradient(135deg, #7B61FF, #00D4FF);
          animation: swirlBlob1 15s ease-in-out infinite;
        }

        .swirl-blob-2 {
          width: 600px;
          height: 600px;
          bottom: 10%;
          right: 10%;
          background: linear-gradient(135deg, #00D4FF, #7B61FF, #FF3366);
          animation: swirlBlob2 18s ease-in-out infinite;
        }

        .swirl-blob-3 {
          width: 450px;
          height: 450px;
          top: 40%;
          right: 20%;
          background: linear-gradient(135deg, #FF3366, #7B61FF);
          animation: swirlBlob3 12s ease-in-out infinite;
        }

        .bubble-logo-container {
          position: relative;
          width: 280px;
          height: 280px;
          animation: fadeInScale 0.8s ease-out;
        }

        .bubble-logo {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 200px;
          height: 200px;
          animation: bubbleFloat 3s ease-in-out infinite;
        }

        .bubble-shape {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: linear-gradient(135deg, 
            rgba(123, 97, 255, 0.9) 0%,
            rgba(0, 212, 255, 0.8) 50%,
            rgba(123, 97, 255, 0.7) 100%
          );
          box-shadow: 
            0 20px 60px rgba(0, 212, 255, 0.4),
            0 0 40px rgba(123, 97, 255, 0.3),
            inset 0 -20px 40px rgba(0, 0, 0, 0.3),
            inset 0 10px 30px rgba(255, 255, 255, 0.2);
        }

        .bubble-shape::before {
          content: '';
          position: absolute;
          top: 15%;
          left: 20%;
          width: 40%;
          height: 30%;
          background: radial-gradient(ellipse at center, 
            rgba(255, 255, 255, 0.8) 0%,
            rgba(255, 255, 255, 0.4) 40%,
            transparent 70%
          );
          border-radius: 50%;
          transform: rotate(-25deg);
        }

        .bubble-shape::after {
          content: '';
          position: absolute;
          top: 25%;
          left: 65%;
          width: 20%;
          height: 15%;
          background: radial-gradient(ellipse at center, 
            rgba(255, 255, 255, 0.6) 0%,
            rgba(255, 255, 255, 0.2) 50%,
            transparent 80%
          );
          border-radius: 50%;
          transform: rotate(-15deg);
        }

        .bubble-shimmer {
          position: absolute;
          top: 0;
          left: 50%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(255, 255, 255, 0.3) 50%,
            transparent 100%
          );
          border-radius: 50%;
          animation: shimmer 3s ease-in-out infinite;
          pointer-events: none;
        }

        .bubble-shadow {
          position: absolute;
          bottom: -40px;
          left: 50%;
          transform: translateX(-50%);
          width: 160px;
          height: 30px;
          background: radial-gradient(ellipse at center, 
            rgba(0, 0, 0, 0.4) 0%,
            rgba(0, 0, 0, 0.2) 40%,
            transparent 70%
          );
          filter: blur(10px);
        }

        .bubble-logo-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 3rem;
          font-weight: 900;
          color: white;
          text-shadow: 
            0 2px 10px rgba(0, 0, 0, 0.3),
            0 0 30px rgba(255, 255, 255, 0.3);
          letter-spacing: 2px;
          z-index: 10;
        }

        .splash-title {
          position: absolute;
          bottom: -100px;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          white-space: nowrap;
        }

        .splash-main-title {
          font-size: 2.5rem;
          font-weight: 900;
          background: linear-gradient(135deg, #00D4FF, #7B61FF, #FF3366);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 8px;
          letter-spacing: 3px;
        }

        .splash-subtitle {
          font-size: 0.95rem;
          color: rgba(0, 212, 255, 0.8);
          font-weight: 300;
          letter-spacing: 5px;
          text-transform: uppercase;
        }

        @media (max-width: 768px) {
          .bubble-logo-container {
            width: 220px;
            height: 220px;
          }

          .bubble-logo {
            width: 160px;
            height: 160px;
          }

          .bubble-logo-text {
            font-size: 2.2rem;
          }

          .splash-main-title {
            font-size: 2rem;
          }

          .splash-subtitle {
            font-size: 0.8rem;
            letter-spacing: 3px;
          }

          .swirl-blob-1,
          .swirl-blob-2,
          .swirl-blob-3 {
            width: 350px;
            height: 350px;
          }
        }
      `}</style>

      <div className="bubble-swirl-container">
        {/* Swirl background with animated blobs */}
        <div className="swirl-background">
          <div className="swirl-blob swirl-blob-1"></div>
          <div className="swirl-blob swirl-blob-2"></div>
          <div className="swirl-blob swirl-blob-3"></div>
        </div>

        {/* Bubble logo */}
        <div className="bubble-logo-container">
          <div className="bubble-logo">
            {/* Shadow underneath */}
            <div className="bubble-shadow"></div>

            {/* Main bubble shape */}
            <div className="bubble-shape">
              {/* Shimmer effect */}
              <div className="bubble-shimmer"></div>
            </div>

            {/* Logo text */}
            <div className="bubble-logo-text">Q</div>
          </div>

          {/* Text below */}
          <div className="splash-title">
            <div className="splash-main-title">TokeDEx</div>
            <div className="splash-subtitle">Token Exchange</div>
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
          <BubbleSwirlSplash />
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
