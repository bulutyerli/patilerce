import styles from './adoptCard.module.scss';
import Image from 'next/image';
import { dateConverter } from '@/helpers/date-converter';

export default function AdoptCard({ data }) {
  return (
    <div className={styles.container}>
      <div>
        <Image
          className={styles.image}
          src={data.images[0]}
          alt={`${data.breed} image`}
          width={100}
          height={100}
        ></Image>
      </div>
      <div className={styles.info}>
        <div className={styles.breed}>{data.breed}</div>
        <div className={styles.title}>{data.title}</div>
        <div className={styles.date}>{dateConverter(data.createdAt)}</div>
      </div>
    </div>
  );
}
