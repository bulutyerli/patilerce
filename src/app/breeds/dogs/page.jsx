import BreedCard from '@/components/breedCard/breedCard';
import notFound from 'public/images/dogNotFound.png';
import styles from '../breedDetails.module.scss';
import Link from 'next/link';

const apiKey = process.env.DOG_API_KEY;

async function getDogs() {
  try {
    const response = await fetch('https://api.thedogapi.com/v1/breeds', {
      headers: { 'x-api-key': apiKey },
    });
    const dogData = await response.json();
    if (!response.ok) {
      throw new Error('something went wrong');
    }
    return dogData;
  } catch (error) {
    console.log('something went wrong', error);
  }
}

export default async function BreedsPage() {
  const dogs = await getDogs();

  return (
    <section className={styles.container}>
      <h1>Dog Breeds </h1>
      <ul className={styles.cardContainer}>
        {dogs.map((dog) => {
          let imageUrl = dog.image?.url || notFound;

          return (
            <li key={dog.id}>
              <Link href={`/breeds/dogs/${dog.id}`}>
                <BreedCard image={imageUrl} data={dog} />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
