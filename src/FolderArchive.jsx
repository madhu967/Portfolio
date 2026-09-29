import React from 'react';

const FOLDERS = [
  { 
    num: '01', 
    title: 'Operating Systems', 
    tone: 1, 
    images: ['https://picsum.photos/seed/os-a/640/900', 'https://picsum.photos/seed/os-b/640/900', 'https://picsum.photos/seed/os-c/640/900'] 
  },
  { 
    num: '02', 
    title: 'Theory of Computation', 
    tone: 2, 
    images: ['https://picsum.photos/seed/toc-a/640/900', 'https://picsum.photos/seed/toc-b/640/900', 'https://picsum.photos/seed/toc-c/640/900'] 
  },
  { 
    num: '03', 
    title: 'Data Structures', 
    tone: 3, 
    images: ['https://picsum.photos/seed/ds-a/640/900', 'https://picsum.photos/seed/ds-b/640/900', 'https://picsum.photos/seed/ds-c/640/900'] 
  },
  { 
    num: '04', 
    title: 'Algorithms', 
    tone: 1, 
    images: ['https://picsum.photos/seed/algo-a/640/900', 'https://picsum.photos/seed/algo-b/640/900', 'https://picsum.photos/seed/algo-c/640/900'] 
  },
  { 
    num: '05', 
    title: 'Computer Networks', 
    tone: 2, 
    images: ['https://picsum.photos/seed/cn-a/640/900', 'https://picsum.photos/seed/cn-b/640/900', 'https://picsum.photos/seed/cn-c/640/900'] 
  },
  { 
    num: '06', 
    title: 'Engineering Maths', 
    tone: 3, 
    images: ['https://picsum.photos/seed/math-a/640/900', 'https://picsum.photos/seed/math-b/640/900', 'https://picsum.photos/seed/math-c/640/900'] 
  }
];

const COLORS = {
  1: '#ffc640', // Warm yellow
  2: '#d5d9d2', // Light grey-green
  3: '#b0b3ad'  // Medium grey
};

