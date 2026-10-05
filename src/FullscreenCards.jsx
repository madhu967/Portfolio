import React, { useEffect, useRef, useState } from "react";
import ProjectGallery from './ProjectGallery';

const CSS = `
* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
}

.kex-scroll-page {
  width: 100%;
  background: #13140f;
  font-family: 'Space Mono', monospace;
}

.kex-scroll-scene {
  position: relative;
  height: 560vh;
  background: #13140f;
}

.kex-sticky-stage {
  position: sticky;
  top: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #13140f;
}

/* HERO */

.kex-hero-content {
  position: absolute;
  inset: 0;
  z-index: 1;
  padding: clamp(24px, 4vw, 72px);
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.kex-hero-title {
  margin: 0;
  font-family: 'Spectral', serif;
  font-size: clamp(48px, 10vw, 160px);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.04em;
  text-transform: capitalize;
  text-align: center;
}

.kex-scroll-indicator {
  position: absolute;
  bottom: clamp(40px, 6vh, 80px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  animation: bounce-scroll 2s infinite ease-in-out;
  opacity: 0.8;
}

.kex-scroll-indicator span {
  font-family: 'Space Mono', monospace;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

@keyframes bounce-scroll {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(12px); }
}

/* CARD LAYER */

.kex-card-layer {
  position: absolute;
  inset: 0;
  z-index: 5;
  pointer-events: none;
}

.kex-scroll-card {
  position: absolute;
  left: 0;
  top: 0;

  width: 100%;
  height: 100vh;

  background: var(--card-bg);
  color: var(--card-text);

  transform-origin: 14% 0%;
  will-change: transform, opacity, filter;

  overflow: hidden;
}

/* Card texture */
.kex-scroll-card::before {
  content: "";
  position: absolute;
  inset: 0;

  background:
    radial-gradient(
      circle at 18% 18%,
      rgba(255, 255, 255, 0.16),
      transparent 34%
    ),
    radial-gradient(
      circle at 88% 78%,
      rgba(255, 255, 255, 0.08),
      transparent 38%
    );

  opacity: 0.42;
  pointer-events: none;
}

.kex-scroll-card::after {
  content: "";
  position: absolute;
  inset: 0;

  background:
    linear-gradient(
      180deg,
      rgba(255,255,255,0.05),
      transparent 22%,
      transparent 70%,
      rgba(0,0,0,0.12)
    );

  pointer-events: none;
}

.kex-card-inner {
  position: relative;
  z-index: 2;

  width: 100%;
  height: 100%;

  padding: clamp(38px, 4vw, 72px);
}

.kex-card-kicker {
  margin: 0 0 clamp(100px, 16vh, 170px);

  color: var(--card-muted);

  font-size: clamp(13px, 1.2vw, 22px);
  font-weight: 600;
  letter-spacing: 0.25em;
  text-transform: capitalize;
}

.kex-card-title {
  margin: 0;
  max-width: 1080px;
  font-family: 'Spectral', serif;
  font-size: clamp(76px, 10vw, 185px);
  font-weight: 600;
  line-height: 0.84;
  letter-spacing: -0.075em;
  text-transform: capitalize;
}

.kex-card-bottom-right {
  position: absolute;
  right: clamp(30px, 6vw, 100px);
  bottom: clamp(36px, 5vw, 80px);
  max-width: 540px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
  pointer-events: auto;
}

.kex-card-description {
  margin: 0;
  color: var(--card-muted);
  font-size: clamp(18px, 1.6vw, 28px);
  line-height: 1.35;
  letter-spacing: -0.035em;
}

.kex-card-btn {
  font-family: 'Space Mono', monospace;
  font-size: 14px;
  font-weight: 700;
  color: #13140f;
  background: #ffffff;
  border: 1px solid #ffffff;
  border-radius: 9999px;
  padding: 14px 28px;
  cursor: pointer;
  transition: all 0.3s ease;
  pointer-events: auto;
  box-shadow: 0 4px 14px rgba(255, 255, 255, 0.25);
  animation: btn-pulse 2s infinite cubic-bezier(0.66, 0, 0, 1);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.kex-card-btn:hover {
  background: #f4f1ea;
  color: #000000;
  transform: scale(1.05);
}

@keyframes btn-pulse {
  0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.6); }
  70% { box-shadow: 0 0 0 15px rgba(255, 255, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
}

.kex-card-number {
  position: absolute;
  right: clamp(28px, 4vw, 70px);
  top: clamp(28px, 4vw, 70px);

  color: var(--card-number);
  font-family: 'Spectral', serif;
  font-size: clamp(44px, 7vw, 120px);
  font-weight: 600;
  letter-spacing: -0.08em;
}

.kex-after-section {
  min-height: 80vh;
  background: #fbfdf3;
}

@media (max-width: 800px) {
  .kex-scroll-scene {
    height: 540vh;
  }

  .kex-hero-title {
    font-size: clamp(58px, 17vw, 120px);
  }

  .kex-hero-subtitle {
    font-size: 21px;
  }

  .kex-card-title {
    font-size: clamp(58px, 17vw, 108px);
  }

  .kex-card-bottom-right {
    left: clamp(38px, 4vw, 72px);
    right: auto;
    bottom: 42px;
    max-width: 80%;
  }

  .kex-card-description {
    font-size: 18px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .kex-scroll-card {
    transform: none !important;
    opacity: 1 !important;
    filter: none !important;
  }
}
`;

