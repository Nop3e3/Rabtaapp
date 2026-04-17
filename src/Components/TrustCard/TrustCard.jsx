import React from "react";
import "./TrustCard.css";

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>
);

const CheckCircleIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>
);

export function TrustItem({ title, description }) {
  return (
    <div className="ti-item">
      <span className="ti-icon"><CheckCircleIcon /></span>
      <div className="ti-text">
        <h4 className="ti-title">{title}</h4>
        {description && <p className="ti-desc">{description}</p>}
      </div>
    </div>
  );
}

export default function TrustCard({ items = [] }) {
  return (
    <div className="tc-card">
      <div className="tc-header">
        <span className="tc-header-icon"><ShieldIcon /></span>
        <h3 className="tc-title">Trust & Verification</h3>
      </div>

      <div className="tc-list">
        {items.map((item, i) => (
          <TrustItem key={i} title={item.title} description={item.description} />
        ))}
      </div>
    </div>
  );
}