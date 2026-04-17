import React, { useState } from "react";
import "./chip.css";

const SortIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="6" y1="12" x2="18" y2="12"/>
    <line x1="9" y1="18" x2="15" y2="18"/>
  </svg>
);

const FilterIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
  </svg>
);

/* ── Reusable: plain dark chip ─────────────────────────── */
export function Chip({ label, active = false, onClick }) {
  return (
    <button
      className={`chip chip--dark ${active ? "chip--dark-active" : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

/* ── Reusable: active/yellow chip (no toggle) ──────────── */
export function ChipActive({ label, onClick }) {
  return (
    <button className="chip chip--yellow" onClick={onClick}>
      {label}
    </button>
  );
}

/* ── Reusable: outlined action chip (Sort By / Filter) ─── */
export function ChipAction({ icon, label, onClick }) {
  return (
    <button className="chip chip--outline" onClick={onClick}>
      {icon}
      <span>{label}</span>
    </button>
  );
}

/* ── Section: full filter bar ──────────────────────────── */
const FILTERS = ["All", "Fabrics", "Manufacturing", "Available"];

export default function FilterChips({ onSortBy, onFilter }) {
  const [active, setActive] = useState("Fabrics");

  return (
    <div className="fc-bar">
      <div className="fc-chips">
        {FILTERS.map((f) =>
          f === active ? (
            <ChipActive key={f} label={f} onClick={() => setActive(f)} />
          ) : (
            <Chip key={f} label={f} onClick={() => setActive(f)} />
          )
        )}
      </div>

      <div className="fc-actions">
        <ChipAction icon={<SortIcon />} label="Sort By" onClick={onSortBy} />
        <ChipAction icon={<FilterIcon />} label="Filter" onClick={onFilter} />
      </div>
    </div>
  );
}