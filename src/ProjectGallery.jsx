import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuxuryNavbar, EditorialStatementSection } from './FashionEditorial';

// Easing approximations for GSAP-like feel
const easeOut = [0.16, 1, 0.3, 1];
const easeIn = [0.7, 0, 0.84, 0];
const easeInOut = [0.45, 0, 0.55, 1];

const PROJECT_DATA = [
  {
    title: "SmartCity Civic Intelligence",
    category: "AI & Full-Stack",
    creativeLead: "Ijji Madhu Venkat",
    visualArtist: "React, Node, Gemini AI",
    details: [
      "Integrated Gemini AI for dynamic image analysis and duplicate detection, reducing manual ticket creation by 30%.",
      "Engineered role-based admin workflows with optimized assignment algorithms to streamline worker dispatch.",
      "Established CI/CD pipelines on Vercel with REST API testing for reliable updates."
    ],
    tech: "React.js, Node.js, Express.js, MongoDB, Gemini AI, Geolocation",
    slides: [
      {
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1800&q=88",
        label: "Dashboard View",
        description: "An AI-powered civic reporting system supporting 6+ categories, validated with 100+ mock localized reports."
      },
      {
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1800&q=88",
        label: "AI Integration",
        description: "Gemini AI analyzes user-submitted images in real-time to detect duplicates and categorize issues."
      },
      {
        image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=1800&q=88",
        label: "Analytics Hub",
        description: "Comprehensive data visualization for city administrators to track resolution metrics and issue hotspots."
      },
      {
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1800&q=88",
        label: "Mobile Responsive",
        description: "Fully responsive interfaces ensuring seamless reporting from any mobile device in the field."
      }
    ]
  },
  {
    title: "Prescripto Hospital Booking",
    category: "Healthcare SaaS",
    creativeLead: "Ijji Madhu Venkat",
    visualArtist: "React, Node, Stripe",
    details: [
      "Integrated Stripe webhooks for secure payments and utilized Cloudinary CDN, decreasing image load times by 40%.",
      "Implemented MongoDB database transaction locks to eliminate double-booking conflicts and maintain consistency.",
      "Authored unit and integration tests using Jest, achieving 75% test coverage to minimize bugs."
    ],
    tech: "React.js, Node.js, Express.js, MongoDB, Stripe, Cloudinary",
    slides: [
      {
        image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1800&q=88",
        label: "Patient Portal",
        description: "A full-stack medical scheduling system with role-based access, handling 50+ concurrent mock bookings."
      },
      {
        image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1800&q=88",
        label: "Doctor Dashboard",
        description: "Real-time calendar synchronization for medical professionals to manage availability."
      },
      {
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=1800&q=88",
        label: "Scheduling Engine",
        description: "MongoDB transaction locks eliminate double-booking conflicts and maintain data consistency."
      },
      {
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1800&q=88",
        label: "Secure Payments",
        description: "Integrated Stripe webhooks for secure, immediate payment processing."
      }
    ]
  },
  {
    title: "QuickBlog Platform",
    category: "AI Integrated CMS",
    creativeLead: "Ijji Madhu Venkat",
    visualArtist: "React, AI Integration",
    details: [
      "Built a comprehensive Markdown-supported editor with real-time preview and AI-assisted writing prompts.",
      "Engineered a scalable backend capable of handling high-traffic content delivery.",
      "Optimized database queries for instant search and seamless article categorization."
    ],
    tech: "React.js, Node.js, AI APIs, Tailwind CSS",
    slides: [
      {
        image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1800&q=88",
        label: "Content Editor",
        description: "An AI-powered modern blogging platform offering seamless content creation and generation tools."
      },
      {
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1800&q=88",
        label: "Architecture",
        description: "Engineered a scalable backend capable of handling high-traffic content delivery and instant search."
      },
      {
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1800&q=88",
        label: "AI Generation",
        description: "Built-in AI integration assists authors with drafting, summarizing, and optimizing articles."
      },
      {
        image: "https://images.unsplash.com/photo-1476275466078-4007374efac4?auto=format&fit=crop&w=1800&q=88",
        label: "Reader Experience",
        description: "Minimalist reading interface designed for long-form content consumption without distractions."
      }
    ]
  },
  {
    title: "Interactive Portfolio",
    category: "Creative Engineering",
    creativeLead: "Ijji Madhu Venkat",
    visualArtist: "Framer Motion, React",
    details: [
      "Architected a custom sticky scroll-jacking gallery without relying on heavy third-party scroll libraries.",
      "Implemented seamless view transitions and dynamic layout shifting using Framer Motion.",
      "Built highly responsive components ensuring flawless performance across mobile and desktop devices."
    ],
    tech: "React.js, Framer Motion, CSS Grid/Flexbox",
    slides: [
      {
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1800&q=88",
        label: "Editorial Design",
        description: "A premium scroll experience designed with editorial aesthetics, cinematic motion, and fluid layout."
      },
      {
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1800&q=88",
        label: "Cinematic Motion",
        description: "Implemented seamless view transitions and dynamic layout shifting using Framer Motion."
      },
      {
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1800&q=88",
        label: "Custom Logic",
        description: "Architected a custom sticky scroll-jacking gallery without relying on heavy third-party scroll libraries."
      },
      {
        image: "https://images.unsplash.com/photo-1607799279861-4dd99b8f2d52?auto=format&fit=crop&w=1800&q=88",
        label: "Responsive UI",
        description: "Built highly responsive components ensuring flawless performance across mobile and desktop devices."
      }
    ]
  }
];

