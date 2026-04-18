import React from "react";
import "./Mentorreviews.css";

const RATING_BARS = [
  { stars: 5, pct: 85 },
  { stars: 4, pct: 10 },
  { stars: 3, pct: 3  },
  { stars: 2, pct: 1  },
  { stars: 1, pct: 1  },
];

const REVIEWS = [
  {
    id: 1,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80",
    name: "Sara Al-Thani",
    rating: 4,
    date: "2 weeks ago",
    text: "This course completely changed how I approach my fashion business. Sarah's insights on supplier management were invaluable!",
  },
  {
    id: 2,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80",
    name: "Mohammed Khalil",
    rating: 4,
    date: "1 month ago",
    text: "Great communication and flexibility. They worked closely with us to achieve the perfect fabric texture.",
  },
];

export function ReviewItem({ avatar, name, rating, date, text }) {
  return (
    <div className="mr-review-item">
      <div className="mr-review-header">
        <div className="mr-review-avatar-wrap">
          {avatar
            ? <img src={avatar} alt={name} className="mr-review-avatar" />
            : <div className="mr-review-avatar-placeholder">{name?.charAt(0)}</div>
          }
        </div>
        <div className="mr-review-meta">
          <h4 className="mr-review-name">{name}</h4>
          <div className="mr-review-stars">
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
          <p className="mr-review-date">{date}</p>
        </div>
      </div>
      <div className="mr-review-divider" />
      <p className="mr-review-text">{text}</p>
    </div>
  );
}

export default function MentorReviews() {
  return (
    <div className="mr-card">
      {/* Rating summary */}
      <div className="mr-summary">
        <div className="mr-summary-left">
          <span className="mr-overall">4.9</span>
          <div className="mr-overall-stars">
            {[1,2,3,4,5].map((i) => (
              <svg key={i} viewBox="0 0 24 24" width="14" height="14">
                <polygon
                  points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                  fill="#d4c84a" stroke="#d4c84a" strokeWidth="1"
                />
              </svg>
            ))}
          </div>
          <span className="mr-total-reviews">127 reviews</span>
        </div>
        <div className="mr-bars">
          {RATING_BARS.map((b) => (
            <div key={b.stars} className="mr-bar-row">
              <span className="mr-bar-label">{b.stars} ★</span>
              <div className="mr-bar-track">
                <div className="mr-bar-fill" style={{ width: `${b.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews list */}
      <div className="mr-reviews-section">
        <div className="mr-reviews-header">
          <div className="mr-reviews-rating-row">
            <svg viewBox="0 0 24 24" width="18" height="18">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="#d4c84a" stroke="#d4c84a" strokeWidth="1"/>
            </svg>
            <span className="mr-reviews-rating">4.8</span>
            <span className="mr-reviews-count">(124)</span>
          </div>
          <div className="mr-reviews-title-row">
            <h3 className="mr-reviews-title">Reviews</h3>
            <button className="mr-view-all">View all</button>
          </div>
        </div>

        <div className="mr-list">
          {REVIEWS.map((r) => (
            <ReviewItem key={r.id} {...r} />
          ))}
        </div>
      </div>
    </div>
  );
}