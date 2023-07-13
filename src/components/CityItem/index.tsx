import type { City } from "@/types";

import { formatDate } from "@/utils/formatDate";

import styles from "./CityItem.module.css";

interface Props {
  city: City;
}

function CityItem({ city: { cityName, emoji, date } }: Props) {
  return (
    <li className={styles.cityItem}>
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>{formatDate(date)}</time>
      <button className={styles.deleteBtn}>&times;</button>
    </li>
  );
}

export default CityItem;
