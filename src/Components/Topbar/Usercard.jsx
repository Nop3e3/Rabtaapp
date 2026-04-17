import React from "react";
import "./Topbar.css";
import trophy from"../../Assets/rewarded_ads.svg";

const TrophyIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#B6F193" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="8 21 12 17 16 21"/>
    <line x1="12" y1="17" x2="12" y2="12"/>
    <path d="M7 4H4a1 1 0 0 0-1 1v3a5 5 0 0 0 5 5"/>
    <path d="M17 4h3a1 1 0 0 1 1 1v3a5 5 0 0 1-5 5"/>
    <rect x="7" y="2" width="10" height="10" rx="2"/>
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="#d4c84a" stroke="#d4c84a" strokeWidth="1">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

export default function UserCard({
  name = "User Name",
  role = "Brand owner",
  rating = 5,
  reviewCount = 124,
  avatarUrl = null,
  RoleIcon = TrophyIcon,
  RatingIcon = StarIcon,
}) {
  return (
    <div className="usercard">
      <div className="usercard-avatar">
        {avatarUrl ? (
          <img src={avatarUrl} alt={name} />
        ) : (
          <div className="usercard-avatar-placeholder">
            {name.charAt(0)}
          </div>
        )}
      </div>

      <div className="usercard-info">
        <h2 className="usercard-name">{name}</h2>

        <div className="usercard-meta">
          <span className="usercard-role">
<img src={trophy}alt="" />            {role}
          </span>

          <span className="usercard-dot">•</span>

          <span className="usercard-rating">
            <RatingIcon />
            {rating}
            <span className="usercard-reviews">({reviewCount})</span>
          </span>
        </div>
      </div>
    </div>
  );
}