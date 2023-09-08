'use client';
import styles from './header.module.scss';
import Image from 'next/image';
import { PiBellBold, PiList, PiX } from 'react-icons/pi';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Nav from './Nav';
import DesktopNav from './desktop-nav';
import { useSession } from 'next-auth/react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menu = useRef(null);

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

  const { data: session } = useSession();
  const authLink = session ? '/profile' : 'sign-in';

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
          <Link className={styles.loginIcon} href={authLink}>
            <PiBellBold className={styles.menuIcon} />
          </Link>
          <div onClick={menuHandler}>
            {menuOpen ? (
              <PiX className={styles.menuIcon} />
            ) : (
              <PiList className={styles.menuIcon} />
            )}
          </div>
        </div>
        <Nav ref={menu} isOpen={menuOpen} onLinkClick={closeMenu} />

        <DesktopNav />
      </nav>
    </header>
  );
}
