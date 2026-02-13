import React, { useState, useMemo, useEffect } from 'react';
import './WakeUpCard.css';
import DateTimePicker from './DateTimePicker';

function WakeUpCard({ connection, onConfirmAlarm, defaultOffset, t }) {
  const [wakeUpOffset, setWakeUpOffset] = useState(defaultOffset || 15);
  const presetOptions = [5, 10, 15, 20];
  const [showCustomInput, setShowCustomInput] = useState(!presetOptions.includes(defaultOffset));
  const [customValue, setCustomValue] = useState(defaultOffset);
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);


  useEffect(() => {
    if (defaultOffset) {
        setWakeUpOffset(defaultOffset);
    }
  }, [defaultOffset]);

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

  const handleManualAlarmConfirm = (date, time) => {
    const wakeUpDateTime = new Date(`${date}T${time}`);
    if (onConfirmAlarm) {
        onConfirmAlarm({
            wakeUpTime: wakeUpDateTime.toLocaleTimeString('de-AT', {
                hour: '2-digit',
                minute: '2-digit'
            }),
            offset: 0, // No offset for manual alarm
            connection: null // No connection for manual alarm
        });
    }
    setShowDateTimePicker(false);
  };

  return (
    <div className="wake-up-card">
      <h5 className="card-title">{t.setWakeUpTime}</h5>
      <p className="arrival-info">
        {t.arrivalIn} {connection.arrival.station} {t.at} {connection.arrival.time} {t.clock}.
      </p>
      
      <div className="options-label">{t.wakeUpBefore}</div>
      <div className="options-container">
        {presetOptions.map(option => (
          <button 
            key={option}
            className={`option-btn ${wakeUpOffset === option && !showCustomInput ? 'active' : ''}`}
            onClick={() => handlePresetClick(option)}
          >
            {option} {t.min}
          </button>
        ))}
        <button
          className={`option-btn ${showCustomInput ? 'active' : ''}`}
          onClick={handleCustomClick}
        >
          {t.custom}
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
          <span className="custom-input-label">{t.min}</span>
        </div>
      )}

      <div className="wake-up-time-display">
        <span className="wake-up-label">{t.wakeUpTime}</span>
        <span className="wake-up-time">{wakeUpTime} {t.clock}</span>
      </div>

      <button className="btn-confirm" onClick={handleConfirm}>
        {t.confirm}
      </button>

      <div className="manual-alarm-container">
        <p>{t.orSetManualAlarm || 'Or set a manual alarm'}</p>
        <button className="btn-manual-alarm" onClick={() => setShowDateTimePicker(true)}>
          {t.setAlarm || 'Set Alarm'}
        </button>
      </div>

      {showDateTimePicker && (
        <DateTimePicker
            onConfirm={handleManualAlarmConfirm}
            onCancel={() => setShowDateTimePicker(false)}
            t={t}
        />
      )}
    </div>
  );
}

export default WakeUpCard;
