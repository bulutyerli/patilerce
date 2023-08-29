'use client';
import { useEffect, useState } from 'react';
import styles from './forgotpassword.module.scss';
import checkValidEmail from '@/helpers/checkValidEmail';
import Button from '@/components/Button/Button';
import axios from 'axios';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (checkValidEmail(email)) {
      setButtonDisabled(false);
    }
  }, [email]);

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(email);
    await axios.post('/api/auth/passwordemail', { email });
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
      </form>
    </div>
  );
}
