import React from "react";
import "./Secttitle.css";

export default function SectionTitle({
  title,
  subtitle,
  actionText,
  onActionClick,
  align = "left", // left | center | between
}) {
  return (
    <div className={`section-title section-title--${align}`}>
      <div className="section-title-text">
        {title && <h2 className="section-title-heading">{title}</h2>}
        {subtitle && <p className="section-title-sub">{subtitle}</p>}
      </div>

      {actionText && (
        <button
          className="section-title-action"
          onClick={onActionClick}
        >
          {actionText}
        </button>
      )}
    </div>
  );
}