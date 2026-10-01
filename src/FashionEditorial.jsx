import React, { useLayoutEffect, useEffect, useRef, useState, useMemo } from 'react';
import profilePic from './profilePic';
import DriftHero from './DriftHero';
import SettleDeck from './SettleDeck';
import Orrery from './Orrery';
import FullscreenCards from './FullscreenCards';
import FolderArchive from './FolderArchive';
import Footer from './Footer';
import TerminalSection from './TerminalSection';
import Timeline from './Timeline';
import CinematicTestimonials from './CinematicTestimonials';
import Pageflip from './Pageflip';
import CodingProfiles from './CodingProfiles';
import Contact from './Contact';

/**
 * Ijji Madhu Venkat — Luxury Editorial Developer Portfolio
 * 
 * Features:
 * - In-Hero Transparent Navbar: Directly on the hero section canvas with NO separate background,
 *   transparent styling with 3D isometric cube logo, menu items, and pill button.
 * - Sticky Scrolled Navbar: When user scrolls past the hero section, the navbar smoothly slides in
 *   at the top with a white frosted background (rgba(255, 255, 255, 0.98)) and shadow.
 * - Continuous 4-Line Philosophy Statement: 4 points flowing continuously with NO breaking divs.
 * - Animated bouncing scroll down arrow button below the 4-line text.
 * - PrebuiltUI 3D cube logo + "Madhu." in Playfair font.
 * - 100% Fully Mobile Responsive (Mobile & Desktop).
 * - Jadoo Organic Peach Shape, Lilac Atmospheric Aura, and Flying Airplanes.
 * - Slanted Infinite Marquee Ticker Ribbon in Orange & White theme.
 */

const STAGE_WIDTH = 1200;

function ScrollReveal({ children }) {
  const ref = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="reveal-section">
      {children}
    </div>
  );
}

// Dimensions calculation for instant mount with zero black reload gap
const getInitialDimensions = () => {
  if (typeof window !== 'undefined') {
    const w = window.innerWidth || (document.documentElement ? document.documentElement.clientWidth : 1200);
    const h = window.innerHeight || (document.documentElement ? document.documentElement.clientHeight : 700);
    const s = w / STAGE_WIDTH;
    return {
      windowWidth: w,
      scale: s,
      stageHeight: Math.max(540, Math.round(h / s)),
    };
  }
  return { windowWidth: 1200, scale: 1, stageHeight: 700 };
};

