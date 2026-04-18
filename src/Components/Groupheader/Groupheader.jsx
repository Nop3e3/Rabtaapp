import React from "react";
import "./Groupheader.css";

const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

const LocationIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

export default function GroupHeader({
  image,
  bgImage,
  name,
  type = "Public group",
  since,
  postsToday,
  location,
  tags = [],
}) {
  return (
    <div className="gh-card">
      {bgImage && (
        <div className="gh-bg" style={{ backgroundImage: `url(${bgImage})` }} />
      )}
      <div className="gh-overlay" />

      <div className="gh-content">
        {/* image + info side by side */}
        <div className="gh-row">
          {image && (
            <div className="gh-img-wrap">
              <img src={image} alt={name} className="gh-img" />
            </div>
          )}

          <div className="gh-info">
            <h2 className="gh-name">{name}</h2>
            <p className="gh-type">
              {type}
              {since && <span className="gh-since"> since {since}</span>}
            </p>

            {postsToday !== undefined && (
              <div className="gh-meta-row">
                <GlobeIcon />
                <span>{postsToday} Posts today</span>
              </div>
            )}

            {location && (
              <div className="gh-meta-row">
                <LocationIcon />
                <span>{location}</span>
              </div>
            )}

            {tags.length > 0 && (
              <div className="gh-tags">
                {tags.map((t) => (
                  <span key={t} className="gh-tag">{t}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}