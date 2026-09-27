import React, { useLayoutEffect, useEffect, useRef, useState, useMemo } from 'react';
import profilePic from './profilePic';

/**
 * Ijji Madhu Venkat — Luxury Editorial Developer Portfolio
 * 
 * Features:
 * - Playfair Typography (@import Google Font Playfair with variable optical size & weights).
 * - Exact Dark Forest Green Capsule Pill Navbar from user reference (media_1790525601368.png):
 *   - Deep hunter-green container (#283b30).
 *   - Golden-amber monogram badge ("M") + crisp white "Madhu." with amber dot.
 *   - Nav links in Playfair with golden-amber active "Home" + underline.
 *   - Pure white pill "Contact Me" button with dark forest text.
 * - 100% Fully Mobile Responsive:
 *   - Desktop View (>= 860px): High-precision stage scaling without black reload gaps.
 *   - Mobile View (< 860px): Fluid vertical layout, mobile dark capsule navbar with hamburger drawer,
 *     touch-optimized white & orange buttons, centered portrait with floating badges touching the ticker.
 * - Exact Jadoo Organic Peach Shape & Lilac Atmospheric Aura.
 * - Flying passenger airplanes with curved trails.
 * - Headline with curved orange brush stroke underline in 'Playfair', serif.
 * - Slanted Infinite Marquee Ticker Ribbon in Orange & White UI theme.
 * - Editorial Statement Section: Exactly 4 lines of text in h3 size Playfair font.
 */

const STAGE_WIDTH = 1200;

// Dimensions calculation for instant mount with zero black reload gap
const getInitialDimensions = () => {
  if (typeof window !== 'undefined') {
    const w = window.innerWidth || (document.documentElement ? document.documentElement.clientWidth : 1200);
    const h = window.innerHeight || (document.documentElement ? document.documentElement.clientHeight : 700);
    const s = w / STAGE_WIDTH;
    return {
      windowWidth: w,
      scale: s,
      stageHeight: Math.max(560, Math.round(h / s)),
    };
  }
  return { windowWidth: 1200, scale: 1, stageHeight: 700 };
};

