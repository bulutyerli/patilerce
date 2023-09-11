'use client';

import { useState } from 'react';
import styles from './adopt-filters.module.scss';
import CustomButton from '@/components/custom-button/custom-button';
import Link from 'next/link';

export default function AdoptFilters() {
  const [showModal, setShowModal] = useState(false);

  const modalHandler = () => {
    setShowModal(!showModal);
  };

  return (
    <div className={styles.container}>
      <Link href={'/adopt/listing'}>
        <CustomButton style={'secondary'} text={'List a Pet'} />
      </Link>
      <CustomButton onClick={modalHandler} text={'Filters'} />
    </div>
  );
}
