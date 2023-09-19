import styles from './messages.module.scss';
import MessageList from '@/components/messages/message-list/message-list';
import MessageDetails from '@/components/messages/message-details/message-details';
import { getConversations } from '@/lib/messages/get-conversations';
import { getMessages } from '@/lib/messages/get-messages';
import ReceiverCard from '@/components/messages/receiver-card/receiver-card';
import MessageForm from '@/components/messages/message-form/message-form';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import getUser from '@/lib/auth/get-user';

export default async function MessagesPage({ searchParams }) {
  const otherUserId = searchParams.to;
  const conversations = await getConversations();
  const session = await getServerSession(authOptions);
  const otherUser = await getUser(otherUserId);
  const userId = session.user._id;
  const messages = await getMessages(otherUserId);
  const messagesData = messages.map((message) => ({
    _id: message._id.toString(),
    sender: message.sender.toString(),
    receiver: message.receiver.toString(),
    content: message.content,
    sentAt: message.sentAt.toString(),
    receivedAt: message.receivedAt.toString(),
    createdAt: message.createdAt.toString(),
    updatedAt: message.updatedAt.toString(),
  }));

  return (
    <div className={styles.container}>
      <h1>Messages</h1>
      <div className={styles.receiverCard}>
        <ReceiverCard otherUser={otherUser} />
      </div>
      <div className={styles.messageList}>
        <MessageList conversations={conversations} />
      </div>
      <div className={styles.messageDetails}>
        <MessageDetails messages={messagesData} userId={userId} />
      </div>
      <div className={styles.messageForm}>
        <MessageForm searchParams={searchParams} />
      </div>
    </div>
  );
}
