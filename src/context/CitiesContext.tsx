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
        cities,
        currentCity,
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
