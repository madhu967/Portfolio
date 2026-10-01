import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const imgYubhian = '/certificates/cert5.png';
const imgIISDPR = '/certificates/cert6.png';
const imgVishnu = '/certificates/cert7.png';
const imgLetsUpgrade = '/certificates/cert8.png';

const timelineData = [
  {
    year: '2026',
    title: 'Full Stack Developer Intern',
    subtitle: 'Yubhian Technologies | Remote',
    description: 'Engineered 3 full-stack MERN applications with JWT authentication, reducing API latency by 20% through optimized data validation. Accelerated frontend load times by 30% using React lazy loading and code-splitting.',
    image: imgYubhian
  },
  {
    year: '2025',
    title: 'Frontend Developer Intern',
    subtitle: 'IISPPR | Remote',
    description: 'Architected modular UI components using React.js and Tailwind, enhancing cross-device responsiveness and accessibility. Debugged production UI inconsistencies during Agile sprints, reducing bug volume by 15%.',
    image: imgIISDPR
  },
  {
    year: '2025',
    title: 'Teaching Assistant (Full Stack)',
    subtitle: 'Vishnu Institute of Technology',
    description: 'Mentored 60+ students in full-stack architecture through code reviews, improving project completion rates by 25%.',
    image: imgVishnu
  },
  {
    year: '2025',
    title: 'Student Ambassador (Web Dev)',
    subtitle: 'LetsUpgrade',
    description: 'Delivered workshops on React.js, Next.js, and TypeScript to 50+ students.',
    image: imgLetsUpgrade
  }
];

const TimelineItem = ({ item, index }) => {
  const itemRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "center center"]
  });

  const { scrollYProgress: exitProgress } = useScroll({
    target: itemRef,
    offset: ["center center", "end start"]
  });

  const isEven = index % 2 === 0;

  // Animations for entering
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [0, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  
  // Parallax for the image
  const imgY = useTransform(scrollYProgress, [0, 1], [-50, 0]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);

  // Dynamic line drawing
  const lineHeight = useTransform(scrollYProgress, [0.3, 1], ["0%", "100%"]);

  return (
    <div ref={itemRef} className={`tl-item ${isEven ? 'tl-even' : 'tl-odd'}`}>
      
      {/* Center Line Container */}
      <div className="tl-center-axis">
        <div className="tl-dot-outer">
          <motion.div 
            className="tl-dot-inner"
            style={{ scale: scrollYProgress, opacity }}
          />
        </div>
        <motion.div 
          className="tl-line-fill"
          style={{ height: lineHeight }}
        />
      </div>

      <div className="tl-content-wrapper">
        <motion.div 
          className="tl-text-content"
          style={{ opacity, y }}
        >
          <div className="tl-year">{item.year}</div>
          <h3 className="tl-title">{item.title}</h3>
          <div className="tl-subtitle">{item.subtitle}</div>
          <p className="tl-desc">{item.description}</p>
        </motion.div>

        <motion.div 
          className="tl-image-wrapper"
          style={{ opacity, y }}
        >
          <div className="tl-image-overflow">
            <motion.img 
              src={item.image} 
              alt={item.title} 
              className="tl-image"
            />
            <div className="tl-image-overlay" />
          </div>
        </motion.div>
      </div>

    </div>
  );
};

