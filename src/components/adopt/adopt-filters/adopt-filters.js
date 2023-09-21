'use client';

import { useState } from 'react';
import styles from './adopt-filters.module.scss';
import CustomButton from '@/components/custom-button/custom-button';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function AdoptFilters({ filterList, params }) {
  const [showModal, setShowModal] = useState(false);
  const searchParams = useSearchParams();
  const filterName = searchParams.get('filter');
  const breedName = searchParams.get('breed');

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
          <h2
            className={filterName === null && !breedName ? styles.active : ''}
          >
            <Link onClick={modalHandler} href={`${params}`}>
              All Pets
            </Link>
          </h2>
          <h2 className={filterName === 'my' ? styles.active : ''}>
            <Link onClick={modalHandler} href={`?filter=my`}>
              My Listings
            </Link>
          </h2>
          <h2 className={filterName === 'fav' ? styles.active : ''}>
            <Link onClick={modalHandler} href={`?filter=fav`}>
              My Favorites
            </Link>
          </h2>
          <h2 className={breedName ? styles.active : ''}>Filter by Breed</h2>
          <ul>
            {filterList.map((breed, index) => {
              const breedUrl = breed._id.replaceAll(' ', '-').toLowerCase();
              return (
                <li
                  className={breedName === breedUrl ? styles.active : ''}
                  key={index}
                  value={breed._id}
                >
                  <Link onClick={modalHandler} href={`?breed=${breedUrl}`}>
                    {breed._id}
                  </Link>
                  <span>{`(${breed.count})`}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <div className={styles.desktopFilter}>
        <h2 className={filterName === null && !breedName ? styles.active : ''}>
          <Link href={`${params}`}>All Pets</Link>
        </h2>
        <h2 className={filterName === 'my' ? styles.active : ''}>
          <Link href={`?filter=my`}>My Listings</Link>
        </h2>
        <h2 className={filterName === 'fav' ? styles.active : ''}>
          <Link href={`?filter=fav`}>My Favorites</Link>
        </h2>
        <h2 className={breedName ? styles.active : ''}>Filter by Breed</h2>
        <ul>
          {filterList.map((breed, index) => {
            const breedUrl = breed._id.replaceAll(' ', '-').toLowerCase();
            return (
              <li
                className={breedName === breedUrl ? styles.active : ''}
                key={index}
                value={breed._id}
              >
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
