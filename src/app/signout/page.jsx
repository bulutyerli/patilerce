'use client';

import Button from '@/components/Button/Button';
import { signOut } from 'next-auth/react';
import styles from './signout.module.scss';
import { useRouter } from 'next/navigation';

export default function SignOut() {
  const router = useRouter();
  const signOutUser = () => {
    signOut({
      callbackUrl: '/signin',
    });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Are you sure you want to sign out?</h2>
      <div className={styles.buttons}>
        <Button
          onClick={() => {
            router.back();
          }}
          style="secondary"
          text="No"
        ></Button>
        <Button onClick={signOutUser} style="primary" text="Yes"></Button>
      </div>
    </div>
  );
}
