import React, { useState } from 'react';
import './App.css';
import Navbar from './Navbar';
import ConnectionSearch from './ConnectionSearch';
import SleepyTrain from './SleepyTrain';
import SkeletonCard from './SkeletonCard';
import ConnectionCard from './ConnectionCard';
import ConnectionDetail from './ConnectionDetail';

function App() {
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [connections, setConnections] = useState(null);
  
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

  const handleSearch = async (from, to) => {
    if (!from || !to) {
      alert('Bitte geben Sie Start- und Zielbahnhof ein.');
      return;
    }
    setIsLoading(true);
    try {
      console.log(from,to);
      const response = await fetch(`http://localhost:5000/api/trains/?start=${from}&stop=${to}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
      });
      if (!response.ok) {
        throw new Error('Netzwerkantwort war nicht ok');
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

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        {!selectedConnection ? (
          <>
            <ConnectionSearch onSearch={handleSearch} />
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
          />
        )}

        <div style={{ maxWidth: '300px', margin: '0 auto' }}>
          <SleepyTrain />
        </div>
      </div>
    </div>
  );
}

export default App;
