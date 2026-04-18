import React from "react";
import "./Mentorsessioncard.css";
import Button from "../Buttons/button";

const BadgeIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#d4c84a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6"/>
    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const VideoIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="15" height="10" rx="2"/>
    <polygon points="17 9 22 7 22 17 17 15"/>
  </svg>
);

function StarRating({ rating = 5, count }) {
  return (
    <div className="msc-rating-row">
      {count && <span className="msc-review-count">({count})</span>}
      {[1,2,3,4,5].map((i) => (
        <svg key={i} viewBox="0 0 24 24" width="20" height="20">
          <polygon
            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
            fill={i <= rating ? "#d4c84a" : "rgba(255,255,255,0.15)"}
            stroke={i <= rating ? "#d4c84a" : "rgba(255,255,255,0.15)"}
            strokeWidth="1"
          />
        </svg>
      ))}
      {count && <span className="msc-sessions-count">· {count} sessions</span>}
    </div>
  );
}

export default function MentorSessionCard({
  avatar,
  name,
  title,
  reviewCount = 124,
  rating = 5,
  sessions = 340,
  topic,
  topicText,
  sessionDate,
  sessionType = "Video Call",
  sessionDuration = "60 minutes",
  onReschedule,
}) {
  return (
    <div className="msc-card">
      {/* ── Header ── */}
      <div className="msc-header">
        <div className="msc-avatar-wrap">
          {avatar
            ? <img src={avatar} alt={name} className="msc-avatar" />
            : <div className="msc-avatar-placeholder">{name?.charAt(0)}</div>
          }
        </div>
        <div className="msc-info">
          <div className="msc-name-row">
            <BadgeIcon />
            <h3 className="msc-name">{name}</h3>
          </div>
          <p className="msc-title">{title}</p>
          <div className="msc-rating-row">
            <span className="msc-review-count">({reviewCount})</span>
            {[1,2,3,4,5].map((i) => (
              <svg key={i} viewBox="0 0 24 24" width="20" height="20">
                <polygon
                  points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                  fill={i <= rating ? "#d4c84a" : "rgba(255,255,255,0.15)"}
                  stroke={i <= rating ? "#d4c84a" : "rgba(255,255,255,0.15)"}
                  strokeWidth="1"
                />
              </svg>
            ))}
            <span className="msc-dot">·</span>
            <span className="msc-sessions">{sessions} sessions</span>
          </div>
        </div>
      </div>

      {/* ── Topic ── */}
      <div className="msc-topic-section">
        <h4 className="msc-topic-label">Topic</h4>
        <p className="msc-topic-text">{topicText}</p>
      </div>

      {/* ── Session details ── */}
      <div className="msc-details">
        <div className="msc-detail-row">
          <CalendarIcon />
          <span>{sessionDate}</span>
        </div>
        <div className="msc-detail-row">
          <VideoIcon />
          <span><strong>{sessionType}</strong> ({sessionDuration})</span>
        </div>
      </div>

      {/* ── Button ── */}
      <div className="msc-btn-wrap">
        <Button
          text="Reschedule"
          variant="secondary"
          size="large"
          onClick={onReschedule}
        />
      </div>
    </div>
  );
}