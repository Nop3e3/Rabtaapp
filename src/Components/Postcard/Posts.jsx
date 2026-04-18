import React, { useState } from "react";
import "./Posts.css";

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
const PlayIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="white">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
);

function PostActions({ likes, shares, comments }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  return (
    <div className="pt-actions">
      <button className={`pt-action-btn ${liked ? "pt-action-btn--liked" : ""}`} onClick={() => { setLiked(v => !v); setLikeCount(v => liked ? v-1 : v+1); }}>
        <HeartIcon filled={liked} /><span>{likeCount} Likes</span>
      </button>
      <button className="pt-action-btn"><ShareIcon /><span>{shares} Shares</span></button>
      <button className="pt-action-btn"><CommentIcon /><span>{comments} Comments</span></button>
      <button className={`pt-action-btn ${saved ? "pt-action-btn--saved" : ""}`} onClick={() => setSaved(v => !v)}>
        <SaveIcon saved={saved} /><span>Save</span>
      </button>
    </div>
  );
}

function PostHeader({ avatar, name, role, date }) {
  return (
    <div className="pt-header">
      <div className="pt-avatar-wrap">
        {avatar ? <img src={avatar} alt={name} className="pt-avatar" /> : <div className="pt-avatar-placeholder">{name?.charAt(0)}</div>}
      </div>
      <div className="pt-header-info">
        <span className="pt-name">{name}</span>
        <span className="pt-meta">{role} · {date}</span>
      </div>
    </div>
  );
}

/* ── VIDEO POST ───────────────────────────────────────────── */
export function VideoPost({
  avatar, name, role, date, caption,
  thumbnail, tags = [],
  likes = 214, shares = 214, comments = 214,
  onPlay,
}) {
  return (
    <div className="pt-card">
      <PostHeader avatar={avatar} name={name} role={role} date={date} />
      {caption && <p className="pt-caption">{caption}</p>}

      <div className="pt-video-wrap" onClick={onPlay}>
        {thumbnail && <img src={thumbnail} alt="" className="pt-video-thumb" />}
        <div className="pt-video-overlay" />
        <button className="pt-play-btn"><PlayIcon /></button>
      </div>

      {tags.length > 0 && (
        <div className="pt-tags">
          {tags.map((t) => <span key={t} className="pt-tag">#{t}</span>)}
        </div>
      )}
      <PostActions likes={likes} shares={shares} comments={comments} />
    </div>
  );
}

/* ── POLL POST ────────────────────────────────────────────── */
export function PollPost({
  avatar, name, role, date, question,
  options = [], totalVotes, closesIn,
  likes = 214, shares = 214, comments = 214,
}) {
  const [voted, setVoted] = useState(null);
  return (
    <div className="pt-card">
      <PostHeader avatar={avatar} name={name} role={role} date={date} />
      {question && <p className="pt-caption">{question}</p>}

      <div className="pt-poll">
        {options.map((opt, i) => (
          <button
            key={i}
            className={`pt-poll-option ${voted === i ? "pt-poll-option--voted" : ""}`}
            onClick={() => setVoted(i)}
          >
            {opt}
          </button>
        ))}
        <div className="pt-poll-footer">
          {totalVotes} total votes · Poll closes in {closesIn}
        </div>
      </div>

      <PostActions likes={likes} shares={shares} comments={comments} />
    </div>
  );
}

/* ── EVENT POST ───────────────────────────────────────────── */
export function EventPost({
  avatar, name, role, date, caption,
  eventTitle, eventDate, eventLocation,
  interestedAvatars = [], interestedCount,
  tags = [],
  likes = 214, shares = 214, comments = 214,
  onRegister,
}) {
  return (
    <div className="pt-card">
      <PostHeader avatar={avatar} name={name} role={role} date={date} />
      {caption && <p className="pt-caption">{caption}</p>}

      <div className="pt-event-card">
        <h3 className="pt-event-title">{eventTitle}</h3>
        <div className="pt-event-divider" />
        <p className="pt-event-date">{eventDate}</p>
        <p className="pt-event-location">{eventLocation}</p>
        <button className="pt-event-register" onClick={onRegister}>Register Now</button>
      </div>

      {tags.length > 0 && (
        <div className="pt-tags">
          {tags.map((t) => <span key={t} className="pt-tag">#{t}</span>)}
        </div>
      )}

      {(interestedAvatars.length > 0 || interestedCount) && (
        <div className="pt-interested">
          <div className="pt-interested-avatars">
            {interestedAvatars.slice(0, 3).map((src, i) => (
              <img key={i} src={src} alt="" className="pt-interested-avatar" style={{ zIndex: 3 - i }} />
            ))}
          </div>
          <span className="pt-interested-count">{interestedCount} interested</span>
        </div>
      )}

      <PostActions likes={likes} shares={shares} comments={comments} />
    </div>
  );
}