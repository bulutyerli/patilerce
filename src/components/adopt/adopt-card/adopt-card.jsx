import styles from './adoptCard.module.scss';
import Image from 'next/image';
import { dateConverter } from '@/helpers/date-converter';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { PiHeartFill } from 'react-icons/pi';
import imageKitLoader from '@/lib/imageKitLoader/imageLoader';

export default async function AdoptCard({ data, homepage }) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?._id;
  const isFav = data.favoritedBy.some((id) => id === userId);
  return (
    <div className={`${styles.container} ${homepage ? styles.homepage : ''}`}>
      <div>{isFav ? <PiHeartFill className={styles.heart} /> : ''}</div>
      <div className={styles.imageContainer}>
        <Image
          loader={imageKitLoader}
          className={styles.image}
          src={data.images[0]}
          alt={`${data.breed} image`}
          width={300}
          height={300}
        ></Image>
      </div>
      <div className={styles.info}>
        <div className={styles.breed}>{data.breed}</div>
        {homepage ? '' : <div className={styles.title}>{data.title}</div>}
        <div className={styles.date}>{dateConverter(data.createdAt)}</div>
      </div>
    </div>
  );
}
