'use client';

import axios from 'axios';
import styles from './add-favorite.module.scss';
import { PiHeart, PiHeartFill } from 'react-icons/pi';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function AddFavorite({ adoptId, favList }) {
  const router = useRouter();
  const [favorited, setFavorited] = useState(false);
  const { data: session } = useSession();
  const userId = session?.user?._id;

  useEffect(() => {
    const isFav = favList.find((id) => userId === id);
    if (isFav) {
      setFavorited(true);
    } else {
      setFavorited(false);
    }
  }, [favList, userId]);

  const addFavHandler = async () => {
    const response = await axios.put('/api/adopt/add-favorite', { adoptId });

    if (response.data.error === 'forbidden') {
      router.push('/sign-in');
    }

    if (response.data.success) {
      setFavorited(!favorited);
    }
  };

  return (
    <div className={styles.container}>
      <div onClick={addFavHandler} className={styles.icon}>
        {favorited ? <PiHeartFill /> : <PiHeart />}
      </div>
      <span onClick={addFavHandler}>
        {favorited ? 'Remove from favorites' : 'Add to favorites'}
      </span>
    </div>
  );
}
