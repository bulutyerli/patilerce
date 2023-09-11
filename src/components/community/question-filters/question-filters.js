'use client';

import styles from './question-filters.module.scss';
import CustomButton from '@/components/custom-button/custom-button';
import Link from 'next/link';
import { useState } from 'react';

export default function QuestionFilters({ filter, session }) {
  const [showFilters, setShowFilters] = useState(false);

  const handleFiltersClick = () => {
    setShowFilters(!showFilters);
  };
  const filters = ['all', `${session ? 'my' : ''}`, 'noanswer'];

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
            <ul>
              {filters.map((filterName, index) => {
                return (
                  <li key={index} value={filterName}>
                    <Link
                      onClick={handleFiltersClick}
                      className={`${styles.links} ${
                        filter === filterName ? styles.active : ''
                      } `}
                      href={`/community?filter=${filterName}&page=${parseInt(
                        1
                      )}`}
                    >
                      {filterName === 'all'
                        ? 'All Questions'
                        : filterName === 'my'
                        ? 'My Questions'
                        : filterName === 'noanswer'
                        ? 'Without Answers'
                        : ''}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
        <div className={styles.mobileAsk}>
          <Link href="/community/ask-question">
            <CustomButton text="Ask" style="secondary"></CustomButton>
          </Link>{' '}
        </div>
      </div>
      <nav className={styles.desktopNav}>
        <div className={styles.desktopAsk}>
          <Link href="/community/ask-question">
            <CustomButton text="Ask" style="secondary"></CustomButton>
          </Link>
        </div>{' '}
        <ul>
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
                    : filterName === 'noanswer'
                    ? 'Without Answers'
                    : ''}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </section>
  );
}
