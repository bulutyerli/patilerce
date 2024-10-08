import styles from './homepage.module.scss';
import { getAdopts } from '@/lib/adopt/get-adopts';
import AdoptCard from '@/components/adopt/adopt-card/adopt-card';
import Link from 'next/link';
import Image from 'next/image';
import { getQuestions } from '@/lib/community/get-questions';
import CustomButton from '@/components/custom-button/custom-button';
import imageKitLoader from '@/lib/imageKitLoader/imageLoader';

export default async function Home() {
  const limit = 10;
  const cats = await getAdopts({ query: {} }, limit, 'Cat');
  const dogs = await getAdopts({ query: {} }, limit, 'Dog');
  const qdata = await getQuestions({ query: {} }, 5);

  return (
    <main className={styles.container}>
      <section className={styles.breedsContainer}>
        <div className={styles.catBreeds}>
          <span>
            <Link href={'/breeds/cats/1'}>
              Check detailed info and images of over 60 cat breeds
            </Link>
          </span>
          <Image
            className={styles.breedImages}
            src={'/images/cat-breeds.png'}
            alt="group of cats"
            width={800}
            height={600}
          ></Image>
        </div>
        <div className={styles.dogBreeds}>
          <span>
            <Link href={'/breeds/dogs/1'}>
              Discover detailed info on over 120 different dog breeds
            </Link>
          </span>
          <Image
            className={styles.breedImages}
            src={'/images/dog-breeds.png'}
            alt="group of cats"
            width={800}
            height={600}
          ></Image>
        </div>
      </section>
      <section className={styles.catAdopts}>
        <Image
          unoptimized
          className={styles.catsImage}
          src={'/images/cats-peeking.png'}
          alt="cats peeking"
          width={800}
          height={600}
        ></Image>
        <div className={styles.cardsContainer}>
          <div className={styles.title}>
            <h1>Latest Cats Seeking Loving Homes</h1>
            <Link className={styles.listButton} href={'/adopt/listing'}>
              <CustomButton style={'secondary'} text={'List a Pet'} />
            </Link>
          </div>
          <div className={styles.cards}>
            {cats?.adopts?.map((cat, index) => {
              return (
                <Link key={index} href={`/adopt/cats/${cat._id}`}>
                  <AdoptCard homepage={true} data={cat} />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <section className={styles.dogAdopts}>
        <Image
          unoptimized
          className={styles.dogsImage}
          src={'/images/dogs-peeking.png'}
          alt="dogs peeking"
          width={800}
          height={600}
        ></Image>
        <div className={styles.cardsContainer}>
          <div className={styles.title}>
            <h1>Latest Dogs Seeking Loving Homes</h1>
            <Link className={styles.listButton} href={'/adopt/listing'}>
              <CustomButton style={'secondary'} text={'List a Pet'} />
            </Link>
          </div>
          <div className={styles.cards}>
            {dogs?.adopts?.map((dog, index) => {
              return (
                <Link key={index} href={`/adopt/cats/${dog._id}`}>
                  <AdoptCard homepage={true} data={dog} />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <section className={styles.communityContainer}>
        <div className={styles.title}>
          <h2>Latest questions asked by our users</h2>
          <div className={styles.imageContainer}>
            <Image
              className={styles.questionCatImages}
              src={'/images/curiouscat-2.png'}
              width={100}
              height={100}
              alt="curious cat"
            ></Image>
          </div>
        </div>

        {qdata?.questions?.map((question, index) => {
          return (
            <div className={styles.questionCard} key={index}>
              <Link href={`/community/${question._id}`}>
                <Image
                  loader={imageKitLoader}
                  className={styles.questionImage}
                  src={question.user.image}
                  alt="profile image"
                  width={300}
                  height={300}
                ></Image>
              </Link>

              <div className={styles.details}>
                <span className={styles.username}>
                  <Link href={`/community/${question._id}`}>
                    {question.user.name}
                  </Link>
                </span>
                <span className={styles.title}>
                  <Link href={`/community/${question._id}`}>
                    {question.title}
                  </Link>
                </span>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}
