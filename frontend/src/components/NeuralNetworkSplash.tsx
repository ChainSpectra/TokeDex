import { useState, useEffect } from 'react';
import App from '../App';

// NeuralNetworkSplash component - AI neural network visualization
export const NeuralNetworkSplash = () => {
  return (
    <>
      <style>{`
        @keyframes neuronPulse {
          0%, 100% {
            r: 6;
            opacity: 0.6;
          }
          50% {
            r: 10;
            opacity: 1;
          }
        }

        @keyframes synapseFlow {
          0% {
            stroke-dashoffset: 100;
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 0.3;
          }
        }

        @keyframes brainReveal {
          0% {
            transform: translate(-50%, -50%) scale(0) rotate(-180deg);
            opacity: 0;
          }
          60% {
            transform: translate(-50%, -50%) scale(1.15) rotate(10deg);
          }
          100% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        @keyframes dataPacket {
          0% {
            offset-distance: 0%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            offset-distance: 100%;
            opacity: 0;
          }
        }

        @keyframes glowPulse {
          0%, 100% {
            filter: drop-shadow(0 0 20px rgba(0, 212, 255, 0.6))
                    drop-shadow(0 0 40px rgba(123, 97, 255, 0.4));
          }
          50% {
            filter: drop-shadow(0 0 40px rgba(0, 212, 255, 1))
                    drop-shadow(0 0 80px rgba(123, 97, 255, 0.8));
          }
        }

        @keyframes circuitTrace {
          0% {
            stroke-dashoffset: 500;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        @keyframes energyWave {
          0% {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 0.8;
          }
          100% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
          }
        }

        @keyframes aiThinking {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
          }
          25% {
            transform: translate(-50%, -50%) scale(1.05);
          }
          50% {
            transform: translate(-50%, -50%) scale(0.95);
          }
          75% {
            transform: translate(-50%, -50%) scale(1.02);
          }
        }

        @keyframes textReveal {
          0% {
            opacity: 0;
            transform: translateY(30px);
            letter-spacing: 20px;
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            letter-spacing: 12px;
          }
        }

        @keyframes scanline {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100vh);
          }
        }

        .neural-splash-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: radial-gradient(ellipse at center, #0f1419 0%, #000000 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          z-index: 9999;
        }

        .scanline-overlay {
          position: absolute;
          width: 100%;
          height: 3px;
          background: linear-gradient(to bottom, 
            transparent, 
            rgba(0, 212, 255, 0.3), 
            transparent
          );
          animation: scanline 4s linear infinite;
          pointer-events: none;
        }

        .circuit-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.1;
        }

        .neural-network {
          position: relative;
          width: 700px;
          height: 700px;
          animation: brainReveal 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }

        .network-svg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .synapse {
          stroke: rgba(0, 212, 255, 0.6);
          stroke-width: 2;
          fill: none;
          stroke-dasharray: 100;
          animation: synapseFlow 3s ease-in-out infinite;
        }

        .neuron {
          fill: url(#neuronGradient);
          animation: neuronPulse 2s ease-in-out infinite;
        }

        .data-packet {
          fill: rgba(255, 51, 102, 0.9);
          r: 4;
          filter: drop-shadow(0 0 8px rgba(255, 51, 102, 1));
        }

        .ai-core {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 180px;
          height: 180px;
          animation: aiThinking 4s ease-in-out infinite, glowPulse 3s ease-in-out infinite;
        }

        .core-circle {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: radial-gradient(circle,
            rgba(0, 212, 255, 0.8) 0%,
            rgba(123, 97, 255, 0.6) 50%,
            transparent 100%
          );
          box-shadow: 
            0 0 40px rgba(0, 212, 255, 0.8),
            0 0 80px rgba(123, 97, 255, 0.6),
            inset 0 0 40px rgba(0, 212, 255, 0.4);
        }

        .core-inner {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 70%;
          height: 70%;
          border-radius: 50%;
          background: radial-gradient(circle,
            rgba(255, 255, 255, 0.9) 0%,
            rgba(0, 212, 255, 0.7) 50%,
            transparent 100%
          );
        }

        .ai-symbol {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 3.5rem;
          font-weight: 900;
          background: linear-gradient(135deg, #ffffff, #00D4FF, #7B61FF);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
        }

        .energy-waves {
          position: absolute;
          top: 50%;
          left: 50%;
        }

        .energy-wave {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 180px;
          height: 180px;
          border: 2px solid rgba(0, 212, 255, 0.4);
          border-radius: 50%;
          animation: energyWave 3s ease-out infinite;
        }

        .energy-wave:nth-child(2) {
          animation-delay: 1s;
        }

        .energy-wave:nth-child(3) {
          animation-delay: 2s;
        }

        .thinking-dots {
          position: absolute;
          bottom: -80px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 12px;
        }

        .thinking-dot {
          width: 10px;
          height: 10px;
          background: linear-gradient(135deg, #00D4FF, #7B61FF);
          border-radius: 50%;
          box-shadow: 0 0 15px rgba(0, 212, 255, 0.8);
          animation: neuronPulse 1.5s ease-in-out infinite;
        }

        .thinking-dot:nth-child(1) { animation-delay: 0s; }
        .thinking-dot:nth-child(2) { animation-delay: 0.2s; }
        .thinking-dot:nth-child(3) { animation-delay: 0.4s; }
        .thinking-dot:nth-child(4) { animation-delay: 0.6s; }
        .thinking-dot:nth-child(5) { animation-delay: 0.8s; }

        .neural-text {
          position: absolute;
          bottom: 60px;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          animation: textReveal 1s ease-out 0.5s backwards;
        }

        .neural-title {
          font-size: 4.5rem;
          font-weight: 900;
          background: linear-gradient(135deg, #00D4FF, #7B61FF, #FF3366);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 12px;
          filter: drop-shadow(0 0 30px rgba(0, 212, 255, 0.6));
        }

        .neural-subtitle {
          font-size: 1.1rem;
          color: rgba(0, 212, 255, 0.8);
          letter-spacing: 8px;
          text-transform: uppercase;
          text-shadow: 0 0 20px rgba(0, 212, 255, 0.6);
        }

        @media (max-width: 768px) {
          .neural-network {
            width: 500px;
            height: 500px;
          }

          .ai-core {
            width: 140px;
            height: 140px;
          }

          .ai-symbol {
            font-size: 2.5rem;
          }

          .neural-title {
            font-size: 3rem;
          }

          .neural-subtitle {
            font-size: 0.9rem;
            letter-spacing: 4px;
          }
        }
      `}</style>

      <div className="neural-splash-container">
        {/* Scanline effect */}
        <div className="scanline-overlay"></div>

        {/* Circuit board background */}
        <div className="circuit-background">
          <svg width="100%" height="100%">
            <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(0, 212, 255, 0.1)" strokeWidth="1"/>
              <line x1="50" y1="0" x2="50" y2="100" stroke="rgba(0, 212, 255, 0.1)" strokeWidth="1"/>
              <circle cx="50" cy="50" r="3" fill="rgba(0, 212, 255, 0.2)"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#circuit)"/>
          </svg>
        </div>

        {/* Neural network structure */}
        <div className="neural-network">
          {/* Energy waves */}
          <div className="energy-waves">
            <div className="energy-wave"></div>
            <div className="energy-wave"></div>
            <div className="energy-wave"></div>
          </div>

          {/* Network connections */}
          <svg className="network-svg" viewBox="0 0 700 700">
            <defs>
              <linearGradient id="neuronGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(0, 212, 255, 1)" />
                <stop offset="100%" stopColor="rgba(123, 97, 255, 1)" />
              </linearGradient>
            </defs>

            {/* Layer connections (synapses) */}
            <line className="synapse" x1="150" y1="150" x2="350" y2="250" style={{animationDelay: '0s'}} />
            <line className="synapse" x1="150" y1="250" x2="350" y2="250" style={{animationDelay: '0.1s'}} />
            <line className="synapse" x1="150" y1="350" x2="350" y2="250" style={{animationDelay: '0.2s'}} />
            <line className="synapse" x1="150" y1="450" x2="350" y2="350" style={{animationDelay: '0.3s'}} />
            <line className="synapse" x1="150" y1="550" x2="350" y2="450" style={{animationDelay: '0.4s'}} />
            
            <line className="synapse" x1="350" y1="250" x2="550" y2="250" style={{animationDelay: '0.5s'}} />
            <line className="synapse" x1="350" y1="350" x2="550" y2="350" style={{animationDelay: '0.6s'}} />
            <line className="synapse" x1="350" y1="450" x2="550" y2="450" style={{animationDelay: '0.7s'}} />
            
            <line className="synapse" x1="550" y1="250" x2="350" y2="350" style={{animationDelay: '0.8s'}} />
            <line className="synapse" x1="550" y1="350" x2="350" y2="350" style={{animationDelay: '0.9s'}} />
            <line className="synapse" x1="550" y1="450" x2="350" y2="350" style={{animationDelay: '1s'}} />

            {/* Neurons (nodes) */}
            <circle className="neuron" cx="150" cy="150" style={{animationDelay: '0s'}} />
            <circle className="neuron" cx="150" cy="250" style={{animationDelay: '0.2s'}} />
            <circle className="neuron" cx="150" cy="350" style={{animationDelay: '0.4s'}} />
            <circle className="neuron" cx="150" cy="450" style={{animationDelay: '0.6s'}} />
            <circle className="neuron" cx="150" cy="550" style={{animationDelay: '0.8s'}} />
            
            <circle className="neuron" cx="350" cy="250" style={{animationDelay: '1s'}} />
            <circle className="neuron" cx="350" cy="350" style={{animationDelay: '1.2s'}} />
            <circle className="neuron" cx="350" cy="450" style={{animationDelay: '1.4s'}} />
            
            <circle className="neuron" cx="550" cy="250" style={{animationDelay: '1.6s'}} />
            <circle className="neuron" cx="550" cy="350" style={{animationDelay: '1.8s'}} />
            <circle className="neuron" cx="550" cy="450" style={{animationDelay: '2s'}} />

            {/* Data packets moving through network */}
            <circle className="data-packet" cx="150" cy="150">
              <animate attributeName="cx" values="150;350;550" dur="3s" repeatCount="indefinite" />
              <animate attributeName="cy" values="150;250;350" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle className="data-packet" cx="150" cy="350">
              <animate attributeName="cx" values="150;350;550" dur="3s" begin="1s" repeatCount="indefinite" />
              <animate attributeName="cy" values="350;350;450" dur="3s" begin="1s" repeatCount="indefinite" />
            </circle>
          </svg>

          {/* AI Core */}
          <div className="ai-core">
            <div className="core-circle"></div>
            <div className="core-inner"></div>
            <div className="ai-symbol">AI</div>
            
            {/* Thinking indicator */}
            <div className="thinking-dots">
              <div className="thinking-dot"></div>
              <div className="thinking-dot"></div>
              <div className="thinking-dot"></div>
              <div className="thinking-dot"></div>
              <div className="thinking-dot"></div>
            </div>
          </div>

          {/* Text */}
          <div className="neural-text">
            <div className="neural-title">TOKEDEX</div>
            <div className="neural-subtitle">AI-Powered DEX</div>
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
          <NeuralNetworkSplash />
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
