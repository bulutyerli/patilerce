import { getQuestionById } from '@/lib/community/getQuestions';
import { getAnswers, getAnswersCount } from '@/lib/community/getAnswers';
import styles from './questionDetails.module.scss';
import Image from 'next/image';
import catImage from 'public/images/cat-profile.svg';
import { dateConverter } from '@/helpers/dateConverter';
import Link from 'next/link';
import { DeletePosts } from '@/lib/deleteposts/DeletePostsModal';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import NotFound from '@/app/not-found';
import AnswerHandler from '@/lib/community/AnswerHandler/AnswerHandler';
import AnswerCard from '@/components/Community/AnswerCard/AnswerCard';
import { PiChatCircleBold } from 'react-icons/pi';

export default async function QuestionDetails({ params, searchParams }) {
  try {
    const { question } = await getQuestionById(params.id);

    const image = question?.user?.image ?? catImage;
    const showModal = searchParams?.modal;
    const session = await getServerSession(authOptions);
    const userId = session?.user?._id;
    const questionUserId = question.user.id;
    const questionId = question.id;
    const isUser = userId === questionUserId;

    const { answers } = await getAnswers(questionId);
    const totalAnswers = await getAnswersCount(questionId);

    return (
      <div className={styles.container}>
        <article className={styles.cardContainer}>
          <h2 className={styles.title}>{question.title}</h2>
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
            <span>{question.user.name}</span> asked{' '}
            <time>{dateConverter(question.createdAt)}</time>
          </div>
          <p className={styles.question}>{question.question}</p>
          <div className={styles.iconContainer}>
            <PiChatCircleBold className={styles.icon} />
            <div className={styles.badge}>{totalAnswers}</div>
          </div>
          {isUser && (
            <Link
              className={styles.delete}
              href={`/community/${question.id}/?modal=true`}
            >
              Delete
            </Link>
          )}
          {showModal && <DeletePosts userId={userId} questionId={questionId} />}
        </article>
        <AnswerHandler userId={userId} questionId={questionId} />
        {totalAnswers > 0 ? (
          <div className={styles.answersContainer}>
            {answers.map((answer) => {
              return <AnswerCard key={answer.id} answer={answer} />;
            })}
          </div>
        ) : (
          <div className={styles.answersContainer}>
            <p className={styles.noAnswerMessage}>
              Nobody answered yet, be the first.
            </p>
          </div>
        )}
      </div>
    );
  } catch (error) {
    return <NotFound />;
  }
}
