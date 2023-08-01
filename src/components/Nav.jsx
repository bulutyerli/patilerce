import Link from "next/link";
import styles from '@/components/nav.module.scss'

function Nav({isOpen}) {
  return (
    <nav className={`${styles.mobileNav} ${isOpen ? styles.showNav : ""}`}>
      <ul>
        <li>
        <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/breeds">Breeds</Link>
        </li>
        <li>
        <Link href="/adopt">Adopt</Link>
        </li>
        <li>
        <Link href="/ask">Community</Link>
        </li>
        <li>
        <Link href="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
