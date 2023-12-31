import { useContext } from "react";

import { AuthContext } from "@/context/FakeAuthContext";

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) throw new Error("useAuth must be used within a AuthProvider");

  return context;
}

export { useAuth };
