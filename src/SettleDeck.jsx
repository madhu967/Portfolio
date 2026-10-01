import React, { useEffect, useRef, useState } from 'react';

/**
 * SettleDeck Component — Pinned Scroll Sequence
 * 
 * Features:
 * - Tall scroll track (520svh) with position:sticky stage (top:0, 100svh).
 * - Zero animation libraries: Pure vanilla rAF reading scroll progress (p in [0..1])
 *   and writing direct transforms straight to the DOM (no per-frame React re-render).
 * - All styles contained in ONE injected <style> block.
 * - Pure CSS + inline SVGs (no external image assets).
 * - 4/5 Centered Card Deck (25% width, min 300px).
 * - Timeline:
 *   1) [0..0.18]: Deck rises (translateY 46% -> -6%) while headline lifts (-120%) and fades.
 *   2) [0.30..0.46]: Cover card flips (0 -> 180deg) and 4 back cards flip in (-180deg -> 0deg)
 *      with easeOutBack spring landing into per-card settle tilts.
 *   3) [0.52..1.0]: Back cards peel upward in REVERSE order (Ochre -> Forest -> Bone -> Clay)
 *      with growing dismiss tilt, translateY to -240%, and fading opacity.
 * - Warm editorial palette: clay #c2502f, bone #e9e3d6, forest #1f6f5c, ochre #d9a441.
 * - Paper radial stage: #fbfdf3 -> #e3e6d6, ink #13140f, Oswald + DM Sans type.
 * - Kexsio® mark + mix-blend difference meta chrome.
 * - ?card query parameter auto-play loop support (~4.2s sweep + ~0.7s hold).
 * - prefers-reduced-motion compliance.
 * - Integrated About/Synthesis section below the pinned stage.
 */

const BACK_CARDS_DATA = [
  {
    id: 'clay',
    number: '01',
    title: 'Web Application Development',
    subtitle: 'ENTERPRISE GRADE',
    body: 'High-performance, scalable web platforms architected for mission-critical operations using modern reactive stacks.',
    bg: '#c2502f',
    textColor: '#ebeedc',
    subColor: 'rgba(251, 253, 243, 0.72)',
    badgeBg: 'rgba(251, 253, 243, 0.15)',
    badgeBorder: 'rgba(251, 253, 243, 0.25)',
    iconColor: '#ebeedc',
    settleTilt: -2.0,
    settleX: -4,
    settleY: 0,
    dismissTilt: -20,
    dismissX: -30,
    baseZ: 48,
    zIndex: 40,
    windowStart: 0.55,
    windowEnd: 0.64,
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        <circle cx="12" cy="16" r="1.5" fill="currentColor" />
        <path d="M12 17.5V19" />
      </svg>
    ),
  },
  {
    id: 'bone',
    number: '02',
    title: 'Mobile App Development',
    subtitle: 'NATIVE & HYBRID',
    body: 'Seamless, intuitive mobile experiences built with modern frameworks, ensuring flawless performance across iOS and Android ecosystems.',
    bg: '#e9e3d6',
    textColor: '#13140f',
    subColor: '#5c5c52',
    badgeBg: 'rgba(19, 20, 15, 0.08)',
    badgeBorder: 'rgba(19, 20, 15, 0.18)',
    iconColor: '#13140f',
    settleTilt: 3.0,
    settleX: 8,
    settleY: 4,
    dismissTilt: 20,
    dismissX: 30,
    baseZ: 36,
    zIndex: 30,
    windowStart: 0.64,
    windowEnd: 0.73,
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <path d="M12 18h.01" />
      </svg>
    ),
  },
  {
    id: 'forest',
    number: '03',
    title: 'E-Commerce Development',
    subtitle: 'CONVERSION OPTIMIZED',
    body: 'Custom headless commerce solutions engineered to drive unparalleled sales, integrate complex inventories, and boost user retention.',
    bg: '#1f6f5c',
    textColor: '#ebeedc',
    subColor: 'rgba(251, 253, 243, 0.75)',
    badgeBg: 'rgba(251, 253, 243, 0.14)',
    badgeBorder: 'rgba(251, 253, 243, 0.25)',
    iconColor: '#ebeedc',
    settleTilt: -4.5,
    settleX: -12,
    settleY: 8,
    dismissTilt: -18,
    dismissX: -28,
    baseZ: 24,
    zIndex: 20,
    windowStart: 0.73,
    windowEnd: 0.82,
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    id: 'ochre',
    number: '04',
    title: 'AI-Powered Apps',
    subtitle: 'INTELLIGENT SYSTEMS',
    body: 'Next-gen applications supercharged with LLMs, autonomous agents, and predictive machine learning models for deep intelligence.',
    bg: '#d9a441',
    textColor: '#13140f',
    subColor: '#453513',
    badgeBg: 'rgba(19, 20, 15, 0.09)',
    badgeBorder: 'rgba(19, 20, 15, 0.2)',
    iconColor: '#13140f',
    settleTilt: 5.5,
    settleX: 14,
    settleY: 12,
    dismissTilt: 22,
    dismissX: 32,
    baseZ: 12,
    zIndex: 10,
    windowStart: 0.82,
    windowEnd: 0.91,
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="M5 9.5 3.5 8" />
        <path d="M20.5 16 19 14.5" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="M5 14.5 3.5 16" />
        <path d="M20.5 8 19 9.5" />
        <circle cx="12" cy="12" r="5" />
      </svg>
    ),
  },
  {
    id: 'slate',
    number: '05',
    title: 'Website Development',
    subtitle: 'EDITORIAL & BRAND',
    body: 'Bespoke, award-winning corporate and portfolio websites utilizing smooth animations, immersive graphics, and precise typography.',
    bg: '#3c4a59',
    textColor: '#ebeedc',
    subColor: 'rgba(251, 253, 243, 0.7)',
    badgeBg: 'rgba(251, 253, 243, 0.15)',
    badgeBorder: 'rgba(251, 253, 243, 0.25)',
    iconColor: '#ebeedc',
    settleTilt: -6.5,
    settleX: -18,
    settleY: 16,
    dismissTilt: -24,
    dismissX: -36,
    baseZ: 0,
    zIndex: 0,
    windowStart: 0.91,
    windowEnd: 1.0,
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
  },
];