const cards = [
  {
    number: "01",
    isProject: true,
    kicker: "Featured Project",
    logo: <svg style={{ height: '48px', width: 'auto', marginBottom: '1.5rem', display: 'block', marginInline: 'auto' }} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M54 0c5.523 0 10 4.477 10 10v44c0 5.523-4.477 10-10 10H37.871C35.368 46.753 41.8 29.002 55.437 17.423a52 52 0 0 0-8.057 3.847C31.593 30.553 22.59 46.956 22.043 64H10c-1.127 0-2.21-.19-3.222-.533-.18-3.525.037-7.127.692-10.75 4.105-22.71 23.963-38.605 46.276-38.46a47 47 0 0 0-7.84-2.128C27.81 8.858 10.266 16.473 0 30.304V10C0 4.477 4.477 0 10 0z" fill="currentColor"/></svg>,
    title: "SmartCity Civic Intelligence Platform",
    github: "https://github.com/madhu967/SmartCity-Civic-Intelligence-Platform",
    demo: "https://smart-city-civic-intelligence-platf-kohl.vercel.app/",
    bg: "#181e4b",
    text: "#fbfdf3",
    muted: "rgba(251,253,243,0.72)",
    numberColor: "rgba(251,253,243,0.08)",
  },
  {
    number: "02",
    isProject: true,
    kicker: "Featured Project",
    logo: <svg style={{ height: '52px', width: 'auto', marginBottom: '1.5rem', display: 'block', marginInline: 'auto' }} viewBox="0 0 63 70" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M33.817 52.382c0-15.988 12.96-28.948 28.948-28.948v17.585c0 15.987-12.96 28.948-28.948 28.948zm-4.869 0c0-15.988-12.96-28.948-28.948-28.948v17.585c0 15.987 12.96 28.948 28.948 28.948z" fill="currentColor"/><g clipPath="url(#a)"><path d="M31.487 0c0 8.764 7.049 15.881 15.786 15.992l.207.001-.207.001c-8.737.11-15.786 7.228-15.786 15.992 0-8.833-7.16-15.993-15.993-15.993 8.833 0 15.993-7.16 15.993-15.993" fill="currentColor"/></g><defs><clipPath id="a"><path fill="#fff" d="M15.494 0H47.48v31.986H15.494z"/></clipPath></defs></svg>,
    title: "Prescripto - Hospital Booking App",
    github: "https://github.com/madhu967/Prescripto",
    demo: "https://prescripto-eight-alpha.vercel.app/",
    bg: "#1f6f5c",
    text: "#ebeedc",
    muted: "rgba(235,238,220,0.76)",
    numberColor: "rgba(235,238,220,0.22)",
  },
  {
    number: "03",
    isProject: true,
    kicker: "Featured Project",
    logo: <img src="/forever/logo.png" alt="Forever Logo" style={{ height: '40px', marginInline: 'auto', marginBottom: '1.5rem', display: 'block' }} />,
    title: "Forever - E-Commerce Platform",
    github: "https://github.com/madhu967/forever",
    demo: "https://forever-eight-delta.vercel.app/",
    bg: "#ffffff",
    text: "#171717",
    muted: "rgba(23,23,23,0.65)",
    numberColor: "rgba(23,23,23,0.1)",
  },
  {
    number: "04",
    isProject: true,
    kicker: "Featured Project",
    logo: <span style={{ fontFamily: "'Prata', serif", fontSize: "1.875rem", lineHeight: "2.25rem", fontWeight: "700", letterSpacing: "-0.05em", color: "#f9f6f0", display: "block", marginInline: "auto", marginBottom: "1.5rem", textAlign: "center" }}>OAK<span style={{ color: "#ff9fb2" }}>&</span>IRON</span>,
    title: "QuickBlog - AI Integrated Blog Platform",
    github: "https://github.com/madhu967/AI_Integrated_blog_Platform",
    demo: "https://ai-integrated-blog-platform.vercel.app/",
    bg: "#9e152d",
    text: "#f9f6f0",
    muted: "rgba(249,246,240,0.7)",
    numberColor: "rgba(249,246,240,0.15)",
  },
  /*
  {
    number: "05",
    isProject: true,
    kicker: "Featured Project",
    logo: <svg style={{ height: '44px', width: 'auto', marginBottom: '1.5rem', display: 'block', marginInline: 'auto' }} viewBox="0 0 31 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m8.75 11.3 6.75 3.884 6.75-3.885M8.75 34.58v-7.755L2 22.939m27 0-6.75 3.885v7.754M2.405 15.408 15.5 22.954l13.095-7.546M15.5 38V22.939M29 28.915V16.962a2.98 2.98 0 0 0-1.5-2.585L17 8.4a3.01 3.01 0 0 0-3 0L3.5 14.377A3 3 0 0 0 2 16.962v11.953A2.98 2.98 0 0 0 3.5 31.5L14 37.477a3.01 3.01 0 0 0 3 0L27.5 31.5a3 3 0 0 0 1.5-2.585" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    title: "Interactive Developer Portfolio",
    github: "https://github.com/madhu967/Portfolio",
    demo: "https://portfolio-ashen-rho-52.vercel.app",
    bg: "#c2502f",
    text: "#ebeedc",
    muted: "rgba(235,238,220,0.76)",
    numberColor: "rgba(235,238,220,0.24)",
  },
  */
];

const clamp = (value, min, max) =>
  Math.min(max, Math.max(min, value));

const lerp = (start, end, amount) =>
  start + (end - start) * amount;

const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);

