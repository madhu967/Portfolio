import React, { useRef, useEffect, useState } from 'react';

const NUM_PLANETS = 15;
const IMAGES = Array.from({ length: NUM_PLANETS }, (_, i) => `https://picsum.photos/seed/orrery${i + 10}/800/800`);

const TEXTS = [
  { title: "Celestial Mechanics", desc: "Observing the intricate ballet of orbital bodies and gravitational fields." },
  { title: "Quantum Horizons", desc: "Beyond the visible spectrum of classical physics into the unknown." },
  { title: "Stellar Cartography", desc: "Mapping the uncharted territories of deep space networks." },
  { title: "Temporal Drifts", desc: "How massive objects warp the fabric of space and time." },
  { title: "Solar Flares", desc: "Eruptions of magnetic energy shaping planetary climates." },
  { title: "Nebula Cores", desc: "The vibrant stellar nurseries where new stars are born." },
  { title: "Event Horizon", desc: "The boundary where the velocity of escape exceeds light." },
  { title: "Dark Matter", desc: "The invisible scaffolding holding the universe together." },
  { title: "Lunar Tides", desc: "Gravitational interactions between planetary masses." },
  { title: "Asteroid Belts", desc: "Rocky remnants from the early days of solar system formation." },
  { title: "Galactic Center", desc: "The supermassive anchor point of our milky way galaxy." },
  { title: "Supernova Remnants", desc: "The beautiful, chaotic aftermath of stellar death." },
  { title: "Exoplanet Transits", desc: "Detecting distant worlds as they eclipse their parent stars." },
  { title: "Cosmic Microwave", desc: "The residual thermal footprint of the Big Bang itself." },
  { title: "Orbital Resonance", desc: "When orbiting bodies exert regular, periodic gravitational influence." },
];

