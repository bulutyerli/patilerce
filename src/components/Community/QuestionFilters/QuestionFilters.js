'use client';

import styles from './QuestionFilters.module.scss';
import Button from '@/components/Button/Button';
import Link from 'next/link';
import { useState } from 'react';

export default function QuestionFilters({ filter }) {
  const [showFilters, setShowFilters] = useState(false);

  const handleFiltersClick = () => {
    setShowFilters(!showFilters);
  };

  const filters = ['all', 'my', 'noanswer'];

  return (
    <section className={styles.container}>
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
          <Link href="/community/askquestion">
            <Button text="Ask" style="secondary"></Button>
          </Link>{' '}
        </div>
      </div>

      <nav className={styles.desktopNav}>
        <ul>
          <li className={styles.desktopAsk}>
            <Link href="/community/askquestion">
              <Button text="Ask" style="secondary"></Button>
            </Link>
          </li>
          {filters.map((filterName, index) => {
            return (
              <li key={index} value={filterName}>
                <Link
                  className={`${styles.links} ${
                    filter === filterName ? styles.active : ''
                  } `}
                  href={`/community?filter=${filterName}&page=${parseInt(1)}`}
                >
                  {filterName === 'all'
                    ? 'All Questions'
                    : filterName === 'my'
                    ? 'My Questions'
                    : 'Without Answers'}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </section>
  );
}
