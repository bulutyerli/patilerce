import Link from 'next/link';
import styles from './footer.module.scss';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <p className={styles.copy}>© Copyright {year} Bulut Yerli</p>
      <Link href={'/about-us'} className={styles.aboutUs}>
        About Us
      </Link>
    </footer>
  );
}
