import React, { useState } from "react";
import "./Mentorcard.css";

const BadgeIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#d4c84a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6"/>
    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
  </svg>
);

function StarRating({ rating = 5 }) {
  return (
    <div className="mc-stars">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} viewBox="0 0 24 24" width="20" height="20">
          <polygon
            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
            fill={i <= rating ? "#d4c84a" : "rgba(255,255,255,0.15)"}
            stroke={i <= rating ? "#d4c84a" : "rgba(255,255,255,0.15)"}
            strokeWidth="1"
          />
        </svg>
      ))}
    </div>
  );
}

export default function MentorCard({
  name,
  avatar,
  title,
  reviewCount = 0,
  rating = 5,
  sessions = 0,
  specialties = [],
  responseTime,
  experience,
  onKnowMore,
  onBookSession,
}) {
  const [bookPressed, setBookPressed] = useState(false);
  const [knowPressed, setKnowPressed] = useState(false);

  return (
    <div className="mc-card">
      {/* ── Top info ── */}
     
      <div className="mc-top">
        <div className="mc-avatar-wrap">
          {avatar
            ? <img src={avatar} alt={name} className="mc-avatar" />
            : <div className="mc-avatar-placeholder">{name?.charAt(0)}</div>
          }
        </div>

        <div className="mc-info">
          <div className="mc-name-row">
            <BadgeIcon />
            <h3 className="mc-name">{name}</h3>
          </div>
          <p className="mc-title">{title}</p>
          <div className="mc-rating-row">
            <span className="mc-review-count">({reviewCount})</span>
            <StarRating rating={rating} />
            <span className="mc-dot">•</span>
            <span className="mc-sessions">{sessions} sessions</span>
          </div>
        </div>
      </div>

      {/* ── Specialties ── */}
      {specialties.length > 0 && (
        <div className="mc-specialties">
          {specialties.map((tag) => (
            <span key={tag} className="mc-tag">{tag}</span>
          ))}
        </div>
      )}

      {/* ── Meta ── */}
      <div className="mc-meta">
        {responseTime && <span className="mc-meta-text">Responds in {responseTime}</span>}
        {responseTime && experience && <span className="mc-meta-dot">•</span>}
        {experience && <span className="mc-meta-text">{experience} exp</span>}
      </div>

      {/* ── Buttons ── */}
      <div className="mc-buttons">
        <button
          className={`mc-btn mc-btn--secondary ${knowPressed ? "mc-btn--pressed" : ""}`}
          onMouseDown={() => setKnowPressed(true)}
          onMouseUp={() => setKnowPressed(false)}
          onMouseLeave={() => setKnowPressed(false)}
          onClick={onKnowMore}
        >
          Know more
        </button>
        <button
          className={`mc-btn mc-btn--primary ${bookPressed ? "mc-btn--pressed" : ""}`}
          onMouseDown={() => setBookPressed(true)}
          onMouseUp={() => setBookPressed(false)}
          onMouseLeave={() => setBookPressed(false)}
          onClick={onBookSession}
        >
          Book a Session
        </button>
      </div>
    </div>
  );
}