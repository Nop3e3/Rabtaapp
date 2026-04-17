import React from "react";
import "./SpecCard.css";

const StarCircleIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polygon points="12 6 13.5 10 18 10 14.5 13 16 17 12 14.5 8 17 9.5 13 6 10 10.5 10 12 6" fill="currentColor" stroke="none"/>
  </svg>
);

/* ── Reusable: single capability item ─────────────────────── */
export function CapabilityItem({ title, description }) {
  return (
    <div className="cap-item">
      <div className="cap-icon">
        <StarCircleIcon />
      </div>
      <div className="cap-text">
        <h4 className="cap-title">{title}</h4>
        {description && <p className="cap-desc">{description}</p>}
      </div>
    </div>
  );
}

/* ── Section card ─────────────────────────────────────────── */
export default function SpecCard({ title = "Specializations & Capabilities", items = [] }) {
  return (
    <div className="spec-card">
      <h3 className="spec-card-title">{title}</h3>
      <div className="spec-box">
        {items.map((item, i) => (
          <React.Fragment key={i}>
            <CapabilityItem title={item.title} description={item.description} />
            {i < items.length - 1 && <div className="cap-divider" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}