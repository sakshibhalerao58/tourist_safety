// src/components/Dashboard.jsx
import React from "react";
import { Card } from "react-bootstrap";
import { PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const COLORS = ["#28a745", "#ffc107", "#dc3545"]; // success, warning, danger

function Dashboard({ stats, hotspots }) {
  return (
    <div style={{ padding: "20px" }}>
      <h3>📊 Safety & Incident Reporting Dashboard</h3>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {/* Pie Chart */}
        <Card style={{ padding: "20px", flex: 1, minWidth: "350px" }}>
          <h5>Incidents by Type</h5>
          <PieChart width={300} height={250}>
            <Pie
              data={stats.incidentsByType}
              dataKey="value"
              nameKey="type"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {stats.incidentsByType.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </Card>

        {/* Line Chart */}
        <Card style={{ padding: "20px", flex: 1, minWidth: "350px" }}>
          <h5>Incidents Over Time</h5>
          <LineChart width={350} height={250} data={stats.incidentsOverTime}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="safe" stroke="#28a745" />
            <Line type="monotone" dataKey="warning" stroke="#ffc107" />
            <Line type="monotone" dataKey="danger" stroke="#dc3545" />
          </LineChart>
        </Card>

        {/* Hotspot Map */}
        <Card style={{ padding: "20px", flex: 1, minWidth: "350px" }}>
          <h5>Hotspot Map</h5>
          <MapContainer center={[19.8762, 75.3433]} zoom={13} style={{ height: "250px", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {hotspots.map((h, i) => (
              <Marker key={i} position={h.position}>
                <Popup>
                  <b>{h.type}</b> <br /> Count: {h.count}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
