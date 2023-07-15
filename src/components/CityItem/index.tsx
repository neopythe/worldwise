import { Link } from "react-router-dom";

import { useCities } from "@/hooks/useCities";

import { formatDate } from "@/utils/formatDate";

import styles from "./CityItem.module.css";

import type { City } from "@/types";

interface Props {
  city: City;
}

function CityItem({
  city: {
    cityName,
    emoji,
    date,
    id,
    position: { lat, lng },
  },
}: Props) {
  const { currentCity } = useCities();

  const queryString = `lat=${lat}&lng=${lng}`;

  return (
    <li>
      <Link
        to={`${id}?${queryString}`}
        className={`${styles.cityItem} ${
          id === currentCity?.id ? styles["cityItem--active"] : ""
        }`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}

export default CityItem;
