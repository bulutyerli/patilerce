import styles from './questioncard.module.scss';
import Image from 'next/image';
import catImage from 'public/images/cat-profile.svg';
import { dateConverter } from '@/helpers/dateConverter';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Link from 'next/link';

export default async function QuestionCard({ data, searchParams }) {
  const image = data?.user?.image ?? catImage;
  const session = await getServerSession(authOptions);
  const showModal = searchParams?.modal;

  const isUser = session?.user?._id === data.user.id;
  console.log(data?.id);

  return (
    <article className={styles.container}>
      <h2 className={styles.title}>{data.title}</h2>
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
      <p className={styles.question}>{data.question}</p>
    </article>
  );
}
