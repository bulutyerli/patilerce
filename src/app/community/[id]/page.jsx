import { getQuestionById } from '@/app/lib/community/getQuestions';
import { getAnswers } from '@/app/lib/community/getAnswers';
import styles from './questionDetails.module.scss';
import Image from 'next/image';
import catImage from 'public/images/cat-profile.svg';
import { dateConverter } from '@/helpers/dateConverter';
import Link from 'next/link';
import { DeletePosts } from '@/app/lib/deleteposts/DeletePostsModal';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import NotFound from '@/app/not-found';
import AnswerHandler from '@/components/AnswerHandler/AnswerHandler';
import axios from 'axios';

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
          <div>Answers:</div>
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
        {answers.map((answer) => {
          return <div key={answer.id}>{answer.answer}</div>;
        })}
      </div>
    );
  } catch (error) {
    return <NotFound />;
  }
}
