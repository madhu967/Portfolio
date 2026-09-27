import React, { useEffect, useRef, useState, useMemo } from 'react';

/**
 * Ijji Madhu Venkat — Luxury Editorial Developer Portfolio Hero Section
 * 
 * Features & Viewport Fixes:
 * - ZERO BLACK GAPS (TOP, BOTTOM, LEFT, RIGHT):
 *   The hero section fills 100% of the viewport width AND 100% of the viewport height (100vw x 100vh).
 *   Dynamic stage height (stageHeight = Math.max(560, Math.round(h / scale))) ensures the editorial panel
 *   spans edge-to-edge with zero letterboxing, zero pillarboxing, and zero black gap flicker.
 * - NO TOP/BOTTOM DUMMY TEXT: Canvas header and footer removed cleanly.
 * - SIGNATURE 12-SLAT VENETIAN BLIND TRANSITION: 100% preserved with perspective(2200px),
 *   cubic-bezier(0.42, 0, 0.7, 0.55), anti-flicker visibility gates, and sub-pixel overlap.
 * - ROTATED GIANT WORD STRADDLING BOUNDARY: 52px floating arrival motion intact.
 * - THREE TECHNICAL PILLARS: Stack (#9c968d) -> GenAI (#8b9b79) -> Logic (#cfd4d4) in a 14.4s seamless loop.
 * - Full support for prefers-reduced-motion.
 */

const SLAT_COUNT = 12;
const MAIN_WIDTH = 955;
const SLAT_WIDTH = MAIN_WIDTH / SLAT_COUNT; // 79.5833px

// Portfolio Pillars for Ijji Madhu Venkat
const STORIES = {
  brown: {
    id: 'brown',
    index: '01',
    name: 'Stack',
    panelBg: '#9c968d',
    mainWordColor: '#f2efe6',
    sidebarWordColor: '#9a968f',
    developerName: 'IJJI MADHU VENKAT',
    kicker: 'FULL STACK DEVELOPER',
    headline: 'FULL STACK & SOFTWARE ARCHITECTURE',
    techRange: 'React · Node.js · Next.js · Cloud APIs',
    lookKicker: 'PILLAR 01 · CORE',
    lookTitle: 'FULL STACK DEV',
    lookDesc: 'Scalable web systems, microservices & modern UI',
    nextLabel: 'GEN AI',
    nextIndex: '02',
    products: [
      { brand: 'FRONTEND', name: 'React & Next.js', highlight: 'SSR & Reactive UI', icon: 'code' },
      { brand: 'BACKEND', name: 'Node & Express', highlight: 'REST & GraphQL', icon: 'server' },
      { brand: 'ARCHITECTURE', name: 'SaaS Platform', highlight: 'Distributed Cloud', icon: 'cloud' },
    ]
  },
  green: {
    id: 'green',
    index: '02',
    name: 'GenAI',
    panelBg: '#8b9b79',
    mainWordColor: '#f1efe6',
    sidebarWordColor: '#41533d',
    developerName: 'IJJI MADHU VENKAT',
    kicker: 'GENERATIVE AI SPECIALIST',
    headline: 'GENERATIVE AI & INTELLIGENT AGENTS',
    techRange: 'LLMs · RAG · LangChain · Vector Search',
    lookKicker: 'PILLAR 02 · INTELLIGENCE',
    lookTitle: 'GENERATIVE AI',
    lookDesc: 'Autonomous agents, neural pipelines & embeddings',
    nextLabel: 'LOGIC',
    nextIndex: '03',
    products: [
      { brand: 'ORCHESTRATION', name: 'LangChain & RAG', highlight: 'Contextual AI', icon: 'neural' },
      { brand: 'EMBEDDINGS', name: 'Vector Database', highlight: 'Semantic Search', icon: 'vector' },
      { brand: 'INFERENCE', name: 'LLM Agent Flow', highlight: 'Zero-Shot Tuning', icon: 'brain' },
    ]
  },
  beige: {
    id: 'beige',
    index: '03',
    name: 'Logic',
    panelBg: '#cfd4d4',
    mainWordColor: '#f1f2ef',
    sidebarWordColor: '#c7cccb',
    developerName: 'IJJI MADHU VENKAT',
    kicker: 'DSA & DATABASE ARCHITECT',
    headline: 'DATA STRUCTURES & ADVANCED SQL',
    techRange: 'Algorithms · PostgreSQL · Optimization',
    lookKicker: 'PILLAR 03 · SYSTEMS',
    lookTitle: 'DSA & SQL',
    lookDesc: 'O(log n) efficiency, ACID databases & relational tuning',
    nextLabel: 'STACK',
    nextIndex: '01',
    products: [
      { brand: 'ALGORITHMS', name: 'DSA Mastery', highlight: 'Trees, Graphs & DP', icon: 'tree' },
      { brand: 'DATABASE', name: 'Relational SQL', highlight: 'PostgreSQL / ACID', icon: 'database' },
      { brand: 'PERFORMANCE', name: 'Query Optimization', highlight: 'Indexed B-Trees', icon: 'speed' },
    ]
  }
};