export default function FolderArchive() {
  return (
    <section className="fa-section">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:opsz,wght@9..40,400;9..40,500&display=swap');

        .fa-section {
          background-color: #f4f7f0;
          color: #0f0f0f;
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
        }

        .fa-nav {
          display: flex;
          justify-content: space-between;
          padding: 32px 4vw;
          font-family: 'DM Mono', monospace;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          z-index: 50;
        }

        .fa-rows {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 0 5vw 4vw;
        }

        .fa-row {
          display: flex;
          gap: 1.5vw;
          align-items: flex-end;
        }

        /* Desktop Stacking & Offsets */
        @media (min-width: 1001px) {
          .fa-row:nth-child(1) { z-index: 10; margin-bottom: -12vh; }
          .fa-row:nth-child(2) { z-index: 20; margin-bottom: -12vh; }
          .fa-row:nth-child(3) { z-index: 30; }

          /* Asymmetrical Middle Row */
          .fa-row:nth-child(2) .fa-folder:first-child { flex: 0.4; }
          .fa-row:nth-child(2) .fa-folder:last-child { flex: 0.6; }
        }

        .fa-folder {
          flex: 1;
          position: relative;
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: pointer;
        }

        /* Hover Mechanics */
        @media (hover: hover) and (min-width: 1001px) {
          .fa-folder:hover {
            transform: translateY(-30px);
            z-index: 40 !important;
          }
          
          /* Fade un-hovered folders */
          .fa-rows:hover .fa-folder-shape {
            filter: grayscale(80%) brightness(0.95);
            transition: filter 0.5s ease;
          }
          .fa-rows .fa-folder:hover .fa-folder-shape {
            filter: none;
            transition: filter 0.2s ease;
          }

          /* Reveal Images */
          .fa-folder:hover .fa-img-0 {
            transform: translateY(-70px) rotate(-16deg);
            opacity: 1;
            transition-delay: 0s;
          }
          .fa-folder:hover .fa-img-1 {
            transform: translateX(-50%) translateY(-90px) rotate(-2deg);
            opacity: 1;
            transition-delay: 0.025s;
          }
          .fa-folder:hover .fa-img-2 {
            transform: translateX(-100%) translateY(-65px) rotate(14deg);
            opacity: 1;
            transition-delay: 0.05s;
          }
        }

        .fa-folder-shape {
          position: relative;
          z-index: 2;
          transition: filter 0.4s ease;
        }

        /* Tab Shape */
        .fa-tab {
          display: inline-flex;
          align-items: center;
          height: 38px;
          padding: 0 45px 0 20px;
          background-color: var(--f-bg);
          clip-path: polygon(0 0, calc(100% - 24px) 0, 100% 100%, 0 100%);
          border-radius: 12px 0 0 0;
          font-family: 'DM Mono', monospace;
          font-size: 14px;
          font-weight: 500;
        }

        /* Folder Body */
        .fa-body {
          background-color: var(--f-bg);
          height: 22vh;
          min-height: 160px;
          border-radius: 0 12px 12px 12px;
          padding: 24px 32px;
          display: flex;
          align-items: flex-end;
          box-shadow: 0 -2px 10px rgba(0,0,0,0.02);
        }

        .fa-body h2 {
          font-size: clamp(28px, 4vw, 56px);
          font-weight: 500;
          letter-spacing: -0.04em;
          margin: 0;
        }

        /* Image Previews Container */
        .fa-images {
          position: absolute;
          top: 38px;
          left: 0;
          width: 100%;
          height: 0;
          z-index: 1;
        }

        .fa-img {
          position: absolute;
          bottom: 0;
          width: 8rem;
          height: 11rem;
          object-fit: cover;
          border-radius: 6px;
          box-shadow: 0 15px 30px rgba(0,0,0,0.15), 0 4px 10px rgba(0,0,0,0.1);
          opacity: 0;
          pointer-events: none;
          will-change: transform, opacity;
          /* Return transition */
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
        }

        /* Initial hidden positions */
        .fa-img-0 { 
          left: 15%; 
          transform-origin: bottom left; 
          transform: translateY(100%) rotate(0deg); 
          transition-delay: 0.1s; 
        }
        .fa-img-1 { 
          left: 50%; 
          transform-origin: bottom center; 
          transform: translateX(-50%) translateY(100%) rotate(0deg); 
          transition-delay: 0.05s; 
          z-index: 2;
        }
        .fa-img-2 { 
          left: 85%; 
          transform-origin: bottom right; 
          transform: translateX(-100%) translateY(100%) rotate(0deg); 
          transition-delay: 0s; 
        }

        /* Mobile Adjustments */
        @media (max-width: 1000px) {
          .fa-section {
            height: auto;
            min-height: auto;
            padding-bottom: 60px;
          }
          .fa-nav {
            padding: 24px 5vw;
          }
          .fa-rows {
            gap: 16px;
            padding: 0 5vw;
          }
          .fa-row {
            flex-direction: column;
            gap: 16px;
            margin-bottom: 0 !important;
          }
          .fa-folder {
            width: 100%;
          }
          .fa-body {
            height: auto;
            min-height: 110px;
            padding: 20px 24px;
          }
          .fa-images {
            display: none;
          }
          .fa-body h2 {
            font-size: 32px;
          }
        }
      `}</style>

      <nav className="fa-nav">
        <div>IJJI MADHU VENKAT</div>
        <div>GATE 2027 RESOURCES</div>
      </nav>

      <div className="fa-rows">
        {/* Helper to chunk folders into rows of 2 */}
        {[0, 1, 2].map(rowIndex => (
          <div className="fa-row" key={rowIndex}>
            {FOLDERS.slice(rowIndex * 2, rowIndex * 2 + 2).map((folder) => (
              <article 
                className="fa-folder" 
                key={folder.num} 
                style={{ '--f-bg': COLORS[folder.tone] }}
                tabIndex={0}
              >
                <div className="fa-images">
                  {folder.images.map((img, i) => (
                    <img 
                      key={i} 
                      src={img} 
                      alt="" 
                      className={`fa-img fa-img-${i}`} 
                    />
                  ))}
                </div>
                
                <div className="fa-folder-shape">
                  <div className="fa-tab">
                    <span>{folder.num}</span>
                  </div>
                  <div className="fa-body">
                    <h2>{folder.title}</h2>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
