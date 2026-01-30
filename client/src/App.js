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
    price: '€ 24,90',
    stops: [
      { station: 'Wien Meidling', time: '08:37' },
      { station: 'St. Pölten Hbf', time: '08:55' },
      { station: 'Amstetten', time: '09:20' }
    ]
  };

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        
        {!selectedConnection ? (
          <>
            <ConnectionSearch/>
            <div className="mt-4">
              <ConnectionCard
                connection={testConnection}
                onSelect={setSelectedConnection}
              />
              <SkeletonCard />
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
