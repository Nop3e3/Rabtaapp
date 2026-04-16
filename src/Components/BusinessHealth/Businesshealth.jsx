import React, { useState, useEffect, useRef } from "react";
import "./Businesshealth.css";
import rafiq from "../../Assets/Rafiq.svg";
const TrendIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#B6F193" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
    <polyline points="17 6 23 6 23 12"/>
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7"/>
    <polyline points="7 7 17 7 17 17"/>
  </svg>
);

function useCountUp(target, duration = 1400, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return value;
}

const SEGMENTS = [
  { label: "CASH",    color: "#4ade80", pct: 40, amount: 17000, sub: "Liquid"    },
  { label: "TRANSIT", color: "#d4c84a", pct: 45, amount: 19125, sub: "Warehouse" },
  { label: "STOCK",   color: "#e07830", pct: 15, amount: 6375,  sub: "Suppliers" },
];

function StatCard({ segment, animate }) {
  const val = useCountUp(segment.amount, 1200, animate);
  return (
    <div className="bh-stat-card">
      <div className="bh-stat-header">
        <span className="bh-dot" style={{ background: segment.color }} />
        <span className="bh-stat-label">{segment.label}</span>
      </div>
      <div className="bh-stat-amount">
        ${val.toLocaleString()}
      </div>
      <div className="bh-stat-sub">
        {segment.pct}% · {segment.sub}
      </div>
    </div>
  );
}

export default function BusinessHealth({ onCheckStats, rafiqAvatar }) {
  const [animate, setAnimate] = useState(false);
  const [barAnimate, setBarAnimate] = useState(false);
  const ref = useRef(null);
  const totalVal = useCountUp(45000, 1600, animate);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setAnimate(true), 100);
          setTimeout(() => setBarAnimate(true), 300);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bh-root" ref={ref}>

      {/* ── Header ── */}
      <div className="bh-header">
        <p className="bh-label">Total Business Value</p>
        <div className="bh-badge">
          <TrendIcon />
          <span>+ 12% in the last month</span>
        </div>
      </div>

      {/* ── Total amount ── */}
      <div className="bh-total">
        <span className="bh-total-number">
          {totalVal.toLocaleString()}
        </span>
        <span className="bh-total-currency">EGP</span>
      </div>

      {/* ── Progress bar ── */}
      <div className="bh-bar-track">
        {SEGMENTS.map((seg) => (
          <div
            key={seg.label}
            className="bh-bar-segment"
            style={{
              background: seg.color,
              width: barAnimate ? `${seg.pct}%` : "0%",
              transitionDelay: seg.label === "CASH" ? "0s" : seg.label === "TRANSIT" ? "0.15s" : "0.3s",
            }}
          />
        ))}
      </div>

      {/* ── Stat cards ── */}
      <div className="bh-stats">
        {SEGMENTS.map((seg) => (
          <StatCard key={seg.label} segment={seg} animate={animate} />
        ))}
      </div>

      {/* ── Rafiq's tip ── */}
      <div className="bh-rafiq-section">
        <div className="bh-rafiq-header">
          <div className="bh-rafiq-avatar">
           <img src={rafiq} alt="" />
          </div>
          <span className="bh-rafiq-title">Rafiq's tip</span>
        </div>
        <div className="bh-rafiq-card">
          <p className="bh-rafiq-text">
            You have 15% unallocated capital. Investing it in Linen now could save you 5% before the summer rush.
          </p>
        </div>
      </div>

      {/* ── CTA button ── */}
      <button className="bh-cta" onClick={onCheckStats}>
        <span className="bh-cta-label">Check your stats</span>
        <span className="bh-cta-icon">
          <ArrowIcon />
        </span>
      </button>

    </div>
  );
}