import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";

interface Props {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: Props) {
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) navigate("/login", { replace: true });
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
