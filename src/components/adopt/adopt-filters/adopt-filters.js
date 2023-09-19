'use client';

import { useState } from 'react';
import styles from './adopt-filters.module.scss';
import CustomButton from '@/components/custom-button/custom-button';
import Link from 'next/link';

export default function AdoptFilters({ filterList, params }) {
  const [showModal, setShowModal] = useState(false);

  const modalHandler = () => {
    setShowModal(!showModal);
  };

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
          <h2>
            <Link onClick={modalHandler} href={`${params}`}>
              All Pets
            </Link>
          </h2>
          <h2 className={styles.myListings}>
            <Link onClick={modalHandler} href={`?filter=my`}>
              My Listings
            </Link>
          </h2>
          <h2>Filter by Breed</h2>
          <ul>
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
        <h2>
          <Link href={`${params}`}>All Pets</Link>
        </h2>
        <h2 className={styles.myListings}>
          <Link href={`?filter=my`}>My Listings</Link>
        </h2>
        <h2>Filter by Breed</h2>
        <ul>
          {filterList.map((breed, index) => {
            const breedUrl = breed._id.replaceAll(' ', '-').toLowerCase();
            return (
              <li key={index} value={breed._id}>
                <Link href={`?breed=${breedUrl}`}>{breed._id}</Link>
                <span>{`(${breed.count})`}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
