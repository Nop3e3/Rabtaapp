import React, { useState } from "react";
import "./ChecklistCard.css";

/* ── Reusable: single checklist item ──────────────────────── */
export function ChecklistItem({ label, sublabel, checked, onClick }) {
  return (
    <div
      className={`cl-item ${checked ? "cl-item--checked" : ""}`}
      onClick={onClick}
    >
      <div className={`cl-checkbox ${checked ? "cl-checkbox--checked" : ""}`}>
        {checked && (
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        )}
      </div>
      <span className="cl-label">
        {sublabel ? (
          <>
            <span className="cl-label-underline">{label}</span>
            <span className="cl-sublabel"> • {sublabel}</span>
          </>
        ) : (
          label
        )}
      </span>
    </div>
  );
}

/* ── Checklist card ───────────────────────────────────────── */
const DEFAULT_ITEMS = [
  { id: 1, label: "Complete any 3 learning items", sublabel: "0/3" },
  { id: 2, label: "Watch a video",                 sublabel: null  },
  { id: 3, label: "Complete a module",             sublabel: null  },
];

export default function ChecklistCard({ items = DEFAULT_ITEMS }) {
  const [checked, setChecked] = useState({});

  const toggle = (id) =>
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="cl-card">
      {items.map((item) => (
        <ChecklistItem
          key={item.id}
          label={item.label}
          sublabel={item.sublabel}
          checked={!!checked[item.id]}
          onClick={() => toggle(item.id)}
        />
      ))}
    </div>
  );
}