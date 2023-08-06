'use client';
import Link from 'next/link';
import styles from '@/components/nav.module.scss';
import { forwardRef, useState, useRef, useEffect } from 'react';
import { PiCat, PiDog, PiCaretDown } from 'react-icons/pi';

function Nav({ isOpen, onLinkClick }, ref) {
  const [breedsSubMenu, setBreedsSubMenu] = useState(false);

  const handleSubMenuClick = () => {
    setBreedsSubMenu(!breedsSubMenu);
  };

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
              <Link href="/breeds/cats/1">Cats</Link>
            </li>
            <li>
              <Link href="/breeds/dogs/2">Dogs</Link>
              <PiDog className={styles.icon} />
            </li>
          </ul>
        </li>
        <li>
          <Link onClick={onLinkClick} href="/community">
            Community
          </Link>
        </li>
        <li>
          <Link onClick={onLinkClick} className={styles.login} href="/login">
            Login
          </Link>
        </li>
      </ul>
      <div className={styles.backgroundImage}></div>
    </nav>
  );
}

export default forwardRef(Nav);