// easeOutBack spring function for tactile settle landing
function easeOutBack(x) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  const clamped = Math.max(0, Math.min(1, x));
  return 1 + c3 * Math.pow(clamped - 1, 3) + c1 * Math.pow(clamped - 1, 2);
}

// Smooth cubic easing for peeling dismiss
function easeCubic(x) {
  const clamped = Math.max(0, Math.min(1, x));
  return clamped * clamped * (3 - 2 * clamped);
}

export default function SettleDeck() {
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const headlineRef = useRef(null);
  const deckRef = useRef(null);
  const coverCardRef = useRef(null);
  const backCardRefs = useRef([]);

  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Setup refs for back cards
  backCardRefs.current = [];
  const addToBackRefs = (el) => {
    if (el && !backCardRefs.current.includes(el)) {
      backCardRefs.current.push(el);
    }
  };

  useEffect(() => {
    // Check if ?card query param is present
    const params = new URLSearchParams(window.location.search);
    const autoPlayMode = params.has('card');
    setIsAutoPlay(autoPlayMode);

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const checkMotion = () => setReducedMotion(mediaQuery.matches);
    checkMotion();
    mediaQuery.addEventListener('change', checkMotion);

    let rafId = null;
    let autoPlayStart = null;
    const AUTO_SWEEP_MS = 4200;
    const AUTO_HOLD_MS = 700;
    const TOTAL_CYCLE = AUTO_SWEEP_MS + AUTO_HOLD_MS;

    // Direct DOM transformation function driven by progress p in [0..1]
    const renderTimeline = (p) => {
      // If prefers-reduced-motion: lock in settled mid-state (p = 0.44)
      if (mediaQuery.matches) {
        p = 0.44;
      }

      // 1. Headline: [0..0.12] lifts away (translateY 0 -> -120%), fading
      if (headlineRef.current) {
        const tH = Math.max(0, Math.min(1, p / 0.12));
        const headY = -120 * tH;
        const headOpacity = Math.max(0, 1 - tH * 1.3);
        headlineRef.current.style.transform = `translate3d(0, ${headY}%, 0)`;
        headlineRef.current.style.opacity = headOpacity.toFixed(3);
        headlineRef.current.style.pointerEvents = headOpacity < 0.05 ? 'none' : 'auto';
      }

      // 2. Whole Deck Rise: [0..0.10] translateY 16% -> 0%
      let deckY = 0;
      if (p < 0.10) {
        const tRise = Math.max(0, Math.min(1, p / 0.10));
        const eRise = tRise * (2 - tRise);
        deckY = 16 * (1 - eRise);
      }
      if (deckRef.current) {
        deckRef.current.style.transform = `translate3d(-50%, calc(-50% + ${deckY}%), 0)`;
      }

      // 3. FIRST CARD FLIPS OVER: [0.10..0.26]
      // "it should flip and then cards come"
      if (coverCardRef.current) {
        let coverRotY = 0;
        let coverRotZ = 0;
        let coverTransX = 0;
        let coverTransZ = 60;
        let coverOpacity = 1;

        if (p < 0.10) {
          coverRotY = 0;
          coverRotZ = 0;
          coverTransX = 0;
          coverTransZ = 60;
          coverOpacity = 1;
        } else if (p <= 0.26) {
          const tFlip = (p - 0.10) / 0.16;
          // Smooth 3D flip over with camera lift and soft exit
          coverRotY = -tFlip * 180;
          coverRotZ = -tFlip * 8;
          coverTransX = -tFlip * 40;
          coverTransZ = 60 + Math.sin(tFlip * Math.PI) * 45;
          coverOpacity = tFlip > 0.65 ? Math.max(0, 1 - (tFlip - 0.65) / 0.35) : 1;
        } else {
          coverRotY = -180;
          coverRotZ = -8;
          coverTransX = -40;
          coverTransZ = 60;
          coverOpacity = 0;
        }

        coverCardRef.current.style.transform = `translate3d(${coverTransX.toFixed(1)}px, 0, ${coverTransZ.toFixed(1)}px) rotateY(${coverRotY.toFixed(2)}deg) rotateZ(${coverRotZ.toFixed(2)}deg)`;
        coverCardRef.current.style.opacity = coverOpacity.toFixed(3);
        coverCardRef.current.style.pointerEvents = coverOpacity > 0.1 ? 'auto' : 'none';
      }

      // 4. THEN CARDS COME & FAN OUT: [0.26..0.42]
      // Card 01 is ON TOP (baseZ = 48px, zIndex: 40)
      // Card 02 is behind Card 01 (baseZ = 36px, zIndex: 30)
      // Card 03 is behind Card 02 (baseZ = 24px, zIndex: 20)
      // Card 04 is behind Card 03 (baseZ = 12px, zIndex: 10)
      BACK_CARDS_DATA.forEach((card, index) => {
        const el = backCardRefs.current[index];
        if (!el) return;

        let rotZ = 0;
        let transX = 0;
        let transY = 0;
        let currentZ = card.baseZ;
        let scale = 1;
        let cardOpacity = 0;

        if (p < 0.24) {
          // Cover card is flipping over alone! Back cards are completely hidden!
          rotZ = 0;
          transX = 0;
          transY = 0;
          currentZ = card.baseZ;
          scale = 0.94;
          cardOpacity = 0;
        } else if (p <= 0.42) {
          // "THEN CARDS COME": Stack emerges and fans out with easeOutBack spring!
          const tEmerge = (p - 0.24) / 0.18;
          const eFan = easeOutBack(tEmerge);
          rotZ = card.settleTilt * Math.min(1, eFan);
          transX = card.settleX * Math.min(1, eFan);
          transY = card.settleY * Math.min(1, eFan);
          currentZ = card.baseZ;
          scale = 0.94 + 0.06 * Math.min(1, eFan);
          cardOpacity = Math.min(1, tEmerge * 3.0);
        } else if (p < card.windowStart) {
          // Fully settled and visible in forward order (Card 01 on top!)
          rotZ = card.settleTilt;
          transX = card.settleX;
          transY = card.settleY;
          currentZ = card.baseZ;
          scale = 1;
          cardOpacity = 1;
        } else if (p <= card.windowEnd) {
          if (index === 3) {
            // Card 04 is the final pillar: gently centers itself straight for final focus!
            const tFinal = (p - card.windowStart) / (card.windowEnd - card.windowStart);
            const eFinal = easeCubic(tFinal);
            rotZ = card.settleTilt * (1 - eFinal);
            transX = card.settleX * (1 - eFinal);
            transY = card.settleY * (1 - eFinal);
            currentZ = card.baseZ + 20 * eFinal;
            scale = 1;
            cardOpacity = 1;
          } else {
            // DISMISSING UPWARD IN FORWARD ORDER: Card 01 peels first, then Card 02, then Card 03!
            const tDismiss = (p - card.windowStart) / (card.windowEnd - card.windowStart);
            const eDismiss = easeCubic(tDismiss);
            rotZ = card.settleTilt + (card.dismissTilt - card.settleTilt) * eDismiss;
            transX = card.settleX + (card.dismissX - card.settleX) * eDismiss;
            transY = card.settleY - 260 * eDismiss;
            currentZ = card.baseZ + 35 * (1 - eDismiss);
            scale = 1;
            cardOpacity = tDismiss > 0.65 ? Math.max(0, 1 - (tDismiss - 0.65) / 0.35) : 1;
          }
        } else {
          if (index === 3) {
            // Card 04 stays centered as the final capstone discipline
            rotZ = 0;
            transX = 0;
            transY = 0;
            currentZ = card.baseZ + 20;
            scale = 1;
            cardOpacity = 1;
          } else {
            // Completely dismissed off top
            rotZ = card.dismissTilt;
            transX = card.dismissX;
            transY = -260;
            currentZ = card.baseZ;
            scale = 1;
            cardOpacity = 0;
          }
        }

        el.style.transform = `translate3d(${transX.toFixed(1)}px, ${transY.toFixed(1)}%, ${currentZ.toFixed(1)}px) rotateZ(${rotZ.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
        el.style.opacity = cardOpacity.toFixed(3);
        el.style.pointerEvents = cardOpacity > 0.1 ? 'auto' : 'none';
      });
    };

    // Animation Loop Handler (Scroll or AutoPlay)
    const tick = (now) => {
      if (autoPlayMode) {
        if (!autoPlayStart) autoPlayStart = now;
        const elapsed = (now - autoPlayStart) % TOTAL_CYCLE;
        let p = 0;
        if (elapsed <= AUTO_SWEEP_MS) {
          p = elapsed / AUTO_SWEEP_MS;
        } else {
          p = 1;
        }
        renderTimeline(p);
      } else {
        const track = trackRef.current;
        const stage = stageRef.current;
        if (track && stage) {
          const rect = track.getBoundingClientRect();
          const totalScroll = track.offsetHeight - window.innerHeight;
          const p = totalScroll > 0 ? Math.max(0, Math.min(1, -rect.top / totalScroll)) : 0;

          // Bulletproof pinning: guarantees top pinning across every browser and parent container
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

          renderTimeline(p);
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      mediaQuery.removeEventListener('change', checkMotion);
    };
  }, []);

  return (
    <div
      id="services"
      ref={trackRef}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: isAutoPlay ? '100svh' : '230vh',
        backgroundColor: '#f4f1ea',
        color: '#13140f',
      }}
    >
      {/* Injected Styles Block (Zero External Libraries) */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400..700;1,9..40,400..700&family=Oswald:wght@400..700&display=swap');

        .settle-pinned-stage {
          position: sticky;
          top: 0;
          left: 0;
          width: 100%;
          height: 100svh;
          clip-path: inset(0 0 0 0);
          -webkit-clip-path: inset(0 0 0 0);
          background: #f4f1ea;
          perspective: 1400px;
          perspective-origin: 50% 50%;
          display: flex;
          align-items: center;
          justifyContent: center;
          user-select: none;
          -webkit-user-select: none;
          z-index: 25;
        }

        /* Subtle organic paper grain texture overlay */
        .settle-paper-grain {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(#13140f 0.65px, transparent 0.65px);
          background-size: 24px 24px;
          opacity: 0.038;
          pointer-events: none;
          z-index: 1;
        }

        /* Giant Centered Headline */
        .settle-headline-wrap {
          position: absolute;
          top: 14svh;
          left: 0;
          width: 100%;
          padding: 0 24px;
          box-sizing: border-box;
          text-align: center;
          z-index: 12;
          pointer-events: none;
          will-change: transform, opacity;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .settle-kicker {
          font-family: 'Spectral', serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.28em;
          text-transform: capitalize;
          color: #c2502f;
          margin-bottom: 12px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }

        .settle-kicker::before,
        .settle-kicker::after {
          content: '';
          display: inline-block;
          width: 18px;
          height: 1.5px;
          background-color: #c2502f;
          opacity: 0.7;
        }

        .settle-headline {
          font-family: 'Spectral', serif;
          font-size: clamp(34px, 6.2vw, 76px);
          font-weight: 700;
          line-height: 1.02;
          letter-spacing: -0.015em;
          text-transform: capitalize;
          color: #13140f;
          margin: 0;
          max-width: 980px;
        }

        .settle-headline-sub {
          font-family: 'Space Mono', monospace;
          font-size: clamp(14px, 1.8vw, 17px);
          color: #555848;
          margin-top: 14px;
          max-width: 580px;
          line-height: 1.5;
        }

        /* Centered 3D Card Deck Stage */
        .settle-deck-container {
          position: absolute;
          top: 50%;
          left: 50%;
          width: clamp(310px, 26vw, 380px);
          aspect-ratio: 4 / 5.1;
          transform: translate3d(-50%, -50%, 0);
          transform-style: preserve-3d;
          z-index: 20;
          will-change: transform;
        }

        /* Base Card Styling */
        .settle-card {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 20px;
          padding: clamp(22px, 3.2vw, 32px);
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justifyContent: space-between;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform-style: preserve-3d;
          box-shadow: 0 22px 50px -12px rgba(19, 20, 15, 0.28),
                      0 8px 20px -4px rgba(19, 20, 15, 0.14),
                      inset 0 1px 0 rgba(255, 255, 255, 0.25);
          will-change: transform, opacity;
          border: 1px solid rgba(19, 20, 15, 0.08);
        }

        /* Cover Card Styling */
        .settle-cover-card {
          background-color: #13140f;
          background-image: radial-gradient(circle at 10% 20%, #252820 0%, #13140f 80%);
          color: #fbfdf3;
          border: 1px solid rgba(251, 253, 243, 0.14);
          z-index: 50;
          transform-origin: 50% 50%;
        }

        /* Card Typography */
        .settle-card-num {
          font-family: 'Spectral', serif;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: capitalize;
        }

        .settle-card-title {
          font-family: 'Spectral', serif;
          font-size: clamp(32px, 4.2vw, 42px);
          font-weight: 700;
          text-transform: capitalize;
          line-height: 1.05;
          letter-spacing: -0.01em;
          margin: 0;
        }

        .settle-card-sub {
          font-family: 'Spectral', serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: capitalize;
          margin-top: 6px;
        }

        .settle-card-body {
          font-family: 'Space Mono', monospace;
          font-size: clamp(13px, 1.4vw, 14.5px);
          line-height: 1.55;
          margin-top: 14px;
        }

        /* Tactile Corner Marks */
        .settle-corner-pip {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: currentColor;
          opacity: 0.4;
        }
        .pip-tl { top: 12px; left: 12px; }
        .pip-tr { top: 12px; right: 12px; }
        .pip-bl { bottom: 12px; left: 12px; }
        .pip-br { bottom: 12px; right: 12px; }

        @media (max-width: 768px) {
          .settle-deck-container {
            width: clamp(285px, 80vw, 345px);
          }
          .settle-headline-wrap {
            top: 10svh;
          }
        }
      `}</style>

      {/* PINNED SCROLL STAGE */}
      <div ref={stageRef} className="settle-pinned-stage">
        <div className="settle-paper-grain" />

        {/* GIANT CENTRED HEADLINE */}
        <div ref={headlineRef} className="settle-headline-wrap">
          <div className="settle-kicker">SERVICES & OFFERINGS</div>
          <h2 className="settle-headline">
            Scroll, and the deck settles into order
          </h2>
          <p className="settle-headline-sub">
            Five specialized services engineered into unified digital systems. Scroll to release the deck and uncover each offering.
          </p>
        </div>

        {/* 3D CENTERED DECK (Cover Card + 5 Back Cards) */}
        <div ref={deckRef} className="settle-deck-container">
          {/* 1. COVER CARD (Flips over at p: 0.10 -> 0.26) */}
          <div ref={coverCardRef} className="settle-card settle-cover-card">
            <div className="settle-corner-pip pip-tl" />
            <div className="settle-corner-pip pip-tr" />
            <div className="settle-corner-pip pip-bl" />
            <div className="settle-corner-pip pip-br" />

            {/* Top Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="settle-card-num" style={{ color: '#d9a441' }}>
                SERVICES // 05
              </span>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '4px 10px',
                  borderRadius: 9999,
                  backgroundColor: 'rgba(217, 164, 65, 0.15)',
                  border: '1px solid rgba(217, 164, 65, 0.3)',
                  color: '#d9a441',
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 11,
                  letterSpacing: '0.15em',
                  textTransform: 'capitalize',
                }}
              >
                <span>MY SERVICES</span>
              </div>
            </div>

            {/* Center Visual / Icon */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '16px 0',
              }}
            >
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 16,
                  border: '1.5px solid rgba(251, 253, 243, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#d9a441',
                  backgroundColor: 'rgba(251, 253, 243, 0.04)',
                  marginBottom: 16,
                }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18" />
                  <path d="M9 21V9" />
                </svg>
              </div>

              <h3 className="settle-card-title" style={{ textAlign: 'center', color: '#ebeedc' }}>
                Services
              </h3>
              <div className="settle-card-sub" style={{ color: '#d9a441' }}>
                Five Core Offerings
              </div>
              <p
                className="settle-card-body"
                style={{ textAlign: 'center', color: 'rgba(251, 253, 243, 0.72)', maxWidth: 280 }}
              >
                A tactile five-tier stack of premium development services. Scroll downward to uncover each offering.
              </p>
            </div>

            {/* Bottom Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTop: '1px solid rgba(251, 253, 243, 0.12)',
                paddingTop: 12,
              }}
            >
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: '0.2em', color: 'rgba(251, 253, 243, 0.5)' }}>
                DEVELOPMENT & DESIGN
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#d9a441' }}>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: '0.15em' }}>SCROLL TO UNLOCK</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </div>
            </div>
          </div>

          {/* 2. FOUR BACK CARDS (Stacked behind, revealed after flip, peeled forward: 01 -> 02 -> 03 -> 04) */}
          {BACK_CARDS_DATA.map((card, idx) => (
            <div
              key={card.id}
              ref={addToBackRefs}
              className="settle-card"
              style={{
                backgroundColor: card.bg,
                color: card.textColor,
                zIndex: card.zIndex, // Card 01 (Clay) has zIndex 40; Card 04 (Ochre) has zIndex 10
                transformOrigin: '50% 50%',
              }}
            >
              <div className="settle-corner-pip pip-tl" />
              <div className="settle-corner-pip pip-tr" />
              <div className="settle-corner-pip pip-bl" />
              <div className="settle-corner-pip pip-br" />

              {/* Card Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="settle-card-num" style={{ color: card.textColor }}>
                  SERVICE {card.number} // 05
                </span>
                <div
                  style={{
                    padding: '3px 8px',
                    borderRadius: 9999,
                    backgroundColor: card.badgeBg,
                    border: `1px solid ${card.badgeBorder}`,
                    color: card.textColor,
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 10.5,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                  }}
                >
                  {card.subtitle}
                </div>
              </div>

              {/* Card Main Info */}
              <div style={{ margin: 'auto 0' }}>
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    backgroundColor: card.badgeBg,
                    border: `1px solid ${card.badgeBorder}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: card.iconColor,
                    marginBottom: 16,
                  }}
                >
                  {card.icon}
                </div>

                <h3 className="settle-card-title" style={{ color: card.textColor }}>
                  {card.title}
                </h3>
                <div className="settle-card-sub" style={{ color: card.subColor }}>
                  {card.subtitle}
                </div>
                <p className="settle-card-body" style={{ color: card.textColor }}>
                  {card.body}
                </p>
              </div>

              {/* Card Footer */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: `1px solid ${card.badgeBorder}`,
                  paddingTop: 12,
                }}
              >
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: '0.2em', opacity: 0.75 }}>
                  IJJI MADHU VENKAT
                </span>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: '0.15em', fontWeight: 600 }}>
                  CORE SERVICE
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
