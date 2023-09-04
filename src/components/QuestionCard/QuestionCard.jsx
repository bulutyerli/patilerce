import styles from './questioncard.module.scss';
import Image from 'next/image';
import catImage from 'public/images/cat-profile.svg';
import { dateConverter } from '@/helpers/dateConverter';
import Link from 'next/link';

export default async function QuestionCard({ data }) {
  const image = data?.user?.image ?? catImage;
  let longQuestion;
  let formattedQuestion;

  if (data.question.split(' ').length < 50) {
    formattedQuestion = data.question;
  } else {
    formattedQuestion = data.question.split(' ').slice(0, 50).join(' ');
    longQuestion = true;
  }

  return (
    <article className={styles.container}>
      <h2 className={styles.title}>
        <Link href={`/community/${data._id}`}>{data.title}</Link>
      </h2>
      <div className={styles.imageContainer}>
        <Image
          className={styles.image}
          src={image}
          alt="profile picture"
          width={50}
          height={50}
        ></Image>
      </div>
      <div className={styles.author}>
        <span>{data.user.name}</span> asked{' '}
        <time>{dateConverter(data.createdAt)}</time>
      </div>
      <p className={styles.question}>
        {formattedQuestion}
        <Link className={styles.readMore} href={`/community/${data._id}`}>
          {longQuestion ? '...Read More' : ''}
        </Link>
      </p>
      <div>Answers:</div>
    </article>
  );
}
