import React from "react";
import "./Coursereviews.css";

const REVIEWS = [
  {
    id: 1,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80",
    name: "Sara Al-Thani",
    rating: 4,
    date: "2 weeks ago",
    text: "This course completely changed how I approach my fashion business. Sarah's insights on supplier management were invaluable!",
  },
];

export function CourseReviewItem({ avatar, name, rating, date, text }) {
  return (
    <div className="cr-review-item">
      <div className="cr-review-header">
        <div className="cr-avatar-wrap">
          {avatar
            ? <img src={avatar} alt={name} className="cr-avatar" />
            : <div className="cr-avatar-placeholder">{name?.charAt(0)}</div>
          }
        </div>
        <div className="cr-review-meta">
          <h4 className="cr-review-name">{name}</h4>
          <div className="cr-stars">
            {[1,2,3,4,5].map((i) => (
              <svg key={i} viewBox="0 0 24 24" width="16" height="16">
                <polygon
                  points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                  fill={i <= rating ? "#d4c84a" : "rgba(255,255,255,0.15)"}
                  stroke={i <= rating ? "#d4c84a" : "rgba(255,255,255,0.15)"}
                  strokeWidth="1"
                />
              </svg>
            ))}
          </div>
          <p className="cr-date">{date}</p>
        </div>
      </div>
      <div className="cr-divider" />
      <p className="cr-text">{text}</p>
    </div>
  );
}

export default function CourseReviews({
  rating = 4.8,
  reviewCount = 124,
  reviews = REVIEWS,
  onViewAll,
}) {
  return (
    <div className="cr-card">
      <div className="cr-top-row">
        <div className="cr-rating-row">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="#d4c84a" stroke="#d4c84a" strokeWidth="1"/>
          </svg>
          <span className="cr-rating">{rating}</span>
          <span className="cr-count">({reviewCount})</span>
        </div>
      </div>

      <div className="cr-header-row">
        <h3 className="cr-title">Portfolio</h3>
        <button className="cr-view-all" onClick={onViewAll}>View all</button>
      </div>

      <div className="cr-list">
        {reviews.map((r) => (
          <CourseReviewItem key={r.id} {...r} />
        ))}
      </div>
    </div>
  );
}