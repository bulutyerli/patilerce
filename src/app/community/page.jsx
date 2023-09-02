import { getQuestions } from '../lib/community/getQuestions';
import QuestionCard from '@/components/QuestionCard/QuestionCard';
import QuestionFilters from '@/components/QuestionFilters/QuestionFilters';
import PaginationMongoDB from '@/components/PaginationMongoDB/PaginationMongoDB';
import styles from './community.module.scss';

export default async function Community({ searchParams }) {
  try {
    const { page: currentPage = 1 } = searchParams;
    const limit = 10;

    const { questions, totalQuestions } = await getQuestions(
      {
        query: searchParams,
      },
      limit
    );

    const totalPages = Math.ceil(totalQuestions / limit);

    console.log('total pages:', totalPages);

    return (
      <section className={styles.container}>
        <h1>Community Q&A</h1>
        <div className={styles.filters}>
          <QuestionFilters />
        </div>
        <div className={styles.questionsContainer}>
          {questions.map((question) => (
            <div key={question._id}>
              <QuestionCard data={question} />
            </div>
          ))}
        </div>
        <PaginationMongoDB totalPages={totalPages} currentPage={currentPage} />
      </section>
    );
  } catch (error) {
    console.error('Error rendering Community page:', error);
    return (
      <section>
        <div>Error loading questions.</div>
      </section>
    );
  }
}
