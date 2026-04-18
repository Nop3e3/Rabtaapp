import React, { useState } from "react";
import "./Grouptextpost.css";

const HeartIcon = ({ filled }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill={filled ? "#e05555" : "none"} stroke={filled ? "#e05555" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);
const ShareIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 10 20 5 15 0" transform="translate(0,4)"/>
    <path d="M4 20v-7a4 4 0 0 1 4-4h12"/>
  </svg>
);
const CommentIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);
const SaveIcon = ({ saved }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill={saved ? "#d4c84a" : "none"} stroke={saved ? "#d4c84a" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
  </svg>
);

const MAX = 160;

export default function GroupTextPost({
  groupAvatar,
  groupName,
  authorName,
  date,
  text,
  tags = [],
  likes = 0,
  shares = 0,
  comments = 0,
}) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [expanded, setExpanded] = useState(false);

  const isLong = text && text.length > MAX;
  const display = isLong && !expanded ? text.slice(0, MAX) + "..." : text;

  return (
    <div className="gtp-card">
      {/* header */}
      <div className="gtp-header">
        <div className="gtp-avatar-wrap">
          {groupAvatar
            ? <img src={groupAvatar} alt={groupName} className="gtp-avatar" />
            : <div className="gtp-avatar-placeholder">{groupName?.charAt(0)}</div>
          }
        </div>
        <div className="gtp-header-info">
          <span className="gtp-group-name">{groupName}</span>
          <span className="gtp-meta">{authorName} · {date}</span>
        </div>
      </div>

      {/* text */}
      {text && (
        <p className="gtp-text">
          {display}
          {isLong && (
            <button className="gtp-expand" onClick={() => setExpanded(v => !v)}>
              {expanded ? " Show less" : " See more"}
            </button>
          )}
        </p>
      )}

      {/* hashtags */}
      {tags.length > 0 && (
        <div className="gtp-tags">
          {tags.map((t) => <span key={t} className="gtp-tag">#{t}</span>)}
        </div>
      )}

      {/* actions */}
      <div className="gtp-actions">
        <button className={`gtp-action-btn ${liked ? "gtp-action-btn--liked" : ""}`} onClick={() => { setLiked(v => !v); setLikeCount(v => liked ? v-1 : v+1); }}>
          <HeartIcon filled={liked} /><span>{likeCount} Likes</span>
        </button>
        <button className="gtp-action-btn"><ShareIcon /><span>{shares} Shares</span></button>
        <button className="gtp-action-btn"><CommentIcon /><span>{comments} Comments</span></button>
        <button className={`gtp-action-btn ${saved ? "gtp-action-btn--saved" : ""}`} onClick={() => setSaved(v => !v)}>
          <SaveIcon saved={saved} /><span>Save</span>
        </button>
      </div>
    </div>
  );
}