import React from 'react';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-oebb-gradient">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold" href="#home">ÖBB</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#tickets">Tickets</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#fahrplan">Fahrplan</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#services">Services</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
