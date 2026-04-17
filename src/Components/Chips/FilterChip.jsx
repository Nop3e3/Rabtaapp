import React from 'react';
import './FilterChip.css';

const FilterChip = ({ label, onRemove }) => {
  return (
    <button className="filter-chip" onClick={onRemove} aria-label={`Remove ${label}`}>
      <span className="remove-icon">×</span>
      <span className="chip-label">{label}</span>
    </button>
  );
};

export default FilterChip;