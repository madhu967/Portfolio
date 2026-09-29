"use client";
import React, { useEffect, useRef, useState } from "react";

const DURATION_MS = 1250;
const EASE = "cubic-bezier(0.65, 0, 0.35, 1)";
const STAGGER_MAX = 110;

const SIZES = {
  music: 325, appicon: 100, cd: 400, cursor: 125, dialog: 300,
  folder: 150, lighter: 225, macmini: 250, paper: 375,
  passport: 250, portrait: 375,
};

const HEADER = {
  scatter: { x: 50, y: 47.5, center: true },
  align:   { x: 70, y: 37.5, center: false },
  cluster: { x: 50, y: 47.5, center: true },
};

const ARRANGEMENTS = {
  scatter: [
    { id: "music",    x: -2.5, y: -2.5, rotation: -15 },
    { id: "appicon",  x: 20,   y: 15,   rotation: 5 },
    { id: "cd",       x: 72.5, y: 5,    rotation: 0 },
    { id: "cursor",   x: 72.5, y: 75,   rotation: 0 },
    { id: "dialog",   x: 80,   y: 60,   rotation: 15 },
    { id: "folder",   x: 90,   y: 50,   rotation: 5 },
    { id: "lighter",  x: 2.5,  y: 45,   rotation: -10 },
    { id: "macmini",  x: 9.5,  y: 55,   rotation: 15 },
    { id: "paper",    x: 5,    y: 15,   rotation: 10 },
    { id: "passport", x: -2.5, y: 65,   rotation: -35 },
    { id: "portrait", x: 65,   y: 20,   rotation: -5 },
  ],
  align: [
    { id: "music",    x: 76.5, y: -5,   rotation: 0 },
    { id: "appicon",  x: 64.5, y: 6,    rotation: 0 },
    { id: "cd",       x: 0,    y: 47.5, rotation: 0 },
    { id: "cursor",   x: 63.5, y: 23,   rotation: 0 },
    { id: "dialog",   x: 34.5, y: 59,   rotation: 0 },
    { id: "folder",   x: 24.5, y: 33,   rotation: 0 },
    { id: "lighter",  x: -6,   y: 3.5,  rotation: 0 },
    { id: "macmini",  x: 82.5, y: 66,   rotation: 0 },
    { id: "paper",    x: 9,    y: -3.5, rotation: 0 },
    { id: "passport", x: 60,   y: 65.5, rotation: 0 },
    { id: "portrait", x: 36.5, y: 5.5,  rotation: 0 },
  ],
  cluster: [
    { id: "music",    x: 45,   y: 0.5,  rotation: 20 },
    { id: "appicon",  x: 65,   y: 70,   rotation: 25 },
    { id: "cd",       x: 27.5, y: 15,   rotation: 10 },
    { id: "cursor",   x: 75,   y: 35,   rotation: 0 },
    { id: "dialog",   x: 30,   y: 57.5, rotation: 10 },
    { id: "folder",   x: 25,   y: 40,   rotation: 10 },
    { id: "lighter",  x: 30,   y: 7.5,  rotation: 30 },
    { id: "macmini",  x: 50,   y: 50,   rotation: -5 },
    { id: "paper",    x: 10,   y: 10,   rotation: -30 },
    { id: "passport", x: 16.5, y: 50,   rotation: -20 },
    { id: "portrait", x: 57.5, y: 20,   rotation: 10 },
  ],
};

const MODES = [
  { key: "scatter", label: "Scatter", glyph: "✦" },
  { key: "align",   label: "Align",   glyph: "▦" },
  { key: "cluster", label: "Cluster", glyph: "❖" },
];

const MOBILE_HEADER = {
  scatter: { x: 50, y: 48, center: true },
  align:   { x: 50, y: 48, center: true },
  cluster: { x: 50, y: 40, center: true },
};

