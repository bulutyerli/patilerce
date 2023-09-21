'use client';

import { useRouter } from 'next/navigation';
import CustomButton from '../../components/custom-button/custom-button';
import styles from './delete-posts-modal.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export function DeletePosts({ dataId, type }) {
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = 'unset');
  }, []);

  const deleteHandler = async () => {
    let deleteRoute;
    let routeToPush;
    if (type === 'question') {
      deleteRoute = '/api/community/questions';
      routeToPush = '/community';
    } else if (type === 'answer') {
      deleteRoute = '/api/community/answers';
      routeToPush = '/community';
    } else if (type === 'adoptCat') {
      deleteRoute = '/api/adopt';
      routeToPush = '/adopt/cats';
    } else if (type === 'adoptDog') {
      deleteRoute = '/api/adopt';
      routeToPush = '/adopt/dogs';
    } else if (type === 'message') {
      deleteRoute = '/api/messages';
      routeToPush = '/messages';
    } else {
      throw new Error('Route not found');
    }

    try {
      const response = await axios.delete(deleteRoute, {
        data: {
          dataId: dataId,
        },
      });

      if (response.data.success) {
        toast.success(`Your post successfuly deleted`);
        router.push(routeToPush);
        router.refresh();
      } else {
        throw new Error(response.data.error);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <p>Your post will be deleted.</p>
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
