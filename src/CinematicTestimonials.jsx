"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

const TESTIMONIALS = [
  {
    id: 1,
    name: "IISPPPR Internship",
    role: "Frontend Developer Domain",
    company: "IISPPR",
    quote: "“Successfully completed the internship program at the International Institute of SDGs and Public Policy Research. Contributed with dedication and hard work.”",
    image: "/certificates/cert1.png",
    objectPosition: "50% 50%",
  },
  {
    id: 2,
    name: "Full Stack Web Application Development with Node.js",
    role: "Specialization Course",
    company: "Vishnu Institute of Technology",
    quote: "“Awarded for successfully completing the Specialization Course 'Full Stack Web Application Development with Node.js' during November 2025.”",
    image: "/certificates/cert2.png",
    objectPosition: "50% 50%",
  },
  {
    id: 3,
    name: "NPTEL Python",
    role: "The Joy of Computing",
    company: "IIT Madras",
    quote: "“Elite certification awarded for successfully completing the 12-week course 'The Joy of Computing Using Python' with a consolidated score of 77%.”",
    image: "/certificates/cert3.png",
    objectPosition: "50% 50%",
  },
];

export default function CinematicTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("next");
  const [transitionIndex, setTransitionIndex] = useState(null);

  const timerRef = useRef(null);
  const isAnimatingRef = useRef(false);

  // Preload images
  useEffect(() => {
    TESTIMONIALS.forEach((t) => {
      const img = new Image();
      img.src = t.image;
    });
  }, []);

  const changeSlide = useCallback((newDir) => {
    if (isAnimatingRef.current) return;
    
    isAnimatingRef.current = true;
    setAnimating(true);
    setDirection(newDir);
    
    setTransitionIndex((prev) => {
      let nextIdx;
      if (newDir === "next") {
        nextIdx = (activeIndex + 1) % TESTIMONIALS.length;
      } else {
        nextIdx = (activeIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length;
      }
      return nextIdx;
    });

    setTimeout(() => {
      setActiveIndex((prev) => {
        let nextIdx;
        if (newDir === "next") {
          nextIdx = (prev + 1) % TESTIMONIALS.length;
        } else {
          nextIdx = (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length;
        }
        return nextIdx;
      });
      setAnimating(false);
      setTransitionIndex(null);
      isAnimatingRef.current = false;
    }, 620);
  }, [activeIndex]);

  const handleNext = useCallback(() => {
    changeSlide("next");
  }, [changeSlide]);

  const handlePrev = useCallback(() => {
    changeSlide("prev");
  }, [changeSlide]);

  // Autoplay
  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (!isAnimatingRef.current) {
        changeSlide("next");
      }
    }, 2000);

    return () => clearInterval(timerRef.current);
  }, [changeSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  // Touch / Swipe handling
  const touchStartX = useRef(null);
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) handleNext();
    else if (diff < -50) handlePrev();
    touchStartX.current = null;
  };

  const getCardIndex = (offset) => {
    return (activeIndex + offset) % TESTIMONIALS.length;
  };

  const activeTestimonial = TESTIMONIALS[activeIndex];
  const incomingTestimonial = transitionIndex !== null ? TESTIMONIALS[transitionIndex] : null;
  const displayTestimonial = incomingTestimonial || activeTestimonial;

  const getCardStyles = (position, index) => {
    let baseStyles = {
      position: "absolute",
      top: 0,
      left: 0,
      width: "var(--card-size)",
      height: "var(--card-size)",
      objectFit: "contain",
      borderRadius: "clamp(12px, 1.5vw, 24px)",
      filter: "drop-shadow(0 24px 34px rgba(16, 36, 60, 0.12)) drop-shadow(0 10px 16px rgba(16, 36, 60, 0.08))",
      transformOrigin: "center center",
      backfaceVisibility: "hidden",
      willChange: "transform, opacity, filter",
    };

    if (position === "front") {
      baseStyles.zIndex = 3;
      baseStyles.transform = "translate3d(0, 0, 0) rotate(0deg) scale(1)";
      baseStyles.opacity = 1;
      if (animating) {
        baseStyles.animation = `card-out-${direction} 620ms cubic-bezier(0.32, 0, 0.15, 1) forwards`;
      }
    } else if (position === "middle") {
      baseStyles.zIndex = 2;
      baseStyles.transform = "translate3d(18px, 35px, -45px) rotate(3.5deg) scale(0.95)";
      baseStyles.opacity = 0.76;
      baseStyles.filter += " saturate(0.9)";
    } else if (position === "back") {
      baseStyles.zIndex = 1;
      baseStyles.transform = "translate3d(-17px, 52px, -90px) rotate(-3.7deg) scale(0.91)";
      baseStyles.opacity = 0.50;
      baseStyles.filter += " saturate(0.8) brightness(0.9)";
    } else if (position === "incoming") {
      baseStyles.zIndex = 4;
      baseStyles.animation = `card-in-${direction} 620ms cubic-bezier(0.2, 0.72, 0.18, 1) forwards`;
    }
    
    return baseStyles;
  };

  return (
    <section 
      className="ct-section" 
      aria-label="Professional Certificates"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="ct-grid">
        {/* Background Grid Lines */}
        <div className="ct-bg-grid" />
        
        {/* Section Heading */}
        <h1 style={{
          width: '100%',
          textAlign: 'center',
          fontFamily: "'Spectral', serif",
          fontSize: 'clamp(2.4rem, 5vw, 3.5rem)',
          fontWeight: 700,
          color: '#181e4b',
          zIndex: 20,
          margin: 0,
          letterSpacing: '-0.02em'
        }}>
          Professional Certificates
        </h1>

        <div className="ct-container">
          
          {/* Left Column: Image Stack */}
          <div className="ct-stack-col">
            <div className="ct-stack-container">
              {/* Background overlapping cards removed per user request */}

              {/* Active Front Card */}
              {(!animating || (animating && direction)) && (
                <img 
                  src={activeTestimonial.image} 
                  alt={`${activeTestimonial.name}, ${activeTestimonial.role}`} 
                  style={{...getCardStyles("front"), objectPosition: activeTestimonial.objectPosition}} 
                  className="ct-img-noise"
                />
              )}
              
              {/* Incoming Card */}
              {animating && incomingTestimonial && (
                <img 
                  src={incomingTestimonial.image} 
                  alt={`${incomingTestimonial.name}, ${incomingTestimonial.role}`} 
                  style={{...getCardStyles("incoming"), objectPosition: incomingTestimonial.objectPosition}} 
                  className="ct-img-noise"
                />
              )}
            </div>
          </div>

          {/* Right Column: Text and Navigation */}
          <div className="ct-text-col">
            <div className={`ct-text-wrapper ${animating ? `ct-text-animating-${direction}` : ''}`}>
              <h2 className="ct-name">{displayTestimonial.name}</h2>
              <p className="ct-role">{displayTestimonial.role} at {displayTestimonial.company}</p>
              <p className="ct-quote">{displayTestimonial.quote}</p>
            </div>

            <nav className="ct-nav" aria-label="Testimonial navigation">
              <button className="ct-prev-btn" aria-label="Previous testimonial" onClick={handlePrev}>
                <svg viewBox="0 0 28 28" fill="none" stroke="currentColor">
                  <path d="M16.5 21L9.5 14L16.5 7" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button className="ct-next-btn" aria-label="Next testimonial" onClick={handleNext}>
                <svg viewBox="0 0 28 28" fill="none" stroke="currentColor">
                  <path d="M11.5 21L18.5 14L11.5 7" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </nav>
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap');

        .ct-section {
          width: 100%;
          min-height: 100vh;
          min-height: 100svh;
          background-color: #f7f9fc;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow-x: clip;
          font-family: 'Lato', Arial, sans-serif;
          --card-size: min(31.5vw, 61svh, 480px);
          padding: 80px 0;
        }

        .ct-bg-grid {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          background-image: linear-gradient(to right, rgba(41, 69, 110, 0.018) 1px, transparent 1px);
          background-size: 64px 100%;
          border-top: 1px solid rgba(41, 69, 110, 0.018);
        }

        .ct-grid {
          position: relative;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: clamp(30px, 6vh, 60px);
        }

        .ct-container {
          width: min(1205px, calc(100vw - 64px));
          display: grid;
          grid-template-columns: var(--card-size) minmax(0, 550px);
          gap: clamp(68px, 9.7vw, 148px);
          align-items: center;
          position: relative;
          z-index: 10;
        }

        .ct-stack-col {
          perspective: 1200px;
          display: flex;
          justify-content: center;
        }

        .ct-stack-container {
          position: relative;
          width: var(--card-size);
          height: var(--card-size);
          transform-style: preserve-3d;
        }

        .ct-img-noise {
          position: relative;
        }
        .ct-img-noise::after {
          content: "";
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E");
          border-radius: inherit;
          pointer-events: none;
        }

        .ct-text-col {
          display: flex;
          flex-direction: column;
          transform: translateY(-5px);
          position: relative;
        }

        .ct-text-wrapper {
          position: relative;
          will-change: transform, opacity, filter;
        }

        .ct-name {
          font-weight: 900;
          color: #071f46;
          font-size: clamp(29px, 2.28vw, 36px);
          line-height: 1.08;
          letter-spacing: -0.035em;
          margin: 0 0 4px 0;
        }

        .ct-role {
          color: #29456e;
          font-weight: 400;
          font-size: clamp(17px, 1.36vw, 21px);
          line-height: 1.45;
          margin: 0;
        }

        .ct-quote {
          max-width: 545px;
          margin-top: clamp(44px, 6.5svh, 58px);
          color: #17365f;
          font-weight: 400;
          font-size: clamp(22px, 1.82vw, 28px);
          line-height: 1.5;
          letter-spacing: -0.013em;
          margin-bottom: 0;
        }

        .ct-nav {
          display: flex;
          align-items: center;
          gap: 17px;
          margin-top: clamp(15px, 2.8svh, 26px);
        }

        .ct-prev-btn, .ct-next-btn {
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          color: #17365f;
          padding: 0;
        }

        .ct-prev-btn {
          width: 60px;
          height: 60px;
          background: rgba(235, 240, 247, 0.72);
        }

        .ct-next-btn {
          width: 72px;
          height: 72px;
          background: #eef2f7;
          box-shadow: inset 0 0 0 5px #f7f9fc, 0 5px 15px rgba(25, 49, 80, 0.04);
          border: 3px solid #91a4bf;
        }

        .ct-prev-btn:hover, .ct-next-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(25, 49, 80, 0.08);
        }
        .ct-next-btn:hover {
          box-shadow: inset 0 0 0 5px #f7f9fc, 0 8px 20px rgba(25, 49, 80, 0.08);
        }

        .ct-prev-btn:active, .ct-next-btn:active {
          transform: scale(0.94);
        }

        /* TEXT ANIMATIONS */
        @keyframes text-out-next {
          0% { transform: translate(0, 0); opacity: 1; filter: blur(0); }
          100% { transform: translate(-18px, -3px); opacity: 0; filter: blur(4px); }
        }
        @keyframes text-in-next {
          0% { transform: translate(24px, 5px); opacity: 0; filter: blur(5px); }
          100% { transform: translate(0, 0); opacity: 1; filter: blur(0); }
        }

        @keyframes text-out-prev {
          0% { transform: translate(0, 0); opacity: 1; filter: blur(0); }
          100% { transform: translate(18px, -3px); opacity: 0; filter: blur(4px); }
        }
        @keyframes text-in-prev {
          0% { transform: translate(-24px, 5px); opacity: 0; filter: blur(5px); }
          100% { transform: translate(0, 0); opacity: 1; filter: blur(0); }
        }

        .ct-text-animating-next {
          animation: text-in-next 470ms cubic-bezier(0.2, 0.72, 0.18, 1) forwards;
        }
        .ct-text-animating-prev {
          animation: text-in-prev 470ms cubic-bezier(0.2, 0.72, 0.18, 1) forwards;
        }

        /* CARD ANIMATIONS */
        @keyframes card-out-next {
          0% { transform: translate3d(0,0,0) rotate(0deg) scale(1); opacity: 1; }
          100% { transform: translate3d(122px, 38px, 0) rotate(8deg) scale(0.91); opacity: 0; }
        }
        @keyframes card-in-next {
          0% { transform: translate3d(-20px, 36px, -100px) rotate(-3deg) scale(0.945); opacity: 0.65; }
          100% { transform: translate3d(0, 0, 0) rotate(0deg) scale(1); opacity: 1; }
        }

        @keyframes card-out-prev {
          0% { transform: translate3d(0,0,0) rotate(0deg) scale(1); opacity: 1; }
          100% { transform: translate3d(-122px, 38px, 0) rotate(-8deg) scale(0.91); opacity: 0; }
        }
        @keyframes card-in-prev {
          0% { transform: translate3d(20px, 36px, -100px) rotate(3deg) scale(0.945); opacity: 0.65; }
          100% { transform: translate3d(0, 0, 0) rotate(0deg) scale(1); opacity: 1; }
        }

        /* MEDIA QUERIES */
        @media (max-width: 1050px) {
          .ct-section {
            --card-size: min(40vw, 57svh, 430px);
          }
          .ct-container {
            gap: 40px;
          }
        }

        @media (max-width: 760px) {
          .ct-section {
            --card-size: min(76vw, 39svh, 330px);
            padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
          }
          .ct-container {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 20px;
            padding: 20px;
          }
          .ct-stack-col {
            margin: 0 auto;
          }
          .ct-text-col {
            align-items: center;
            max-width: 520px;
            margin: 0 auto;
          }
          .ct-nav {
            justify-content: center;
            margin-top: 15px;
          }
          .ct-quote {
            margin-top: 24px;
            font-size: clamp(18px, 4vw, 22px);
          }
        }

        @media (max-height: 630px) and (min-width: 761px) {
          .ct-section {
            --card-size: min(28vw, 50svh, 350px);
          }
          .ct-quote {
            margin-top: 20px;
            font-size: 20px;
          }
        }

        @media (max-height: 610px) and (max-width: 760px) {
          .ct-section {
            --card-size: min(66vw, 34svh, 250px);
          }
          .ct-quote {
            margin-top: 15px;
            font-size: 16px;
          }
          .ct-name {
            font-size: 24px;
          }
          .ct-role {
            font-size: 15px;
          }
          .ct-prev-btn { width: 44px; height: 44px; }
          .ct-next-btn { width: 54px; height: 54px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ct-text-animating-next,
          .ct-text-animating-prev,
          .ct-img-noise {
            animation-duration: 1ms !important;
          }
        }
      `}} />
    </section>
  );
}
