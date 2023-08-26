/* eslint-disable react/no-unescaped-entities */
'use client';

import styles from './signIn.module.scss';
import { useEffect, useState } from 'react';
import Button from '@/components/Button/Button';
import { FcGoogle } from 'react-icons/fc';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function LogInPage() {
  const [userEmail, setUserEmail] = useState('');

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const validEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(
    userEmail
  );

  const signGoogle = async (e) => {
    e.preventDefault();
    const res = await signIn('google', { callbackUrl: '/' });
  };

  useEffect(() => {
    if (validEmail) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [userEmail, validEmail]);

  return (
    <section className={styles.container}>
      <div className={styles.formContainer}>
        <h2>Connect with Paws</h2>
        <form className={styles.form}>
          <div className={styles.formElements}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              value={userEmail}
              onChange={(e) => {
                setUserEmail(e.target.value);
              }}
            />
            <label htmlFor="password">Password</label>
            <input type="password" id="password"></input>
          </div>
          <Link className={styles.forgotPassword} href="/passwordReset">
            Forgot Password
          </Link>

          <Button
            disableBtn={buttonDisabled}
            isLoading={isLoading}
            text="Sign in"
          />
          <div className={styles.signUpText}>
            Don't you have an account yet?
            <Link className={styles.signupLink} href="/signup">
              {' '}
              Sign Up
            </Link>
          </div>
          <div className={styles['or-divider']}>
            <span>or</span>
          </div>
          <button onClick={signGoogle} className={styles.loginProvider}>
            <FcGoogle />
            <p>Sign in with Google</p>
          </button>
        </form>
      </div>
      <Image
        className={styles.catsImage}
        src="/images/cats-login-page.png"
        alt="Cats in basket"
        width={300}
        height={300}
      ></Image>
    </section>
  );
}
