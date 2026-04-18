import React from "react";
import "./Groupabout.css";

export default function GroupAbout({ text }) {
  return (
    <div className="gabout-card">
      <h3 className="gabout-title">About</h3>
      <div className="gabout-box">
        <p className="gabout-text">{text}</p>
      </div>
    </div>
  );
}