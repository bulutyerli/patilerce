import { getServerSession } from 'next-auth';
import styles from './profile.module.scss';
import Image from 'next/image';
import userNameShort from '@/helpers/userNameShort';
import Button from '@/components/Button/Button';
import Link from 'next/link';
import ClientSideForm from '@/components/ClientSideForm/ClientSideForm';

export default async function ProfilePage() {
  const session = await getServerSession();
  const image = session?.user?.image;

  const handleFormSubmit = (userData) => {
    console.log(userData);
  };

  return (
    <section className={styles.container}>
      <div className={styles.infoContainer}>
        <h1>Profile </h1>
        <div>
          <Image
            className={styles.profileImage}
            src={image}
            alt="profile image"
            width={50}
            height={50}
          />
          <h2>Logged in as {userNameShort(session?.user?.name)}</h2>
        </div>
        <Link href="/signout">
          <Button size="small" style="primary" text="Sign Out" />
        </Link>
        <dl className={styles.profileInfo}>
          <div>
            <dt>E-Mail:</dt>
            <dd>{session?.user?.email}</dd>
          </div>
        </dl>
      </div>
      <ClientSideForm />
    </section>
  );
}
