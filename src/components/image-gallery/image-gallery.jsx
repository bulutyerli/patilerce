'use client';

import styles from './image-gallery.module.scss';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import imageKitLoader from '@/lib/imageKitLoader/imageLoader';

export default function ImageGallery({ images, breed }) {
  const [mainImage, setMainImage] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (images.length > 0) {
      setMainImage(images[0]);
    }
  }, []);

  const mainImageHandler = (index) => {
    setMainImage(images[index]);
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
          src={mainImage}
          alt={breed}
          width={300}
          height={225}
        ></Image>
      </div>
      <div className={styles.imageThumbnails}>
        {images.map((image, index) => {
          const isActive = activeIndex === index;
          return (
            <Image
              loader={imageKitLoader}
              onClick={() => {
                mainImageHandler(index);
              }}
              className={`${styles.imageThumbnail} ${
                isActive ? styles.activeImage : ''
              }`}
              key={index}
              height={50}
              width={50}
              alt={breed}
              src={image}
            ></Image>
          );
        })}
      </div>
    </div>
  );
}
