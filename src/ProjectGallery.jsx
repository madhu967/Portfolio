import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuxuryNavbar, EditorialStatementSection } from './FashionEditorial';

// Easing approximations for GSAP-like feel
const easeOut = [0.16, 1, 0.3, 1];
const easeIn = [0.7, 0, 0.84, 0];
const easeInOut = [0.45, 0, 0.55, 1];

const DEFAULT_PROJECTS = [
  {
    title: "Create Without Fear",
    category: "The Belief",
    description: "A bold space for ideas to rise, move, and become visible without waiting for permission.",
    creativeLead: "Ijji Madhu Venkat",
    visualArtist: "Editorial Studio",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1800&q=88"
  },
  {
    title: "Art First Always",
    category: "The Mission",
    description: "Every card arrives like a statement, cutting through the page with strong motion and clean contrast.",
    creativeLead: "Ijji Madhu Venkat",
    visualArtist: "Kexsio®",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1800&q=88"
  },
  {
    title: "Build Loud Ideas",
    category: "The Method",
    description: "Smooth scroll movement, cinematic angles, and bold typography make each section feel alive.",
    creativeLead: "Ijji Madhu Venkat",
    visualArtist: "Kinetic Lab",
    image: "https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?auto=format&fit=crop&w=1800&q=88"
  },
  {
    title: "No More Limits",
    category: "The Future",
    description: "A premium scroll experience designed for portfolios, agencies, artists, and experimental landing pages.",
    creativeLead: "Ijji Madhu Venkat",
    visualArtist: "Vision Code",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1800&q=88"
  },
  {
    title: "After Midnight",
    category: "Night Culture",
    description: "A visual diary following creators, dancers and outsiders who transform the city after everyone else goes home.",
    creativeLead: "Aisha Ray",
    visualArtist: "Neon Lens",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1800&q=88"
  },
  {
    title: "Off The Grid",
    category: "Streetwear",
    description: "An experimental fashion story using oversized silhouettes, unexpected textures and rule-breaking personal style.",
    creativeLead: "Marcus Jin",
    visualArtist: "Urban Frame",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=88"
  },
  {
    title: "Concrete Playground",
    category: "Skate Film",
    description: "Young skaters reclaim forgotten parts of the city and turn ordinary concrete into a creative playground.",
    creativeLead: "Elena Soto",
    visualArtist: "Grit Media",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1800&q=88"
  }
];

