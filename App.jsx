import React, { useState } from "react";
import Dashboard from "./assets/Dashboard";
import MapView from "./assets/MapView";
import Alerts from "./assets/Alerts";
import Profile from "./assets/Profile";
import Blockchain from "./assets/Blockchain";
import { Container, Nav, Navbar } from "react-bootstrap";
import Register from "./assets/Register";
import MapWithAlerts from "./assets/MapWithAlerts";

import NavigationBar from "./assets/NavigationBar";

function App() {
  const [tourist, setTourist] = useState(null);
  const [activePage, setActivePage] = useState("map");

  const [stats, setStats] = useState({
    incidentsByType: [
      { type: "Safe", value: 0 },
      { type: "Geo-fence Violation", value: 0 },
      { type: "Incidents", value: 0 },
    ],
    incidentsOverTime: [],
  });
  const [hotspots, setHotspots] = useState([]);

  const recordIncident = (type, position) => {
    setStats((prev) => {
      const updated = prev.incidentsByType.map((x) =>
        x.type === type ? { ...x, value: x.value + 1 } : x
      );
      const timeLabel = new Date().toLocaleTimeString();
      const newTimeEntry = {
        time: timeLabel,
        safe: type === "Safe" ? 1 : 0,
        warning: type === "Geo-fence Violation" ? 1 : 0,
        danger: type === "Incidents" ? 1 : 0,
      };
      return {
        incidentsByType: updated,
        incidentsOverTime: [...prev.incidentsOverTime, newTimeEntry].slice(-10),
      };
    });
    setHotspots((prev) => [...prev, { type, position, count: 1 }]);
  };

  return (
    <div>
      <NavigationBar activePage={activePage} setActivePage={setActivePage} />

      <h2 style={{ textAlign: "center", margin: "20px" }}>
        🛰️ Smart Tourist Safety Monitoring & Incident Response
      </h2>

      {!tourist ? (
        <Register setTourist={setTourist} />
      ) : (
        <>
          {activePage === "map" && <MapWithAlerts tourist={tourist} recordIncident={recordIncident} />}
          {activePage === "alerts" && <Alerts />}
          {activePage === "dashboard" && <Dashboard stats={stats} hotspots={hotspots} />}
        </>
      )}
    </div>
  );
}

export default App;