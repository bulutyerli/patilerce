'use client';
import Link from 'next/link';
import styles from '@/components/nav.module.scss';
import { forwardRef, useState } from 'react';
import { PiCat, PiDog, PiCaretDown } from 'react-icons/pi';

function Nav({ isOpen }, ref) {
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
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/adopt">Adopt</Link>
        </li>
        <li
          onClick={handleSubMenuClick}
          className={`${styles.breedContainer} ${
            breedsSubMenu ? styles.showSubMenu : ''
          }`}
        >
          <div className={styles.breedsLink}>
            <span>Breeds</span> <PiCaretDown />
          </div>

          <ul
            className={`${styles.breedsSubMenu} ${
              breedsSubMenu ? styles.showSubMenu : ''
            }`}
          >
            <li>
              <PiCat className={styles.icon} />
              <Link href="/breeds/cats">Cats</Link>
            </li>
            <li>
              <PiDog className={styles.icon} />
              <Link href="/breeds/dogs">Dogs</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link href="/community">Community</Link>
        </li>
        <li>
          <Link className={styles.login} href="/login">
            Login
          </Link>
        </li>
      </ul>
      <div className={styles.backgroundImage}></div>
    </nav>
  );
}

export default forwardRef(Nav);
