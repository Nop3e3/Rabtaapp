import React from "react";
import "./GroupsSection.css";

const PostIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <line x1="9" y1="3" x2="9" y2="21"/>
    <line x1="3" y1="9" x2="9" y2="9"/>
  </svg>
);

const MembersIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

function formatMembers(n) {
  if (!n) return "0";
  if (n >= 1000) return (n / 1000).toFixed(1).replace(".0", "") + "k";
  return n.toString();
}

export default function GroupCard({ name, pfp, bgImage, postsToday, members, onJoin }) {
  return (
    <div className="gc-card">
      <div className="gc-bg" style={{ backgroundImage: bgImage ? `url(${bgImage})` : "none" }} />
      <div className="gc-overlay" />
      <div className="gc-content">
        {pfp && (
          <div className="gc-pfp-wrap">
            <img src={pfp} alt={name} className="gc-pfp" />
          </div>
        )}
        <div className="gc-info">
          <h3 className="gc-name">{name}</h3>
          <p className="gc-type">Public group</p>
          <div className="gc-stats">
            <div className="gc-stat">
              <PostIcon />
              <span>{postsToday} Posts today</span>
            </div>
            <div className="gc-stat">
              <MembersIcon />
              <span>{formatMembers(members)} members</span>
            </div>
          </div>
        </div>
        <button
          className="gc-join-btn"
          onClick={(e) => { e.stopPropagation(); onJoin?.(); }}
        >
          Join group
        </button>
      </div>
    </div>
  );
}