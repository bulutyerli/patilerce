import styles from './breedCard.module.scss';
import Image from 'next/image';

export default function BreedCard({ image, name, country }) {
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
        <h1>{name}</h1>
      </div>
    </div>
  );
}
