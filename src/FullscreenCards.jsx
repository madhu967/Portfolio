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
}

.kex-hero-title {
  margin: 0;
  max-width: 1200px;
  font-family: 'Spectral', serif;
  font-size: clamp(76px, 12vw, 210px);
  font-weight: 600;
  line-height: 0.86;
  letter-spacing: -0.075em;
  text-transform: capitalize;
}

.kex-hero-subtitle {
  position: absolute;
  left: clamp(24px, 4vw, 72px);
  bottom: clamp(26px, 5vw, 72px);
  max-width: 980px;
  margin: 0;
  font-size: clamp(22px, 2.5vw, 44px);
  font-weight: 400;
  line-height: 1.35;
  letter-spacing: -0.035em;
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
    kicker: "01 — The Belief",
    title: "Create Without Fear",
    description:
      "A bold space for ideas to rise, move, and become visible without waiting for permission.",
    bg: "#181e4b",
    text: "#fbfdf3",
    muted: "rgba(251,253,243,0.72)",
    numberColor: "rgba(251,253,243,0.15)",
  },
  {
    number: "02",
    kicker: "02 — The Mission",
    title: "Art First Always",
    description:
      "Every card arrives like a statement, cutting through the page with strong motion and clean contrast.",
    bg: "#1f6f5c",
    text: "#ebeedc",
    muted: "rgba(235,238,220,0.76)",
    numberColor: "rgba(235,238,220,0.22)",
  },
  {
    number: "03",
    kicker: "03 — The Method",
    title: "Build Loud Ideas",
    description:
      "Smooth scroll movement, cinematic angles, and bold typography make each section feel alive.",
    bg: "#e9e3d6",
    text: "#13140f",
    muted: "rgba(19,20,15,0.65)",
    numberColor: "rgba(19,20,15,0.13)",
  },
  {
    number: "04",
    kicker: "04 — The Future",
    title: "No More Limits",
    description:
      "A premium scroll experience designed for portfolios, agencies, artists, and experimental landing pages.",
    bg: "#c2502f",
    text: "#ebeedc",
    muted: "rgba(235,238,220,0.76)",
    numberColor: "rgba(235,238,220,0.24)",
  },
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
                Create
                <br />
                Without
                <br />
                Limits
              </h1>

              <p ref={heroSubtitleRef} className="kex-hero-subtitle">
                “We believe every artist deserves a platform that puts creativity, courage, and expression first.”
              </p>
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
