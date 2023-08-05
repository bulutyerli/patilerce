import Link from 'next/link';
import styles from './breedCard.module.scss';
import Image from 'next/image';

export default function BreedCard({ image, data }) {
  let shortDesc;
  if (data.description) {
    const description = data.description;
    shortDesc = description.split(' ').slice(0, 15).join(' ');
  } else {
    shortDesc = data.temperament;
  }
  return (
    <div className={styles.container}>
      <Image
        className={styles.image}
        src={image}
        width={300}
        height={300}
        alt="breed image"
        priority
      ></Image>
      <div className={styles.info}>
        <h1>{data.name}</h1>
        <p>{shortDesc}...</p>
      </div>
    </div>
  );
}
