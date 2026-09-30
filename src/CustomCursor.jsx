import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const requestRef = useRef(null);

  // Raw mouse coordinates to avoid re-renders
  const mouse = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  
  const [isHovering, setIsHovering] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isHidden, setIsHidden] = useState(true); // Hidden until mouse moves
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.matchMedia("(max-width: 768px), (pointer: coarse)").matches);
    }
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const onMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (isHidden) setIsHidden(false);
    };

    const onMouseDown = () => setIsMouseDown(true);
    const onMouseUp = () => setIsMouseDown(false);

    const onMouseOver = (e) => {
      const target = e.target;
      // Elements that should trigger the hover animation
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('pg-rail-item') ||
        target.classList.contains('kex-card-btn') ||
        target.classList.contains('dd-item') ||
        target.closest('.dd-item') ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const onMouseLeave = () => setIsHidden(true);
    const onMouseEnter = () => setIsHidden(false);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    const render = () => {
      // Easing factor (lower = smoother/slower, higher = faster/snappier)
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.16;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.16;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%)`;
      }
      
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      requestRef.current = requestAnimationFrame(render);
    };

    requestRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(requestRef.current);
    };
  }, [isMobile, isHidden]);

  if (isMobile) return null;

  return (
    <>
      <style>{`
        /* Hide default cursor globally for non-touch devices */
        @media (pointer: fine) and (min-width: 768px) {
          * {
            cursor: none !important;
          }
        }
        
        .cc-dot {
          position: fixed;
          top: 0; left: 0;
          width: 6px; height: 6px;
          background-color: #ea580c;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999999;
          transition: opacity 0.3s, width 0.2s, height 0.2s;
          will-change: transform;
          box-shadow: 0 0 10px rgba(234, 88, 12, 0.5);
        }
        
        .cc-ring {
          position: fixed;
          top: 0; left: 0;
          width: 40px; height: 40px;
          border: 1.5px solid rgba(234, 88, 12, 0.4);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999998;
          transition: opacity 0.3s, width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease;
          will-change: transform;
        }
        
        /* Hover State on links/buttons */
        .cc-ring.hovering {
          width: 64px; height: 64px;
          background-color: rgba(234, 88, 12, 0.08);
          border-color: rgba(234, 88, 12, 0.8);
          backdrop-filter: blur(2px);
          -webkit-backdrop-filter: blur(2px);
        }
        
        /* Mousedown State */
        .cc-ring.clicking {
          width: 28px; height: 28px;
          background-color: rgba(234, 88, 12, 0.25);
          border-color: rgba(234, 88, 12, 1);
        }
        
        .cc-dot.hovering {
          width: 0; height: 0; opacity: 0;
        }
        
        .cc-hidden {
          opacity: 0 !important;
        }
      `}</style>

      <div 
        ref={dotRef} 
        className={`cc-dot ${isHovering ? 'hovering' : ''} ${isHidden ? 'cc-hidden' : ''}`} 
      />
      
      <div 
        ref={ringRef} 
        className={`cc-ring ${isHovering ? 'hovering' : ''} ${isMouseDown ? 'clicking' : ''} ${isHidden ? 'cc-hidden' : ''}`}
      >
      </div>
    </>
  );
}
