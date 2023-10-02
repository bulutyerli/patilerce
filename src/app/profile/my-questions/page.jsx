import styles from './my-questions.module.scss';
import Pagination from '@/components/pagination/pagination';
import QuestionCard from '@/components/community/question-card/question-card';
import { getAllUserQuestions } from '@/lib/community/get-questions';

import Link from 'next/link';

export default async function MyListings({ searchParams }) {
  const { page: currentPage = 1, filter } = searchParams;
  const limit = 20;
  const { questions, totalPages } = await getAllUserQuestions(
    { query: searchParams },
    limit,
    filter
  );

  return (
    <section className={styles.container}>
      {filter ? (
        <h1 className={styles.title}>My Questions Pending Approval</h1>
      ) : (
        <h1 className={styles.title}>My Questions</h1>
      )}
      <div className={styles.cardsContainer}>
        {questions?.length > 0 ? (
          <div className={styles.cards}>
            {questions?.map((question, index) => {
              return (
                <Link key={index} href={`/community/${question.id}`}>
                  <QuestionCard data={question} />
                </Link>
              );
            })}
          </div>
        ) : (
          <div className={styles.noPetsMessage}>There is nothing to show.</div>
        )}
      </div>
      {totalPages < 2 ? (
        ''
      ) : (
        <div className={styles.pagination}>
          <Pagination
            section={'question'}
            totalPages={totalPages}
            currentPage={currentPage}
          />
        </div>
      )}
    </section>
  );
}
