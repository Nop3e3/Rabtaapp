import React from "react";
import "./Browseexpertise.css";

const ChevronIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

const EXPERTISES = [
  { id: 1, label: "Business Strategy",   mentors: 24 },
  { id: 2, label: "Manufacturing",        mentors: 18 },
  { id: 3, label: "Marketing & Branding", mentors: 32 },
  { id: 4, label: "Financial Planning",   mentors: 15 },
];

export function ExpertiseItem({ label, mentors, onClick }) {
  return (
    <button className="be-item" onClick={onClick}>
      <div className="be-item-text">
        <span className="be-item-label">{label}</span>
        <span className="be-item-count">{mentors} mentors</span>
      </div>
      <span className="be-item-chevron"><ChevronIcon /></span>
    </button>
  );
}

export default function BrowseExpertise({ onSelect }) {
  return (
    <div className="be-card">
      <h3 className="be-title">Browse by Expertise</h3>
      <div className="be-list">
        {EXPERTISES.map((e) => (
          <ExpertiseItem
            key={e.id}
            label={e.label}
            mentors={e.mentors}
            onClick={() => onSelect?.(e)}
          />
        ))}
      </div>
    </div>
  );
}