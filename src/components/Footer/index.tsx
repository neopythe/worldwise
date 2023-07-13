import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <small className={styles.copyright}>
        &copy; Copyright {new Date().getFullYear()} WorldWise Inc.
      </small>
    </footer>
  );
}

export default Footer;
