'use client';

import CustomButton from '@/components/custom-button/custom-button';
import styles from './not-verified-email.module.scss';
CustomButton;
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotVerifiedEmailPage() {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <p>
        You should verify your email address before creating a new adopt
        listing.
      </p>
      <p>
        If you have not received verification email already you can request for
        a new one in your profile page.
      </p>
      <div className={styles.buttons}>
        <CustomButton onClick={() => router.back()} text={'Back'} />
        <Link href={'/profile'}>
          <CustomButton style={'secondary'} text={'Profile'} />
        </Link>
      </div>
    </div>
  );
}
