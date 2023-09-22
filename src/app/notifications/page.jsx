import { getUnreadMessages } from '@/lib/messages/get-unread-messages';
import styles from './notifications.module.scss';

export default async function NotificationsPage() {
  const messages = await getUnreadMessages();

  return (
    <section className={styles.container}>
      <h1>Notifications</h1>
      <div className={styles.notifications}>
        {messages.messageCount > 0 && (
          <div>
            You have {messages.messageCount} new message
            {messages.messageCount === 1 ? '' : 's'}
          </div>
        )}
      </div>
    </section>
  );
}
