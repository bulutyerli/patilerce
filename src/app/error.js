'use client';

import errorImage from '../../public/images/errorPageDog.jpg';
import Image from 'next/image';
import styles from '../styles/error.module.scss';
import CustomButton from '../components/custom-button/custom-button';
import Link from 'next/link';

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
      <div className={styles.buttons}>
        <CustomButton
          onClick={() => {
            reset();
          }}
          text={'Try Again'}
        ></CustomButton>
        <Link href={'/'}>
          <CustomButton style={'secondary'} text={'Home'}></CustomButton>
        </Link>
      </div>
    </div>
  );
}
