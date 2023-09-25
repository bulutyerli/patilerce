'use client';

import styles from './listing.module.scss';
import ListingForm from '@/components/adopt/listing-form/listing-form';

export default function ListingPage() {
  const defaultData = {
    title: '',
    details: '',
    petType: 'Cat',
    breed: 'Local Cat(Mixed Breed)',
    age: '1-3 months old',
    gender: '',
    images: '',
    email: '',
    phoneNumber: '',
  };

  return (
    <div className={styles.container}>
      <h1>Find a New Home to a Furry Friend</h1>
      <ListingForm petData={defaultData} />
    </div>
  );
}
