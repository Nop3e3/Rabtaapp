import React, { useState } from "react";
import "./CategoryGrid.css";

export function CategoryCard({ title, image, onClick }) {
  const [pressed, setPressed] = useState(false);
  return (
    <div
      className={`catg-card ${pressed ? "catg-card--pressed" : ""}`}
      onClick={onClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
    >
      {image && (
        <div
          className="catg-card-bg"
          style={{ backgroundImage: `url(${image})` }}
        />
      )}
      <div className="catg-card-overlay" />
      <h3 className="catg-card-title">{title}</h3>
    </div>
  );
}

const CATEGORIES = [
  { id: 1, title: "Product Development & Production",  image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400" },
  { id: 2, title: "Sourcing & Material Management",    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400" },
  { id: 3, title: "Fashion Business & Operations",     image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400" },
  { id: 4, title: "Logistics & Supply Chain",          image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400" },
  { id: 5, title: "Ethical & Sustainable Fashion",     image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400" },
  { id: 6, title: "Fashion Marketing & Brand Identity",image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400" },
];

export default function CategoryGrid({ categories = CATEGORIES, onCategoryClick }) {
  return (
    <div className="catg-grid">
      {categories.map((cat) => (
        <CategoryCard
          key={cat.id}
          title={cat.title}
          image={cat.image}
          onClick={() => onCategoryClick?.(cat)}
        />
      ))}
    </div>
  );
}