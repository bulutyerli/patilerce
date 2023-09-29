import styles from './banned.module.scss';
import Link from 'next/link';

export default function BannedPage() {
  return (
    <section className={styles.container}>
      <h1>YOU HAVE BEEN BANNED</h1>
      <p>You did something wrong and you are banned.</p>
      <p>
        If you think there was a mistake, please{' '}
        <Link href={'/contact-us'}>contact us</Link>
      </p>
    </section>
  );
}
