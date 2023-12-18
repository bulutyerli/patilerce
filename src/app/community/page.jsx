import { getQuestions } from '../../lib/community/get-questions';
import QuestionCard from '@/components/community/question-card/question-card';
import QuestionFilters from '@/components/community/question-filters/question-filters';
import Pagination from '@/components/pagination/pagination';
import styles from './community.module.scss';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

export const metadata = {
  title: 'Ask Questions About Pets',
  description: 'Patilerce.com community Q&A section.',
};

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
      <h2 className={styles.filterTitle}>
        {filter === 'my'
          ? 'My Questions'
          : filter === 'noanswer'
          ? 'Without Answers'
          : 'All Questions'}
      </h2>

      <div className={styles.questionsContainer}>
        {questions?.length > 0 ? (
          questions.map((question) => {
            return (
              <div key={question._id}>
                <QuestionCard data={question} />
              </div>
            );
          })
        ) : (
          <div className={styles.nothingToShow}>There is nothing to show.</div>
        )}
      </div>
      {questions?.length > 0 && (
        <Pagination
          section={'community'}
          totalPages={totalPages}
          currentPage={currentPage}
          filter={filter}
        />
      )}
    </section>
  );
}
