import styles from './breed-card.module.scss';
import Image from 'next/image';
import imageKitLoader from '@/lib/imageKitLoader/imageLoader';

export default function BreedCard({ image, name }) {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          loader={imageKitLoader}
          className={styles.image}
          src={image}
          width={200}
          height={200}
          alt="breed image"
        ></Image>
      </div>
      <div className={styles.info}>
        <h2>{name}</h2>
      </div>
    </div>
  );
}
