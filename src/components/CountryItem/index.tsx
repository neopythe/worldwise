import styles from "./CountryItem.module.css";

interface Props {
  country: {
    emoji: string;
    country: string;
  };
}

function CountryItem({ country: { emoji, country } }: Props) {
  return (
    <li className={styles.countryItem}>
      <span>{emoji}</span>
      <span>{country}</span>
    </li>
  );
}

export default CountryItem;
