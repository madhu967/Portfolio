"use client";
import React, { useEffect, useRef } from 'react';

export default function VerdelyFooterPage() {
  const pageRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!pageRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth) - 0.5;
      const y = (clientY / innerHeight) - 0.5;
      pageRef.current.style.setProperty('--mouse-x', x.toString());
      pageRef.current.style.setProperty('--mouse-y', y.toString());
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={pageRef} className="verdely-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');

        .verdely-page {
          --dark-teal: #000000;
          --deep-teal: #111111;
          --cream: #ffffff;
          --green: #ffffff;
          --coral: #ffffff;
          --mouse-x: 0;
          --mouse-y: 0;

          width: 100vw;
          position: relative;
          left: 50%;
          transform: translateX(-50%);
          min-height: 100svh;
          overflow: hidden;
          isolation: isolate;
          background-color: #000000;
          font-family: 'Space Mono', monospace;
        }

        /* --- UPPER LANDSCAPE --- */
        .v-landscape-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 66%;
          overflow: hidden;
          z-index: -1;
          transform: translate(calc(var(--mouse-x) * -15px), calc(var(--mouse-y) * -15px));
          transition: transform 0.85s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .v-sky-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 31%, rgba(255, 255, 255, 0.15) 0%, transparent 65%),
                      linear-gradient(to bottom, #111111 0%, #000000 40%, #000000 100%);
        }

        .v-landscape-img {
          position: absolute;
          top: -6%;
          left: -3%;
          width: 106%;
          height: 112%;
          object-fit: cover;
          object-position: center 55%;
          pointer-events: none;
          filter: grayscale(1) contrast(1.3) brightness(0.5);
          animation: landscapeBreathing 18s ease-in-out infinite alternate;
        }

        .v-overlay-vertical {
          position: absolute;
          inset: 0;
          mix-blend-mode: multiply;
          background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,1) 100%);
          pointer-events: none;
        }

        .v-overlay-horizontal {
          position: absolute;
          inset: 0;
          mix-blend-mode: overlay;
          background: linear-gradient(to right, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0) 50%, rgba(255,255,255,0.05) 100%);
          pointer-events: none;
        }

        .v-sun-glow {
          position: absolute;
          left: 50%;
          top: 24%;
          transform: translate(-50%, -50%);
          width: max(34vw, 470px);
          aspect-ratio: 1;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          filter: blur(40px);
          mix-blend-mode: screen;
          animation: sunPulse 6s ease-in-out infinite alternate;
          pointer-events: none;
        }

        /* --- BIRDS & MIST --- */
        .v-birds-wrapper {
          position: absolute;
          top: 17%;
          left: 38%;
          width: clamp(100px, 12vw, 190px);
          animation: birdsTravel 12s linear infinite alternate;
          pointer-events: none;
        }

        .v-bird {
          fill: none;
          stroke: #ffffff;
          stroke-width: 2.5;
          stroke-linecap: round;
          stroke-linejoin: round;
          transform-origin: center;
        }
        
        .v-bird-1 { animation: birdFlap 2.1s ease-in-out infinite alternate; }
        .v-bird-2 { animation: birdFlap 2.6s ease-in-out infinite alternate; transform: translate(40px, 15px); }
        .v-bird-3 { animation: birdFlap 2.3s ease-in-out infinite alternate; transform: translate(-20px, 25px) scale(0.8); }

        .v-mist {
          position: absolute;
          height: 64px;
          background: rgba(0, 0, 0, 0.45);
          filter: blur(22px);
          border-radius: 50%;
          pointer-events: none;
        }

        .v-mist-left {
          top: 22%;
          left: 5%;
          width: 42%;
          animation: mistMove 22s ease-in-out infinite alternate;
        }

        .v-mist-right {
          top: 26%;
          right: 5%;
          width: 37%;
          animation: mistMoveReverse 26s ease-in-out infinite alternate;
        }

        /* --- FOREGROUND HILLS --- */
        .v-hill {
          position: absolute;
          left: -5%;
          width: 110%;
          pointer-events: none;
          transition: transform 0.9s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .v-hill-back {
          top: 42%;
          height: 30%;
          background: #111111;
          clip-path: polygon(0 45%, 12% 25%, 28% 40%, 45% 15%, 65% 45%, 85% 20%, 100% 50%, 100% 100%, 0 100%);
          transform: translate(calc(var(--mouse-x) * 20px), calc(var(--mouse-y) * 10px));
          z-index: 1;
        }

        .v-hill-middle {
          top: 47%;
          height: 29%;
          background: #0a0a0a;
          clip-path: polygon(0 35%, 20% 55%, 42% 25%, 68% 48%, 88% 18%, 100% 40%, 100% 100%, 0 100%);
          transform: translate(calc(var(--mouse-x) * -15px), calc(var(--mouse-y) * -8px));
          z-index: 2;
        }

        .v-hill-front {
          top: 50%;
          height: 100vh;
          background: var(--dark-teal);
          background: radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.05) 0%, var(--dark-teal) 45%);
          clip-path: polygon(0 18%, 38% 0%, 75% 22%, 100% 8%, 100% 100%, 0 100%);
          z-index: 3;
        }

        /* --- FLOATING SPARKS --- */
        .v-leaves {
          position: absolute;
          inset: 0;
          z-index: 4;
          pointer-events: none;
          overflow: hidden;
        }

        .v-leaf {
          position: absolute;
          border-radius: 50%;
          background: #ffffff;
          box-shadow: 0 0 12px rgba(255, 255, 255, 0.8);
          animation: leafFloat linear infinite, leafOpacity linear infinite;
        }

        .l-1 { top: 43%; left: 24%; width: 28px; height: 28px; animation-duration: 14s, 14s; animation-delay: -3s, -3s; }
        .l-2 { top: 57%; left: 39%; width: 42px; height: 42px; animation-duration: 17s, 17s; animation-delay: -7s, -7s; }
        .l-3 { top: 45%; left: 51%; width: 20px; height: 20px; animation-duration: 12s, 12s; animation-delay: -1s, -1s; }
        .l-4 { top: 56%; left: 64%; width: 34px; height: 34px; animation-duration: 15s, 15s; animation-delay: -9s, -9s; }
        .l-5 { top: 47%; left: 75%; width: 25px; height: 25px; animation-duration: 13s, 13s; animation-delay: -4s, -4s; }
        .l-6 { top: 60%; left: 85%; width: 38px; height: 38px; animation-duration: 18s, 18s; animation-delay: -11s, -11s; }

        /* --- MAIN HEADLINE AREA --- */
        .v-headline-area {
          position: absolute;
          left: clamp(34px, 4.6vw, 90px);
          bottom: clamp(245px, 27vh, 285px);
          max-width: 700px;
          z-index: 5;
          pointer-events: none;
          transform: translate(calc(var(--mouse-x) * 12px), calc(var(--mouse-y) * 12px));
          transition: transform 0.9s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .v-eyebrow {
          text-transform: uppercase;
          color: rgba(246, 241, 221, 0.74);
          font-size: clamp(10px, 1.2vw, 14px);
          font-weight: 400;
          letter-spacing: 0.18em;
          display: flex;
          align-items: center;
          margin-bottom: 22px;
        }

        .v-eyebrow::before {
          content: '';
          display: inline-block;
          width: 32px;
          height: 2px;
          background: var(--green);
          margin-right: 13px;
        }

        .v-heading {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          color: var(--cream);
          font-family: 'Playfair Display', serif;
          font-size: clamp(42px, 3.9vw, 70px);
          font-weight: 500;
          line-height: 0.98;
          letter-spacing: -0.057em;
          margin: 0;
        }

        .v-heading span {
          white-space: nowrap;
        }

        /* --- FOOTER CONTENT --- */
        .v-footer-content {
          position: absolute;
          left: clamp(34px, 4.6vw, 90px);
          right: clamp(34px, 4.6vw, 90px);
          bottom: clamp(24px, 3vh, 38px);
          z-index: 10;
        }

        .v-footer-grid {
          display: grid;
          grid-template-columns: minmax(220px, 0.8fr) minmax(470px, 2fr) minmax(155px, auto);
          align-items: end;
          gap: clamp(35px, 5vw, 90px);
        }

        /* Brand & Copyright */
        .v-brand-wrap {
          display: flex;
          align-items: center;
          gap: 13px;
          color: var(--cream);
          cursor: pointer;
        }

        .v-brand-wrap:hover .v-logo {
          transform: rotate(-7deg) scale(1.05);
        }

        .v-logo {
          width: 39px;
          height: 39px;
          stroke: #ffffff;
          fill: none;
          stroke-width: 2.5;
          stroke-linecap: round;
          stroke-linejoin: round;
          transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .v-brand-name {
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          font-weight: 500;
          letter-spacing: -0.02em;
          text-transform: uppercase;
        }

        .v-copyright {
          margin-top: 22px;
        }

        .v-copy-main {
          font-size: 14px;
          font-weight: 400;
          color: var(--cream);
          margin-bottom: 7px;
        }

        .v-copy-sub {
          font-size: 11px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.6);
        }

        /* Navigation */
        .v-nav-col {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .v-nav-group {
          display: flex;
          flex-direction: column;
          gap: 17px;
        }

        .v-nav-link {
          color: var(--cream);
          font-size: 13px;
          font-weight: 400;
          text-decoration: none;
          display: flex;
          align-items: center;
          white-space: nowrap;
          position: relative;
          left: 0;
          transition: all 0.3s ease;
        }

        .v-nav-link::before {
          content: '';
          display: block;
          width: 2px;
          height: 19px;
          background: var(--green);
          margin-right: 13px;
          transition: all 0.3s ease;
        }

        .v-nav-link:hover {
          left: 4px;
          color: #ffffff;
        }

        .v-nav-link:hover::before {
          height: 25px;
          background: #ffffff;
        }

        /* Contact Button */
        .v-btn-col {
          display: flex;
          justify-content: flex-end;
        }

        .v-contact-btn {
          position: relative;
          overflow: hidden;
          min-width: 168px;
          height: 58px;
          background: var(--coral);
          color: #000000;
          border-radius: 7px;
          font-size: 11px;
          font-weight: 400;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: inset 0 2px 4px rgba(255,255,255,0.4), 0 8px 16px rgba(0,0,0,0.25);
          transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .v-contact-btn span {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .v-btn-arrow {
          transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .v-btn-glow {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 0%;
          background: rgba(255, 255, 255, 0.8);
          transition: height 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
          z-index: 1;
        }

        .v-contact-btn:hover {
          transform: translateY(-5px);
          box-shadow: inset 0 2px 4px rgba(255,255,255,0.5), 0 15px 25px rgba(0,0,0,0.3);
        }

        .v-contact-btn:hover .v-btn-arrow {
          transform: translate(3px, -4px);
        }

        .v-contact-btn:hover .v-btn-glow {
          height: 100%;
        }

        /* Bottom Divider & Socials */
        .v-bottom-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 27px;
          position: relative;
          margin-left: clamp(245px, 24vw, 365px);
        }

        .v-divider-line {
          flex: 1;
          height: 1px;
          background: rgba(255, 255, 255, 0.15);
          position: relative;
          overflow: hidden;
        }

        .v-divider-line::before {
          content: '';
          position: absolute;
          top: 0;
          left: -150px;
          width: 150px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #ffffff, transparent);
          animation: lineGlide 5s infinite;
        }

        .v-socials {
          display: flex;
          gap: 21px;
          margin-left: 28px;
        }

        .v-social-link {
          color: #a3a3a3;
          font-size: 18px;
          font-weight: 400;
          text-decoration: none;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
        }

        .v-social-link svg {
          width: 20px;
          height: 20px;
          fill: currentColor;
        }

        .v-social-link:hover {
          transform: translateY(-4px);
          color: #ffffff;
        }

        /* --- ANIMATIONS --- */
        @keyframes landscapeBreathing {
          0% { transform: scale(1.045) translateY(0); }
          100% { transform: scale(1.09) translateY(-1%); }
        }

        @keyframes sunPulse {
          0% { transform: translate(-50%, -50%) scale(0.94); opacity: 0.85; }
          100% { transform: translate(-50%, -50%) scale(1.06); opacity: 1; }
        }

        @keyframes birdsTravel {
          0% { transform: translate(0, 0); }
          100% { transform: translate(-4%, 3%); }
        }

        @keyframes birdFlap {
          0% { transform: scaleY(1); }
          100% { transform: scaleY(0.4); }
        }

        @keyframes mistMove {
          0% { transform: translateX(-4%); }
          100% { transform: translateX(4%); }
        }

        @keyframes mistMoveReverse {
          0% { transform: translateX(4%); }
          100% { transform: translateX(-4%); }
        }

        @keyframes leafFloat {
          0% { transform: translateY(-20px) rotate(0deg) translateX(0); }
          100% { transform: translateY(350px) rotate(360deg) translateX(120px); }
        }

        @keyframes leafOpacity {
          0% { opacity: 0; }
          10% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0; }
        }

        @keyframes lineGlide {
          0% { left: -150px; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* --- RESPONSIVE --- */
        @media (max-width: 1200px) {
          .v-headline-area { bottom: clamp(320px, 35vh, 380px); }
          .v-heading { font-size: min(55px, 5vw); }
          .v-footer-grid { gap: 30px; }
        }

        @media (max-width: 940px) {
          .verdely-page { min-height: 1100px; }
          .v-landscape-wrapper { height: 50%; }
          .v-hill-back { top: 38%; }
          .v-hill-middle { top: 42%; }
          .v-hill-front { top: 46%; }
          
          .v-headline-area { 
            bottom: auto; 
            top: 25%; 
            transform: none !important; 
            left: 5vw;
            right: 5vw;
            max-width: none;
          }
          .v-heading span { white-space: normal; display: inline; }
          .v-heading { font-size: clamp(36px, 6vw, 50px); }
          
          .v-footer-content { left: 5vw; right: 5vw; bottom: 40px; }
          
          .v-footer-grid {
            grid-template-columns: 1fr;
            grid-template-areas: "brand" "nav" "btn";
            gap: 40px;
          }
          .v-brand-col { grid-area: brand; }
          .v-nav-col { grid-area: nav; width: 100%; }
          .v-btn-col { grid-area: btn; justify-content: flex-start; }
          .v-bottom-row { margin-left: 0; }
        }

        @media (max-width: 600px) {
          .verdely-page { min-height: 1300px; }
          .v-landscape-wrapper { height: 40%; }
          .v-landscape-img { object-position: 58% center; }
          
          .v-headline-area { top: 20%; left: 24px; right: 24px; }
          .v-heading { font-size: clamp(32px, 10vw, 42px); line-height: 1.1; }
          .v-eyebrow { margin-bottom: 12px; }
          
          .v-footer-content { left: 24px; right: 24px; bottom: 30px; }
          
          .v-footer-grid { gap: 30px; }
          .v-contact-btn { width: 100%; }
          .v-nav-col { grid-template-columns: 1fr 1fr; gap: 30px; }
          .v-nav-group:nth-child(3) { grid-column: 1 / -1; flex-direction: column; gap: 17px; }
          
          .v-bottom-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
          }
          .v-divider-line { width: 100%; }
          .v-socials { margin-left: 0; width: 100%; justify-content: space-between; }
          
          .hide-mobile { display: none; }
        }

        @media (max-width: 390px) {
          .verdely-page { min-height: 1350px; }
          .v-heading { font-size: 32px; }
          .v-nav-col { grid-template-columns: 1fr; gap: 20px; }
        }
      `}</style>

      {/* UPPER LANDSCAPE */}
      <div className="v-landscape-wrapper">
        <div className="v-sky-glow"></div>
        <img 
          src="https://cdn.pixabay.com/photo/2026/04/28/22/56/22-56-09-389_1280.png" 
          className="v-landscape-img" 
          alt="" 
        />
        <div className="v-overlay-vertical"></div>
        <div className="v-overlay-horizontal"></div>
        <div className="v-sun-glow"></div>
        
        <div className="v-mist v-mist-left"></div>
        <div className="v-mist v-mist-right"></div>
        
        <div className="v-birds-wrapper">
          <svg viewBox="0 0 100 40" className="v-bird">
            <path className="v-bird-1" d="M 0,20 Q 15,0 30,20 Q 45,0 60,20" />
            <path className="v-bird-2" d="M 0,20 Q 15,0 30,20 Q 45,0 60,20" />
            <path className="v-bird-3" d="M 0,20 Q 15,0 30,20 Q 45,0 60,20" />
          </svg>
        </div>
      </div>

      {/* FOREGROUND HILLS */}
      <div className="v-hill v-hill-back"></div>
      <div className="v-hill v-hill-middle"></div>
      <div className="v-hill v-hill-front"></div>

      {/* FLOATING LEAVES */}
      <div className="v-leaves">
        <span className="v-leaf l-1"></span>
        <span className="v-leaf l-2"></span>
        <span className="v-leaf l-3 hide-mobile"></span>
        <span className="v-leaf l-4"></span>
        <span className="v-leaf l-5"></span>
        <span className="v-leaf l-6 hide-mobile"></span>
      </div>

      {/* MAIN HEADLINE AREA */}
      <div className="v-headline-area">
        <div className="v-eyebrow">Built for tomorrow</div>
        <h2 className="v-heading">
          <span>Small ideas can</span>
          <span>grow into something</span>
          <span>extraordinary.</span>
        </h2>
      </div>

      {/* FOOTER CONTENT */}
      <div className="v-footer-content">
        <div className="v-footer-grid">
          
          <div className="v-brand-col">
            <div className="v-brand-wrap">
              <svg className="v-logo" viewBox="0 0 44 44">
                <rect x="2" y="2" width="40" height="40" rx="4" />
                <circle cx="22" cy="22" r="8" />
                <path d="M22,6 L22,14 M22,30 L22,38 M6,22 L14,22 M30,22 L38,22" />
              </svg>
              <div className="v-brand-name">IJJI MADHU VENKAT</div>
            </div>
            <div className="v-copyright">
              <div className="v-copy-main">Copyright © 2026</div>
              <div className="v-copy-sub">Make space for better ideas.</div>
            </div>
          </div>

          <div className="v-nav-col">
            <div className="v-nav-group">
              <a href="#" className="v-nav-link">Overview</a>
              <a href="#" className="v-nav-link">Our approach</a>
            </div>
            <div className="v-nav-group">
              <a href="#" className="v-nav-link">Field journal</a>
              <a href="#" className="v-nav-link">Privacy</a>
            </div>
            <div className="v-nav-group">
              <a href="#" className="v-nav-link">Community</a>
              <a href="#" className="v-nav-link">Resources</a>
            </div>
          </div>

          <div className="v-btn-col">
            <button className="v-contact-btn">
              <div className="v-btn-glow"></div>
              <span>
                START A PROJECT 
                <span className="v-btn-arrow">↗</span>
              </span>
            </button>
          </div>

        </div>

        <div className="v-bottom-row">
          <div className="v-divider-line"></div>
          <div className="v-socials">
            <a href="#" className="v-social-link">X</a>
            <a href="#" className="v-social-link">
              <svg viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            <a href="#" className="v-social-link">LinkedIn</a>
          </div>
        </div>
      </div>
    </div>
  );
}