export default function Timeline() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={containerRef} className="tl-section">
      <style>{`
        .tl-section {
          background-color: #f4f1ea;
          padding: 8rem 2rem 10rem;
          font-family: 'Space Mono', monospace;
          color: #171717;
          overflow: hidden;
          position: relative;
        }

        .tl-header {
          text-align: center;
          margin-bottom: 8rem;
          position: relative;
          z-index: 2;
        }

        .tl-header-kicker {
          font-size: 0.85rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #ea580c;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .tl-header-title {
          font-family: 'Spectral', serif;
          font-size: clamp(3rem, 6vw, 5rem);
          font-weight: 300;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin: 0;
        }

        .tl-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
        }

        /* Continuous Background Line */
        .tl-bg-line {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 1px;
          background: rgba(23, 23, 23, 0.1);
          transform: translateX(-50%);
          z-index: 0;
        }

        .tl-item {
          display: flex;
          justify-content: center;
          position: relative;
          min-height: 60vh;
          margin-bottom: 4rem;
        }

        .tl-center-axis {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          transform: translateX(-50%);
          z-index: 5;
        }

        .tl-line-fill {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          background: #ea580c;
          transform-origin: top center;
        }

        .tl-dot-outer {
          position: absolute;
          top: 30%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #f4f1ea;
          border: 1px solid rgba(23, 23, 23, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 6;
        }

        .tl-dot-inner {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #ea580c;
        }

        .tl-content-wrapper {
          display: flex;
          width: 100%;
          justify-content: space-between;
          align-items: center;
          gap: 6rem;
          padding-top: 20vh;
        }

        .tl-even .tl-content-wrapper {
          flex-direction: row-reverse;
        }

        .tl-text-content {
          width: calc(50% - 3rem);
          position: relative;
          padding: 0 2rem;
        }

        .tl-even .tl-text-content {
          text-align: right;
        }

        .tl-year {
          font-family: 'Spectral', serif;
          font-size: clamp(3rem, 5vw, 6rem);
          font-weight: 200;
          font-style: italic;
          color: rgba(23, 23, 23, 0.1);
          line-height: 1;
          margin-bottom: -1rem;
          position: relative;
          z-index: -1;
        }

        .tl-title {
          font-family: 'Spectral', serif;
          font-size: clamp(2rem, 3vw, 3rem);
          font-weight: 600;
          color: #171717;
          margin: 0 0 0.5rem;
          letter-spacing: -0.02em;
        }

        .tl-subtitle {
          font-size: 0.9rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #ea580c;
          font-weight: 700;
          margin-bottom: 1.5rem;
        }

        .tl-desc {
          font-size: 1.05rem;
          line-height: 1.7;
          color: rgba(23, 23, 23, 0.7);
          max-width: 400px;
        }

        .tl-even .tl-desc {
          margin-left: auto;
        }

        .tl-image-wrapper {
          width: calc(50% - 3rem);
          display: flex;
          justify-content: center;
        }

        .tl-even .tl-image-wrapper {
          justify-content: flex-start;
        }
        
        .tl-odd .tl-image-wrapper {
          justify-content: flex-end;
        }

        .tl-image-overflow {
          width: 100%;
          max-width: 450px;
          aspect-ratio: 3/4;
          overflow: hidden;
          position: relative;
          border-radius: 4px;
        }

        .tl-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          position: absolute;
          top: 0;
          left: 0;
        }

        .tl-image-overlay {
          display: none;
        }

        @media (max-width: 860px) {
          .tl-bg-line, .tl-center-axis {
            left: 20px;
            transform: none;
          }
          .tl-dot-outer {
            left: 20px;
            transform: translate(-50%, -50%);
          }
          .tl-content-wrapper {
            flex-direction: column !important;
            gap: 2rem;
            padding-left: 50px;
            padding-top: 10vh;
            align-items: flex-start;
          }
          .tl-text-content, .tl-image-wrapper {
            width: 100%;
            padding: 0;
            text-align: left !important;
          }
          .tl-desc {
            margin-left: 0 !important;
          }
          .tl-image-overflow {
            max-width: 100%;
            aspect-ratio: 16/9;
          }
        }
      `}</style>

      <div className="tl-header">
        <motion.div 
          className="tl-header-kicker"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          The Journey
        </motion.div>
        <motion.h2 
          className="tl-header-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Evolution of Design
        </motion.h2>
      </div>

      <div className="tl-container">
        <div className="tl-bg-line" />
        
        {timelineData.map((item, i) => (
          <TimelineItem key={i} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
