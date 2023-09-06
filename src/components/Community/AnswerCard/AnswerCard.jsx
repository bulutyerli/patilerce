import styles from './answercard.module.scss';
import Image from 'next/image';
import catImage from 'public/images/cat-profile.svg';
import { dateConverter } from '@/helpers/dateConverter';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Link from 'next/link';

export default async function AnswerCard({ answer }) {
  const image = answer?.user?.image ?? catImage;
  const session = await getServerSession(authOptions);

  const userId = session?.user?._id;
  const answerUserId = answer.user.id;
  const isUser = userId === answerUserId;

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
        <span>{answer.user.name}</span> <br />
        answered <time>{dateConverter(answer.createdAt)}</time>
      </div>
      <p className={styles.answer}>{answer.answer}</p>
      {isUser && (
        <div className={styles.delete}>
          <Link href={`/community/delete/${answer.id}`}>Delete</Link>
        </div>
      )}
    </article>
  );
}
