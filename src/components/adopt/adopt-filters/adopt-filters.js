'use client';

import { useState } from 'react';
import styles from './adopt-filters.module.scss';
import CustomButton from '@/components/custom-button/custom-button';
import Link from 'next/link';
import breedsList from '@/helpers/breeds-list.json';

export default function AdoptFilters({ petType, params }) {
  const [showModal, setShowModal] = useState(false);

  const modalHandler = () => {
    setShowModal(!showModal);
  };

  const filterBreeds = petType === 'Dog' ? breedsList.dogs : breedsList.cats;

  return (
    <div className={styles.container}>
      <Link className={styles.listButton} href={'/adopt/listing'}>
        <CustomButton style={'secondary'} text={'List a Pet'} />
      </Link>

      <div className={styles.mobileFilter}>
        <CustomButton onClick={modalHandler} text={'Filters'} />
      </div>
      {showModal && (
        <div className={styles.modal}>
          <ul>
            <h2 className={styles.myListings}>
              <Link href={`?filter=my`}>My Listings</Link>
            </h2>
            <h2>Filter by Breed</h2>

            <li>
              <Link onClick={modalHandler} href={`${params}`}>
                All
              </Link>
            </li>
            {filterBreeds.map((breed, index) => {
              const breedUrl = breed.replaceAll(' ', '-').toLowerCase();
              return (
                <li key={index} value={breed}>
                  <Link onClick={modalHandler} href={`?breed=${breedUrl}`}>
                    {breed}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <div className={styles.desktopFilter}>
        <ul>
          <h2 className={styles.myListings}>
            <Link href={`?filter=my`}>My Listings</Link>
          </h2>
          <h2>Filter by Breed</h2>
          <li>
            <Link href={`${params}`}>All</Link>
          </li>
          {filterBreeds.map((breed, index) => {
            const breedUrl = breed.replaceAll(' ', '-').toLowerCase();
            return (
              <li key={index} value={breed}>
                <Link href={`?breed=${breedUrl}`}>{breed}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
