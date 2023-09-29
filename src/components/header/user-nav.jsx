'use client';
import Link from 'next/link';
import styles from './user-nav.module.scss';
import { forwardRef } from 'react';
import { useSession } from 'next-auth/react';
import userNameShort from '@/helpers/short-username';

function UserNav({ isOpen, onLinkClick }, ref) {
  const { data: session } = useSession();

  return (
    <nav
      ref={ref}
      className={`${styles.mobileNav} ${isOpen ? styles.showNav : ''}`}
    >
      <ul>
        <li className={styles.profileSubMenu}>
          <div className={styles.login}>
            Logged in as {userNameShort(session?.user?.name)}
          </div>
        </li>

        <li className={styles.profileSubMenu}>
          <Link onClick={onLinkClick} href="/profile">
            Profile Settings
          </Link>
        </li>
        <li className={styles.profileSubMenu}>
          <Link onClick={onLinkClick} href="/messages">
            Messages
          </Link>
        </li>

        <li className={styles.profileSubMenu}>
          <Link onClick={onLinkClick} href="/profile/my-listings">
            My Listings
          </Link>
        </li>
        <li className={styles.profileSubMenu}>
          <Link
            onClick={onLinkClick}
            href="/profile/my-listings?filter=pending"
          >
            Pending Listings
          </Link>
        </li>
        <li className={styles.profileSubMenu}>
          <Link onClick={onLinkClick} href="/community?filter=my">
            My Questions
          </Link>
        </li>
        <li className={styles.profileSubMenu}>
          <Link
            onClick={onLinkClick}
            className={styles.signout}
            href="/sign-out"
          >
            Sign Out
          </Link>
        </li>
      </ul>
      <div className={styles.backgroundImage}></div>
    </nav>
  );
}

export default forwardRef(UserNav);
