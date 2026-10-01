import React from 'react';
import cert1 from 'C:/Users/ijjij/.gemini/antigravity/brain/9a141dc8-3d2a-4917-8831-3d0b397d09c7/.user_uploaded/media_1790847635663.png';
import cert2 from 'C:/Users/ijjij/.gemini/antigravity/brain/9a141dc8-3d2a-4917-8831-3d0b397d09c7/.user_uploaded/media_1790847719622.png';
import cert3 from 'C:/Users/ijjij/.gemini/antigravity/brain/9a141dc8-3d2a-4917-8831-3d0b397d09c7/.user_uploaded/media_1790847864213.pdf';
import cert4 from 'C:/Users/ijjij/.gemini/antigravity/brain/9a141dc8-3d2a-4917-8831-3d0b397d09c7/.user_uploaded/media_1790847868504.pdf';

const FOLDERS = [
  { 
    num: '01', 
    title: 'IISPPPR Internship', 
    tone: 1, 
    images: [cert1] 
  },
  { 
    num: '02', 
    title: 'Full Stack Node.js', 
    tone: 2, 
    images: [cert2] 
  },
  { 
    num: '03', 
    title: 'NPTEL Python', 
    tone: 2, 
    images: [cert3] 
  },
  { 
    num: '04', 
    title: 'NPTEL ML', 
    tone: 1, 
    images: [cert4] 
  }
];

const COLORS = {
  1: '#fbb700', // Premium Golden Yellow
  2: '#8b8a87', // Sophisticated Warm Grey
};

