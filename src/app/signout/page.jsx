'use client';

import Button from '@/components/Button/Button';
import { signOut } from 'next-auth/react';
import styles from './signout.module.scss';

export default function SignOut() {
  const signOutUser = () => {
    signOut({
      callbackUrl: '/',
    });
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Are you sure you want to sign out?</h2>
      <div className={styles.buttons}>
        <a href="/profile">
          <Button style="secondary" text="No"></Button>
        </a>
        <Button onClick={signOutUser} style="primary" text="Yes"></Button>
      </div>
    </div>
  );
}
