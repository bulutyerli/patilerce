'use client';

import Button from '@/components/Button/Button';
import axios from 'axios';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from './verifyemail.module.scss';
import Image from 'next/image';

export default function VerifyEmailPage() {
  const [token, setToken] = useState('');
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const urlToken = window.location.search.split('=')[1];
    setToken(urlToken);
  }, []);

  useEffect(() => {
    const verifyUserEmail = async () => {
      try {
        await axios.post('/api/auth/verifyemail', { token });
        setVerified(true);
      } catch (error) {
        setError(true);
        console.log(error.response.data);
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
          <Link className={styles.button} href="/signin">
            <Button style="secondary" text="Sign In" />
          </Link>
        </>
      )}
      {error && (
        <h1 className={styles.failed}>Verification failed. Please try again</h1>
      )}
    </div>
  );
}
