import styles from './footer.module.scss';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>© Copyright {year} Bulut Yerli</footer>
  );
}
