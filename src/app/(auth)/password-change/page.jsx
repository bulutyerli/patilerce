'use client';

import CustomButton from '@/components/custom-button/custom-button';
import axios from 'axios';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from './password-change.module.scss';
import Image from 'next/image';
import { checkValidPassword } from '@/helpers/check-valid-password';
import { useRouter } from 'next/navigation';

export default function PasswordChangePage() {
  const [token, setToken] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [passwordData, setPasswordData] = useState({
    password: '',
    reEnteredPassword: '',
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const urlToken = window.location.search.split('=')[1];
    if (!urlToken) {
      router.push('/sign-in');
    }
    setToken(urlToken);
  }, [router]);

  useEffect(() => {
    if (checkValidPassword(passwordData.password)) {
      if (passwordData.password === passwordData.reEnteredPassword) {
        setButtonDisabled(false);
      } else {
        setButtonDisabled(true);
      }
    }
  }, [passwordData]);

  const submitForm = async (e) => {
    e.preventDefault();
    const password = passwordData.password;
    if (token && token.length > 0) {
      try {
        setIsLoading(true);
        await axios.post('/api/auth/password-change', { token, password });
        setSuccess(true);
      } catch (error) {
        setError(true);
        setPasswordData({
          password: '',
          reEnteredPassword: '',
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      {success ? (
        <div className={styles.successContainer}>
          <div className={styles.header}>
            <h1 className={styles.success}>Your password has been changed</h1>

            <Link className={styles.button} href="/sign-in">
              <CustomButton style="secondary" text="Sign In" />
            </Link>
          </div>
          <Image
            className={styles.image}
            src="/images/verifiedemailDog.png"
            alt="dog with a party hat"
            width={200}
            height={200}
          ></Image>
        </div>
      ) : (
        <div className={styles.container}>
          <form className={styles.form}>
            <h1>Change Your Password</h1>
            <div className={styles.formElements}>
              <label htmlFor="password">New Password</label>
              <input
                type="password"
                id="password"
                value={passwordData.password}
                placeholder="6+ chars: letter, num, symbol"
                onChange={(e) =>
                  setPasswordData((prevUserData) => ({
                    ...prevUserData,
                    password: e.target.value,
                  }))
                }
              ></input>
              <label htmlFor="password">Re-enter Your New Password</label>
              <input
                type="password"
                id="reEnteredPassword"
                value={passwordData.reEnteredPassword}
                onChange={(e) =>
                  setPasswordData((prevUserData) => ({
                    ...prevUserData,
                    reEnteredPassword: e.target.value,
                  }))
                }
              ></input>
            </div>
            <CustomButton
              className={styles.button}
              onClick={submitForm}
              disableBtn={buttonDisabled}
              isLoading={isLoading}
              text="Change"
            />
            <div>
              {error && (
                <h1 className={styles.failed}>
                  Verification failed. Please try again
                </h1>
              )}
            </div>
          </form>

          <Image
            className={styles.image}
            src="/images/catPassword.png"
            height={300}
            width={300}
            alt="Cat password face"
          ></Image>
        </div>
      )}
    </>
  );
}