// NOTE: On mobile, x and y represent the CENTER of the object (to safely handle scale() scaling from center)
const MOBILE_ARRANGEMENTS = {
  scatter: [
    { id: "music",    x: 15, y: 10,  rotation: -15 },
    { id: "appicon",  x: 85, y: 12,  rotation: 15 },
    { id: "cd",       x: 12, y: 25,  rotation: 12 },
    { id: "cursor",   x: 88, y: 28,  rotation: -25 },
    { id: "dialog",   x: 18, y: 70,  rotation: -8 },
    { id: "folder",   x: 82, y: 62,  rotation: 12 },
    { id: "lighter",  x: 86, y: 76,  rotation: 25 },
    { id: "macmini",  x: 10, y: 82,  rotation: -10 },
    { id: "paper",    x: 15, y: 92,  rotation: 5 },
    { id: "passport", x: 85, y: 88,  rotation: -15 },
    { id: "portrait", x: 80, y: 8,   rotation: 10 },
  ],
  align: [
    { id: "music",    x: 15, y: 12,  rotation: 0 },
    { id: "appicon",  x: 85, y: 8,   rotation: 0 },
    { id: "cd",       x: 15, y: 26,  rotation: 0 },
    { id: "cursor",   x: 85, y: 18,  rotation: 0 },
    { id: "dialog",   x: 15, y: 70,  rotation: 0 },
    { id: "folder",   x: 85, y: 28,  rotation: 0 },
    { id: "lighter",  x: 85, y: 70,  rotation: 0 },
    { id: "macmini",  x: 15, y: 82,  rotation: 0 },
    { id: "paper",    x: 15, y: 94,  rotation: 0 },
    { id: "passport", x: 85, y: 82,  rotation: 0 },
    { id: "portrait", x: 85, y: 94,  rotation: 0 },
  ],
  cluster: [
    { id: "music",    x: 25, y: 88,  rotation: -10 },
    { id: "appicon",  x: 75, y: 90,  rotation: 15 },
    { id: "cd",       x: 35, y: 85,  rotation: 5 },
    { id: "cursor",   x: 65, y: 92,  rotation: -5 },
    { id: "dialog",   x: 45, y: 89,  rotation: -8 },
    { id: "folder",   x: 55, y: 87,  rotation: 12 },
    { id: "lighter",  x: 80, y: 86,  rotation: -20 },
    { id: "macmini",  x: 20, y: 93,  rotation: 5 },
    { id: "paper",    x: 50, y: 94,  rotation: -12 },
    { id: "passport", x: 60, y: 85,  rotation: 18 },
    { id: "portrait", x: 40, y: 91,  rotation: -4 },
  ],
};

