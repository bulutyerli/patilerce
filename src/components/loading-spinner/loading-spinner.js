import Image from 'next/image';
import styles from './loading-spinner.module.scss';
import loadingIcon from '../../../public/images/loading.svg';

export default function LoadingSpinner() {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}>
        <Image
          src={loadingIcon}
          alt="loading animation"
          width={100}
          height={100}
        ></Image>
      </div>
    </div>
  );
}
