import React from "react";
import "./Whatyoulearn.css";

const ITEMS = [
  "Develop a comprehensive business plan for your fashion brand",
  "Understand market research and identify your target customer",
  "Master pricing strategies and financial planning",
  "Launch and market your fashion brand effectively",
  "Build supplier relationships and manage inventory",
];

export function LearnItem({ text }) {
  return (
    <div className="wyl-item">
      <div className="wyl-check">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="9 12 11 14 15 10"/>
        </svg>
      </div>
      <p className="wyl-text">{text}</p>
    </div>
  );
}

export default function WhatYouLearn({ items = ITEMS }) {
  return (
    <div className="wyl-card">
      <h3 className="wyl-title">What You'll Learn</h3>
      <div className="wyl-list">
        {items.map((item, i) => (
          <LearnItem key={i} text={item} />
        ))}
      </div>
    </div>
  );
}