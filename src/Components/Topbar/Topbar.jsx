import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ FIX: import this
import "./Topbar.css";
import SideMenu from "./Sidemenu";
import search from "../../Assets/search.svg";
import mic from "../../Assets/mic.svg";

// ✅ OPTIONAL: rename these files to remove spaces (recommended)
import notification from "../../Assets/Frame 1000006414.svg";
import inbox from "../../Assets/Frame 1000006268.svg";

const BurgerIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

export default function TopBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate(); // ✅ now works

  return (
    <>
      <div className="topbar">
        {/* Burger */}
        <button
          className="topbar-burger"
          onClick={() => setMenuOpen(true)}
        >
          <BurgerIcon />
        </button>

        {/* Search */}
        <div className="topbar-search">
          <span className="topbar-search-icon">
            <img src={search} alt="search" width="18" height="18" />
          </span>

          <input
            className="topbar-search-input"
            type="text"
            placeholder="Search ..."
          />

          <span className="topbar-mic">
            <img src={mic} alt="mic" width="18" height="18" />
          </span>
        </div>

        {/* Actions */}
        <div className="topbar-actions">
          {/* ✅ Inbox navigation */}
          <button
            className="topbar-action-btn"
            onClick={() => navigate("/Messages")} // ⚠️ match route exactly
          >
            <img src={inbox} alt="inbox" width="22" height="22" />
          </button>

          {/* Notification */}
          <button className="topbar-action-btn">
            <img
              src={notification}
              alt="notification"
              width="22"
              height="22"
            />
          </button>
        </div>
      </div>

      <SideMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
}