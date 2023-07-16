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
import { useNavigate } from "react-router-dom";

import Button from "@/components/Button";

import { useCities } from "@/hooks/useCities";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useUrlPosition } from "@/hooks/useUrlPosition";

import styles from "./Map.module.css";

type Position = LatLngExpression;

function Map() {
  const [position, setPosition] = useState<Position>([40, 0]);

  const { cities } = useCities();

  const {
    getPosition,
    isLoading,
    position: geolocationPosition,
  } = useGeolocation();

  const [mapLat, mapLng] = useUrlPosition();

  useEffect(() => {
    if (mapLat && mapLng) setPosition([+mapLat, +mapLng]);
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geolocationPosition) setPosition(geolocationPosition);
  }, [geolocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button onClick={getPosition} type="position">
          {isLoading ? "Loading..." : "Use my position"}
        </Button>
      )}
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
  const { setError } = useCities();

  useMapEvents({
    click: (event) => {
      setError(null);
      const { lat, lng } = event.latlng;
      navigate(`form?lat=${lat}&lng=${lng}`);
    },
  });
  return null;
}

export default Map;
