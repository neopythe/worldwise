import { LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";
import {
  useMap,
  useMapEvents,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useCities } from "@/hooks/useCities";

import styles from "./Map.module.css";

type Position = LatLngExpression;

function Map() {
  const [searchParams] = useSearchParams();

  const { cities } = useCities();

  const [position, setPosition] = useState<Position>([40, 0]);

  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");

  useEffect(() => {
    if (mapLat && mapLng) setPosition([+mapLat, +mapLng]);
  }, [mapLat, mapLng]);

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={position}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map(({ cityName, emoji, id, position: { lat, lng } }) => (
          <Marker key={id} position={[lat, lng]}>
            <Popup>
              <span>{emoji}</span>
              <span>{cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCentre position={position} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCentre({ position }: { position: Position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (event) => {
      const { lat, lng } = event.latlng;
      navigate(`form?lat=${lat}&lng=${lng}`);
    },
  });
  return null;
}

export default Map;
