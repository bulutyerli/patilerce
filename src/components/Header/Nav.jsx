'use client';
import Link from 'next/link';
import styles from './nav.module.scss';
import { forwardRef, useState } from 'react';
import { PiCat, PiDog, PiCaretDown } from 'react-icons/pi';
import { useSession } from 'next-auth/react';
import userNameShort from '@/helpers/userNameShort';

function Nav({ isOpen, onLinkClick }, ref) {
  const [breedsSubMenu, setBreedsSubMenu] = useState(false);

  const handleSubMenuClick = () => {
    setBreedsSubMenu(!breedsSubMenu);
  };

  const { data: session } = useSession();

  return (
    <nav
      ref={ref}
      className={`${styles.mobileNav} ${isOpen ? styles.showNav : ''}`}
    >
      <ul>
        <li>
          <Link onClick={onLinkClick} href="/">
            Home
          </Link>
        </li>
        <li>
          <Link onClick={onLinkClick} href="/adopt">
            Adopt
          </Link>
        </li>
        <li
          onClick={handleSubMenuClick}
          className={`${styles.breedContainer} ${
            breedsSubMenu ? styles.showSubMenu : ''
          }`}
        >
          <div className={styles.breedsLink}>
            Breeds <PiCaretDown />
          </div>

          <ul
            className={`${styles.breedsSubMenu} ${
              breedsSubMenu ? styles.showSubMenu : ''
            }`}
          >
            <li>
              <PiCat className={styles.icon} />
              <Link onClick={onLinkClick} href="/breeds/cats/1">
                Cats
              </Link>
            </li>
            <li>
              <Link onClick={onLinkClick} href="/breeds/dogs/1">
                Dogs
              </Link>
              <PiDog className={styles.icon} />
            </li>
          </ul>
        </li>
        <li>
          <Link onClick={onLinkClick} href="/community">
            Community
          </Link>
        </li>
        {session && session.user ? (
          <li className={styles.profileSubMenu}>
            <div className={styles.login}>
              Logged in as {userNameShort(session.user.name)}
            </div>
            <Link onClick={onLinkClick} href="/profile">
              Profile
            </Link>

            <Link onClick={onLinkClick} href="/messages">
              Messages
            </Link>
            <Link className={styles.signout} href="/signout">
              Sign Out
            </Link>
          </li>
        ) : (
          <li>
            <Link onClick={onLinkClick} className={styles.login} href="/signin">
              Sign In
            </Link>
          </li>
        )}
      </ul>
      <div className={styles.backgroundImage}></div>
    </nav>
  );
}

export default forwardRef(Nav);
