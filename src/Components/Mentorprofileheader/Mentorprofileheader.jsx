import React from "react";
import "./Mentorprofileheader.css";

const BadgeIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#d4c84a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6"/>
    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
  </svg>
);

const LocationIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

export default function MentorProfileHeader({
  avatar,
  name,
  rating = 5,
  reviewCount = 124,
  sessions = 340,
  title,
  location,
  memberSince,
  languages,
  locationDetail,
  specialties = [],
  sessionsCount,
  menteesCount,
  experience,
}) {
  return (
    <div className="mph-card">
      <div className="mph-top">
        {/* Avatar */}
        <div className="mph-avatar-wrap">
          {avatar
            ? <img src={avatar} alt={name} className="mph-avatar" />
            : <div className="mph-avatar-placeholder">{name?.charAt(0)}</div>
          }
        </div>

        {/* Info */}
        <div className="mph-info">
          <div className="mph-name-row">
            <BadgeIcon />
            <h2 className="mph-name">{name}</h2>
          </div>

          <div className="mph-rating-row">
            <svg viewBox="0 0 24 24" width="16" height="16">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="#d4c84a" stroke="#d4c84a" strokeWidth="1"/>
            </svg>
            <span className="mph-rating">{rating}</span>
            <span className="mph-review-count">({reviewCount})</span>
          </div>

          <p className="mph-sessions-count">{sessions} sessions</p>
          <p className="mph-title">{title}</p>

          <div className="mph-meta-row">
            <LocationIcon />
            <span>{location}</span>
          </div>

          <p className="mph-member">Member since {memberSince}</p>

          {languages && (
            <div className="mph-meta-row">
              <GlobeIcon />
              <span>{languages}</span>
            </div>
          )}

          {locationDetail && (
            <div className="mph-meta-row">
              <LocationIcon />
              <span>{locationDetail}</span>
            </div>
          )}

          {specialties.length > 0 && (
            <div className="mph-specialties">
              {specialties.map((s) => (
                <span key={s} className="mph-tag">{s}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Stats row */}
      <div className="mph-stats">
        <div className="mph-stat">
          <span className="mph-stat-value">{sessionsCount}</span>
          <span className="mph-stat-label">Sessions</span>
        </div>
        <div className="mph-stat-divider" />
        <div className="mph-stat">
          <span className="mph-stat-value">{menteesCount}</span>
          <span className="mph-stat-label">Mentees</span>
        </div>
        <div className="mph-stat-divider" />
        <div className="mph-stat">
          <span className="mph-stat-value">{experience}</span>
          <span className="mph-stat-label">Years Experience</span>
        </div>
      </div>
    </div>
  );
}