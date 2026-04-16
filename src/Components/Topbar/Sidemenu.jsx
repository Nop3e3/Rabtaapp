import React from "react";
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

const SellersIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const InboxIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/>
    <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
  </svg>
);

const MENU_ITEMS = [
  { id: "wallet",  label: "Wallet",        icon: <img src={Wallet} alt="wallet" width="20" height="20" />,       danger: false },
  { id: "inbox",   label: "Inbox",         icon:  <img src={Inbox} alt="settings" width="20" height="20" />,                                                   danger: false },
  { id: "settings",label: "Settings",      icon: <img src={Settings} alt="settings" width="20" height="20" />,   danger: false },
  { id: "saved",   label: "Saved Sellers", icon: <img src={Savedicon} alt="saved" width="20" height="20" />,     danger: false },
  { id: "logout",  label: "Log Out",       icon: <img src={Logouticon} alt="logout" width="20" height="20" />,   danger: true  },
];

export default function SideMenu({ open, onClose }) {
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