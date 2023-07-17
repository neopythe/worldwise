interface AuthActions {
  login: (email: string, password: string) => void;
  logout: () => void;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

type AuthContextType = AuthState & AuthActions;

interface CitiesActions {
  addCity: (city: City) => Promise<void>;
  deleteCity: (id: number) => Promise<void>;
  getCity: (id: number) => void;
}

interface CitiesState {
  cities: City[];
  currentCity: City | null;
  error: string | null;
  isLoading: boolean;
}

type CitiesContextType = CitiesState & CitiesActions;

interface City {
  cityName: string;
  country: string;
  emoji: string;
  date: string;
  notes: string;
  position: {
    lat: number;
    lng: number;
  };
  id: number;
}

interface Country {
  country: string;
  emoji: string;
}

interface User {
  avatar: string;
  email: string;
  name: string;
  password: string;
}

export type {
  AuthContextType,
  AuthState,
  CitiesContextType,
  CitiesActions,
  CitiesState,
  City,
  Country,
  User,
};
