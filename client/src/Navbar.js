import React, { useState } from 'react';

function Navbar({ onSettingsClick, toggleDarkMode, isDarkMode, t }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleGearClick = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-oebb-gradient">
      <div className="container-fluid position-relative">
        <div className="d-flex justify-content-center w-100">
          <a className="navbar-brand fw-bold fs-3" href="#home">Sleepy Train</a>
        </div>
        <div className="position-absolute end-0 pe-3">
          <div className="dropdown">
            <button 
              className="btn btn-link text-white p-0" 
              onClick={handleGearClick}
              style={{ fontSize: '1.5rem', textDecoration: 'none' }}
            >
              &#9881;
            </button>
            {showDropdown && (
              <ul className="dropdown-menu show dropdown-menu-end" style={{ position: 'absolute', right: 0, top: '100%', zIndex: 1050 }}>
                <li>
                  <button className="dropdown-item d-flex align-items-center" onClick={() => { onSettingsClick(); setShowDropdown(false); }}>
                    <span style={{ marginRight: '10px', fontSize: '1.2rem' }}>&#9881;</span>
                    {t.settings}
                  </button>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button className="dropdown-item d-flex align-items-center" onClick={() => { toggleDarkMode(); setShowDropdown(false); }}>
                    <span style={{ marginRight: '10px', fontSize: '1.2rem' }}>
                      {isDarkMode ? '☀️' : '🌙'}
                    </span>
                    {isDarkMode ? t.lightMode : t.darkMode}
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