export default function Orrery() {
  const containerRef = useRef(null);
  const rightPaneRef = useRef(null);
  const planeRef = useRef(null);
  const planetsRef = useRef([]);
  const lensBaseRef = useRef(null);
  const lensIrisRef = useRef(null);
  const readoutRef = useRef(null);
  const accentRefs = useRef([]);
  
  const textTitleRef = useRef(null);
  const textDescRef = useRef(null);
  
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Centralized mutable state
  const stateRef = useRef({
    targetRotation: null,
    rotation: Math.PI / 2, // start front
    velocity: 0,
    dragMoved: false
  });

  useEffect(() => {
    if (prefersReducedMotion) return;

    let rafId;
    let lastTime = performance.now();
    let isDragging = false;
    let startX = 0;
    let startRot = 0;
    
    let activeIndex = 0;
    let irisActiveIndex = 0;
    let irisProgress = 1; 
    
    let pointerX = 0.5;
    let pointerY = 0.5;
    let tiltX = 0;
    let tiltY = 0;
    
    const wrapToPi = (angle) => {
      let a = (angle + Math.PI) % (2 * Math.PI);
      if (a < 0) a += 2 * Math.PI;
      return a - Math.PI;
    };
    
    const wrapTo2Pi = (angle) => {
      let a = angle % (2 * Math.PI);
      if (a < 0) a += 2 * Math.PI;
      return a;
    };

    const handlePointerDown = (e) => {
      isDragging = true;
      startX = e.clientX;
      startRot = stateRef.current.rotation;
      stateRef.current.velocity = 0;
      stateRef.current.targetRotation = null;
      stateRef.current.dragMoved = false;
      if (rightPaneRef.current) rightPaneRef.current.style.cursor = 'grabbing';
    };

    const handlePointerMove = (e) => {
      if (!rightPaneRef.current) return;
      const rect = rightPaneRef.current.getBoundingClientRect();
      pointerX = (e.clientX - rect.left) / rect.width;
      pointerY = (e.clientY - rect.top) / rect.height;

      if (isDragging) {
        const dx = e.clientX - startX;
        if (Math.abs(dx) > 5) {
          stateRef.current.dragMoved = true;
        }
        const dRot = dx * 0.005;
        const newRot = startRot + dRot;
        stateRef.current.velocity = (newRot - stateRef.current.rotation) / 0.016; 
        stateRef.current.rotation = newRot;
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
      if (rightPaneRef.current) rightPaneRef.current.style.cursor = 'grab';
    };

    const handlePointerLeave = () => {
      isDragging = false;
      if (rightPaneRef.current) rightPaneRef.current.style.cursor = 'grab';
      pointerX = 0.5;
      pointerY = 0.5;
    };
    
    const handleWheel = (e) => {
      stateRef.current.velocity += e.deltaY * -0.00015; 
      stateRef.current.targetRotation = null;
    };

    const node = rightPaneRef.current;
    if (node) {
      node.addEventListener('pointerdown', handlePointerDown);
      node.addEventListener('pointermove', handlePointerMove);
      node.addEventListener('pointerup', handlePointerUp);
      node.addEventListener('pointerleave', handlePointerLeave);
      node.addEventListener('pointercancel', handlePointerUp);
      node.addEventListener('wheel', handleWheel, { passive: true });
    }

    const tick = (time) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      if (!rightPaneRef.current || !planeRef.current) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      const planeRect = planeRef.current.getBoundingClientRect();
      const planeW = planeRect.width;
      const planeH = planeRect.height;
      const Rx = planeW * 0.4;
      const Ry = planeH * 0.33;

      let currentRot = stateRef.current.rotation;

      if (!isDragging) {
        if (stateRef.current.targetRotation !== null) {
          const diff = wrapToPi(stateRef.current.targetRotation - currentRot);
          currentRot += diff * 0.15; // Snappy Lerp to target
          if (Math.abs(diff) < 0.005) { // Reached target
            currentRot = stateRef.current.targetRotation;
            stateRef.current.targetRotation = null;
            stateRef.current.velocity = 0; // Stop completely to resume auto-spin cleanly
          }
        } else {
          // Normal physics
          stateRef.current.velocity *= Math.pow(0.9, dt * 60);
          currentRot += stateRef.current.velocity * dt;
          currentRot += 0.16 * dt; // Slow ambient auto-spin
        }
      }
      
      stateRef.current.rotation = currentRot;

      // Tilt parallax
      const targetTiltX = (pointerY - 0.5) * -26; 
      const targetTiltY = (pointerX - 0.5) * 26;
      tiltX += (targetTiltX - tiltX) * 0.1;
      tiltY += (targetTiltY - tiltY) * 0.1;
      planeRef.current.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

      const step = (2 * Math.PI) / NUM_PLANETS;
      let nearestIndex = 0;
      let minDiff = Infinity;

      for (let i = 0; i < NUM_PLANETS; i++) {
        const angle = wrapTo2Pi(currentRot + i * step);
        const diff = Math.abs(wrapToPi(Math.PI / 2 - angle));
        if (diff < minDiff) {
          minDiff = diff;
          nearestIndex = i;
        }
      }

      if (nearestIndex !== activeIndex) {
        activeIndex = nearestIndex;
        if (lensBaseRef.current && lensIrisRef.current) {
          lensBaseRef.current.style.backgroundImage = `url(${IMAGES[irisActiveIndex]})`;
          irisActiveIndex = activeIndex;
          lensIrisRef.current.style.backgroundImage = `url(${IMAGES[irisActiveIndex]})`;
          irisProgress = 0;
        }
        
        // Update left side text
        if (textTitleRef.current && textDescRef.current) {
          textTitleRef.current.innerText = TEXTS[activeIndex].title;
          textDescRef.current.innerText = TEXTS[activeIndex].desc;
        }
      }

      if (irisProgress < 1) {
        irisProgress += dt / 0.72; 
        if (irisProgress > 1) irisProgress = 1;
      }
      
      const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
      const irisRadius = easeOutCubic(irisProgress) * 72; 
      
      if (lensIrisRef.current) {
        lensIrisRef.current.style.clipPath = `circle(${irisRadius}% at center)`;
      }

      planetsRef.current.forEach((el, i) => {
        if (!el) return;
        const angle = currentRot + i * step;
        const x = Math.cos(angle) * Rx;
        const y = Math.sin(angle) * Ry;
        
        const depth = (Math.sin(angle) + 1) / 2; 
        const scale = 0.6 + depth * (1.26 - 0.6);
        const opacity = 0.34 + depth * (1 - 0.34);
        const zIndex = Math.floor(depth * 100);

        el.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) scale(${scale})`;
        el.style.opacity = opacity;
        el.style.zIndex = zIndex;

        const accent = accentRefs.current[i];
        if (accent) {
          accent.style.opacity = (i === activeIndex) ? 1 : 0;
          accent.style.transform = (i === activeIndex) ? 'scale(1.15)' : 'scale(1)';
        }
      });

      if (readoutRef.current) {
        const rawDeg = wrapTo2Pi(currentRot) * (180 / Math.PI);
        const deg = Math.floor(rawDeg).toString().padStart(3, '0');
        const idxStr = (activeIndex + 1).toString().padStart(2, '0');
        readoutRef.current.innerHTML = `<span class="orr-accent-text">${idxStr}</span> / 15 · ${deg}&deg;`;
      }

      rafId = requestAnimationFrame(tick);
    };

    // initialize text
    if (textTitleRef.current && textDescRef.current) {
      textTitleRef.current.innerText = TEXTS[0].title;
      textDescRef.current.innerText = TEXTS[0].desc;
    }

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      if (node) {
        node.removeEventListener('pointerdown', handlePointerDown);
        node.removeEventListener('pointermove', handlePointerMove);
        node.removeEventListener('pointerup', handlePointerUp);
        node.removeEventListener('pointerleave', handlePointerLeave);
        node.removeEventListener('pointercancel', handlePointerUp);
        node.removeEventListener('wheel', handleWheel);
      }
    };
  }, [prefersReducedMotion]);

  const wrapToPi = (angle) => {
    let a = (angle + Math.PI) % (2 * Math.PI);
    if (a < 0) a += 2 * Math.PI;
    return a - Math.PI;
  };

  const handlePlanetClick = (i) => {
    if (prefersReducedMotion) return;
    if (stateRef.current.dragMoved) return; // Prevent clicking if user was dragging the planet
    
    const step = (2 * Math.PI) / NUM_PLANETS;
    const currentRot = stateRef.current.rotation;
    let target = Math.PI / 2 - i * step;
    
    const diff = wrapToPi(target - currentRot);
    stateRef.current.targetRotation = currentRot + diff;
    stateRef.current.velocity = 0; // Kill momentum so it seeks cleanly
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Spectral:ital,wght@1,300&display=swap');

        .orr-root {
          position: relative;
          width: 100%;
          min-height: 100vh;
          min-height: 100svh;
          background: radial-gradient(circle at center, #fbfdf3 0%, #f7f5ef 50%, #ebeedc 100%);
          display: flex;
          flex-direction: row;
          overflow: hidden;
          font-family: 'Space Mono', monospace;
          color: #1a1813;
          user-select: none;
          touch-action: none;
        }

        .orr-left {
          width: 40%;
          padding: 4rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          z-index: 100;
        }

        .orr-text-title {
          font-family: 'Spectral', serif;
          font-size: 3.5rem;
          font-weight: 300;
          font-style: italic;
          letter-spacing: -0.02em;
          line-height: 1.1;
          color: #1a1813;
          margin-bottom: 1.5rem;
        }

        .orr-text-desc {
          font-size: 1.1rem;
          line-height: 1.6;
          opacity: 0.8;
          max-width: 400px;
        }

        .orr-right {
          width: 60%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: grab;
        }
        
        .orr-right:active {
          cursor: grabbing;
        }

        .orr-stage {
          position: relative;
          width: min(100%, 900px);
          height: min(80svh, 660px);
          perspective: 1300px;
        }

        .orr-plane {
          position: absolute;
          inset: 0;
          transform-style: preserve-3d;
          will-change: transform;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .orr-ellipse {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 80%; 
          height: 66%; 
          transform: translate(-50%, -50%);
          border: 1px dashed rgba(26, 24, 19, 0.15);
          border-radius: 50%;
          pointer-events: none;
        }

        .orr-lens-container {
          position: absolute;
          top: 50%;
          left: 50%;
          width: min(35vw, 320px);
          height: min(35vw, 320px);
          transform: translate(-50%, -50%);
          border-radius: 50%;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(26, 24, 19, 0.15), inset 0 0 0 1px rgba(255,255,255,0.4);
          background: #fbfdf3;
          z-index: 50; 
          pointer-events: none;
        }

        .orr-lens-base, .orr-lens-iris {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          border-radius: 50%;
        }
        
        .orr-lens-iris {
          clip-path: circle(0% at center);
          will-change: clip-path;
        }

        .orr-planet {
          position: absolute;
          top: 50%;
          left: 50%;
          width: min(10vw, 80px);
          height: min(10vw, 80px);
          border-radius: 50%;
          background-size: cover;
          background-position: center;
          background-color: #d0cbc0;
          box-shadow: 0 10px 20px rgba(26, 24, 19, 0.2);
          will-change: transform, opacity;
          cursor: pointer;
          pointer-events: auto;
        }

        .orr-accent {
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 1.5px solid #2f5bd0;
          opacity: 0;
          transform: scale(1);
          transition: opacity 0.4s cubic-bezier(0.2, 0, 0, 1), transform 0.4s cubic-bezier(0.2, 0, 0, 1);
          pointer-events: none;
        }

        .orr-chrome {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 2.5rem;
        }
        
        .orr-chrome-top, .orr-chrome-bottom {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }
        
        .orr-chrome-top {
          align-items: flex-start;
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          opacity: 0.6;
        }

        .orr-title {
          font-family: 'Spectral', serif;
          font-size: 1.5rem;
          font-weight: 300;
          font-style: italic;
          letter-spacing: -0.02em;
          line-height: 1;
          color: #1a1813;
          margin-bottom: 0.5rem;
        }

        .orr-readout {
          font-size: 0.85rem;
          opacity: 0.8;
          letter-spacing: 0.05em;
        }
        
        .orr-accent-text {
          color: #2f5bd0;
          font-weight: 700;
        }
        
        @media (max-width: 960px) {
          .orr-root { flex-direction: column; }
          .orr-left { width: 100%; height: auto; padding: 2.5rem 1.5rem 1rem; align-items: center; text-align: center; }
          .orr-text-title { font-size: 2.5rem; margin-bottom: 1rem; }
          .orr-text-desc { font-size: 1rem; max-width: 100%; }
          .orr-right { width: 100%; flex: 1; min-height: 60vh; }
          .orr-chrome { padding: 1.5rem; }
          .orr-lens-container { width: 55vw; height: 55vw; }
          .orr-planet { width: 16vw; height: 16vw; }
          .orr-ellipse { width: 90%; height: 75%; }
        }
      `}</style>

      <section className="orr-root" ref={containerRef}>
        <div className="orr-left">
          <div className="orr-text-title" ref={textTitleRef}>Loading...</div>
          <div className="orr-text-desc" ref={textDescRef}></div>
        </div>

        <div className="orr-right" ref={rightPaneRef}>
          <div className="orr-chrome">
            <div className="orr-chrome-top">
              <div>Kexsio®</div>
              <div>Drag or Scroll to spin</div>
            </div>
            <div className="orr-chrome-bottom">
              <div className="orr-title">Orrery</div>
              <div className="orr-readout" ref={readoutRef}>
                <span className="orr-accent-text">01</span> / 15 · 090&deg;
              </div>
            </div>
          </div>

          <div className="orr-stage">
            <div
              className="orr-plane"
              ref={planeRef}
              style={prefersReducedMotion ? { transform: 'none' } : {}}
            >
              <div className="orr-ellipse"></div>

              <div className="orr-lens-container">
                <div
                  className="orr-lens-base"
                  ref={lensBaseRef}
                  style={{ backgroundImage: `url(${IMAGES[0]})` }}
                ></div>
                <div
                  className="orr-lens-iris"
                  ref={lensIrisRef}
                  style={{ backgroundImage: `url(${IMAGES[0]})` }}
                ></div>
              </div>

              {IMAGES.map((img, i) => {
                if (prefersReducedMotion) {
                  const isFront = i === 0;
                  return (
                    <div
                      key={i}
                      className="orr-planet"
                      style={{
                        transform: isFront
                          ? `translate(-50%, -50%) translate3d(0, 33%, 0) scale(1.26)`
                          : `translate(-50%, -50%) translate3d(${Math.cos((i / NUM_PLANETS) * 2 * Math.PI) * 40}%, ${Math.sin((i / NUM_PLANETS) * 2 * Math.PI) * 33}%, 0) scale(0.6)`,
                        opacity: isFront ? 1 : 0.34,
                        zIndex: isFront ? 100 : 0,
                        backgroundImage: `url(${img})`,
                      }}
                    >
                      <div
                        className="orr-accent"
                        style={isFront ? { opacity: 1, transform: 'scale(1.15)' } : {}}
                      ></div>
                    </div>
                  );
                }

                return (
                  <div
                    key={i}
                    ref={(el) => (planetsRef.current[i] = el)}
                    className="orr-planet"
                    style={{ backgroundImage: `url(${img})` }}
                    onClick={() => handlePlanetClick(i)}
                  >
                    <div
                      className="orr-accent"
                      ref={(el) => (accentRefs.current[i] = el)}
                    ></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

