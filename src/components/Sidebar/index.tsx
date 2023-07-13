import AppNavigation from "@/components/AppNavigation";
import Logo from "@/components/Logo";

import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNavigation />
    </div>
  );
}

export default Sidebar;
