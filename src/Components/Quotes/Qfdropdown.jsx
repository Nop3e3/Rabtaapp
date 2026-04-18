import React, { useState } from "react";

const ChevronIcon = ({ open }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
    style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

export default function QfDropdown({ placeholder, options, value, onChange, error, disabled }) {
  const [open, setOpen] = useState(false);

  const selected = options.find((o) => (typeof o === "string" ? o : o.value) === value);
  const label = selected ? (typeof selected === "string" ? selected : selected.label) : null;

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <div
        onClick={() => !disabled && setOpen((v) => !v)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "13px 14px",
          background: open ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.04)",
          border: `1px solid ${error ? "rgba(224,85,85,0.5)" : open ? "rgba(160,180,60,0.45)" : "rgba(255,255,255,0.1)"}`,
          borderRadius: open ? "12px 12px 0 0" : "12px",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.45 : 1,
          transition: "border-color 0.2s, background 0.2s",
          userSelect: "none",
          boxSizing: "border-box",
        }}
      >
        <span style={{
          fontFamily: "'Lexend Exa', sans-serif",
          fontSize: "0.78rem",
          fontWeight: label ? 500 : 400,
          color: label ? "#e0e0d8" : "rgba(255,255,255,0.2)",
          letterSpacing: "0.03em",
        }}>
          {label || placeholder}
        </span>
        <span style={{ color: "rgba(255,255,255,0.4)", display: "flex", flexShrink: 0 }}>
          <ChevronIcon open={open} />
        </span>
      </div>

      {open && (
        <>
          <div
            onClick={() => setOpen(false)}
            style={{
              position: "fixed", inset: 0, zIndex: 998,
              background: "rgba(0,0,0,0.3)", backdropFilter: "blur(2px)",
            }}
          />
          <div style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "#1a1c14",
            border: "1px solid rgba(160,180,60,0.25)",
            borderTop: "none",
            borderRadius: "0 0 14px 14px",
            zIndex: 999,
            overflow: "hidden",
            boxShadow: "0 12px 32px rgba(0,0,0,0.6)",
            maxHeight: "220px",
            overflowY: "auto",
            animation: "dropIn 0.18s ease both",
          }}>
            {options.map((opt, i) => {
              const val = typeof opt === "string" ? opt : opt.value;
              const lbl = typeof opt === "string" ? opt : opt.label;
              const isSelected = val === value;
              return (
                <div
                  key={i}
                  onClick={() => { onChange(val); setOpen(false); }}
                  style={{
                    padding: "14px 16px",
                    fontFamily: "'Lexend Exa', sans-serif",
                    fontSize: "0.78rem",
                    fontWeight: isSelected ? 700 : 400,
                    color: isSelected ? "#d4e060" : "rgba(255,255,255,0.7)",
                    background: isSelected ? "rgba(107,122,46,0.15)" : "transparent",
                    borderBottom: i < options.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                    cursor: "pointer",
                    letterSpacing: "0.03em",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {lbl}
                  {isSelected && (
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#d4e060" strokeWidth="3" strokeLinecap="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}

      <style>{`
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}