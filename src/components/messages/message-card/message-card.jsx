import styles from './message-card.module.scss';
import Image from 'next/image';

export default function MessageCard({ message, sender }) {
  return (
    <div className={styles.container}>
      <div className={styles.sender}>
        <Image
          className={styles.image}
          src={sender.image}
          alt="profile picture"
          width={35}
          height={35}
        ></Image>
        <span>{sender.name}</span>
      </div>
      <span className={styles.content}>{message}</span>
    </div>
  );
}
