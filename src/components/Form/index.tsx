import { useEffect, useRef, useState } from "react";

import Button from "@/components/Button";
import ButtonBack from "@/components/ButtonBack";
import Message from "@/components/Message";
import Spinner from "@/components/Spinner";

import { useCities } from "@/hooks/useCities";
import { useUrlPosition } from "@/hooks/useUrlPosition";

import { convertToEmoji } from "@/utils/convertToEmoji";

import styles from "./Form.module.css";

const REVERSE_GEOCODE_URL = import.meta.env.VITE_API_REVERSE_GEOCODE_URL;

function Form() {
  const emojiRef = useRef<string | null>(null);
  const emoji = emojiRef.current;

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(String(new Date()));
  const [isLoading, setIsLoading] = useState(false);
  const [notes, setNotes] = useState("");
  const [geocodingError, setGeocodingError] = useState<string | null>(null);

  const { error: contextError } = useCities();

  const [lat, lng] = useUrlPosition();

  useEffect(() => {
    if (lat && lng) {
      const queryString = `latitude=${lat}&longitude=${lng}`;

      setIsLoading(true);
      setGeocodingError(null);
      fetch(`${REVERSE_GEOCODE_URL}?${queryString}`)
        .then((response) => response.json())
        .then(
          (data: {
            city?: string;
            countryCode: string;
            countryName?: string;
            locality: string;
          }) => {
            if (!data.countryName) {
              emojiRef.current = null;
              setCityName("");
              setCountry("");
              throw new Error(
                "That doesn't seem to be a city. Try somewhere else 😯"
              );
            } else {
              const emoji = convertToEmoji(data.countryCode);
              emojiRef.current = emoji;
              setCityName(data.city || data.locality);
              setCountry(data.countryName);
            }
          }
        )
        .catch((error: Error) => setGeocodingError(error.message))
        .finally(() => setIsLoading(false));
    }
  }, [lat, lng]);

  if (isLoading) return <Spinner />;

  if (geocodingError) return <Message message={geocodingError} />;
  if (contextError) return <Message message={contextError} />;

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(event) => setCityName(event.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(event) => setDate(event.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(event) => setNotes(event.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button onClick={() => {}}>Add</Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;
