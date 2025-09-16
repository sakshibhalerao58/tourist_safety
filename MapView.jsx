import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function MapView() {
  return (
    <div style={{ height: "500px" }}>
      <MapContainer center={[19.076, 72.8777]} zoom={12} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[19.076, 72.8777]}>
          <Popup>Tourist Location - Mumbai</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default MapView;
