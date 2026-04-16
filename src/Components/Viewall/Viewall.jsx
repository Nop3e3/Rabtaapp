import React from "react";
import "./Viewall.css";

export default function Button({
  text,
  onClick,
  type = "button",
  variant = "primary", // primary | secondary | ghost
  disabled = false,
  icon: Icon,
}) {
  return (
    <button
      type={type}
      className={`btn btn--${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && <Icon className="btn-icon" />}
      {text}
    </button>
  );
}