'use client';

import CustomButton from '@/components/custom-button/custom-button';
import { signOut } from 'next-auth/react';
import styles from './sign-out.module.scss';
import { useRouter } from 'next/navigation';

export default function SignOutPage() {
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
        <CustomButton
          onClick={() => {
            router.back();
          }}
          style="secondary"
          text="No"
        ></CustomButton>
        <CustomButton
          onClick={signOutUser}
          style="primary"
          text="Yes"
        ></CustomButton>
      </div>
    </div>
  );
}
