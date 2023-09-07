import styles from './answer-card.module.scss';
import Image from 'next/image';
import catImage from 'public/images/cat-profile.svg';
import { dateConverter } from '@/helpers/date-converter';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Link from 'next/link';
import CustomButton from '@/components/custom-button/custom-button';

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
          <Link href={`/community/delete/${answer.id}`}>
            <CustomButton
              style={'primary'}
              size={'small'}
              text={'Delete'}
            ></CustomButton>
          </Link>
        </div>
      )}
    </article>
  );
}