'use client';

import styles from './image-gallery.module.scss';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import imageKitLoader from '@/lib/imageKitLoader/imageLoader';

export default function ImageGallery({ images, breed }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (images.length > 0) {
      setActiveIndex(0);
    }
  }, [images]);

  const mainImageHandler = (index) => {
    setActiveIndex(index);
  };

  if (!images || !Array.isArray(images) || images.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.mainImage}>
        <Image
          loader={imageKitLoader}
          src={images[activeIndex]}
          alt={breed}
          width={300}
          height={225}
        />
      </div>
      <div className={styles.imageThumbnails}>
        {images.map((image, index) => (
          <Image
            key={index}
            loader={imageKitLoader}
            onClick={() => mainImageHandler(index)}
            className={`${styles.imageThumbnail} ${
              activeIndex === index ? styles.activeImage : ''
            }`}
            height={50}
            width={50}
            alt={breed}
            src={image}
          />
        ))}
      </div>
    </div>
  );
}
