"use client";

import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import githubData from "./data/github.json";

// Rich, high-density green palette from Less to More (darker, bold contrast across all levels)
const GITHUB_GREENS = ["#c6cbd1", "#3fb950", "#238636", "#196c2e", "#0d441f"];
const GLOW_GREEN = "#2dba4e";
const NEON_GREEN = "#39d353";
const BEST_DAY_COLOR = "#ea580c"; // Editorial orange highlight

// Easing functions
function clamp(v, min = 0, max = 1) {
  return Math.max(min, Math.min(max, v));
}

function easeOutCubic(x) {
  return 1 - Math.pow(1 - x, 3);
}

function easeBack(x) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

function mixColor(c1, c2, p) {
  // Simple hex mixer
  const r1 = parseInt(c1.slice(1, 3), 16);
  const g1 = parseInt(c1.slice(3, 5), 16);
  const b1 = parseInt(c1.slice(5, 7), 16);

  const r2 = parseInt(c2.slice(1, 3), 16);
  const g2 = parseInt(c2.slice(3, 5), 16);
  const b2 = parseInt(c2.slice(5, 7), 16);

  const r = Math.round(r1 + (r2 - r1) * p);
  const g = Math.round(g1 + (g2 - g1) * p);
  const b = Math.round(b1 + (b2 - b1) * p);

  return `rgb(${r}, ${g}, ${b})`;
}

