import React from 'react';
import './ConnectionCard.css';

function ConnectionCard({ connection, onSelect }) {
  const handleSelect = (e) => {
    e.preventDefault();
    onSelect(connection);
  };
  const formatTrainNames = (trains) => {
    if (!trains || trains.length === 0) return '';
    return trains.map(train => train.replace(/\s*\(.*?\)/g, '').replace(/Zug-Nr\.?\s*\d+/g, '').trim()).join(' → ');
  };

  return (
    <div className="connection-card">
      {/* Row 1: Time and Platform */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div className="time-info d-flex align-items-center">
          <span>{connection.departure.time}</span>
          <span className="mx-2" style={{ fontSize: '1.5rem', color: '#6c757d', lineHeight: '1' }}>→</span>
          <span>{connection.arrival.time}</span>
        </div>
        <div className="platform-info">
          <span className="platform-badge-card">
            Gl. {connection.departure.platform}
          </span>
        </div>
      </div>
      <div className="train-info">
          <span className="train-badge-card">
            {formatTrainNames(connection.trains)}
          </span>
      </div>
      {/* Row 2: Duration and Details Link */}
      <div className="d-flex justify-content-between align-items-center">

        <div className="duration-info" style={{fontSize: '0.9rem'}}>
          Dauer: {connection.duration}
        </div>
        <div className="connection-footer-details text-end" style={{ margin: 0 }}>
          <a href="#details" className="details-link" onClick={handleSelect}>
            Details &gt;
          </a>
        </div>
      </div>
    </div>
  );
}

export default ConnectionCard;
