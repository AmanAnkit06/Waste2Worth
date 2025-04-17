// components/Map.jsx
import React from "react";
import GoogleMapReact from "google-map-react";

const Marker = () => (
  <div style={{ color: "red", fontSize: "1.5rem" }}>📍</div>
);

export default function Map({ lat, lng }) {
  const defaultProps = {
    center: {
      lat: lat || 20.5937, // Default to India center if lat/lng not available
      lng: lng || 78.9629,
    },
    zoom: 15,
  };

  return (
    <div style={{ height: "300px", width: "100%", marginTop: "1rem" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyA-DemoFakeKeyForTestingOnly12345678" }} // 🔑 Put your real API key here
        center={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <Marker lat={defaultProps.center.lat} lng={defaultProps.center.lng} />
      </GoogleMapReact>
    </div>
  );
}
