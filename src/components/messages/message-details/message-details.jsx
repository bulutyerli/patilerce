'use client';

import styles from './message-details.module.scss';
import { useRef, useEffect } from 'react';

export default function MessageDetails({ messages, userId }) {
  const messageTimeConverter = (date) => {
    const newDate = new Date(date);
    const hours = newDate.getHours().toString().padStart(2, '0');
    const minutes = newDate.getMinutes().toString().padStart(2, '0');
    const time = `${hours}:${minutes}`;
    return time;
  };

  const dateConverter = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const newDate = new Date(date);
    const localeDate = newDate.toLocaleDateString(undefined, options);
    return localeDate;
  };

  let firstMsgDate;

  const dayCalculator = (date1, date2) => {
    const firstDate = new Date(date1);
    const secondDate = new Date(date2);
    const firstDay = firstDate.getDate();
    const secondDay = secondDate.getDate();

    return firstDay !== secondDay;
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
      {messages.map((message, index) => {
        if (message.deletedBy.includes(userId)) return null;
        const time = messageTimeConverter(message.createdAt);
        if (index === 0) {
          firstMsgDate = message.createdAt;
          return (
            <div className={styles.dateContainer} key={message._id}>
              <div className={styles.date}>
                {dateConverter(message.createdAt)}
              </div>
              <div
                ref={messageRef}
                className={`${
                  message.sender.toString() === userId
                    ? styles.user
                    : styles.otherUser
                }`}
              >
                {message.content}
                <div className={styles.time}>{time}</div>
              </div>
            </div>
          );
        }
        if (dayCalculator(messages[index - 1].createdAt, message.createdAt)) {
          return (
            <div className={styles.dateContainer} key={message._id}>
              <div className={styles.date}>
                {dateConverter(message.createdAt)}
              </div>
              <div
                ref={messageRef}
                className={`${
                  message.sender.toString() === userId
                    ? styles.user
                    : styles.otherUser
                }`}
              >
                {message.content}
                <div className={styles.time}>{time}</div>
              </div>
            </div>
          );
        } else {
          return (
            <div
              ref={messageRef}
              key={message._id}
              className={`${
                message.sender.toString() === userId
                  ? styles.user
                  : styles.otherUser
              }`}
            >
              {message.content}
              <div className={styles.time}>{time}</div>
            </div>
          );
        }
      })}
    </div>
  );
}
