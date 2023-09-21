'use client';

import styles from './listing.module.scss';
import ListingForm from '@/components/adopt/listing-form/listing-form';
import axios from 'axios';

export default function ListingPage() {
  return (
    <div className={styles.container}>
      <h1>Find a New Home to a Furry Friend</h1>
      <ListingForm
        petData={{
          title: '',
          details: '',
          petType: 'Cat',
          breed: 'Abyssinian',
          age: '1-3 months old',
          gender: '',
          images: '',
          email: '',
          phoneNumber: '',
        }}
      />
    </div>
  );
}
