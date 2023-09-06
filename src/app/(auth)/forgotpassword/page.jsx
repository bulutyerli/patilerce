'use client';
import { useEffect, useState } from 'react';
import styles from './forgotpassword.module.scss';
import checkValidEmail from '@/helpers/checkValidEmail';
import Button from '@/components/Button/Button';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (checkValidEmail(email)) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.post('/api/auth/passwordemail', { email });
      if (!res) {
        throw new Error('Something went wrong, please try again');
      }
      setSuccess(true);
      setTimeout(() => {
        router.push('/signin');
      }, 10000);
    } catch (error) {
      setError(true);
    } finally {
      setEmail('');
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Please enter a valid email address to get link for password change.
      </h1>
      <form className={styles.form}>
        <div className={styles.formElements}>
          <label htmlFor="email">
            Email:{' '}
            {email.length > 0 && !checkValidEmail(email) ? (
              <span className={styles.notValid}>*Not valid</span>
            ) : (
              ''
            )}
          </label>
          <input
            type="text"
            id="email"
            value={email}
            placeholder="example@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Button
          onClick={onSubmit}
          disableBtn={buttonDisabled}
          isLoading={isLoading}
          text="Send"
        />
        {success ? (
          <div className={styles.successMessage}>
            If you are a user, a password recovery email has been sent.{' '}
            <p>You will be redirected to login page in 10 seconds.</p>
          </div>
        ) : (
          ''
        )}
        {error ? (
          <div className={styles.errorMessage}>
            We could not send email, please try again.
          </div>
        ) : (
          ''
        )}
      </form>
    </div>
  );
}
