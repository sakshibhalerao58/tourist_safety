// src/components/MapWithAlerts.jsx
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import { Alert, Button } from "react-bootstrap";
import "leaflet/dist/leaflet.css";

function MapWithAlerts({ tourist }) {
  const [alerts, setAlerts] = useState([]);
  const [touristPos, setTouristPos] = useState([19.8762, 75.3433]); // Aurangabad
  const geoFenceCenter = [19.8762, 75.3433];
  const geoFenceRadius = 1000; // 1km

  useEffect(() => {
    const interval = setInterval(() => {
      const newPos = [
        touristPos[0] + (Math.random() - 0.5) * 0.01,
        touristPos[1] + (Math.random() - 0.5) * 0.01,
      ];
      setTouristPos(newPos);

      const distance = getDistance(newPos, geoFenceCenter);
      if (distance > geoFenceRadius) {
        addAlert("warning", `⚠️ ${tourist?.name} (${tourist?.blockchainId}) crossed geo-fence!`);
      } else {
        addAlert("success", `✅ ${tourist?.name} is inside safe zone.`);
      }

      if (Math.random() < 0.2) {
        addAlert(
          "danger",
          `🚨 Incident detected for ${tourist?.name} (${tourist?.blockchainId}). Authorities notified!`
        );
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [touristPos, tourist]);

  const addAlert = (type, msg) => {
    setAlerts((prev) => [...prev.slice(-4), { type, msg }]);
  };

  const clearAlerts = () => setAlerts([]);
//Haversine

  const getDistance = (pos1, pos2) => {
    const R = 6371e3;
    const φ1 = (pos1[0] * Math.PI) / 180;
    const φ2 = (pos2[0] * Math.PI) / 180;
    const Δφ = ((pos2[0] - pos1[0]) * Math.PI) / 180;
    const Δλ = ((pos2[1] - pos1[1]) * Math.PI) / 180;
    const a =
      Math.sin(Δφ / 2) ** 2 +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
      <div style={{ flex: 2, height: "500px" }}>
        <MapContainer center={geoFenceCenter} zoom={14} style={{ height: "100%", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Circle center={geoFenceCenter} radius={geoFenceRadius} pathOptions={{ color: "blue" }} />
          <Marker position={touristPos}>
            <Popup>
              {tourist?.name} ({tourist?.blockchainId}) <br /> Current Location
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      <div style={{ flex: 1, maxHeight: "500px", overflowY: "auto" }}>
        <h4>🚨 Alerts Panel</h4>
        {alerts.length === 0 && (
          <Alert variant="info">ℹ️ Monitoring... no incidents yet.</Alert>
        )}
        {alerts.map((a, i) => (
          <Alert key={i} variant={a.type}>{a.msg}</Alert>
        ))}
        {alerts.length > 0 && (
          <Button variant="dark" onClick={clearAlerts} style={{ marginTop: "10px" }}>
            Clear Alerts
          </Button>
        )}
      </div>
    </div>
  );
}

export default MapWithAlerts;
