import styles from '../styles/notFound.module.scss';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1>Not found</h1>
      <p>Sorry, there is no such page here.</p>
      <Link href="/">Return to Home</Link>
    </div>
  );
}
