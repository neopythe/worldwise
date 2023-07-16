import CityItem from "@/components/CityItem";
import Message from "@/components/Message";
import Spinner from "@/components/Spinner";

import { useCities } from "@/hooks/useCities";

import styles from "./CityList.module.css";

function CityList() {
  const { cities, error, isLoading } = useCities();

  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking a city on the map" />
    );

  if (error) return <Message message={error} />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}

export default CityList;
