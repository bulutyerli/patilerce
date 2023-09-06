import styles from '../styles/not-found.module.scss';
import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1>Not Found</h1>
        <p>Sorry, there is no such page here.</p>
        <Link href="/">Return to Home</Link>
      </div>
      <Image
        className={styles.image}
        src="/images/notfound-dog.png"
        width={300}
        height={300}
        alt="surprised dog"
      ></Image>
    </div>
  );
}
