// // components/Map.jsx
// import React from "react";
// import GoogleMapReact from "google-map-react";

// const Marker = () => (
//   <div style={{ color: "red", fontSize: "1.5rem" }}>📍</div>
// );

// export default function Map({ lat, lng }) {
//   const defaultProps = {
//     center: {
//       lat: lat || 20.5937, // Default to India center if lat/lng not available
//       lng: lng || 78.9629,
//     },
//     zoom: 15,
//   };

//   return (
//     <div style={{ height: "300px", width: "100%", marginTop: "1rem" }}>
//       <GoogleMapReact
//         bootstrapURLKeys={{ key: "AIzaSyAdjmxV6tpT-2MvHMHDnLsXivoBfG6Gk4g" }} // 🔑 Put your real API key here
//         center={defaultProps.center}
//         defaultZoom={defaultProps.zoom}
//       >
//         <Marker lat={defaultProps.center.lat} lng={defaultProps.center.lng} />
//       </GoogleMapReact>
//     </div>
//   );
// }



// import React, { useState, useEffect } from "react";
// import "leaflet/dist/leaflet.css";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   useMapEvents,
// } from "react-leaflet";
// import { toast } from "react-toastify";
// import * as L from "leaflet";

// export default function Map({ readonly, location, onChange }) {
//   return (
//     <div className="relative w-[35rem] h-[22rem] text-center">
//       <MapContainer
//         className="w-full h-full"
//         center={[0, 0]}
//         zoom={1}
//         dragging={!readonly}
//         touchZoom={!readonly}
//         doubleClickZoom={!readonly}
//         scrollWheelZoom={!readonly}
//         boxZoom={!readonly}
//         keyboard={!readonly}
//         attributionControl={false}
//       >
//         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//         <FindButtonAndMarker
//           readonly={readonly}
//           location={location}
//           onChange={onChange}
//         />
//       </MapContainer>
//     </div>
//   );
// }

// function FindButtonAndMarker({ readonly, location, onChange }) {
//   const [position, setPosition] = useState(location);

//   useEffect(() => {
//     if (readonly) {
//       map.setView(position, 13);
//       return;
//     }
//     if (position) onChange(position);
//   }, [position]);

//   const map = useMapEvents({
//     click(e) {
//       if (!readonly) setPosition(e.latlng);
//     },
//     locationfound(e) {
//       setPosition(e.latlng);
//       map.flyTo(e.latlng, 13);
//     },
//     locationerror(e) {
//       toast.error(e.message);
//     },
//   });

//   const markerIcon = new L.Icon({
//     iconUrl: "/marker-icon-2x.png",
//     iconSize: [25, 41],
//     iconAnchor: [12.5, 41],
//     popupAnchor: [0, -41],
//   });

//   return (
//     <>
//       {!readonly && (
//         <button
//           type="button"
//           onClick={() => map.locate()}
//           className="absolute top-0 left-0 right-0 w-48 min-h-[2.5rem] mx-auto z-[1000] bg-white hover:bg-gray-100 text-base rounded-b-xl border-t border-gray-300 cursor-pointer"
//         >
//           Find My Location
//         </button>
//       )}

//       {position && (
//         <Marker
//           eventHandlers={{
//             dragend: (e) => {
//               setPosition(e.target.getLatLng());
//             },
//           }}
//           position={position}
//           draggable={!readonly}
//           icon={markerIcon}
//         >
//           <Popup>Shipping Location</Popup>
//         </Marker>
//       )}
//     </>
//   );
// }



import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";

// Marker component for map
const Marker = () => (
  <div style={{ color: "red", fontSize: "2rem" }}>📍</div>
);

export default function Map() {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  // Function to handle geolocation
  const getGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting geolocation:", error);
          // You can set default values or handle the error as needed
          setLat(20.5937); // Default to India center
          setLng(78.9629); // Default to India center
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      setLat(20.5937); // Default to India center
      setLng(78.9629); // Default to India center
    }
  };

  // Call the geolocation function when the component mounts
  useEffect(() => {
    getGeolocation();
  }, []);

  // If latitude and longitude are not available yet, you can show a loading message or spinner
  if (lat === null || lng === null) {
    return <div>Loading map...</div>;
  }

  const defaultProps = {
    center: {
      lat: lat,
      lng: lng,
    },
    zoom: 15,
  };

  return (
    <div style={{ height: "300px", width: "100%", marginTop: "1rem" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAdjmxV6tpT-2MvHMHDnLsXivoBfG6Gk4g" }} // 🔑 Replace with your real API key
        center={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {/* Marker placed at the user's current location */}
        <Marker lat={defaultProps.center.lat} lng={defaultProps.center.lng} />
      </GoogleMapReact>
    </div>
  );
}
