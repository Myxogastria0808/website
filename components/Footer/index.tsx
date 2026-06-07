import styles from "./index.module.css";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <small className={styles.copyright}>&copy; {year} Myxogastria0808</small>
      <small className={`${styles.copyrightWave} font-wavefont`}>&copy; {year} Myxogastria0808</small>
    </footer>
  );
}

