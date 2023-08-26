'use client';

import styles from './community.module.scss';
import Button from '@/components/Button/Button';
import { useState } from 'react';

export default function Community() {
  const [showFilters, setShowFilters] = useState(false);

  const handleFiltersClick = () => {
    setShowFilters(!showFilters);
  };
  return (
    <section className={styles.container}>
      <h1>Community Q&A</h1>
      <div className={styles.buttons}>
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
        <Button text="Ask" style="secondary"></Button>
      </div>
    </section>
  );
}
