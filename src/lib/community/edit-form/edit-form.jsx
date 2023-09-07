'use client';

import CustomButton from '@/components/custom-button/custom-button';
import Link from 'next/link';
import styles from './edit-form.module.scss';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function EditForm({ userId, question, questionId }) {
  const [updatedQuestion, setUpdatedQuestion] = useState(question);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      await axios.put('/api/community/questions', {
        userId: userId,
        updatedQuestion: updatedQuestion,
        questionId: questionId,
      });
      toast.success('Successfully edited');
      router.push(`/community/${questionId}/`);
      router.refresh();
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.editQuestionForm}>
        <textarea
          name="question"
          type="textarea"
          cols="30"
          rows="10"
          value={updatedQuestion}
          onChange={(e) => {
            setUpdatedQuestion(e.target.value);
          }}
        ></textarea>
        <div className={styles.actionButtons}>
          <CustomButton
            onClick={(e) => {
              e.preventDefault();
              router.back();
            }}
            size={'small'}
            style={'primary'}
            text={'Cancel'}
          ></CustomButton>
          <CustomButton
            isLoading={isLoading}
            onClick={(e) => submitHandler(e)}
            size={'small'}
            style={'secondary'}
            text={'Save'}
          ></CustomButton>
        </div>
      </form>
    </div>
  );
}
