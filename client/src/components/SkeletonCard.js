import React from 'react';
import './SkeletonCard.css';

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      {/* Row 1: Time and Platform */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="skeleton skeleton-time" style={{ width: '140px', height: '28px' }}></div>
        <div className="skeleton skeleton-platform" style={{ width: '60px', height: '24px', marginTop: 0 }}></div>
      </div>

      {/* Row 2: Duration and Details Link */}
      <div className="d-flex justify-content-between align-items-center">
        <div className="skeleton skeleton-duration" style={{ width: '100px' }}></div>
        <div className="skeleton skeleton-details-link" style={{ width: '80px' }}></div>
      </div>
    </div>
  );
}

export default SkeletonCard;
