import React from 'react';

const STEPS = [
  {
    number: '01',
    title: 'Start Your Space',
    desc: 'Create a workspace in minutes and add the details your team needs to begin.',
    theme: 'coral'
  },
  {
    number: '02',
    title: 'Shape the Brief',
    desc: 'Turn your goals into a clear plan with priorities, owners, and practical outcomes.',
    theme: 'blue'
  },
  {
    number: '03',
    title: 'Choose a Route',
    desc: 'Pick the workflow that best matches your timeline, scope, and preferred pace.',
    theme: 'mint'
  },
  {
    number: '04',
    title: 'Build Together',
    desc: 'Move from idea to execution while keeping reviews, notes, and decisions aligned.',
    theme: 'coral'
  },
  {
    number: '05',
    title: 'Measure Progress',
    desc: 'Follow every milestone in real time and see how the work improves over time.',
    theme: 'blue'
  }
];

const THEMES = {
  coral: {
    bg: 'linear-gradient(145deg, #fffcfb, #fff0ef)',
    border: 'rgba(255, 180, 175, 0.4)',
    accent: '#f43f5e'
  },
  blue: {
    bg: 'linear-gradient(145deg, #f7fbff, #eaf4ff)',
    border: 'rgba(186, 230, 253, 0.5)',
    accent: '#0ea5e9'
  },
  mint: {
    bg: 'linear-gradient(145deg, #f8fdfa, #e6fcf0)',
    border: 'rgba(167, 243, 208, 0.5)',
    accent: '#10b981'
  }
};

