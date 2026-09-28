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
    bg: '#fff1f0',
    border: '#ffccc7',
    accent: '#ff4d4f'
  },
  blue: {
    bg: '#e6f4ff',
    border: '#91caff',
    accent: '#1677ff'
  },
  mint: {
    bg: '#f6ffed',
    border: '#b7eb8f',
    accent: '#52c41a'
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
          padding: 80px 20px;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
        }

        /* Ruled paper lines */
        .pt-bg-lines {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px);
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
          background: linear-gradient(to right, #fbfdf3, transparent);
        }
        .pt-edge-fade-right {
          right: 0;
          background: linear-gradient(to left, #fbfdf3, transparent);
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
          border-radius: 25px;
          background-color: #ffffff;
          border: 1px solid rgba(0,0,0,0.05);
          box-shadow: 0 10px 20px rgba(0,0,0,0.05), 0 2px 5px rgba(0,0,0,0.02);
          z-index: 5;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), z-index 0s;
          cursor: default;
        }

        .pt-card:hover {
          z-index: 20;
          transform: var(--hover-rotate) scale(1.05) !important;
        }

        .pt-card-inner {
          position: relative;
          border-radius: 15px;
          padding: 40px 20px 24px;
          border: 1px solid;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .pt-pin {
          position: absolute;
          top: -16px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
        }

        .pt-card-num {
          font-family: 'Caveat', cursive;
          font-size: 36px;
          line-height: 1;
          margin-bottom: 24px;
        }

        .pt-card-title {
          font-size: 24px;
          font-weight: 600;
          line-height: 1.1;
          color: #1f2937;
          margin: 0 0 12px 0;
        }

        .pt-card-desc {
          font-size: 14px;
          line-height: 20px;
          color: #6b7280;
          letter-spacing: -0.01em;
          margin: 0;
        }

        /* Mobile Layout */
        @media (max-width: 768px) {
          .pt-container {
            height: auto;
            display: flex;
            flex-direction: column;
            gap: 32px;
            align-items: center;
          }
          .pt-card {
            position: relative;
            top: auto !important;
            left: auto !important;
            width: 100%;
            max-width: 320px;
            transform: none !important;
          }
          .pt-card:hover {
            transform: scale(1.02) !important;
          }
          .pt-svg-path {
            display: none;
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

        {STEPS.map((step, index) => {
          const theme = THEMES[step.theme];
          const positionStyles = getCardStyle(index);

          return (
            <div key={step.number} className="pt-card" style={positionStyles}>
              <div
                className="pt-card-inner"
                style={{
                  backgroundColor: theme.bg,
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
