import { NavLink } from "react-router-dom";

import Button from "@/components/Button";
import Logo from "@/components/Logo";

import { useAuth } from "@/hooks/useAuth";

import styles from "./PageNavigation.module.css";

function PageNavigation() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          {!isAuthenticated && (
            <NavLink to="/login" className={styles.ctaLink}>
              Login
            </NavLink>
          )}
          {isAuthenticated && (
            <Button type="back" onClick={() => logout()}>
              Logout
            </Button>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default PageNavigation;
