import styles from './answercard.module.scss';
import Image from 'next/image';
import catImage from 'public/images/cat-profile.svg';
import { dateConverter } from '@/helpers/dateConverter';

export default async function AnswerCard({ data }) {
  const image = data?.user?.image ?? catImage;

  return (
    <article className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          className={styles.image}
          src={image}
          alt="profile picture"
          width={45}
          height={45}
        ></Image>
      </div>
      <div className={styles.author}>
        <span>{data.user.name}</span> <br />
        answered <time>{dateConverter(data.createdAt)}</time>
      </div>
      <p className={styles.answer}>{data.answer}</p>
    </article>
  );
}
