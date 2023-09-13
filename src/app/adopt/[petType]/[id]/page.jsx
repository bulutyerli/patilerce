import styles from './adopt-details.module.scss';
import { getAdoptById } from '@/lib/adopt/get-adopts';
import ImageSlider from '@/components/breeds/image-slider/image-slider';
import CustomButton from '@/components/custom-button/custom-button';
import Image from 'next/image';
import ImageGallery from '@/components/image-gallery/image-gallery';

export default async function AdoptDetails({ params }) {
  const adopt = await getAdoptById(params.id);
  const images = adopt.images;
  console.log(adopt.user);
  const dateConvert = new Date(adopt.user.createdAt);
  const options = { year: 'numeric', month: 'long' };
  const memberDate = dateConvert.toLocaleString('en-US', options);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{adopt.title}</h1>
      <div className={styles.breed}>{adopt.breed}</div>
      <div className={styles.images}>
        <ImageGallery breed={adopt.breed} images={images} />
      </div>
      <dl className={styles.infoSection}>
        <div className={styles.infoPair}>
          <dt className={styles.infoTitle}>Age:</dt>
          <dd className={styles.info}>{adopt.age}</dd>
        </div>
        <div className={styles.infoPair}>
          <dt className={styles.infoTitle}>Gender:</dt>
          <dd className={styles.info}>{adopt.gender}</dd>
        </div>
      </dl>

      <dl className={styles.detailsContainer}>
        <dt className={styles.infoTitle}>Details:</dt>
        <dd className={styles.info}>{adopt.details}</dd>
      </dl>

      <section className={styles.user}>
        <dl>
          <h3>Contact</h3>
          <div className={styles.userInfo}>
            <div className={styles.infoPair}>
              <Image
                src={adopt.user.image}
                alt="Profile Image"
                width={30}
                height={30}
              />
              <span className={styles.info}>{adopt.user.name}</span>
            </div>
          </div>
          <div className={styles.infoPair}>
            <dt>Member Since:</dt>
            <dd className={styles.info}>{memberDate}</dd>
          </div>
          <div className={styles.infoPair}>
            <dt>Email:</dt>
            <dd>{adopt.email ? adopt.email : ''}</dd>
          </div>
          <div className={styles.infoPair}>
            <dt>Phone Number:</dt>
            <dd>{adopt.phoneNumber ? adopt.phoneNumber : ''}</dd>
          </div>
          <div className={styles.messageBtn}>
            <CustomButton text={'Message'} />
          </div>
        </dl>
      </section>
    </div>
  );
}
