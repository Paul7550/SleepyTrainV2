import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Navbar from './Navbar';
import ConnectionSearch from './ConnectionSearch';
import SleepyTrain from './SleepyTrain';
import SkeletonCard from './SkeletonCard';
import ConnectionCard from './ConnectionCard';
import ConnectionDetail from './ConnectionDetail';
import AlarmBanner from './AlarmBanner';
import AlarmRinging from './AlarmRinging';
import Settings from './Settings';
import { translations } from './translations';

function App() {
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [connections, setConnections] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchParams, setSearchParams] = useState({ from: '', to: '' });
  const [activeAlarm, setActiveAlarm] = useState(null);
  const [isAlarmRinging, setIsAlarmRinging] = useState(false);
  const [alarmTimerId, setAlarmTimerId] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    defaultOffset: 10,
    language: 'de',
    sound: 'alarm.mp3',
    vibration: true,
    volume: 80,
    isDarkMode: false
  });

  const audioRef = useRef(null);
  const t = translations[settings.language];
  
  const testConnection = {
    departure: {
      time: '08:30',
      station: 'Wien Hbf',
      platform: '9A-C'
    },
    arrival: {
      time: '09:52',
      station: 'Linz Hbf',
      platform: '4'
    },
    duration: '1h 22min',
    trains: ['RJX 562'],
    stops: [
      { station: 'Wien Meidling', time: '08:37' },
      { station: 'St. Pölten Hbf', time: '08:55' },
      { station: 'Amstetten', time: '09:20' }
    ]
  };

  useEffect(() => {
    // Sync dark mode state with settings
    if (settings.isDarkMode !== isDarkMode) {
        setIsDarkMode(settings.isDarkMode);
    }
  }, [settings.isDarkMode]);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const fetchConnections = async (from, to, time = null) => {
    if (!from || !to) {
      alert(t.alertStartDest);
      return;
    }
    setIsLoading(true);
    try {
      let url = `http://localhost:5000/api/trains/?start=${from}&stop=${to}`;
      if (time) {
        url += `&time=${time}`;
      }
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
      });
      if (!response.ok) {
        throw new Error(t.networkError);
      }
      const data = await response.json();
      console.log(data);
      setConnections(Array.isArray(data.Trains) ? data.Trains : [data.Trains]);
    } catch (e) {
      console.log(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (from, to) => {
    setSearchParams({ from, to });
    fetchConnections(from, to);
  };

  const handleEarlier = () => {
    if (connections && connections.length > 0) {
      const firstDeparture = new Date(connections[0].departure.iso);
      const earlierTime = firstDeparture.getTime() - 60 * 60 * 1000; 
      fetchConnections(searchParams.from, searchParams.to, earlierTime);
    } else {
        alert(t.alertSearchFirst);
    }
  };

  const handleLater = () => {
    if (connections && connections.length > 0) {
      const lastDeparture = new Date(connections[connections.length - 1].departure.iso);
      const laterTime = lastDeparture.getTime() + 60 * 1000;
      fetchConnections(searchParams.from, searchParams.to, laterTime);
    } else {
        alert(t.alertSearchFirst);
    }
  };

  const handleSettingsClick = () => {
    setShowSettings(true);
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    setSettings(prev => ({ ...prev, isDarkMode: newMode }));
  };

  const handleSetAlarm = (alarm) => {
    // Clear any existing alarm
    if (alarmTimerId) {
      clearTimeout(alarmTimerId);
    }

    const arrivalTime = new Date(alarm.connection.arrival.iso);
    const wakeUpTime = new Date(arrivalTime.getTime() - alarm.offset * 60000);
    const timeToWake = wakeUpTime.getTime() - Date.now();

    if (timeToWake > 0) {
      const timerId = setTimeout(() => {
        setIsAlarmRinging(true);
        if (audioRef.current) {
          audioRef.current.volume = settings.volume / 100;
          audioRef.current.play();
        }
      }, timeToWake);
      setAlarmTimerId(timerId);
    }

    setActiveAlarm(alarm);
    setSelectedConnection(null); // Go back to the list view
  };

  const handleCancelAlarm = () => {
    if (alarmTimerId) {
      clearTimeout(alarmTimerId);
    }
    setActiveAlarm(null);
    setAlarmTimerId(null);
  };

  const handleShowAlarmDetails = () => {
    if (activeAlarm) {
      setSelectedConnection(activeAlarm.connection);
    }
  };

  const handleStopAlarm = () => {
    setIsAlarmRinging(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setActiveAlarm(null);
    setAlarmTimerId(null);
  };

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
      <Navbar 
        onSettingsClick={handleSettingsClick} 
        toggleDarkMode={toggleDarkMode}
        isDarkMode={isDarkMode}
        t={t}
      />
      <AlarmBanner 
        alarm={activeAlarm} 
        onCancel={handleCancelAlarm} 
        onShowDetails={handleShowAlarmDetails} 
        t={t}
      />
      {isAlarmRinging && <AlarmRinging onStop={handleStopAlarm} t={t} />}
      <audio ref={audioRef} src={`/sounds/${settings.sound}`} loop />

      <div className="container">
        {showSettings ? (
            <Settings 
                onBack={() => setShowSettings(false)}
                settings={settings}
                onUpdateSettings={setSettings}
                t={t}
            />
        ) : !selectedConnection ? (
          <>
            <ConnectionSearch 
                onSearch={handleSearch} 
                onEarlier={handleEarlier}
                onLater={handleLater}
                t={t}
            />
            <div className="mt-4">
              {isLoading ? (
                [...Array(5)].map((_, i) => <SkeletonCard key={i} />)
              ) : (
                connections ? (
                  connections.map((connection, index) => (
                    <ConnectionCard
                      key={index}
                      connection={connection}
                      onSelect={setSelectedConnection}
                    />
                  ))
                ) : (
                  <>
                    <ConnectionCard
                      connection={testConnection}
                      onSelect={setSelectedConnection}
                    />
                    <SkeletonCard />
                  </>
                )
              )}
            </div>
          </>
        ) : (
          <ConnectionDetail 
            connection={selectedConnection} 
            onBack={() => setSelectedConnection(null)} 
            onConfirmAlarm={handleSetAlarm}
            defaultOffset={settings.defaultOffset}
            t={t}
          />
        )}

        {!showSettings && (
            <div style={{ maxWidth: '300px', margin: '0 auto' }}>
            <SleepyTrain />
            </div>
        )}
      </div>
    </div>
  );
}

export default App;
