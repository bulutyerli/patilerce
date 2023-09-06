import { getQuestions } from '../../lib/community/get-questions';
import QuestionCard from '@/components/community/question-card/question-card';
import QuestionFilters from '@/components/community/question-filters/question-filters';
import PaginationMongoDB from '@/components/community/pagination/pagination';
import styles from './community.module.scss';

export default async function Community({ searchParams }) {
  try {
    const { page: currentPage = 1, filter: filter = 'all' } = searchParams;
    const limit = 10;
    const { questions, totalPages } = await getQuestions(
      {
        query: searchParams,
      },
      limit
    );

    if (!questions) {
      throw new Error('Could not get the questions, please try again.');
    }

    return (
      <section className={styles.container}>
        <h1>Community Q&A</h1>
        <div className={styles.filters}>
          <QuestionFilters currentPage={currentPage} filter={filter} />
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
        <PaginationMongoDB
          totalPages={totalPages}
          currentPage={currentPage}
          filter={filter}
        />
      </section>
    );
  } catch (error) {
    return (
      <section className={styles.container}>
        <div className={styles.errorMessage}>{error.message}</div>
      </section>
    );
  }
}