const easeInOutCubic = (x) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

export default function FullscreenCards() {
  const sceneRef = useRef(null);
  const stageRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const cardRefs = useRef([]);

  const currentProgress = useRef(0);
  const targetProgress = useRef(0);
  const frameRef = useRef(null);

  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState(null);

  useEffect(() => {
    const updateTargetProgress = () => {
      const scene = sceneRef.current;
      const stage = stageRef.current;
      if (!scene || !stage) return;

      const rect = scene.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;

      targetProgress.current = clamp(
        -rect.top / Math.max(scrollable, 1),
        0,
        1,
      );

      // Bulletproof pinning
      if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
        stage.style.position = 'fixed';
        stage.style.top = '0px';
        stage.style.left = '0px';
        stage.style.width = '100%';
        stage.style.height = '100vh';
      } else if (rect.bottom < window.innerHeight) {
        stage.style.position = 'absolute';
        stage.style.top = 'auto';
        stage.style.bottom = '0px';
        stage.style.left = '0px';
        stage.style.width = '100%';
        stage.style.height = '100vh';
      } else {
        stage.style.position = 'absolute';
        stage.style.top = '0px';
        stage.style.bottom = 'auto';
        stage.style.left = '0px';
        stage.style.width = '100%';
        stage.style.height = '100vh';
      }
    };

    const render = () => {
      currentProgress.current = lerp(
        currentProgress.current,
        targetProgress.current,
        0.085,
      );

      const progress = currentProgress.current;

      if (heroTitleRef.current) {
        const heroLift = clamp(progress / 0.24, 0, 1);

        heroTitleRef.current.style.transform = `
          translate3d(0, ${lerp(0, -110, heroLift)}px, 0)
        `;

        heroTitleRef.current.style.opacity = `${lerp(1, 0.58, heroLift)}`;
      }

      if (heroSubtitleRef.current) {
        const subtitleFade = clamp(progress / 0.16, 0, 1);

        heroSubtitleRef.current.style.transform = `
          translate3d(0, ${lerp(0, -45, subtitleFade)}px, 0)
        `;

        heroSubtitleRef.current.style.opacity = `${lerp(1, 0, subtitleFade)}`;
      }

      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        /*
          Each card enters as a full-screen panel.
          The first card fully covers the orange hero.
          Each next card fully covers the previous card.
        */
        const start = 0.08 + index * 0.215;
        const end = start + 0.22;

        const raw = clamp((progress - start) / (end - start), 0, 1);
        const eased = easeOutCubic(raw);
        const settle = easeInOutCubic(raw);

        const y = lerp(112, 0, eased);
        const x = lerp(10, 0, eased);
        const rotate = lerp(-7.5, 0, settle);
        const scale = lerp(1.05, 1, eased);

        const opacity = raw <= 0 ? 0 : lerp(0.4, 1, eased);
        const blur = lerp(3, 0, eased);

        card.style.transform = `
          translate3d(${x}vw, ${y}vh, 0)
          rotate(${rotate}deg)
          scale(${scale})
        `;

        card.style.opacity = `${opacity}`;
        card.style.filter = `blur(${blur}px)`;

        /*
          Higher cards sit above lower cards,
          so the next card comes fully over the previous one.
        */
        card.style.zIndex = `${20 + index}`;
      });

      frameRef.current = requestAnimationFrame(render);
    };

    updateTargetProgress();

    window.addEventListener("scroll", updateTargetProgress, {
      passive: true,
    });

    window.addEventListener("resize", updateTargetProgress);

    frameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("scroll", updateTargetProgress);
      window.removeEventListener("resize", updateTargetProgress);

      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <>
      <style>{CSS}</style>

      <div className="kex-scroll-page">
        <section ref={sceneRef} className="kex-scroll-scene">
          <div ref={stageRef} className="kex-sticky-stage">
            <div className="kex-hero-content">
              <h1 ref={heroTitleRef} className="kex-hero-title">
                Projects
              </h1>

              <div ref={heroSubtitleRef} className="kex-scroll-indicator">
                <span>Scroll Down</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M19 12l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div className="kex-card-layer">
              {cards.map((card, index) => {
                const style = {
                  "--card-bg": card.bg,
                  "--card-text": card.text,
                  "--card-muted": card.muted,
                  "--card-number": card.numberColor,
                };

                return (
                  <article
                    key={card.number}
                    ref={(element) => {
                      cardRefs.current[index] = element;
                    }}
                    className="kex-scroll-card"
                    style={style}
                  >
                    <div className="kex-card-inner">
                      <div className="kex-card-number">{card.number}</div>

                      {card.isProject ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center' }}>
                          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: 700, color: card.muted, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>
                            {card.kicker}
                          </p>
                          {card.logo}
                          <h2 style={{ fontFamily: "'Spectral', serif", fontSize: 'clamp(28px, 6vw, 76px)', fontWeight: 600, color: card.text, margin: '0 0 32px 0', lineHeight: 1.15, letterSpacing: '-0.02em', maxWidth: 900 }}>
                            {card.title}
                          </h2>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', justifyContent: 'center', pointerEvents: 'auto' }}>
                            <button 
                              onClick={() => window.location.hash = `#/gallery/${index}`}
                              style={{ padding: '0.8rem 1.5rem', background: card.text, color: card.bg, border: 'none', cursor: 'pointer', fontFamily: "'Space Mono', monospace", fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'inline-flex', alignItems: 'center', gap: '8px', transition: 'background 0.3s' }}
                              onMouseEnter={(e) => e.currentTarget.style.background = '#ea580c'}
                              onMouseLeave={(e) => e.currentTarget.style.background = card.text}
                            >
                              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                              View Detailed Project
                            </button>
                            <a 
                              href={card.github} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              style={{ padding: '0.8rem 1.5rem', background: 'transparent', border: `1px solid ${card.muted}`, color: card.text, textDecoration: 'none', fontFamily: "'Space Mono', monospace", fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'inline-flex', alignItems: 'center', gap: '8px', transition: 'border-color 0.3s' }}
                              onMouseEnter={(e) => e.currentTarget.style.borderColor = card.text}
                              onMouseLeave={(e) => e.currentTarget.style.borderColor = card.muted}
                            >
                              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.113.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                              Source Code
                            </a>
                            <a 
                              href={card.demo} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              style={{ padding: '0.8rem 1.5rem', background: 'transparent', border: `1px solid ${card.muted}`, color: card.text, textDecoration: 'none', fontFamily: "'Space Mono', monospace", fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'inline-flex', alignItems: 'center', gap: '8px', transition: 'border-color 0.3s' }}
                              onMouseEnter={(e) => e.currentTarget.style.borderColor = card.text}
                              onMouseLeave={(e) => e.currentTarget.style.borderColor = card.muted}
                            >
                              Live Demo ↗
                            </a>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="kex-card-kicker">{card.kicker}</p>
                          <h2 className="kex-card-title">{card.title}</h2>

                          <div className="kex-card-bottom-right">
                            <p className="kex-card-description">
                              {card.description}
                            </p>
                            <button 
                              className="kex-card-btn"
                              onClick={() => window.location.hash = `#/gallery/${index}`}
                            >
                              View Project
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
