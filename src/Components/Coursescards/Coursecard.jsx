import React from "react";
import "./Coursesec.css";

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7"/>
    <polyline points="7 7 17 7 17 17"/>
  </svg>
);

const LEVEL_COLORS = {
  Easy:         { color: "#B6F193", border: "rgba(181, 241, 147, 0.23)",  bg: "rgba(182, 241, 147, 0.05)"  },
  Intermediate: { color: "#FDF74E", border: "rgba(212,200,74,0.4)",  bg: "rgba(253, 247, 78, 0.05)"  },
  Advanced:     { color: "#e07830", border: "rgba(224,120,48,0.4)",  bg: "rgba(224,120,48,0.1)"  },
};

function StarRating({ rating = "★★★☆☆" }) {
  return (
    <div className="cc-stars">
      {rating.split("").map((char, i) => (
        <span key={i} className={char === "★" ? "cc-star cc-star--filled" : "cc-star cc-star--empty"}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function CourseCard({ course, onEnroll }) {
  const levelStyle = LEVEL_COLORS[course?.Level] || LEVEL_COLORS["Easy"];

  return (
    <div className="cc-card">
      {/* Background image */}
      <div className="cc-image-wrap">
        {course?.image
          ? <img src={course.image} alt={course["Course Name"]} className="cc-image" />
          : <div className="cc-image-placeholder" />
        }
        <div className="cc-image-overlay" />
      </div>

      {/* Enroll button */}
      <button className="cc-enroll-btn" onClick={() => onEnroll?.(course)}>
        <span className="cc-enroll-label">Enroll</span>
        <span className="cc-enroll-icon"><ArrowIcon /></span>
      </button>

      {/* Bottom content */}
      <div className="cc-content">
        <h3 className="cc-title">{course?.["Course Name"]}</h3>

        <div className="cc-meta-row">
          <span
            className="cc-level-pill"
            style={{
              color: levelStyle.color,
              borderColor: levelStyle.border,
              background: levelStyle.bg,
            }}
          >
            {course?.Level}
          </span>
          <div className="cc-booked">
            <span className="cc-booked-pct">{course?.["Success %"]}%</span>
            <span className="cc-booked-label">Booked</span>
          </div>
        </div>

        <StarRating rating={course?.Rating} />

        {/* Provider */}
        <div className="cc-provider">
          {course?.provider_logo && (
            <img src={course.provider_logo} alt={course?.Provider} className="cc-provider-logo" />
          )}
          <span className="cc-provider-name">{course?.Provider}</span>
        </div>

        {/* Duration */}
        <p className="cc-duration">
          {course?.Module} · {course?.Duration}
        </p>
      </div>
    </div>
  );
}