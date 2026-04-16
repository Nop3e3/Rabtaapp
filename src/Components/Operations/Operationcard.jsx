import React, { useEffect, useRef, useState } from "react";
import "./Activeoperations.css";

export default function OperationCard({
  supplierName,
  collectionName,
  tags = [],
  status,
  steps = [],
  activeStep,
  onViewOffer,
}) {
  const [animate, setAnimate] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const activeIndex = steps.findIndex((s) => s === activeStep);

  return (
    <div className={`op-card ${animate ? "op-card--visible" : ""}`} ref={ref}>
      {/* ── Info block ── */}
      <div className="op-card-info">
        <h3 className="op-card-supplier">{supplierName}</h3>
        <p className="op-card-collection">{collectionName}</p>
        <div className="op-card-tags">
          {tags.map((tag, i) => (
            <React.Fragment key={tag}>
              <span className="op-tag">{tag}</span>
              {i < tags.length - 1 && <span className="op-tag-dot">●</span>}
            </React.Fragment>
          ))}
        </div>
        <span className="op-status-pill">{status}</span>
      </div>

      {/* ── Progress track ── */}
      <div className="op-progress-section">
        {/* Step labels + active bubble */}
        <div className="op-steps-row">
          {steps.map((step, i) => (
            <div
              key={step}
              className={`op-step-item ${i === activeIndex ? "op-step-item--active" : ""} ${i < activeIndex ? "op-step-item--done" : ""}`}
            >
              {i === activeIndex && (
                <div className="op-active-pill">{step}</div>
              )}
              {i !== activeIndex && (
                <span className="op-step-label">{step}</span>
              )}
            </div>
          ))}
        </div>

        {/* Circle marker */}
        <div className="op-marker-row">
          {steps.map((_, i) => (
            <div key={i} className="op-marker-slot">
              {i === activeIndex && <div className="op-marker-circle" />}
            </div>
          ))}
        </div>

        {/* Segment bars */}
        <div className="op-bars-row">
          {steps.map((_, i) => (
            <div key={i} className="op-bar-wrap">
              <div
                className={`op-bar ${animate && i <= activeIndex ? "op-bar--filled" : ""}`}
                style={{ transitionDelay: animate ? `${i * 0.15}s` : "0s" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <button className="op-cta" onClick={onViewOffer}>
        View Counter-Offer
      </button>
    </div>
  );
}