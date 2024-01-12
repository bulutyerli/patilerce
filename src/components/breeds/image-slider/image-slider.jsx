'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import styles from './image-slider.module.scss';
import Autoplay from 'embla-carousel-autoplay';
import imageKitLoader from '@/lib/imageKitLoader/imageLoader';

export default function ImageSlider({ imageList, petName }) {
  const [imageRef] = useEmblaCarousel({ loop: false }, [Autoplay()]);

  return (
    <div className={styles.slider} ref={imageRef}>
      <div className={styles.container}>
        {imageList.map((image, index) => {
          return (
            <div key={index}>
              <Image
                loader={imageKitLoader}
                className={styles.image}
                src={image}
                alt={petName}
                width={250}
                height={250}
              ></Image>
            </div>
          );
        })}
      </div>
    </div>
  );
}
