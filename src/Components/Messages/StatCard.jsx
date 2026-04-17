import React from "react";
import "./Inbox.css";

export default function StatCard({ label, value }) {
  return (
    <div className="inbox-stat-card">
      <span className="inbox-stat-label">{label}</span>
      <span className="inbox-stat-value">{value}</span>
    </div>
  );
}