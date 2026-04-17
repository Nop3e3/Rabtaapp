import React from "react";
import "./AboutCard.css";

export default function AboutCard({ text }) {
  return (
    <div className="about-card">
      <h3 className="about-title">About</h3>
      <div className="about-box">
        <p className="about-text">{text}</p>
      </div>
    </div>
  );
}