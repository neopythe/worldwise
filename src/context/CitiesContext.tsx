import { createContext, useEffect, useState } from "react";

import type { City } from "@/types";

interface Props {
  children: React.ReactNode;
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const CitiesContext = createContext({
  cities: [] as City[],
  isLoading: false,
});

function CitiesProvider({ children }: Props) {
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <CitiesContext.Provider value={{ cities, isLoading }}>
      {children}
    </CitiesContext.Provider>
  );
}

export default CitiesProvider;
