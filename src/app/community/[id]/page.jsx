import styles from './questionDetails.module.scss';
import { getQuestions } from '@/app/lib/community/getQuestions';

export default async function QuestionDetails({ params }) {
  const data = getQuestions(params.id);
  return <div>title: {params.id}</div>;
}
