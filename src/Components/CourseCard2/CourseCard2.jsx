import React, { useEffect, useRef, useState } from "react";
import "./CourseCard2.css";

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7"/>
    <polyline points="7 7 17 7 17 17"/>
  </svg>
);

function StarRating({ rating = 3 }) {
  const filled = Math.round(rating);
  return (
    <div className="cc2-stars">
      {[1,2,3,4,5].map((i) => (
        <svg key={i} viewBox="0 0 24 24" width="22" height="22">
          <polygon
            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
            fill={i <= filled ? "#e8e8e0" : "none"}
            stroke="#e8e8e0"
            strokeWidth="1.5"
          />
        </svg>
      ))}
    </div>
  );
}

function getLevelStyle(level) {
  const l = (level || "").toLowerCase();
  if (l === "easy")         return { color: "#4ade80", borderColor: "rgba(74,222,128,0.4)",  bg: "rgba(74,222,128,0.08)"  };
  if (l === "intermediate") return { color: "#d4c84a", borderColor: "rgba(212,200,74,0.4)", bg: "rgba(212,200,74,0.08)" };
  return                           { color: "#e07830", borderColor: "rgba(224,120,48,0.4)", bg: "rgba(224,120,48,0.08)" };
}

function CircularProgress({ pct = 93, animate }) {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animate ? pct / 100 : 0) * circumference;

  return (
    <div className="cc2-circle-wrap">
      <svg width="80" height="80" viewBox="0 0 80 80">
        {/* track */}
        <circle cx="40" cy="40" r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="5"/>
        {/* fill */}
        <circle
          cx="40" cy="40" r={radius}
          fill="none"
          stroke="white"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 40 40)"
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.34,1.2,0.64,1)" }}
        />
      </svg>
      <div className="cc2-circle-text">
        <span className="cc2-circle-pct">{pct}%</span>
        <span className="cc2-circle-label">Booked</span>
      </div>
    </div>
  );
}

export default function CourseCard2({
  image,
  title,
  rating = 3,
  level,
  providerLogo,
  providerName,
  modules,
  duration,
  bookedPct = 93,
  onEnroll,
}) {
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

  const levelStyle = getLevelStyle(level);

  return (
    <div className="cc2-card" ref={ref}>
      {/* ── Top: image bg + title + rating + level ── */}
      <div className="cc2-top">
        {image && (
          <div className="cc2-top-bg" style={{ backgroundImage: `url(${image})` }} />
        )}
        <div className="cc2-top-overlay" />
        <div className="cc2-top-content">
          <h3 className="cc2-title">{title}</h3>
          <div className="cc2-meta-row">
            <StarRating rating={rating} />
            {level && (
              <span
                className="cc2-level"
                style={{ color: levelStyle.color, borderColor: levelStyle.borderColor, background: levelStyle.bg }}
              >
                {level}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Bottom: provider + modules + booked + enroll ── */}
      <div className="cc2-bottom">
        <div className="cc2-info-row">
          <div className="cc2-provider-col">
            {providerLogo && (
              <div className="cc2-provider-row">
                <img src={providerLogo} alt={providerName} className="cc2-provider-logo" />
                <span className="cc2-provider-name">{providerName}</span>
              </div>
            )}
            <p className="cc2-modules-text">
              {modules} · {duration}
            </p>
          </div>

          <CircularProgress pct={bookedPct} animate={animate} />
        </div>

        {/* ── Enroll button ── */}
        <button className="cc2-enroll-btn" onClick={onEnroll}>
          <span className="cc2-enroll-label">Enroll</span>
          <span className="cc2-enroll-icon">
            <ArrowIcon />
          </span>
        </button>
      </div>
    </div>
  );
}