export default function FolderArchive() {
  const [activeFolder, setActiveFolder] = React.useState(null);
  const [modalImage, setModalImage] = React.useState(null);

  const toggleFolder = (num) => {
    setActiveFolder(prev => prev === num ? null : num);
  };

  return (
    <section className="fa-section" onClick={() => setActiveFolder(null)}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:opsz,wght@9..40,400;9..40,500&display=swap');

        .fa-section {
          background-color: #f4f1ea;
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
        .fa-folder:hover, .fa-folder.is-active {
          transform: translateY(-30px);
          z-index: 60 !important;
        }
        
        /* Fade un-hovered folders */
        .fa-rows:hover .fa-folder-shape {
          filter: grayscale(80%) brightness(0.95);
          transition: filter 0.5s ease;
        }
        .fa-rows .fa-folder:hover .fa-folder-shape,
        .fa-rows .fa-folder.is-active .fa-folder-shape {
          filter: none;
          transition: filter 0.2s ease;
        }

        /* Reveal Images */
        .fa-folder:hover .fa-img-0, .fa-folder.is-active .fa-img-0 {
          transform: translateX(-50%) translateY(-90px) rotate(0deg);
          opacity: 1;
          transition-delay: 0s;
        }

        @media (max-width: 1000px) {
          .fa-folder:hover .fa-img-0, .fa-folder.is-active .fa-img-0 {
            transform: translateX(-50%) translateY(-75px) rotate(0deg);
          }
        }

        .fa-folder-shape {
          position: relative;
          z-index: 2;
          transition: filter 0.4s ease;
        }

        .fa-badge {
          position: absolute;
          top: 16px;
          right: 20px;
          background: #000000;
          color: #ffffff;
          font-family: 'DM Mono', monospace;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 20px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.4);
          pointer-events: auto; /* Enable clicking on the button */
          cursor: pointer;
          opacity: 1;
          transition: transform 0.2s ease;
          animation: badge-pulse 2s infinite ease-in-out;
        }

        .fa-badge:hover {
          transform: scale(1.05);
        }

        .text-desktop-hover, .text-mobile { display: none; }
        .text-desktop-idle { display: inline; }

        .fa-folder:hover .text-desktop-idle, .fa-folder.is-active .text-desktop-idle { display: none; }
        .fa-folder:hover .text-desktop-hover, .fa-folder.is-active .text-desktop-hover { display: inline; }

        @keyframes badge-pulse {
          0%, 100% { box-shadow: 0 4px 15px rgba(0,0,0,0.4); }
          50% { box-shadow: 0 8px 25px rgba(0,0,0,0.6); }
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
          bottom: -10px;
          width: 26rem;
          height: 18.5rem;
          object-fit: contain;
          opacity: 0;
          pointer-events: none;
          will-change: transform, opacity;
          /* Return transition */
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
          background: transparent;
          box-shadow: none;
          border: none;
        }

        /* Modal Styles */
        .fa-modal-overlay {
          position: fixed;
          top: 0; left: 0; width: 100vw; height: 100vh;
          background: rgba(0,0,0,0.85);
          backdrop-filter: blur(10px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          animation: modal-fade-in 0.3s forwards;
          padding: 20px;
          box-sizing: border-box;
        }
        @keyframes modal-fade-in { to { opacity: 1; } }
        
        .fa-modal-content {
          position: relative;
          width: 75vw;
          height: 75vh;
          max-width: 900px;
          background: transparent;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .fa-modal-close {
          position: absolute;
          top: -40px;
          right: 0;
          color: white;
          font-family: 'DM Mono', monospace;
          font-size: 16px;
          background: none;
          border: none;
          cursor: pointer;
        }

        /* Initial hidden positions */
        .fa-img-0 { 
          left: 50%; 
          transform-origin: bottom center; 
          transform: translateX(-50%) translateY(100%) rotate(0deg); 
          transition-delay: 0.1s; 
          z-index: 2;
        }

        /* Mobile Adjustments */
        @media (max-width: 1000px) {
          .text-desktop-idle, .text-desktop-hover { display: none !important; }
          .text-mobile { display: inline !important; }
          
          .fa-modal-content {
            width: 95vw;
            height: auto;
            max-height: 80vh;
          }

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
          .fa-img {
            width: 85vw;
            height: 60vw;
          }
          .fa-section {
            padding-top: 20px;
          }
          .fa-body h2 {
            font-size: 32px;
          }
        }
      `}</style>

      <nav className="fa-nav" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '8px', padding: '60px 4vw 40px' }}>
        <h1 style={{ 
          fontFamily: "'Spectral', serif", 
          fontSize: 'clamp(2.4rem, 5vw, 3.5rem)', 
          margin: 0, 
          color: '#181e4b',
          textTransform: 'none',
          letterSpacing: '-0.02em',
          fontWeight: 700 
        }}>
          Professional Certificates
        </h1>
        <div style={{ color: '#ea580c', fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.15em' }}>IJJI MADHU VENKAT</div>
      </nav>

      <div className="fa-rows">
        {/* Helper to chunk folders into rows of 2 */}
        {[0, 1].map(rowIndex => (
          <div className="fa-row" key={rowIndex}>
            {FOLDERS.slice(rowIndex * 2, rowIndex * 2 + 2).map((folder) => (
              <article 
                className={`fa-folder ${activeFolder === folder.num ? 'is-active' : ''}`} 
                key={folder.num} 
                style={{ '--f-bg': COLORS[folder.tone] }}
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFolder(folder.num);
                }}
              >
                <div className="fa-images">
                  {folder.images.map((img, i) => {
                    const isPdf = img.toLowerCase().endsWith('.pdf');
                    return isPdf ? (
                      <embed 
                        key={i} 
                        src={`${img}#toolbar=0&navpanes=0&scrollbar=0`} 
                        type="application/pdf"
                        className={`fa-img fa-img-${i}`} 
                      />
                    ) : (
                      <img 
                        key={i} 
                        src={img} 
                        alt="" 
                        className={`fa-img fa-img-${i}`} 
                      />
                    );
                  })}
                </div>
                
                <div className="fa-folder-shape">
                  <div 
                    className="fa-badge"
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalImage(folder.images[0]);
                    }}
                  >
                    <span className="text-desktop-idle">Hover on folder</span>
                    <span className="text-desktop-hover">Click to open full certificate</span>
                    <span className="text-mobile">Tap to open</span>
                  </div>
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

      {modalImage && (
        <div className="fa-modal-overlay" onClick={() => setModalImage(null)}>
          <div className="fa-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="fa-modal-close" onClick={() => setModalImage(null)}>
              CLOSE [X]
            </button>
            {modalImage.toLowerCase().endsWith('.pdf') ? (
              <embed 
                src={`${modalImage}#toolbar=0&navpanes=0&scrollbar=0`} 
                type="application/pdf"
                style={{ width: '100%', height: '100%', borderRadius: '8px' }}
              />
            ) : (
              <img 
                src={modalImage} 
                alt="Certificate Full View" 
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '8px' }}
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
