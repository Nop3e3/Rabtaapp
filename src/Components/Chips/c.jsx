import React, { useState } from "react";
import "./chip.css";
import { ChipActive, Chip, ChipAction } from "../Chips/chips";

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

const FILTERS = [
  "All",
  "Fashion Production & Sourcing",
  "Textile & Fabric Knowledge",
  "Pricing & Costing",
  "E-commerce & Digital Growth",
  "Inventory Management",
];

export default function MentorChips({ onSortBy, onFilter }) {
  const [active, setActive] = useState("All");

  return (
    <div className="mc-chips-root">
      <div className="mc-chips-scroll">
        {FILTERS.map((f) =>
          f === active ? (
            <ChipActive key={f} label={f} onClick={() => setActive(f)} />
          ) : (
            <Chip key={f} label={f} onClick={() => setActive(f)} />
          )
        )}
      </div>

      <div className="mc-chips-actions">
        <ChipAction icon={<SortIcon />} label="Sort By" onClick={onSortBy} />
        <ChipAction icon={<FilterIcon />} label="Filter" onClick={onFilter} />
      </div>
    </div>
  );
}