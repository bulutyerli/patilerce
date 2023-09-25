'use client';
import { useEffect, useState } from 'react';
import styles from './forgot-password.module.scss';
import checkValidEmail from '@/helpers/check-valid-email';
import CustomButton from '@/components/custom-button/custom-button';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
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
      const res = await axios.post('/api/auth/password-change-email', {
        email,
      });
      if (!res) {
        throw new Error('Something went wrong, please try again');
      }
      setSuccess(true);
      setTimeout(() => {
        router.push('/sign-in');
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
            autoComplete="off"
            placeholder="example@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <CustomButton
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
