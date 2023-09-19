import styles from './message-list.module.scss';
import MessageCard from '../message-card/message-card';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Link from 'next/link';

export default async function MessageList({ conversations }) {
  const session = await getServerSession(authOptions);
  const userId = session.user._id;

  return (
    <div className={styles.container}>
      {conversations.map((conversation, index) => {
        const otherUser = conversation.participants.find(
          (otherUserId) => otherUserId._id.toString() !== userId
        );
        const otherUserId = otherUser._id.toString();
        const messages = conversation.messages;
        const lastMessage = messages[messages.length - 1].content;
        const shortMessage = lastMessage.slice(0, 20);
        return (
          <div className={styles.messageCard} key={index}>
            <Link href={`?to=${otherUserId}`}>
              <MessageCard message={shortMessage} sender={otherUser} />
            </Link>
          </div>
        );
      })}
    </div>
  );
}
