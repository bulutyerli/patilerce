'use client';

import Button from '@/components/Button/Button';
import axios from 'axios';
import styles from './deleteAnswer.module.scss';
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
        <Button
          onClick={() => {
            router.back();
          }}
          style={'secondary'}
          text={'No'}
        ></Button>
        <Button
          isLoading={isLoading}
          style={'primary'}
          onClick={deleteHandler}
          text={'Yes'}
        ></Button>
      </div>
    </div>
  );
}
