import styles from './adoptCard.module.scss';
import Image from 'next/image';
import { dateConverter } from '@/helpers/date-converter';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { PiHeart, PiHeartFill } from 'react-icons/pi';

export default async function AdoptCard({ data }) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?._id;
  const isFav = data.favoritedBy.some((id) => id === userId);

  return (
    <div className={styles.container}>
      <div>{isFav ? <PiHeartFill className={styles.heart} /> : ''}</div>
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
