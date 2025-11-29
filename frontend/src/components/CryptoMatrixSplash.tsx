import { useState, useEffect } from 'react';
import App from '../App';

// CryptoMatrixSplash component - Matrix-style crypto code rain with blockchain network
export const CryptoMatrixSplash = () => {
  return (
    <>
      <style>{`
        @keyframes blockchainPulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            filter: drop-shadow(0 0 30px rgba(0, 212, 255, 0.8));
          }
          50% {
            transform: translate(-50%, -50%) scale(1.15);
            filter: drop-shadow(0 0 60px rgba(123, 97, 255, 1));
          }
        }

        @keyframes cryptoRain1 {
          0% {
            transform: translateY(-100vh);
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

        @keyframes cryptoRain2 {
          0% {
            transform: translateY(-100vh);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }

        @keyframes nodeConnect {
          0% {
            stroke-dashoffset: 100;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 0.6;
          }
        }

        @keyframes nodePulse {
          0%, 100% {
            r: 8;
            opacity: 0.8;
          }
          50% {
            r: 12;
            opacity: 1;
          }
        }

        @keyframes ethereumSpin {
          0% {
            transform: translate(-50%, -50%) rotateY(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotateY(360deg);
          }
        }

        @keyframes cryptoGlow {
          0%, 100% {
            text-shadow: 
              0 0 10px rgba(0, 212, 255, 0.8),
              0 0 20px rgba(0, 212, 255, 0.6),
              0 0 30px rgba(123, 97, 255, 0.4),
              0 0 40px rgba(123, 97, 255, 0.2);
          }
          50% {
            text-shadow: 
              0 0 20px rgba(0, 212, 255, 1),
              0 0 40px rgba(0, 212, 255, 0.8),
              0 0 60px rgba(123, 97, 255, 0.6),
              0 0 80px rgba(123, 97, 255, 0.4);
          }
        }

        @keyframes hexagonFloat {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes tokenFall {
          0% {
            transform: translateY(-50px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(calc(100vh + 50px)) rotate(360deg);
            opacity: 0;
          }
        }

        .crypto-matrix-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: radial-gradient(ellipse at center, #0a1a2e 0%, #000000 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          z-index: 9999;
        }

        .matrix-rain {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          font-family: 'Courier New', monospace;
          font-size: 14px;
          color: rgba(0, 212, 255, 0.8);
          pointer-events: none;
        }

        .rain-column {
          position: absolute;
          white-space: nowrap;
          text-shadow: 0 0 5px rgba(0, 212, 255, 0.8);
        }

        .rain-column:nth-child(1) { left: 5%; animation: cryptoRain1 3s linear infinite; animation-delay: 0s; }
        .rain-column:nth-child(2) { left: 15%; animation: cryptoRain2 4s linear infinite; animation-delay: 0.3s; }
        .rain-column:nth-child(3) { left: 25%; animation: cryptoRain1 3.5s linear infinite; animation-delay: 0.6s; }
        .rain-column:nth-child(4) { left: 35%; animation: cryptoRain2 4.2s linear infinite; animation-delay: 0.9s; }
        .rain-column:nth-child(5) { left: 45%; animation: cryptoRain1 3.8s linear infinite; animation-delay: 1.2s; }
        .rain-column:nth-child(6) { left: 55%; animation: cryptoRain2 4.5s linear infinite; animation-delay: 1.5s; }
        .rain-column:nth-child(7) { left: 65%; animation: cryptoRain1 3.3s linear infinite; animation-delay: 1.8s; }
        .rain-column:nth-child(8) { left: 75%; animation: cryptoRain2 4.8s linear infinite; animation-delay: 2.1s; }
        .rain-column:nth-child(9) { left: 85%; animation: cryptoRain1 3.6s linear infinite; animation-delay: 2.4s; }
        .rain-column:nth-child(10) { left: 95%; animation: cryptoRain2 4.3s linear infinite; animation-delay: 2.7s; }

        .blockchain-network {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 600px;
          height: 600px;
          transform: translate(-50%, -50%);
        }

        .network-node {
          animation: nodePulse 2s ease-in-out infinite;
        }

        .network-line {
          stroke: rgba(0, 212, 255, 0.4);
          stroke-width: 1;
          stroke-dasharray: 100;
          animation: nodeConnect 2s ease-in-out infinite;
        }

        .crypto-symbol-container {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 200px;
          height: 200px;
          animation: blockchainPulse 3s ease-in-out infinite;
        }

        .ethereum-diamond {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 120px;
          height: 150px;
          transform-style: preserve-3d;
          animation: ethereumSpin 8s linear infinite;
        }

        .diamond-top {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 60px solid transparent;
          border-right: 60px solid transparent;
          border-bottom: 75px solid rgba(0, 212, 255, 0.8);
          filter: drop-shadow(0 0 20px rgba(0, 212, 255, 0.6));
        }

        .diamond-bottom {
          position: absolute;
          top: 75px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 60px solid transparent;
          border-right: 60px solid transparent;
          border-top: 75px solid rgba(123, 97, 255, 0.8);
          filter: drop-shadow(0 0 20px rgba(123, 97, 255, 0.6));
        }

        .diamond-shine {
          position: absolute;
          top: 30%;
          left: 40%;
          width: 0;
          height: 0;
          border-left: 15px solid transparent;
          border-right: 15px solid transparent;
          border-bottom: 20px solid rgba(255, 255, 255, 0.6);
          filter: blur(2px);
        }

        .crypto-particles {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .crypto-token {
          position: absolute;
          font-size: 24px;
          opacity: 0;
        }

        .crypto-token:nth-child(1) { left: 10%; animation: tokenFall 4s ease-in infinite; animation-delay: 0s; }
        .crypto-token:nth-child(2) { left: 30%; animation: tokenFall 5s ease-in infinite; animation-delay: 0.8s; }
        .crypto-token:nth-child(3) { left: 50%; animation: tokenFall 4.5s ease-in infinite; animation-delay: 1.6s; }
        .crypto-token:nth-child(4) { left: 70%; animation: tokenFall 5.2s ease-in infinite; animation-delay: 2.4s; }
        .crypto-token:nth-child(5) { left: 90%; animation: tokenFall 4.8s ease-in infinite; animation-delay: 3.2s; }

        .hexagon-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 180px;
          height: 180px;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          border: 3px solid rgba(0, 212, 255, 0.4);
          animation: hexagonFloat 4s ease-in-out infinite;
        }

        .crypto-text {
          position: absolute;
          bottom: 100px;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
        }

        .crypto-title {
          font-size: 4rem;
          font-weight: 900;
          color: rgba(0, 212, 255, 1);
          font-family: 'Courier New', monospace;
          letter-spacing: 10px;
          animation: cryptoGlow 2s ease-in-out infinite;
          margin-bottom: 12px;
        }

        .crypto-subtitle {
          font-size: 1.1rem;
          color: rgba(123, 97, 255, 0.9);
          font-family: 'Courier New', monospace;
          letter-spacing: 8px;
          text-transform: uppercase;
          text-shadow: 0 0 10px rgba(123, 97, 255, 0.8);
        }

        .blockchain-hash {
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          font-family: 'Courier New', monospace;
          font-size: 12px;
          color: rgba(0, 212, 255, 0.5);
          letter-spacing: 2px;
        }

        @media (max-width: 768px) {
          .blockchain-network {
            width: 400px;
            height: 400px;
          }

          .crypto-symbol-container {
            width: 150px;
            height: 150px;
          }

          .ethereum-diamond {
            width: 90px;
            height: 110px;
          }

          .diamond-top {
            border-left: 45px solid transparent;
            border-right: 45px solid transparent;
            border-bottom: 55px solid rgba(0, 212, 255, 0.8);
          }

          .diamond-bottom {
            top: 55px;
            border-left: 45px solid transparent;
            border-right: 45px solid transparent;
            border-top: 55px solid rgba(123, 97, 255, 0.8);
          }

          .crypto-title {
            font-size: 2.5rem;
            letter-spacing: 6px;
          }

          .crypto-subtitle {
            font-size: 0.9rem;
            letter-spacing: 4px;
          }
        }
      `}</style>

      <div className="crypto-matrix-container">
        {/* Blockchain hash header */}
        <div className="blockchain-hash">
          0x7a3f9c2b8e1d4a6f...blockchain_verified
        </div>

        {/* Matrix code rain */}
        <div className="matrix-rain">
          <div className="rain-column">01001001<br/>11010011<br/>10101010<br/>01110101<br/>11001100<br/>10010110</div>
          <div className="rain-column">ETH<br/>BTC<br/>SOL<br/>MATIC<br/>AVAX<br/>DOT</div>
          <div className="rain-column">0xA3f9<br/>0xB2c1<br/>0xC7d8<br/>0xD1e4<br/>0xE9f2</div>
          <div className="rain-column">₿<br/>Ξ<br/>◎<br/>⬡<br/>▲</div>
          <div className="rain-column">BLOCK<br/>CHAIN<br/>TOKEN<br/>DEFI<br/>WEB3</div>
          <div className="rain-column">11100101<br/>10011010<br/>01101111<br/>11010001<br/>10101100</div>
          <div className="rain-column">0x1a2b<br/>0x3c4d<br/>0x5e6f<br/>0x7g8h<br/>0x9i0j</div>
          <div className="rain-column">GAS<br/>FEE<br/>MINT<br/>SWAP<br/>BURN</div>
          <div className="rain-column">10110011<br/>01001110<br/>11101001<br/>00110101<br/>11010111</div>
          <div className="rain-column">HASH<br/>NODE<br/>P2P<br/>DAO<br/>NFT</div>
        </div>

        {/* Falling crypto symbols */}
        <div className="crypto-particles">
          <div className="crypto-token">₿</div>
          <div className="crypto-token">Ξ</div>
          <div className="crypto-token">◎</div>
          <div className="crypto-token">⬡</div>
          <div className="crypto-token">▲</div>
        </div>

        {/* Blockchain network connections */}
        <div className="blockchain-network">
          <svg width="600" height="600" viewBox="0 0 600 600">
            <defs>
              <radialGradient id="nodeGradient">
                <stop offset="0%" stopColor="rgba(0, 212, 255, 1)" />
                <stop offset="100%" stopColor="rgba(123, 97, 255, 0.6)" />
              </radialGradient>
            </defs>

            {/* Network lines */}
            <line className="network-line" x1="150" y1="150" x2="300" y2="300" />
            <line className="network-line" x1="450" y1="150" x2="300" y2="300" />
            <line className="network-line" x1="150" y1="450" x2="300" y2="300" />
            <line className="network-line" x1="450" y1="450" x2="300" y2="300" />
            <line className="network-line" x1="150" y1="150" x2="450" y2="150" />
            <line className="network-line" x1="450" y1="150" x2="450" y2="450" />
            <line className="network-line" x1="450" y1="450" x2="150" y2="450" />
            <line className="network-line" x1="150" y1="450" x2="150" y2="150" />

            {/* Network nodes */}
            <circle className="network-node" cx="150" cy="150" r="8" fill="url(#nodeGradient)" />
            <circle className="network-node" cx="450" cy="150" r="8" fill="url(#nodeGradient)" />
            <circle className="network-node" cx="150" cy="450" r="8" fill="url(#nodeGradient)" />
            <circle className="network-node" cx="450" cy="450" r="8" fill="url(#nodeGradient)" />
            <circle className="network-node" cx="300" cy="300" r="12" fill="url(#nodeGradient)" />
          </svg>
        </div>

        {/* Hexagon ring */}
        <div className="hexagon-ring"></div>

        {/* Ethereum-style diamond logo */}
        <div className="crypto-symbol-container">
          <div className="ethereum-diamond">
            <div className="diamond-top"></div>
            <div className="diamond-bottom"></div>
            <div className="diamond-shine"></div>
          </div>
        </div>

        {/* Text */}
        <div className="crypto-text">
          <div className="crypto-title">TOKEDEX</div>
          <div className="crypto-subtitle">Decentralized Protocol</div>
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
          <CryptoMatrixSplash />
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
