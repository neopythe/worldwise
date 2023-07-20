import { createContext, useCallback, useEffect, useReducer } from "react";

import type { CitiesState, CitiesContextType, City } from "@/types";

export const CitiesContext = createContext<CitiesContextType | undefined>(
  undefined
);

const CITIES_API = `${import.meta.env.VITE_API_BASE_URL}/cities`;

const initialState: CitiesState = {
  cities: [],
  currentCity: null,
  error: null,
  isLoading: false,
};

type Action = {
  type: string;
  payload?: City | City[] | string | number | null;
};

function reducer(state: CitiesState, action: Action): CitiesState {
  const { type, payload } = action;
  switch (type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "cities/loaded":
      return {
        ...state,
        cities: payload as City[],
        isLoading: false,
      };
    case "city/loaded":
      return {
        ...state,
        currentCity: payload as City,
        isLoading: false,
      };
    case "city/added":
      return {
        ...state,
        cities: [...state.cities, payload as City],
        currentCity: payload as City,
        isLoading: false,
      };
    case "city/deleted":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== (payload as number)),
        currentCity: null,
        isLoading: false,
      };
    case "rejected":
      return {
        ...state,
        error: payload as string,
        isLoading: false,
      };
    default:
      return state;
  }
}

interface Props {
  children: React.ReactNode;
}

function CitiesProvider({ children }: Props) {
  const [{ cities, currentCity, error, isLoading }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    dispatch({ type: "loading" });
    fetch(CITIES_API)
      .then((response) => {
        if (!response.ok) throw new Error("Could not fetch cities");
        return response.json();
      })
      .then((data: City[]) => {
        dispatch({ type: "cities/loaded", payload: data });
      })
      .catch((error: Error) =>
        dispatch({ type: "rejected", payload: error.message })
      );
  }, []);

  async function addCity(city: City) {
    dispatch({ type: "loading" });
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
        if (data.id) dispatch({ type: "city/added", payload: data });
        else throw new Error("Could not add city");
      })
      .catch((error: Error) =>
        dispatch({ type: "rejected", payload: error.message })
      );
  }

  async function deleteCity(id: number) {
    dispatch({ type: "loading" });
    await fetch(`${CITIES_API}/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok)
          throw new Error("There was an error deleting this city");
      })
      .then(() => {
        dispatch({ type: "city/deleted", payload: id });
      })
      .catch((error: Error) =>
        dispatch({ type: "rejected", payload: error.message })
      );
  }

  const getCity = useCallback(
    function getCity(id: number) {
      // If the city is already loaded, don't fetch it again
      if (id === currentCity?.id) return;

      dispatch({ type: "loading" });
      fetch(`${CITIES_API}/${id}`)
        .then((response) => {
          if (!response.ok) throw new Error("City not found 😅");
          return response.json();
        })
        .then((data: City) => {
          if (data.id) dispatch({ type: "city/loaded", payload: data });
          else throw new Error("City not found 😅");
        })
        .catch((error: Error) =>
          dispatch({ type: "rejected", payload: error.message })
        );
    },
    [currentCity?.id]
  );

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
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export default CitiesProvider;
