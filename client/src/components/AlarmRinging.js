import React from 'react';
import './AlarmRinging.css';

function AlarmRinging({ onStop, t }) {
  return (
    <div className="alarm-ringing-overlay">
      <div className="alarm-ringing-box">
        <div className="alarm-ringing-icon">⏰</div>
        <h1 className="alarm-ringing-title">{t.wakeUp}</h1>
        <p className="alarm-ringing-text">{t.prepareArrival}</p>
        <button className="btn-stop-alarm" onClick={onStop}>
          {t.stop}
        </button>
      </div>
    </div>
  );
}

export default AlarmRinging;
