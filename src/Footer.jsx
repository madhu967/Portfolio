import React from 'react';

export default function Footer() {
  return (
    <footer className="footer-container">
      <style>{`
        .footer-container {
          background-color: #000000;
          color: #ffffff;
          font-family: 'Space Mono', monospace;
          overflow: hidden;
          position: relative;
        }

        .footer-top {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 2fr;
          gap: 40px;
          padding: 80px 5vw;
        }

        .footer-brand {
          font-family: 'Playfair Display', serif;
          font-size: 32px;
          font-weight: 600;
          letter-spacing: -0.01em;
          text-transform: uppercase;
        }
        
        .footer-brand span {
          font-size: 12px;
          vertical-align: top;
          margin-left: 2px;
        }

        .footer-nav-col h4 {
          font-size: 16px;
          font-weight: 700;
          margin: 0 0 20px 0;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .footer-nav-col ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .footer-nav-col li a {
          color: #a3a3a3;
          text-decoration: none;
          font-size: 15px;
          font-weight: 400;
          transition: color 0.2s ease;
        }

        .footer-nav-col li a:hover {
          color: #ffffff;
        }

        .footer-nav-col.white-links li a {
          color: #ffffff;
          font-weight: 600;
        }

        /* Giant Marquee */
        .footer-marquee-wrapper {
          padding: 20px 0 40px;
          overflow: hidden;
          display: flex;
          white-space: nowrap;
          position: relative;
        }

        .footer-marquee {
          display: inline-block;
          font-size: clamp(60px, 11vw, 150px);
          font-family: 'Oswald', sans-serif;
          font-weight: 900;
          font-style: italic;
          color: transparent;
          -webkit-text-stroke: 1.5px #ffffff;
          text-transform: uppercase;
          line-height: 1;
          letter-spacing: 0.02em;
          animation: marquee-scroll 15s linear infinite;
          padding-right: 50px;
        }

        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 30px 5vw;
          border-top: 1px solid rgba(255, 255, 255, 0.15);
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #a3a3a3;
        }

        .footer-bottom b {
          color: #ffffff;
          font-weight: 700;
        }

        @media (max-width: 900px) {
          .footer-top {
            grid-template-columns: 1fr;
            gap: 40px;
            padding: 60px 5vw 20px;
          }
          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
        }
      `}</style>

      {/* TOP NAVIGATION GRID */}
      <div className="footer-top">
        <div className="footer-brand">
          IJJI MADHU VENKAT<span>®</span>
        </div>

        <div className="footer-nav-col white-links">
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Gallery</a></li>
          </ul>
        </div>

        <div className="footer-nav-col">
          <h4>Works</h4>
          <ul>
            <li><a href="#">Organica</a></li>
            <li><a href="#">Altroz</a></li>
            <li><a href="#">Pelviease</a></li>
            <li><a href="#">Psyshell</a></li>
          </ul>
        </div>

        <div className="footer-nav-col">
          <h4>Contact</h4>
          <ul>
            <li><a href="#">LinkedIn</a></li>
            <li><a href="#">hello@ijjimadhuvenkat.com</a></li>
            <li><a href="#">+91 9603204860</a></li>
          </ul>
        </div>
      </div>

      {/* GIANT OUTLINE MARQUEE */}
      <div className="footer-marquee-wrapper">
        <div className="footer-marquee">
          LET'S CONNECT — LET'S CONNECT —
        </div>
        <div className="footer-marquee">
          LET'S CONNECT — LET'S CONNECT —
        </div>
      </div>

      {/* BOTTOM LEGAL BAR */}
      <div className="footer-bottom">
        <div>
          © IJJI MADHU VENKAT /<br />
          ALL RIGHTS RESERVED
        </div>
        <div>
          DESIGN BY <b>IJJI MADHU VENKAT</b>
        </div>
      </div>
    </footer>
  );
}
