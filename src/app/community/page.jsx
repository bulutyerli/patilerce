import { getQuestions } from '../../lib/community/get-questions';
import QuestionCard from '@/components/community/question-card/question-card';
import QuestionFilters from '@/components/community/question-filters/question-filters';
import Pagination from '@/components/pagination/pagination';
import styles from './community.module.scss';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function Community({ searchParams }) {
  const { page: currentPage = 1, filter: filter = 'all' } = searchParams;
  const limit = 10;
  const { questions, totalPages } = await getQuestions(
    {
      query: searchParams,
    },
    limit
  );
  const session = await getServerSession(authOptions);
  const isUser = session?.user;

  if (!questions) {
    throw new Error('Could not get the questions, please try again.');
  }

  return (
    <section className={styles.container}>
      <h1>Community Q&A</h1>
      <div className={styles.filters}>
        <QuestionFilters
          currentPage={currentPage}
          filter={filter}
          session={isUser}
        />
      </div>
      <div className={styles.questionsContainer}>
        {questions &&
          questions.map((question) => {
            return (
              <div key={question._id}>
                <QuestionCard data={question} />
              </div>
            );
          })}
      </div>
      <Pagination
        section={'community'}
        totalPages={totalPages}
        currentPage={currentPage}
        filter={filter}
      />
    </section>
  );
}
