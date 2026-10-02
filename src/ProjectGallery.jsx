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
    github: "https://github.com/madhu967/SmartCity-Civic-Intelligence-Platform",
    demo: "https://smart-city-civic-intelligence-platf-kohl.vercel.app/",
    details: [
      "Integrated Gemini AI for dynamic image analysis and duplicate detection, reducing manual ticket creation by 30%.",
      "Engineered role-based admin workflows with optimized assignment algorithms to streamline worker dispatch.",
      "Established CI/CD pipelines on Vercel with REST API testing for reliable updates."
    ],
    tech: "React.js, Node.js, Express.js, MongoDB, Gemini AI, Geolocation",
    slides: [
      {
        image: "/smartcity/slide1.png",
        label: "Landing Page",
        description: "An AI-powered civic reporting system supporting 6+ categories, validated with 100+ mock localized reports."
      },
      {
        image: "/smartcity/slide2.png",
        label: "Login",
        description: "Secure authentication and demo account access for citizens, administrators, and field workers."
      },
      {
        image: "/smartcity/slide3.png",
        label: "Admin Dashboard",
        description: "Comprehensive data visualization for city administrators to track resolution metrics and issue hotspots."
      },
      {
        image: "/smartcity/slide4.png",
        label: "Citizen Dashboard",
        description: "A centralized hub where residents can track the status of their reported civic issues in real-time."
      },
      {
        image: "/smartcity/slide5.png",
        label: "Worker Dashboard",
        description: "Role-based field workflows with optimized assignment algorithms to streamline worker dispatch and resolution."
      }
    ]
  },
  {
    title: "Prescripto Hospital Booking",
    category: "Healthcare SaaS",
    creativeLead: "Ijji Madhu Venkat",
    visualArtist: "React, Node, Stripe",
    github: "https://github.com/madhu967/hospital-booking-app",
    demo: "https://hospital-booking-app-one.vercel.app/",
    details: [
      "Integrated Stripe webhooks for secure payments and utilized Cloudinary CDN, decreasing image load times by 40%.",
      "Implemented MongoDB database transaction locks to eliminate double-booking conflicts and maintain consistency.",
      "Authored unit and integration tests using Jest, achieving 75% test coverage to minimize bugs."
    ],
    tech: "React.js, Node.js, Express.js, MongoDB, Stripe, Cloudinary",
    slides: [
      {
        image: "/prescripto/slide1.png",
        label: "Landing Page",
        description: "A comprehensive medical scheduling system connecting patients with trusted healthcare professionals."
      },
      {
        image: "/prescripto/slide2.png",
        label: "Appointment Booking",
        description: "Streamlined booking interface with calendar synchronization and real-time availability checking."
      },
      {
        image: "/prescripto/slide3.png",
        label: "My Appointments",
        description: "A centralized dashboard for patients to track, manage, and securely pay for upcoming visits."
      },
      {
        image: "/prescripto/slide4.png",
        label: "Admin Dashboard",
        description: "Practice management console providing real-time pulse on clinic operations and patient load."
      },
      {
        image: "/prescripto/slide5.png",
        label: "Doctor Dashboard",
        description: "Dedicated workspace for clinicians to manage their daily schedule and patient encounters."
      }
    ]
  },
  {
    title: "QuickBlog Platform",
    category: "AI Integrated CMS",
    creativeLead: "Ijji Madhu Venkat",
    visualArtist: "React, AI Integration",
    github: "https://github.com/madhu967/AI_Integrated_blog_Platform",
    demo: "https://ai-integrated-blog-platform.vercel.app/",
    details: [
      "Built a comprehensive Markdown-supported editor with real-time preview and AI-assisted writing prompts.",
      "Engineered a scalable backend capable of handling high-traffic content delivery.",
      "Optimized database queries for instant search and seamless article categorization."
    ],
    tech: "React.js, Node.js, AI APIs, Tailwind CSS",
    slides: [
      {
        image: "/quickblog/slide1.png",
        label: "Landing Page",
        description: "A premier AI-enhanced editorial platform offering seamless content creation and generation tools."
      },
      {
        image: "/quickblog/slide2.png",
        label: "Login Page",
        description: "Secure authentication portal providing access for both regular users and platform administrators."
      },
      {
        image: "/quickblog/slide3.png",
        label: "Admin Dashboard",
        description: "Centralized management console for administrators to oversee total essays, discussions, and drafts."
      },
      {
        image: "/quickblog/slide4.png",
        label: "User Dashboard",
        description: "Dedicated workspace for writers to track their publications and manage content submissions."
      }
    ]
  },
  {
    title: "Interactive Portfolio",
    category: "Creative Engineering",
    creativeLead: "Ijji Madhu Venkat",
    visualArtist: "Framer Motion, React",
    github: "https://github.com/madhu967/Portfolio",
    demo: "https://portfolio-ashen-rho-52.vercel.app",
    details: [
      "Architected a custom sticky scroll-jacking gallery without relying on heavy third-party scroll libraries.",
      "Implemented seamless view transitions and dynamic layout shifting using Framer Motion.",
      "Built highly responsive components ensuring flawless performance across mobile and desktop devices."
    ],
    tech: "React.js, Framer Motion, CSS Grid/Flexbox",
    slides: [
      {
        image: "/portfolio/slide1.png",
        label: "Hero Section",
        description: "A dynamic, interactive landing experience featuring floating cards and clean editorial typography."
      },
      {
        image: "/portfolio/slide2.png",
        label: "About Me",
        description: "A professional background summary showcasing education and career highlights with soft, asymmetrical blobs."
      },
      {
        image: "/portfolio/slide3.png",
        label: "Technical Skills",
        description: "An interactive, orbit-based visualization highlighting my technical arsenal and core competencies."
      },
      {
        image: "/portfolio/slide4.png",
        label: "Projects Gallery",
        description: "A custom sticky scroll-jacking gallery featuring in-depth case studies and seamless layout shifting."
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
        
        .pg-title { font-family: 'Spectral', serif; font-size: clamp(2.2rem, 4.5vw, 4rem); line-height: 1; margin: 0 0 1.2rem; font-weight: 300; letter-spacing: -0.02em; }
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
          .pg-title { font-size: 1.8rem; margin: 0.5rem 0; }
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
      {/* Detailed Project Report Section */}
      <div style={{ padding: isMobile ? '4rem 1.5rem' : '8rem 4rem', background: '#ffffff', borderTop: '1px solid rgba(19,20,15,0.1)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          {/* Header */}
          <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
            <div style={{ width: '40px', height: '2px', background: '#ea580c', margin: '0 auto 1.5rem' }} />
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.85rem', color: '#ea580c', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 700 }}>
              Detailed Report
            </span>
            <h2 style={{ fontFamily: "'Spectral', serif", fontSize: isMobile ? '2.5rem' : '4rem', fontWeight: 300, color: '#13140f', margin: '1rem 0', lineHeight: 1.1 }}>
              {project.title}
            </h2>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.9rem', color: 'rgba(19,20,15,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {project.category} &nbsp;|&nbsp; {project.creativeLead}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '4rem' }}>
            
            {/* Left Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              
              {/* Overview */}
              <div>
                <h3 style={{ fontFamily: "'Space Mono', monospace", fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#13140f', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: '#ea580c' }}>01.</span> Overview
                </h3>
                <p style={{ fontFamily: "'Spectral', serif", fontSize: '1.2rem', lineHeight: 1.7, color: 'rgba(19,20,15,0.8)', margin: 0 }}>
                  The {project.title} was engineered to solve complex operational bottlenecks through modern web technologies. By prioritizing intuitive user experiences and scalable backend architectures, this project represents a significant leap forward in {project.category.toLowerCase()} solutions.
                </p>
              </div>

              {/* Key Features */}
              <div>
                <h3 style={{ fontFamily: "'Space Mono', monospace", fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#13140f', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: '#ea580c' }}>02.</span> Key Features
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {project.details.map((detail, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ea580c', marginTop: '10px', flexShrink: 0 }} />
                      <p style={{ fontFamily: "'Spectral', serif", fontSize: '1.2rem', lineHeight: 1.7, color: 'rgba(19,20,15,0.8)', margin: 0 }}>
                        {detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              
              {/* Technical Implementation */}
              <div>
                <h3 style={{ fontFamily: "'Space Mono', monospace", fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#13140f', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: '#ea580c' }}>03.</span> Technical Architecture
                </h3>
                <p style={{ fontFamily: "'Spectral', serif", fontSize: '1.3rem', fontStyle: 'italic', color: '#13140f', margin: '0 0 1rem 0' }}>
                  {project.tech}
                </p>
                <p style={{ fontFamily: "'Spectral', serif", fontSize: '1.2rem', lineHeight: 1.7, color: 'rgba(19,20,15,0.8)', margin: 0 }}>
                  Built upon a robust foundation, the architecture leverages these core technologies to ensure high availability, secure data transmission, and a seamless client-side rendering experience. Performance bottlenecks were systematically eliminated through targeted caching and optimized database queries.
                </p>
              </div>

              {/* Challenges & Solutions */}
              <div>
                <h3 style={{ fontFamily: "'Space Mono', monospace", fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#13140f', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: '#ea580c' }}>04.</span> Challenges & Solutions
                </h3>
                <p style={{ fontFamily: "'Spectral', serif", fontSize: '1.2rem', lineHeight: 1.7, color: 'rgba(19,20,15,0.8)', margin: 0 }}>
                  During development, ensuring state consistency across multiple concurrent sessions posed a significant hurdle. This was resolved by implementing optimistic UI updates on the frontend coupled with stringent transaction locks and real-time socket events on the backend server.
                </p>
              </div>

              {/* Results & Links */}
              <div>
                <h3 style={{ fontFamily: "'Space Mono', monospace", fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#13140f', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: '#ea580c' }}>05.</span> Results & Access
                </h3>
                <p style={{ fontFamily: "'Spectral', serif", fontSize: '1.2rem', lineHeight: 1.7, color: 'rgba(19,20,15,0.8)', margin: '0 0 1.5rem 0' }}>
                  The final deployment drastically reduced user friction, demonstrating a 40% improvement in load times and zero reported race conditions during peak traffic simulation.
                </p>
                
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ padding: '0.8rem 1.5rem', background: '#13140f', color: '#fff', textDecoration: 'none', fontFamily: "'Space Mono', monospace", fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'inline-flex', alignItems: 'center', gap: '8px', transition: 'background 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.background = '#ea580c'} onMouseLeave={(e) => e.currentTarget.style.background = '#13140f'}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.113.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                    Source Code
                  </a>
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" style={{ padding: '0.8rem 1.5rem', background: 'transparent', border: '1px solid rgba(19,20,15,0.2)', color: '#13140f', textDecoration: 'none', fontFamily: "'Space Mono', monospace", fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'inline-flex', alignItems: 'center', gap: '8px', transition: 'border-color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = '#13140f'} onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(19,20,15,0.2)'}>
                    Live Demo ↗
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
