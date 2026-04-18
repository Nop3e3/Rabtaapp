import React, { useState } from "react";
import "./Sessionspricing.css";

const VideoIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="15" height="10" rx="2"/>
    <polygon points="17 9 22 7 22 17 17 15"/>
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const SESSIONS = [
  {
    id: 1,
    name: "Initial Consultation",
    description: "Get to know each other and discuss your goals",
    price: 200,
    currency: "EGP",
    type: "Video Call",
    duration: "45 min",
    popular: false,
  },
  {
    id: 2,
    name: "Strategy Session",
    description: "Get to know each other and discuss your goals",
    price: 350,
    currency: "EGP",
    type: "Video Call",
    duration: "90 Minutes",
    popular: true,
  },
  {
    id: 3,
    name: "Monthly Package",
    description: "4 sessions per month + WhatsApp support",
    price: 1200,
    currency: "EGP",
    type: "Video Call",
    duration: "90 Minutes",
    popular: false,
  },
];

const TABS = ["Group Workshops", "1-on-1 Sessions"];

export function SessionCard({ session }) {
  return (
    <div className={`sp-session-card ${session.popular ? "sp-session-card--popular" : ""}`}>
      {session.popular && <span className="sp-popular-badge">POPULAR</span>}
      <div className="sp-session-top">
        <div className="sp-session-left">
          <h4 className="sp-session-name">{session.name}</h4>
          <p className="sp-session-desc">{session.description}</p>
          <div className="sp-session-meta">
            <VideoIcon />
            <span>{session.type}</span>
            <span className="sp-meta-dot">·</span>
            <ClockIcon />
            <span>{session.duration}</span>
          </div>
        </div>
        <div className="sp-session-price">
          <span className="sp-price-num">{session.price.toLocaleString()}</span>
          <span className="sp-price-currency">{session.currency}</span>
        </div>
      </div>
    </div>
  );
}

export default function Sessionspricing() {
  const [activeTab, setActiveTab] = useState("1-on-1 Sessions");

  return (
    <div className="sp-card">
      <h3 className="sp-title">Sessions & Pricing</h3>

      {/* Tab toggle */}
      <div className="sp-tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`sp-tab ${activeTab === tab ? "sp-tab--active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Session cards */}
      <div className="sp-list">
        {SESSIONS.map((s) => (
          <SessionCard key={s.id} session={s} />
        ))}
      </div>
    </div>
  );
}