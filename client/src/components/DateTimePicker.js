import React, { useState } from 'react';
import './DateTimePicker.css';

function DateTimePicker({ onConfirm, onCancel, t }) {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const handleConfirm = () => {
        if (date && time) {
            onConfirm(date, time);
        }
    };

    return (
        <div className="datetime-picker-overlay">
            <div className="datetime-picker-card">
                <h3>{t.selectDateTime || 'Select Date & Time'}</h3>
                <div className="datetime-input-group">
                    <label>{t.date || 'Date'}</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="datetime-input-group">
                    <label>{t.time || 'Time'}</label>
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="datetime-actions">
                    <button className="btn-cancel" onClick={onCancel}>
                        {t.cancel || 'Cancel'}
                    </button>
                    <button
                        className="btn-confirm"
                        onClick={handleConfirm}
                        disabled={!date || !time}
                    >
                        {t.confirm || 'Confirm'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DateTimePicker;
