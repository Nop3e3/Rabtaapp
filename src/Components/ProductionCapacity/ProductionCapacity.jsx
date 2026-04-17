import React from "react";
import "./ProductionCapacity.css";

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const ShirtIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z"/>
  </svg>
);

const TeamIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const CapacityIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/>
    <line x1="2" y1="10" x2="22" y2="10"/>
  </svg>
);

const STATS = [
  { icon: <ClockIcon />, label: "Lead Time",  value: "3-4 weeks"       },
  { icon: <ShirtIcon />, label: "MOQ",        value: "200 pieces"      },
  { icon: <TeamIcon />,  label: "Team size",  value: "97 employees"    },
  { icon: <CapacityIcon />, label: "Capacity", value: "50,000 pcs/mo"  },
];

export default function ProductionCapacity() {
  return (
    <div className="pc-wrap">
      <h3 className="pc-title">Production Capacity</h3>
      <div className="pc-grid">
        {STATS.map((stat) => (
          <div className="pc-stat-card" key={stat.label}>
            <div className="pc-stat-top">
              <span className="pc-stat-icon">{stat.icon}</span>
              <span className="pc-stat-label">{stat.label}</span>
            </div>
            <p className="pc-stat-value">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}