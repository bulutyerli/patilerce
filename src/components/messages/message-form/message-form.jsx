'use client';

import styles from './message-form.module.scss';
import CustomButton from '@/components/custom-button/custom-button';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MessageForm({ searchParams }) {
  const [message, setMessage] = useState('');
  const receiverUser = searchParams.to;
  const router = useRouter();

  const sendMessage = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/messages', {
        receiverId: receiverUser,
        content: message,
      });
      if (response.data.success) {
        router.refresh();
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setMessage('');
    }
  };

  return (
    <div className={styles.formContainer}>
      <form>
        <textarea
          name="message"
          value={message}
          cols="30"
          rows="10"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          placeholder="Write your message"
        ></textarea>
        <div className={styles.buttons}>
          <CustomButton
            onClick={(e) => {
              sendMessage(e);
            }}
            text={'Send'}
          />
        </div>
      </form>
    </div>
  );
}
