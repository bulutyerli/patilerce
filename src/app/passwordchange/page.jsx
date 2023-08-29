'use client';

import Button from '@/components/Button/Button';
import axios from 'axios';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from './passwordchange.module.scss';
import Image from 'next/image';
import { checkValidPassword } from '@/helpers/checkValidPassword';

export default function VerifyEmailPage() {
  const [token, setToken] = useState('');
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [passwordData, setPasswordData] = useState({
    password: '',
    reEnteredPassword: '',
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const urlToken = window.location.search.split('=')[1];
    setToken(urlToken);
  }, []);

  useEffect(() => {
    if (checkValidPassword(passwordData.password)) {
      if (passwordData.password === passwordData.reEnteredPassword) {
        setButtonDisabled(false);
      }
    }
  }, [passwordData]);

  const submitForm = async (e) => {
    e.preventDefault();
    const password = passwordData.password;
    console.log(typeof passwordData.password);
    console.log(typeof token);
    const passwordChange = async () => {
      try {
        await axios.post('/api/auth/passwordchange', { token, password });
        setVerified(true);
      } catch (error) {
        setError(true);
        console.log(error.response.data);
      }
    };
    if (token && token.length > 0) {
      passwordChange();
    }
  };

  return (
    <div className={styles.container}>
      <h1>Change Your Password</h1>
      <form className={styles.form}>
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

        <Button
          onClick={submitForm}
          disableBtn={buttonDisabled}
          isLoading={isLoading}
          text="Change"
        />
      </form>
      {verified && (
        <>
          <h1 className={styles.success}>
            <p>Your password has been changed</p>
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
