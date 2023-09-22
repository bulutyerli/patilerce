'use client';
import Link from 'next/link';
import styles from './desktop-nav.module.scss';
import {
  PiHouse,
  PiPawPrint,
  PiHandHeartDuotone,
  PiChatsCircle,
  PiCat,
  PiDog,
  PiCaretDown,
  PiDotsThreeOutlineVerticalBold,
  PiEnvelopeSimple,
  PiEnvelopeSimpleOpen,
  PiEnvelope,
  PiSignOut,
  PiSignIn,
  PiUser,
} from 'react-icons/pi';
import { useState, useRef, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import userNameShort from '@/helpers/short-username';

function DesktopNav({ newMessages }) {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [showProfileSub, setProfileSub] = useState(false);
  const [showAdoptSubMenu, setShowAdoptSubMenu] = useState(false);
  const subMenu = useRef(null);
  const adoptSubMenu = useRef(null);
  const profileMenu = useRef(null);

  const handleSubMenuClick = () => {
    setShowSubMenu(!showSubMenu);
  };

  const handleProfileMenuClick = () => {
    setProfileSub(!showProfileSub);
  };

  const handleAdoptSubMenuClick = () => {
    setShowAdoptSubMenu(!showAdoptSubMenu);
  };

  useEffect(() => {
    const closeDropDown = (e) => {
      if (
        adoptSubMenu.current &&
        showAdoptSubMenu &&
        !adoptSubMenu.current.contains(e.target)
      ) {
        setShowAdoptSubMenu(false);
      }
    };
    if (showAdoptSubMenu) {
      document.addEventListener('mousedown', closeDropDown);
    }

    return () => {
      document.removeEventListener('mousedown', closeDropDown);
    };
  }, [showAdoptSubMenu]);

  useEffect(() => {
    const closeDropDown = (e) => {
      if (
        subMenu.current &&
        showSubMenu &&
        !subMenu.current.contains(e.target)
      ) {
        setShowSubMenu(false);
      }
    };
    if (showSubMenu) {
      document.addEventListener('mousedown', closeDropDown);
    }

    return () => {
      document.removeEventListener('mousedown', closeDropDown);
    };
  }, [showSubMenu]);

  useEffect(() => {
    const closeDropDown = (e) => {
      if (
        profileMenu.current &&
        showProfileSub &&
        !profileMenu.current.contains(e.target)
      ) {
        setProfileSub(false);
      }
    };
    if (showProfileSub) {
      document.addEventListener('mousedown', closeDropDown);
    }

    return () => {
      document.removeEventListener('mousedown', closeDropDown);
    };
  }, [showProfileSub]);

  const { data: session } = useSession();

  return (
    <nav className={styles.desktopNav}>
      <ul>
        <li>
          <PiHouse />
          <Link href="/">Home</Link>
        </li>
        <ul>
          <li ref={adoptSubMenu} className={styles.adoptContainer}>
            <PiHandHeartDuotone />
            <button
              className={styles.subMenuBtn}
              onClick={handleAdoptSubMenuClick}
            >
              Adopt
              <PiCaretDown />
            </button>
            <ul
              className={`${styles.adoptSubMenu} ${
                showAdoptSubMenu ? styles.showAdoptSubMenu : ''
              }`}
            >
              <li>
                <Link onClick={handleAdoptSubMenuClick} href="/adopt/cats">
                  Cats
                </Link>
                <PiCat />
              </li>
              <li>
                <Link onClick={handleAdoptSubMenuClick} href="/adopt/dogs">
                  Dogs
                </Link>
                <PiDog />
              </li>
            </ul>
          </li>
          <li ref={subMenu} className={styles.breedContainer}>
            <PiPawPrint />
            <button className={styles.subMenuBtn} onClick={handleSubMenuClick}>
              Breeds
              <PiCaretDown />
            </button>
            <ul
              className={`${styles.subMenu} ${
                showSubMenu ? styles.showSubMenu : ''
              }`}
            >
              <li>
                <Link onClick={handleSubMenuClick} href="/breeds/cats/1">
                  Cats
                </Link>
                <PiCat />
              </li>
              <li>
                <Link onClick={handleSubMenuClick} href="/breeds/dogs/1">
                  Dogs
                </Link>
                <PiDog />
              </li>
            </ul>
          </li>
          <li>
            <PiChatsCircle />
            <Link href="/community">Community</Link>
          </li>
        </ul>
        {session && session.user ? (
          <li ref={profileMenu} className={styles.loginContainer}>
            {session && session.user && newMessages > 0 ? (
              <Link className={styles.envelopeIcon} href={'messages'}>
                <PiEnvelopeSimple className={styles.menuIcon} />
                <div className={styles.messageCount}>{newMessages}</div>
              </Link>
            ) : (
              <div>
                <Link className={styles.envelopeIcon} href={'messages'}>
                  <PiEnvelopeSimpleOpen className={styles.menuIcon} />
                </Link>
              </div>
            )}
            <button
              className={styles.subMenuBtn}
              onClick={handleProfileMenuClick}
            >
              <div className={styles.login}>
                {userNameShort(session.user.name)}
                <PiDotsThreeOutlineVerticalBold />
              </div>
            </button>
            <ul
              className={`${styles.profileSubMenu} ${
                showProfileSub ? styles.showProfileSubMenu : ''
              }`}
            >
              <li>
                <PiUser />
                <Link onClick={handleProfileMenuClick} href="/profile">
                  Profile
                </Link>
              </li>
              <li>
                <PiEnvelope className={styles.messageIcon} />
                <Link onClick={handleProfileMenuClick} href="/messages">
                  Messages
                </Link>
              </li>

              <li>
                <PiSignOut />
                <Link
                  className={styles.login}
                  onClick={handleProfileMenuClick}
                  href="/sign-out"
                >
                  Sign Out
                </Link>
              </li>
            </ul>
          </li>
        ) : (
          <li>
            <PiSignIn />
            <Link className={styles.login} href="/sign-in">
              Sign In
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default DesktopNav;
