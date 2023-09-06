import spinner from 'public/images/loading.svg';
import Image from 'next/image';
import styles from './loading-spinner.module.scss';

export default function LoadingSpinner() {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}>
        <Image
          src={spinner}
          alt="loading animation"
          width={100}
          height={100}
        ></Image>
      </div>
    </div>
  );
}