export default function FashionEditorial() {
  const containerRef = useRef(null);
  const [{ windowWidth, scale, stageHeight }, setDimensions] = useState(getInitialDimensions);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Synchronous layout effect for instant resize and mount
  useLayoutEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth || (containerRef.current ? containerRef.current.clientWidth : 1200);
      const h = window.innerHeight || (containerRef.current ? containerRef.current.clientHeight : 700);

      const newScale = w / STAGE_WIDTH;
      const newStageHeight = Math.max(540, Math.round(h / newScale));

      setDimensions({ windowWidth: w, scale: newScale, stageHeight: newStageHeight });
    };

    handleResize();
    const observer = new ResizeObserver(handleResize);
    if (containerRef.current) observer.observe(containerRef.current);
    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Scroll listener: activates sticky navbar ONLY after scrolling down past the hero section
  useEffect(() => {
    const handleScroll = () => {
      const heroThreshold = Math.max(380, (stageHeight * scale) * 0.7);
      if (window.scrollY > heroThreshold) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [stageHeight, scale]);

  const isMobile = windowWidth < 860;

  // Static CSS keyframes for marquee scroll, floating badges, and scroll arrow
  const cssKeyframes = useMemo(() => {
    return `
      @import url('https://fonts.googleapis.com/css2?family=Playfair:ital,opsz,wght@0,5..1200,300..900;1,5..1200,300..900&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Volkhov:ital,wght@0,700;1,700&display=swap');

      /* Seamless infinite marquee ticker scroll */
      @keyframes marquee-scroll {
        0% {
          transform: translateX(0%);
          -webkit-transform: translateX(0%);
        }
        100% {
          transform: translateX(-50%);
          -webkit-transform: translateX(-50%);
        }
      }

      /* Subtle floating motion for pill badges */
      @keyframes float-pill-1 {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-5px); }
      }
      @keyframes float-pill-2 {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(5px); }
      }

      /* Sticky navbar slide down animation */
      @keyframes nav-slide-down {
        from {
          opacity: 0;
          transform: translateY(-100%);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* Mobile drawer animation */
      @keyframes slide-down {
        from { opacity: 0; transform: translateY(-8px); }
        to { opacity: 1; transform: translateY(0); }
      }

      /* Bouncing animation for scroll down arrow */
      @keyframes bounce-scroll {
        0%, 20%, 50%, 80%, 100% {
          transform: translateY(0);
        }
        40% {
          transform: translateY(10px);
        }
        60% {
          transform: translateY(5px);
        }
      }
      
      /* DROPDOWN NAVBAR STYLES */
      .nav-item {
        position: relative;
        display: inline-block;
      }
      .nav-dropdown {
        position: absolute;
        top: 100%;
        left: -20px;
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(16px);
        padding: 12px 0;
        border-radius: 8px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.1);
        opacity: 0;
        visibility: hidden;
        transform: translateY(10px);
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        min-width: 180px;
        display: flex;
        flex-direction: column;
        z-index: 1000;
        border: 1px solid rgba(0,0,0,0.05);
      }
      .nav-item:hover .nav-dropdown {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }
      .nav-dropdown a {
        padding: 10px 24px;
        color: #171717;
        text-decoration: none;
        font-size: 14px;
        font-weight: 500;
        font-family: 'Space Mono', monospace;
        transition: all 0.2s ease;
        display: block;
      }
      .nav-dropdown a:hover {
        background: rgba(234, 88, 12, 0.08);
        color: #ea580c;
        padding-left: 28px;
      }

      /* SCROLL REVEAL ANIMATIONS */
      .reveal-section {
        opacity: 0;
        transform: translateY(40px);
        transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .reveal-section.is-visible {
        opacity: 1;
        transform: translateY(0);
      }

      @media (prefers-reduced-motion: reduce) {
        *, ::before, ::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    `;
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        minHeight: '100vh',
        overflowX: 'clip',
        position: 'relative',
        backgroundColor: '#ffffff',
        fontFamily: "'Space Mono', monospace",
      }}
    >
      <style>{cssKeyframes}</style>

      {/* LUXURY NAVBAR */}
      {isScrolled && <LuxuryNavbar isMobile={isMobile} />}

      {/* HERO SECTION */}
      {/* 
        Original Hero Section Code preserved as requested
        
        {isMobile ? (
          <MobileHeroSection
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: stageHeight * scale,
              position: 'relative',
              overflow: 'hidden',
              backgroundColor: '#ffffff',
            }}
          >
            <div
              style={{
                width: STAGE_WIDTH,
                height: stageHeight,
                position: 'absolute',
                top: 0,
                left: 0,
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
                backgroundColor: '#ffffff',
                overflow: 'hidden',
              }}
            >
              <DesktopHeroContent stageHeight={stageHeight} />
              <SlantedTickerRibbon isMobile={false} />
            </div>
          </div>
        )}
      */}

      {/* NEW DRIFT DESK HERO REPLACEMENT */}
      <DriftHero />

      {/* Under Hero: Dedicated Continuous 4-Line Philosophy Section with Bouncing Scroll Down Arrow */}
      <div id="editorial-statement">
        <ScrollReveal>
          <EditorialStatementSection isMobile={isMobile} />
        </ScrollReveal>
      </div>

      {/* Settle: Pinned Scroll Deck Sequence (Services Provided) */}
      {/* <div id="services">
        <SettleDeck />
      </div> */}

      {/* Orrery Orbital Focus Gallery */}
      <div id="skills">
        <ScrollReveal>
          <Orrery />
        </ScrollReveal>
      </div>

      {/* The Journey Timeline */}
      <div id="timeline">
        <ScrollReveal>
          <Timeline />
        </ScrollReveal>
      </div>

      {/* Fullscreen Rolling Cards (Projects) */}
      <div id="projects">
        <FullscreenCards />
      </div>

      {/* Coding Profiles (LeetCode & GitHub) */}
      <div id="coding-profiles">
        <ScrollReveal>
          <CodingProfiles />
        </ScrollReveal>
      </div>

      {/* Realistic 3D Pageflip Magazine */}
      {/* <ScrollReveal>
        <Pageflip />
      </ScrollReveal> */}

      {/* GATE 2027 Resources / Folder Archive */}
      {/* <div id="folder-archive">
        <ScrollReveal>
          <FolderArchive />
        </ScrollReveal>
      </div> */}

      {/* Cinematic Testimonial Card Stack */}
      <div id="testimonials">
        <ScrollReveal>
          <CinematicTestimonials />
        </ScrollReveal>
      </div>

      {/* Fake Terminal Section */}
      <div id="terminal">
        <ScrollReveal>
          <TerminalSection />
        </ScrollReveal>
      </div>

      {/* Contact Section */}
      <div id="contact">
        <ScrollReveal>
          <Contact />
        </ScrollReveal>
      </div>

      {/* Footer Section */}
      <div id="footer">
        <Footer />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// STICKY SCROLLED NAVBAR (Appears only AFTER scrolling down past the hero)
// Clean white background with soft shadow & frosted blur
// ---------------------------------------------------------------------------
export function StickyScrolledNavbar({ isMobile, mobileMenuOpen, setMobileMenuOpen }) {
  return (
    <nav
      style={{
        height: 70,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        padding: isMobile ? '0 20px' : '0 clamp(24px, 5vw, 96px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.96)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        color: '#374151',
        boxShadow: '0px 4px 25px 0px rgba(0, 0, 0, 0.07)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
        boxSizing: 'border-box',
        animation: 'nav-slide-down 0.28s ease-out',
      }}
    >
      {/* Brand Logo: 3D Isometric Cube + "Madhu." */}
      <a
        href="#"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          textDecoration: 'none',
          color: '#181e4b',
        }}
      >
        <svg
          width="32"
          height="34"
          viewBox="0 0 31 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ flexShrink: 0 }}
        >
          <path
            d="m8.75 11.3 6.75 3.884 6.75-3.885M8.75 34.58v-7.755L2 22.939m27 0-6.75 3.885v7.754M2.405 15.408 15.5 22.954l13.095-7.546M15.5 38V22.939M29 28.915V16.962a2.98 2.98 0 0 0-1.5-2.585L17 8.4a3.01 3.01 0 0 0-3 0L3.5 14.377A3 3 0 0 0 2 16.962v11.953A2.98 2.98 0 0 0 3.5 31.5L14 37.477a3.01 3.01 0 0 0 3 0L27.5 31.5a3 3 0 0 0 1.5-2.585"
            stroke="#ea580c"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <span
          style={{
            fontFamily: "'Spectral', serif",
            fontSize: 22,
            fontWeight: 700,
            color: '#181e4b',
            letterSpacing: 0.2,
          }}
        >
          Madhu<span style={{ color: '#ea580c' }}>.</span>
        </span>
      </a>

      {/* Desktop Navigation Links */}
      {!isMobile && (
        <ul
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 40,
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
        >
          {['Home', 'Services', 'Portfolio', 'Pricing'].map((item, idx) => (
            <li key={item}>
              <a
                href={item === 'Home' ? '#' : `#${item.toLowerCase()}`}
                style={{
                  fontFamily: "'Spectral', serif",
                  fontSize: 15,
                  fontWeight: idx === 0 ? 700 : 500,
                  color: idx === 0 ? '#ea580c' : '#4b5563',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  padding: '4px 0',
                  borderBottom: idx === 0 ? '2px solid #ea580c' : 'none',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ea580c')}
                onMouseLeave={(e) => {
                  if (idx !== 0) e.currentTarget.style.color = '#4b5563';
                }}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      )}

      {/* Desktop "Get started" Pill Button */}
      {!isMobile && (
        <button
          type="button"
          onClick={() => {
            const el = document.getElementById('editorial-statement');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          style={{
            fontFamily: "'Spectral', serif",
            fontSize: 14,
            fontWeight: 600,
            color: '#4b5563',
            backgroundColor: '#ffffff',
            border: '1px solid #d1d5db',
            borderRadius: 9999,
            width: 160,
            height: 44,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#ea580c';
            e.currentTarget.style.borderColor = '#ea580c';
            e.currentTarget.style.color = '#ffffff';
            e.currentTarget.style.boxShadow = '0 6px 18px rgba(234, 88, 12, 0.28)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#ffffff';
            e.currentTarget.style.borderColor = '#d1d5db';
            e.currentTarget.style.color = '#4b5563';
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
          }}
        >
          Get started
        </button>
      )}

      {/* Mobile Menu Button Toggle */}
      {isMobile && (
        <button
          aria-label="menu-btn"
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            background: 'none',
            border: 'none',
            padding: 6,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="#000">
            <path d="M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z"></path>
          </svg>
        </button>
      )}

      {/* Mobile Menu Dropdown Drawer */}
      {isMobile && mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: 70,
            left: 0,
            width: '100%',
            backgroundColor: '#ffffff',
            padding: 24,
            boxShadow: '0 16px 36px rgba(0, 0, 0, 0.12)',
            borderTop: '1px solid #f3f4f6',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            zIndex: 45,
            animation: 'slide-down 0.2s ease-out',
          }}
        >
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}
          >
            {['Home', 'Services', 'Portfolio', 'Pricing'].map((item, idx) => (
              <li key={item}>
                <a
                  href={item === 'Home' ? '#' : `#${item.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontFamily: "'Spectral', serif",
                    fontSize: 15,
                    fontWeight: idx === 0 ? 700 : 500,
                    color: idx === 0 ? '#ea580c' : '#374151',
                    textDecoration: 'none',
                    display: 'block',
                    padding: '6px 0',
                  }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              const el = document.getElementById('editorial-statement');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              fontFamily: "'Spectral', serif",
              fontSize: 14,
              fontWeight: 600,
              color: '#4b5563',
              backgroundColor: '#ffffff',
              border: '1px solid #d1d5db',
              borderRadius: 9999,
              width: 160,
              height: 44,
              cursor: 'pointer',
              marginTop: 10,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Get started
          </button>
        </div>
      )}
    </nav>
  );
}

// ---------------------------------------------------------------------------
// IN-HERO TRANSPARENT NAVBAR (Directly on Hero Canvas, No Separate Background)
// ---------------------------------------------------------------------------
export function HeroTransparentNavbar({ isMobile, mobileMenuOpen, setMobileMenuOpen }) {
  return (
    <nav
      style={{
        height: 70,
        position: 'relative',
        width: '100%',
        padding: isMobile ? '0 20px' : '0 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 35,
        backgroundColor: 'transparent',
        boxShadow: 'none',
        borderBottom: 'none',
        boxSizing: 'border-box',
      }}
    >
      {/* Brand Logo: 3D Isometric Cube + "Madhu." */}
      <a
        href="#"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          textDecoration: 'none',
          color: '#181e4b',
        }}
      >
        <svg
          width="32"
          height="34"
          viewBox="0 0 31 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ flexShrink: 0 }}
        >
          <path
            d="m8.75 11.3 6.75 3.884 6.75-3.885M8.75 34.58v-7.755L2 22.939m27 0-6.75 3.885v7.754M2.405 15.408 15.5 22.954l13.095-7.546M15.5 38V22.939M29 28.915V16.962a2.98 2.98 0 0 0-1.5-2.585L17 8.4a3.01 3.01 0 0 0-3 0L3.5 14.377A3 3 0 0 0 2 16.962v11.953A2.98 2.98 0 0 0 3.5 31.5L14 37.477a3.01 3.01 0 0 0 3 0L27.5 31.5a3 3 0 0 0 1.5-2.585"
            stroke="#ea580c"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <span
          style={{
            fontFamily: "'Spectral', serif",
            fontSize: 22,
            fontWeight: 700,
            color: '#181e4b',
            letterSpacing: 0.2,
          }}
        >
          Madhu<span style={{ color: '#ea580c' }}>.</span>
        </span>
      </a>

      {/* Desktop Navigation Links directly on hero canvas */}
      {!isMobile && (
        <ul
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 40,
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
        >
          {NAV_LINKS.map((item, idx) => (
            <li key={idx} className={item.dropdown ? "nav-item" : ""}>
              <a
                href={item.href}
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 15,
                  fontWeight: idx === 0 ? 700 : 600,
                  color: idx === 0 ? '#ea580c' : '#181e4b',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  padding: '4px 0',
                  borderBottom: idx === 0 ? '2px solid #ea580c' : 'none',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ea580c')}
                onMouseLeave={(e) => {
                  if (idx !== 0) e.currentTarget.style.color = '#181e4b';
                }}
              >
                {item.label}
              </a>
              {item.dropdown && (
                <div className="nav-dropdown">
                  {item.dropdown.map(drop => (
                    <a key={drop.label} href={drop.href}>{drop.label}</a>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Desktop "Contact Me" Pill Button */}
      {!isMobile && (
        <a
          href="#contact"
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 14,
            fontWeight: 600,
            color: '#181e4b',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            border: '1px solid rgba(24, 30, 75, 0.18)',
            borderRadius: 9999,
            width: 160,
            height: 44,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
            backdropFilter: 'blur(6px)',
            textDecoration: 'none'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#ea580c';
            e.currentTarget.style.borderColor = '#ea580c';
            e.currentTarget.style.color = '#ffffff';
            e.currentTarget.style.boxShadow = '0 6px 18px rgba(234, 88, 12, 0.28)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.85)';
            e.currentTarget.style.borderColor = 'rgba(24, 30, 75, 0.18)';
            e.currentTarget.style.color = '#181e4b';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
          }}
        >
          Contact Me
        </a>
      )}

      {/* Mobile Menu Button Toggle */}
      {isMobile && (
        <button
          aria-label="menu-btn"
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            background: 'none',
            border: 'none',
            padding: 6,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="#181e4b">
            <path d="M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z"></path>
          </svg>
        </button>
      )}

      {/* Mobile Dropdown Menu Drawer */}
      {isMobile && mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: 70,
            left: 0,
            width: '100%',
            backgroundColor: '#ffffff',
            padding: 24,
            boxShadow: '0 16px 36px rgba(0, 0, 0, 0.12)',
            borderTop: '1px solid #f3f4f6',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            zIndex: 45,
            animation: 'slide-down 0.2s ease-out',
            maxHeight: 'calc(100vh - 70px)',
            overflowY: 'auto'
          }}
        >
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}
          >
            {NAV_LINKS.flatMap(item => item.dropdown ? [...item.dropdown] : [item]).map((item, idx) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 15,
                    fontWeight: idx === 0 ? 700 : 500,
                    color: idx === 0 ? '#ea580c' : '#374151',
                    textDecoration: 'none',
                    display: 'block',
                    padding: '6px 0',
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 14,
              fontWeight: 600,
              color: '#ffffff',
              backgroundColor: '#ea580c',
              border: 'none',
              borderRadius: 9999,
              width: 160,
              height: 44,
              cursor: 'pointer',
              marginTop: 10,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none'
            }}
          >
            Contact Me
          </a>
        </div>
      )}
    </nav>
  );
}

// ---------------------------------------------------------------------------
// MOBILE HERO SECTION (< 860px Breakpoint)
// ---------------------------------------------------------------------------
function MobileHeroSection({ mobileMenuOpen, setMobileMenuOpen }) {
  return (
    <div
      style={{
        width: '100%',
        position: 'relative',
        backgroundColor: '#ffffff',
        overflow: 'hidden',
      }}
    >
      {/* 1. Transparent Navbar directly on mobile hero canvas */}
      <HeroTransparentNavbar
        isMobile={true}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Background Shapes for Mobile */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          overflow: 'hidden',
          zIndex: 1,
        }}
      >
        <svg
          style={{ position: 'absolute', top: -40, right: -60, width: 340, height: 340 }}
          viewBox="0 0 1440 724"
          fill="none"
        >
          <path
            d="M758.307 222C717.907 153.2 741.474 13.3333 758.307 -48L1437.81 -149L1502.31 122.5L1463.81 723.5C1385.14 724.5 1209.71 717 1137.31 679C1046.81 631.5 1087.81 555 1012.81 515C937.807 475 980.807 369.5 954.807 329.5C928.807 289.5 808.807 308 758.307 222Z"
            fill="#FED7A2"
            opacity="0.9"
          />
        </svg>

        {/* Flying Airplane on Mobile */}
        <div style={{ position: 'absolute', top: 50, right: 18, zIndex: 2 }}>
          <svg width="75" height="50" viewBox="0 0 125 80" fill="none">
            <path
              d="M5 70 C40 50, 75 40, 110 20"
              stroke="#2ba0ff"
              strokeWidth="2.2"
              strokeDasharray="4 4"
              strokeOpacity="0.85"
            />
            <g transform="translate(100, 10) rotate(-18)">
              <path d="M0 8 L22 2 L26 8 L10 12 L16 19 L12 20 L8 13 L2 14 L0 8 Z" fill="#ffffff" stroke="#1ea1f3" strokeWidth="1.3" />
              <path d="M14 4 L24 2 L26 8 L18 7 Z" fill="#1ea1f3" />
            </g>
          </svg>
        </div>
      </div>

      {/* 2. Mobile Hero Content Stack */}
      <div
        style={{
          position: 'relative',
          zIndex: 5,
          padding: '28px 20px 0 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          boxSizing: 'border-box',
        }}
      >
        {/* Kicker badge */}
        <div
          style={{
            fontFamily: "'Spectral', serif",
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: 2,
            color: '#ea580c',
            textTransform: 'uppercase',
            marginBottom: 12,
          }}
        >
          BEST ARCHITECTURE · IJJI MADHU VENKAT
        </div>

        {/* Headline with Playfair & Curved Orange Underline */}
        <h1
          style={{
            fontFamily: "'Spectral', serif",
            fontSize: 'clamp(32px, 8.2vw, 42px)',
            fontWeight: 700,
            lineHeight: 1.25,
            letterSpacing: -0.4,
            color: '#181e4b',
            margin: '0 0 14px 0',
            maxWidth: 480,
          }}
        >
          Build,{' '}
          <span
            style={{
              position: 'relative',
              display: 'inline-block',
              whiteSpace: 'nowrap',
            }}
          >
            scale
            {/* Iconic Curved Orange Brush Stroke Underline */}
            <svg
              width="100%"
              height="14"
              viewBox="0 0 160 14"
              fill="none"
              style={{
                position: 'absolute',
                bottom: -2,
                left: 0,
                width: '100%',
                zIndex: -1,
                overflow: 'visible',
                pointerEvents: 'none',
              }}
            >
              <path
                d="M3 9 C40 3, 110 2, 155 7 C115 13, 50 14, 4 10 Z"
                fill="#ea580c"
              />
              <path
                d="M12 7 C60 4, 130 3, 152 8 C105 11, 45 10, 15 8 Z"
                fill="#ff6b35"
                opacity="0.8"
              />
            </svg>
          </span>{' '}
          and deploy modern intelligent systems
        </h1>

        {/* Subtitle in Playfair */}
        <p
          style={{
            fontFamily: "'Spectral', serif",
            fontSize: 14.5,
            fontWeight: 500,
            lineHeight: 1.6,
            color: '#5e6282',
            margin: '0 0 22px 0',
            maxWidth: 460,
          }}
        >
          Architecting high-scale web platforms, generative AI autonomous agents, and resilient cloud microservices with React, Next.js, Node.js, and PostgreSQL.
        </p>

        {/* CTA Buttons Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 16,
            marginBottom: 28,
          }}
        >
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('editorial-statement');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              fontFamily: "'Spectral', serif",
              fontSize: 13.5,
              fontWeight: 700,
              color: '#ffffff',
              backgroundColor: '#ea580c',
              backgroundImage: 'linear-gradient(135deg, #ff6b35 0%, #ea580c 100%)',
              border: 'none',
              borderRadius: 10,
              padding: '12px 24px',
              boxShadow: '0 12px 24px rgba(234, 88, 12, 0.3)',
              cursor: 'pointer',
              letterSpacing: 0.2,
            }}
          >
            Find out more
          </button>

          {/* Play Demo Button */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                backgroundColor: '#ea580c',
                backgroundImage: 'linear-gradient(135deg, #ff6b35 0%, #ea580c 100%)',
                boxShadow: '0 10px 22px rgba(234, 88, 12, 0.28)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <svg width="11" height="13" viewBox="0 0 12 14" fill="none">
                <path d="M11 7L1 1.2265V12.7735L11 7Z" fill="#ffffff" />
              </svg>
            </div>
            <span
              style={{
                fontFamily: "'Spectral', serif",
                fontSize: 14,
                fontWeight: 600,
                color: '#5e6282',
                letterSpacing: 0.2,
              }}
            >
              Play Demo
            </span>
          </div>
        </div>

        {/* 3. Portrait Cutout with Floating Badges (Touching Marquee at Bottom) */}
        <div
          style={{
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            width: '100%',
            maxWidth: 380,
            marginTop: 10,
            paddingBottom: 8,
          }}
        >
          {/* Badge 1: White pill on Bottom-Left */}
          <div
            style={{
              position: 'absolute',
              bottom: 46,
              left: 4,
              zIndex: 14,
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#ffffff',
              color: '#181e4b',
              padding: '7px 14px',
              borderRadius: 20,
              border: '1.5px solid rgba(234, 88, 12, 0.35)',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
              animation: 'float-pill-1 4.5s ease-in-out infinite',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: -7,
                left: 12,
                width: 0,
                height: 0,
                borderLeft: '5px solid transparent',
                borderRight: '5px solid transparent',
                borderBottom: '8px solid #ea580c',
                transform: 'rotate(-24deg)',
              }}
            />
            <span
              style={{
                fontFamily: "'Spectral', serif",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 0.2,
                whiteSpace: 'nowrap',
              }}
            >
              Full Stack Developer
            </span>
          </div>

          {/* Badge 2: Orange pill on Top-Right */}
          <div
            style={{
              position: 'absolute',
              top: 50,
              right: 4,
              zIndex: 14,
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#ea580c',
              backgroundImage: 'linear-gradient(135deg, #ff6b35 0%, #ea580c 100%)',
              color: '#ffffff',
              padding: '7px 14px',
              borderRadius: 20,
              boxShadow: '0 10px 24px rgba(234, 88, 12, 0.35)',
              animation: 'float-pill-2 5s ease-in-out infinite',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: -7,
                left: 12,
                width: 0,
                height: 0,
                borderLeft: '5px solid transparent',
                borderRight: '5px solid transparent',
                borderBottom: '8px solid #ea580c',
                transform: 'rotate(-24deg)',
              }}
            />
            <span
              style={{
                fontFamily: "'Spectral', serif",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 0.2,
                whiteSpace: 'nowrap',
              }}
            >
              React · Node · Next.js
            </span>
          </div>

          {/* Transparent Cutout Portrait */}
          <CutoutPortrait
            src={profilePic || '/madhu.jpg'}
            alt="Ijji Madhu Venkat"
            style={{
              maxHeight: 'clamp(280px, 46vh, 370px)',
              maxWidth: '85vw',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain',
              filter: 'drop-shadow(0 16px 26px rgba(0, 0, 0, 0.22)) drop-shadow(0 6px 14px rgba(234, 88, 12, 0.15))',
              position: 'relative',
              zIndex: 8,
              pointerEvents: 'none',
              userSelect: 'none',
              display: 'block',
            }}
          />
        </div>
      </div>

      {/* 4. Slanted Marquee Ribbon for Mobile */}
      <div style={{ position: 'relative', width: '100%', height: 60, marginTop: -14, overflow: 'hidden' }}>
        <SlantedTickerRibbon isMobile={true} />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// DESKTOP HERO CONTENT (>= 860px Breakpoint)
// ---------------------------------------------------------------------------
function DesktopHeroContent({ stageHeight }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        width: STAGE_WIDTH,
        height: '100%',
        overflow: 'hidden',
        background: 'radial-gradient(circle at 8% 18%, rgba(213, 174, 228, 0.42) 0%, rgba(213, 174, 228, 0.15) 38%, transparent 68%), #ffffff',
      }}
    >
      {/* 1. Transparent Navbar directly on Hero Section Canvas (No Separate Background) */}
      <HeroTransparentNavbar isMobile={false} />

      {/* 2. JADOO HERO BACKGROUND SHAPE (Peach) */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1,
          overflow: 'visible',
        }}
        viewBox="0 0 1440 724"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <filter id="filter0_f_hero" x="-570" y="-210" width="780" height="800" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feGaussianBlur stdDeviation="75" />
          </filter>
        </defs>

        <g opacity="0.45" filter="url(#filter0_f_hero)">
          <ellipse cx="-180.528" cy="188.597" rx="239.472" ry="248.432" fill="#D5AEE4" />
        </g>

        <path
          d="M758.307 222C717.907 153.2 741.474 13.3333 758.307 -48L1437.81 -149L1502.31 122.5L1463.81 723.5C1385.14 724.5 1209.71 717 1137.31 679C1046.81 631.5 1087.81 555 1012.81 515C937.807 475 980.807 369.5 954.807 329.5C928.807 289.5 808.807 308 758.307 222Z"
          fill="#FED7A2"
          opacity="0.92"
        />
      </svg>

      {/* 3. TWO FLYING AIRPLANES */}
      <div style={{ position: 'absolute', top: 90, left: 620, zIndex: 4, pointerEvents: 'none' }}>
        <svg width="125" height="80" viewBox="0 0 125 80" fill="none">
          <path
            d="M5 70 C40 50, 75 40, 110 20"
            stroke="#2ba0ff"
            strokeWidth="2"
            strokeDasharray="4 4"
            strokeOpacity="0.85"
          />
          <g transform="translate(100, 10) rotate(-18)">
            <path d="M0 8 L22 2 L26 8 L10 12 L16 19 L12 20 L8 13 L2 14 L0 8 Z" fill="#ffffff" stroke="#1ea1f3" strokeWidth="1.3" />
            <path d="M14 4 L24 2 L26 8 L18 7 Z" fill="#1ea1f3" />
            <polygon points="6,9 11,8 9,12" fill="#1ea1f3" />
          </g>
        </svg>
      </div>

      <div style={{ position: 'absolute', top: 95, right: 45, zIndex: 4, pointerEvents: 'none' }}>
        <svg width="95" height="70" viewBox="0 0 95 70" fill="none">
          <path
            d="M10 60 C35 42, 60 30, 85 16"
            stroke="#2ba0ff"
            strokeWidth="2"
            strokeDasharray="3 3"
            strokeOpacity="0.85"
          />
          <g transform="translate(74, 8) rotate(-28)">
            <path d="M0 7 L20 2 L24 7 L9 11 L14 17 L11 18 L7 12 L2 13 L0 7 Z" fill="#ffffff" stroke="#1ea1f3" strokeWidth="1.3" />
            <path d="M12 4 L22 2 L24 7 L16 6 Z" fill="#1ea1f3" />
          </g>
        </svg>
      </div>

      {/* 4. MAIN HERO CONTENT CONTAINER (Flexbox centered) */}
      <div
        style={{
          position: 'absolute',
          top: 76,
          bottom: 0,
          left: 60,
          right: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 6,
          boxSizing: 'border-box',
        }}
      >
        {/* Left Column: Kicker, Headline, Subtitle, Buttons */}
        <div
          style={{
            width: 530,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            zIndex: 8,
          }}
        >
          <div
            style={{
              fontFamily: "'Spectral', serif",
              fontSize: 12.5,
              fontWeight: 800,
              letterSpacing: 2.2,
              color: '#ea580c',
              textTransform: 'uppercase',
              marginBottom: 14,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            BEST ARCHITECTURE · IJJI MADHU VENKAT
          </div>

          <h1
            style={{
              fontFamily: "'Spectral', serif",
              fontSize: 44,
              fontWeight: 700,
              lineHeight: 1.25,
              letterSpacing: -0.4,
              color: '#181e4b',
              margin: '0 0 16px 0',
            }}
          >
            Build,{' '}
            <span
              style={{
                position: 'relative',
                display: 'inline-block',
                whiteSpace: 'nowrap',
              }}
            >
              scale
              <svg
                width="100%"
                height="14"
                viewBox="0 0 160 14"
                fill="none"
                style={{
                  position: 'absolute',
                  bottom: -2,
                  left: 0,
                  width: '100%',
                  zIndex: -1,
                  overflow: 'visible',
                  pointerEvents: 'none',
                }}
              >
                <path
                  d="M3 9 C40 3, 110 2, 155 7 C115 13, 50 14, 4 10 Z"
                  fill="#ea580c"
                />
                <path
                  d="M12 7 C60 4, 130 3, 152 8 C105 11, 45 10, 15 8 Z"
                  fill="#ff6b35"
                  opacity="0.8"
                />
              </svg>
            </span>{' '}
            and deploy modern intelligent systems
          </h1>

          <p
            style={{
              fontFamily: "'Spectral', serif",
              fontSize: 14.5,
              fontWeight: 500,
              lineHeight: 1.65,
              color: '#5e6282',
              margin: '0 0 26px 0',
              maxWidth: 460,
            }}
          >
            Architecting high-scale web platforms, generative AI autonomous agents, and resilient cloud microservices with React, Next.js, Node.js, and PostgreSQL. Delivering exceptional performance and seamless UX.
          </p>

          {/* CTA Buttons Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 24,
            }}
          >
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('editorial-statement');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                fontFamily: "'Spectral', serif",
                fontSize: 14,
                fontWeight: 700,
                color: '#ffffff',
                backgroundColor: '#ea580c',
                backgroundImage: 'linear-gradient(135deg, #ff6b35 0%, #ea580c 100%)',
                border: 'none',
                borderRadius: 10,
                padding: '13px 26px',
                boxShadow: '0 14px 28px rgba(234, 88, 12, 0.32)',
                cursor: 'pointer',
                letterSpacing: 0.2,
              }}
            >
              Find out more
            </button>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  backgroundColor: '#ea580c',
                  backgroundImage: 'linear-gradient(135deg, #ff6b35 0%, #ea580c 100%)',
                  boxShadow: '0 12px 26px rgba(234, 88, 12, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
                  <path d="M11 7L1 1.2265V12.7735L11 7Z" fill="#ffffff" />
                </svg>
              </div>
              <span
                style={{
                  fontFamily: "'Spectral', serif",
                  fontSize: 14.5,
                  fontWeight: 600,
                  color: '#5e6282',
                  letterSpacing: 0.2,
                }}
              >
                Play Demo
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Portrait of Ijji Madhu Venkat with Floating Badges */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            position: 'relative',
            zIndex: 8,
            height: '100%',
            paddingRight: 25,
            paddingBottom: 20,
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}
          >
            {/* 1. Floating White Card Pill: Role Title + Orange Pointer */}
            <div
              style={{
                position: 'absolute',
                bottom: 74,
                left: -36,
                zIndex: 14,
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#ffffff',
                color: '#181e4b',
                padding: '9px 18px',
                borderRadius: 24,
                border: '1.5px solid rgba(234, 88, 12, 0.35)',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                animation: 'float-pill-1 4.5s ease-in-out infinite',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: -8,
                  left: 14,
                  width: 0,
                  height: 0,
                  borderLeft: '6px solid transparent',
                  borderRight: '6px solid transparent',
                  borderBottom: '10px solid #ea580c',
                  transform: 'rotate(-24deg)',
                }}
              />
              <span
                style={{
                  fontFamily: "'Spectral', serif",
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: 0.3,
                  whiteSpace: 'nowrap',
                }}
              >
                Full Stack Developer
              </span>
            </div>

            {/* 2. Floating Vibrant Orange Pill: Tech Domain */}
            <div
              style={{
                position: 'absolute',
                bottom: 154,
                right: -28,
                zIndex: 14,
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#ea580c',
                backgroundImage: 'linear-gradient(135deg, #ff6b35 0%, #ea580c 100%)',
                color: '#ffffff',
                padding: '9px 18px',
                borderRadius: 24,
                boxShadow: '0 12px 28px rgba(234, 88, 12, 0.38)',
                animation: 'float-pill-2 5s ease-in-out infinite',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: -8,
                  left: 14,
                  width: 0,
                  height: 0,
                  borderLeft: '6px solid transparent',
                  borderRight: '6px solid transparent',
                  borderBottom: '10px solid #ea580c',
                  transform: 'rotate(-24deg)',
                }}
              />
              <span
                style={{
                  fontFamily: "'Spectral', serif",
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: 0.3,
                  whiteSpace: 'nowrap',
                }}
              >
                React · Node · Next.js
              </span>
            </div>

            {/* 3. Ijji Madhu Venkat Transparent Cutout Image */}
            <CutoutPortrait
              src={profilePic || '/madhu.jpg'}
              alt="Ijji Madhu Venkat"
              style={{
                maxHeight: 440,
                maxWidth: 405,
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                filter: 'drop-shadow(0 20px 30px rgba(0, 0, 0, 0.25)) drop-shadow(0 8px 18px rgba(234, 88, 12, 0.15))',
                position: 'relative',
                zIndex: 8,
                pointerEvents: 'none',
                userSelect: 'none',
                display: 'block',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Editorial Statement Section (Under Hero Section: Exactly 4 points, continuous)
// Flowing continuously across 4 lines with NO breaking divs
// ---------------------------------------------------------------------------
export function EditorialStatementSection({ isMobile }) {
  return (
    <section
      id="editorial-statement"
      style={{
        width: '100%',
        backgroundColor: '#ffffff',
        padding: isMobile ? '80px 24px' : '140px 60px',
        boxSizing: 'border-box',
        position: 'relative',
        zIndex: 5,
        overflow: 'hidden',
        borderTop: '1px solid rgba(234, 88, 12, 0.1)',
      }}
    >
      <div
        style={{
          maxWidth: 1240,
          margin: '0 auto',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          gap: isMobile ? '60px' : '100px',
        }}
      >
        {/* Left Column: Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: isMobile ? 'center' : 'flex-start' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 24,
          }}>
            <div style={{ width: 40, height: 2, backgroundColor: '#ea580c' }} />
            <span style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 2,
              color: '#ea580c',
              textTransform: 'uppercase'
            }}>About Me</span>
          </div>

          <h3
            style={{
              fontFamily: "'Spectral', serif",
              fontSize: isMobile ? 'clamp(18px, 4.4vw, 22px)' : 'clamp(21px, 2.2vw, 27px)',
              fontWeight: 500,
              lineHeight: 1.6,
              color: '#181e4b',
              letterSpacing: -0.2,
              margin: 0,
              maxWidth: '100%',
              display: '-webkit-box',
              WebkitLineClamp: 5,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textAlign: isMobile ? 'center' : 'left',
            }}
          >
            I’m a Software Developer and Computer Science Engineering student with strong problem-solving and DSA skills. I specialize in MERN Stack development, building modern and scalable full-stack web applications. I enjoy solving complex problems and turning ideas into practical, user-focused software solutions. Passionate about continuous learning, clean development, and building impactful real-world applications.
          </h3>
          
          <div
            onClick={() => {
              const el = document.getElementById('services');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              marginTop: 40,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 16,
              cursor: 'pointer',
              borderBottom: '1px solid #181e4b',
              paddingBottom: 6,
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = 0.7}
            onMouseLeave={(e) => e.currentTarget.style.opacity = 1}
          >
            <span style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: 1,
              color: '#181e4b',
              textTransform: 'uppercase'
            }}>View Services</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#181e4b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </div>

        {/* Right Column: Premium Animated Image Background */}
        <div style={{ 
          flex: 1, 
          width: '100%',
          display: 'flex', 
          justifyContent: isMobile ? 'center' : 'flex-end',
          position: 'relative',
        }}>
          <div style={{
            position: 'relative',
            width: isMobile ? '280px' : '420px',
            height: isMobile ? '350px' : '520px',
          }}>
            {/* Background Blob 1 */}
            <div style={{
              position: 'absolute',
              top: '-10%',
              right: '-10%',
              width: '80%',
              height: '80%',
              backgroundColor: 'rgba(234, 88, 12, 0.2)',
              borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
              zIndex: 1,
              animation: 'blob-spin 15s infinite linear'
            }} />
            
            {/* Background Blob 2 */}
            <div style={{
              position: 'absolute',
              bottom: '-5%',
              left: '-15%',
              width: '70%',
              height: '70%',
              backgroundColor: 'rgba(24, 30, 75, 0.15)',
              borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
              zIndex: 1,
              animation: 'blob-spin-reverse 18s infinite linear'
            }} />

            {/* Geometric SVG Accents */}
            <svg style={{ position: 'absolute', top: -30, right: -20, zIndex: 3, opacity: 0.7 }} width="80" height="80" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="48" fill="none" stroke="#ea580c" strokeWidth="1" strokeDasharray="4 6" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="#181e4b" strokeWidth="0.5" />
            </svg>
            
            {/* Plus Icon Accent */}
            <svg style={{ position: 'absolute', bottom: 20, right: -30, zIndex: 3, opacity: 0.6 }} width="40" height="40" viewBox="0 0 24 24">
              <path d="M12 2v20M2 12h20" stroke="#ea580c" strokeWidth="1.5" strokeLinecap="round" />
            </svg>

            {/* The Image */}
            <div style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              zIndex: 2,
            }}>
              <img 
                src="/about-portrait.png" 
                alt="Ijji Madhu Venkat" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  objectPosition: 'bottom center',
                  filter: 'drop-shadow(0 15px 25px rgba(24, 30, 75, 0.2))'
                }}
              />
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes blob-spin {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.05); }
          100% { transform: rotate(360deg) scale(1); }
        }
        @keyframes blob-spin-reverse {
          0% { transform: rotate(360deg) scale(1); }
          50% { transform: rotate(180deg) scale(0.95); }
          100% { transform: rotate(0deg) scale(1); }
        }
      `}</style>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Slanted Dual Ticker Ribbon (Responsive)
// ---------------------------------------------------------------------------
const TICKER_ITEMS = [
  'App Design',
  'Website Design',
  'Dashboard',
  'Wireframe',
  'Full Stack Development',
  'Generative AI & LLMs',
  'Next.js & React',
  'UI/UX Architecture',
  'Cloud & DevOps',
];

function StarburstIcon({ isMobile }) {
  const size = isMobile ? 12 : 15;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      style={{
        flexShrink: 0,
        margin: isMobile ? '0 10px' : '0 16px',
        display: 'inline-block',
        verticalAlign: 'middle',
      }}
    >
      <line x1="10" y1="2" x2="10" y2="18" stroke="#ffffff" strokeWidth="2.1" strokeLinecap="round" />
      <line x1="2" y1="10" x2="18" y2="10" stroke="#ffffff" strokeWidth="2.1" strokeLinecap="round" />
      <line x1="4.34" y1="4.34" x2="15.66" y2="15.66" stroke="#ffffff" strokeWidth="2.1" strokeLinecap="round" />
      <line x1="4.34" y1="15.66" x2="15.66" y2="4.34" stroke="#ffffff" strokeWidth="2.1" strokeLinecap="round" />
    </svg>
  );
}

function SlantedTickerRibbon({ isMobile = false }) {
  const duplicatedItems = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: isMobile ? 46 : 60,
        zIndex: 28,
        pointerEvents: 'none',
      }}
    >
      {/* 1. Background Deep Navy Ribbon */}
      <div
        style={{
          position: 'absolute',
          bottom: isMobile ? 6 : 8,
          left: '-10%',
          width: '120%',
          height: isMobile ? 32 : 40,
          backgroundColor: '#181e4b',
          backgroundImage: 'linear-gradient(90deg, #14183e 0%, #181e4b 50%, #111535 100%)',
          transform: 'rotate(0.95deg)',
          transformOrigin: '50% 50%',
          zIndex: 1,
          boxShadow: '0 4px 14px rgba(24, 30, 75, 0.25)',
        }}
      />

      {/* 2. Foreground Vibrant Orange Ribbon */}
      <div
        style={{
          position: 'absolute',
          bottom: isMobile ? 6 : 8,
          left: '-10%',
          width: '120%',
          height: isMobile ? 32 : 40,
          backgroundColor: '#ea580c',
          backgroundImage: 'linear-gradient(90deg, #ff6b35 0%, #ea580c 50%, #d9480f 100%)',
          transform: 'rotate(-1.6deg)',
          transformOrigin: '50% 50%',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          boxShadow: '0 8px 24px rgba(234, 88, 12, 0.35), 0 2px 6px rgba(0, 0, 0, 0.12)',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            whiteSpace: 'nowrap',
            animation: 'marquee-scroll 28s linear infinite',
            willChange: 'transform',
          }}
        >
          {duplicatedItems.map((item, idx) => (
            <span
              key={`ticker-${idx}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                fontFamily: "'Spectral', serif",
                fontSize: isMobile ? 12 : 13.5,
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: -0.1,
                userSelect: 'none',
              }}
            >
              {item}
              <StarburstIcon isMobile={isMobile} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Transparent Cutout Portrait Component for Ijji Madhu Venkat
// ---------------------------------------------------------------------------
const cutoutCache = new Map();

function CutoutPortrait({ src, alt, style }) {
  const [cutoutUrl, setCutoutUrl] = useState(() => (src ? cutoutCache.get(src) || null : null));

  useEffect(() => {
    if (!src) return;
    if (cutoutCache.has(src)) {
      setCutoutUrl(cutoutCache.get(src));
      return;
    }

    let isMounted = true;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;

    img.onload = () => {
      try {
        const w = img.naturalWidth || 800;
        const h = img.naturalHeight || 800;
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        ctx.drawImage(img, 0, 0);

        const imgData = ctx.getImageData(0, 0, w, h);
        const d = imgData.data;

        // Sample top corners to check black background level
        let maxBg = 0;
        for (let y = 0; y < 8; y++) {
          for (let x = 0; x < 8; x++) {
            const idx = (y * w + x) * 4;
            const b = Math.max(d[idx], d[idx + 1], d[idx + 2]);
            if (b > maxBg) maxBg = b;
          }
        }

        const bgThreshold = Math.max(16, maxBg + 12);
        const featherSpan = 14;

        const visited = new Uint8Array(w * h);
        const queue = new Int32Array(w * h);
        let head = 0;
        let tail = 0;

        for (let x = 0; x < w; x++) {
          const topIdx = x;
          const bTop = Math.max(d[topIdx * 4], d[topIdx * 4 + 1], d[topIdx * 4 + 2]);
          if (bTop <= bgThreshold + featherSpan) {
            visited[topIdx] = 1;
            queue[tail++] = topIdx;
          }
        }

        for (let y = 0; y < h; y++) {
          const leftIdx = y * w;
          const bLeft = Math.max(d[leftIdx * 4], d[leftIdx * 4 + 1], d[leftIdx * 4 + 2]);
          if (!visited[leftIdx] && bLeft <= bgThreshold + featherSpan) {
            visited[leftIdx] = 1;
            queue[tail++] = leftIdx;
          }

          const rightIdx = y * w + (w - 1);
          const bRight = Math.max(d[rightIdx * 4], d[rightIdx * 4 + 1], d[rightIdx * 4 + 2]);
          if (!visited[rightIdx] && bRight <= bgThreshold + featherSpan) {
            visited[rightIdx] = 1;
            queue[tail++] = rightIdx;
          }
        }

        while (head < tail) {
          const cur = queue[head++];
          const cx = cur % w;
          const cy = (cur / w) | 0;

          const neighbors = [
            cx > 0 ? cur - 1 : -1,
            cx < w - 1 ? cur + 1 : -1,
            cy > 0 ? cur - w : -1,
            cy < h - 1 ? cur + w : -1,
          ];

          for (let i = 0; i < 4; i++) {
            const n = neighbors[i];
            if (n !== -1 && !visited[n]) {
              const nIdx = n * 4;
              const b = Math.max(d[nIdx], d[nIdx + 1], d[nIdx + 2]);
              if (b <= bgThreshold) {
                visited[n] = 1;
                queue[tail++] = n;
              } else if (b <= bgThreshold + featherSpan) {
                visited[n] = 2;
              }
            }
          }
        }

        for (let i = 0; i < w * h; i++) {
          const p = i * 4;
          if (visited[i] === 1) {
            d[p + 3] = 0;
          } else if (visited[i] === 2) {
            const b = Math.max(d[p], d[p + 1], d[p + 2]);
            const factor = Math.min(1, Math.max(0, (b - bgThreshold) / featherSpan));
            d[p + 3] = Math.round(d[p + 3] * factor);
          }
        }

        ctx.putImageData(imgData, 0, 0);
        const dataUrl = canvas.toDataURL('image/png');
        cutoutCache.set(src, dataUrl);
        if (isMounted) {
          setCutoutUrl(dataUrl);
        }
      } catch (err) {
        console.error('Cutout processing error:', err);
        if (isMounted) setCutoutUrl(src);
      }
    };

    img.onerror = () => {
      if (isMounted) setCutoutUrl('/madhu.jpg');
    };

    return () => {
      isMounted = false;
    };
  }, [src]);

  return (
    <img
      src={cutoutUrl || src || '/madhu.jpg'}
      alt={alt}
      style={{
        ...style,
        display: 'block',
      }}
    />
  );
}

// ---------------------------------------------------------------------------
// LUXURY NAVBAR
// ---------------------------------------------------------------------------
const NAV_LINKS = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#editorial-statement' },
  { label: 'Services', href: '#services' },
  {
    label: 'Work ▾',
    dropdown: [
      { label: 'Projects', href: '#projects' },
      { label: 'Coding Profiles', href: '#coding-profiles' },
      { label: 'Terminal', href: '#terminal' }
    ]
  },
  {
    label: 'Resume ▾',
    dropdown: [
      { label: 'Skills', href: '#skills' },
      { label: 'Experience', href: '#timeline' },
      { label: 'Education', href: '#timeline' },
      { label: 'Testimonials', href: '#testimonials' }
    ]
  },
  { label: 'Footer', href: '#footer' }
];

export function LuxuryNavbar({ isMobile, forceWhite }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: isMobile ? '1rem 1.5rem' : '1rem 3rem',
      background: forceWhite ? 'rgba(255, 255, 255, 0.98)' : 'rgba(244, 241, 234, 0.92)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(0,0,0,0.04)',
      boxSizing: 'border-box',
      animation: 'nav-slide-down 0.3s ease-out'
    }}>
      {/* Brand Logo & Name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }} onClick={() => window.scrollTo(0,0)}>
        <svg
          width={isMobile ? "22" : "26"} height={isMobile ? "24" : "28"} viewBox="0 0 31 40" fill="none"
          xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}
        >
          <path
            d="m8.75 11.3 6.75 3.884 6.75-3.885M8.75 34.58v-7.755L2 22.939m27 0-6.75 3.885v7.754M2.405 15.408 15.5 22.954l13.095-7.546M15.5 38V22.939M29 28.915V16.962a2.98 2.98 0 0 0-1.5-2.585L17 8.4a3.01 3.01 0 0 0-3 0L3.5 14.377A3 3 0 0 0 2 16.962v11.953A2.98 2.98 0 0 0 3.5 31.5L14 37.477a3.01 3.01 0 0 0 3 0L27.5 31.5a3 3 0 0 0 1.5-2.585"
            stroke="#171717" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"
          />
        </svg>
        <span style={{
          fontFamily: "'Spectral', serif", fontSize: isMobile ? '1.4rem' : '1.7rem', color: '#171717', letterSpacing: '0.01em', position: 'relative', top: '1px'
        }}>
          Ijji Madhu Venkat
        </span>
      </div>

      {/* Desktop Navigation Links */}
      {!isMobile && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {NAV_LINKS.map((item, idx) => (
            <div key={idx} className={item.dropdown ? "nav-item" : ""}>
              <a
                href={item.href}
                style={{
                  textDecoration: 'none', color: '#171717', fontSize: '0.95rem', fontWeight: 500,
                  fontFamily: "'Space Mono', monospace", transition: 'opacity 0.2s ease', cursor: 'pointer'
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = 0.6}
                onMouseLeave={e => e.currentTarget.style.opacity = 1}
              >
                {item.label}
              </a>
              {item.dropdown && (
                <div className="nav-dropdown">
                  {item.dropdown.map(drop => (
                    <a key={drop.label} href={drop.href}>{drop.label}</a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <a
            href="#contact"
            style={{
              padding: '0.65rem 1.6rem', borderRadius: '0.4rem', fontSize: '0.9rem', fontWeight: 600,
              color: '#ffffff', background: '#000000', textDecoration: 'none',
              fontFamily: "'Space Mono', monospace", transition: 'all 0.3s ease', marginLeft: '0.5rem'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#222222'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#000000'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            Contact Me
          </a>
        </div>
      )}

      {/* Mobile Hamburger Button */}
      {isMobile && (
        <button
          aria-label="Toggle Menu"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none', border: 'none', padding: '0.5rem', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#171717" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {menuOpen ? (
              <><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></>
            ) : (
              <><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></>
            )}
          </svg>
        </button>
      )}

      {/* Mobile Drawer */}
      {isMobile && menuOpen && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, width: '100%',
          background: '#fbfdf3', borderTop: '1px solid rgba(0,0,0,0.05)',
          padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem',
          boxShadow: '0 10px 20px rgba(0,0,0,0.05)', animation: 'slide-down 0.2s ease-out',
          maxHeight: 'calc(100vh - 70px)', overflowY: 'auto'
        }}>
          {NAV_LINKS.flatMap(item => 
            item.dropdown 
              ? [...item.dropdown]
              : [item]
          ).map(item => (
            <a
              key={item.label} href={item.href}
              onClick={() => setMenuOpen(false)}
              style={{
                textDecoration: 'none', color: '#171717', fontSize: '1.1rem', fontWeight: 500,
                fontFamily: "'Space Mono', monospace", paddingBottom: '0.5rem', borderBottom: '1px solid rgba(0,0,0,0.05)'
              }}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            style={{
              padding: '0.8rem', borderRadius: '0.4rem', fontSize: '1rem', fontWeight: 600,
              color: '#ffffff', background: '#ea580c', textDecoration: 'none', textAlign: 'center',
              fontFamily: "'Space Mono', monospace", marginTop: '0.5rem'
            }}
          >
            Contact Me
          </a>
        </div>
      )}
    </nav>
  );
}

