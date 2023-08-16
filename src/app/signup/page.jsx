'use client';

import styles from './signup.module.scss';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Button from '@/components/button/button';

export default function SignUpPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: '',
    password: '',
    reenteredPassword: '',
    email: '',
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const onSignUp = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      console.log('Sending sign-up request:', user);

      await axios.post('/api/users/signup', user);
      console.log('Sign-up successful');

      router.push('/login');
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const validUsername = user.username.length >= 3;
  const validPassword = /^(?=.*\d).{6,}$/.test(user.password);
  const validEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(
    user.email
  );
  const passwordMatch = user.password === user.reenteredPassword;

  useEffect(() => {
    if (validUsername && validPassword && passwordMatch && validEmail) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
    console.log(buttonDisabled);
  }, [
    buttonDisabled,
    passwordMatch,
    user,
    validEmail,
    validPassword,
    validUsername,
  ]);

  return (
    <section className={styles.container}>
      <h2>Sign Up</h2>
      <form className={styles.form}>
        <div className={styles.formElements}>
          <label htmlFor="username">
            Username
            {user.username.length > 0 && !validUsername ? (
              <span className={styles.criteria}>*must be min 3 characters</span>
            ) : (
              ''
            )}
          </label>

          <input
            type="text"
            id="username"
            value={user.username}
            onChange={(e) => {
              setUser({ ...user, username: e.target.value });
            }}
            placeholder="Minumum 3 characters"
          />
        </div>
        <div className={styles.formElements}>
          <label htmlFor="password">
            Password{' '}
            {user.password.length > 0 && !validPassword ? (
              <span className={styles.criteria}>
                *does not meet minimum criteria
              </span>
            ) : (
              ''
            )}
          </label>
          <input
            type="password"
            id="password"
            value={user.password}
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
            placeholder="6+ characters with a number"
          />
        </div>
        <div className={styles.formElements}>
          <label htmlFor="reenter-password">
            Re-enter Password
            {!passwordMatch ? (
              <span className={styles.criteria}>*Passwords do not match</span>
            ) : (
              ''
            )}
          </label>

          <input
            type="password"
            id="reenter-password"
            value={user.reenteredPassword}
            onChange={(e) => {
              setUser({ ...user, reenteredPassword: e.target.value });
            }}
          />
        </div>
        <div className={styles.formElements}>
          <label htmlFor="email">
            E-Mail{' '}
            {user.email.length > 0 && !validEmail ? (
              <span className={styles.criteria}>*E-Mail is not valid</span>
            ) : (
              ''
            )}
          </label>
          <input
            type="text"
            id="email"
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
            placeholder="example@example.com"
          />
        </div>
        <Button
          onClick={onSignUp}
          disableBtn={buttonDisabled}
          isLoading={isLoading}
          text="Sign Up"
        />
      </form>
      <p>
        Already have an account?{' '}
        <Link className={styles.link} href={'/login'}>
          Log in
        </Link>
      </p>
    </section>
  );
}
