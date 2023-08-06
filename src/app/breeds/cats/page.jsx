import BreedCard from '@/components/breedCard/breedCard';
import styles from '../breedDetails.module.scss';
import notFound from 'public/images/catNotFound.png';
import Link from 'next/link';

const apiKey = process.env.CAT_API_KEY;

async function getCats() {
  try {
    const response = await fetch('https://api.thecatapi.com/v1/breeds', {
      headers: { 'x-api-key': apiKey },
    });
    const catData = await response.json();
    if (!response.ok) {
      throw new Error('something went wrong');
    }
    return catData;
  } catch (error) {
    console.log('something went wrong', error);
  }
}

export default async function BreedsPage() {
  const cats = await getCats();

  return (
    <section className={styles.container}>
      <h1>Cat Breeds </h1>
      <ul className={styles.cardContainer}>
        {cats.map((cat) => {
          let imageUrl = cat.image?.url || notFound;

          return (
            <li key={cat.id}>
              <Link href={`/breeds/cats/${cat.id}`}>
                <BreedCard image={imageUrl} data={cat} />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
