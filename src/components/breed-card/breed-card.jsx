import styles from './breed-card.module.scss';
import Image from 'next/image';

export default function BreedCard({ image, name }) {
  return (
    <div className={styles.container}>
      <Image
        className={styles.image}
        src={image}
        width={96}
        height={96}
        alt="breed image"
      ></Image>
      <div className={styles.info}>
        <h2>{name}</h2>
      </div>
    </div>
  );
}
