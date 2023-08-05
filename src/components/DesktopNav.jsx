'use client';
import Link from 'next/link';
import styles from '@/components/desktopNav.module.scss';
import {
  PiHouse,
  PiUser,
  PiPawPrint,
  PiHandHeartDuotone,
  PiChatsCircle,
  PiCat,
  PiDog,
  PiCaretDown,
} from 'react-icons/pi';
import { useState, useRef, useEffect } from 'react';

function DesktopNav() {
  const [showSubMenu, setShowSubMenu] = useState(false);

  const handleSubMenuClick = () => {
    setShowSubMenu(!showSubMenu);
  };

  const breedMenu = useRef(null);

  useEffect(() => {
    const closeDropDown = (e) => {
      if (
        breedMenu.current &&
        showSubMenu &&
        !breedMenu.current.contains(e.target)
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

  return (
    <nav className={styles.desktopNav}>
      <ul>
        <li>
          <PiHouse />
          <Link href="/">Home</Link>
        </li>
        <ul>
          <li>
            <PiHandHeartDuotone />
            <Link href="/adopt">Adopt</Link>
          </li>
          <li ref={breedMenu} className={styles.breedContainer}>
            <PiPawPrint />
            <button className={styles.breedsBtn} onClick={handleSubMenuClick}>
              Breeds
              <PiCaretDown />
            </button>
            <ul
              className={`${styles.subMenu} ${
                showSubMenu ? styles.showSubMenu : ''
              }`}
            >
              <li>
                <Link onClick={handleSubMenuClick} href="/breeds/cats">
                  Cats
                </Link>
                <PiCat />
              </li>
              <li>
                <Link onClick={handleSubMenuClick} href="/breeds/dogs">
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
        <li>
          <PiUser />
          <Link className={styles.login} href="/login">
            Login / Sign Up
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default DesktopNav;
