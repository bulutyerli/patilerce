'use client';

import styles from './image-gallery.module.scss';
import { useState } from 'react';
import Image from 'next/image';

export default function ImageGallery({ images, breed }) {
  const [mainImage, setMainImage] = useState(images[0]);
  const [activeIndex, setActiveIndex] = useState(0);

  const mainImageHandler = (index) => {
    setMainImage(images[index]);
    setActiveIndex(index);
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainImage}>
        <Image src={mainImage} alt={breed} width={300} height={225}></Image>
      </div>
      <div className={styles.imageThumbnails}>
        {images.map((image, index) => {
          const isActive = activeIndex === index;
          return (
            <Image
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
