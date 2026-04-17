import React from "react";
import { useNavigate } from "react-router-dom";
import "./Topbar.css";

import Wallet from "../../Assets/account_balance_wallet.svg";
import Savedicon from "../../Assets/bookmark.svg";
import Logouticon from "../../Assets/logout.svg";
import Settings from "../../Assets/settings.svg";
import Inbox from "../../Assets/mark_email_unread.svg";

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const MENU_ITEMS = [
  { id: "wallet", label: "Wallet", icon: <img src={Wallet} alt="wallet" width="20" height="20" />, path: "/wallet" },
  { id: "inbox", label: "Inbox", icon: <img src={Inbox} alt="inbox" width="20" height="20" />, path: "/messages" },
  { id: "settings", label: "Settings", icon: <img src={Settings} alt="settings" width="20" height="20" />, path: "/settings" },
  { id: "saved", label: "Saved Sellers", icon: <img src={Savedicon} alt="saved" width="20" height="20" />, path: "/saved" },
  { id: "logout", label: "Log Out", icon: <img src={Logouticon} alt="logout" width="20" height="20" />, danger: true },
];

export default function SideMenu({ open, onClose }) {
  const navigate = useNavigate();

  const handleClick = (item) => {
    if (item.path) {
      navigate(item.path); // ✅ PATH NAVIGATION
      onClose(); // close menu after click
    }

    if (item.id === "logout") {
      console.log("logout logic here");
    }
  };

  return (
    <>
      <div
        className={`sidemenu-backdrop ${open ? "sidemenu-backdrop--visible" : ""}`}
        onClick={onClose}
      />

      <aside className={`sidemenu ${open ? "sidemenu--open" : ""}`}>
        <div className="sidemenu-header">
          <span className="sidemenu-title">Menu</span>
          <button className="sidemenu-close" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        <nav className="sidemenu-nav">
          {MENU_ITEMS.map((item, i) => (
            <React.Fragment key={item.id}>
              {item.id === "logout" && <div className="sidemenu-divider" />}

              <button
                className={`sidemenu-item ${item.danger ? "sidemenu-item--danger" : ""}`}
                style={{ animationDelay: open ? `${i * 0.06}s` : "0s" }}
                onClick={() => handleClick(item)} // ✅ CLICK HANDLER
              >
                <span className="sidemenu-item-icon">{item.icon}</span>
                <span className="sidemenu-item-label">{item.label}</span>

                {!item.danger && (
                  <svg className="sidemenu-chevron" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                )}
              </button>
            </React.Fragment>
          ))}
        </nav>
      </aside>
    </>
  );
}