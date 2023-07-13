import AppNavigation from "@/components/AppNavigation";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";

import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNavigation />
      <p>List of cities</p>
      <Footer />
    </div>
  );
}

export default Sidebar;
