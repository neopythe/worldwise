import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@/components/Button";
import PageNavigation from "@/components/PageNavigation";

import { useAuth } from "@/hooks/useAuth";

import styles from "./Login.module.css";

function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  const navigate = useNavigate();

  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    if (isAuthenticated) navigate("/app", { replace: true });
  }, [isAuthenticated, navigate]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (email && password) login(email, password);
  }

  return (
    <main className={styles.login}>
      <PageNavigation />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
        </div>
        <div>
          <Button type={!email || !password ? "back" : "primary"}>Login</Button>
        </div>
      </form>
    </main>
  );
}

export default Login;
