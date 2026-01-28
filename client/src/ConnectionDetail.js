import React, { useState } from 'react';
import './ConnectionDetail.css';

function ConnectionDetail({ connection, onBack }) {
  const [showStops, setShowStops] = useState(false);

  return (
    <div className="detail-card">
      {/* Red Header */}
      <div className="detail-header-bg">
        <button onClick={onBack} className="back-button">&larr;</button>
        <div className="route-summary">
          <div className="route-stations">
            {connection.departure.station} → {connection.arrival.station}
          </div>
          <div className="route-meta">
            <span>Dauer: {connection.duration}</span>
            <span>Zug: {connection.trains.join(', ')}</span>
          </div>
        </div>
      </div>

      <div className="detail-content">
        {/* Train Info */}
        <div className="train-info-box">
          <span className="train-name">{connection.trains.join(', ')}</span>
          <span className="train-features">WLAN, Restaurant, Barrierefrei</span>
        </div>

        {/* Timeline */}
        <div className="timeline-modern">
          {/* Departure */}
          <div className="timeline-row">
            <div className="time-col">{connection.departure.time}</div>
            <div className="marker-col"><div className="dot-start"></div></div>
            <div className="info-col">
              <div className="station-title">{connection.departure.station}</div>
              <div className="platform-badge">Gleis {connection.departure.platform}</div>
            </div>
          </div>

          {/* Stops Toggle */}
          <div className="stops-toggle-modern">
            <button onClick={() => setShowStops(!showStops)}>
              {showStops ? '− Zwischenhalte ausblenden' : '+ Zwischenhalte anzeigen'}
            </button>
          </div>

          {/* Stops List */}
          {showStops && connection.stops.map((stop, index) => (
            <div key={index} className="timeline-row">
              <div className="time-col">{stop.time}</div>
              <div className="marker-col"><div className="dot-stop"></div></div>
              <div className="info-col">
                <div className="station-title" style={{fontWeight: 400}}>{stop.station}</div>
              </div>
            </div>
          ))}

          {/* Arrival */}
          <div className="timeline-row">
            <div className="time-col">{connection.arrival.time}</div>
            <div className="marker-col"><div className="dot-end"></div></div>
            <div className="info-col">
              <div className="station-title">{connection.arrival.station}</div>
              <div className="platform-badge">Gleis {connection.arrival.platform}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConnectionDetail;
