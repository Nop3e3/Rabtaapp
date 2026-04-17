import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";
import Book from "../../Assets/book_ribbon.svg";
import box from "../../Assets/Frame 1000006445.svg";
import Diversity from "../../Assets/home.svg";
import Home from "../../Assets/diversity_3.svg";
import Personraisinghand from "../../Assets/person_raised_hand.svg";

const NAV_ITEMS = [
  { id: "library", label: "Learning", icon: Book,             path: "/LearningHub" },
  { id: "orders",  label: "Suppliers",  icon: box,              path: "/Suppliers"  },
  { id: "home",    label: "Home",    icon: Diversity,        path: "/Home"    },
  { id: "team",    label: "Community",    icon: Home,             path: "/team"    },
  { id: "prayer",  label: "Mentorship",  icon: Personraisinghand, path: "/prayer" },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const getActive = () => {
    const match = NAV_ITEMS.find((item) => location.pathname === item.path);
    return match ? match.id : "home";
  };

  const [active, setActive] = useState(getActive);
  const [ripple, setRipple] = useState(null);

  const handleClick = (item) => {
    setActive(item.id);
    setRipple(item.id);
    setTimeout(() => setRipple(null), 400);
    navigate(item.path);
  };

  return (
    <nav className="bnav">
      {NAV_ITEMS.map((item) => {
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            className={`bnav-item ${isActive ? "bnav-item--active" : ""} ${ripple === item.id ? "bnav-item--ripple" : ""}`}
            onClick={() => handleClick(item)}
          >
            <span className="bnav-icon">
              <img src={item.icon} alt={item.label} width="22" height="22" />
            </span>
            <span className="bnav-label">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}