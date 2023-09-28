import Link from 'next/link';
import styles from './footer.module.scss';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <p className={styles.copy}>© Copyright {year} Bulut Yerli</p>
      <nav className={styles.footerNav}>
        <Link href={'/about-us'} className={styles.footerLinks}>
          About Us
        </Link>
        <Link href={'/contact-us'} className={styles.footerLinks}>
          Contact
        </Link>
      </nav>
    </footer>
  );
}
