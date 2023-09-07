'use client';

import { useRouter } from 'next/navigation';
import CustomButton from '../../components/custom-button/custom-button';
import styles from './delete-posts-modal.module.scss';
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

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
      toast.success('Your question deleted');
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
        <CustomButton
          onClick={() => {
            router.back();
          }}
          text="No"
        />
        <CustomButton style={'primary'} onClick={deleteHandler} text="Yes" />
      </div>
    </div>
  );
}