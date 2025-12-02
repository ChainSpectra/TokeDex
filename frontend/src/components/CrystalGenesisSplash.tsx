import { useState, useEffect } from 'react';
import App from '../App';

// CrystalGenesisPlash component - crystalline formation with dimensional rifts
export const CrystalGenesisSplash = () => {
  return (
    <>
      <style>{`
        @keyframes crystalForm {
          0% {
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
            opacity: 0;
          }
          40% {
            opacity: 1;
          }
          60% {
            transform: translate(-50%, -50%) scale(1.2) rotate(180deg);
          }
          100% {
            transform: translate(-50%, -50%) scale(1) rotate(360deg);
            opacity: 1;
          }
        }

        @keyframes quantumPulse {
          0%, 100% {
            box-shadow: 
              0 0 80px rgba(0, 212, 255, 0.8),
              0 0 120px rgba(123, 97, 255, 0.6),
              0 0 160px rgba(255, 51, 102, 0.4);
          }
          50% {
            box-shadow: 
              0 0 120px rgba(0, 212, 255, 1),
              0 0 180px rgba(123, 97, 255, 0.9),
              0 0 240px rgba(255, 51, 102, 0.7);
          }
        }

        @keyframes lightRay {
          0% {
            transform: rotate(0deg) scaleX(0);
            opacity: 0;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            transform: rotate(360deg) scaleX(1);
            opacity: 0;
          }
        }

        @keyframes shardFloat1 {
          0%, 100% {
            transform: translate(-120px, -140px) rotate(0deg);
          }
          50% {
            transform: translate(-120px, -160px) rotate(180deg);
          }
        }

        @keyframes shardFloat2 {
          0%, 100% {
            transform: translate(130px, -130px) rotate(0deg);
          }
          50% {
            transform: translate(130px, -150px) rotate(-180deg);
          }
        }

        @keyframes shardFloat3 {
          0%, 100% {
            transform: translate(-140px, 120px) rotate(0deg);
          }
          50% {
            transform: translate(-140px, 140px) rotate(180deg);
          }
        }

        @keyframes shardFloat4 {
          0%, 100% {
            transform: translate(125px, 135px) rotate(0deg);
          }
          50% {
            transform: translate(125px, 155px) rotate(-180deg);
          }
        }

        @keyframes dimensionalRift {
          0%, 100% {
            stroke-dashoffset: 200;
            opacity: 0.3;
          }
          50% {
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }

        @keyframes energyFlow {
          0% {
            offset-distance: 0%;
            opacity: 0;
          }
          10%, 90% {
            opacity: 1;
          }
          100% {
            offset-distance: 100%;
            opacity: 0;
          }
        }

        @keyframes hexShield {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            opacity: 0.6;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.1) rotate(60deg);
            opacity: 1;
          }
        }

        @keyframes prismGlow {
          0%, 100% {
            filter: drop-shadow(0 0 30px rgba(0, 212, 255, 0.8))
                    drop-shadow(0 0 60px rgba(123, 97, 255, 0.6))
                    drop-shadow(0 0 90px rgba(255, 51, 102, 0.4));
          }
          33% {
            filter: drop-shadow(0 0 40px rgba(123, 97, 255, 1))
                    drop-shadow(0 0 80px rgba(255, 51, 102, 0.8))
                    drop-shadow(0 0 120px rgba(0, 212, 255, 0.6));
          }
          66% {
            filter: drop-shadow(0 0 50px rgba(255, 51, 102, 0.9))
                    drop-shadow(0 0 100px rgba(0, 212, 255, 0.7))
                    drop-shadow(0 0 150px rgba(123, 97, 255, 0.5));
          }
        }

        @keyframes logoReveal {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.3);
            filter: blur(20px);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
            filter: blur(0);
          }
        }

        @keyframes textShimmer {
          0%, 100% {
            background-position: -200% center;
          }
          50% {
            background-position: 200% center;
          }
        }

        @keyframes particleStream {
          0% {
            transform: translateY(100vh) scale(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-100vh) scale(0.3) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes cosmicDust {
          0%, 100% {
            opacity: 0.2;
            transform: translateY(0) translateX(0);
          }
          50% {
            opacity: 0.6;
            transform: translateY(-30px) translateX(20px);
          }
        }

        @keyframes nebulaPulse {
          0%, 100% {
            transform: scale(1) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.5) rotate(180deg);
            opacity: 0.6;
          }
        }

        @keyframes energyWave {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(2.5);
            opacity: 0;
          }
        }

        @keyframes blockchainFloat {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 1;
          }
        }

        @keyframes dataTransfer {
          0% {
            transform: translateX(-100%) scale(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(100%) scale(1);
            opacity: 0;
          }
        }

        .crystal-splash-container {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        .crystal-splash-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: radial-gradient(ellipse at center, 
            #0f0528 0%, 
            #0a0320 40%, 
            #000000 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          z-index: 9999;
        }

        .dimensional-grid {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0;
        }

        .particle-stream {
          position: absolute;
          width: 6px;
          height: 60px;
          background: linear-gradient(to bottom, 
            transparent, 
            rgba(0, 212, 255, 0.9), 
            rgba(123, 97, 255, 0.8),
            rgba(255, 51, 102, 0.6)
          );
          border-radius: 3px;
          box-shadow: 0 0 20px rgba(0, 212, 255, 0.8);
          animation: particleStream 4s ease-in-out infinite;
        }

        .particle-stream:nth-child(1) { left: 10%; animation-delay: 0s; }
        .particle-stream:nth-child(2) { left: 25%; animation-delay: 0.5s; }
        .particle-stream:nth-child(3) { left: 40%; animation-delay: 1s; }
        .particle-stream:nth-child(4) { left: 60%; animation-delay: 1.5s; }
        .particle-stream:nth-child(5) { left: 75%; animation-delay: 2s; }
        .particle-stream:nth-child(6) { left: 90%; animation-delay: 2.5s; }

        .cosmic-dust {
          position: absolute;
          width: 3px;
          height: 3px;
          background: rgba(0, 212, 255, 0.8);
          border-radius: 50%;
          box-shadow: 0 0 15px rgba(0, 212, 255, 0.9);
          animation: cosmicDust 8s ease-in-out infinite;
        }

        .nebula-cloud {
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle,
            rgba(123, 97, 255, 0.3) 0%,
            rgba(255, 51, 102, 0.2) 50%,
            transparent 100%
          );
          filter: blur(60px);
          animation: nebulaPulse 10s ease-in-out infinite;
        }

        .energy-wave {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 300px;
          height: 300px;
          border: 2px solid rgba(0, 212, 255, 0.6);
          border-radius: 50%;
          animation: energyWave 3s ease-out infinite;
        }

        .energy-wave:nth-child(2) {
          animation-delay: 1s;
        }

        .energy-wave:nth-child(3) {
          animation-delay: 2s;
        }

        .blockchain-hex {
          position: absolute;
          width: 40px;
          height: 46px;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          background: linear-gradient(135deg,
            rgba(0, 212, 255, 0.4),
            rgba(123, 97, 255, 0.3)
          );
          border: 1px solid rgba(0, 212, 255, 0.6);
          box-shadow: 
            0 0 20px rgba(0, 212, 255, 0.5),
            inset 0 0 20px rgba(255, 255, 255, 0.1);
          animation: blockchainFloat 6s ease-in-out infinite;
        }

        .data-stream {
          position: absolute;
          width: 200px;
          height: 2px;
          background: linear-gradient(90deg,
            transparent,
            rgba(0, 212, 255, 0.8),
            rgba(123, 97, 255, 0.6),
            transparent
          );
          animation: dataTransfer 4s ease-in-out infinite;
        }

        .crystal-core-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 700px;
          height: 700px;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: crystalForm 2s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }

        .hex-shield {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 300px;
          height: 300px;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          border: 3px solid rgba(0, 212, 255, 0.7);
          box-shadow: 
            inset 0 0 30px rgba(0, 212, 255, 0.3),
            0 0 40px rgba(0, 212, 255, 0.4);
          animation: hexShield 4s ease-in-out infinite;
        }

        .hex-shield:nth-child(2) {
          width: 350px;
          height: 350px;
          border-color: rgba(123, 97, 255, 0.6);
          box-shadow: 
            inset 0 0 30px rgba(123, 97, 255, 0.3),
            0 0 40px rgba(123, 97, 255, 0.4);
          animation-delay: 0.5s;
        }

        .hex-shield:nth-child(3) {
          width: 400px;
          height: 400px;
          border-color: rgba(255, 51, 102, 0.5);
          box-shadow: 
            inset 0 0 30px rgba(255, 51, 102, 0.3),
            0 0 40px rgba(255, 51, 102, 0.4);
          animation-delay: 1s;
        }

        .orbit-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 450px;
          height: 450px;
          border: 3px solid transparent;
          border-top-color: rgba(0, 212, 255, 0.8);
          border-right-color: rgba(123, 97, 255, 0.6);
          border-radius: 50%;
          box-shadow: 
            0 0 30px rgba(0, 212, 255, 0.5),
            inset 0 0 30px rgba(0, 212, 255, 0.3);
          animation: orbitRing 8s linear infinite;
        }

        .orbit-ring:nth-child(2) {
          width: 520px;
          height: 520px;
          border-top-color: rgba(255, 51, 102, 0.7);
          border-right-color: rgba(123, 97, 255, 0.5);
          box-shadow: 
            0 0 30px rgba(255, 51, 102, 0.5),
            inset 0 0 30px rgba(255, 51, 102, 0.3);
          animation-duration: 10s;
          animation-direction: reverse;
        }

        .crystal-logo {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 240px;
          height: 240px;
          animation: logoReveal 1.5s ease-out 0.5s backwards, prismGlow 4s ease-in-out infinite, quantumPulse 3s ease-in-out infinite;
        }

        .light-ray {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 400px;
          height: 3px;
          background: linear-gradient(90deg,
            transparent,
            rgba(0, 212, 255, 0.8),
            rgba(255, 255, 255, 1),
            rgba(255, 51, 102, 0.8),
            transparent
          );
          transform-origin: 0 50%;
          animation: lightRay 8s linear infinite;
          filter: blur(1px);
        }

        .light-ray:nth-child(2) {
          animation-delay: 2s;
        }

        .light-ray:nth-child(3) {
          animation-delay: 4s;
        }

        .light-ray:nth-child(4) {
          animation-delay: 6s;
        }

        .prism-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 160px;
          height: 160px;
          clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
          background: linear-gradient(135deg,
            rgba(0, 212, 255, 1) 0%,
            rgba(123, 97, 255, 0.95) 50%,
            rgba(255, 51, 102, 0.9) 100%
          );
          box-shadow: 
            inset 0 0 60px rgba(255, 255, 255, 0.7),
            inset 0 0 30px rgba(0, 212, 255, 0.5),
            0 0 100px rgba(0, 212, 255, 1),
            0 0 150px rgba(123, 97, 255, 0.9),
            0 0 200px rgba(255, 51, 102, 0.7),
            0 0 250px rgba(0, 212, 255, 0.5);
        }

        .prism-shine {
          position: absolute;
          top: 20%;
          left: 30%;
          width: 40%;
          height: 30%;
          background: radial-gradient(ellipse,
            rgba(255, 255, 255, 0.8) 0%,
            transparent 70%
          );
          border-radius: 50%;
          filter: blur(3px);
        }

        .logo-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 3.5rem;
          font-weight: 900;
          color: white;
          text-shadow: 
            0 0 40px rgba(0, 212, 255, 1),
            0 0 80px rgba(123, 97, 255, 1),
            0 0 120px rgba(255, 51, 102, 1),
            0 0 160px rgba(0, 212, 255, 0.8),
            0 5px 10px rgba(0, 0, 0, 0.9);
          letter-spacing: 4px;
          z-index: 10;
          filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.8));
        }

        .crystal-shard {
          position: absolute;
          width: 60px;
          height: 80px;
          clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
          background: linear-gradient(135deg,
            rgba(0, 212, 255, 0.7),
            rgba(123, 97, 255, 0.5)
          );
          filter: drop-shadow(0 0 15px rgba(0, 212, 255, 0.8));
        }

        .crystal-shard:nth-child(1) {
          animation: shardFloat1 4s ease-in-out infinite;
        }

        .crystal-shard:nth-child(2) {
          animation: shardFloat2 4.5s ease-in-out infinite;
        }

        .crystal-shard:nth-child(3) {
          animation: shardFloat3 5s ease-in-out infinite;
        }

        .crystal-shard:nth-child(4) {
          animation: shardFloat4 4.3s ease-in-out infinite;
        }

        .dimensional-lines {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .rift-line {
          stroke: rgba(0, 212, 255, 0.6);
          stroke-width: 2;
          fill: none;
          stroke-dasharray: 200;
          animation: dimensionalRift 3s ease-in-out infinite;
        }

        .energy-orb {
          fill: rgba(255, 51, 102, 0.9);
          r: 5;
          filter: drop-shadow(0 0 10px rgba(255, 51, 102, 1));
        }

        .title-container {
          position: absolute;
          bottom: -140px;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          width: 100%;
          animation: logoReveal 1.5s ease-out 0.8s backwards;
        }

        .main-title {
          font-size: 6rem;
          font-weight: 900;
          background: linear-gradient(90deg,
            #00D4FF 0%,
            #7B61FF 25%,
            #FF3366 50%,
            #7B61FF 75%,
            #00D4FF 100%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: 24px;
          padding-left: 24px;
          margin-bottom: 20px;
          animation: textShimmer 4s linear infinite;
          filter: drop-shadow(0 0 40px rgba(0, 212, 255, 0.8));
        }

        .sub-title {
          font-size: 1.5rem;
          color: rgba(0, 212, 255, 0.95);
          letter-spacing: 16px;
          padding-left: 16px;
          text-transform: uppercase;
          font-weight: 600;
          text-shadow: 
            0 0 25px rgba(0, 212, 255, 0.9),
            0 0 50px rgba(123, 97, 255, 0.7);
        }

        @media (max-width: 768px) {
          .crystal-core-container {
            width: 450px;
            height: 450px;
          }

          .crystal-logo {
            width: 180px;
            height: 180px;
          }

          .prism-center {
            width: 110px;
            height: 110px;
          }

          .logo-text {
            font-size: 2.2rem;
          }

          .main-title {
            font-size: 3.5rem;
            letter-spacing: 12px;
            padding-left: 12px;
          }

          .sub-title {
            font-size: 1.1rem;
            letter-spacing: 8px;
            padding-left: 8px;
          }

          .title-container {
            bottom: -100px;
          }

          .hex-shield {
            width: 220px;
            height: 220px;
          }

          .hex-shield:nth-child(2) {
            width: 260px;
            height: 260px;
          }

          .hex-shield:nth-child(3) {
            width: 300px;
            height: 300px;
          }

          .nebula-cloud {
            width: 200px;
            height: 200px;
          }
        }
      `}</style>

      <div className="crystal-splash-container">
        {/* Nebula clouds */}
        <div className="nebula-cloud" style={{top: '10%', left: '15%'}}></div>
        <div className="nebula-cloud" style={{top: '60%', right: '20%', animationDelay: '3s'}}></div>
        <div className="nebula-cloud" style={{bottom: '15%', left: '25%', animationDelay: '6s'}}></div>

        {/* Cosmic dust particles */}
        {Array.from({length: 40}).map((_, i) => (
          <div 
            key={`dust-${i}`}
            className="cosmic-dust" 
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          ></div>
        ))}

        {/* Particle streams */}
        <div className="particle-stream"></div>
        <div className="particle-stream"></div>
        <div className="particle-stream"></div>
        <div className="particle-stream"></div>
        <div className="particle-stream"></div>
        <div className="particle-stream"></div>

        {/* Main crystal formation */}
        <div className="crystal-core-container">
          {/* Energy waves */}
          <div className="energy-wave"></div>
          <div className="energy-wave"></div>
          <div className="energy-wave"></div>

          {/* Blockchain hexagons */}
          <div className="blockchain-hex" style={{top: '15%', left: '20%', animationDelay: '0s'}}></div>
          <div className="blockchain-hex" style={{top: '20%', right: '18%', animationDelay: '1s'}}></div>
          <div className="blockchain-hex" style={{bottom: '18%', left: '22%', animationDelay: '2s'}}></div>
          <div className="blockchain-hex" style={{bottom: '22%', right: '20%', animationDelay: '3s'}}></div>
          <div className="blockchain-hex" style={{top: '50%', left: '10%', animationDelay: '4s'}}></div>
          <div className="blockchain-hex" style={{top: '50%', right: '10%', animationDelay: '5s'}}></div>

          {/* Data streams */}
          <div className="data-stream" style={{top: '30%', left: '20%', animationDelay: '0s'}}></div>
          <div className="data-stream" style={{top: '50%', left: '15%', animationDelay: '1.5s'}}></div>
          <div className="data-stream" style={{bottom: '35%', right: '10%', animationDelay: '3s'}}></div>

          {/* Orbit rings */}
          <div className="orbit-ring"></div>
          <div className="orbit-ring"></div>

          {/* Hexagonal shields */}
          <div className="hex-shield"></div>
          <div className="hex-shield"></div>
          <div className="hex-shield"></div>

          {/* Dimensional connection lines */}
          <svg className="dimensional-lines" viewBox="0 0 600 600">
            <defs>
              <path id="riftPath1" d="M 150,150 Q 300,100 450,150" />
              <path id="riftPath2" d="M 150,450 Q 300,500 450,450" />
              <path id="riftPath3" d="M 150,150 Q 100,300 150,450" />
              <path id="riftPath4" d="M 450,150 Q 500,300 450,450" />
            </defs>

            {/* Connection lines */}
            <path className="rift-line" d="M 150,150 Q 300,100 450,150" style={{animationDelay: '0s'}} />
            <path className="rift-line" d="M 450,150 Q 500,300 450,450" style={{animationDelay: '0.3s'}} />
            <path className="rift-line" d="M 450,450 Q 300,500 150,450" style={{animationDelay: '0.6s'}} />
            <path className="rift-line" d="M 150,450 Q 100,300 150,150" style={{animationDelay: '0.9s'}} />

            {/* Energy orbs traveling along paths */}
            <circle className="energy-orb" r="5">
              <animateMotion dur="3s" repeatCount="indefinite">
                <mpath href="#riftPath1" />
              </animateMotion>
            </circle>
            <circle className="energy-orb" r="5">
              <animateMotion dur="3s" begin="0.5s" repeatCount="indefinite">
                <mpath href="#riftPath2" />
              </animateMotion>
            </circle>
          </svg>

          {/* Floating crystal shards */}
          <div className="crystal-shard"></div>
          <div className="crystal-shard"></div>
          <div className="crystal-shard"></div>
          <div className="crystal-shard"></div>

          {/* Light rays */}
          <div className="light-ray"></div>
          <div className="light-ray"></div>
          <div className="light-ray"></div>
          <div className="light-ray"></div>

          {/* Center crystal logo */}
          <div className="crystal-logo">
            <div className="prism-center">
              <div className="prism-shine"></div>
            </div>
            <div className="logo-text">Q</div>
          </div>

          {/* Title text */}
          <div className="title-container">
            <div className="main-title">TOKEDEX</div>
            <div className="sub-title">Genesis Protocol</div>
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
    }, 3000);

    const removeTimer = setTimeout(() => {
      setShowSplash(false);
    }, 3500);

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
          <CrystalGenesisSplash />
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
