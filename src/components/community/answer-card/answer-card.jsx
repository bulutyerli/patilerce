import styles from './answer-card.module.scss';
import Image from 'next/image';
import { dateConverter } from '@/helpers/date-converter';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Link from 'next/link';
import { DeletePosts } from '@/lib/delete-posts/delete-posts';
import { PiTrash } from 'react-icons/pi';

export default async function AnswerCard({ answer, searchParams }) {
  const image = answer?.user?.image;
  const session = await getServerSession(authOptions);
  const showAnswerModal = searchParams.modalanswer;
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
      {isUser ||
        (session?.user?.isAdmin && (
          <div className={styles.delete}>
            <PiTrash />
            <Link href={`?modalanswer=${answer.id}`}>Delete</Link>
          </div>
        ))}
      {showAnswerModal && (
        <DeletePosts type={'answer'} dataId={showAnswerModal} />
      )}
    </article>
  );
}
