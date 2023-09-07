'use client';

import CustomButton from '@/components/custom-button/custom-button';
import styles from './ask-question.module.scss';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AskQuestion() {
  const [title, setTitle] = useState('');
  const [question, setQuestion] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const { data: session } = useSession();
  const userId = session?.user?._id;
  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await axios.post('/api/community/questions', {
        title: title,
        question: question,
        userId: userId,
      });
      router.push('/community');
      router.refresh();
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMsg = error?.response?.data?.error;
        setError(errorMsg);
      }
    } finally {
      setIsLoading(false);
      setTitle('');
      setQuestion('');
    }
  };

  useEffect(() => {
    if (title.length > 4 && question.length >= 10) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [title, question]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Ask to Community</h1>
      <div className={styles.pageContainer}>
        <Image
          className={styles.image}
          src="/images/addquestionDogImage.png"
          width={300}
          height={300}
          alt="curious dog"
        ></Image>
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="title" className={styles.label}>
              Title:
            </label>
            <input
              className={styles.questionTitle}
              type="text"
              id="title"
              value={title}
              maxLength={50}
              placeholder="Title of your question"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="question" className={styles.label}>
              Question:
            </label>
            <textarea
              className={styles.textarea}
              name="question"
              id="question"
              cols="30"
              rows="10"
              minLength={10}
              placeholder="Write a good explaination of your question with more than 10 letters"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            ></textarea>
          </div>
          <div className={styles.submitButton}>
            <CustomButton
              onClick={(e) => {
                submitHandler(e);
              }}
              isLoading={isLoading}
              disableBtn={disableButton}
              text="Send"
            ></CustomButton>
          </div>
          <div className={styles.errorMessage}>{error}</div>
        </form>
      </div>
    </div>
  );
}
