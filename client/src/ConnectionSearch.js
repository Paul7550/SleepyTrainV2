import React, { useState } from 'react';

function ConnectionSearch() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for connections from ${from} to ${to}`);
  };

  const handleEarlier = () => {
    alert('Suche nach früheren Verbindungen...');
  };

  const handleLater = () => {
    alert('Suche nach späteren Verbindungen...');
  };

  return (
    <div className="card shadow-sm mx-auto mt-4" style={{ maxWidth: '500px' }}>
      <div className="card-body">
        <h4 className="card-title text-center mb-4">Verbindung suchen</h4>
        <form onSubmit={handleSearch}>
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
              placeholder="Von (z.B. Wien Hbf)"
              required
            />
          </div>
          
          <div className="text-center text-danger fw-bold my-1" style={{ fontSize: '1.5rem', lineHeight: '1' }}>
            &darr;
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
              placeholder="Nach (z.B. Linz Hbf)"
              required
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-danger">
              Verbindung suchen
            </button>
          </div>
        </form>
        
        <div className="d-flex justify-content-between mt-3">
          <button className="btn btn-outline-secondary" onClick={handleEarlier}>
            &larr; Früher
          </button>
          <button className="btn btn-outline-secondary" onClick={handleLater}>
            Später &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConnectionSearch;
