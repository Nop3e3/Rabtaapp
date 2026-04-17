import React from "react";
import "./ReviewsCard.css";

function StarRating({ rating = 5 }) {
  return (
    <div className="rv-stars">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} viewBox="0 0 24 24" width="18" height="18">
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

export function ReviewItem({ avatar, name, rating, date, text }) {
  return (
    <div className="rv-item">
      <div className="rv-header">
        <div className="rv-avatar-wrap">
          {avatar
            ? <img src={avatar} alt={name} className="rv-avatar" />
            : <div className="rv-avatar-placeholder">{name?.charAt(0)}</div>
          }
        </div>
        <div className="rv-meta">
          <h4 className="rv-name">{name}</h4>
          <StarRating rating={Number(rating) || 5} />
          <p className="rv-date">{date}</p>
        </div>
      </div>
      <div className="rv-divider" />
      <p className="rv-text">{text}</p>
    </div>
  );
}

export default function ReviewsCard({
  overallRating,
  reviewCount,
  reviews = [],
  onViewAll,
}) {
  return (
    <div className="reviews-card">
      {/* ── Overall rating ── */}
      <div className="reviews-overall">
        <svg viewBox="0 0 24 24" width="22" height="22">
          <polygon
            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
            fill="#d4c84a" stroke="#d4c84a" strokeWidth="1"
          />
        </svg>
        <span className="reviews-overall-num">{overallRating}</span>
        <span className="reviews-overall-count">({reviewCount})</span>
      </div>

      {/* ── Header ── */}
      <div className="reviews-header">
        <h3 className="reviews-title">Reviews</h3>
        <button className="reviews-view-all" onClick={onViewAll}>View all</button>
      </div>

      {/* ── Review items ── */}
      <div className="reviews-list">
        {reviews.map((review, i) => (
          <ReviewItem
            key={i}
            avatar={review.avatar}
            name={review.name}
            rating={review.rating}
            date={review.date}
            text={review.text}
          />
        ))}
      </div>
    </div>
  );
}