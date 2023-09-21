'use client';

import styles from './message-form.module.scss';
import CustomButton from '@/components/custom-button/custom-button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MessageForm({ searchParams }) {
  const [message, setMessage] = useState('');
  const [isDisable, setIsDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const receiverUser = searchParams.to;
  const router = useRouter();

  const sendMessage = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (message.length > 0 && receiverUser) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [message, receiverUser]);

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
            disableBtn={isDisable}
            isLoading={isLoading}
          />
        </div>
      </form>
    </div>
  );
}
