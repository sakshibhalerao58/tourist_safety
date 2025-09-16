import React, { createContext, useState, useEffect } from 'react';
import L from 'leaflet'; // Ensure Leaflet is imported

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [incidents, setIncidents] = useState([]);
  const [touristLocation, setTouristLocation] = useState([20.9048, 77.7345]);
  
  // Define the safe zone for geo-fencing
  const safeZone = { center: [20.9048, 77.7345], radius: 500 }; 

  useEffect(() => {
    let interval;
    if (user) {
      interval = setInterval(() => {
        // Simulate random movement
        const newLat = touristLocation[0] + (Math.random() - 0.5) * 0.001;
        const newLng = touristLocation[1] + (Math.random() - 0.5) * 0.001;
        setTouristLocation([newLat, newLng]);

        if (L.latLng) { // Check if L is defined before using it
          const distance = L.latLng(newLat, newLng).distanceTo(safeZone.center);
          
          if (distance > safeZone.radius) {
            const newIncident = {
              id: Date.now(),
              type: 'Geo-fence breach',
              location: `Lat: ${newLat.toFixed(4)}, Lng: ${newLng.toFixed(4)}`,
              status: 'Active',
              touristId: user.blockchainId,
              timestamp: new Date().toISOString(),
            };
            setIncidents(prevIncidents => [newIncident, ...prevIncidents]);
          }

          if (Math.random() < 0.01) { 
            const newIncident = {
              id: Date.now() + 1,
              type: 'AI distress signal',
              location: `Lat: ${newLat.toFixed(4)}, Lng: ${newLng.toFixed(4)}`,
              status: 'Active',
              touristId: user.blockchainId,
              timestamp: new Date().toISOString(),
            };
            setIncidents(prevIncidents => [newIncident, ...prevIncidents]);
          }
        }
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [user, touristLocation, safeZone]);

  const value = {
    user,
    setUser,
    incidents,
    touristLocation,
    safeZone,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;