'use client';

import { useState } from 'react';
import Button from '../Button/Button';
import styles from './answerHandler.module.scss';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function AnswerHandler({ userId, questionId }) {
  const [answer, setAnswer] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const postHandler = async () => {
    try {
      setIsLoading(true);
      await axios.post('/api/community/answers', {
        answer: answer,
        userId: userId,
        refQuestion: questionId,
      });
      router.refresh();
      setAnswer('');
      setErrorMessage('');
    } catch (error) {
      console.log(error.response.data.message);
      setErrorMessage(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={styles.container}>
      <textarea
        className={styles.textarea}
        name="question"
        id="question"
        cols="30"
        rows="10"
        minLength={10}
        onChange={(e) => {
          setAnswer(e.target.value);
        }}
        value={answer}
        placeholder="Would you like to help?"
      ></textarea>
      <div className={styles.button}>
        <Button
          isLoading={isLoading}
          onClick={postHandler}
          style={'secondary'}
          text={'Send'}
        />
      </div>
      <span className={styles.errorMessage}>{errorMessage}</span>
    </div>
  );
}
