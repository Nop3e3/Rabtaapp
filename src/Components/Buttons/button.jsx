import React from "react";
import "./buttons.css";

function Button({
  text,
  onClick,
  type = "button",
  variant = "primary",
  size = "medium",
  disabled = false,
}) {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default Button;