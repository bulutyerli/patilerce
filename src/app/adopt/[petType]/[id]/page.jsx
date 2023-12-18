import styles from './adopt-details.module.scss';
import { getAdoptById } from '@/lib/adopt/get-adopts';
import CustomButton from '@/components/custom-button/custom-button';
import Image from 'next/image';
import ImageGallery from '@/components/image-gallery/image-gallery';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { PiTrash, PiPencil } from 'react-icons/pi';
import Link from 'next/link';
import { DeletePosts } from '@/lib/delete-posts/delete-posts';
import AddFavorite from '@/lib/adopt/add-favorite';

export default async function AdoptDetails({ params, searchParams }) {
  try {
    const adopt = await getAdoptById(params.id);

    const images = adopt?.images;
    const dateConvert = new Date(adopt?.user.createdAt);
    const options = { year: 'numeric', month: 'long' };
    const memberDate = dateConvert.toLocaleString('en-US', options);
    const session = await getServerSession(authOptions);
    const userId = session?.user._id;
    const isUser = userId === adopt?.user.id;
    const showModal = searchParams.modal;

    return (
      <div className={styles.container}>
        <h1 className={styles.title}>{adopt?.title}</h1>
        <div className={styles.breed}>{adopt?.breed}</div>
        <div className={styles.images}>
          <ImageGallery breed={adopt?.breed} images={images} />
        </div>
        <dl className={styles.infoSection}>
          <div className={styles.infoPair}>
            <dt className={styles.infoTitle}>Age:</dt>
            <dd className={styles.info}>{adopt?.age}</dd>
          </div>
          <div className={styles.infoPair}>
            <dt className={styles.infoTitle}>Gender:</dt>
            <dd className={styles.info}>{adopt?.gender}</dd>
          </div>
        </dl>

        <dl className={styles.detailsContainer}>
          <dt className={styles.infoTitle}>Details:</dt>
          <dd className={styles.info}>{adopt?.details}</dd>
        </dl>

        {userId === adopt?.user.id ? (
          ''
        ) : (
          <div className={styles.addFavorite}>
            <AddFavorite favList={adopt?.favoritedBy} adoptId={params.id} />
          </div>
        )}

        <section className={styles.user}>
          <dl>
            <h3>Contact</h3>
            <div className={styles.userInfo}>
              <div className={styles.infoPair}>
                <Image
                  className={styles.userImage}
                  src={adopt?.user.image}
                  alt="Profile Image"
                  width={30}
                  height={30}
                />
                <span className={styles.info}>{adopt?.user.name}</span>
              </div>
            </div>
            <div className={styles.infoPair}>
              <dt>Member Since:</dt>
              <dd className={styles.info}>{memberDate}</dd>
            </div>
            <div className={styles.infoPair}>
              <dt>Email:</dt>
              <dd>{adopt?.email ? adopt?.email : ''}</dd>
            </div>
            <div className={styles.infoPair}>
              <dt>Phone Number:</dt>
              <dd>{adopt?.phoneNumber ? adopt?.phoneNumber : ''}</dd>
            </div>
            {userId === adopt?.user.id ? (
              ''
            ) : (
              <div className={styles.messageBtn}>
                <Link href={`/messages?to=${adopt?.user.id}`}>
                  <CustomButton text={'Message'} />
                </Link>
              </div>
            )}
          </dl>
        </section>

        {(isUser || session?.user?.isAdmin) && (
          <div className={styles.userActions}>
            <span className={styles.edit}>
              <PiPencil />
              <Link href={`/adopt/edit/${adopt?.id}`}>Edit</Link>
            </span>
            <span className={styles.delete}>
              <PiTrash />
              <Link href={'?modal=true'}>Delete</Link>
            </span>
          </div>
        )}
        {showModal && (
          <DeletePosts
            type={adopt?.petType === 'Cat' ? 'adoptCat' : 'adoptDog'}
            dataId={params.id}
          />
        )}
      </div>
    );
  } catch (error) {
    console.log('Error fetching adoption data', error);
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Something went wrong, please try again</h1>
      </div>
    );
  }
}
