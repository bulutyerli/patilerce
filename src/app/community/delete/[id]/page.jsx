'use client';

import CustomButton from '@/components/custom-button/custom-button';
import axios from 'axios';
import styles from './delete-answer.module.scss';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function DeleteAnswerPage({ params }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState();

  const deleteHandler = async () => {
    try {
      setIsLoading(true);
      await axios.delete('/api/community/answers/delete/', {
        data: { answerId: params.id },
      });
      router.back();
      router.refresh();
      toast.success('Your answer deleted');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <p>Your answer will be deleted.</p>
      <p>Are You Sure?</p>
      <div className={styles.buttonContainer}>
        <CustomButton
          onClick={() => {
            router.back();
          }}
          style={'secondary'}
          text={'No'}
        ></CustomButton>
        <CustomButton
          isLoading={isLoading}
          style={'primary'}
          onClick={deleteHandler}
          text={'Yes'}
        ></CustomButton>
      </div>
    </div>
  );
}