export default function FashionEditorial() {
  const containerRef = useRef(null);
  const [{ scale, stageHeight }, setDimensions] = useState({ scale: 1, stageHeight: 560 });

  // ResizeObserver: fills 100% viewport width AND 100% viewport height with ZERO black gaps
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleResize = () => {
      const w = el.clientWidth || window.innerWidth;
      const h = el.clientHeight || window.innerHeight;

      // 1200 * scale = w (completely fills 100% width)
      const newScale = w / 1200;
      // stageHeight * scale = h (completely fills 100% height, zero top/bottom black gaps)
      const newStageHeight = Math.max(560, Math.round(h / newScale));

      setDimensions({ scale: newScale, stageHeight: newStageHeight });
    };

    handleResize();
    const observer = new ResizeObserver(handleResize);
    observer.observe(el);
    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Compute CSS keyframes dynamically
  const cssKeyframes = useMemo(() => {
    const staggerSpan = 0.40 * 6.111; // 2.444%
    const slatDuration = 0.60 * 6.111; // 3.667%

    let slatStyles = '';

    for (let i = 0; i < SLAT_COUNT; i++) {
      const delay = (i / (SLAT_COUNT - 1)) * staggerSpan;

      // Flip 1 (Stack / Brown outgoing slats: 15.000% to 21.111%)
      const f1Start = 15.000 + delay;
      const f1End = f1Start + slatDuration;
      slatStyles += `
        @keyframes slat-f1-${i} {
          0%, 14.800% {
            transform: perspective(2200px) rotateY(0deg);
            opacity: 0;
          }
          14.900%, ${f1Start.toFixed(3)}% {
            transform: perspective(2200px) rotateY(0deg);
            opacity: 1;
            animation-timing-function: cubic-bezier(0.42, 0, 0.7, 0.55);
          }
          ${f1End.toFixed(3)}% {
            transform: perspective(2200px) rotateY(-94deg);
            opacity: 0;
          }
          ${(f1End + 0.01).toFixed(3)}%, 100% {
            transform: perspective(2200px) rotateY(-94deg);
            opacity: 0;
          }
        }
      `;

      // Flip 2 (GenAI / Green outgoing slats: 41.667% to 47.778%)
      const f2Start = 41.667 + delay;
      const f2End = f2Start + slatDuration;
      slatStyles += `
        @keyframes slat-f2-${i} {
          0%, 41.500% {
            transform: perspective(2200px) rotateY(0deg);
            opacity: 0;
          }
          41.600%, ${f2Start.toFixed(3)}% {
            transform: perspective(2200px) rotateY(0deg);
            opacity: 1;
            animation-timing-function: cubic-bezier(0.42, 0, 0.7, 0.55);
          }
          ${f2End.toFixed(3)}% {
            transform: perspective(2200px) rotateY(-94deg);
            opacity: 0;
          }
          ${(f2End + 0.01).toFixed(3)}%, 100% {
            transform: perspective(2200px) rotateY(-94deg);
            opacity: 0;
          }
        }
      `;

      // Flip 3 (Logic / Beige outgoing slats: 73.889% to 80.000%)
      const f3Start = 73.889 + delay;
      const f3End = f3Start + slatDuration;
      slatStyles += `
        @keyframes slat-f3-${i} {
          0%, 73.700% {
            transform: perspective(2200px) rotateY(0deg);
            opacity: 0;
          }
          73.800%, ${f3Start.toFixed(3)}% {
            transform: perspective(2200px) rotateY(0deg);
            opacity: 1;
            animation-timing-function: cubic-bezier(0.42, 0, 0.7, 0.55);
          }
          ${f3End.toFixed(3)}% {
            transform: perspective(2200px) rotateY(-94deg);
            opacity: 0;
          }
          ${(f3End + 0.01).toFixed(3)}%, 100% {
            transform: perspective(2200px) rotateY(-94deg);
            opacity: 0;
          }
        }
      `;
    }

    return `
      ${slatStyles}

      /* Slat Overlays: Visible ONLY during the flip window to prevent gap flicker */
      @keyframes overlay-1-visibility {
        0%, 14.800% { opacity: 0; visibility: hidden; pointer-events: none; }
        14.900%, 21.150% { opacity: 1; visibility: visible; pointer-events: none; }
        21.200%, 100% { opacity: 0; visibility: hidden; pointer-events: none; }
      }

      @keyframes overlay-2-visibility {
        0%, 41.500% { opacity: 0; visibility: hidden; pointer-events: none; }
        41.600%, 47.800% { opacity: 1; visibility: visible; pointer-events: none; }
        47.850%, 100% { opacity: 0; visibility: hidden; pointer-events: none; }
      }

      @keyframes overlay-3-visibility {
        0%, 73.700% { opacity: 0; visibility: hidden; pointer-events: none; }
        73.800%, 80.050% { opacity: 1; visibility: visible; pointer-events: none; }
        80.100%, 100% { opacity: 0; visibility: hidden; pointer-events: none; }
      }

      /* Base layer transitions: Solid uninterrupted surfaces */
      @keyframes green-base-layer {
        0%, 14.999% { opacity: 0; visibility: hidden; }
        15.000%, 47.778% { opacity: 1; visibility: visible; }
        47.779%, 100% { opacity: 0; visibility: hidden; }
      }

      @keyframes beige-base-layer {
        0%, 41.666% { opacity: 0; visibility: hidden; }
        41.667%, 80.000% { opacity: 1; visibility: visible; }
        80.001%, 100% { opacity: 0; visibility: hidden; }
      }

      /* Giant word floating motions (main copy & sidebar sliver) */
      @keyframes word-main-brown {
        0%, 15.000% { transform: translateY(0px); opacity: 1; }
        16.800% { transform: translateY(26px); opacity: 0; }
        16.801%, 73.888% { transform: translateY(52px); opacity: 0; }
        73.889% { transform: translateY(52px); opacity: 0; animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
        79.800%, 100% { transform: translateY(0px); opacity: 1; }
      }
      @keyframes word-sliver-brown {
        0%, 15.000% { transform: translateY(0px); opacity: 1; }
        16.800% { transform: translateY(-26px); opacity: 0; }
        16.801%, 73.888% { transform: translateY(-52px); opacity: 0; }
        73.889% { transform: translateY(-52px); opacity: 0; animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
        79.800%, 100% { transform: translateY(0px); opacity: 1; }
      }

      @keyframes word-main-green {
        0%, 14.999% { transform: translateY(52px); opacity: 0; }
        15.000% { transform: translateY(52px); opacity: 0; animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
        20.900%, 41.667% { transform: translateY(0px); opacity: 1; }
        43.500% { transform: translateY(26px); opacity: 0; }
        43.501%, 100% { transform: translateY(52px); opacity: 0; }
      }
      @keyframes word-sliver-green {
        0%, 14.999% { transform: translateY(-52px); opacity: 0; }
        15.000% { transform: translateY(-52px); opacity: 0; animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
        20.900%, 41.667% { transform: translateY(0px); opacity: 1; }
        43.500% { transform: translateY(-26px); opacity: 0; }
        43.501%, 100% { transform: translateY(-52px); opacity: 0; }
      }

      @keyframes word-main-beige {
        0%, 41.666% { transform: translateY(52px); opacity: 0; }
        41.667% { transform: translateY(52px); opacity: 0; animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
        47.600%, 73.889% { transform: translateY(0px); opacity: 1; }
        75.700% { transform: translateY(26px); opacity: 0; }
        75.701%, 100% { transform: translateY(52px); opacity: 0; }
      }
      @keyframes word-sliver-beige {
        0%, 41.666% { transform: translateY(-52px); opacity: 0; }
        41.667% { transform: translateY(-52px); opacity: 0; animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
        47.600%, 73.889% { transform: translateY(0px); opacity: 1; }
        75.700% { transform: translateY(-26px); opacity: 0; }
        75.701%, 100% { transform: translateY(-52px); opacity: 0; }
      }

      /* Sidebar upcoming preview thumbnail slide-up animations */
      @keyframes preview-slide-green {
        0%, 15.000% { transform: translateY(0%); opacity: 1; }
        17.000% { transform: translateY(-100%); opacity: 0; }
        17.001%, 73.888% { transform: translateY(100%); opacity: 0; }
        73.889% { transform: translateY(100%); opacity: 0; animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
        80.000%, 100% { transform: translateY(0%); opacity: 1; }
      }
      @keyframes preview-slide-beige {
        0%, 14.999% { transform: translateY(100%); opacity: 0; }
        15.000% { transform: translateY(100%); opacity: 0; animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
        21.111%, 41.667% { transform: translateY(0%); opacity: 1; }
        43.700% { transform: translateY(-100%); opacity: 0; }
        43.701%, 100% { transform: translateY(100%); opacity: 0; }
      }
      @keyframes preview-slide-brown {
        0%, 41.666% { transform: translateY(100%); opacity: 0; }
        41.667% { transform: translateY(100%); opacity: 0; animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
        47.778%, 73.889% { transform: translateY(0%); opacity: 1; }
        75.900% { transform: translateY(-100%); opacity: 0; }
        75.901%, 100% { transform: translateY(100%); opacity: 0; }
      }

      /* Sidebar Content Crossfades */
      @keyframes sidebar-info-brown {
        0%, 15.000% { opacity: 1; transform: translateY(0px); }
        17.000% { opacity: 0; transform: translateY(-8px); }
        17.001%, 73.888% { opacity: 0; transform: translateY(8px); }
        73.889% { opacity: 0; transform: translateY(8px); animation-timing-function: ease-out; }
        78.800%, 100% { opacity: 1; transform: translateY(0px); }
      }
      @keyframes sidebar-info-green {
        0%, 14.999% { opacity: 0; transform: translateY(8px); }
        15.000% { opacity: 0; transform: translateY(8px); animation-timing-function: ease-out; }
        19.800%, 41.667% { opacity: 1; transform: translateY(0px); }
        43.700% { opacity: 0; transform: translateY(-8px); }
        43.701%, 100% { opacity: 0; transform: translateY(8px); }
      }
      @keyframes sidebar-info-beige {
        0%, 41.666% { opacity: 0; transform: translateY(8px); }
        41.667% { opacity: 0; transform: translateY(8px); animation-timing-function: ease-out; }
        46.800%, 73.889% { opacity: 1; transform: translateY(0px); }
        75.900% { opacity: 0; transform: translateY(-8px); }
        75.901%, 100% { opacity: 0; transform: translateY(8px); }
      }

      /* Respect prefers-reduced-motion */
      @media (prefers-reduced-motion: reduce) {
        *, ::before, ::after {
          animation-duration: 0.001ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.001ms !important;
        }
        .slat-overlay-1, .slat-overlay-2, .slat-overlay-3 {
          display: none !important;
        }
        .green-base-layer, .beige-base-layer {
          display: none !important;
        }
        .word-main-green, .word-sliver-green,
        .word-main-beige, .word-sliver-beige,
        .sidebar-info-green, .sidebar-info-beige,
        .preview-beige, .preview-brown {
          display: none !important;
        }
        .word-main-brown, .word-sliver-brown,
        .sidebar-info-brown, .preview-green {
          opacity: 1 !important;
          transform: none !important;
        }
      }
    `;
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        userSelect: 'none',
        WebkitFontSmoothing: 'antialiased',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      <style>{cssKeyframes}</style>

      {/* 1200xStageHeight Core Editorial Panel scaled to 100vw x 100vh (Zero Black Gaps) */}
      <div
        style={{
          width: 1200,
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
        {/* ========================================================================= */}
        {/* 1. LEFT SIDEBAR (245px White Panel, 100% height) */}
        {/* ========================================================================= */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 245,
            height: '100%',
            backgroundColor: '#ffffff',
            zIndex: 30,
            overflow: 'hidden',
            boxSizing: 'border-box',
          }}
        >
          {/* Wordmark */}
          <div style={{ position: 'absolute', top: 28, left: 28 }}>
            <div
              style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                fontWeight: 900,
                fontSize: 20,
                letterSpacing: 3.5,
                color: '#111116',
                lineHeight: 1,
              }}
            >
              MADHU
            </div>
            <div
              style={{
                fontSize: 7.5,
                fontWeight: 800,
                letterSpacing: 2,
                color: '#888892',
                marginTop: 5,
                textTransform: 'uppercase',
              }}
            >
              PORTFOLIO · 2026
            </div>
          </div>

          {/* 'Next' Header & Prev/Next Arrows */}
          <div
            style={{
              position: 'absolute',
              top: 86,
              left: 28,
              width: 160,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: 2,
                color: '#666670',
                textTransform: 'uppercase',
              }}
            >
              Next
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              {/* Left arrow */}
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  border: '1px solid rgba(0,0,0,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.5">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </div>
              {/* Right arrow */}
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  border: '1px solid rgba(0,0,0,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.5">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            </div>
          </div>

          {/* 160x248 Clipped Preview Thumbnail Container */}
          <div
            style={{
              position: 'absolute',
              top: 114,
              left: 28,
              width: 160,
              height: 248,
              overflow: 'hidden',
              borderRadius: 2,
              backgroundColor: '#1b1b22',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
            }}
          >
            {/* Preview 1: GenAI (shown during Stack story) */}
            <div
              className="preview-green"
              style={{
                position: 'absolute',
                inset: 0,
                animation: 'preview-slide-green 14.4s infinite',
              }}
            >
              <PortfolioPreviewContent story={STORIES.green} />
            </div>

            {/* Preview 2: Logic (shown during GenAI story) */}
            <div
              className="preview-beige"
              style={{
                position: 'absolute',
                inset: 0,
                animation: 'preview-slide-beige 14.4s infinite',
              }}
            >
              <PortfolioPreviewContent story={STORIES.beige} />
            </div>

            {/* Preview 3: Stack (shown during Logic story) */}
            <div
              className="preview-brown"
              style={{
                position: 'absolute',
                inset: 0,
                animation: 'preview-slide-brown 14.4s infinite',
              }}
            >
              <PortfolioPreviewContent story={STORIES.brown} />
            </div>
          </div>

          {/* Sidebar Metadata (Headline, Tech Range, Big Index Code) */}
          <div style={{ position: 'absolute', top: 382, left: 28, right: 28, bottom: 24 }}>
            {/* Stack Meta */}
            <div
              className="sidebar-info-brown"
              style={{
                position: 'absolute',
                inset: 0,
                animation: 'sidebar-info-brown 14.4s infinite',
              }}
            >
              <SidebarInfo story={STORIES.brown} />
            </div>

            {/* GenAI Meta */}
            <div
              className="sidebar-info-green"
              style={{
                position: 'absolute',
                inset: 0,
                animation: 'sidebar-info-green 14.4s infinite',
              }}
            >
              <SidebarInfo story={STORIES.green} />
            </div>

            {/* Logic Meta */}
            <div
              className="sidebar-info-beige"
              style={{
                position: 'absolute',
                inset: 0,
                animation: 'sidebar-info-beige 14.4s infinite',
              }}
            >
              <SidebarInfo story={STORIES.beige} />
            </div>
          </div>

          {/* Giant Word Dark Slivers (straddling boundary) */}
          <div
            className="word-sliver-brown"
            style={{
              position: 'absolute',
              left: 372,
              top: 24,
              zIndex: 35,
              animation: 'word-sliver-brown 14.4s infinite',
            }}
          >
            <div
              style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                fontWeight: 800,
                fontSize: 168,
                letterSpacing: -5,
                lineHeight: 0.8,
                whiteSpace: 'nowrap',
                color: STORIES.brown.sidebarWordColor,
                transformOrigin: '0 0',
                transform: 'rotate(90deg)',
                pointerEvents: 'none',
              }}
            >
              {STORIES.brown.name}
            </div>
          </div>

          <div
            className="word-sliver-green"
            style={{
              position: 'absolute',
              left: 372,
              top: 24,
              zIndex: 35,
              animation: 'word-sliver-green 14.4s infinite',
            }}
          >
            <div
              style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                fontWeight: 800,
                fontSize: 168,
                letterSpacing: -5,
                lineHeight: 0.8,
                whiteSpace: 'nowrap',
                color: STORIES.green.sidebarWordColor,
                transformOrigin: '0 0',
                transform: 'rotate(90deg)',
                pointerEvents: 'none',
              }}
            >
              {STORIES.green.name}
            </div>
          </div>

          <div
            className="word-sliver-beige"
            style={{
              position: 'absolute',
              left: 372,
              top: 24,
              zIndex: 35,
              animation: 'word-sliver-beige 14.4s infinite',
            }}
          >
            <div
              style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                fontWeight: 800,
                fontSize: 168,
                letterSpacing: -5,
                lineHeight: 0.8,
                whiteSpace: 'nowrap',
                color: STORIES.beige.sidebarWordColor,
                transformOrigin: '0 0',
                transform: 'rotate(90deg)',
                pointerEvents: 'none',
              }}
            >
              {STORIES.beige.name}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. MAIN COLOURED AREA (955px wide, 100% height, positioned left: 245px)   */}
        {/* ========================================================================= */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 245,
            width: 955,
            height: '100%',
            overflow: 'hidden',
          }}
        >
          {/* ----------------------------------------------------------------- */}
          {/* LAYER 0: STACK BASE (Permanent solid resting base)                */}
          {/* ----------------------------------------------------------------- */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: STORIES.brown.panelBg,
              zIndex: 1,
            }}
          >
            <MainPortfolioContent story={STORIES.brown} stageHeight={stageHeight} />
          </div>

          {/* ----------------------------------------------------------------- */}
          {/* LAYER 1: GENAI BASE LAYER (Solid surface beneath Flip 1 slats)    */}
          {/* ----------------------------------------------------------------- */}
          <div
            className="green-base-layer"
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: STORIES.green.panelBg,
              zIndex: 2,
              animation: 'green-base-layer 14.4s infinite',
            }}
          >
            <MainPortfolioContent story={STORIES.green} stageHeight={stageHeight} />
          </div>

          {/* ----------------------------------------------------------------- */}
          {/* LAYER 2: LOGIC BASE LAYER (Solid surface beneath Flip 2 slats)    */}
          {/* ----------------------------------------------------------------- */}
          <div
            className="beige-base-layer"
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: STORIES.beige.panelBg,
              zIndex: 3,
              animation: 'beige-base-layer 14.4s infinite',
            }}
          >
            <MainPortfolioContent story={STORIES.beige} stageHeight={stageHeight} />
          </div>

          {/* ----------------------------------------------------------------- */}
          {/* GIANT WORD MAIN LIGHT COPIES (Z-INDEX: 15)                        */}
          {/* ----------------------------------------------------------------- */}
          <div
            className="word-main-brown"
            style={{
              position: 'absolute',
              left: 127,
              top: 24,
              zIndex: 15,
              animation: 'word-main-brown 14.4s infinite',
            }}
          >
            <div
              style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                fontWeight: 800,
                fontSize: 168,
                letterSpacing: -5,
                lineHeight: 0.8,
                whiteSpace: 'nowrap',
                color: STORIES.brown.mainWordColor,
                transformOrigin: '0 0',
                transform: 'rotate(90deg)',
                pointerEvents: 'none',
              }}
            >
              {STORIES.brown.name}
            </div>
          </div>

          <div
            className="word-main-green"
            style={{
              position: 'absolute',
              left: 127,
              top: 24,
              zIndex: 15,
              animation: 'word-main-green 14.4s infinite',
            }}
          >
            <div
              style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                fontWeight: 800,
                fontSize: 168,
                letterSpacing: -5,
                lineHeight: 0.8,
                whiteSpace: 'nowrap',
                color: STORIES.green.mainWordColor,
                transformOrigin: '0 0',
                transform: 'rotate(90deg)',
                pointerEvents: 'none',
              }}
            >
              {STORIES.green.name}
            </div>
          </div>

          <div
            className="word-main-beige"
            style={{
              position: 'absolute',
              left: 127,
              top: 24,
              zIndex: 15,
              animation: 'word-main-beige 14.4s infinite',
            }}
          >
            <div
              style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                fontWeight: 800,
                fontSize: 168,
                letterSpacing: -5,
                lineHeight: 0.8,
                whiteSpace: 'nowrap',
                color: STORIES.beige.mainWordColor,
                transformOrigin: '0 0',
                transform: 'rotate(90deg)',
                pointerEvents: 'none',
              }}
            >
              {STORIES.beige.name}
            </div>
          </div>

          {/* ----------------------------------------------------------------- */}
          {/* SIGNATURE MOVE: 12 VERTICAL VENETIAN-BLIND SLAT OVERLAYS         */}
          {/* ----------------------------------------------------------------- */}

          {/* Flip 1 Slats: Stack -> GenAI (z-index: 20) */}
          <div
            className="slat-overlay-1"
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 20,
              pointerEvents: 'none',
              animation: 'overlay-1-visibility 14.4s infinite',
            }}
          >
            {Array.from({ length: SLAT_COUNT }).map((_, i) => (
              <div
                key={`slat-f1-${i}`}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: i * SLAT_WIDTH,
                  width: SLAT_WIDTH + 1.2,
                  height: '100%',
                  overflow: 'hidden',
                  transformOrigin: '50% 50%',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  outline: '1px solid transparent',
                  animation: `slat-f1-${i} 14.4s infinite`,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: -i * SLAT_WIDTH,
                    width: MAIN_WIDTH,
                    height: '100%',
                    backgroundColor: STORIES.brown.panelBg,
                  }}
                >
                  <MainPortfolioContent story={STORIES.brown} stageHeight={stageHeight} />
                  <div
                    style={{
                      position: 'absolute',
                      left: 127,
                      top: 24,
                      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                      fontWeight: 800,
                      fontSize: 168,
                      letterSpacing: -5,
                      lineHeight: 0.8,
                      whiteSpace: 'nowrap',
                      color: STORIES.brown.mainWordColor,
                      transformOrigin: '0 0',
                      transform: 'rotate(90deg)',
                    }}
                  >
                    {STORIES.brown.name}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Flip 2 Slats: GenAI -> Logic (z-index: 22) */}
          <div
            className="slat-overlay-2"
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 22,
              pointerEvents: 'none',
              animation: 'overlay-2-visibility 14.4s infinite',
            }}
          >
            {Array.from({ length: SLAT_COUNT }).map((_, i) => (
              <div
                key={`slat-f2-${i}`}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: i * SLAT_WIDTH,
                  width: SLAT_WIDTH + 1.2,
                  height: '100%',
                  overflow: 'hidden',
                  transformOrigin: '50% 50%',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  outline: '1px solid transparent',
                  animation: `slat-f2-${i} 14.4s infinite`,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: -i * SLAT_WIDTH,
                    width: MAIN_WIDTH,
                    height: '100%',
                    backgroundColor: STORIES.green.panelBg,
                  }}
                >
                  <MainPortfolioContent story={STORIES.green} stageHeight={stageHeight} />
                  <div
                    style={{
                      position: 'absolute',
                      left: 127,
                      top: 24,
                      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                      fontWeight: 800,
                      fontSize: 168,
                      letterSpacing: -5,
                      lineHeight: 0.8,
                      whiteSpace: 'nowrap',
                      color: STORIES.green.mainWordColor,
                      transformOrigin: '0 0',
                      transform: 'rotate(90deg)',
                    }}
                  >
                    {STORIES.green.name}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Flip 3 Slats: Logic -> Stack (z-index: 24) */}
          <div
            className="slat-overlay-3"
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 24,
              pointerEvents: 'none',
              animation: 'overlay-3-visibility 14.4s infinite',
            }}
          >
            {Array.from({ length: SLAT_COUNT }).map((_, i) => (
              <div
                key={`slat-f3-${i}`}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: i * SLAT_WIDTH,
                  width: SLAT_WIDTH + 1.2,
                  height: '100%',
                  overflow: 'hidden',
                  transformOrigin: '50% 50%',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  outline: '1px solid transparent',
                  animation: `slat-f3-${i} 14.4s infinite`,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: -i * SLAT_WIDTH,
                    width: MAIN_WIDTH,
                    height: '100%',
                    backgroundColor: STORIES.beige.panelBg,
                  }}
                >
                  <MainPortfolioContent story={STORIES.beige} stageHeight={stageHeight} />
                  <div
                    style={{
                      position: 'absolute',
                      left: 127,
                      top: 24,
                      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                      fontWeight: 800,
                      fontSize: 168,
                      letterSpacing: -5,
                      lineHeight: 0.8,
                      whiteSpace: 'nowrap',
                      color: STORIES.beige.mainWordColor,
                      transformOrigin: '0 0',
                      transform: 'rotate(90deg)',
                    }}
                  >
                    {STORIES.beige.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Portfolio Content Sub-Component (Developer Showcase, 158x85 card, 3 product cards, kicker)
// ---------------------------------------------------------------------------
function MainPortfolioContent({ story, stageHeight }) {
  return (
    <div style={{ position: 'relative', width: 955, height: '100%', pointerEvents: 'none' }}>
      {/* 430x520 Developer Tech Visualization Centerpiece (bottom-aligned) */}
      <div
        style={{
          position: 'absolute',
          left: 175,
          bottom: 0,
          width: 430,
          height: 520,
          zIndex: 5,
        }}
      >
        <TechIllustrationSvg id={story.id} />
      </div>

      {/* Developer's Name & Role Kicker */}
      <div
        style={{
          position: 'absolute',
          right: 28,
          bottom: 188,
          textAlign: 'right',
          zIndex: 8,
        }}
      >
        <div
          style={{
            fontSize: 9,
            fontWeight: 800,
            letterSpacing: 3,
            color: 'rgba(255, 255, 255, 0.75)',
            textTransform: 'uppercase',
            marginBottom: 3,
          }}
        >
          {story.kicker}
        </div>
        <div
          style={{
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            fontSize: 17,
            fontWeight: 800,
            letterSpacing: 1.2,
            color: '#ffffff',
            textTransform: 'uppercase',
            textShadow: '0 2px 10px rgba(0,0,0,0.35)',
          }}
        >
          {story.developerName}
        </div>
      </div>

      {/* 158x85 White Thumbnail Card Top-Right */}
      <div
        style={{
          position: 'absolute',
          top: 24,
          right: 28,
          width: 158,
          height: 85,
          backgroundColor: '#ffffff',
          borderRadius: 3,
          boxShadow: '0 12px 28px rgba(0, 0, 0, 0.16)',
          boxSizing: 'border-box',
          padding: '9px 10px',
          display: 'flex',
          gap: 10,
          alignItems: 'center',
          zIndex: 8,
        }}
      >
        <div
          style={{
            width: 46,
            height: 67,
            borderRadius: 2,
            overflow: 'hidden',
            backgroundColor: story.panelBg,
            flexShrink: 0,
            position: 'relative',
          }}
        >
          <TechSwatchGraphic id={story.id} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div
            style={{
              fontSize: 8,
              fontWeight: 800,
              letterSpacing: 1.5,
              color: '#111116',
              textTransform: 'uppercase',
              lineHeight: 1.2,
            }}
          >
            {story.lookKicker}
          </div>
          <div
            style={{
              fontSize: 7.5,
              fontWeight: 700,
              color: '#7b7b84',
              textTransform: 'uppercase',
              letterSpacing: 1,
              marginTop: 2,
            }}
          >
            {story.lookTitle}
          </div>
          <div
            style={{
              fontSize: 7,
              fontWeight: 500,
              color: '#44444c',
              lineHeight: 1.35,
              marginTop: 4,
            }}
          >
            {story.lookDesc}
          </div>
        </div>
      </div>

      {/* Three 105x150 White Project / Skill Showcase Cards Bottom-Right */}
      <div
        style={{
          position: 'absolute',
          bottom: 24,
          right: 28,
          display: 'flex',
          gap: 12,
          zIndex: 8,
        }}
      >
        {story.products.map((item, idx) => (
          <div
            key={idx}
            style={{
              width: 105,
              height: 150,
              backgroundColor: '#ffffff',
              borderRadius: 3,
              boxShadow: '0 10px 24px rgba(0, 0, 0, 0.14)',
              boxSizing: 'border-box',
              padding: '10px 8px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                width: '100%',
                height: 72,
                borderRadius: 2,
                backgroundColor: '#f6f6f8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ProjectTechIcon icon={item.icon} color={story.panelBg} />
            </div>

            <div style={{ marginTop: 6 }}>
              <div
                style={{
                  fontSize: 7.5,
                  fontWeight: 800,
                  letterSpacing: 1.4,
                  color: '#111116',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {item.brand}
              </div>
              <div
                style={{
                  fontSize: 7.5,
                  fontWeight: 600,
                  color: '#44444f',
                  marginTop: 2,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {item.name}
              </div>
              <div
                style={{
                  fontSize: 8,
                  fontWeight: 700,
                  color: '#111116',
                  marginTop: 3,
                  letterSpacing: -0.1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 3,
                }}
              >
                <span style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: '#22c55e', display: 'inline-block' }} />
                {item.highlight}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sidebar Preview Content (160x248 thumbnail card)
// ---------------------------------------------------------------------------
function PortfolioPreviewContent({ story }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: story.panelBg,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 14,
        boxSizing: 'border-box',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span
          style={{
            fontSize: 7.5,
            fontWeight: 800,
            letterSpacing: 2,
            color: 'rgba(255,255,255,0.7)',
            textTransform: 'uppercase',
          }}
        >
          {story.nextIndex} / NEXT
        </span>
        <span
          style={{
            fontSize: 8,
            fontWeight: 800,
            letterSpacing: 1.5,
            color: '#ffffff',
            textTransform: 'uppercase',
          }}
        >
          {story.name}
        </span>
      </div>

      <div style={{ width: '100%', height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <MiniTechPreviewSvg id={story.id} />
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.25)', paddingTop: 8 }}>
        <div
          style={{
            fontSize: 7.5,
            fontWeight: 800,
            letterSpacing: 1.5,
            color: '#ffffff',
            textTransform: 'uppercase',
          }}
        >
          SPECIALIZATION
        </div>
        <div
          style={{
            fontSize: 7,
            color: 'rgba(255,255,255,0.85)',
            marginTop: 2,
          }}
        >
          {story.lookTitle}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sidebar Info Sub-Component (Headline, Tech Range, Big Index)
// ---------------------------------------------------------------------------
function SidebarInfo({ story }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
      }}
    >
      <div>
        <div
          style={{
            fontSize: 8.5,
            fontWeight: 800,
            letterSpacing: 1.4,
            color: '#1a1a20',
            textTransform: 'uppercase',
            lineHeight: 1.35,
          }}
        >
          {story.headline}
        </div>
        <div
          style={{
            fontSize: 9.5,
            fontWeight: 600,
            color: '#555562',
            marginTop: 5,
            letterSpacing: 0.2,
          }}
        >
          {story.techRange}
        </div>
      </div>

      <div>
        <div
          style={{
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            fontSize: 38,
            fontWeight: 900,
            letterSpacing: -1.5,
            color: '#111116',
            lineHeight: 0.9,
          }}
        >
          {story.index}
        </div>
        <div
          style={{
            fontSize: 7.5,
            fontWeight: 700,
            letterSpacing: 2,
            color: '#9999a0',
            textTransform: 'uppercase',
            marginTop: 4,
          }}
        >
          FOCUS DOMAIN
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// High-Tech Illustrations (430x520)
// ---------------------------------------------------------------------------
function TechIllustrationSvg({ id }) {
  if (id === 'brown') {
    return (
      <svg width="430" height="520" viewBox="0 0 430 520" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ideGrad" x1="50" y1="80" x2="380" y2="480" gradientUnits="userSpaceOnUse">
            <stop stopColor="#221e1a" />
            <stop offset="0.6" stopColor="#181512" />
            <stop offset="1" stopColor="#0d0b09" />
          </linearGradient>
          <linearGradient id="accentBrown" x1="100" y1="120" x2="330" y2="350" gradientUnits="userSpaceOnUse">
            <stop stopColor="#e3d6c7" />
            <stop offset="1" stopColor="#a89987" />
          </linearGradient>
          <linearGradient id="glassLayer" x1="70" y1="150" x2="360" y2="460" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffffff" stopOpacity="0.12" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0.03" />
          </linearGradient>
          <filter id="shadowFS" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="18" stdDeviation="24" floodColor="#000000" floodOpacity="0.5" />
          </filter>
        </defs>

        <circle cx="215" cy="240" r="170" fill="#c4b5a2" fillOpacity="0.2" />

        <g filter="url(#shadowFS)">
          <rect x="55" y="100" width="320" height="420" rx="10" fill="url(#ideGrad)" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
          
          <rect x="55" y="100" width="320" height="34" rx="10" fill="#2d2722" />
          <circle cx="75" cy="117" r="4.5" fill="#ef4444" />
          <circle cx="90" cy="117" r="4.5" fill="#f59e0b" />
          <circle cx="105" cy="117" r="4.5" fill="#10b981" />
          <text x="215" y="121" fill="#c5b8a8" fontSize="8" fontWeight="700" letterSpacing="1.5" textAnchor="middle" fontFamily="monospace">
            MADHU_VENKAT.STACK.TS
          </text>

          <g fontFamily="monospace" fontSize="8.5" fill="#e8dcd0">
            <text x="78" y="160">
              <tspan fill="#d97706">class </tspan>
              <tspan fill="#fef3c7" fontWeight="bold">FullStackArchitecture </tspan>
              <tspan fill="#a89987">&#123;</tspan>
            </text>
            <text x="94" y="180">
              <tspan fill="#93c5fd">readonly </tspan>
              <tspan fill="#f3ede6">engineer </tspan>
              <tspan fill="#d97706">= </tspan>
              <tspan fill="#86efac">"Ijji Madhu Venkat"</tspan>;
            </text>
            <text x="94" y="200">
              <tspan fill="#93c5fd">readonly </tspan>
              <tspan fill="#f3ede6">stack </tspan>
              <tspan fill="#d97706">= </tspan>
              <tspan fill="#a89987">[</tspan>
            </text>
            <text x="110" y="218" fill="#cbd5e1">"React 19", "Next.js 15", "Node.js",</text>
            <text x="110" y="236" fill="#cbd5e1">"TypeScript", "REST", "GraphQL"</text>
            <text x="94" y="254" fill="#a89987">];</text>

            <text x="94" y="280">
              <tspan fill="#c084fc">async </tspan>
              <tspan fill="#60a5fa">deployProduction</tspan>
              <tspan fill="#a89987">() &#123;</tspan>
            </text>
            <text x="110" y="300">
              <tspan fill="#c084fc">return await </tspan>
              <tspan fill="#f3ede6">this.buildScale(&#123; </tspan>
              <tspan fill="#86efac">uptime: 99.99 </tspan>
              <tspan fill="#f3ede6">&#125;);</tspan>
            </text>
            <text x="94" y="320" fill="#a89987">&#125;</text>
            <text x="78" y="340" fill="#a89987">&#125;</text>
          </g>

          <rect x="75" y="360" width="280" height="52" rx="6" fill="url(#glassLayer)" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
          <circle cx="98" cy="386" r="12" fill="#3b322a" />
          <path d="M93 386 L98 381 L103 386 L98 391 Z" fill="#e8dcd0" />
          <text x="120" y="382" fill="#ffffff" fontSize="9.5" fontWeight="800" letterSpacing="0.8">FRONTEND ARCHITECTURE</text>
          <text x="120" y="396" fill="#c4b5a2" fontSize="7.5" fontWeight="500">React · Next.js · SSR · High Performance Virtual DOM</text>

          <rect x="75" y="422" width="280" height="52" rx="6" fill="url(#glassLayer)" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
          <circle cx="98" cy="448" r="12" fill="#3b322a" />
          <rect x="94" y="443" width="8" height="10" rx="1" fill="#e8dcd0" />
          <text x="120" y="444" fill="#ffffff" fontSize="9.5" fontWeight="800" letterSpacing="0.8">BACKEND MICROSERVICES</text>
          <text x="120" y="458" fill="#c4b5a2" fontSize="7.5" fontWeight="500">Node.js · Distributed APIs · WebSockets · Scalable Auth</text>
        </g>

        <rect x="290" y="148" width="70" height="20" rx="10" fill="rgba(34, 197, 94, 0.15)" stroke="#22c55e" strokeWidth="1" />
        <circle cx="302" cy="158" r="3" fill="#22c55e" />
        <text x="310" y="161" fill="#22c55e" fontSize="7" fontWeight="800" letterSpacing="1">ONLINE</text>
      </svg>
    );
  }

  if (id === 'green') {
    return (
      <svg width="430" height="520" viewBox="0 0 430 520" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="aiConsole" x1="50" y1="80" x2="380" y2="480" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1c2518" />
            <stop offset="0.6" stopColor="#141c11" />
            <stop offset="1" stopColor="#0b1009" />
          </linearGradient>
          <linearGradient id="neuralGlow" x1="100" y1="120" x2="330" y2="350" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4ade80" />
            <stop offset="1" stopColor="#15803d" />
          </linearGradient>
          <linearGradient id="aiCard" x1="70" y1="150" x2="360" y2="460" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0.02" />
          </linearGradient>
          <filter id="shadowAI" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="18" stdDeviation="24" floodColor="#000000" floodOpacity="0.5" />
          </filter>
        </defs>

        <circle cx="215" cy="240" r="170" fill="#a4b893" fillOpacity="0.22" />

        <g filter="url(#shadowAI)">
          <rect x="55" y="100" width="320" height="420" rx="10" fill="url(#aiConsole)" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />

          <rect x="55" y="100" width="320" height="34" rx="10" fill="#222e1e" />
          <circle cx="75" cy="117" r="4.5" fill="#ef4444" />
          <circle cx="90" cy="117" r="4.5" fill="#f59e0b" />
          <circle cx="105" cy="117" r="4.5" fill="#10b981" />
          <text x="215" y="121" fill="#b8cbb0" fontSize="8" fontWeight="700" letterSpacing="1.5" textAnchor="middle" fontFamily="monospace">
            GENAI_NEURAL_PIPELINE.RAG
          </text>

          <g stroke="rgba(134, 239, 172, 0.35)" strokeWidth="1.2">
            <line x1="100" y1="180" x2="175" y2="160" />
            <line x1="100" y1="180" x2="175" y2="200" />
            <line x1="100" y1="180" x2="175" y2="240" />

            <line x1="100" y1="220" x2="175" y2="160" />
            <line x1="100" y1="220" x2="175" y2="200" />
            <line x1="100" y1="220" x2="175" y2="240" />

            <line x1="100" y1="260" x2="175" y2="160" />
            <line x1="100" y1="260" x2="175" y2="200" />
            <line x1="100" y1="260" x2="175" y2="240" />

            <line x1="175" y1="160" x2="255" y2="180" />
            <line x1="175" y1="160" x2="255" y2="230" />
            <line x1="175" y1="200" x2="255" y2="180" />
            <line x1="175" y1="200" x2="255" y2="230" />
            <line x1="175" y1="240" x2="255" y2="180" />
            <line x1="175" y1="240" x2="255" y2="230" />

            <line x1="255" y1="180" x2="325" y2="210" />
            <line x1="255" y1="230" x2="325" y2="210" />
          </g>

          <circle cx="100" cy="180" r="9" fill="#1e2c1a" stroke="#86efac" strokeWidth="2" />
          <circle cx="100" cy="220" r="9" fill="#1e2c1a" stroke="#86efac" strokeWidth="2" />
          <circle cx="100" cy="260" r="9" fill="#1e2c1a" stroke="#86efac" strokeWidth="2" />

          <circle cx="175" cy="160" r="10" fill="#2b3e25" stroke="#4ade80" strokeWidth="2" />
          <circle cx="175" cy="200" r="10" fill="#2b3e25" stroke="#4ade80" strokeWidth="2" />
          <circle cx="175" cy="240" r="10" fill="#2b3e25" stroke="#4ade80" strokeWidth="2" />

          <circle cx="255" cy="180" r="11" fill="#395232" stroke="#22c55e" strokeWidth="2.2" />
          <circle cx="255" cy="230" r="11" fill="#395232" stroke="#22c55e" strokeWidth="2.2" />

          <circle cx="325" cy="210" r="13" fill="#15803d" stroke="#bbf7d0" strokeWidth="2.5" />
          <circle cx="325" cy="210" r="5" fill="#ffffff" />

          <text x="100" y="285" fill="#86efac" fontSize="7" fontWeight="700" textAnchor="middle">INPUT EMBED</text>
          <text x="175" y="285" fill="#86efac" fontSize="7" fontWeight="700" textAnchor="middle">TRANSFORMER</text>
          <text x="255" y="285" fill="#86efac" fontSize="7" fontWeight="700" textAnchor="middle">ATTENTION</text>
          <text x="325" y="285" fill="#86efac" fontSize="7" fontWeight="700" textAnchor="middle">SYNTHESIS</text>

          <rect x="75" y="320" width="280" height="85" rx="6" fill="url(#aiCard)" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
          <text x="92" y="342" fill="#ffffff" fontSize="9.5" fontWeight="800" letterSpacing="0.8">RAG & VECTOR SEARCH PIPELINE</text>
          <text x="92" y="358" fill="#bbf7d0" fontSize="7.5" fontWeight="500">Vector Embeddings (Pinecone / Chroma) + LangChain Agents</text>
          <text x="92" y="372" fill="#86efac" fontSize="7.5" fontWeight="500">Semantic Context Injection · Few-Shot Prompt Optimization</text>
          <text x="92" y="386" fill="#cbd5e1" fontSize="7" fontFamily="monospace">Latency: 142ms · Precision: 98.4% · Zero-Hallucination Guardrails</text>

          <rect x="75" y="420" width="280" height="52" rx="6" fill="url(#aiCard)" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
          <circle cx="98" cy="446" r="12" fill="#2b3e25" />
          <text x="98" y="450" fill="#86efac" fontSize="9" fontWeight="900" textAnchor="middle">AI</text>
          <text x="120" y="442" fill="#ffffff" fontSize="9.5" fontWeight="800" letterSpacing="0.8">AUTONOMOUS LLM AGENTS</text>
          <text x="120" y="456" fill="#b8cbb0" fontSize="7.5" fontWeight="500">Multi-Agent Collaboration · Tool Calling · Real-time Reasoning</text>
        </g>
      </svg>
    );
  }

  return (
    <svg width="430" height="520" viewBox="0 0 430 520" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sqlConsole" x1="50" y1="80" x2="380" y2="480" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1e2224" />
          <stop offset="0.6" stopColor="#141718" />
          <stop offset="1" stopColor="#0a0c0d" />
        </linearGradient>
        <linearGradient id="dsaCard" x1="70" y1="150" x2="360" y2="460" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.03" />
        </linearGradient>
        <filter id="shadowDSA" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="18" stdDeviation="24" floodColor="#000000" floodOpacity="0.5" />
        </filter>
      </defs>

      <circle cx="215" cy="240" r="170" fill="#d0dede" fillOpacity="0.25" />

      <g filter="url(#shadowDSA)">
        <rect x="55" y="100" width="320" height="420" rx="10" fill="url(#sqlConsole)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />

        <rect x="55" y="100" width="320" height="34" rx="10" fill="#2c3336" />
        <circle cx="75" cy="117" r="4.5" fill="#ef4444" />
        <circle cx="90" cy="117" r="4.5" fill="#f59e0b" />
        <circle cx="105" cy="117" r="4.5" fill="#10b981" />
        <text x="215" y="121" fill="#d2dede" fontSize="8" fontWeight="700" letterSpacing="1.5" textAnchor="middle" fontFamily="monospace">
          DSA_SQL_OPTIMIZER.ENGINE
        </text>

        <g stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1.5">
          <line x1="215" y1="165" x2="155" y2="205" />
          <line x1="215" y1="165" x2="275" y2="205" />
          <line x1="155" y1="205" x2="115" y2="245" />
          <line x1="155" y1="205" x2="195" y2="245" />
          <line x1="275" y1="205" x2="240" y2="245" />
          <line x1="275" y1="205" x2="315" y2="245" />
        </g>

        <circle cx="215" cy="165" r="13" fill="#384347" stroke="#ffffff" strokeWidth="2" />
        <text x="215" y="169" fill="#ffffff" fontSize="9" fontWeight="900" textAnchor="middle" fontFamily="monospace">42</text>

        <circle cx="155" cy="205" r="11" fill="#2b3438" stroke="#93c5fd" strokeWidth="1.8" />
        <text x="155" y="209" fill="#93c5fd" fontSize="8" fontWeight="900" textAnchor="middle" fontFamily="monospace">21</text>

        <circle cx="275" cy="205" r="11" fill="#2b3438" stroke="#93c5fd" strokeWidth="1.8" />
        <text x="275" y="209" fill="#93c5fd" fontSize="8" fontWeight="900" textAnchor="middle" fontFamily="monospace">68</text>

        <circle cx="115" cy="245" r="9" fill="#1e2427" stroke="#cbd5e1" strokeWidth="1.5" />
        <text x="115" y="248" fill="#cbd5e1" fontSize="7" fontWeight="800" textAnchor="middle" fontFamily="monospace">14</text>

        <circle cx="195" cy="245" r="9" fill="#1e2427" stroke="#cbd5e1" strokeWidth="1.5" />
        <text x="195" y="248" fill="#cbd5e1" fontSize="7" fontWeight="800" textAnchor="middle" fontFamily="monospace">35</text>

        <circle cx="240" cy="245" r="9" fill="#1e2427" stroke="#cbd5e1" strokeWidth="1.5" />
        <text x="240" y="248" fill="#cbd5e1" fontSize="7" fontWeight="800" textAnchor="middle" fontFamily="monospace">53</text>

        <circle cx="315" cy="245" r="9" fill="#1e2427" stroke="#cbd5e1" strokeWidth="1.5" />
        <text x="315" y="248" fill="#cbd5e1" fontSize="7" fontWeight="800" textAnchor="middle" fontFamily="monospace">89</text>

        <rect x="150" y="270" width="130" height="20" rx="10" fill="rgba(147, 197, 253, 0.15)" stroke="#93c5fd" strokeWidth="1" />
        <text x="215" y="283" fill="#93c5fd" fontSize="7.5" fontWeight="800" letterSpacing="1" textAnchor="middle">
          BALANCED B-TREE · O(log n)
        </text>

        <rect x="75" y="305" width="280" height="100" rx="6" fill="url(#dsaCard)" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
        <text x="92" y="325" fill="#ffffff" fontSize="9.5" fontWeight="800" letterSpacing="0.8">RELATIONAL DATABASE & SQL TUNING</text>
        <g fontFamily="monospace" fontSize="7.5" fill="#e2e8f0">
          <text x="92" y="344">
            <tspan fill="#38bdf8">SELECT </tspan>
            <tspan fill="#ffffff">u.id, u.name, </tspan>
            <tspan fill="#4ade80">COUNT</tspan>
            <tspan fill="#ffffff">(p.id) </tspan>
            <tspan fill="#38bdf8">AS </tspan>
            <tspan fill="#fef08a">total_skills</tspan>
          </text>
          <text x="92" y="358">
            <tspan fill="#38bdf8">FROM </tspan>
            <tspan fill="#ffffff">developers u </tspan>
            <tspan fill="#38bdf8">INNER JOIN </tspan>
            <tspan fill="#ffffff">projects p </tspan>
            <tspan fill="#38bdf8">ON </tspan>
            <tspan fill="#ffffff">u.id = p.dev_id</tspan>
          </text>
          <text x="92" y="372">
            <tspan fill="#38bdf8">WHERE </tspan>
            <tspan fill="#ffffff">u.name = </tspan>
            <tspan fill="#86efac">'Ijji Madhu Venkat' </tspan>
            <tspan fill="#38bdf8">GROUP BY </tspan>
            <tspan fill="#ffffff">u.id;</tspan>
          </text>
          <text x="92" y="390" fill="#a7f3d0">-- EXPLAIN ANALYZE: Index Scan using idx_dev (Cost: 0.04ms)</text>
        </g>

        <rect x="75" y="420" width="280" height="52" rx="6" fill="url(#dsaCard)" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
        <circle cx="98" cy="446" r="12" fill="#2c363a" />
        <text x="98" y="450" fill="#93c5fd" fontSize="8" fontWeight="900" textAnchor="middle">SQL</text>
        <text x="120" y="442" fill="#ffffff" fontSize="9.5" fontWeight="800" letterSpacing="0.8">DATA INTEGRITY & ACID ENGINE</text>
        <text x="120" y="456" fill="#cbd5e1" fontSize="7.5" fontWeight="500">PostgreSQL · Transaction Isolation · Deadlock Prevention</text>
      </g>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Thumbnail Swatch Graphic (46x67 for 158x85 card)
// ---------------------------------------------------------------------------
function TechSwatchGraphic({ id }) {
  if (id === 'brown') {
    return (
      <svg width="46" height="67" viewBox="0 0 46 67" fill="none" style={{ position: 'absolute', inset: 0 }}>
        <rect width="46" height="67" fill="#8a837a" />
        <rect x="6" y="8" width="34" height="20" rx="2" fill="rgba(0,0,0,0.3)" />
        <line x1="10" y1="14" x2="26" y2="14" stroke="#ffffff" strokeWidth="1.5" />
        <line x1="10" y1="20" x2="32" y2="20" stroke="#f2efe6" strokeWidth="1.5" strokeOpacity="0.7" />
        <rect x="6" y="34" width="34" height="24" rx="2" fill="rgba(255,255,255,0.2)" />
        <text x="23" y="49" fill="#111" fontSize="7" fontWeight="900" textAnchor="middle">STACK</text>
      </svg>
    );
  }

  if (id === 'green') {
    return (
      <svg width="46" height="67" viewBox="0 0 46 67" fill="none" style={{ position: 'absolute', inset: 0 }}>
        <rect width="46" height="67" fill="#788967" />
        <circle cx="23" cy="22" r="10" fill="rgba(255,255,255,0.25)" />
        <circle cx="23" cy="22" r="4" fill="#ffffff" />
        <line x1="12" y1="36" x2="34" y2="36" stroke="#ffffff" strokeWidth="1.5" />
        <line x1="15" y1="42" x2="31" y2="42" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" />
        <text x="23" y="58" fill="#111" fontSize="7" fontWeight="900" textAnchor="middle">GENAI</text>
      </svg>
    );
  }

  return (
    <svg width="46" height="67" viewBox="0 0 46 67" fill="none" style={{ position: 'absolute', inset: 0 }}>
      <rect width="46" height="67" fill="#bac0c0" />
      <circle cx="23" cy="14" r="5" fill="#111" />
      <line x1="23" y1="19" x2="14" y2="28" stroke="#111" strokeWidth="1.5" />
      <line x1="23" y1="19" x2="32" y2="28" stroke="#111" strokeWidth="1.5" />
      <circle cx="14" cy="28" r="4" fill="#333" />
      <circle cx="32" cy="28" r="4" fill="#333" />
      <rect x="8" y="38" width="30" height="20" rx="2" fill="rgba(0,0,0,0.25)" />
      <text x="23" y="51" fill="#fff" fontSize="6.5" fontWeight="900" textAnchor="middle">SQL/DSA</text>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Mini Preview Graphic in Sidebar Thumbnail (160x248)
// ---------------------------------------------------------------------------
function MiniTechPreviewSvg({ id }) {
  if (id === 'brown') {
    return (
      <svg width="110" height="130" viewBox="0 0 110 130" fill="none">
        <rect x="10" y="20" width="90" height="90" rx="6" fill="#241e19" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        <rect x="10" y="20" width="90" height="18" rx="6" fill="#382e25" />
        <circle cx="22" cy="29" r="3" fill="#ef4444" />
        <circle cx="31" cy="29" r="3" fill="#f59e0b" />
        <circle cx="40" cy="29" r="3" fill="#10b981" />
        <line x1="20" y1="52" x2="60" y2="52" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="20" y1="64" x2="85" y2="64" stroke="#e8dcd0" strokeWidth="2" strokeLinecap="round" />
        <line x1="20" y1="76" x2="70" y2="76" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
        <line x1="20" y1="88" x2="50" y2="88" stroke="#86efac" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (id === 'green') {
    return (
      <svg width="110" height="130" viewBox="0 0 110 130" fill="none">
        <circle cx="55" cy="65" r="45" fill="rgba(0,0,0,0.2)" />
        <circle cx="55" cy="40" r="10" fill="#2d4224" stroke="#86efac" strokeWidth="2" />
        <circle cx="35" cy="80" r="10" fill="#2d4224" stroke="#86efac" strokeWidth="2" />
        <circle cx="75" cy="80" r="10" fill="#2d4224" stroke="#86efac" strokeWidth="2" />
        <line x1="55" y1="50" x2="35" y2="70" stroke="#86efac" strokeWidth="1.8" />
        <line x1="55" y1="50" x2="75" y2="70" stroke="#86efac" strokeWidth="1.8" />
        <line x1="45" y1="80" x2="65" y2="80" stroke="#86efac" strokeWidth="1.8" />
        <circle cx="55" cy="65" r="5" fill="#ffffff" />
      </svg>
    );
  }

  return (
    <svg width="110" height="130" viewBox="0 0 110 130" fill="none">
      <circle cx="55" cy="35" r="10" fill="#273336" stroke="#ffffff" strokeWidth="2" />
      <text x="55" y="39" fill="#fff" fontSize="8" fontWeight="bold" textAnchor="middle">ROOT</text>
      <line x1="55" y1="45" x2="35" y2="75" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
      <line x1="55" y1="45" x2="75" y2="75" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
      <circle cx="35" cy="75" r="8" fill="#1b2426" stroke="#93c5fd" strokeWidth="1.8" />
      <circle cx="75" cy="75" r="8" fill="#1b2426" stroke="#93c5fd" strokeWidth="1.8" />
      <rect x="25" y="96" width="60" height="18" rx="3" fill="#2c3639" />
      <text x="55" y="108" fill="#93c5fd" fontSize="7" fontWeight="bold" textAnchor="middle">SQL INDEX</text>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Project / Tech Icons for 105x150 Cards
// ---------------------------------------------------------------------------
function ProjectTechIcon({ icon, color }) {
  switch (icon) {
    case 'code':
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case 'server':
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
          <line x1="6" y1="6" x2="6.01" y2="6" />
          <line x1="6" y1="18" x2="6.01" y2="18" />
        </svg>
      );
    case 'cloud':
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        </svg>
      );
    case 'neural':
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="12" r="3" />
          <line x1="8.5" y1="7.5" x2="15.5" y2="10.5" />
          <line x1="8.5" y1="16.5" x2="15.5" y2="13.5" />
        </svg>
      );
    case 'vector':
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      );
    case 'brain':
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a4 4 0 0 0-4 4c0 .74.2 1.43.56 2.03A5 5 0 0 0 5 13a5 5 0 0 0 3 4.58V20a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.42A5 5 0 0 0 19 13a5 5 0 0 0-3.56-4.97A4 4 0 0 0 12 2z" />
        </svg>
      );
    case 'tree':
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="5" r="3" />
          <circle cx="6" cy="19" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="12" y1="8" x2="6" y2="16" />
          <line x1="12" y1="8" x2="18" y2="16" />
        </svg>
      );
    case 'database':
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      );
    case 'speed':
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      );
    default:
      return null;
  }
}
