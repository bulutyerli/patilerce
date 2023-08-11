'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import styles from './imageSlider.module.scss';
import Autoplay from 'embla-carousel-autoplay';

export default function ImageSlider({ imageList }) {
  const [imageRef] = useEmblaCarousel({ loop: false }, [Autoplay()]);

  return (
    <div className={styles.slider} ref={imageRef}>
      <div className={styles.container}>
        {imageList.map((image, index) => {
          return (
            <div key={index}>
              <Image
                className={styles.image}
                src={image}
                alt={`pet`}
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
