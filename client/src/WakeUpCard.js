import React, { useState, useMemo } from 'react';
import './WakeUpCard.css';

function WakeUpCard({ connection, onConfirmAlarm }) {
  const [wakeUpOffset, setWakeUpOffset] = useState(15); // Default to 15 minutes
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customValue, setCustomValue] = useState(30); // Default for custom input

  const presetOptions = [5, 15, 20];

  const wakeUpTime = useMemo(() => {
    if (!connection?.arrival?.iso || isNaN(wakeUpOffset) || wakeUpOffset <= 0) return '--:--';

    const arrivalTime = new Date(connection.arrival.iso);
    const wakeUpDateTime = new Date(arrivalTime.getTime() - wakeUpOffset * 60000);
    
    return wakeUpDateTime.toLocaleTimeString('de-AT', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }, [connection, wakeUpOffset]);

  const handlePresetClick = (option) => {
    setWakeUpOffset(option);
    setShowCustomInput(false);
  };

  const handleCustomClick = () => {
    setShowCustomInput(true);
    setWakeUpOffset(customValue);
  };

  const handleCustomChange = (e) => {
    const value = e.target.value;
    setCustomValue(value);
    const parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue) && parsedValue > 0) {
      setWakeUpOffset(parsedValue);
    } else {
      setWakeUpOffset(0);
    }
  };

  const handleConfirm = () => {
    if (onConfirmAlarm) {
      onConfirmAlarm({
        wakeUpTime: wakeUpTime,
        offset: wakeUpOffset,
        connection: connection
      });
    }
  };

  return (
    <div className="wake-up-card">
      <h5 className="card-title">Weckzeit einstellen</h5>
      <p className="arrival-info">
        Ankunft in {connection.arrival.station} um {connection.arrival.time} Uhr.
      </p>
      
      <div className="options-label">Wecken vor Ankunft:</div>
      <div className="options-container">
        {presetOptions.map(option => (
          <button 
            key={option}
            className={`option-btn ${wakeUpOffset === option && !showCustomInput ? 'active' : ''}`}
            onClick={() => handlePresetClick(option)}
          >
            {option} min
          </button>
        ))}
        <button
          className={`option-btn ${showCustomInput ? 'active' : ''}`}
          onClick={handleCustomClick}
        >
          Custom
        </button>
      </div>

      {showCustomInput && (
        <div className="custom-input-container">
          <input
            type="number"
            value={customValue}
            onChange={handleCustomChange}
            className="custom-input"
            min="1"
          />
          <span className="custom-input-label">min</span>
        </div>
      )}

      <div className="wake-up-time-display">
        <span className="wake-up-label">Weckzeit:</span>
        <span className="wake-up-time">{wakeUpTime} Uhr</span>
      </div>

      <button className="btn-confirm" onClick={handleConfirm}>
        Bestätigen
      </button>
    </div>
  );
}

export default WakeUpCard;
