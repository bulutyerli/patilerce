'use client';
import styles from './header.module.scss';
import Image from 'next/image';
import {
  PiEnvelopeSimple,
  PiEnvelopeSimpleOpen,
  PiList,
  PiX,
  PiUser,
} from 'react-icons/pi';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Nav from './nav';
import DesktopNav from './desktop-nav';
import UserNav from './user-nav';
import { useSession } from 'next-auth/react';
import imageKitLoader from '@/lib/imageKitLoader/imageLoader';

export default function Header({ messageCount }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [newMessages, setNewMessages] = useState(0);
  const menu = useRef(null);
  const userMenu = useRef(null);
  const { data: session } = useSession();

  const menuHandler = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const closeUserMenu = () => {
    setUserMenuOpen(false);
  };

  const userMenuHandler = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (menu.current && menuOpen && !menu.current.contains(event.target)) {
        setMenuOpen(false);
      }
      if (
        userMenu.current &&
        userMenuOpen &&
        !userMenu.current.contains(event.target)
      ) {
        setUserMenuOpen(false);
      }
    }

    if (menuOpen || userMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen, userMenuOpen]);

  useEffect(() => {
    setNewMessages(messageCount);
  }, [messageCount]);

  useEffect(() => {
    if (menuOpen) {
      setUserMenuOpen(false);
    }
    if (userMenuOpen) {
      setMenuOpen(false);
    }
  }, [menuOpen, userMenuOpen]);

  return (
    <header className={styles.header}>
      <nav className={styles.navContainer}>
        <Link href={'/'}>
          <Image
            unoptimized
            className={styles.logo}
            src="/images/logo.png"
            width={200}
            height={200}
            alt="logo"
          ></Image>
        </Link>
        <div className={styles.mobileNavContainer}>
          {session &&
            session.user &&
            (newMessages > 0 ? (
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
            ))}
          {session && session.user ? (
            <div onClick={userMenuHandler}>
              <PiUser className={styles.menuIcon} />
            </div>
          ) : (
            ''
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
        <UserNav
          ref={userMenu}
          isOpen={userMenuOpen}
          onLinkClick={closeUserMenu}
        />
        <DesktopNav newMessages={newMessages} />
      </nav>
    </header>
  );
}
