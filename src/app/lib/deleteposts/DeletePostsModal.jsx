'use client';

import { useRouter } from 'next/navigation';
import Button from '../../../components/Button/Button';
import styles from './deletePosts.module.scss';
import { useEffect } from 'react';
import axios from 'axios';

export function DeletePosts({ userId, questionId }) {
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = 'unset');
  }, []);

  const deleteHandler = async () => {
    try {
      await axios.delete('/api/community/questions', {
        data: {
          userId: userId,
          questionId: questionId,
        },
      });
      router.push('/community');
      router.refresh();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <p>Your question will be deleted.</p>
      <p>Are you sure?</p>
      <div className={styles.buttonContainer}>
        <Button
          onClick={() => {
            router.back();
          }}
          text="No"
        />
        <Button style={'primary'} onClick={deleteHandler} text="Yes" />
      </div>
    </div>
  );
}
