'use client';

import styles from './question-filters.module.scss';
import CustomButton from '@/components/custom-button/custom-button';
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
          <CustomButton
            className={styles.filterBtn}
            onClick={handleFiltersClick}
            text="Filters"
            style="accent"
          ></CustomButton>
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
            <CustomButton text="Ask" style="secondary"></CustomButton>
          </Link>{' '}
        </div>
      </div>

      <nav className={styles.desktopNav}>
        <ul>
          <li className={styles.desktopAsk}>
            <Link href="/community/askquestion">
              <CustomButton text="Ask" style="secondary"></CustomButton>
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
