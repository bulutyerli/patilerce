import styles from './message-list.module.scss';
import MessageCard from '../message-card/message-card';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function MessageList({ conversations, searchParams }) {
  const session = await getServerSession(authOptions);
  const userId = session.user._id;

  if (conversations.length > 0) {
    return (
      <div className={styles.container}>
        {conversations.map((conversation, index) => {
          if (conversation.deletedBy.includes(userId)) return null;
          const otherUser = conversation.participants.find(
            (otherUserId) => otherUserId._id.toString() !== userId
          );
          const messages = conversation.messages;
          const lastMessage = messages[messages.length - 1].content;
          const shortMessage = lastMessage.slice(0, 20);
          const conversationId = conversation._id.toString();
          return (
            <div key={index} className={styles.messageCard}>
              <MessageCard
                conversationId={conversationId}
                searchParams={searchParams}
                message={shortMessage}
                sender={otherUser}
              />
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div className={styles.noConversation}>
        Your conversations will be shown here
      </div>
    );
  }
}
