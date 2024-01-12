import Image from 'next/image';
import styles from './loading-spinner.module.scss';
import imageKitLoader from '@/lib/imageKitLoader/imageLoader';

export default function LoadingSpinner() {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}>
        <Image
          loader={imageKitLoader}
          src="images/loading.svg"
          alt="loading animation"
          width={100}
          height={100}
        ></Image>
      </div>
    </div>
  );
}
