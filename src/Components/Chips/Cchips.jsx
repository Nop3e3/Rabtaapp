import React, { useState } from "react";
import "./chip.css";
import { ChipActive, Chip } from "../Chips/chips";

const TABS = ["Feed", "Groups", "Events", "Saved"];

export default function CommunityChips({ onTabChange }) {
  const [active, setActive] = useState("Feed");

  const handleClick = (tab) => {
    setActive(tab);
    onTabChange?.(tab);
  };

  return (
    <div className="comm-chips">
      {TABS.map((tab) =>
        tab === active ? (
          <ChipActive key={tab} label={tab} onClick={() => handleClick(tab)} />
        ) : (
          <Chip key={tab} label={tab} onClick={() => handleClick(tab)} />
        )
      )}
    </div>
  );
}