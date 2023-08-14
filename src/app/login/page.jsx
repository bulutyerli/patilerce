/* eslint-disable react/no-unescaped-entities */
'use client';

import styles from './login.module.scss';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Button from '@/components/button/button';

export default function LogInPage() {
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const onLogin = async (e) => {
    e.preventDefault();
    console.log('success');
  };
  return (
    <section className={styles.container}>
      <h2>Log In</h2>
      <form className={styles.form}>
        <div className={styles.formElements}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={user.username}
            onChange={(e) => {
              setUser({ ...user, username: e.target.value });
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

        <Button onClick={onLogin} text="Log In" />
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