// Convert date index to string Date
function getDateForIndex(startDateStr, index) {
  const d = new Date(startDateStr);
  d.setDate(d.getDate() + index);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function GithubAnimatedGraph() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const scrollRef = useRef(null);

  const [activeTab, setActiveTab] = useState("grid"); // "grid", "skyline", "ring"
  const [isPlaying, setIsPlaying] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [currentTotal, setCurrentTotal] = useState(0);
  const [tooltip, setTooltip] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Auto-scroll to the right (most recent activity first) on mobile / narrow viewports
  useEffect(() => {
    const scrollToRight = () => {
      if (scrollRef.current && activeTab !== "ring") {
        const el = scrollRef.current;
        el.scrollLeft = el.scrollWidth - el.clientWidth;
      }
    };
    scrollToRight();
    const t1 = setTimeout(scrollToRight, 30);
    const t2 = setTimeout(scrollToRight, 120);
    const t3 = setTimeout(scrollToRight, 350);
    const t4 = setTimeout(scrollToRight, 700);
    window.addEventListener("resize", scrollToRight);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      window.removeEventListener("resize", scrollToRight);
    };
  }, [activeTab]);

  const counts = githubData.counts;
  const levels = githubData.levels.split("").map(Number);
  const totalTarget = githubData.total;
  const startDate = githubData.start;

  // Best day index (max commits)
  const bestDayIndex = useMemo(() => {
    let max = -1;
    let idx = 0;
    counts.forEach((c, i) => {
      if (c > max) {
        max = c;
        idx = i;
      }
    });
    return { index: idx, count: max, date: getDateForIndex(startDate, idx) };
  }, [counts, startDate]);

  // Check mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 820);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // IntersectionObserver: start playing when 40% in view
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.38) {
          setIsPlaying(true);
          if (!startTime) setStartTime(performance.now());
        } else {
          setIsPlaying(false);
        }
      },
      { threshold: [0, 0.4, 0.8] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [startTime]);

  const handleReplay = useCallback(() => {
    setStartTime(performance.now());
    setIsPlaying(true);
    setCurrentTotal(0);
  }, []);

  // When switching tabs, reset start time
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setStartTime(performance.now());
    setIsPlaying(true);
    setTooltip(null);
  };

  // -------------------------------------------------------------
  // ANIMATION FUNCTIONS (PURE DRAW)
  // -------------------------------------------------------------

  // 1. GRID ANIMATION
  const drawGrid = useCallback((ctx, W, H, t) => {
    const cols = 53;
    const rows = 7;
    const gap = 4.5;
    const labelW = 28;
    // Exactly LeetCode box size: 14px by 14px with 2.5px rounded corners
    const cell = 14;
    const totalGridW = cols * cell + (cols - 1) * gap;
    const totalGridH = rows * cell + (rows - 1) * gap;

    // Center the entire block (Day labels + gap + grid) horizontally within W
    const blockW = labelW + 8 + totalGridW;
    const leftPad = Math.max(14, Math.floor((W - blockW) / 2));
    const startX = leftPad + labelW + 8;
    const startY = Math.max(16, Math.floor((H - totalGridH) / 2));

    let landedContributions = 0;

    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        const i = c * 7 + r;
        if (i >= counts.length) continue;

        const count = counts[i];
        const lvl = levels[i] || 0;
        const targetColor = GITHUB_GREENS[lvl];

        const x = startX + c * (cell + gap);
        const y = startY + r * (cell + gap);

        if (t === Infinity) {
          ctx.fillStyle = targetColor;
          ctx.beginPath();
          ctx.roundRect(x, y, cell, cell, 2.5);
          ctx.fill();
          landedContributions += count;
          continue;
        }

        // Diagonal wave
        const delay = (c + r * 1.6) * 22;
        const p = clamp((t - delay) / 560);

        if (p <= 0) continue;

        landedContributions += count;

        const animSize = cell * (0.2 + 0.8 * easeBack(p));
        const cx = x + cell / 2;
        const cy = y + cell / 2;

        const color = p < 1 ? mixColor(NEON_GREEN, targetColor, p) : targetColor;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.roundRect(cx - animSize / 2, cy - animSize / 2, animSize, animSize, 2.5);
        ctx.fill();
      }
    }

    // Day of week labels on left
    ctx.font = "600 9px 'JetBrains Mono', monospace";
    ctx.fillStyle = "rgba(23, 23, 23, 0.4)";
    ctx.textAlign = "right";
    ctx.fillText("Mon", startX - 8, startY + 1 * (cell + gap) + cell * 0.75);
    ctx.fillText("Wed", startX - 8, startY + 3 * (cell + gap) + cell * 0.75);
    ctx.fillText("Fri", startX - 8, startY + 5 * (cell + gap) + cell * 0.75);

    setCurrentTotal(Math.min(totalTarget, Math.round((landedContributions / (counts.reduce((a, b) => a + b, 0) || 1)) * totalTarget)));
  }, [counts, levels, totalTarget]);

  // 2. SKYLINE (3D Oblique Projection)
  const drawSkyline = useCallback((ctx, W, H, t) => {
    const cols = 53;
    const rows = 7;
    const maxAvailableW = W - 60;
    const cellW = Math.max(10, Math.min(18, maxAvailableW / cols));
    const totalSkylineW = cols * cellW + 6 * 1.8;
    const startIsoX = Math.floor((W - totalSkylineW) / 2);
    const cellD = 5;
    const baseOffsetY = H - 50;

    // Draw rows back to front (r: 0 to 6)
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const i = c * 7 + r;
        if (i >= counts.length) continue;

        const count = counts[i];
        const lvl = levels[i];
        const maxH = 80;
        const targetH = count === 0 ? 3 : Math.min(maxH, 4 + Math.sqrt(count) * 11);

        // Wave from back to front
        const delay = (c * 18) + (r * 70);
        const p = t === Infinity ? 1 : clamp((t - delay) / 550);
        if (p <= 0) continue;

        const curH = targetH * easeOutCubic(p);

        // Isometric offset up and right
        const isoX = startIsoX + c * cellW + r * 1.8;
        const isoY = baseOffsetY - (6 - r) * 16;

        const w = cellW * 0.78;
        const offset3DX = 2.8;
        const offset3DY = 2.8;

        const isBestDay = i === bestDayIndex.index;
        const baseColor = isBestDay ? BEST_DAY_COLOR : GITHUB_GREENS[lvl];

        // 1. Front face
        ctx.fillStyle = baseColor;
        ctx.beginPath();
        ctx.rect(isoX, isoY - curH, w, curH);
        ctx.fill();

        // 2. Lit Top face
        ctx.fillStyle = isBestDay ? "#ff8a50" : lvl === 0 ? "#d0d7de" : mixColor(baseColor, "#ffffff", 0.35);
        ctx.beginPath();
        ctx.moveTo(isoX, isoY - curH);
        ctx.lineTo(isoX + offset3DX, isoY - curH - offset3DY);
        ctx.lineTo(isoX + w + offset3DX, isoY - curH - offset3DY);
        ctx.lineTo(isoX + w, isoY - curH);
        ctx.closePath();
        ctx.fill();

        // 3. Shaded Right Side face
        ctx.fillStyle = isBestDay ? "#9a3412" : lvl === 0 ? "#a8b0b8" : mixColor(baseColor, "#000000", 0.3);
        ctx.beginPath();
        ctx.moveTo(isoX + w, isoY - curH);
        ctx.lineTo(isoX + w + offset3DX, isoY - curH - offset3DY);
        ctx.lineTo(isoX + w + offset3DX, isoY - offset3DY);
        ctx.lineTo(isoX + w, isoY);
        ctx.closePath();
        ctx.fill();

        // Leader line pointing to best day
        if (isBestDay && (t === Infinity || t > 1800)) {
          const leaderP = t === Infinity ? 1 : clamp((t - 1800) / 400);
          ctx.save();
          ctx.strokeStyle = BEST_DAY_COLOR;
          ctx.lineWidth = 1.5;
          ctx.setLineDash([3, 3]);
          ctx.beginPath();
          ctx.moveTo(isoX + w / 2, isoY - curH - offset3DY);
          ctx.lineTo(isoX + w / 2, isoY - curH - 35 * leaderP);
          ctx.stroke();

          if (leaderP >= 1) {
            ctx.setLineDash([]);
            ctx.fillStyle = "#FFFFFF";
            ctx.shadowColor = "rgba(0,0,0,0.15)";
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.roundRect(isoX + w / 2 - 60, isoY - curH - 65, 120, 24, 6);
            ctx.fill();
            ctx.strokeStyle = BEST_DAY_COLOR;
            ctx.stroke();

            ctx.shadowColor = "transparent";
            ctx.font = "700 10.5px 'JetBrains Mono', monospace";
            ctx.fillStyle = "#171717";
            ctx.textAlign = "center";
            ctx.fillText(`Best: ${bestDayIndex.count} commits`, isoX + w / 2, isoY - curH - 49);
          }
          ctx.restore();
        }
      }
    }
  }, [counts, levels, bestDayIndex]);



  // 4. ROUND THE YEAR (Concentric Polar Ring)
  const drawRing = useCallback((ctx, W, H, t) => {
    const cx = W / 2;
    const cy = H / 2;
    const maxR = Math.min(cx, cy) - 24;
    const minR = maxR * 0.42;
    const ringThickness = (maxR - minR) / 7;

    const cols = 53;
    const sweepP = t === Infinity ? 1 : clamp(t / 2200);
    const sweepAngle = sweepP * Math.PI * 2;

    for (let c = 0; c < cols; c++) {
      const a0 = (c / cols) * Math.PI * 2 - Math.PI / 2;
      const a1 = ((c + 0.88) / cols) * Math.PI * 2 - Math.PI / 2;

      // Only reveal if within sweep
      if (a0 > sweepAngle - Math.PI / 2 && t !== Infinity) continue;

      for (let r = 0; r < 7; r++) {
        const i = c * 7 + r;
        if (i >= counts.length) continue;

        const inner = minR + r * ringThickness;
        const outer = inner + ringThickness * 0.82;

        ctx.fillStyle = GITHUB_GREENS[levels[i]];
        ctx.beginPath();
        ctx.arc(cx, cy, outer, a0, a1);
        ctx.arc(cx, cy, inner, a1, a0, true);
        ctx.closePath();
        ctx.fill();
      }
    }

    // Sweeping radar hand
    if (t !== Infinity && sweepP < 1) {
      const handAngle = sweepAngle - Math.PI / 2;
      ctx.save();
      ctx.strokeStyle = NEON_GREEN;
      ctx.lineWidth = 2.5;
      ctx.shadowColor = NEON_GREEN;
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(handAngle) * minR, cy + Math.sin(handAngle) * minR);
      ctx.lineTo(cx + Math.cos(handAngle) * (maxR + 6), cy + Math.sin(handAngle) * (maxR + 6));
      ctx.stroke();
      ctx.restore();
    }

    // Centred summary circle
    ctx.save();
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.arc(cx, cy, minR - 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(0,0,0,0.06)";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.font = "700 22px 'Spectral', serif";
    ctx.fillStyle = "#171717";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(totalTarget, cx, cy - 8);

    ctx.font = "600 10px 'JetBrains Mono', monospace";
    ctx.fillStyle = "#ea580c";
    ctx.fillText("YEARLY COMMITS", cx, cy + 14);
    ctx.restore();
  }, [counts, levels, totalTarget]);

  // Main RAF Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const render = () => {
      animId = requestAnimationFrame(render);
      if (!isPlaying && startTime !== null) return;

      const rect = canvas.getBoundingClientRect();
      const W = rect.width;
      const H = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      if (canvas.width !== W * dpr || canvas.height !== H * dpr) {
        canvas.width = W * dpr;
        canvas.height = H * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, W, H);

      const elapsed = prefersReducedMotion ? Infinity : (performance.now() - (startTime || performance.now()));

      switch (activeTab) {
        case "grid":
          drawGrid(ctx, W, H, elapsed);
          break;
        case "skyline":
          drawSkyline(ctx, W, H, elapsed);
          break;
        case "ring":
          drawRing(ctx, W, H, elapsed);
          break;
        default:
          drawGrid(ctx, W, H, elapsed);
      }

      ctx.restore();
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [activeTab, isPlaying, startTime, drawGrid, drawSkyline, drawRing]);

  // Tooltip interaction on Grid hover
  const handleMouseMove = (e) => {
    if (activeTab !== "grid") {
      setTooltip(null);
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    const cols = 53;
    const rows = 7;
    const gap = 4.5;
    const labelW = 28;
    const cell = 14;
    const totalGridW = cols * cell + (cols - 1) * gap;
    const totalGridH = rows * cell + (rows - 1) * gap;

    const blockW = labelW + 8 + totalGridW;
    const leftPad = Math.max(14, Math.floor((rect.width - blockW) / 2));
    const startX = leftPad + labelW + 8;
    const startY = Math.max(16, Math.floor((rect.height - totalGridH) / 2));

    const col = Math.floor((mx - startX) / (cell + gap));
    const row = Math.floor((my - startY) / (cell + gap));

    if (col >= 0 && col < 53 && row >= 0 && row < 7) {
      const cellX = startX + col * (cell + gap);
      const cellY = startY + row * (cell + gap);
      if (mx >= cellX && mx <= cellX + cell && my >= cellY && my <= cellY + cell) {
        const idx = col * 7 + row;
        if (idx < counts.length) {
          setTooltip({
            x: e.clientX,
            y: e.clientY,
            date: getDateForIndex(startDate, idx),
            count: counts[idx]
          });
          return;
        }
      }
    }
    setTooltip(null);
  };

  const handleMouseLeave = () => setTooltip(null);

  // Mobile Touch handler for Grid tooltips
  const handleTouch = (e) => {
    if (activeTab !== "grid" || !e.touches || e.touches.length === 0) return;
    const touch = e.touches[0];
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mx = touch.clientX - rect.left;
    const my = touch.clientY - rect.top;

    const cols = 53;
    const rows = 7;
    const gap = 4.5;
    const labelW = 28;
    const cell = 14;
    const totalGridW = cols * cell + (cols - 1) * gap;
    const totalGridH = rows * cell + (rows - 1) * gap;

    const blockW = labelW + 8 + totalGridW;
    const leftPad = Math.max(14, Math.floor((rect.width - blockW) / 2));
    const startX = leftPad + labelW + 8;
    const startY = Math.max(16, Math.floor((rect.height - totalGridH) / 2));

    const col = Math.floor((mx - startX) / (cell + gap));
    const row = Math.floor((my - startY) / (cell + gap));

    if (col >= 0 && col < 53 && row >= 0 && row < 7) {
      const cellX = startX + col * (cell + gap);
      const cellY = startY + row * (cell + gap);
      if (mx >= cellX && mx <= cellX + cell && my >= cellY && my <= cellY + cell) {
        const idx = col * 7 + row;
        if (idx < counts.length) {
          setTooltip({
            x: touch.clientX,
            y: touch.clientY,
            date: getDateForIndex(startDate, idx),
            count: counts[idx]
          });
          return;
        }
      }
    }
  };

  return (
    <div ref={containerRef} style={{ width: "100%", position: "relative" }}>
      
      <style>{`
        @keyframes cpAttentionBounce {
          0%, 100% {
            transform: translateY(0);
          }
          15% {
            transform: translateY(-8px) scale(1.05);
          }
          30% {
            transform: translateY(0) scale(1);
          }
          45% {
            transform: translateY(-4px) scale(1.02);
          }
          60% {
            transform: translateY(0) scale(1);
          }
        }

        .gh-bounce-btn {
          animation: cpAttentionBounce 3s cubic-bezier(0.28, 0.84, 0.42, 1) infinite;
          transition: all 0.2s ease;
        }
        .gh-bounce-btn:hover {
          animation-play-state: paused;
          transform: translateY(-3px) scale(1.05);
        }

        .gh-replay-btn {
          transition: all 0.2s ease;
        }
        .gh-replay-btn:hover {
          transform: rotate(45deg) scale(1.06);
          background: #f6f8fa;
        }

        @media (max-width: 680px) {
          .gh-controls-wrapper {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 12px !important;
          }
          .gh-pills-row {
            display: flex !important;
            justify-content: space-between !important;
            width: 100% !important;
            gap: 6px !important;
          }
          .gh-pills-row button {
            flex: 1 1 0 !important;
            padding: 8px 6px !important;
            font-size: 11px !important;
            justify-content: center !important;
          }
          .gh-meta-row {
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            width: 100% !important;
          }
        }
      `}</style>

      {/* Top Controls: Animation Switcher Tabs + Replay + Counter */}
      <div className="gh-controls-wrapper" style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "10px",
        marginBottom: "1.25rem",
        paddingBottom: "0.75rem",
        borderBottom: "1px solid rgba(23, 23, 23, 0.08)"
      }}>
        {/* Animation Pill Buttons: Grid, Skyline, Round the Year */}
        <div className="gh-pills-row" style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          flexWrap: "wrap"
        }}>
          {[
            { id: "grid", label: "Grid", glyph: "▦", delay: "0s" },
            { id: "skyline", label: "Skyline", glyph: "▤", delay: "0.2s" },
            { id: "ring", label: "Round the Year", glyph: "◎", delay: "0.4s" }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`gh-bounce-btn ${isActive ? "gh-active-btn" : ""}`}
                style={{
                  padding: isMobile ? "6px 12px" : "6px 15px",
                  borderRadius: "999px",
                  border: isActive ? "1.5px solid #216e39" : "1.5px solid rgba(23,23,23,0.14)",
                  background: isActive ? "#216e39" : "#FFFFFF",
                  color: isActive ? "#FFFFFF" : "#171717",
                  fontFamily: "'Space Mono', monospace",
                  fontSize: isMobile ? "11px" : "11.5px",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  boxShadow: isActive ? "0 4px 12px rgba(33, 110, 57, 0.28)" : "0 2px 5px rgba(0,0,0,0.04)",
                  animationDelay: tab.delay,
                  whiteSpace: "nowrap"
                }}
              >
                <span style={{ fontSize: "13px" }}>{tab.glyph}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Counter Display & Replay */}
        <div className="gh-meta-row" style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          <div style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: isMobile ? "11.5px" : "12px",
            fontWeight: 700,
            color: "#171717"
          }}>
            <span>Contributions: <span style={{ color: "#216e39", fontWeight: 800 }}>{currentTotal || totalTarget}</span></span>
          </div>

          <button
            onClick={handleReplay}
            aria-label="Replay animation"
            title="Replay animation"
            className="gh-replay-btn"
            style={{
              padding: "5px 12px",
              borderRadius: "8px",
              border: "1.5px solid rgba(23,23,23,0.14)",
              background: "#FFFFFF",
              color: "#171717",
              fontFamily: "'Space Mono', monospace",
              fontSize: "11px",
              fontWeight: 700,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.04)"
            }}
          >
            <span style={{ fontSize: "13px" }}>↺</span>
            <span>Replay</span>
          </button>
        </div>
      </div>

      {/* Canvas Display Container with Responsive Auto-Scroll */}
      <div 
        ref={scrollRef}
        style={{ 
          width: "100%", 
          background: "#FFFFFF",
          borderRadius: 12,
          border: "1px solid rgba(23, 23, 23, 0.08)",
          boxShadow: "inset 0 1px 3px rgba(0,0,0,0.02)",
          position: "relative",
          overflowX: activeTab === "ring" ? "hidden" : "auto",
          overflowY: "hidden",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(23, 23, 23, 0.15) transparent"
        }}
      >
        <div style={{
          minWidth: activeTab === "ring" ? "100%" : "1060px",
          width: activeTab === "ring" ? "100%" : "1060px",
          height: activeTab === "ring" ? (isMobile ? 310 : 340) : activeTab === "skyline" ? 220 : 185,
          position: "relative"
        }}>
          <canvas
            ref={canvasRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouch}
            onTouchMove={handleTouch}
            onTouchEnd={() => setTooltip(null)}
            style={{
              width: "100%",
              height: "100%",
              display: "block",
              cursor: activeTab === "grid" ? "pointer" : "default"
            }}
          />

          {/* Floating Tooltip */}
          {tooltip && (
            <div
              style={{
                position: "fixed",
                top: tooltip.y - 42,
                left: tooltip.x,
                transform: "translateX(-50%)",
                background: "#24292e",
                color: "#FFFFFF",
                padding: "5px 12px",
                borderRadius: 6,
                fontSize: "11px",
                fontFamily: "'Space Mono', monospace",
                pointerEvents: "none",
                zIndex: 9999,
                boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
                whiteSpace: "nowrap"
              }}
            >
              {tooltip.count === 0 ? "No contributions" : `${tooltip.count} contribution${tooltip.count > 1 ? "s" : ""}`} on {tooltip.date}
            </div>
          )}
        </div>
      </div>

      {/* Legend & Stats Details */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: "12px",
        flexWrap: "wrap",
        gap: "8px"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontFamily: "'Space Mono', monospace",
          fontSize: "11px",
          color: "rgba(23, 23, 23, 0.55)",
          flexWrap: "wrap"
        }}>
          <span>53 weeks of activity · Oct 2025 – Oct 2026</span>
          {isMobile && activeTab !== "ring" && (
            <span style={{ color: "#ea580c", fontWeight: 700, fontSize: "10px" }}>
              (Swipe ◂ for history)
            </span>
          )}
        </div>

        {/* 5-Color Intensity Legend */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <span style={{ fontSize: "10px", color: "rgba(23,23,23,0.5)", marginRight: "4px", fontFamily: "'Space Mono', monospace" }}>Less</span>
          {GITHUB_GREENS.map((c, i) => (
            <div key={i} style={{ width: 10, height: 10, borderRadius: 2, background: c }} />
          ))}
          <span style={{ fontSize: "10px", color: "rgba(23,23,23,0.5)", marginLeft: "4px", fontFamily: "'Space Mono', monospace" }}>More</span>
        </div>
      </div>

    </div>
  );
}
