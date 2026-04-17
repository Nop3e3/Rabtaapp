import React, { useState } from "react";
import "./Suppliercard.css";
import Button from "../Buttons/button";
import trophy from"../../Assets/rewarded_ads.svg";
const HeartIcon = ({ filled }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill={filled ? "#e05555" : "none"} stroke={filled ? "#e05555" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const TrophyIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#6b8c2a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="8 21 12 17 16 21"/>
    <line x1="12" y1="17" x2="12" y2="12"/>
    <path d="M7 4H4a1 1 0 0 0-1 1v3a5 5 0 0 0 5 5"/>
    <path d="M17 4h3a1 1 0 0 1 1 1v3a5 5 0 0 1-5 5"/>
    <rect x="7" y="2" width="10" height="10" rx="2"/>
  </svg>
);

const LocationIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const PriceIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2"/>
    <line x1="2" y1="10" x2="22" y2="10"/>
  </svg>
);

const ProjectsIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const ShirtIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z"/>
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const MessageIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

export default function SupplierCard({
  image,
  name,
  rating,
  reviewCount,
  role = "Supplier",
  location,
  memberSince,
  specialization,
  priceRange,
  projects,
  tags = [],
  minOrder,
  leadTime,
  available = true,
  onMessage,
  onRequestQuote,
}) {
  const [saved, setSaved] = useState(false);

  return (
    <div className="sc-card">
      {/* ── Cover image ── */}
      <div className="sc-image-wrap">
        {image
          ? <img src={image} alt={name} className="sc-image" />
          : <div className="sc-image-placeholder" />
        }
      </div>

      {/* ── Body ── */}
      <div className="sc-body">
<div className="tops">
        {/* Name + save */}
        <div className="sc-name-row">
          <h2 className="sc-name">{name}</h2>
          <button
            className={`sc-save-btn ${saved ? "sc-save-btn--saved" : ""}`}
            onClick={() => setSaved((v) => !v)}
          >
            <HeartIcon filled={saved} />
          </button>
        </div>

        {/* Rating */}
        <div className="sc-rating-row">
          <svg viewBox="0 0 24 24" width="16" height="16">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="#d4c84a" stroke="#d4c84a" strokeWidth="1"/>
          </svg>
          <span className="sc-rating-num">{rating}</span>
          <span className="sc-rating-count">({reviewCount})</span>
        </div>

        {/* Role pill */}
        <div className="sc-role-pill">
          <img src={trophy}alt="" />
          <span>{role}</span>
        </div>

        {/* Location + member since */}
        <div className="sc-location-row">
          <LocationIcon />
          <span className="sc-location">{location}</span>
        </div>
        <p className="sc-member">Member since {memberSince}</p>

        {/* Specialization */}
        {specialization && (
          <p className="sc-specialization">
            Specialized in{" "}
            <span className="sc-specialization-link">{specialization}</span>
          </p>
        )}
</div>
        {/* Divider */}
        <div className="sc-divider" />

        {/* Price + projects */}
        <div className="sc-stats">
          <div className="sc-stat-row">
            <PriceIcon />
            <span className="sc-stat-label">Price range:</span>
            <span className="sc-stat-value">{priceRange}</span>
          </div>
          <div className="sc-stat-row">
            <ProjectsIcon />
            <span className="sc-stat-label">Projects :</span>
            <span className="sc-stat-value">{projects}</span>
          </div>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="sc-tags">
            {tags.map((tag) => (
              <span key={tag} className="sc-tag">{tag}</span>
            ))}
          </div>
        )}

        {/* Min order + lead time */}
        <div className="sc-details">
          {minOrder && (
            <div className="sc-detail-row">
              <ShirtIcon />
              <span>Minimum order: {minOrder}</span>
            </div>
          )}
          {leadTime && (
            <div className="sc-detail-row">
              <ClockIcon />
              <span>Lead time: {leadTime}</span>
            </div>
          )}
        </div>

        {/* Availability */}
        <div className={`sc-availability ${available ? "sc-availability--on" : "sc-availability--off"}`}>
          <span className="sc-availability-dot" />
          <span>{available ? "Available now" : "Unavailable"}</span>
        </div>

        {/* Buttons */}
        <div className="sc-buttons">
          <Button
            text={
              <span className="sc-msg-content">
                <MessageIcon />
                Message
              </span>
            }
            variant="secondary"
            size="large"
            onClick={onMessage}
          />
          <Button
            text="Request a Quote"
            variant="primary"
            size="large"
            onClick={onRequestQuote}
          />
        </div>

      </div>
    </div>
  );
}