import React from 'react';
import './AlarmRinging.css';

function AlarmRinging({ onStop }) {
  return (
    <div className="alarm-ringing-overlay">
      <div className="alarm-ringing-box">
        <div className="alarm-ringing-icon">⏰</div>
        <h1 className="alarm-ringing-title">Aufwachen!</h1>
        <p className="alarm-ringing-text">Zeit, dich für deine Ankunft vorzubereiten.</p>
        <button className="btn-stop-alarm" onClick={onStop}>
          Stop
        </button>
      </div>
    </div>
  );
}

export default AlarmRinging;
