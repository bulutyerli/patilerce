'use client';

import { useState } from 'react';
import Button from '../Button/Button';
import styles from './answerHandler.module.scss';
import axios from 'axios';

export default function AnswerHandler({ userId, questionId }) {
  const [answer, setAnswer] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const postHandler = async () => {
    try {
      await axios.post('/api/community/answers', {
        answer: answer,
        userId: userId,
        refQuestion: questionId,
      });
    } catch (error) {
      setErrorMessage(error.message);
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
        <Button onClick={postHandler} style={'secondary'} text={'Send'} />
      </div>
      <span className={styles.errorMessage}>{errorMessage}</span>
    </div>
  );
}
