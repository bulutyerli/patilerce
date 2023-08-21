/* eslint-disable react/no-unescaped-entities */
'use client';

import styles from './login.module.scss';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Button from '@/components/Button/Button';

export default function LogInPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await axios.post('/api/users/login', user);
      router.push('/profile');
    } catch (error) {
      console.log('login failed', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const validPassword = /^(?=.*\d).{6,}$/.test(user.password);
  const validEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(
    user.email
  );

  useEffect(() => {
    if (validEmail && validPassword) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user, validEmail, validPassword]);
  return (
    <section className={styles.container}>
      <h2>Log In</h2>
      <form className={styles.form}>
        <div className={styles.formElements}>
          <label htmlFor="username">Email</label>
          <input
            type="text"
            id="email"
            value={user.email}
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
          />
        </div>
        <div className={styles.formElements}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={user.password}
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
          />
        </div>

        <Button
          onClick={onLogin}
          disableBtn={buttonDisabled}
          isLoading={isLoading}
          text="Log In"
        />
      </form>
      <p>
        Don't have an account yet?{' '}
        <Link className={styles.link} href={'/signup'}>
          Sign up
        </Link>
      </p>
    </section>
  );
}
