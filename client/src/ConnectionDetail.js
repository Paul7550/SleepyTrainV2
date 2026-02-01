import React, { useState } from 'react';
import './ConnectionDetail.css';
import WakeUpCard from './WakeUpCard';

function ConnectionDetail({ connection, onBack, onConfirmAlarm }) {
  const [showStops, setShowStops] = useState(false);

  // Helper to format train names with arrows instead of commas
  const formatTrainNames = (trains) => {
    if (!trains || trains.length === 0) return '';
    return trains.join(' → ');
  };

  return (
    <>
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
              <span>{formatTrainNames(connection.trains)}</span>
            </div>
          </div>
        </div>

        <div className="detail-content">
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
            {showStops && connection.stops.map((stop, index) => {
              if (stop.type === 'transfer') {
                return (
                  <div key={index} className="timeline-row transfer-row">
                    <div className="time-col">
                      <div>{stop.arrival}</div>
                      <div style={{color: '#666', fontSize: '0.8rem'}}>bis</div>
                      <div>{stop.departure}</div>
                    </div>
                    <div className="marker-col">
                      <div className="dot-transfer"></div>
                    </div>
                    <div className="info-col transfer-info">
                      <div className="station-title">{stop.station}</div>
                      <div className="transfer-details">
                        <span className="transfer-icon">⇄</span> 
                        Umstieg: {stop.duration} min
                      </div>
                      <div className="transfer-next-train">
                        Weiter mit <strong>{stop.trainTo}</strong>
                        {stop.platform && <span className="platform-badge ms-2">Gleis {stop.platform}</span>}
                      </div>
                    </div>
                  </div>
                );
              }
              
              return (
                <div key={index} className="timeline-row">
                  <div className="time-col">{stop.time}</div>
                  <div className="marker-col"><div className="dot-stop"></div></div>
                  <div className="info-col">
                    <div className="station-title" style={{fontWeight: 400}}>{stop.station}</div>
                  </div>
                </div>
              );
            })}

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
      <WakeUpCard connection={connection} onConfirmAlarm={onConfirmAlarm} />
    </>
  );
}

export default ConnectionDetail;
