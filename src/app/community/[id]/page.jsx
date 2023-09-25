import { getQuestionById } from '@/lib/community/get-questions';
import { getAnswers, getAnswersCount } from '@/lib/community/get-answers';
import styles from './question-details.module.scss';
import Image from 'next/image';
import { dateConverter } from '@/helpers/date-converter';
import Link from 'next/link';
import { DeletePosts } from '@/lib/delete-posts/delete-posts';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import NotFound from '@/app/not-found';
import AnswerHandler from '@/lib/community/answer-handler/answer-handler';
import AnswerCard from '@/components/community/answer-card/answer-card';
import { PiChatCircleBold, PiTrash, PiPencil } from 'react-icons/pi';
import EditForm from '@/lib/community/edit-form/edit-form';

export default async function QuestionDetails({ params, searchParams }) {
  try {
    const { question } = await getQuestionById(params.id);
    const image = question?.user?.image;
    const showModal = searchParams?.modal;
    const editPanel = searchParams?.edit;
    const session = await getServerSession(authOptions);
    const userId = session?.user?._id;
    const questionUserId = question.user.id;
    const questionId = question.id;
    const isUser = userId === questionUserId;
    const auth = session?.user;

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
          {editPanel ? (
            <div className={styles.question}>
              <EditForm
                userId={userId}
                question={question.question}
                questionId={questionId}
              />
            </div>
          ) : (
            <p className={styles.question}>{question.question}</p>
          )}
          <div className={styles.iconContainer}>
            <PiChatCircleBold className={styles.icon} />
            <div className={styles.badge}>{totalAnswers}</div>
          </div>
          <div className={styles.userButtons}>
            {editPanel
              ? ''
              : isUser && (
                  <>
                    <div className={styles.edit}>
                      <PiPencil />
                      <Link href={`/community/${question.id}/?edit=true`}>
                        Edit
                      </Link>
                    </div>
                    <div className={styles.delete}>
                      <PiTrash />
                      <Link href={`?modal=true`}>Delete</Link>
                    </div>
                  </>
                )}
            {showModal && <DeletePosts dataId={questionId} type={'question'} />}
          </div>
        </article>
        {auth ? (
          <AnswerHandler userId={userId} questionId={questionId} />
        ) : (
          <div className={styles.signInWarning}>
            You must{' '}
            <Link className={styles.signInLink} href={'/sign-in'}>
              Sign In
            </Link>{' '}
            to answer this question
          </div>
        )}

        {totalAnswers > 0 ? (
          <div className={styles.answersContainer}>
            {answers.map((answer) => {
              return (
                <AnswerCard
                  searchParams={searchParams}
                  key={answer.id}
                  answer={answer}
                />
              );
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
