/* eslint-disable react/no-unescaped-entities */
'use client';

import styles from './signIn.module.scss';
import { useEffect, useState } from 'react';
import Button from '@/components/Button/Button';
import { FcGoogle } from 'react-icons/fc';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import checkValidEmail from '@/helpers/checkValidEmail';

export default function LogInPage() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const signGoogle = async (e) => {
    e.preventDefault();
    await signIn('google', { callbackUrl: '/' });
  };

  const signInCredentials = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await signIn('credentials', {
        callbackUrl: '/',
        email: userEmail,
        password: userPassword,
      });
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (checkValidEmail(userEmail)) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [userEmail]);

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
            <input
              type="password"
              id="password"
              value={userPassword}
              onChange={(e) => {
                setUserPassword(e.target.value);
              }}
            ></input>
          </div>
          <Link className={styles.forgotPassword} href="/forgotpassword">
            Forgot Password
          </Link>
          <Button
            onClick={signInCredentials}
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