export default function ProjectGallery({ initialIndex = 0, onClose }) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [bgIndex, setBgIndex] = useState(initialIndex);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 820;

  // Preload next/prev images
  useEffect(() => {
    const nextIdx = (activeIndex + 1) % DEFAULT_PROJECTS.length;
    const prevIdx = (activeIndex - 1 + DEFAULT_PROJECTS.length) % DEFAULT_PROJECTS.length;
    [DEFAULT_PROJECTS[nextIdx].image, DEFAULT_PROJECTS[prevIdx].image].forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, [activeIndex]);

  const handleNav = (dir) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    let newIndex = activeIndex + dir;
    if (newIndex < 0) newIndex = DEFAULT_PROJECTS.length - 1;
    if (newIndex >= DEFAULT_PROJECTS.length) newIndex = 0;
    
    setBgIndex(newIndex);
    
    setTimeout(() => {
      setActiveIndex(newIndex);
      setTimeout(() => setIsTransitioning(false), 900);
    }, 500);
  };

  const handleSelect = (index) => {
    if (isTransitioning || index === activeIndex) return;
    setIsTransitioning(true);
    setBgIndex(index);
    setTimeout(() => {
      setActiveIndex(index);
      setTimeout(() => setIsTransitioning(false), 900);
    }, 500);
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') handleNav(1);
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') handleNav(-1);
      if (e.key === 'Escape' && onClose) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, isTransitioning, onClose]);

  const project = DEFAULT_PROJECTS[activeIndex];
  const accentColor = "#ea580c";

  return (
    <div className="pg-overlay" aria-label="Project Gallery">
      <style>{`
        .pg-overlay {
          position: fixed; inset: 0; z-index: 99999;
          background: #ffffff; color: #13140f;
          font-family: 'Space Mono', monospace;
          overflow-y: auto; overflow-x: hidden;
          display: flex;
          flex-direction: column;
          padding-top: 70px; /* Leave space for LuxuryNavbar */
          box-sizing: border-box;
        }
        .pg-layout {
          position: relative; z-index: 10; display: flex;
          width: 100%; min-height: calc(100svh - 70px);
          overflow: hidden; flex-shrink: 0;
        }
        .pg-sidebar {
          width: 22%; border-right: 1px solid rgba(19,20,15,0.1);
          background: #f4f1ea;
          display: flex; flex-direction: column; justify-content: center;
          padding: 2.5rem;
        }
        .pg-brand-wrap { text-align: center; display: flex; flex-direction: column; align-items: center; margin-bottom: 2rem; }
        .pg-brand-line { width: 40px; height: 1px; background: ${accentColor}; margin-bottom: 1.5rem; }
        .pg-brand-name { font-family: 'Spectral', serif; font-size: 2.5rem; font-weight: 700; letter-spacing: 0.05em; line-height: 1; }
        .pg-brand-label { font-size: 0.75rem; letter-spacing: 0.25em; margin-top: 1rem; color: rgba(19,20,15,0.5); text-transform: uppercase; }
        
        .pg-brand-intro { font-size: 0.9rem; line-height: 1.6; color: rgba(19,20,15,0.7); text-align: center; }
        
        .pg-main {
          flex: 1; position: relative; padding: 3rem 4rem; display: flex; flex-direction: column;
          overflow-y: auto; overflow-x: hidden;
        }
        
        .pg-content-top { display: flex; justify-content: space-between; margin-bottom: 1.5rem; }
        .pg-meta-cat { font-size: 0.9rem; letter-spacing: 0.2em; text-transform: uppercase; color: ${accentColor}; font-weight: 700; }
        .pg-meta-count { font-family: 'Spectral', serif; font-size: 1.2rem; font-style: italic; opacity: 0.6; }
        
        .pg-title { font-family: 'Spectral', serif; font-size: clamp(3rem, 6vw, 5.5rem); line-height: 0.95; margin: 0 0 1.5rem; font-weight: 300; letter-spacing: -0.02em; }
        .pg-desc { font-size: 1.1rem; line-height: 1.6; max-width: 500px; color: rgba(19,20,15,0.8); margin-bottom: 1.5rem; }
        
        .pg-divider { width: 100%; height: 1px; background: rgba(19,20,15,0.15); margin: 2rem 0; flex-shrink: 0; }
        
        .pg-credits { display: flex; gap: 4rem; flex-wrap: wrap; font-size: 0.85rem; letter-spacing: 0.05em; margin-bottom: 1.5rem; flex-shrink: 0; }
        .pg-credit-role { opacity: 0.5; margin-bottom: 0.5rem; text-transform: uppercase; font-size: 0.75rem; }
        .pg-credit-name { font-weight: 600; }
        
        .pg-featured-wrap {
          position: relative; 
          width: 100%; flex: 1; min-height: 300px;
          border-radius: 8px; overflow: hidden;
          margin-top: 1rem;
        }
        .pg-featured-img { width: 100%; height: 100%; object-fit: cover; position: absolute; inset: 0; }
        
        .pg-img-labels { position: absolute; bottom: 1.5rem; left: 1.5rem; right: 1.5rem; display: flex; justify-content: space-between; align-items: flex-end; z-index: 10; pointer-events: none; }
        .pg-badge { background: ${accentColor}; color: #ffffff; padding: 0.4rem 0.8rem; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; border-radius: 4px; pointer-events: auto; }
        .pg-year { font-family: 'Spectral', serif; font-size: 1.2rem; font-style: italic; color: #13140f; pointer-events: auto; }
        
        .pg-controls { position: absolute; bottom: 1.5rem; right: 1.5rem; display: flex; gap: 1rem; z-index: 20; }
        .pg-btn { width: 50px; height: 50px; border-radius: 50%; border: 1px solid rgba(19,20,15,0.2); background: rgba(255,255,255,0.4); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; cursor: pointer; color: #13140f; transition: all 0.3s; }
        .pg-btn:hover { background: ${accentColor}; border-color: ${accentColor}; color: #ffffff; }
        
        .pg-rail {
          width: 110px; border-left: 1px solid rgba(19,20,15,0.1); display: flex; flex-direction: column; overflow-y: auto; overflow-x: hidden;
        }
        .pg-rail::-webkit-scrollbar { display: none; }
        .pg-rail-item {
          width: 100%; aspect-ratio: 4/5; position: relative; cursor: pointer; opacity: 0.4; transition: transform 0.4s ease, opacity 0.4s ease;
        }
        .pg-rail-item:hover { transform: translateX(-8px); opacity: 0.8; }
        .pg-rail-item.is-active { opacity: 1; transform: translateX(-12px); z-index: 2; box-shadow: -10px 10px 20px rgba(0,0,0,0.1); }
        .pg-rail-img { width: 100%; height: 100%; object-fit: cover; }
        .pg-rail-num { position: absolute; top: 8px; left: 8px; font-family: 'Spectral', serif; font-size: 1rem; font-style: italic; color: #ffffff; text-shadow: 0 2px 4px rgba(0,0,0,0.8); }
        .pg-rail-line { position: absolute; bottom: 0; left: 0; height: 3px; background: ${accentColor}; width: 0%; transition: width 0.4s; }
        .pg-rail-item.is-active .pg-rail-line { width: 100%; }

        @media (max-width: 820px) {
          .pg-layout { flex-direction: column; }
          .pg-sidebar { width: 100%; height: auto; flex-direction: row; align-items: center; justify-content: center; padding: 1rem; border-right: none; border-bottom: 1px solid rgba(19,20,15,0.1); }
          .pg-brand-line, .pg-brand-intro, .pg-brand-label { display: none; }
          .pg-brand-wrap { margin-bottom: 0; }
          .pg-brand-name { font-size: 1.5rem; }
          .pg-main { padding: 1rem; }
          .pg-title { font-size: 2.2rem; margin: 0.5rem 0; }
          .pg-desc { font-size: 0.95rem; }
          .pg-divider { margin: 1rem 0; }
          .pg-credits { gap: 1.5rem; flex-wrap: wrap; }
          .pg-featured-wrap { position: relative; width: 100%; height: 40vh; min-height: 250px; margin-top: 1.5rem; flex: none; }
          .pg-controls { position: absolute; bottom: 1rem; right: 1rem; margin-top: 0; }
          .pg-rail { width: 100%; height: 80px; border-left: none; border-top: 1px solid rgba(19,20,15,0.1); flex-direction: row; overflow-x: auto; overflow-y: hidden; }
          .pg-rail-item { height: 100%; width: auto; aspect-ratio: 4/3; }
          .pg-rail-item:hover, .pg-rail-item.is-active { transform: translateY(-4px); }
        }
      `}</style>

      {/* Embedded Luxury Navbar */}
      <LuxuryNavbar isMobile={isMobile} forceWhite={true} />

      <div className="pg-layout">
        <aside className="pg-sidebar">
          <div className="pg-brand-wrap">
            <div className="pg-brand-line" />
            <div className="pg-brand-name">Madhu.</div>
            <div className="pg-brand-label">Creative Archive</div>
          </div>
          <div className="pg-brand-intro">
            An exploration of code, culture, and cinematic digital experiences. Building spaces for ideas to rise.
          </div>
        </aside>

        <main className="pg-main">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeIndex}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
                exit: { opacity: 0, transition: { staggerChildren: 0.04, staggerDirection: -1 } }
              }}
              style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
            >
              <div className="pg-content-top">
                <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: easeOut } }, exit: { y: -20, opacity: 0, transition: { duration: 0.4, ease: easeIn } } }} className="pg-meta-cat">
                  {project.category}
                </motion.div>
                <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: easeOut } }, exit: { y: -20, opacity: 0, transition: { duration: 0.4, ease: easeIn } } }} className="pg-meta-count">
                  {(activeIndex + 1).toString().padStart(2, '0')} / {DEFAULT_PROJECTS.length.toString().padStart(2, '0')}
                </motion.div>
              </div>

              <motion.h1 variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: easeOut } }, exit: { y: -20, opacity: 0, transition: { duration: 0.4, ease: easeIn } } }} className="pg-title">
                {project.title}
              </motion.h1>
              
              <motion.p variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: easeOut } }, exit: { y: -20, opacity: 0, transition: { duration: 0.4, ease: easeIn } } }} className="pg-desc">
                {project.description}
              </motion.p>
              
              <motion.div variants={{ hidden: { scaleX: 0, opacity: 0 }, visible: { scaleX: 1, opacity: 1, transition: { duration: 0.8, ease: easeOut } }, exit: { scaleX: 0, opacity: 0, transition: { duration: 0.4, ease: easeIn } } }} style={{ transformOrigin: 'left' }} className="pg-divider" />
              
              <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: easeOut } }, exit: { y: -20, opacity: 0, transition: { duration: 0.4, ease: easeIn } } }} className="pg-credits">
                <div>
                  <div className="pg-credit-role">Creative Lead</div>
                  <div className="pg-credit-name">{project.creativeLead}</div>
                </div>
                <div>
                  <div className="pg-credit-role">Visual Artist</div>
                  <div className="pg-credit-name">{project.visualArtist}</div>
                </div>
              </motion.div>

              {!isMobile && (
                <motion.div 
                  className="pg-featured-wrap"
                  variants={{
                    hidden: { y: 60, scale: 0.8, opacity: 0 },
                    visible: { y: 0, scale: 1, opacity: 1, transition: { duration: 0.95, ease: easeOut, delay: 0.2 } },
                    exit: { y: 40, scale: 0.75, opacity: 0, transition: { duration: 0.6, ease: easeIn } }
                  }}
                >
                  <img src={project.image} alt={project.title} className="pg-featured-img" />
                  <div className="pg-img-labels">
                    <div className="pg-badge">Selected Story</div>
                    <div className="pg-year">2026</div>
                  </div>
                  
                  <div className="pg-controls">
                    <button className="pg-btn" onClick={() => handleNav(-1)} aria-label="Previous">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                    </button>
                    <button className="pg-btn" onClick={() => handleNav(1)} aria-label="Next">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {isMobile && (
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeIndex + "mob"}
                className="pg-featured-wrap"
                initial={{ y: 40, scale: 0.8, opacity: 0 }}
                animate={{ y: 0, scale: 1, opacity: 1, transition: { duration: 0.8, ease: easeOut } }}
                exit={{ y: 20, scale: 0.8, opacity: 0, transition: { duration: 0.4, ease: easeIn } }}
              >
                <img src={project.image} alt={project.title} className="pg-featured-img" />
                <div className="pg-img-labels">
                  <div className="pg-badge">Story</div>
                  <div className="pg-year">2026</div>
                </div>
                
                <div className="pg-controls">
                  <button className="pg-btn" onClick={() => handleNav(-1)} aria-label="Previous">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                  </button>
                  <button className="pg-btn" onClick={() => handleNav(1)} aria-label="Next">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </main>

        <aside className="pg-rail">
          {DEFAULT_PROJECTS.map((proj, i) => (
            <div 
              key={i} 
              className={`pg-rail-item ${activeIndex === i ? 'is-active' : ''}`}
              onClick={() => handleSelect(i)}
            >
              <img src={proj.image} alt="" className="pg-rail-img" />
              <div className="pg-rail-num">{(i + 1).toString().padStart(2, '0')}</div>
              <div className="pg-rail-line" />
            </div>
          ))}
        </aside>
      </div>
      
      {/* 4-Line Philosophy Statement Appended Below Gallery */}
      <EditorialStatementSection isMobile={isMobile} />
    </div>
  );
}
