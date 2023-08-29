'use client';

import styles from './layout.module.scss';
import Button from '@/components/Button/Button';
import Link from 'next/link';
import { useState } from 'react';

export default function CommunityLayout({ children }) {
  const [showFilters, setShowFilters] = useState(false);

  const handleFiltersClick = () => {
    setShowFilters(!showFilters);
  };

  return (
    <section className={styles.container}>
      <h1>Community Q&A</h1>
      <div className={styles.mobileNav}>
        <div className={styles.filterContainer}>
          <Button
            className={styles.filterBtn}
            onClick={handleFiltersClick}
            text="Filters"
            style="accent"
          ></Button>
          <nav
            className={`${styles.filters} ${
              showFilters ? styles.showFilters : ''
            }`}
          >
            <ul className={styles.communityNav}>
              <li>All</li>
              <li>My Questions</li>
              <li>New Ones</li>
              <li>Waiting for Answer</li>
            </ul>
          </nav>
        </div>
        <div className={styles.mobileAsk}>
          <Link href="/askquestion">
            <Button text="Ask" style="secondary"></Button>
          </Link>{' '}
        </div>
      </div>
      <li className={styles.desktopAsk}>
        <Link href="/askquestion">
          <Button text="Ask" style="secondary"></Button>
        </Link>
      </li>
      <nav className={styles.desktopNav}>
        <ul>
          <li>All</li>
          <li>My Questions</li>
          <li>New Ones</li>
          <li>Waiting for Answer</li>
        </ul>
      </nav>
      <div className={styles.questions}>{children}</div>
    </section>
  );
}
