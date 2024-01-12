'use client';

import CustomButton from '@/components/custom-button/custom-button';
import axios from 'axios';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from './verify-email.module.scss';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import imageKitLoader from '@/lib/imageKitLoader/imageLoader';

export default function VerifyEmailPage() {
  const [token, setToken] = useState('');
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const { data: session } = useSession();
  const isVerified = session?.user?.isVerified;
  const router = useRouter();

  if (isVerified) {
    router.push('/profile');
  }

  useEffect(() => {
    const urlToken = window.location.search.split('=')[1];
    setToken(urlToken);
  }, []);

  useEffect(() => {
    const verifyUserEmail = async () => {
      try {
        await axios.post('/api/auth/verify-email', { token });
        setVerified(true);
      } catch (error) {
        console.log(error);
        setError(true);
      }
    };
    if (token && token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className={styles.container}>
      {verified && (
        <>
          <h1 className={styles.success}>
            <p>Congratulations! </p> <p>Your email has been verified.</p>
          </h1>
          <Image
            className={styles.image}
            src="/images/verifiedemailDog.png"
            alt="dog with a party hat"
            width={200}
            height={200}
          ></Image>
          <Link className={styles.button} href="/sign-in">
            <CustomButton style="secondary" text="Sign In" />
          </Link>
        </>
      )}
      {error && (
        <h1 className={styles.failed}>Verification failed. Please try again</h1>
      )}
    </div>
  );
}
