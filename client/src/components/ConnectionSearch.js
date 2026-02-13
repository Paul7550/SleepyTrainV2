import React, { useState } from 'react';
import './ConnectionSearch.css';
import DateTimePicker from './DateTimePicker';

function ConnectionSearch({ onSearch, onEarlier, onLater, t }) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchTime, setSearchTime] = useState('');
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(from, to, searchDate, searchTime);
    }
  };

  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const handleDateTimeConfirm = (date, time) => {
    setSearchDate(date);
    setSearchTime(time);
    setShowDateTimePicker(false);
  };

  const formatDateTimeDisplay = () => {
    if (searchDate && searchTime) {
      return `${searchDate} ${searchTime}`;
    }
    return t.now || 'Now'; // Fallback if translation missing
  };

  return (
    <div className="card shadow-sm mx-auto mt-4" style={{ maxWidth: '500px' }}>
      <div className="card-body">
        <h4 className="card-title text-center mb-4">{t.searchTitle}</h4>
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-2">
            <span className="input-group-text bg-white border-end-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#eb0000" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
              </svg>
            </span>
            <input
              type="text"
              className="form-control form-control-sm border-start-0"
              id="from"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder={t.fromPlaceholder}
              required
            />
          </div>
          
          <div className="text-center my-1">
            <button 
              type="button" 
              className="btn btn-link text-danger p-0" 
              onClick={handleSwap}
              style={{ fontSize: '1.5rem', lineHeight: '1', textDecoration: 'none' }}
            >
              &#x21c5;
            </button>
          </div>

          <div className="input-group mb-4">
            <span className="input-group-text bg-white border-end-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#6c757d" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
              </svg>
            </span>
            <input
              type="text"
              className="form-control form-control-sm border-start-0"
              id="to"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder={t.toPlaceholder}
              required
            />
          </div>

          <div className="mb-4">
            <button
                type="button"
                className="btn btn-outline-secondary w-100"
                onClick={() => setShowDateTimePicker(true)}
            >
                {formatDateTimeDisplay()}
            </button>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-search">
              {t.searchButton}
            </button>
          </div>
        </form>
        
        <div className="d-flex justify-content-between mt-3">
          <button className="btn btn-outline-secondary" onClick={onEarlier}>
            &larr; {t.earlier}
          </button>
          <button className="btn btn-outline-secondary" onClick={onLater}>
            {t.later} &rarr;
          </button>
        </div>
      </div>

      {showDateTimePicker && (
        <DateTimePicker
            onConfirm={handleDateTimeConfirm}
            onCancel={() => setShowDateTimePicker(false)}
            t={t}
        />
      )}
    </div>
  );
}

export default ConnectionSearch;
