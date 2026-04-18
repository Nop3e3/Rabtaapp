import React, { useState } from "react";
import "./chip.css";
import { ChipActive, Chip } from "../Chips/chips";

const TABS = ["Feed", "Photos", "Members", "Media", "About"];

export default function GroupChips({ onTabChange }) {
  const [active, setActive] = useState("Feed");

  const handleClick = (tab) => {
    setActive(tab);
    onTabChange?.(tab);
  };

  return (
    <div className="gchips-wrap">
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