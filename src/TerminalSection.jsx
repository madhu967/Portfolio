import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

export default function TerminalSection() {
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  const INITIAL_TEXT = [
    { type: 'system', content: "Microsoft Windows [Version 10.0.19045.3324]" },
    { type: 'system', content: "(c) Microsoft Corporation. All rights reserved." },
    { type: 'system', content: "" },
    { type: 'input', content: "C:\\Users\\Ijji>help" },
    { type: 'output', content: "Available commands:" },
    { type: 'output', content: "  whoami      - Display current user profile" },
    { type: 'output', content: "  skills      - List technical skills and proficiencies" },
    { type: 'output', content: "  projects    - Show featured portfolio projects" },
    { type: 'output', content: "  experience  - View professional timeline" },
    { type: 'output', content: "  clear       - Clear the terminal screen" },
    { type: 'output', content: "" }
  ];

  const [history, setHistory] = useState(INITIAL_TEXT);
  const [inputValue, setInputValue] = useState("");

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    let output = [];

    switch (trimmedCmd.toLowerCase()) {
      case "help":
        output = [
          "Available commands:",
          "  whoami      - Display current user profile",
          "  skills      - List technical skills and proficiencies",
          "  projects    - Show featured portfolio projects",
          "  experience  - View professional timeline",
          "  clear       - Clear the terminal screen"
        ];
        break;
      case "whoami":
        output = [
          "Ijji Madhu Venkat",
          "Software Engineer",
          "Specializing in MERN Stack Development, AI-powered applications, and scalable web solutions."
        ];
        break;
      case "skills":
        output = [
          "Technical Proficiencies:",
          "------------------------",
          "* React.js / Node.js / Express.js",
          "* MongoDB / SQL / Firebase",
          "* Java / Data Structures & Algorithms",
          "* Bootstrap / Tailwind CSS / Framer Motion",
          "* Git / GitHub / Vercel"
        ];
        break;
      case "projects":
        output = [
          "Featured Projects:",
          "------------------------",
          "[1] SmartCity Civic Intelligence Platform",
          "    - AI-powered civic reporting system.",
          "    - Tech: React.js, Node.js, Gemini AI",
          "",
          "[2] Prescripto - Hospital Booking App",
          "    - Medical scheduling system with Stripe payments.",
          "    - Tech: React.js, MongoDB, Stripe",
          "",
          "[3] Forever - E-Commerce Platform",
          "    - Full-stack retail storefront and admin panel.",
          "    - Tech: React.js, Node.js, MongoDB, Tailwind",
          "",
          "[4] QuickBlog - AI Integrated Blog Platform",
          "    - Markdown editor with AI-assisted writing.",
          "    - Tech: React.js, Node.js, AI APIs",
          "",
          "[5] Learnova - Smart Education Platform",
          "    - Cross-platform mobile EdTech application.",
          "    - Tech: React Native, Firebase, Expo"
          /*
          "",
          "[6] Interactive Developer Portfolio",
          "    - Premium scroll-jacking gallery.",
          "    - Tech: React.js, Framer Motion"
          */
        ];
        break;
      case "experience":
        output = [
          "Professional Experience:",
          "------------------------",
          "[2026] Full Stack Developer Intern",
          "       Yubhian Technologies | Remote",
          "",
          "[2025] Frontend Developer Intern",
          "       IISPPR | Remote",
          "",
          "[2025] Teaching Assistant (Full Stack)",
          "       Vishnu Institute of Technology",
          "",
          "[2025] Student Ambassador (Web Dev)",
          "       LetsUpgrade"
        ];
        break;
      case "clear":
        setHistory([]);
        return;
      default:
        output = [
          `'${trimmedCmd}' is not recognized as an internal or external command,`,
          "operable program or batch file."
        ];
        break;
    }

    setHistory(prev => [
      ...prev,
      { type: 'input', content: `C:\\Users\\Ijji>${trimmedCmd}` },
      ...output.map(text => ({ type: 'output', content: text })),
      { type: 'output', content: "" }
    ]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(inputValue);
      setInputValue("");
    }
  };

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <section ref={containerRef} className="ts-section" onClick={() => inputRef.current && inputRef.current.focus()}>
      <div className="ts-container">
        <motion.div 
          className="ts-window"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Windows CMD Title Bar */}
          <div className="ts-titlebar">
            <div className="ts-titlebar-left">
              <svg className="ts-cmd-icon" viewBox="0 0 16 16" width="14" height="14">
                <rect x="1" y="2" width="14" height="12" fill="#000" stroke="#fff" strokeWidth="1" />
                <path d="M 4 4 L 8 7 L 4 10" stroke="#fff" strokeWidth="1" fill="none" />
                <rect x="8" y="9" width="4" height="1" fill="#fff" />
              </svg>
              <span>Command Prompt</span>
            </div>
            <div className="ts-titlebar-right">
              <div className="ts-ctrl-btn">
                <svg width="10" height="10" viewBox="0 0 10 10"><line x1="0" y1="5" x2="10" y2="5" stroke="currentColor" strokeWidth="1"/></svg>
              </div>
              <div className="ts-ctrl-btn">
                <svg width="10" height="10" viewBox="0 0 10 10"><rect x="1" y="1" width="8" height="8" stroke="currentColor" strokeWidth="1" fill="none"/></svg>
              </div>
              <div className="ts-ctrl-btn ts-close-btn">
                <svg width="10" height="10" viewBox="0 0 10 10"><line x1="1" y1="1" x2="9" y2="9" stroke="currentColor" strokeWidth="1"/><line x1="9" y1="1" x2="1" y2="9" stroke="currentColor" strokeWidth="1"/></svg>
              </div>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="ts-body" ref={bodyRef}>
            {history.map((item, idx) => (
              <div key={idx} className="ts-line">
                {item.content}
              </div>
            ))}

            <div className="ts-input-line">
              <span className="ts-prompt">C:\Users\Ijji&gt;</span>
              <input 
                ref={inputRef}
                type="text" 
                className="ts-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                spellCheck="false"
              />
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .ts-section {
          width: 100%;
          padding: 80px 5vw;
          background-color: #fbfbfb; /* Matches main site background */
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          z-index: 10;
        }

        .ts-container {
          width: 100%;
          max-width: 900px;
        }

        .ts-window {
          background-color: #0c0c0c; /* Windows CMD Black */
          border: 1px solid #333333;
          box-shadow: 0 20px 50px rgba(0,0,0,0.2);
          overflow: hidden;
          font-family: 'Consolas', 'Courier New', monospace;
        }

        .ts-titlebar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 32px;
          background-color: #0c0c0c; /* Dark titlebar */
          border-bottom: 1px solid #333;
          user-select: none;
        }

        .ts-titlebar-left {
          display: flex;
          align-items: center;
          padding-left: 8px;
          color: #ffffff;
          font-size: 12px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .ts-cmd-icon {
          margin-right: 8px;
        }

        .ts-titlebar-right {
          display: flex;
          height: 100%;
        }

        .ts-ctrl-btn {
          width: 46px;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          cursor: default;
          transition: background 0.1s;
        }

        .ts-ctrl-btn:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }

        .ts-close-btn:hover {
          background-color: #e81123 !important;
          color: #ffffff;
        }

        .ts-body {
          padding: 8px;
          color: #cccccc; /* Standard CMD grey/white text */
          font-size: 14px;
          line-height: 1.4;
          height: 400px;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: #4a4a4a #0c0c0c;
        }

        .ts-body::-webkit-scrollbar {
          width: 12px;
        }

        .ts-body::-webkit-scrollbar-track {
          background: #0c0c0c;
        }

        .ts-body::-webkit-scrollbar-thumb {
          background: #4a4a4a;
          border: 3px solid #0c0c0c;
        }

        .ts-line {
          white-space: pre-wrap;
          word-break: break-word;
        }

        .ts-input-line {
          display: flex;
          align-items: center;
        }

        .ts-prompt {
          color: #cccccc;
          margin-right: 8px;
        }

        .ts-input {
          flex: 1;
          background: transparent;
          border: none;
          color: #cccccc;
          font-family: 'Consolas', 'Courier New', monospace;
          font-size: 14px;
          outline: none;
          caret-color: #cccccc;
        }

        @media (max-width: 600px) {
          .ts-section {
            padding: 60px 24px;
          }
          .ts-body {
            height: 350px;
            font-size: 12px;
          }
          .ts-input {
            font-size: 12px;
          }
        }
      `}</style>
    </section>
  );
}
