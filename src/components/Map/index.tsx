import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
// import { useNavigate, useSearchParams } from "react-router-dom";

import styles from "./Map.module.css";

function Map() {
  // const [searchParams] = useSearchParams();

  const [position] = useState<[number, number]>([40, 0]);

  // const navigate = useNavigate();

  // const lat = searchParams.get("lat");
  // const lng = searchParams.get("lng");

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;
