'use client';

import styles from './message-details.module.scss';
import { useRef, useEffect } from 'react';

export default function MessageDetails({ messages, userId }) {
  const dateConverter = (date) => {
    const newDate = new Date(date);
    const hours = newDate.getHours().toString().padStart(2, '0');
    const minutes = newDate.getMinutes().toString().padStart(2, '0');
    const time = `${hours}:${minutes}`;
    return time;
  };

  const messageRef = useRef(null);

  const scrollToBottom = () => {
    messageRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className={styles.container}>
      {messages.map((message) => {
        const time = dateConverter(message.createdAt);
        if (message.sender.toString() === userId) {
          return (
            <div ref={messageRef} key={message._id} className={styles.user}>
              {message.content}
              <div className={styles.time}>{time}</div>
            </div>
          );
        } else {
          return (
            <div className={styles.otherUser} key={message._id}>
              {message.content}
              <div className={styles.time}>{time}</div>
            </div>
          );
        }
      })}
    </div>
  );
}
