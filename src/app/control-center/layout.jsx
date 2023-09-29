'use client';

import styles from './layout.module.scss';
import Link from 'next/link';

export default function ControlCenterLayout({ children }) {
  return (
    <section className={styles.container}>
      <nav>
        <li>
          <Link href={'/control-center'}>Users</Link>
        </li>
        <li>
          <Link href={'/control-center/listing-approval'}>
            Listing Approval
          </Link>
        </li>
      </nav>
      {children}
    </section>
  );
}