const PinIcon = ({ color }) => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15.5 3.5C15.5 3.5 14.5 4.5 14.5 6.5C14.5 8.5 16 10 17.5 11.5L13.5 15.5L12 21L10.5 15.5L6.5 11.5C8 10 9.5 8.5 9.5 6.5C9.5 4.5 8.5 3.5 8.5 3.5H15.5Z"
      fill={color}
    />
    <path d="M12 21L9 24" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default function ProcessTimeline() {
  const getCardStyle = (index) => {
    // Zig-zag positions for desktop
    // Card 1: left, top
    // Card 2: right, lower
    // Card 3: left, lower...
    const isLeft = index % 2 === 0;
    const top = index * 230; // 0, 230, 460, 690, 920
    const left = isLeft ? '10%' : '60%';
    const rotate = isLeft ? 'rotate(8deg)' : 'rotate(-8deg)';

    return {
      top: `${top}px`,
      left,
      '--hover-rotate': rotate,
      transform: rotate,
    };
  };

  return (
    <div className="pt-wrapper">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Inter:wght@400;600&display=swap');

        .pt-wrapper {
          position: relative;
          width: 100%;
          background: radial-gradient(ellipse at 50% 36%, #fbfdf3 0%, #ebeedc 55%, #dce0cb 100%);
          padding: 80px 20px;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
        }

        /* Ruled paper lines */
        .pt-bg-lines {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(19, 20, 15, 0.05) 1px, transparent 1px);
          background-size: 100% 32px;
          pointer-events: none;
          z-index: 1;
        }

        /* Edge fades */
        .pt-edge-fade-left,
        .pt-edge-fade-right {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 15vw;
          z-index: 2;
          pointer-events: none;
        }
        .pt-edge-fade-left {
          left: 0;
          background: linear-gradient(to right, #ebeedc, transparent);
        }
        .pt-edge-fade-right {
          right: 0;
          background: linear-gradient(to left, #ebeedc, transparent);
        }

        .pt-container {
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
          height: 1150px;
          z-index: 10;
        }

        /* Dashed Path */
        .pt-svg-path {
          position: absolute;
          top: 140px;
          left: 0;
          width: 100%;
          height: 920px;
          z-index: 1;
          pointer-events: none;
        }
        .pt-path-line {
          fill: none;
          stroke: #d1d5db;
          stroke-width: 2px;
          stroke-linecap: round;
          stroke-dasharray: 8 6;
          animation: pt-dash-flow 3s linear infinite;
        }

        @keyframes pt-dash-flow {
          from { stroke-dashoffset: 14; }
          to { stroke-dashoffset: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pt-path-line {
            animation: none;
          }
        }

        /* Cards */
        .pt-card {
          position: absolute;
          width: 280px;
          padding: 8px;
          border-radius: 28px;
          background-color: rgba(255, 255, 255, 0.98);
          border: 1px solid rgba(0, 0, 0, 0.04);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.03),
                      0 12px 25px -4px rgba(0, 0, 0, 0.06),
                      0 30px 50px -15px rgba(0, 0, 0, 0.08);
          z-index: 5;
          backdrop-filter: blur(8px);
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.15),
                      box-shadow 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.15),
                      z-index 0s;
          cursor: default;
        }

        .pt-card:hover {
          z-index: 20;
          transform: var(--hover-rotate) translateY(-6px) scale(1.06) !important;
          box-shadow: 0 10px 20px -2px rgba(0, 0, 0, 0.04),
                      0 25px 40px -5px rgba(0, 0, 0, 0.08),
                      0 45px 70px -15px rgba(0, 0, 0, 0.12);
        }

        .pt-card-inner {
          position: relative;
          border-radius: 20px;
          padding: 44px 24px 28px;
          border: 1px solid;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          box-shadow: inset 1px 1px 0px rgba(255, 255, 255, 0.8),
                      inset -1px -1px 0px rgba(0, 0, 0, 0.02);
        }

        .pt-pin {
          position: absolute;
          top: -18px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          filter: drop-shadow(0px 8px 6px rgba(0, 0, 0, 0.18));
          transition: transform 0.3s ease;
        }

        .pt-card:hover .pt-pin {
          transform: translateX(-50%) translateY(-2px) scale(1.05);
        }

        .pt-card-num {
          font-family: 'Caveat', cursive;
          font-size: 42px;
          line-height: 1;
          margin-bottom: 20px;
          opacity: 0.9;
          transform: rotate(-3deg);
        }

        .pt-card-title {
          font-size: 22px;
          font-weight: 700;
          line-height: 1.2;
          color: #111827;
          margin: 0 0 14px 0;
          letter-spacing: -0.02em;
        }

        .pt-card-desc {
          font-size: 14.5px;
          line-height: 1.5;
          color: #4b5563;
          letter-spacing: -0.01em;
          margin: 0;
        }

        /* Mobile Layout */
        .pt-svg-path-mobile {
          display: none;
        }

        @media (max-width: 768px) {
          .pt-wrapper {
            padding: 60px 20px;
          }
          .pt-container {
            height: auto;
            display: flex;
            flex-direction: column;
            gap: 48px;
            align-items: center;
            position: relative;
          }
          .pt-card {
            position: relative;
            top: auto !important;
            left: auto !important;
            width: 100%;
            max-width: 360px;
            transform: none !important;
            z-index: 5;
          }
          .pt-card:hover {
            transform: translateY(-4px) scale(1.02) !important;
            box-shadow: 0 15px 30px rgba(0,0,0,0.1);
          }
          .pt-svg-path {
            display: none;
          }
          .pt-svg-path-mobile {
            display: block;
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 4px;
            height: 100%;
            z-index: 1;
            pointer-events: none;
          }
        }
      `}</style>

      <div className="pt-bg-lines"></div>
      <div className="pt-edge-fade-left"></div>
      <div className="pt-edge-fade-right"></div>

      <div className="pt-container">
        {/* Curved Dashed Path for Desktop */}
        <svg className="pt-svg-path" viewBox="0 0 1000 920" preserveAspectRatio="none">
          <path
            className="pt-path-line"
            d="M 380 0 
               C 600 0, 850 115, 850 230 
               C 850 345, 150 345, 150 460
               C 150 575, 850 575, 850 690
               C 850 805, 150 805, 150 920"
          />
        </svg>

        {/* Vertical Dashed Path for Mobile */}
        <svg className="pt-svg-path-mobile" viewBox="0 0 4 1000" preserveAspectRatio="none">
          <path
            className="pt-path-line"
            d="M 2 0 L 2 1000"
          />
        </svg>

        {STEPS.map((step, index) => {
          const theme = THEMES[step.theme];
          const positionStyles = getCardStyle(index);

          return (
            <div key={step.number} className="pt-card" style={positionStyles}>
              <div
                className="pt-card-inner"
                style={{
                  background: theme.bg,
                  borderColor: theme.border,
                }}
              >
                <div className="pt-pin">
                  <PinIcon color={theme.accent} />
                </div>
                <div className="pt-card-num" style={{ color: theme.accent }}>
                  {step.number}
                </div>
                <h3 className="pt-card-title">{step.title}</h3>
                <p className="pt-card-desc">{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
