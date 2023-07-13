import styles from "@/components/CountryItem.module.css";

interface Props {
  country: {
    emoji: string;
    country: string;
  };
}

function CountryItem({ country }: Props) {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