function ItemArt({ id }) {
  switch (id) {
    case "music":
      return (
        <div className="dd-art dd-music">
          <div className="dd-music-bars">{[10,18,8,22,14,26,12,20,9,16].map((h,i)=>(<span key={i} style={{height:`${h*3}%`}}/>))}</div>
          <div className="dd-music-row"><span className="dd-play">▶</span><span className="dd-music-meta">Studio Mix · 04:12</span></div>
        </div>
      );
    case "appicon":
      return <div className="dd-art dd-appicon">K</div>;
    case "cd":
      return <div className="dd-art dd-cd"><span className="dd-cd-hole" /></div>;
    case "cursor":
      return (
        <div className="dd-art dd-cursor">
          <svg viewBox="0 0 24 24"><path d="M4 2 L4 20 L9 15 L13 22 L16 20 L12 13 L19 13 Z" /></svg>
        </div>
      );
    case "dialog":
      return (
        <div className="dd-art dd-dialog">
          <div className="dd-dialog-bar"><i/><i/><i/></div>
          <div className="dd-dialog-body" style={{ padding: '24px', fontFamily: 'monospace', fontSize: '15px', color: '#171717', display: 'flex', flexDirection: 'column', gap: '8px', background: '#fff', justifyContent: 'center' }}>
            <div style={{ color: '#2563eb', fontWeight: 'bold' }}>const developer = {'{'}</div>
            <div style={{ paddingLeft: '20px' }}>name: <span style={{ color: '#059669' }}>"Ijji Madhu Venkat"</span>,</div>
            <div style={{ paddingLeft: '20px' }}>role: <span style={{ color: '#059669' }}>"MERN Developer"</span>,</div>
            <div style={{ paddingLeft: '20px' }}>skills: [<span style={{ color: '#d97706' }}>"DSA"</span>, <span style={{ color: '#d97706' }}>"SQL"</span>]</div>
            <div style={{ color: '#2563eb', fontWeight: 'bold' }}>{'}'}</div>
          </div>
        </div>
      );
    case "folder":
      return <div className="dd-art dd-folder"><span className="dd-folder-tab" /></div>;
    case "lighter":
      return <div className="dd-art dd-lighter"><span className="dd-lighter-cap" /></div>;
    case "macmini":
      return <div className="dd-art dd-macmini"><span className="dd-macmini-dot" /></div>;
    case "paper":
      return (
        <div className="dd-art dd-paper" style={{ padding: '36px', textAlign: 'left', color: '#171717', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ margin: '0', fontSize: '28px', fontFamily: "'Spectral', serif", fontWeight: 'normal', letterSpacing: '0.02em', lineHeight: '1' }}>Ijji Madhu Venkat</h3>
          <div style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#555', fontWeight: 'bold', marginBottom: '4px' }}>Software Engineer</div>
          
          <div style={{ fontSize: '14.5px', lineHeight: '1.6', color: '#444' }}>
            Passionate about building scalable web applications and solving complex logic problems.
          </div>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: 'auto' }}>
            {['MERN', 'DSA', 'SQL'].map(skill => (
              <span key={skill} style={{ background: '#f4f1ea', padding: '6px 12px', borderRadius: '4px', fontSize: '13px', fontWeight: '600', border: '1px solid #e0dfd7' }}>{skill}</span>
            ))}
          </div>
        </div>
      );
    case "passport":
      return (
        <div className="dd-art dd-passport" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '12px', letterSpacing: '0.12em', fontWeight: '600', textAlign: 'center', lineHeight: '1.4' }}>IJJI MADHU<br/>VENKAT</div>
          <div className="dd-passport-chip" />
          <div style={{ fontSize: '11px', letterSpacing: '0.08em', fontWeight: 'bold', textAlign: 'center', opacity: 0.9 }}>MERN DEVELOPER<br/>&bull; DSA &bull; SQL &bull;</div>
        </div>
      );
    case "portrait":
      return (
        <div className="dd-art dd-portrait" style={{ display: 'flex', flexDirection: 'column' }}>
          <span className="dd-portrait-face" />
          <div style={{ marginTop: '16px', textAlign: 'center', fontFamily: "'Spectral', serif", fontSize: '22px', color: '#171717', letterSpacing: '0.05em' }}>
            Vision & Code
          </div>
        </div>
      );
    default:
      return <div className="dd-art" />;
  }
}

