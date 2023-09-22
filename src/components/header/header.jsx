'use client';
import styles from './header.module.scss';
import Image from 'next/image';
import {
  PiEnvelopeSimple,
  PiEnvelopeSimpleOpen,
  PiList,
  PiX,
} from 'react-icons/pi';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Nav from './Nav';
import DesktopNav from './desktop-nav';
import { useSession } from 'next-auth/react';

export default function Header({ messageCount }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [newMessages, setNewMessages] = useState(0);
  const menu = useRef(null);
  const { data: session } = useSession();
  const user = session?.user?._id;

  const menuHandler = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (menu.current && menuOpen && !menu.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  useEffect(() => {
    setNewMessages(messageCount);
  }, [messageCount]);

  return (
    <header className={styles.header}>
      <nav className={styles.navContainer}>
        <Link href={'/'}>
          <Image
            className={styles.logo}
            src="/images/logo.png"
            width={200}
            height={200}
            alt="logo"
          ></Image>
        </Link>
        <div className={styles.mobileNavContainer}>
          {user && newMessages > 0 ? (
            <Link className={styles.messageIcon} href={'messages'}>
              <PiEnvelopeSimple className={styles.menuIcon} />
              <div className={styles.messageCount}>{newMessages}</div>
            </Link>
          ) : (
            <div>
              <Link className={styles.messageIcon} href={'messages'}>
                <PiEnvelopeSimpleOpen className={styles.menuIcon} />
              </Link>
            </div>
          )}

          <div onClick={menuHandler}>
            {menuOpen ? (
              <PiX className={styles.menuIcon} />
            ) : (
              <PiList className={styles.menuIcon} />
            )}
          </div>
        </div>
        <Nav ref={menu} isOpen={menuOpen} onLinkClick={closeMenu} />

        <DesktopNav newMessages={newMessages} />
      </nav>
    </header>
  );
}
