import React from "react";
import "./Areasofexpertise.css";

const AREAS = [
  "Financial Planning",
  "Sustainable Fashion",
  "Marketing Strategy",
  "Supply Chain",
  "Business Planning",
  "Brand Strategy",
];

export function ExpertiseTag({ label }) {
  return <div className="aoe-tag">{label}</div>;
}

export default function AreasOfExpertise({ areas = AREAS }) {
  return (
    <div className="aoe-card">
      <h3 className="aoe-title">Areas of Expertise</h3>
      <div className="aoe-box">
        {areas.map((a) => (
          <ExpertiseTag key={a} label={a} />
        ))}
      </div>
    </div>
  );
}