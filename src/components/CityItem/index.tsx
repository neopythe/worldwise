import { Link } from "react-router-dom";

import type { City } from "@/types";

import { formatDate } from "@/utils/formatDate";

import styles from "./CityItem.module.css";

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
  const queryString = `lat=${lat}&lng=${lng}`;

  return (
    <li>
      <Link to={`${id}?${queryString}`} className={styles.cityItem}>
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}

export default CityItem;
