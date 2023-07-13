import { NavLink, useLocation } from "react-router-dom";

import styles from "./AppNavigation.module.css";

function AppNavigation() {
  const location = useLocation();
  const isBaseRoute = location.pathname === "/app";

  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="cities" className={isBaseRoute ? "active" : ""}>
            Cities
          </NavLink>
        </li>
        <li>
          <NavLink to="countries">Countries</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AppNavigation;
