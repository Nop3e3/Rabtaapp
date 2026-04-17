import React, { useState } from "react";
import "./PortfolioCard.css";

export function PortfolioImage({ src, alt = "" }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="pi-wrap">
      {!loaded && <div className="pi-skeleton" />}
      <img
        src={src}
        alt={alt}
        className={`pi-img ${loaded ? "pi-img--loaded" : ""}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

export default function PortfolioCard({ images = [], onViewAll }) {
  return (
    <div className="portfolio-card">
      <div className="portfolio-header">
        <h3 className="portfolio-title">Portfolio</h3>
        <button className="portfolio-view-all" onClick={onViewAll}>
          View all
        </button>
      </div>

      <div className="portfolio-grid">
        {images.slice(0, 4).map((src, i) => (
          <PortfolioImage key={i} src={src} alt={`Portfolio ${i + 1}`} />
        ))}
      </div>
    </div>
  );
}