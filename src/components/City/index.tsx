import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ButtonBack from "@/components/ButtonBack";
import Message from "@/components/Message";
import Spinner from "@/components/Spinner";

import { useCities } from "@/hooks/useCities";

import { formatDate } from "@/utils/formatDate";

import styles from "./City.module.css";

import type { City } from "@/types";

type Params = { id: string };

function City() {
  const { id } = useParams<Params>();

  const { currentCity, error, getCity, isLoading } = useCities();

  const [displayedCity, setDisplayedCity] = useState<City | null>(null);

  useEffect(() => {
    if (id) {
      setDisplayedCity(null);
      getCity(+id);
    }
  }, [getCity, id]);

  useEffect(() => {
    if (currentCity) setDisplayedCity(currentCity);
  }, [currentCity]);

  if (isLoading) return <Spinner />;

  if (error) return <Message message={error} />;
  if (!displayedCity) return null;

  const { cityName, emoji, date, notes } = displayedCity;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>
      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null, { weekday: true })}</p>
      </div>
      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}
      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>
      <div>
        <ButtonBack />
      </div>
    </div>
  );
}

export default City;
