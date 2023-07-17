import { createContext, useReducer } from "react";

import type { AuthContextType, AuthState, User } from "@/types";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

type Action = {
  payload?: User;
  type: string;
};

function reducer(state: AuthState, action: Action): AuthState {
  const { payload, type } = action;
  switch (type) {
    case "login":
      return {
        ...state,
        isAuthenticated: true,
        user: payload as User,
      };
    case "logout":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
}

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

interface Props {
  children: React.ReactNode;
}

function AuthProvider({ children }: Props) {
  // Handling our state with useReducer, as our state variables will always be updated together
  const [{ isAuthenticated, user }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email: string, password: string) {
    // This is where we would typically have an API call to authenticate the user
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
