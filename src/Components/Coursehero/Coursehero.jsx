import React from "react";
import "./Coursehero.css";

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const StudentsIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);

function getLevelStyle(level) {
  const l = (level || "").toLowerCase();
  if (l === "easy")         return { color: "#4ade80", borderColor: "rgba(74,222,128,0.4)"  };
  if (l === "intermediate") return { color: "#d4c84a", borderColor: "rgba(212,200,74,0.4)" };
  return                           { color: "#e07830", borderColor: "rgba(224,120,48,0.4)" };
}

export default function CourseHero({
  bgImage,
  title,
  description,
  level,
  duration,
  students,
  rating,
  reviewCount,
}) {
  const levelStyle = getLevelStyle(level);

  return (
    <div className="ch-card">
      {bgImage && (
        <div className="ch-bg" style={{ backgroundImage: `url(${bgImage})` }} />
      )}
      <div className="ch-overlay" />

      <div className="ch-content">
        <h1 className="ch-title">{title}</h1>
        {description && <p className="ch-desc">{description}</p>}

        {level && (
          <span
            className="ch-level"
            style={{ color: levelStyle.color, borderColor: levelStyle.borderColor }}
          >
            {level}
          </span>
        )}

        <div className="ch-stats">
          {duration && (
            <div className="ch-stat">
              <ClockIcon />
              <span>{duration}</span>
            </div>
          )}
          {students && (
            <div className="ch-stat">
              <StudentsIcon />
              <span>{students.toLocaleString()}</span>
            </div>
          )}
          {rating && (
            <div className="ch-stat">
              <svg viewBox="0 0 24 24" width="16" height="16">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="#d4c84a" stroke="#d4c84a" strokeWidth="1"/>
              </svg>
              <span>{rating}</span>
              {reviewCount && <span className="ch-review-count">({reviewCount.toLocaleString()})</span>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}