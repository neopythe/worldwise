import CountryItem from "@/components/CountryItem";
import Message from "@/components/Message";
import Spinner from "@/components/Spinner";

import { useCities } from "@/hooks/useCities";

import type { Country } from "@/types";

import styles from "./CountryList.module.css";

function CountryList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking a city on the map" />
    );

  const countries = cities.reduce((array, city) => {
    const country = array.find((item) => item.country === city.country);

    if (!country) array.push({ country: city.country, emoji: city.emoji });

    return array;
  }, [] as Country[]);

  // Alternate solution using the map and includes methods
  // const countries = cities.reduce((arr, city) => {
  //   if (!arr.map((el) => el.country).includes(city.country))
  //     return [...arr, { country: city.country, emoji: city.emoji }];
  //   else return arr;
  // }, [] as Country[]);

  // Sorting the new array of countries alphabetically
  countries.sort((a, b) => a.country.localeCompare(b.country));

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.country} country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
