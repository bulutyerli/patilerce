'use client';

import styles from './contact-us.module.scss';
import { useEffect, useState } from 'react';
import CustomButton from '@/components/custom-button/custom-button';
import axios from 'axios';

export default function ContactUsPage() {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const buttonHandler = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post('/api/emailer', {
        name,
        title,
        email,
        subject,
      });

      if (response.data.success) {
        setSuccess(true);
      } else {
        throw new Error('Something went wrong');
      }
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
      setTitle('');
      setEmail('');
      setName('');
      setSubject('');
    }
  };

  useEffect(() => {
    if (
      title.length > 0 &&
      email.length > 0 &&
      name.length > 0 &&
      subject.length > 0
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [title, email, name, subject]);
  return (
    <section className={styles.container}>
      <h1>Contact Us</h1>
      <form>
        <div className={styles.formElement}>
          <label htmlFor="name">Your Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
          />
        </div>
        <div className={styles.formElement}>
          <label htmlFor="title">Your Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
        </div>
        <div className={styles.formElement}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            required
          />
        </div>
        <div className={styles.formElement}>
          <label htmlFor="subject">Subject:</label>
          <textarea
            type="textarea"
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
            }}
            required
          />
        </div>
      </form>
      {success && (
        <div className={styles.success}>Thank you for contacting us.</div>
      )}
      {error && (
        <div className={styles.error}>
          Something went wrong, please try again later.
        </div>
      )}
      <CustomButton
        disableBtn={isDisabled}
        isLoading={isLoading}
        className={styles.button}
        onClick={buttonHandler}
        size={'small'}
        text={'Send'}
      />
    </section>
  );
}
