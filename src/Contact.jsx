import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Contact() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const [status, setStatus] = useState("idle");

  // Social icons
  const socials = [
    { name: 'GitHub', url: 'https://github.com/madhu967', color: '#181717', icon: <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.113.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/> },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/madhu-venkat-ijji-114138290', color: '#0A66C2', icon: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/> },
    { name: 'Instagram', url: '#', color: '#E4405F', icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/> },
    { name: 'LeetCode', url: 'https://leetcode.com/u/Ijji_Madhu_venkat/', color: '#FFA116', icon: <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038l-10.1 10.101c-.981.982-1.497 2.337-1.497 3.764s.516 2.768 1.497 3.765l4.319 4.38c.981.981 2.338 1.516 3.765 1.516s2.784-.516 3.764-1.498l2.697-2.606c.514-.515.498-1.367-.037-1.901-.536-.535-1.387-.553-1.902-.039z"/> }
  ];

  const inputStyles = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(23,23,23,0.3)',
    borderRadius: 0,
    padding: '1rem 0',
    fontSize: '1rem',
    fontFamily: '"Space Mono", monospace',
    color: '#171717',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  };

  return (
    <section ref={containerRef} className="ct-section">
      <div className="ct-container">
        
        {/* Left Side: Editorial Typography & Socials */}
        <motion.div 
          className="ct-left"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="ct-heading-wrapper">
            <span className="ct-kicker">06 // COLLABORATE</span>
            <h2 className="ct-title">
              Let's build<br/>
              <span className="ct-italic">the future</span>
            </h2>
            <p className="ct-desc">
              Open for opportunities, creative collaborations, or just a chat about code and design. 
              Reach out and let's craft something exceptional together.
            </p>
          </div>


          
          <div className="ct-contact-info">
            <a href="mailto:hello@madhuvenkat.com" className="ct-email-link">ijji.madhuvenkat@gmail.com</a>
          </div>
        </motion.div>

        {/* Right Side: The Minimal Form */}
        <motion.div 
          className="ct-right"
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {/* Animated Mini Lines (Top-Right & Bottom-Left Corners) */}
          <motion.div 
            style={{ position: 'absolute', top: 0, right: 0, height: '3px', background: '#ea580c' }}
            initial={{ width: 0, opacity: 0 }}
            animate={isInView ? { width: 80, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          />
          <motion.div 
            style={{ position: 'absolute', top: 0, right: 0, width: '3px', background: '#ea580c' }}
            initial={{ height: 0, opacity: 0 }}
            animate={isInView ? { height: 80, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          />
          
          <motion.div 
            style={{ position: 'absolute', bottom: 0, left: 0, height: '3px', background: '#ea580c' }}
            initial={{ width: 0, opacity: 0 }}
            animate={isInView ? { width: 80, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          />
          <motion.div 
            style={{ position: 'absolute', bottom: 0, left: 0, width: '3px', background: '#ea580c' }}
            initial={{ height: 0, opacity: 0 }}
            animate={isInView ? { height: 80, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          />
          <form className="ct-form" onSubmit={async (e) => {
            e.preventDefault();
            setStatus("submitting");
            const formData = new FormData(e.target);
            
            // WEB3FORMS CONFIGURATION
            formData.append("access_key", "44ed2d64-9616-4f54-8a08-6148e7b27e10");
            formData.append("from_name", "Portfolio Contact Form");

            try {
              const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
              });
              const data = await res.json();
              if (data.success) {
                setStatus("success");
                e.target.reset();
                setTimeout(() => setStatus("idle"), 5000);
              } else {
                setStatus("error");
                console.error(data);
                setTimeout(() => setStatus("idle"), 5000);
              }
            } catch (err) {
              setStatus("error");
              setTimeout(() => setStatus("idle"), 5000);
            }
          }}>
            <div className="ct-input-group">
              <input type="text" name="name" placeholder="What's your name?" style={inputStyles} required />
              <div className="ct-focus-line"></div>
            </div>
            
            <div className="ct-input-group">
              <input type="email" name="email" placeholder="Your email address" style={inputStyles} required />
              <div className="ct-focus-line"></div>
            </div>
            
            <div className="ct-input-group">
              <input type="text" name="subject" placeholder="Subject" style={inputStyles} required />
              <div className="ct-focus-line"></div>
            </div>

            <div className="ct-input-group" style={{ marginTop: '1rem' }}>
              <textarea 
                name="message"
                placeholder="Tell me about your project..." 
                style={{...inputStyles, minHeight: '120px', resize: 'vertical'}} 
                required 
              />
              <div className="ct-focus-line"></div>
            </div>

            <motion.button 
              type="submit"
              className="ct-submit-btn"
              whileHover={status === "submitting" ? {} : { scale: 1.02 }}
              whileTap={status === "submitting" ? {} : { scale: 0.98 }}
              disabled={status === "submitting"}
              style={{ opacity: status === "submitting" ? 0.7 : 1, cursor: status === "submitting" ? 'wait' : 'pointer' }}
            >
              <span className="ct-btn-text">
                {status === "submitting" ? "Sending..." : status === "success" ? "Message Sent!" : status === "error" ? "Error! Try Again" : "Send Message"}
              </span>
              {status !== "submitting" && status !== "success" && (
                <svg className="ct-btn-arrow" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              )}
            </motion.button>
          </form>

          <div className="ct-socials-bottom">
            {socials.map((social, i) => (
              <motion.a 
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="ct-social-link"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + (i * 0.1) }}
                whileHover={{ y: -5, color: social.color, borderColor: social.color, boxShadow: `0 8px 20px ${social.color}30` }}
                title={social.name}
              >
                <svg viewBox="0 0 24 24" width="28" height="28" fill={social.color}>
                  {social.icon}
                </svg>
              </motion.a>
            ))}
          </div>
        </motion.div>

      </div>

      <style>{`
        .ct-section {
          width: 100%;
          min-height: 100vh;
          background: #fbfbfb;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6rem 2rem;
          box-sizing: border-box;
          position: relative;
          z-index: 10;
        }

        .ct-container {
          max-width: 1200px;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 6rem;
        }

        .ct-left {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .ct-kicker {
          font-family: 'Space Mono', monospace;
          font-size: 0.9rem;
          letter-spacing: 0.2em;
          color: #ea580c;
          font-weight: 600;
          display: block;
          margin-bottom: 2rem;
        }

        .ct-title {
          font-family: 'Playfair Display', serif;
          font-size: 5.5rem;
          line-height: 1.1;
          color: #171717;
          margin: 0 0 2rem 0;
          font-weight: 500;
        }

        .ct-italic {
          font-style: italic;
          color: #555;
        }

        .ct-desc {
          font-family: 'Space Mono', monospace;
          font-size: 1.1rem;
          line-height: 1.6;
          color: rgba(23,23,23,0.7);
          max-width: 450px;
          margin-bottom: 4rem;
        }

        .ct-socials-bottom {
          display: flex;
          gap: 1.5rem;
          margin-top: 3rem;
          justify-content: center;
        }

        .ct-social-link {
          color: #171717;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 1px solid rgba(23,23,23,0.1);
          background: #fff;
          transition: all 0.3s ease;
          cursor: pointer;
        }



        .ct-email-link {
          font-family: 'Space Mono', monospace;
          font-size: 1.2rem;
          color: #171717;
          text-decoration: none;
          position: relative;
          display: inline-block;
          font-weight: 500;
        }

        .ct-email-link::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 2px;
          bottom: -4px;
          left: 0;
          background-color: #ea580c;
          transform: scaleX(0);
          transform-origin: bottom right;
          transition: transform 0.4s cubic-bezier(0.86, 0, 0.07, 1);
        }

        .ct-email-link:hover::after {
          transform: scaleX(1);
          transform-origin: bottom left;
        }

        .ct-right {
          flex: 1;
          max-width: 550px;
          width: 100%;
          background: #ffffff;
          padding: 4rem;
          border-radius: 2px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.03);
          position: relative;
        }

        .ct-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .ct-input-group {
          position: relative;
        }

        .ct-input-group input:focus, .ct-input-group textarea:focus {
          border-bottom-color: transparent !important;
        }

        .ct-input-group input::placeholder, .ct-input-group textarea::placeholder {
          color: rgba(23,23,23,0.4);
        }

        .ct-focus-line {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: #ea580c;
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.4s ease;
        }

        .ct-input-group input:focus ~ .ct-focus-line,
        .ct-input-group textarea:focus ~ .ct-focus-line {
          transform: scaleX(1);
        }

        .ct-submit-btn {
          margin-top: 2rem;
          background: #171717;
          color: #fff;
          border: none;
          padding: 1.2rem 2.5rem;
          font-family: 'Space Mono', monospace;
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          border-radius: 2px;
          transition: background 0.3s ease;
        }

        .ct-submit-btn:hover {
          background: #ea580c;
        }

        .ct-btn-arrow {
          transition: transform 0.3s ease;
        }

        .ct-submit-btn:hover .ct-btn-arrow {
          transform: translateX(5px);
        }

        @media (max-width: 1024px) {
          .ct-container {
            gap: 4rem;
          }
          .ct-title {
            font-size: 4rem;
          }
          .ct-right {
            padding: 3rem;
          }
        }

        @media (max-width: 768px) {
          .ct-section {
            padding: 5rem 1.5rem;
          }
          .ct-container {
            flex-direction: column;
            gap: 4rem;
          }
          .ct-left {
            align-items: center;
            text-align: center;
          }
          .ct-title {
            font-size: 3.5rem;
          }
          .ct-desc {
            margin: 0 auto 2rem auto;
          }
          .ct-socials-bottom {
            margin-top: 2rem;
          }
          .ct-right {
            padding: 2.5rem;
            max-width: 100%;
          }
        }

        @media (max-width: 480px) {
          .ct-section {
            padding: 4rem 1rem;
          }
          .ct-title {
            font-size: 2.5rem;
          }
          .ct-desc {
            font-size: 0.95rem;
          }
          .ct-right {
            padding: 2rem 1.2rem;
          }
          .ct-social-link {
            width: 44px;
            height: 44px;
          }
          .ct-socials-bottom {
            gap: 1rem;
          }
        }
      `}</style>
    </section>
  );
}
