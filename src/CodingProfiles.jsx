"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion, useInView } from "framer-motion";

export default function CodingProfiles() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  const [lcStats, setLcStats] = useState(null);
  const [lcCalendar, setLcCalendar] = useState(null);
  const [ghStats, setGhStats] = useState(null);
  const [ghHeatmapData, setGhHeatmapData] = useState(null);

  useEffect(() => {
    // Fetch real Leetcode Solved Stats
    fetch("https://alfa-leetcode-api.onrender.com/Ijji_Madhu_venkat/solved")
      .then(res => {
        if (!res.ok) throw new Error("429");
        return res.json();
      })
      .then(data => setLcStats(data))
      .catch(() => setLcStats("RATE_LIMITED"));

    // Fetch real Leetcode Calendar Heatmap Stats
    fetch("https://alfa-leetcode-api.onrender.com/Ijji_Madhu_venkat/calendar")
      .then(res => {
        if (!res.ok) throw new Error("429");
        return res.json();
      })
      .then(data => setLcCalendar(data))
      .catch(() => setLcCalendar("RATE_LIMITED"));

    // Fetch real GitHub Profile Stats
    fetch("https://api.github.com/users/madhu967")
      .then(res => res.json())
      .then(data => setGhStats(data))
      .catch(console.error);
  }, []);

  // Process LeetCode Calendar into a 52x7 matrix for the heatmap
  const lcHeatmapData = useMemo(() => {
    if (!lcCalendar || !lcCalendar.submissionCalendar) return null;
    try {
      const subCal = JSON.parse(lcCalendar.submissionCalendar);
      const timestamps = Object.keys(subCal).map(Number).sort((a, b) => b - a);
      const maxDay = timestamps.length > 0 ? timestamps[0] : Math.floor(Date.now() / 1000);
      
      const weeks = [];
      let currentDay = maxDay - (52 * 7 * 86400); 
      
      for (let w = 0; w < 52; w++) {
        const week = [];
        for (let d = 0; d < 7; d++) {
          currentDay += 86400;
          let count = 0;
          for (const ts of timestamps) {
            // Find closest midnight timestamp (within 12 hours to account for timezone drift)
             if (Math.abs(ts - currentDay) < 43200) {
                count = subCal[ts];
                break;
             }
          }
          let level = 0;
          if (count > 0) level = 1;
          if (count > 2) level = 2;
          if (count > 5) level = 3;
          if (count > 10) level = 4;
          week.push(level);
        }
        weeks.push(week);
      }
      return weeks;
    } catch (e) {
      return null;
    }
  }, [lcCalendar]);

  const getHeatmapColor = (level) => {
    switch (level) {
      case 1: return "#9be9a8";
      case 2: return "#40c463";
      case 3: return "#30a14e";
      case 4: return "#216e39";
      default: return "#ebedf0"; // Empty
    }
  };

  const ProgressRing = ({ label, solved, total, color, delay }) => {
    const radius = 35;
    const circumference = 2 * Math.PI * radius;
    const safeTotal = total || 1;
    const strokeDashoffset = circumference - ((solved || 0) / safeTotal) * circumference;

    return (
      <div className="cp-ring-container">
        <svg width="90" height="90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={radius} stroke="#ebedf0" strokeWidth="6" fill="none" />
          <motion.circle
            cx="50" cy="50" r={radius}
            stroke={color} strokeWidth="6" fill="none" strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset } : {}}
            transition={{ duration: 1.5, delay, ease: "easeOut" }}
            style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
          />
        </svg>
        <div className="cp-ring-text">
          <span className="cp-ring-solved">{solved || 0}</span>
        </div>
        <div className="cp-ring-label">{label}</div>
      </div>
    );
  };

  return (
    <section className="cp-section" ref={ref}>
      <div className="cp-container">
        
        {/* Header */}
        <motion.div 
          className="cp-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h4 className="cp-kicker">Syntax & Logic</h4>
          <h2 className="cp-title">The Engineering Profile</h2>
          <p className="cp-desc">A deep dive into algorithmic problem-solving and open-source contributions. Real-time metrics behind the code.</p>
        </motion.div>

        <div className="cp-grid">
          
          {/* LEETCODE CARD */}
          <motion.div 
            className="cp-card cp-leetcode"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="cp-card-header">
              <div className="cp-card-title">
                {/* LeetCode Official Brand Color: #ffa116 */}
                <svg viewBox="0 0 24 24" width="24" height="24" fill="#ffa116"><path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038l-10.1 10.101c-.981.982-1.497 2.337-1.497 3.834s.516 2.852 1.497 3.835l4.359 4.387c.981.981 2.31 1.497 3.835 1.497s2.854-.516 3.835-1.497l2.609-2.636c.514-.516.498-1.366-.037-1.901-.536-.535-1.387-.552-1.902-.038z"/></svg>
                <h3>LeetCode</h3>
              </div>
              <a href="https://leetcode.com/u/Ijji_Madhu_venkat/" target="_blank" rel="noreferrer" className="cp-card-link" style={{color: '#ffa116'}}>@Ijji_Madhu_venkat</a>
            </div>

            <div className="cp-card-content-split">
              <div className="cp-stats-row">
                <div className="cp-stat-box">
                  <span className="cp-stat-val">
                    {lcStats === "RATE_LIMITED" ? "—" : (lcStats ? lcStats.solvedProblem : "...")}
                  </span>
                  <span className="cp-stat-label">Problems Solved</span>
                </div>
                <div className="cp-stat-box">
                  <span className="cp-stat-val">
                    {lcCalendar === "RATE_LIMITED" ? "—" : (lcCalendar ? lcCalendar.streak : "...")}
                    <span style={{fontSize: '1rem'}}>&nbsp;Days</span>
                  </span>
                  <span className="cp-stat-label">Max Streak</span>
                </div>
              </div>

              <div className="cp-rings-wrapper">
                <ProgressRing 
                  label="Easy" 
                  solved={lcStats === "RATE_LIMITED" ? 0 : lcStats?.easySolved} 
                  total={820} 
                  color="#00b8a3" delay={0.4} 
                />
                <ProgressRing 
                  label="Medium" 
                  solved={lcStats === "RATE_LIMITED" ? 0 : lcStats?.mediumSolved} 
                  total={1740} 
                  color="#ffc01e" delay={0.6} 
                />
                <ProgressRing 
                  label="Hard" 
                  solved={lcStats === "RATE_LIMITED" ? 0 : lcStats?.hardSolved} 
                  total={760} 
                  color="#ff375f" delay={0.8} 
                />
              </div>
            </div>

            {/* LEETCODE HEATMAP */}
            <div className="cp-heatmap-wrapper" style={{ marginTop: '2.5rem' }}>
              <span className="cp-heatmap-label">LeetCode Activity Matrix</span>
              {lcCalendar === "RATE_LIMITED" ? (
                <div style={{height: 90, display: 'flex', alignItems: 'center', opacity: 0.8}}>
                  <span className="cp-stat-label" style={{color: '#ea580c'}}>API Rate Limited (429) — Please wait a few minutes and refresh.</span>
                </div>
              ) : lcHeatmapData ? (
                <div className="cp-heatmap">
                  {lcHeatmapData.map((week, wIdx) => (
                    <div key={wIdx} className="cp-hm-col">
                      {week.map((level, dIdx) => (
                        <motion.div 
                          key={dIdx} 
                          className="cp-hm-cell"
                          initial={{ backgroundColor: "#ebedf0", scale: 0.8 }}
                          animate={isInView ? { backgroundColor: getHeatmapColor(level), scale: 1 } : {}}
                          transition={{ duration: 0.5, delay: 0.6 + (wIdx * 0.015) + (dIdx * 0.02) }}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{height: 90, display: 'flex', alignItems: 'center', opacity: 0.5}}>
                  <span className="cp-stat-label">Syncing live algorithms...</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* GITHUB CARD */}
          <motion.div 
            className="cp-card cp-github"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <div className="cp-card-header">
              <div className="cp-card-title">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="#24292e"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.113.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                <h3>GitHub</h3>
              </div>
              <a href="https://github.com/madhu967" target="_blank" rel="noreferrer" className="cp-card-link" style={{color: '#24292e'}}>@madhu967</a>
            </div>

            <div className="cp-card-content-split">
              <div className="cp-stats-row">
                <div className="cp-stat-box">
                  <span className="cp-stat-val">
                    {ghStats ? ghStats.followers : "..."}
                  </span>
                  <span className="cp-stat-label">Followers</span>
                </div>
                <div className="cp-stat-box">
                  <span className="cp-stat-val">
                    {ghStats ? ghStats.public_repos : "..."}
                  </span>
                  <span className="cp-stat-label">Public Repositories</span>
                </div>
              </div>
            </div>

            {/* REAL GITHUB HEATMAP IMAGE API */}
            <div className="cp-heatmap-wrapper" style={{ marginTop: '2.5rem' }}>
              <span className="cp-heatmap-label">GitHub Contributions</span>
              <div style={{ width: '100%', overflowX: 'auto', paddingBottom: '0.5rem', textAlign: 'left' }}>
                <img 
                  src="https://ghchart.rshah.org/madhu967" 
                  alt="Github Heatmap" 
                  style={{ 
                    opacity: isInView ? 1 : 0, 
                    transition: 'opacity 1.5s ease 0.6s',
                    maxWidth: '100%',
                    display: 'block',
                    margin: '0 auto'
                  }} 
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      <style>{`
        .cp-section {
          width: 100%;
          background: #ffffff;
          padding: 8rem 2rem;
          position: relative;
          z-index: 10;
        }

        .cp-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .cp-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .cp-kicker {
          font-family: 'Poppins', sans-serif;
          font-size: 0.85rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #ea580c;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .cp-title {
          font-family: 'Playfair', serif;
          font-size: clamp(2.5rem, 4vw, 3.5rem);
          font-weight: 500;
          color: #171717;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin: 0 0 1rem;
        }

        .cp-desc {
          font-family: 'Poppins', sans-serif;
          font-size: 1.05rem;
          color: rgba(23, 23, 23, 0.6);
          max-width: 600px;
          margin: 0 auto;
        }

        .cp-grid {
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }

        .cp-card {
          background: #ffffff;
          border-radius: 24px;
          padding: 2.5rem 3rem;
          box-shadow: 0 20px 40px rgba(0,0,0,0.03), 0 1px 3px rgba(0,0,0,0.02);
          display: flex;
          flex-direction: column;
          border: 1px solid rgba(23,23,23,0.04);
          overflow: hidden;
        }

        .cp-card-content-split {
          display: flex;
          align-items: center;
          gap: 4rem;
          margin-bottom: 0;
        }

        .cp-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid rgba(23,23,23,0.06);
        }

        .cp-card-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .cp-card-title h3 {
          font-family: 'Poppins', sans-serif;
          font-size: 1.3rem;
          font-weight: 600;
          color: #171717;
          margin: 0;
        }

        .cp-card-link {
          font-family: 'Poppins', sans-serif;
          font-size: 0.85rem;
          color: #ea580c;
          text-decoration: none;
          font-weight: 500;
          transition: opacity 0.2s;
        }
        .cp-card-link:hover { opacity: 0.7; }

        .cp-stats-row {
          display: flex;
          gap: 3rem;
        }

        .cp-stat-box {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .cp-stat-val {
          font-family: 'Playfair', serif;
          font-size: 2.8rem;
          font-weight: 700;
          color: #171717;
          line-height: 1;
          letter-spacing: -0.03em;
        }

        .cp-stat-label {
          font-family: 'Poppins', sans-serif;
          font-size: 0.85rem;
          color: rgba(23, 23, 23, 0.5);
          font-weight: 500;
        }

        /* Leetcode Rings */
        .cp-rings-wrapper {
          display: flex;
          gap: 2rem;
          margin-left: auto;
        }

        .cp-ring-container {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .cp-ring-text {
          position: absolute;
          top: 45px;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .cp-ring-solved {
          font-family: 'Poppins', sans-serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: #171717;
        }

        .cp-ring-label {
          font-family: 'Poppins', sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          color: rgba(23, 23, 23, 0.6);
        }

        /* Github Heatmap */
        .cp-heatmap-wrapper {
          margin-top: auto;
          max-width: 100%;
        }

        .cp-heatmap-label {
          display: block;
          font-family: 'Poppins', sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          color: rgba(23, 23, 23, 0.8);
          margin-bottom: 1rem;
        }

        .cp-heatmap {
          display: flex;
          gap: 2px;
          justify-content: center;
          width: 100%;
          min-width: 0;
          overflow-x: auto;
          padding-bottom: 0.5rem;
          scrollbar-width: thin;
          scrollbar-color: rgba(23,23,23,0.1) transparent;
        }
        .cp-heatmap::-webkit-scrollbar { height: 4px; }
        .cp-heatmap::-webkit-scrollbar-track { background: transparent; }
        .cp-heatmap::-webkit-scrollbar-thumb { background: rgba(23,23,23,0.1); border-radius: 4px; }

        .cp-hm-col {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .cp-hm-cell {
          width: 10px;
          height: 10px;
          border-radius: 2px;
        }

        .cp-heatmap-legend {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 1rem;
          font-family: 'DM Mono', monospace;
          font-size: 0.75rem;
          color: rgba(23, 23, 23, 0.5);
          justify-content: flex-end;
        }

        @media (max-width: 960px) {
          .cp-section {
            padding: 5rem 1.5rem;
          }
          .cp-card {
            padding: 2rem 1.5rem;
          }
          .cp-card-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          .cp-card-link {
            word-break: break-all;
          }
          .cp-card-content-split {
            flex-direction: column;
            align-items: flex-start;
            gap: 2.5rem;
          }
          .cp-rings-wrapper {
            margin-left: 0;
            width: 100%;
            justify-content: center;
            flex-wrap: wrap;
            gap: 1.5rem;
          }
          .cp-heatmap {
            justify-content: flex-start;
          }
          .cp-stats-row {
            gap: 2rem;
          }
          .cp-stat-val {
            font-size: 2rem;
          }
        }
      `}</style>
    </section>
  );
}
