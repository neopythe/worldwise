import { City } from "@/types";

import CityItem from "@/components/CityItem";
import Message from "@/components/Message";
import Spinner from "@/components/Spinner";

import styles from "./CityList.module.css";

interface Props {
  cities: City[];
  isLoading: boolean;
}

function CityList({ cities, isLoading }: Props) {
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking a city on the map" />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}

export default CityList;
