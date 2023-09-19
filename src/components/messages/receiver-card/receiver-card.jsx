import styles from './receiver-card.module.scss';
import Image from 'next/image';

export default function ReceiverCard({ otherUser }) {
  return otherUser ? (
    <div className={styles.container}>
      <Image
        className={styles.image}
        src={otherUser.image}
        alt="profile picture"
        width={35}
        height={35}
      />
      <span>{otherUser.name}</span>
    </div>
  ) : (
    <div className={styles.noConversation}>
      <span>Select a conversation to start messaging</span>
    </div>
  ); // Return null if otherUser is falsy
}
