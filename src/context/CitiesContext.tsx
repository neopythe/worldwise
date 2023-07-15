import { createContext, useEffect, useState } from "react";

import type { City } from "@/types";

interface Props {
  children: React.ReactNode;
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const CitiesContext = createContext<{
  cities: City[];
  currentCity: City | null;
  error: Error | null;
  getCity: (id: number) => void;
  isLoading: boolean;
}>({
  cities: [],
  currentCity: null,
  error: null,
  getCity: () => {
    throw new Error("getCity function must be overridden in provider");
  },
  isLoading: false,
});

function CitiesProvider({ children }: Props) {
  const [cities, setCities] = useState<City[]>([]);
  const [currentCity, setCurrentCity] = useState<City | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${BASE_URL}/cities`)
      .then((response) => response.json())
      .then((data: City[]) => {
        setCities(data);
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, []);

  function getCity(id: number) {
    setIsLoading(true);
    fetch(`${BASE_URL}/cities/${id}`)
      .then((response) => response.json())
      .then((data: City) => {
        if (data.id) setCurrentCity(data);
        else throw new Error("City not found 😅");
      })
      .catch((error: Error) => setError(error))
      .finally(() => setIsLoading(false));
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        currentCity,
        error,
        getCity,
        isLoading,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export default CitiesProvider;
