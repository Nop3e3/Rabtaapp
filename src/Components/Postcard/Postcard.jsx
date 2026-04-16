import React, { useState } from "react";
import "./Postcard.css";


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

export default function PostCard({
  supplierName,
  supplierAvatar,
  authorName,
  date,
  caption,
  images = [],
  likes = 0,
  shares = 0,
  comments = 0,
  onComment,
  onShare,
}) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    setLiked((v) => !v);
    setLikeCount((v) => (liked ? v - 1 : v + 1));
  };

  const renderImages = () => {
    if (!images.length) return null;

    if (images.length === 1) {
      return (
        <div className="pc-images pc-images--single">
          <img src={images[0]} alt="" className="pc-img" />
        </div>
      );
    }

    if (images.length === 2) {
      return (
        <div className="pc-images pc-images--two">
          <img src={images[0]} alt="" className="pc-img" />
          <img src={images[1]} alt="" className="pc-img" />
        </div>
      );
    }

    return (
      <div className="pc-images pc-images--three">
        <img src={images[0]} alt="" className="pc-img pc-img--main" />
        <img src={images[1]} alt="" className="pc-img pc-img--small" />
        <img src={images[2]} alt="" className="pc-img pc-img--small" />
      </div>
    );
  };

  return (
    <div className="pc-card">
      <div className="pc-header">
        <div className="pc-avatar-wrap">
          {supplierAvatar
            ? <img src={supplierAvatar} alt={supplierName} className="pc-avatar" />
            : <div className="pc-avatar-placeholder">{supplierName?.charAt(0)}</div>
          }
        </div>
        <div className="pc-header-info">
          <span className="pc-supplier-name">{supplierName}</span>
          <span className="pc-meta">{authorName} · {date}</span>
        </div>
      </div>

      {caption && <p className="pc-caption">{caption}</p>}

      {renderImages()}

      <div className="pc-actions">
        <button
          className={`pc-action-btn ${liked ? "pc-action-btn--liked" : ""}`}
          onClick={handleLike}
        >
          <HeartIcon filled={liked} />
          <span>{likeCount} Likes</span>
        </button>

        <button className="pc-action-btn" onClick={onShare}>
          <ShareIcon />
          <span>{shares} Shares</span>
        </button>

        <button className="pc-action-btn" onClick={onComment}>
          <CommentIcon />
          <span>{comments} Comments</span>
        </button>

        <button
          className={`pc-action-btn ${saved ? "pc-action-btn--saved" : ""}`}
          onClick={() => setSaved((v) => !v)}
        >
          <SaveIcon saved={saved} />
          <span>Save</span>
        </button>
      </div>
    </div>
  );
}