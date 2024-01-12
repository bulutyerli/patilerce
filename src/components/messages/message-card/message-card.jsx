import styles from './message-card.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { DeletePosts } from '@/lib/delete-posts/delete-posts';
import { PiTrash } from 'react-icons/pi';
import imageKitLoader from '@/lib/imageKitLoader/imageLoader';

export default function MessageCard({
  message,
  sender,
  conversationId,
  searchParams,
}) {
  if (!sender) return null;
  const senderId = sender._id.toString();
  const activeMessage = searchParams.to;
  const isModal = searchParams.modal && searchParams.modalId === conversationId;

  return (
    <div
      className={`${styles.container} ${
        senderId === activeMessage ? styles.active : ''
      }`}
    >
      <Link href={`?to=${sender.id}`}>
        <div className={styles.card}>
          <div className={styles.sender}>
            <Image
              loader={imageKitLoader}
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
      </Link>
      <div className={styles.deleteBtn}>
        <Link href={`?modal=true&modalId=${conversationId}`}>
          <PiTrash />
        </Link>
      </div>
      {isModal ? <DeletePosts dataId={conversationId} type={'message'} /> : ''}
    </div>
  );
}