export default function DriftHero() {
  const deskRef = useRef(null);
  const headerRef = useRef(null);
  const alive = useRef(true);
  const modeRef = useRef("scatter");
  const apply = useRef(() => {});
  const [activeMode, setActiveMode] = useState("scatter");

  useEffect(() => {
    const desk = deskRef.current;
    const header = headerRef.current;
    const isCard = new URLSearchParams(location.search).has("card");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    alive.current = true;
    const itemEls = Array.from(desk.querySelectorAll(".dd-item"));

    const mid = (itemEls.length - 1) / 2;
    const maxDist = mid || 1;
    const delays = itemEls.map((_, i) => (Math.abs(i - mid) / maxDist) * STAGGER_MAX);

    function setLayout(mode, animate) {
      const w = desk.offsetWidth;
      const h = desk.offsetHeight;
      const isMobile = w <= 760;
      let scaleFactor = 1;
      if (w <= 760) scaleFactor = 0.35;
      else if (w <= 1024) scaleFactor = 0.75;

      const layout = isMobile ? MOBILE_ARRANGEMENTS[mode] : ARRANGEMENTS[mode];
      const hc = isMobile ? MOBILE_HEADER[mode] : HEADER[mode];

      const offX = hc.center ? header.offsetWidth / 2 : 0;
      const offY = hc.center ? header.offsetHeight / 2 : 0;

      const place = (el, tx, ty, rot, delay, scaleStr = "") => {
        el.style.transition = animate ? `transform ${DURATION_MS}ms ${EASE} ${delay}ms` : "none";
        el.style.transform = `translate(${tx}px, ${ty}px) ${scaleStr} rotate(${rot}deg)`;
      };

      place(header, (hc.x / 100) * w - offX, (hc.y / 100) * h - offY, 0, animate ? STAGGER_MAX : 0);

      layout.forEach((spot) => {
        const el = desk.querySelector(`#dd-${spot.id}`);
        if (!el) return;
        const idx = itemEls.indexOf(el);
        
        let tx, ty;
        if (isMobile) {
          // On mobile, the coordinates represent the exact CENTER of the object
          tx = (spot.x / 100) * w - el.offsetWidth / 2;
          ty = (spot.y / 100) * h - el.offsetHeight / 2;
        } else {
          // On desktop, the original code placed the TOP-LEFT of the object at the coordinate
          tx = (spot.x / 100) * w;
          ty = (spot.y / 100) * h;
        }
        
        place(el, tx, ty, spot.rotation, delays[idx] ?? 0, `scale(${scaleFactor})`);
      });
    }

    apply.current = (mode) => {
      if (mode === modeRef.current) return;
      setLayout(mode, !reduced);
      modeRef.current = mode;
      setActiveMode(mode);
    };

    setLayout("scatter", false);

    let rt;
    const onResize = () => {
      clearTimeout(rt);
      rt = setTimeout(() => setLayout(modeRef.current, false), 120);
    };
    window.addEventListener("resize", onResize);

    let cardTimer;
    if (isCard && !reduced) {
      const order = ["align", "cluster", "scatter"];
      let i = 0;
      const loop = () => {
        if (!alive.current) return;
        apply.current(order[i % order.length]);
        i++;
        cardTimer = setTimeout(loop, DURATION_MS + 1100);
      };
      cardTimer = setTimeout(loop, 1100);
    }

    return () => {
      alive.current = false;
      window.removeEventListener("resize", onResize);
      clearTimeout(rt);
      clearTimeout(cardTimer);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500&display=swap');

        .dd-root {
          position:relative; width:100%; height:calc(100svh + 90px); overflow:hidden;
          background:#f4f1ea; color:#171717; font-family:'DM Sans',sans-serif;
        }
        .dd-desk { position:relative; width:100%; height:100svh; max-width:1400px; margin:0 auto; }

        .dd-header {
          position:absolute; top:0; left:0; width:400px;
          text-align:center; display:flex; flex-direction:column; gap:.75rem;
          pointer-events:none; z-index:10; will-change:transform;
        }
        .dd-header h1 {
          font-family:'Instrument Serif',serif; font-size:4rem;
          font-weight:400; letter-spacing:-.02rem; line-height:1;
          margin: 0;
        }
        .dd-header p { font-size:.95rem; line-height:1.75; color:#5f5f5f; margin: 0; }

        .dd-item { position:absolute; top:0; left:0; will-change:transform; }
        .dd-art {
          width:100%; height:100%; border-radius:14px; overflow:hidden;
          box-shadow:0 18px 40px -18px rgba(0,0,0,.35);
        }

        #dd-music{width:238px;height:238px}
        #dd-appicon{width:74px;height:74px}
        #dd-cd{width:292px;height:292px}
        #dd-cursor{width:92px;height:92px}
        #dd-dialog{width:220px;height:220px}
        #dd-folder{width:110px;height:110px}
        #dd-lighter{width:165px;height:165px}
        #dd-macmini{width:184px;height:184px}
        #dd-paper{width:274px;height:274px}
        #dd-passport{width:184px;height:184px}
        #dd-portrait{width:274px;height:274px}

        .dd-music{background:linear-gradient(150deg,#1e1b4b,#4338ca);padding:26px;display:flex;flex-direction:column;justify-content:space-between}
        .dd-music-bars{display:flex;align-items:flex-end;gap:6px;height:55%}
        .dd-music-bars span{flex:1;background:#a5b4fc;border-radius:3px}
        .dd-music-row{display:flex;align-items:center;gap:12px;color:#e0e7ff}
        .dd-play{width:38px;height:38px;border-radius:50%;background:#818cf8;color:#1e1b4b;display:flex;align-items:center;justify-content:center;font-size:14px}
        .dd-music-meta{font-size:13px;letter-spacing:.02em}

        .dd-appicon{background:linear-gradient(135deg,#ff5a3c,#f5b301);display:flex;align-items:center;justify-content:center;font-family:'Instrument Serif',serif;font-size:54px;color:#fff;border-radius:22px}

        .dd-cd{border-radius:50%;background:conic-gradient(from 0deg,#22d3ee,#a78bfa,#f472b6,#fde047,#22d3ee);display:flex;align-items:center;justify-content:center}
        .dd-cd-hole{width:24%;height:24%;border-radius:50%;background:#f4f1ea;box-shadow:inset 0 0 0 14px rgba(255,255,255,.55)}

        .dd-cursor{background:none;box-shadow:none;display:flex;align-items:center;justify-content:center}
        .dd-cursor svg{width:70%;height:70%;fill:#171717;stroke:#fff;stroke-width:1.2;filter:drop-shadow(0 6px 10px rgba(0,0,0,.3))}

        .dd-dialog{background:#fff;display:flex;flex-direction:column}
        .dd-dialog-bar{height:42px;background:#ececec;display:flex;align-items:center;gap:8px;padding:0 16px}
        .dd-dialog-bar i{width:12px;height:12px;border-radius:50%}
        .dd-dialog-bar i:nth-child(1){background:#ff5f57}
        .dd-dialog-bar i:nth-child(2){background:#febc2e}
        .dd-dialog-bar i:nth-child(3){background:#28c840}
        .dd-dialog-body{flex:1;padding:24px;display:flex;flex-direction:column;justify-content:center;gap:16px}
        .dd-dialog-body span{height:14px;border-radius:7px;background:#e6e6e6}
        .dd-dialog-body span:nth-child(1){width:80%}
        .dd-dialog-body span:nth-child(2){width:55%}
        .dd-dialog-body span:nth-child(3){width:68%;background:#2563eb}

        .dd-folder{background:linear-gradient(160deg,#f5b301,#f59e0b);border-radius:8px 14px 14px 14px;position:relative}
        .dd-folder-tab{position:absolute;top:-12px;left:14px;width:45%;height:24px;background:#f5b301;border-radius:8px 8px 0 0}

        .dd-lighter{background:linear-gradient(180deg,#ec4899,#be185d);border-radius:60px;position:relative;display:flex;justify-content:center}
        .dd-lighter-cap{position:absolute;top:0;width:42%;height:22%;background:#9d174d;border-radius:60px 60px 8px 8px}

        .dd-macmini{background:linear-gradient(160deg,#d4d4d8,#a1a1aa);border-radius:20px;display:flex;align-items:center;justify-content:center}
        .dd-macmini-dot{width:14px;height:14px;border-radius:50%;background:#34d399;box-shadow:0 0 12px #34d399}

        .dd-paper{background:#fff;padding:40px;display:flex;flex-direction:column;gap:16px}
        .dd-paper span{height:13px;border-radius:6px;background:#e4e4e7}
        .dd-paper span:first-child{height:22px;background:#171717}

        .dd-passport{background:linear-gradient(150deg,#0ea5a4,#0f766e);padding:24px;display:flex;flex-direction:column;justify-content:space-between;color:#ccfbf1}
        .dd-passport-top{font-size:13px;letter-spacing:.18em;font-weight:500}
        .dd-passport-chip{width:46px;height:34px;border-radius:6px;background:linear-gradient(135deg,#fde047,#facc15)}

        .dd-portrait{background:#fff;padding:18px 18px 46px}
        .dd-portrait-face{display:block;width:100%;height:78%;border-radius:6px;background:radial-gradient(circle at 50% 38%,#fca5a5,#7c3aed)}

        .dd-modes {
          position:absolute; bottom:7.5svh; left:50%; transform:translateX(-50%);
          display:flex; gap:.5rem; z-index:20;
        }
        .dd-modes button {
          height:3rem; padding:0 1.1rem; font-size:.9rem; font-weight:500;
          color:#5f5f5f; background:#f4f1ea; border:1px solid #e0dfd7;
          border-radius:.6rem; display:flex; align-items:center; gap:.5rem;
          cursor:pointer; transition:all .4s ease; font-family:'DM Sans',sans-serif;
        }
        .dd-modes button:active { transform:scale(.92); }
        .dd-modes button.active { background:#e0dfd7; color:#171717; }
        .dd-glyph { font-size:1rem; }

        .dd-hero-btns {
          display: flex; gap: 1rem; justify-content: center; margin-top: 0.5rem; pointer-events: auto;
        }
        .dd-hero-btn {
          height: 2.8rem; padding: 0 1.5rem; font-size: 0.95rem; font-weight: 500;
          border-radius: 0.6rem; cursor: pointer; transition: all 0.4s ease; font-family: 'DM Sans', sans-serif;
          display: flex; align-items: center; justify-content: center; text-decoration: none;
        }
        .dd-hero-btn:active { transform: scale(0.92); }
        .dd-hero-btn.view-cv {
          background: #f4f1ea; color: #171717; border: 1px solid #e0dfd7;
        }
        .dd-hero-btn.view-cv:hover {
          background: #e0dfd7;
        }
        .dd-hero-btn.download-cv {
          background: #171717; color: #f4f1ea; border: 1px solid #171717;
        }
        .dd-hero-btn.download-cv:hover {
          background: #333;
        }

        .dd-marquee-wrapper {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 90px;
          overflow: hidden;
          z-index: 10;
          pointer-events: none;
        }
        
        .dd-marquee-back {
          position: absolute;
          top: 50%;
          left: -5%;
          width: 110%;
          height: 48px;
          background: #ffffff;
          border-top: 2px solid #171717;
          border-bottom: 2px solid #171717;
          transform: translateY(-50%) rotate(-2deg);
        }
        
        .dd-marquee-front {
          position: absolute;
          top: 50%;
          left: 0;
          width: 100%;
          height: 48px;
          background: #171717;
          color: #f4f1ea;
          font-weight: 600;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          transform: translateY(-50%);
          border-top: 2px solid #171717;
          border-bottom: 2px solid #171717;
        }
        
        .dd-marquee-content {
          display: flex;
          gap: 2rem;
          animation: marquee 20s linear infinite;
          white-space: nowrap;
        }
        
        .dd-marquee-item {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        
        .dd-marquee-item span {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @media (max-width:1400px){ .dd-desk{overflow-x:hidden} }
        @media (max-width:760px){
          .dd-header{width:300px}
          .dd-header h1{font-size:2.6rem}
          .dd-modes { bottom: 4svh; }
          .dd-modes button { padding: 0 0.6rem; font-size: 0.75rem; height: 2.6rem; border-radius: 0.5rem; gap: 0.3rem; }
          .dd-glyph { font-size: 0.85rem; }
          .dd-marquee-wrapper { height: 60px; }
          .dd-marquee-front, .dd-marquee-back { height: 36px; font-size: 0.85rem; }
          .dd-marquee-item > span > span { font-size: 1rem !important; }
        }
      `}</style>

      <div className="dd-root">
        <div className="dd-desk" ref={deskRef}>
          <div className="dd-header" ref={headerRef}>
            <h1>Ijji Madhu<br />Venkat</h1>
            <p>Software Engineer crafting scalable web applications and seamless user experiences. Passionate about MERN stack, DSA, and clean code.</p>
            <div className="dd-hero-btns">
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="dd-hero-btn view-cv">View CV</a>
              <a href="/resume.pdf" download="Ijji_Madhu_Venkat_Resume.pdf" className="dd-hero-btn download-cv">Download CV</a>
            </div>
          </div>

          {Object.keys(SIZES).map((id) => (
            <div className="dd-item" id={`dd-${id}`} key={id}>
              <ItemArt id={id} />
            </div>
          ))}

          <div className="dd-modes">
            {MODES.map((m) => (
              <button
                key={m.key}
                className={activeMode === m.key ? "active" : ""}
                onClick={() => apply.current(m.key)}
              >
                <span className="dd-glyph">{m.glyph}</span>
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <div className="dd-marquee-wrapper">
          <div className="dd-marquee-back"></div>
          <div className="dd-marquee-front">
            <div className="dd-marquee-content">
              {[...Array(4)].map((_, i) => (
                <div className="dd-marquee-item" key={i}>
                  <span>App Design <span style={{fontSize: '1.25rem', fontWeight: 400}}>✺</span> Website Design <span style={{fontSize: '1.25rem', fontWeight: 400}}>✺</span> Dashboard <span style={{fontSize: '1.25rem', fontWeight: 400}}>✺</span> Wireframe <span style={{fontSize: '1.25rem', fontWeight: 400}}>✺</span></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