export default function ProjectGallery({ initialIndex = 0, onClose }) {
  const project = PROJECT_DATA[initialIndex] || PROJECT_DATA[0];
  const [activeSlide, setActiveSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 820;

  // Preload next/prev images
  useEffect(() => {
    const nextIdx = (activeSlide + 1) % project.slides.length;
    const prevIdx = (activeSlide - 1 + project.slides.length) % project.slides.length;
    [project.slides[nextIdx].image, project.slides[prevIdx].image].forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, [activeSlide, project]);

  const handleNav = (dir) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    let newIndex = activeSlide + dir;
    if (newIndex < 0) newIndex = project.slides.length - 1;
    if (newIndex >= project.slides.length) newIndex = 0;
    
    setBgIndex(newIndex);
    
    setTimeout(() => {
      setActiveSlide(newIndex);
      setTimeout(() => setIsTransitioning(false), 900);
    }, 500);
  };

  const handleSelect = (index) => {
    if (isTransitioning || index === activeSlide) return;
    setIsTransitioning(true);
    setBgIndex(index);
    setTimeout(() => {
      setActiveSlide(index);
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
  }, [activeSlide, isTransitioning, onClose]);

  const slide = project.slides[activeSlide];
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
        .pg-year { font-family: 'Spectral', serif; font-size: 1.2rem; font-style: italic; color: #ffffff; pointer-events: auto; text-shadow: 0 2px 4px rgba(0,0,0,0.5); }
        
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
              key={activeSlide}
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
                  {(activeSlide + 1).toString().padStart(2, '0')} / {project.slides.length.toString().padStart(2, '0')}
                </motion.div>
              </div>

              <motion.h1 variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: easeOut } }, exit: { y: -20, opacity: 0, transition: { duration: 0.4, ease: easeIn } } }} className="pg-title">
                {project.title}
              </motion.h1>
              
              <motion.p variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: easeOut } }, exit: { y: -20, opacity: 0, transition: { duration: 0.4, ease: easeIn } } }} className="pg-desc">
                {slide.description}
              </motion.p>
              
              <motion.div variants={{ hidden: { scaleX: 0, opacity: 0 }, visible: { scaleX: 1, opacity: 1, transition: { duration: 0.8, ease: easeOut } }, exit: { scaleX: 0, opacity: 0, transition: { duration: 0.4, ease: easeIn } } }} style={{ transformOrigin: 'left' }} className="pg-divider" />
              
              <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: easeOut } }, exit: { y: -20, opacity: 0, transition: { duration: 0.4, ease: easeIn } } }} className="pg-credits">
                <div>
                  <div className="pg-credit-role">Creative Lead</div>
                  <div className="pg-credit-name">{project.creativeLead}</div>
                </div>
                <div>
                  <div className="pg-credit-role">Tech Stack</div>
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
                  <img src={slide.image} alt={slide.label} className="pg-featured-img" />
                  <div className="pg-img-labels">
                    <div className="pg-badge">{slide.label}</div>
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
                key={activeSlide + "mob"}
                className="pg-featured-wrap"
                initial={{ y: 40, scale: 0.8, opacity: 0 }}
                animate={{ y: 0, scale: 1, opacity: 1, transition: { duration: 0.8, ease: easeOut } }}
                exit={{ y: 20, scale: 0.8, opacity: 0, transition: { duration: 0.4, ease: easeIn } }}
              >
                <img src={slide.image} alt={slide.label} className="pg-featured-img" />
                <div className="pg-img-labels">
                  <div className="pg-badge">{slide.label}</div>
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
          {project.slides.map((s, i) => (
            <div 
              key={i} 
              className={`pg-rail-item ${activeSlide === i ? 'is-active' : ''}`}
              onClick={() => handleSelect(i)}
            >
              <img src={s.image} alt="" className="pg-rail-img" />
              <div className="pg-rail-num">{(i + 1).toString().padStart(2, '0')}</div>
              <div className="pg-rail-line" />
            </div>
          ))}
        </aside>
      </div>
      {/* Project Insights Section Appended Below Gallery */}
      <div style={{ padding: isMobile ? '4rem 1.5rem' : '6rem 4rem', background: '#f4f1ea', borderTop: '1px solid rgba(19,20,15,0.1)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Spectral', serif", fontSize: isMobile ? '2rem' : '3rem', fontWeight: 300, marginBottom: '2rem', color: '#13140f' }}>
            Project Insights
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
            {project.details.map((detail, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ color: '#ea580c', fontFamily: "'Space Mono', monospace", fontWeight: 700, marginTop: '4px' }}>
                  {(idx + 1).toString().padStart(2, '0')}
                </div>
                <p style={{ fontSize: isMobile ? '1rem' : '1.15rem', lineHeight: 1.6, color: 'rgba(19,20,15,0.8)', margin: 0 }}>
                  {detail}
                </p>
              </div>
            ))}
          </div>

          <div>
            <h3 style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(19,20,15,0.5)', marginBottom: '1rem' }}>
              Core Technologies
            </h3>
            <p style={{ fontFamily: "'Spectral', serif", fontSize: isMobile ? '1.2rem' : '1.5rem', fontStyle: 'italic', color: '#13140f', margin: 0 }}>
              {project.tech}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
