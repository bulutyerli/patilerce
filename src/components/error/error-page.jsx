'use client';

import errorImage from 'public/images/errorPageDog.jpg';
import Image from 'next/image';
import styles from './error-page.module.scss';

export default function Error({ error, reset }) {
  return (
    <div className={styles.container}>
      <Image
        className={styles.image}
        src={errorImage}
        alt="error dog"
        width={500}
        height={500}
      ></Image>
      <h2>Something went wrong... </h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
