import styles from './questioncard.module.scss';
import Image from 'next/image';
import catImage from 'public/images/cat-profile.svg';
import { dateConverter } from '@/helpers/dateConverter';
import Link from 'next/link';
import { PiChatCircleBold } from 'react-icons/pi';
import { getAnswersCount } from '@/app/lib/community/getAnswers';

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

  const totalAnswers = await getAnswersCount(data?.id);

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
      <div className={styles.question}>
        {formattedQuestion}
        <Link className={styles.readMore} href={`/community/${data._id}`}>
          {longQuestion ? '...Read More' : ''}
        </Link>
      </div>{' '}
      <div className={styles.iconContainer}>
        <Link href={`/community/${data._id}`}>
          <PiChatCircleBold className={styles.icon} />
          <div className={styles.badge}>{totalAnswers}</div>
        </Link>
      </div>
    </article>
  );
}
