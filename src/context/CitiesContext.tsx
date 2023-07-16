import { createContext, useEffect, useState } from "react";

import type { CitiesContextType, City } from "@/types";

export const CitiesContext = createContext<CitiesContextType | undefined>(
  undefined
);

interface Props {
  children: React.ReactNode;
}

const CITIES_API = `${import.meta.env.VITE_API_BASE_URL}/cities`;

function CitiesProvider({ children }: Props) {
  const [cities, setCities] = useState<City[]>([]);
  const [currentCity, setCurrentCity] = useState<City | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(CITIES_API)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not fetch cities");
        }
        return response.json();
      })
      .then((data: City[]) => {
        setCities(data);
      })
      .catch((error: Error) => setError(error.message))
      .finally(() => setIsLoading(false));

    return () => {
      setError(null);
    };
  }, []);

  async function addCity(city: City) {
    setIsLoading(true);
    await fetch(CITIES_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(city),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Could not add city");
        return response.json();
      })
      .then((data: City) => {
        if (data.id) setCities((cities) => [...cities, data]);
      })
      .catch((error: Error) => setError(error.message))
      .finally(() => setIsLoading(false));
  }

  async function deleteCity(id: number) {
    setIsLoading(true);
    await fetch(`${CITIES_API}/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok)
          throw new Error("There was an error deleting this city");
      })
      .then(() => {
        setCities((cities) => cities.filter((city) => city.id !== id));
      })
      .catch((error: Error) => setError(error.message))
      .finally(() => setIsLoading(false));
  }

  function getCity(id: number) {
    setIsLoading(true);
    fetch(`${CITIES_API}/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error("City not found 😅");
        return response.json();
      })
      .then((data: City) => {
        if (data.id) setCurrentCity(data);
        else throw new Error("City not found 😅");
      })
      .catch((error: Error) => setError(error.message))
      .finally(() => setIsLoading(false));
  }

  return (
    <CitiesContext.Provider
      value={{
        addCity,
        cities,
        currentCity,
        deleteCity,
        error,
        getCity,
        isLoading,
        setError,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export default CitiesProvider;