export default function FashionEditorial() {
  const containerRef = useRef(null);
  const [{ windowWidth, scale, stageHeight }, setDimensions] = useState(getInitialDimensions);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Synchronous layout effect for instant resize and mount
  useLayoutEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth || (containerRef.current ? containerRef.current.clientWidth : 1200);
      const h = window.innerHeight || (containerRef.current ? containerRef.current.clientHeight : 700);

      const newScale = w / STAGE_WIDTH;
      const newStageHeight = Math.max(560, Math.round(h / newScale));

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

  const isMobile = windowWidth < 860;

  // Static CSS keyframes for marquee scroll and floating badges
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

      /* Mobile drawer animation */
      @keyframes slide-down {
        from { opacity: 0; transform: translateY(-8px); }
        to { opacity: 1; transform: translateY(0); }
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
        overflowX: 'hidden',
        overflowY: 'auto',
        position: 'relative',
        backgroundColor: '#ffffff',
        fontFamily: '"Playfair", Georgia, serif',
      }}
    >
      <style>{cssKeyframes}</style>

      {/* RENDER DESKTOP VS MOBILE HERO */}
      {isMobile ? (
        /* MOBILE VIEW (< 860px): Fluid vertical responsive hero */
        <MobileHeroSection
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
      ) : (
        /* DESKTOP VIEW (>= 860px): Stage-scaled responsive hero */
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
            {/* Desktop Hero Content */}
            <DesktopHeroContent stageHeight={stageHeight} />

            {/* Desktop Slanted Marquee Ribbon */}
            <SlantedTickerRibbon isMobile={false} />
          </div>
        </div>
      )}

      {/* Under Hero: Dedicated 4-Line Editorial Statement Section (h3 size text only) */}
      <EditorialStatementSection isMobile={isMobile} />
    </div>
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
      {/* 1. Mobile Deep Forest Green Capsule Navbar (Matches Reference Image) */}
      <nav
        style={{
          position: 'sticky',
          top: 12,
          margin: '12px auto 0 auto',
          width: 'calc(100% - 24px)',
          maxWidth: 520,
          height: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#283b30',
          backgroundImage: 'linear-gradient(135deg, #2d4336 0%, #223429 100%)',
          borderRadius: 36,
          padding: '0 10px 0 14px',
          boxShadow: '0 10px 28px rgba(0, 0, 0, 0.22), 0 2px 8px rgba(0, 0, 0, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          zIndex: 50,
          boxSizing: 'border-box',
        }}
      >
        {/* Brand Logo & Name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              backgroundColor: '#f59e0b',
              backgroundImage: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#1a2920',
              fontWeight: 800,
              fontSize: 18,
              fontFamily: '"Playfair", Georgia, serif',
              boxShadow: '0 3px 10px rgba(0, 0, 0, 0.25)',
            }}
          >
            M
          </div>
          <span
            style={{
              fontFamily: '"Playfair", Georgia, serif',
              fontSize: 18,
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: 0.2,
            }}
          >
            Madhu<span style={{ color: '#f59e0b' }}>.</span>
          </span>
        </div>

        {/* Right: Pure White Pill "Contact Me" Button + Hamburger Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            type="button"
            style={{
              fontFamily: '"Playfair", Georgia, serif',
              fontSize: 12.5,
              fontWeight: 700,
              color: '#283b30',
              backgroundColor: '#ffffff',
              border: 'none',
              borderRadius: 24,
              padding: '8px 16px',
              cursor: 'pointer',
              letterSpacing: 0.2,
              boxShadow: '0 3px 10px rgba(0, 0, 0, 0.15)',
            }}
          >
            Contact Me
          </button>

          {/* Hamburger Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
              cursor: 'pointer',
            }}
          >
            {mobileMenuOpen ? (
              <span style={{ fontSize: 16, color: '#ffffff', fontWeight: 'bold', lineHeight: 1 }}>✕</span>
            ) : (
              <>
                <span style={{ width: 16, height: 2, backgroundColor: '#ffffff', borderRadius: 1 }} />
                <span style={{ width: 16, height: 2, backgroundColor: '#f59e0b', borderRadius: 1 }} />
                <span style={{ width: 16, height: 2, backgroundColor: '#ffffff', borderRadius: 1 }} />
              </>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 76,
            left: 12,
            right: 12,
            backgroundColor: '#283b30',
            backgroundImage: 'linear-gradient(135deg, #2d4336 0%, #223429 100%)',
            borderRadius: 20,
            padding: '16px 20px',
            boxShadow: '0 16px 36px rgba(0, 0, 0, 0.35)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            zIndex: 49,
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            animation: 'slide-down 0.2s ease-out',
          }}
        >
          {['Home', 'Services', 'About', 'Projects', 'Blogs', 'Testimonials'].map((link, idx) => (
            <div
              key={link}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontFamily: '"Playfair", Georgia, serif',
                fontSize: 15,
                fontWeight: idx === 0 ? 700 : 500,
                color: idx === 0 ? '#f59e0b' : '#e5e7eb',
                padding: '8px 4px',
                borderBottom: idx < 5 ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
                cursor: 'pointer',
              }}
            >
              {link}
            </div>
          ))}
        </div>
      )}

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
          padding: '40px 20px 0 20px',
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
            fontFamily: '"Playfair", Georgia, serif',
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
            fontFamily: '"Playfair", Georgia, serif',
            fontSize: 'clamp(28px, 7.5vw, 36px)',
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
            fontFamily: '"Playfair", Georgia, serif',
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
            style={{
              fontFamily: '"Playfair", Georgia, serif',
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
                fontFamily: '"Playfair", Georgia, serif',
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
                fontFamily: '"Playfair", Georgia, serif',
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
                fontFamily: '"Playfair", Georgia, serif',
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
      {/* ------------------------------------------------------------------- */}
      {/* 1. EXACT REFERENCE DARK FOREST GREEN CAPSULE NAVBAR                */}
      {/* (Pixel-Perfect match to media_1790525601368.png)                  */}
      {/* ------------------------------------------------------------------- */}
      <nav
        style={{
          position: 'absolute',
          top: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          height: 60,
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#283b30',
          backgroundImage: 'linear-gradient(135deg, #2d4336 0%, #223429 100%)',
          borderRadius: 40,
          padding: '0 8px 0 16px',
          boxShadow: '0 14px 36px rgba(0, 0, 0, 0.25), 0 4px 12px rgba(0, 0, 0, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          zIndex: 20,
          boxSizing: 'border-box',
          gap: 38,
        }}
      >
        {/* Left: Brand Monogram Circle + Name (Exact match to Olivia. in image) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: '#f59e0b',
              backgroundImage: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#1a2920',
              fontWeight: 800,
              fontSize: 20,
              fontFamily: '"Playfair", Georgia, serif',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            }}
          >
            M
          </div>
          <span
            style={{
              fontFamily: '"Playfair", Georgia, serif',
              fontSize: 19,
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: 0.2,
            }}
          >
            Madhu<span style={{ color: '#f59e0b' }}>.</span>
          </span>
        </div>

        {/* Center: Nav Links with generous spacing & Playfair font */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 30, padding: '0 8px' }}>
          <span
            style={{
              fontFamily: '"Playfair", Georgia, serif',
              fontSize: 14.5,
              fontWeight: 700,
              color: '#f59e0b',
              borderBottom: '2.5px solid #f59e0b',
              paddingBottom: 3,
              cursor: 'pointer',
              letterSpacing: 0.2,
            }}
          >
            Home
          </span>
          {['Services', 'About', 'Projects', 'Blogs', 'Testimonials'].map((link) => (
            <span
              key={link}
              style={{
                fontFamily: '"Playfair", Georgia, serif',
                fontSize: 14,
                fontWeight: 500,
                color: '#d1d5db',
                cursor: 'pointer',
                letterSpacing: 0.2,
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#d1d5db')}
            >
              {link}
            </span>
          ))}
        </div>

        {/* Right: Pure White Pill "Contact Me" Button with Dark Forest Text */}
        <button
          type="button"
          style={{
            fontFamily: '"Playfair", Georgia, serif',
            fontSize: 13.5,
            fontWeight: 700,
            color: '#283b30',
            backgroundColor: '#ffffff',
            border: 'none',
            borderRadius: 30,
            padding: '10px 24px',
            cursor: 'pointer',
            letterSpacing: 0.2,
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.18)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.03)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 0, 0, 0.18)';
          }}
        >
          Contact Me
        </button>
      </nav>

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
          top: 86,
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
              fontFamily: '"Playfair", Georgia, serif',
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
              fontFamily: '"Playfair", Georgia, serif',
              fontSize: 38,
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
              fontFamily: '"Playfair", Georgia, serif',
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
              style={{
                fontFamily: '"Playfair", Georgia, serif',
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
                  fontFamily: '"Playfair", Georgia, serif',
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
                  fontFamily: '"Playfair", Georgia, serif',
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
                  fontFamily: '"Playfair", Georgia, serif',
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
// Editorial Statement Section (Under Hero Section: Exactly 4 lines, h3 size)
// Fully responsive on Mobile & Desktop in Playfair Font
// ---------------------------------------------------------------------------
function EditorialStatementSection({ isMobile }) {
  return (
    <section
      style={{
        width: '100%',
        backgroundColor: '#ffffff',
        padding: isMobile ? '56px 20px 70px 20px' : '110px 40px 120px 40px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderTop: '1px solid rgba(234, 88, 12, 0.1)',
        position: 'relative',
        zIndex: 5,
      }}
    >
      <div style={{ maxWidth: 1040, textAlign: 'center', margin: '0 auto', width: '100%' }}>
        {/* Subtle orange accent kicker */}
        <div
          style={{
            fontFamily: '"Playfair", Georgia, serif',
            fontSize: isMobile ? 12 : 13,
            fontWeight: 800,
            letterSpacing: 2.8,
            color: '#ea580c',
            textTransform: 'uppercase',
            marginBottom: isMobile ? 20 : 28,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span style={{ width: 18, height: 2, backgroundColor: '#ea580c', display: 'inline-block' }} />
          PHILOSOPHY & CODE ARCHITECTURE
          <span style={{ width: 18, height: 2, backgroundColor: '#ea580c', display: 'inline-block' }} />
        </div>

        {/* 4 Lines of Text, purely using h3 size and Playfair font */}
        <h3
          style={{
            fontFamily: '"Playfair", Georgia, serif',
            fontSize: isMobile ? 'clamp(18px, 4.4vw, 24px)' : 32,
            fontWeight: 600,
            lineHeight: isMobile ? 1.6 : 1.68,
            color: '#181e4b',
            letterSpacing: -0.3,
            margin: 0,
          }}
        >
          <div style={{ marginBottom: isMobile ? 10 : 12 }}>
            Architecting high-performance distributed systems with scalable full-stack engineering.
          </div>
          <div style={{ marginBottom: isMobile ? 10 : 12 }}>
            Crafting reactive cloud-native platforms powered by modern React, Next.js, and Node.js.
          </div>
          <div style={{ marginBottom: isMobile ? 10 : 12 }}>
            Pioneering autonomous Generative AI workflows and context-aware intelligent agents.
          </div>
          <div>
            Obsessed with clean algorithmic logic, ACID relational performance, and exceptional UX.
          </div>
        </h3>
      </div>
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
  const size = isMobile ? 16 : 20;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      style={{
        flexShrink: 0,
        margin: isMobile ? '0 14px' : '0 22px',
        display: 'inline-block',
        verticalAlign: 'middle',
      }}
    >
      <line x1="10" y1="2" x2="10" y2="18" stroke="#ffffff" strokeWidth="2.3" strokeLinecap="round" />
      <line x1="2" y1="10" x2="18" y2="10" stroke="#ffffff" strokeWidth="2.3" strokeLinecap="round" />
      <line x1="4.34" y1="4.34" x2="15.66" y2="15.66" stroke="#ffffff" strokeWidth="2.3" strokeLinecap="round" />
      <line x1="4.34" y1="15.66" x2="15.66" y2="4.34" stroke="#ffffff" strokeWidth="2.3" strokeLinecap="round" />
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
        height: isMobile ? 58 : 78,
        zIndex: 28,
        pointerEvents: 'none',
      }}
    >
      {/* 1. Background Deep Navy Ribbon */}
      <div
        style={{
          position: 'absolute',
          bottom: isMobile ? 8 : 12,
          left: '-10%',
          width: '120%',
          height: isMobile ? 42 : 52,
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
          bottom: isMobile ? 8 : 12,
          left: '-10%',
          width: '120%',
          height: isMobile ? 42 : 52,
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
                fontFamily: '"Playfair", Georgia, serif',
                fontSize: isMobile ? 14 : 16,
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: -0.2,
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
