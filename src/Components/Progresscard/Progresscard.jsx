import React, { useEffect, useRef, useState } from "react";
import "./Progresscard.css";

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const CertIcon = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6"/>
    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>
);

function useCountUp(target, duration = 1200, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return value;
}

function StatTile({ icon, iconBg, label, value, suffix, valueSuffix, delay, animate }) {
  const count = useCountUp(value, 1000, animate);
  return (
    <div
      className="pc-tile"
      style={{
        backgroundColor: iconBg + "18",
        borderColor: iconBg + "30",
        animationDelay: delay,
      }}
    >
      <div className="pc-tile-top">
        <div className="pc-tile-icon" style={{ background: iconBg }}>
          {icon}
        </div>
        <span className="pc-tile-label">{label}</span>
      </div>
      <div className="pc-tile-bottom">
        <span className="pc-tile-value">{count}</span>
        {valueSuffix && <span className="pc-tile-value-suffix">{valueSuffix}</span>}
        {suffix && <span className="pc-tile-suffix">{suffix}</span>}
      </div>
    </div>
  );
}

const TILES = [
  {
    icon: <ClockIcon />,
    iconBg: "#1e7c3a",
    label: "Learning Hours",
    value: 18,
    suffix: "hr/week",
    valueSuffix: null,
  },
  {
    icon: <CertIcon />,
    iconBg: "#7a8c30",
    label: "Certificates",
    value: 2,
    suffix: null,
    valueSuffix: null,
  },
  {
    icon: <CheckIcon />,
    iconBg: "#2a3a8a",
    label: "Completed Courses",
    value: 4,
    suffix: null,
    valueSuffix: "of 6",
  },
];

export default function ProgressCard() {
  const [animate, setAnimate] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="pc-cardD" ref={ref}>
      <div className="pc-headerR">
        <h2 className="pc-title">Your Progress Recently</h2>
        <p className="pc-subtitle">You're making great progress!</p>
      </div>

      <div className="pc-tiles">
        {TILES.map((tile, i) => (
          <StatTile
            key={tile.label}
            {...tile}
            delay={`${i * 0.12}s`}
            animate={animate}
          />
        ))}
      </div>
    </div>
  );
}