import React, { useState, useEffect } from 'react';

export default function CinematicIntro({ onComplete }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Lock background scrolling while intro plays
    document.body.style.overflow = 'hidden';
    
    // Stage 1: Reveal name (after a very short delay for "PORTFOLIO" to establish)
    const t1 = setTimeout(() => setStage(1), 500);
    
    // Stage 2: Expand and fade out to reveal main site
    const t2 = setTimeout(() => {
      setStage(2);
      // Wait for slide transition, then completely unmount and unlock scroll
      setTimeout(() => {
        document.body.style.overflow = '';
        if (onComplete) onComplete();
      }, 1200);
    }, 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  const nameStr = "IJJI MADHU VENKAT";
  const nameChars = nameStr.split("");

  return (
    <div className={`ci-overlay ${stage === 2 ? 'stage-2' : ''}`}>
      <style>{`
        .ci-overlay {
          position: fixed;
          inset: 0;
          z-index: 999999;
          background: radial-gradient(ellipse at 50% 36%, #fbfdf3 0%, #ebeedc 55%, #dce0cb 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          transition: transform 1.2s cubic-bezier(0.77, 0, 0.175, 1);
          color: #13140f;
          font-family: 'Inter', sans-serif;
          will-change: transform;
        }

        .ci-overlay.stage-2 {
          transform: translateY(-100vh);
          pointer-events: none;
        }

        .ci-content, .ci-ambient {
          transition: opacity 0.6s ease, transform 0.8s cubic-bezier(0.77, 0, 0.175, 1);
          will-change: transform, opacity;
        }

        .ci-overlay.stage-2 .ci-content {
          opacity: 0;
          transform: translateY(-60px);
        }

        .ci-overlay.stage-2 .ci-ambient {
          opacity: 0;
        }

        /* Abstract ambient element reacting gently */
        .ci-ambient {
          position: absolute;
          width: 70vw;
          height: 70vw;
          max-width: 800px;
          max-height: 800px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 0;
          filter: blur(60px);
          opacity: 0.4;
          mix-blend-mode: multiply;
          animation: ambient-drift 8s infinite alternate cubic-bezier(0.45, 0, 0.55, 1);
        }

        @keyframes ambient-drift {
          0% { transform: translate(-50%, -40%) scale(1) rotate(0deg); }
          100% { transform: translate(-50%, -60%) scale(1.1) rotate(20deg); }
        }

        .ci-content {
          position: relative;
          z-index: 10;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .ci-portfolio-label {
          font-size: 11px;
          letter-spacing: 0.4em;
          font-weight: 600;
          text-transform: uppercase;
          color: #555848;
          opacity: 0;
          transform: translateY(10px);
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .ci-name-wrapper {
          font-family: 'Oswald', sans-serif;
          font-size: clamp(32px, 7vw, 110px);
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          display: flex;
          flex-wrap: nowrap;
          white-space: nowrap;
        }

        .ci-char {
          display: inline-block;
          will-change: transform, opacity, filter;
        }

        @keyframes fade-in-up {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Reduced motion fallback */
        @media (prefers-reduced-motion: reduce) {
          .ci-ambient {
            animation: none;
          }
          .ci-overlay {
            transition: opacity 0.5s ease;
            transform: none !important;
          }
          .ci-char {
            transition: opacity 0.5s ease !important;
            transform: none !important;
            filter: none !important;
          }
        }
      `}</style>

      {/* Subtle abstract ambient SVG blob */}
      <svg className="ci-ambient" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c2502f" />
            <stop offset="50%" stopColor="#d9a441" />
            <stop offset="100%" stopColor="#1f6f5c" />
          </linearGradient>
        </defs>
        <path fill="url(#grad1)" d="M45.7,-76.3C58.9,-69.3,69.2,-55.4,75.9,-40.4C82.6,-25.4,85.7,-9.4,83.9,5.7C82.1,20.8,75.4,35.1,65.2,46.2C55,57.3,41.2,65.3,26.4,72.1C11.5,78.9,-4.4,84.4,-19.7,81.4C-35,78.4,-49.6,66.8,-60.9,53.2C-72.2,39.6,-80.1,23.9,-82.9,7.6C-85.7,-8.7,-83.4,-25.6,-74.6,-38.7C-65.8,-51.8,-50.5,-61,-35.8,-67C-21.1,-73,-7,-75.8,7.9,-77.8C22.8,-79.8,32.5,-83.3,45.7,-76.3Z" transform="translate(100 100)" />
      </svg>

      <div className="ci-content">
        <div className="ci-portfolio-label">PORTFOLIO</div>
        
        <div className="ci-name-wrapper">
          {nameChars.map((char, index) => {
            const isVisible = stage >= 1;
            const isSpace = char === ' ';
            
            return (
              <span
                key={index}
                className="ci-char"
                style={{
                  width: isSpace ? '0.25em' : 'auto',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible 
                    ? 'translateY(0) scale(1) rotate(0deg)' 
                    : 'translateY(25px) scale(0.9) rotate(2deg)',
                  filter: isVisible ? 'blur(0px)' : 'blur(8px)',
                  transition: `all 0.85s cubic-bezier(0.22, 1, 0.36, 1) ${index * 0.045}s`
                }}
              >
                {char}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
