import React from 'react';
import './Pagination.css';

const Pagination = () => {
  const pages = [1, 2, 3, '...', 7, 8, 9];

  return (
    <div className="pagination-wrapper">
      <button className="nav-btn">
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6" />
  </svg>
</button>
      
      <div className="pagination-container">
        {pages.map((page, index) => (
          <span 
            key={index} 
            className={`page-item ${page === 1 ? 'active' : ''}`}
          >
            {page}
          </span>
        ))}
      </div>
      
<button className="nav-btn">
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
</button>
    </div>
  );
};

export default Pagination;