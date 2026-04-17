import React from "react";
import "./Supplierheader.css";
import { ChipActive, Chip } from "../Chips/chips";
import trophy from "../../Assets/rewarded_ads.svg"
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

const TABS = ["Overview", "Portfolio", "Reviews"];

export default function SupplierHeader({
  image,
  name,
  rating,
  reviewCount,
  role = "Supplier",
  location,
  memberSince,
  specialization,
  activeTab = "Overview",
  onTabChange,
  backgroundImage,
}) {
  return (
    <div className="sh-root">
      {/* ── Background blur image ── */}
      {backgroundImage && (
        <div
          className="sh-bg"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      <div className="sh-content">
        {/* ── Top row: image + info ── */}
        <div className="sh-top">
          {/* Thumbnail */}
          <div className="sh-thumb">
            {image
              ? <img src={image} alt={name} className="sh-thumb-img" />
              : <div className="sh-thumb-placeholder" />
            }
          </div>

          {/* Info */}
          <div className="sh-info">
            <h2 className="sh-name">{name}</h2>

            <div className="sh-rating-row">
              <svg viewBox="0 0 24 24" width="16" height="16">
                <polygon
                  points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                  fill="#d4c84a" stroke="#d4c84a" strokeWidth="1"
                />
              </svg>
              <span className="sh-rating">{rating}</span>
              <span className="sh-review-count">({reviewCount})</span>
            </div>

            <div className="sh-role-pill">
             <img src={trophy}alt="" />
              <span>{role}</span>
            </div>

            <div className="sh-location-row">
              <LocationIcon />
              <span className="sh-location">{location}</span>
            </div>

            {memberSince && (
              <p className="sh-member">Member since {memberSince}</p>
            )}

            {specialization && (
              <p className="sh-specialization">
                Specialized in{" "}
                <span className="sh-spec-link">{specialization}</span>
              </p>
            )}
          </div>
        </div>

        {/* ── Tab chips ── */}
        <div className="sh-tabs">
          {TABS.map((tab) =>
            tab === activeTab ? (
              <ChipActive
                key={tab}
                label={tab}
                onClick={() => onTabChange?.(tab)}
              />
            ) : (
              <Chip
                key={tab}
                label={tab}
                onClick={() => onTabChange?.(tab)}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}