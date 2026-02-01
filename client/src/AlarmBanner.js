import React from 'react';
import './AlarmBanner.css';

function AlarmBanner({ alarm, onCancel, onShowDetails }) {
  if (!alarm) return null;

  const handleBannerClick = (e) => {
    // Prevent click from propagating to the cancel button
    if (e.target.closest('.alarm-cancel-btn')) {
      return;
    }
    onShowDetails();
  };

  return (
    <div className="alarm-banner" onClick={handleBannerClick}>
      <div className="alarm-icon">⏰</div>
      <div className="alarm-info">
        <div className="alarm-title">Wecker gestellt</div>
        <div className="alarm-time">{alarm.wakeUpTime} Uhr</div>
      </div>
      <div className="alarm-actions">
        <button className="alarm-details-btn" onClick={onShowDetails}>Details</button>
        <button className="alarm-cancel-btn" onClick={onCancel}>&times;</button>
      </div>
    </div>
  );
}

export default AlarmBanner;
