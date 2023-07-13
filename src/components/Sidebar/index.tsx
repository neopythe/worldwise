import { Outlet } from "react-router-dom";

import AppNavigation from "@/components/AppNavigation";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";

import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNavigation />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Sidebar;
