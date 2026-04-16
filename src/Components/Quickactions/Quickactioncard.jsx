import React from "react";
import "./Quickactioncard.css";

export default function QuickActionCard({ image, title, description, onClick }) {
  return (
    <button className="qa-card" onClick={onClick}>
      <div className="qa-card-image">
        <img src={image} alt={title} />
      </div>
      <div className="qa-card-body">
        <h3 className="qa-card-title">{title}</h3>
        <p className="qa-card-desc">{description}</p>
      </div>
    </button>
  );
}